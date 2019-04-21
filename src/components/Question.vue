<template>
  <Modal v-if="!!marker">
    <template v-slot:header>
      <h1>Vraag {{ questionnr }}.</h1>
    </template>
    <template v-slot:body>
      <p>
        {{ marker.title }}
      </p>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Modal from '@/views/Modal.vue';
import { RootState } from '../types';
import { Store } from 'vuex';

@Component({
  components: {
    Modal,
  },
  computed: {
    marker() {
      const marker = (this.$store as Store<RootState>)
        .state.markers.find((x) => x.questionnr === this.$props.questionnr);

      if (!!marker && !marker.locked) {
        return marker;
      }

      return null;
    },
  },
  props: ['questionnr'],
})
export default class Question extends Vue { }
</script>

<style scoped>
  p {
    font-size: 1.2em;
  }
</style>
