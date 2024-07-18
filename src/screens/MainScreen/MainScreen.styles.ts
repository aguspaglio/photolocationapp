import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  emptyState: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6653CF",
    gap: 8
  },
  emptyStateText: {
    color: "#6653CF",
    fontSize: 16,
    textAlign: "center",
  },
});
