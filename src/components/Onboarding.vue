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
import { mapState } from 'vuex';
import { RootState } from '../types';

export default Vue.extend({
  computed: mapState([
   'hasGrantedPermission',
  ]),
  methods: {
    givePermission() {
      return this.$store.dispatch('requestLocationPermission');
    },
  },
});
</script>

