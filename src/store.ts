import { createStore, Store } from "vuex";
import type { RootState } from "./types";
import { Marker, UserLocation } from "./types";
import data from "./challenges.json";
import router from "./router";
import LocationWatcher from "./locationwatcher";
import { distance, requestLocationPermission } from "./utils";

const saveMarkersPlugin = (s: Store<RootState>) => {
  s.subscribe((mutation, state) => {
    if (mutation.type === "unlockMarker") {
      const unlocked = state.markers
        .filter((x) => !x.locked)
        .map((x) => x.questionnr);

      localStorage.setItem("unlockedMarkers", JSON.stringify(unlocked));
    } else if (
      mutation.type === "setPermissionState" &&
      mutation.payload === true
    ) {
      localStorage.setItem("gavePermission", JSON.stringify(true));
    } else if (mutation.type === "setOnboardingFinished") {
      localStorage.setItem("onboardingFinished", JSON.stringify(true));
    }
  });
};

const store = createStore<RootState>({
  state() {
    return {
      lastKnownLocation: new UserLocation(),
      initialLocation: null,
      markers: data.map(
        (x: any) =>
          new Marker(
            x.id,
            x.body,
            parseFloat(x.lat),
            parseFloat(x.lng),
            x.image
          )
      ),
      hasFinishedOnboarding: false,
      permissions: {
        loading: false,
        hasGrantedPermission: false,
      },
    };
  },
  plugins: [saveMarkersPlugin],
  mutations: {
    unlockMarker(state, questionnr: string) {
      const index = state.markers.findIndex((x) => x.questionnr === questionnr);

      if (index < 0) {
        return;
      }

      state.markers = state.markers.map((x, i) =>
        i === index ? x.unlock() : x
      );
    },
    setLastKnownLocation(state, lastKnownLocation: GeolocationPosition) {
      const position = {
        lat: lastKnownLocation.coords.latitude,
        lng: lastKnownLocation.coords.longitude,
      };

      state.lastKnownLocation.position = position;
      if(!state.initialLocation) {
        state.initialLocation = position;
      }
    },
    permissionStateIsLoading(state) {
      state.permissions.loading = true;
    },
    setPermissionState(state, permissionGranted) {
      state.permissions = {
        loading: false,
        hasGrantedPermission: permissionGranted,
      };
    },
    resetAllMarkers(state) {
      state.markers = state.markers.map((x) => x.reset());
    },
    setOnboardingFinished(state, finished) {
      state.hasFinishedOnboarding = finished;
    },
  },
  actions: {
    async unlockNearbyLocations(
      context,
      lastKnownLocation: GeolocationPosition
    ) {
      const { latitude, longitude } = lastKnownLocation.coords;

      const shouldBeUnlocked = (x: Marker) => {
        const closeEnough =
          distance(x.position.lat, x.position.lng, latitude, longitude) <= 75;
        return closeEnough && x.locked;
      };

      const toBeUnlocked = context.state.markers.filter(shouldBeUnlocked);

      toBeUnlocked.forEach((x) => context.commit("unlockMarker", x.questionnr));
    },
    async requestLocationPermission(context) {
      context.commit("permissionStateIsLoading");

      const result = await requestLocationPermission();

      context.commit("setPermissionState", result);
    },
    startPollingLocationData(context) {
      getLocationWatcher().watchForLocationChanges(1000);
    },
    openQuestion(context, questionnr: string) {
      router.push({ name: "vraag", params: { questionnr } });
    },
    dismissModal(context) {
      router.go(-1);
    },
    openSettings(context) {
      router.push("settings");
    },
    restoreStoredState(context) {
      const unlockedStr = localStorage.getItem("unlockedMarkers") || "[]";
      const unlocked: string[] = JSON.parse(unlockedStr);

      unlocked.forEach((x) => context.commit("unlockMarker", x));

      const gavePermission = JSON.parse(
        localStorage.getItem("gavePermission") || "false"
      );
      context.commit("setPermissionState", gavePermission);

      const finishedOnboarding = JSON.parse(
        localStorage.getItem("onboardingFinished") || "false"
      );
      context.commit("setOnboardingFinished", finishedOnboarding);
      if (finishedOnboarding) {
        context.dispatch("startPollingLocationData");
      }
    },
    resetGameState(context) {
      localStorage.removeItem("unlockedMarkers");
      localStorage.removeItem("gavePermission");
      localStorage.removeItem("onboardingFinished");

      context.commit("resetAllMarkers");

      router.go(-1);
    },
    restoreGameState(context, encodedGameState: string) {
      const toBeUnLocked = parseInt(atob(encodedGameState), 10)
        .toString(2)
        .split("")
        .map((x) => Boolean(parseInt(x, 2)))
        // Reverse because we save as a bit array
        .reverse();

      toBeUnLocked.forEach((v, i) => {
        if (!v) {
          return;
        }

        // Index is zero based, quesstionr is one based
        context.commit("unlockMarker", `${i + 1}`);
      });

      router.go(-1);
    },
  },
});

const locationWatcher = new LocationWatcher(store);
const getLocationWatcher = () => locationWatcher;

export default store;
