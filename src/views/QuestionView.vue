<template>
  <ModalView>
    <template v-slot:header>
      <h1>Vraag {{ questionnr }}.</h1>
    </template>
    <template v-slot:body>
      <p>
        {{ marker?.body }}
      </p>

      <img v-if="!!marker?.image" :src="marker.image" />
      <a
        :href="`https://wa.me/${phonenumber}?text=Vraag ${questionnr}: `"
        target="_blank"
        id="whatsapp-button"
        >Antwoord via WhatsApp</a
      >
    </template>
  </ModalView>
</template>

<script lang="ts">
import type { RootState } from "@/types";
import { defineComponent } from "vue";
import type { Store } from "vuex";
import ModalView from "./ModalView.vue";

export default defineComponent({
  components: {
    ModalView,
  },
  computed: {
    phonenumber() {
      return import.meta.env.VITE_PHONENUMBER;
    },
    marker() {
      const marker = (this.$store as Store<RootState>).state.markers.find(
        (x) => x.questionnr === this.$props.questionnr
      );

      if (!!marker && !marker.locked) {
        return marker;
      }

      return null;
    },
  },
  props: ["questionnr"],
});
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
