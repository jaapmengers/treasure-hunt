<script lang="ts">
import type { IHasPosition } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  computed: {
    center() {
      return this.$store.state.lastKnownLocation.position;
    },
    markers() {
      const markers: IHasPosition[] = this.$store.state.markers;
      if (this.$store.state.lastKnownLocation.position == null) {
        return markers;
      }

      const yourLocation: IHasPosition[] = [
        this.$store.state.lastKnownLocation,
      ];
      return yourLocation.concat(markers);
    },
  },
  methods: {
    didClick(marker: IHasPosition) {
      if (!marker.didClick) {
        return;
      }

      marker.didClick(this.$store);
    },
  },
});
</script>

<template>
  <GMapMap
    v-if="center"
    :center="center"
    :zoom="15"
    map-type-id="terrain"
    :options="{
      disableDefaultUI: true,
      clickableIcons: false,
    }"
    style="width: 100vw; height: 100vh"
  >
    <GMapMarker
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
  </GMapMap>
  <div v-else id="loading">
    <span>Locatie ophalen...</span>
  </div>
  <router-view />
</template>

<style>
#loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
}
</style>
