export interface Marker {
  icon?: {
    url: string;
  };
  title: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface RootState {
  lastKnownLocation: Position | null;
  markers: Marker[];
  permissions: {
    loading: boolean,
    hasGrantedPermission: boolean,
  };
}
