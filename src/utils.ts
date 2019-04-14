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
