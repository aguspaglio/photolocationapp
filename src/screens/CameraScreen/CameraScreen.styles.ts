import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    margin: 64,
  },
  takePhotoButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#FCFCFC",
    justifyContent: "center",
  },
  rotateButton: {
    alignSelf: "flex-end"
  },
  galleryButton: {
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  textLoading: { 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6 
  },
});
