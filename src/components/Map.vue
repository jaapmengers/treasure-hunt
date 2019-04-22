<template>
  <GmapMap
    :center="{lat:52.362168, lng: 4.855505}"
    :zoom="15"
    map-type-id="terrain"
    :options="{
      disableDefaultUI: true,
      clickableIcons: false
    }"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :icon="m.icon()"
      :label="m.label()"
      :clickable="m.didClick != null"
      :draggable="false"
      @click="didClick(m)"
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
      const markers: IHasPosition[] = state.markers;
      if (state.lastKnownLocation == null) {
        return markers;
      }

      const { latitude, longitude } = state.lastKnownLocation.coords;
      const yourLocation: IHasPosition[] = [new UserLocation(latitude, longitude)];

      return yourLocation.concat(markers);
    },
  }),
  methods: {
    didClick(marker: IHasPosition) {
      if (!marker.didClick) {
        return;
      }

      marker.didClick(this.$store);
    },
  },
})
export default class Map extends Vue { }
</script>