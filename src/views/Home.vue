<template>

  <a href="https://wa.me/31654237212?text=Hallo dit is m'n bericht">Stuur bericht</a>

  <!-- <Map /> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/Map.vue';

@Component({
  components: {
    Map,
  },
})
export default class Home extends Vue {}
</script>
