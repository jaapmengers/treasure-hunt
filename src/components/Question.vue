<template>
  <transition>
    <div v-on:click="dismiss()">
      <h1>Hallo met Jaap?</h1>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  methods: {
    dismiss() {
      this.$store.dispatch('dismissQuestion');
    },
  },
})
export default class Question extends Vue { }
</script>

<style scoped>
  div {
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
