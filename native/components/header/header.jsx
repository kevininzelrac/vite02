import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.h1}>Kev'instagram</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 6,
    backgroundColor: "ghostwhite",
    borderBottomColor: "gainsboro",
    borderBottomWidth: 1,
  },
  h1: {
    flex: 1,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
});
