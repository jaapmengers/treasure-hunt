import Vue from 'vue';
import Vuex from 'vuex';
import { checkIfLocationPermissionGranted, requestLocationPermission } from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasGrantedPermission: false,

  },
  mutations: {
    setPermissionState(state, permissionGranted) {
      state.hasGrantedPermission = permissionGranted;
    },
  },
  actions: {
    async checkForLocationPermission(context) {
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
