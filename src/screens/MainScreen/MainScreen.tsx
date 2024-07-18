import React, { useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { MainScreenProps } from "./MainScreen.types";
import { styles } from "./MainScreen.styles";
import ImageCard from "../../components/ImageCard";
import CustomButton from "../../components/CustomButton/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { PhotoType } from "../../types/types";

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);

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
      loadPhotos();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imagesContainer}>
        {photos.length === 0 && (
          <View style={styles.emptyState}>
            <Entypo name="camera" size={40} color="#6653CF" />
            <Text style={styles.emptyStateText}>{'There are no photos yet 😢.\nStart taking now!'}</Text>
          </View>
        )}
        {photos.map((photo, index) => (
          <ImageCard
            key={index}
            onPress={() => navigation.navigate("Photo", { photo, isNewPhoto: false })}
            src={photo.uri}
          />
        ))}
      </View>
      <CustomButton
        title="Take a photo"
        onPress={() => navigation.navigate("Camera")}
      />
    </ScrollView>
  );
};

export default MainScreen;
