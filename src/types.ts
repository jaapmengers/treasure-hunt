export interface IHasPosition {
  position: {
    lat: number;
    lng: number;
  };
  icon: () => any | null;
  label: () => { text: string } | null;
}

export class UserLocation implements IHasPosition {
  public position: { lat: number; lng: number; };

  constructor(lat: number, lng: number) {
    this.position = { lat, lng };
  }

  public icon() {
    return {
      url: '/img/current-location.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
  }

  public label() {
    return null;
  }
}

declare var google: any;

// tslint:disable-next-line: max-classes-per-file
export class Marker implements IHasPosition {
  public index: number;
  public title: string;
  public locked: boolean;
  public position: { lat: number; lng: number; };

  constructor(index: number, title: string, lat: number, lng: number, locked: boolean = true) {
    this.index = index;
    this.title = title;
    this.locked = locked;
    this.position = { lat, lng };
  }

  public unlock() {
    return new Marker(this.index, this.title, this.position.lat, this.position.lng, false);
  }

  public icon() {
    return {
        path: 'M22-48h-44v43h16l6 5 6-5h16z',
        fillColor: this.locked ? '#f6f6f6' : '#42b983',
        fillOpacity: 1,
        anchor: new google.maps.Point(0, 0),
        strokeWeight: 1,
        strokeColor: this.locked ? '#7f8c8d' : '#2c3e50',
        scale: 1,
        labelOrigin: new google.maps.Point(1, -25),
    };
  }

  public label() {
    return { text: `${this.index}.`, color: this.locked ? '#7f8c8d' : '#2c3e50' };
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
