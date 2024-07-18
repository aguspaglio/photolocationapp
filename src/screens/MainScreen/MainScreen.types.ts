import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";

export type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export type MainScreenProps = {
  navigation: MainScreenNavigationProp;
};
