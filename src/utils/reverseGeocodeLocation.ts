import * as Location from "expo-location";


export const reverseGeocodeLocation = async (location: Location.LocationObject) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );
      const data = await response.json();
      const currentLocation = `${data.address.suburb}, ${data.address.country}`;
      return currentLocation;
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      return null;
    }
  };