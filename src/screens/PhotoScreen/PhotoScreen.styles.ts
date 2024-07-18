import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fcfcfc",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 30,
      justifyContent: 'space-between',
    },
    photo: {
        width: '100%',
        height: 500,
        borderRadius: 8,
    },
    buttonsContainer: {
        gap: 8
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
    }
  });