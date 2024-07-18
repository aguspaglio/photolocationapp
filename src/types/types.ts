import { CameraCapturedPicture } from "expo-camera";

export interface PhotoType extends CameraCapturedPicture {
    location: string;
}

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
    Photo: { photo: PhotoType, isNewPhoto: boolean };
    Camera: undefined;
  };
  