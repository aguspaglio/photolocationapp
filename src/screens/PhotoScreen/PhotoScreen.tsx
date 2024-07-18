import { Image, Text, View } from "react-native";
import { PhotoScreenProps } from "./PhotoScreen.types";
import { styles } from "./PhotoScreen.styles";
import CustomButton from "../../components/CustomButton/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhotoType } from "../../types/types";
import { Entypo } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";

const PhotoScreen: React.FC<PhotoScreenProps> = ({ route, navigation }) => {
  const { photo, isNewPhoto } = route?.params;

  const savePhoto = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem("photos");
      let photos = storedPhotos ? JSON.parse(storedPhotos) : [];
      photos.push(photo);
      await AsyncStorage.setItem("photos", JSON.stringify(photos));
      alert("Photo saved successfully!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  const removePhoto = async () => {
    try {
      const storedPhotos = await AsyncStorage.getItem("photos");
      let photos: PhotoType[] = storedPhotos ? JSON.parse(storedPhotos) : [];
      photos = photos.filter((item) => item.uri !== photo.uri);
      await AsyncStorage.setItem("photos", JSON.stringify(photos));
      alert("Photo removed successfully!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  const handleDismissPhoto = () => {
    isNewPhoto ? navigation.navigate("Camera") : navigation.navigate("Main");
  };

  const sharePhoto = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on this platform");
      return;
    }
    try {
      await Sharing.shareAsync(photo.uri);
    } catch (error) {
      console.error("Error sharing photo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo?.uri }} style={styles.photo} />
      <View style={styles.location}>
        <Entypo name="location-pin" size={18} color="#6653CF" />
        <Text>{photo.location}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title={isNewPhoto ? "Save photo" : "Remove photo"}
          onPress={isNewPhoto ? savePhoto : removePhoto}
        />
        {!isNewPhoto ? (
          <CustomButton
            title="Share photo"
            onPress={sharePhoto}
            type="secondary"
          />
        ) : (
          <CustomButton
            title="Dismiss photo"
            onPress={handleDismissPhoto}
            type="secondary"
          />
        )}
      </View>
    </View>
  );
};

export default PhotoScreen;
