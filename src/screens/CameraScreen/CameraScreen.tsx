import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./CameraScreen.styles";
import { CameraScreenProps } from "./CameraScreen.types";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { PhotoType } from "../../types/types";
import { Entypo } from "@expo/vector-icons";
import ImageCard from "../../components/ImageCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocationAsync } from "../../utils/getLocationAsync";

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [location, setLocation] = useState<string | null>(
    null
  );
  const [permission, requestPermission] = useCameraPermissions();
  const isScreenFocused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);

  const loadPhotos = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem("photos");
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const requestLocation = async () => {
        try {
          const currentLocation = await getLocationAsync({ navigation });
          setLocation(currentLocation);
        } catch (error) {
          console.error("Error getting location:", error);
        }
      };

      requestLocation();
      loadPhotos();
    }, [])
  );

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && location) {
          const photoWithLocation: PhotoType = { ...photo, location };
          navigation.navigate("Photo", {
            photo: photoWithLocation,
            isNewPhoto: true,
          });
        }
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleGallery = () => {
    navigation.navigate("Main");
  }

  if (!location || !permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6653CF" />
        <View style={styles.textLoading}>
          <Entypo name="location-pin" size={24} color="#6653CF" />
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Loading your location...
          </Text>
        </View>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScreenFocused && (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handleGallery}
            >
              <ImageCard size={40} src={photos[photos.length - 1]?.uri} />
              </TouchableOpacity>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={handleTakePhoto}
            />
            <TouchableOpacity
              style={styles.rotateButton}
              onPress={toggleCameraFacing}
            >
              <Entypo name="back" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default CameraScreen;
