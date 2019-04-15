export async function checkIfLocationPermissionGranted(): Promise<boolean> {
  const nav = navigator as Navigator;
  if (!nav) {
    return false;
  }

  if (!!navigator.permissions) {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state === 'granted';
  }

  try {
    await requestLocationPermission();
    return true;
  } catch {
    return false;
  }
}

export async function requestLocationPermission(): Promise<void> {
  if (!navigator.geolocation) {
    return;
  }

  await getCurrentLocation();
  return;
}

export async function getCurrentLocation(): Promise<Position> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      resolve(position);
    }, (err: PositionError) => {
      reject(err);
    });
  });
}

// Taken from https://stackoverflow.com/a/21623206
export function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * 1000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
