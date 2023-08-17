export function isStoreOpenStore(openTime: string, closeTime: string) {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentSeconds = now.getSeconds();

  const openHours = Number(openTime.split(":")[0]);
  const openMinutes = Number(openTime.split(":")[1]);
  const openSeconds = Number(openTime.split(":")[2]);

  const closeHours = Number(closeTime.split(":")[0]);
  const closeMinutes = Number(closeTime.split(":")[1]);
  const closeSeconds = Number(closeTime.split(":")[2]);

  if (currentHours > openHours && currentHours < closeHours) {
    return true;
  } else if (currentHours === openHours && currentMinutes >= openMinutes && currentSeconds >= openSeconds) {
    return true;
  } else if (currentHours === closeHours && currentMinutes < closeMinutes) {
    return true;
  } else {
    return false;
  }
}
