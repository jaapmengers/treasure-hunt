import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import "./assets/main.css";
import store from "./store";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCBrMcezpc02EZI8GRaRTwqF9p0EbHIGXo",
  },
});

app.mount("#app");
