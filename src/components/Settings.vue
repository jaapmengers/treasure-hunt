<template>
  <Modal>
    <template v-slot:header>
      <h1>Settings</h1>
    </template>
    <template v-slot:body>
      <p>
        Herstel eerdere spelstatus:
      </p>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Modal from '@/views/Modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class Settings extends Vue { }
</script>

<style scoped>
  p {
    font-size: 1.2em;
  }
</style>
