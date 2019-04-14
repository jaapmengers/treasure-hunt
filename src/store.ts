import Vue from 'vue';
import Vuex from 'vuex';
import { checkIfLocationPermissionGranted, requestLocationPermission } from './utils';
import { RootState } from './types';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    lastKnownLocation: null,
    markers: [
      {
        title: 'Rembrandtpark',
        position: {
          lat: 52.365499,
          lng: 4.845244,
        },
      },
      {
        title: 'Albert Heijn',
        position: {
          lat: 52.364247,
          lng: 4.854836,
        },
      },
      {
        title: 'Edel',
        position: {
          lat: 52.364339,
          lng: 4.858634,
        },
      },
      {
        title: 'Moskee',
        position: {
          lat: 52.365977,
          lng: 4.860608,
        },
      },
      {
        title: 'Edel',
        position: {
          lat: 52.36295,
          lng: 4.862153,
        },
      },
      {
        title: 'Jumbo',
        position: {
          lat: 52.358757,
          lng: 4.854964,
        },
      },
    ],
    permissions: {
      loading: false,
      hasGrantedPermission: false,
    },
  },
  mutations: {
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
  },
});
