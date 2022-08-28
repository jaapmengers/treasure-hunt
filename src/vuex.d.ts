import { Store } from "vuex";
import type { RootState } from "./types";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}
