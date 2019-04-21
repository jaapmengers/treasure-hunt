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
      :clickable="m.clickable"
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
      if (state.lastKnownLocation == null) {
        return;
      }

      const { latitude, longitude } = state.lastKnownLocation.coords;
      const markers: IHasPosition[] = state.markers;
      const yourLocation: IHasPosition[] = [new UserLocation(latitude, longitude)];

      return markers.concat(yourLocation);
    },
  }),
  methods: {
    didClick(marker: Marker) {
      this.$store.dispatch('openQuestion', marker.title);
    },
  },
})
export default class Map extends Vue { }
</script>