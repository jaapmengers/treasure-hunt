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
      :icon="icon"
      :label="{'text': '31'}"
      :clickable="true"
      :draggable="true"
      @click="didClick(m)"
    />
  </GmapMap>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { RootState, Marker, UserLocation, IHasPosition } from '../types';
import { gmapApi } from 'vue2-google-maps';

declare var google: any;

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
  data() {
    return {
      icon: {
        path: 'M22-48h-44v43h16l6 5 6-5h16z',
        fillColor: '#FF0000',
        fillOpacity: 1,
        anchor: new google.maps.Point(0, 0),
        strokeWeight: 1,
        scale: 1,
        size: new google.maps.Point(10, 10),
        labelOrigin: new google.maps.Point(1, -25),
      },
    };
  },
})
export default class Map extends Vue { }
</script>