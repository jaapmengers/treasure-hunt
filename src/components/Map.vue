<template>
  <GmapMap
    :center="{lat:52.362168, lng: 4.855505}"
    :zoom="15"
    map-type-id="terrain"
    :options="mapOptions"
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
import { mapState } from 'vuex';
import { RootState } from '../types';

@Component({
  computed: mapState<RootState>({
    markers: (state) => {
      if (state.lastKnownLocation == null) {
        return;
      }

      const { latitude, longitude } = state.lastKnownLocation.coords;
      return [{
        position: {
          lat: latitude,
          lng: longitude,
        },
      }];
    },
  }),
  data() {
    return {
      mapOptions: {
        disableDefaultUI: true
      }
    }
  }
})
export default class Map extends Vue { }
</script>