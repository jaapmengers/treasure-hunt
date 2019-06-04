<template>
  <div v-if="loading"></div>
  <div v-else id="container">
    <Map v-if="hasFinishedOnboarding" />
    <Onboarding v-else />
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/Map.vue';
import Onboarding from '@/components/Onboarding.vue';
import { mapState } from 'vuex';

declare var google: any;

@Component({
  data() {
    return {
      loading: true,
      interval: '',
    };
  },
  mounted() {
    this.$data.interval = setInterval(() => {
      this.$data.loading = !google;

      if (!this.$data.loading) {
        clearInterval(this.$data.interval);
      }
    }, 50);
  },
  beforeDestroy() {
    if (this.$data.interval) {
      clearInterval(this.$data.interval);
    }
  },
  components: {
    Map,
    Onboarding,
  },
  computed: mapState([
    'hasFinishedOnboarding',
  ]),
})
export default class Home extends Vue { }
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

.slide-enter, .slide-leave-to {
  top: 100%;
}

.slide-enter-active, .slide-leave-active {
  transition: top 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>

