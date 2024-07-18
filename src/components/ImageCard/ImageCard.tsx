import { Image } from "react-native";
import { styles } from "./ImageCard.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageCardProps } from "./ImageCard.types";

const ImageCard = ({ onPress, src, size = 95 }: ImageCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={[styles.image, { width: size, height: size }]} source={{ uri: src }} />
    </TouchableOpacity>
  );
};

export default ImageCard;
