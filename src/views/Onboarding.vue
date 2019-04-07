<template>
    <div v-if="hasGrantedPermission">
      Permissies gegeven
    </div>
    <div v-else>
      <a v-on:click="givePermission">Geef permissies</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  computed: {
    hasGrantedPermission() {
      return store.state.hasGrantedPermission;
    },
  },
  methods: {
    givePermission() {
      return store.dispatch('requestLocationPermission');
    },
  },
});
</script>

