export interface RootState {
  lastKnownLocation: Position | null;
  permissions: {
    loading: boolean,
    hasGrantedPermission: boolean,
  };
}
