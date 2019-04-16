export interface IHasPosition {
  position: {
    lat: number;
    lng: number;
  };
  icon: () => { url: string } | null;
}

export class UserLocation implements IHasPosition {
  public position: { lat: number; lng: number; };

  constructor(lat: number, lng: number) {
    this.position = { lat, lng };
  }

  public icon() { return null; }
}

// tslint:disable-next-line: max-classes-per-file
export class Marker implements IHasPosition {
  public title: string;
  public locked: boolean;
  public position: { lat: number; lng: number; };

  constructor(title: string, lat: number, lng: number, locked: boolean = true) {
    this.title = title;
    this.locked = locked;
    this.position = { lat, lng };
  }

  public unlock() {
    return new Marker(this.title, this.position.lat, this.position.lng, false);
  }

  public icon() {
    const url = this.locked ?
    'https://maps.google.com/mapfiles/ms/icons/red-dot.png' :
    'https://maps.google.com/mapfiles/ms/icons/green-dot.png';

    return { url };
  }
}

export interface RootState {
  lastKnownLocation: Position | null;
  markers: Marker[];
  permissions: {
    loading: boolean,
    hasGrantedPermission: boolean,
  };
}
