<template>
  <GmapMap
    :center="yourLocation"
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
      :zIndex="m.zIndex"
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
    yourLocation: (state) => {
      return state.lastKnownLocation.position || { lat: 51.966129, lng: 6.566589 };
    },
    markers: (state) => {
      const markers: IHasPosition[] = state.markers;
      if (state.lastKnownLocation.position == null) {
        return markers;
      }

      const yourLocation: IHasPosition[] = [state.lastKnownLocation];
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