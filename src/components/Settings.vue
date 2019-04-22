<template>
  <Modal>
    <template v-slot:header>
      <h1>Settings</h1>
    </template>
    <template v-slot:body>
      <div>
        Herstel eerdere spelstatus:<br/>
        <input type="text" v-model="code" placeholder="Secret code"/>
        <button type="submit" v-on:click="restore()">Herstel</button>
      </div>
      <div>
        <button type="submit" v-on:click="resetState()">Reset voortgang</button>
      </div>
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
  data() {
    return {
      code: '',
    };
  },
  methods: {
    restore() {
      if (!this.$data.code) {
        return;
      }

      this.$store.dispatch('restoreGameState', this.$data.code);
    },
    resetState() {
      this.$store.dispatch('resetGameState');
    },
  },
})
export default class Settings extends Vue { }
</script>

<style scoped>
  p {
    font-size: 1.2em;
  }
</style>
