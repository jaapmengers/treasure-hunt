<template>
  <main>
    <div id="content">
      <div id="header">
        <slot name="header"></slot>
        <span class="button" v-on:click="dismiss()">×</span>
      </div>
      <slot name="body" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    dismiss() {
      this.$store.dispatch("dismissModal");
    },
  },
});
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

.button {
  font-size: 2em;
}
</style>
