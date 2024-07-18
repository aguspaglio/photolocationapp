import { TextStyle, ViewStyle } from "react-native";

export interface CustomButtonProps {
    title: string;
    onPress: () => void;
    type?: "primary" | "secondary";
    style?: ViewStyle;
    textStyle?: TextStyle;
  };
  