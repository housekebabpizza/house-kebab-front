import { IFormAddress } from "@/src/types";
import { getDistance } from "geolib";

export const calculateDistance = async (form: IFormAddress): Promise<number> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${form?.street?.toLowerCase()}+${
        form?.home
      }+warszawa+poland&dedupe=0&limit=1&format=jsonv2`
    );
    const data = await res.json();
    const restaurantCoordinates = { latitude: 52.28277, longitude: 20.97277 };
    const clientCoordinates = { latitude: data[0]?.lat ?? 0, longitude: data[0]?.lon ?? 0 };
    return getDistance(restaurantCoordinates, clientCoordinates) / 1000;
  } catch (e) {
    console.log(e);
  }
  return 0;
};
