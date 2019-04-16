<template>
  <div id="container">
    <div v-if="permissions.loading">
      Loading...
    </div>
    <Map v-else-if="permissions.hasGrantedPermission" />
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

@Component({
  components: {
    Map,
    Onboarding,
  },
  computed: {
    permissions() {
      return this.$store.state.permissions;
    },
  },
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

