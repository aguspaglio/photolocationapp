import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./CustomButton.styles";
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  type = "primary",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, type === "secondary" && styles.secondary]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          type === "secondary" && styles.buttonTextSecondary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
