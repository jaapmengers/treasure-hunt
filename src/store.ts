import Vue from 'vue';
import Vuex, { Store} from 'vuex';
import { checkIfLocationPermissionGranted, requestLocationPermission, distance } from './utils';
import { RootState, Marker } from './types';
import router from './router';

Vue.use(Vuex);

const saveMarkersPlugin = (store: Store<RootState>) => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'unlockMarker') {
      const unlocked = state.markers.filter((x) => !x.locked).map((x) => x.questionnr);

      localStorage.setItem('unlockedMarkers', JSON.stringify(unlocked));
    }
  });
};

export default new Store<RootState>({
  state: {
    lastKnownLocation: null,
    markers: [
      new Marker('1', 'Rembrandtpark', 52.365499, 4.845244),
      new Marker('2', 'Albert Heijn', 52.364247, 4.854836),
      new Marker('3', 'Edel', 52.364339, 4.858634),
      new Marker('4', 'Moskee', 52.365977, 4.86060),
      new Marker('5', 'Lennep', 52.36295, 4.862153),
      new Marker('6', 'Jumbo', 52.358757, 4.854964),
    ],
    permissions: {
      loading: false,
      hasGrantedPermission: false,
    },
  },
  plugins: [saveMarkersPlugin],
  mutations: {
    unlockMarker(state, questionnr: string) {
      const index = state.markers.findIndex((x) => x.questionnr === questionnr);

      if (index < 0) {
        return;
      }

      Vue.set(state.markers, index, state.markers[index].unlock());
    },
    setLastKnownLocation(state, lastKnownLocation: Position) {
      state.lastKnownLocation = lastKnownLocation;
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
  },
  actions: {
    async unlockNearbyLocations(context, lastKnownLocation: Position) {
      const { latitude, longitude } = lastKnownLocation.coords;

      const shouldBeUnlocked = (x: Marker) => {
        const closeEnough = distance(x.position.lat, x.position.lng, latitude, longitude) <= 50;
        return closeEnough && x.locked;
      };

      const toBeUnLocked = context.state.markers.filter(shouldBeUnlocked);

      toBeUnLocked.forEach((x) => context.commit('unlockMarker', x.questionnr));
    },
    async checkForLocationPermission(context) {
      context.commit('permissionStateIsLoading');
      const result = await checkIfLocationPermissionGranted();

      context.commit('setPermissionState', result);
    },
    async requestLocationPermission(context) {
      try {
        await requestLocationPermission();
      } finally {
        context.dispatch('checkForLocationPermission');
      }
    },
    openQuestion(context, questionnr: string) {
      router.push({ name: 'vraag', params: { questionnr } });
    },
    dismissModal(context) {
      router.go(-1);
    },
    openSettings(context) {
      router.push('settings');
    },
    restoreStoredState(context) {
      const unlockedStr = localStorage.getItem('unlockedMarkers');
      if (!unlockedStr) {
        return;
      }

      const unlocked: string[] = JSON.parse(unlockedStr);
      if (!unlocked) {
        return;
      }

      unlocked.forEach((x) => context.commit('unlockMarker', x));
    },
    resetGameState(context) {
      localStorage.removeItem('unlockedMarkers');
      context.commit('resetAllMarkers');

      router.go(-1);
    },
    restoreGameState(context, encodedGameState: string) {
      const toBeUnLocked = parseInt(atob(encodedGameState), 10)
        .toString(2)
        .split('')
        .map((x) => Boolean(parseInt(x, 2)))
        // Reverse because we save as a bit array
        .reverse();

      toBeUnLocked.forEach((v, i) => {
        if (!v) {
          return;
        }

        // Index is zero based, quesstionr is one based
        context.commit('unlockMarker', `${i + 1}`);
      });

      router.go(-1);
    },
  },
});
