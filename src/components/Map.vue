<template>
  <GmapMap
    :center="{lat:51.966652, lng: 6.567067}"
    :zoom="15"
    map-type-id="terrain"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  data() {
    return {
      markers: [{
        position: {
          lat: 51.966652,
          lng: 6.567067,
        },
      }],
    };
  },
})
export default class Map extends Vue { }
</script>