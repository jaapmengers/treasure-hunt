import Vue from 'vue';
import Vuex from 'vuex';
import { checkIfLocationPermissionGranted, requestLocationPermission, distance } from './utils';
import { RootState, Marker } from './types';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    lastKnownLocation: null,
    markers: [
      new Marker('Rembrandtpark', 52.365499, 4.845244),
      new Marker('Albert Heijn', 52.364247, 4.854836),
      new Marker('Edel', 52.364339, 4.858634),
      new Marker('Moskee', 52.365977, 4.86060),
      new Marker('Lennep', 52.36295, 4.862153),
      new Marker('Jumbo', 52.358757, 4.854964),
    ],
    permissions: {
      loading: false,
      hasGrantedPermission: false,
    },
  },
  mutations: {
    unlockMarker(state, markerTitle: string) {
      const index = state.markers.findIndex((x) => x.title === markerTitle);

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
  },
  actions: {
    async unlockNearbyLocations(context, lastKnownLocation: Position) {
      const { latitude, longitude } = lastKnownLocation.coords;

      const shouldBeUnlocked = (x: Marker) => {
        const closeEnough = distance(x.position.lat, x.position.lng, latitude, longitude) <= 50;
        return closeEnough && x.locked;
      };

      const toBeUnLocked = context.state.markers.filter(shouldBeUnlocked);
      toBeUnLocked.forEach((x) => context.commit('unlockMarker', x.title));
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
    openQuestion(context, title: string) {
      console.log(title);
    }
  },
});
