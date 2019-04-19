import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import LocationWatcher from './locationwatcher';
import './registerServiceWorker';
import * as Shake from 'shake.js';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCBrMcezpc02EZI8GRaRTwqF9p0EbHIGXo',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.dispatch('checkForLocationPermission');
  },
}).$mount('#app');

new LocationWatcher(store).watchForLocationChanges(1000);


window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  alert('Error occured: ' + errorMsg);
  return false;
};

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur () {

    //put your own code here etc.
    alert('shake!');
}
