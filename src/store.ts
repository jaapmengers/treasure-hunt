import Vue from 'vue';
import Vuex from 'vuex';
import { checkIfLocationPermissionGranted, requestLocationPermission } from './utils';
import { RootState } from './types';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    permissions: {
      loading: false,
      hasGrantedPermission: false,
    },
  },
  mutations: {
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
