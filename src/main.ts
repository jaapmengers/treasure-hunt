import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCBrMcezpc02EZI8GRaRTwqF9p0EbHIGXo"
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch("restoreStoredState");
  }
}).$mount("#app");
