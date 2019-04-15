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
      :icon="m.icon()"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { RootState, Marker, UserLocation, IHasPosition } from '../types';

@Component({
  computed: mapState<RootState>({
    markers: (state) => {
      if (state.lastKnownLocation == null) {
        return;
      }

      const { latitude, longitude } = state.lastKnownLocation.coords;
      const markers: IHasPosition[] = state.markers;
      const yourLocation: IHasPosition[] = [new UserLocation(latitude, longitude)];

      return markers.concat(yourLocation);
    },
  }),
})
export default class Map extends Vue { }
</script>