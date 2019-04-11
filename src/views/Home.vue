<template>
  <div v-if="permissions.loading">
    Loading...
  </div>
  <Map v-else-if="permissions.hasGrantedPermission" />
  <Onboarding v-else />
  <!-- <a href="https://wa.me/31654237212?text=Hallo dit is m'n bericht">Stuur bericht</a> -->
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
