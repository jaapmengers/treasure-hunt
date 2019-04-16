<template>
  <div id="container">
    <div v-if="permissions.loading">
      Loading...
    </div>
    <Map v-else-if="permissions.hasGrantedPermission" />
    <Onboarding v-else />
    <router-view></router-view>
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
</style>

