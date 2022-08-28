import type { Store } from "vuex";
import { getCurrentLocation } from "./utils";

export default class LocationWatcher<T> {
  private store: Store<T>;

  constructor(store: Store<T>) {
    this.store = store;
  }

  public watchForLocationChanges(timeout: number) {
    // TODO: save interval ref, so we can unsubscribe
    setInterval(async () => {
      try {
        const location = await getCurrentLocation();

        this.store.commit("setLastKnownLocation", location);
        this.store.dispatch("unlockNearbyLocations", location);
      } catch {
        // do nothing for now
      }
    }, timeout);
  }
}
