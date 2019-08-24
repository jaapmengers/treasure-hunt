<template>
  <Modal v-if="!!marker">
    <template v-slot:header>
      <h1>Vraag {{ questionnr }}.</h1>
    </template>
    <template v-slot:body>
      <p>
        {{ marker.body }}
      </p>

      <img v-if="!!marker.image" :src="`/img/${marker.image}`" />
      <a :href="`https://wa.me/31646156035?text=Vraag ${questionnr}: `" id="whatsapp-button">Antwoord via WhatsApp</a>
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

  img { 
    display: block;
    max-width: 100%;
    overflow: hidden;
  }

  #whatsapp-button {
    display: block;
    text-align: center;
    margin: 30px 10px;
    font-size: 1.3em;
    border: 1px solid #42b983;
    color: #42b983;
    padding: 10px;
    text-decoration: none;
  }
</style>
