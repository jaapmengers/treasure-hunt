<template>
  <main>
    <div id="content">
      <div id="header">
        <slot name="header"></slot>
        <i class="fas fa-times" v-on:click="dismiss()"></i>
      </div>
      <slot name="body" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  methods: {
    dismiss() {
      this.$store.dispatch('dismissModal');
    },
  },
})
export default class Modal extends Vue { }
</script>

<style scoped>
  main {
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #content {
    margin: 0px 20px;
  }

  #content > p {
    font-size: 1.2em;
  }

  #header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #header i {
    font-size: 2em;
  }
</style>
