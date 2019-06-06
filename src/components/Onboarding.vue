<template>
    <div v-if="permissions.hasGrantedPermission">
      <h1>Je bent ready to go!</h1>

      <p>Zodra het startsein wordt gegeven kun je hier de spelcode invullen en kun je met je team aan de slag!</p>

      <input v-model="gameCode">
    </div>
    <div v-else>
      <h1>Klaar om te beginnen?</h1>
      <p>Mooi! Maar je moet eerst nog even locatietoestemming geven. </p>
      <p>Je krijgt zo een pop up met de vraag of jaap.dev je locatie mag weten. 
        Klik op 'Allow'. Ik beloof dat ik er geen misbruik van zal maken.</p>
      <button :disabled="permissions.loading" v-on:click="requestPermission()">Ik snap het, let's go!</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { RootState } from '../types';

export default Vue.extend({
  computed: mapState([
   'permissions',
  ]),
  data() {
    return {
      gameCode: '',
    };
  },
  watch: {
    gameCode() {
      if (this.$data.gameCode.toUpperCase() === 'VD2019') {
        this.$store.commit('setOnboardingFinished', true);
        this.$store.dispatch('startPollingLocationData');
      }
    },
  },
  methods: {
    requestPermission() {
      return this.$store.dispatch('requestLocationPermission');
    },
  },
});
</script>

<style scoped>
  div {
    margin: 0px 20px;
  }

  button {
    background-color: white;
    display: block;
    text-align: center;
    margin: 30px 0px;
    font-size: 1.3em;
    border: 1px solid #42b983;
    color: #42b983;
    padding: 10px;
    text-decoration: none;
    width: 100%;
    font-family: Avenir,Helvetica,Arial,sans-serif;
  }

  button:disabled {
    color: lightgray;
    border: 1px solid lightgray;
  }

  input {
    display: block;
    margin: 0 auto;
    border: 1px solid #42b983;
    color: #42b983;
    font-size: 1.5em;
    width: 100%;
    outline: none;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    text-transform: uppercase;
  }
</style>


