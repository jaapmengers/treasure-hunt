<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import store from "./store";
import OnboardingView from "./views/OnboardingView.vue";

export default defineComponent({
  components: {
    OnboardingView,
  },
  created() {
    store.dispatch("restoreStoredState");
  },
  computed: mapState(["hasFinishedOnboarding"]),
});
</script>

<template>
  <RouterView v-if="hasFinishedOnboarding" />
  <OnboardingView v-else />
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
