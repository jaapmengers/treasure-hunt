<template>
  <GmapMap
    :center="{lat:52.362168, lng: 4.855505}"
    :zoom="15"
    map-type-id="terrain"
    :options="{
      disableDefaultUI: true
    }"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :icon="m.icon"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { RootState, Marker } from '../types';

@Component({
  computed: mapState<RootState>({
    markers: (state) => {
      if (state.lastKnownLocation == null) {
        return;
      }

      const { latitude, longitude } = state.lastKnownLocation.coords;
      const markers: Marker[] = state.markers.map((x) => {
        return Object.assign({}, x, { icon: { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' }});
      });

      const yourLocation: Marker[] = [{
        title: 'Your location',
        position: {
          lat: latitude,
          lng: longitude,
        },
      }];

      return markers.concat(yourLocation);
    },
  }),
})
export default class Map extends Vue { }
</script>