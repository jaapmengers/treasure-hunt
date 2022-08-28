import type { Store } from "vuex";

export interface IHasPosition {
  position: {
    lat: number;
    lng: number;
  } | null;
  icon: () => any | null;
  label: () => { text: string } | null;
  zIndex: number;
  didClick?: (store: Store<RootState>) => void;
}

export class UserLocation implements IHasPosition {
  public position: { lat: number; lng: number } | null;

  public counter = 0;
  public timeoutRef: number | undefined;

  public zIndex = 0;

  constructor(lat?: number, lng?: number) {
    if (!!lat && !!lng) {
      this.position = { lat, lng };
      return;
    }

    this.position = null;
  }

  public icon() {
    return {
      url: "/current-location.png",
      scaledSize: { width: 50, height: 50 },
    };
  }

  public label() {
    return null;
  }

  public didClick(store: Store<RootState>) {
    clearTimeout(this.timeoutRef);

    this.counter++;
    if (this.counter > 4) {
      store.dispatch("openSettings");
    }

    this.timeoutRef = setTimeout(() => {
      this.counter = 0;
    }, 1000);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class Marker implements IHasPosition {
  public questionnr: string;
  public body: string;
  public locked: boolean;
  public position: { lat: number; lng: number };
  public image: string;

  public zIndex = 1;

  constructor(
    questionnr: string,
    body: string,
    lat: number,
    lng: number,
    image: string,
    locked = true
  ) {
    this.questionnr = questionnr;
    this.body = body;
    this.locked = locked;
    this.position = { lat, lng };
    this.image = image;
  }

  public unlock() {
    return new Marker(
      this.questionnr,
      this.body,
      this.position.lat,
      this.position.lng,
      this.image,
      false
    );
  }

  public reset() {
    return new Marker(
      this.questionnr,
      this.body,
      this.position.lat,
      this.position.lng,
      this.image,
      true
    );
  }

  public icon() {
    return {
      path: "M22-48h-44v43h16l6 5 6-5h16z",
      fillColor: this.locked ? "#f6f6f6" : "#42b983",
      fillOpacity: 1,
      anchor: { x: 0, y: 0 },
      strokeWeight: 1,
      strokeColor: this.locked ? "#7f8c8d" : "#2c3e50",
      scale: 1,
      labelOrigin: { x: 1, y: -25 },
    };
  }

  public label() {
    return {
      text: `${this.questionnr}.`,
      color: this.locked ? "#7f8c8d" : "#2c3e50",
    };
  }

  public didClick(store: Store<RootState>) {
    if (this.locked) {
      return;
    }

    store.dispatch("openQuestion", `${this.questionnr}`);
  }
}

export interface RootState {
  lastKnownLocation: UserLocation;
  initialLocation: { lat: Number, lng: Number} | null;
  markers: Marker[];
  permissions: {
    loading: boolean;
    hasGrantedPermission: boolean;
  };
  hasFinishedOnboarding: boolean;
}
