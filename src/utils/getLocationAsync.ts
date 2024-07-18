import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import { RootStackParamList } from "../types/types";
import { reverseGeocodeLocation } from "./reverseGeocodeLocation";

type Navigationprop = StackNavigationProp<RootStackParamList>;


export const getLocationAsync = async ({ navigation }: { navigation: Navigationprop }) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permissions are required to use this app.');
      navigation.navigate('Main');
      return null;
    }
  
    try {
      let lastKnownLocation = await Location.getLastKnownPositionAsync();
      if (lastKnownLocation) {
        return await reverseGeocodeLocation(lastKnownLocation);
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
  
      return await reverseGeocodeLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };