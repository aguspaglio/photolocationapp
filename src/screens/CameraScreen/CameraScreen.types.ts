import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";

export type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

export type CameraScreenProps = {
  navigation: CameraScreenNavigationProp;
};
