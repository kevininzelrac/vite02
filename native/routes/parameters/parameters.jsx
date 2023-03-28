import { StyleSheet, Text, View } from "react-native";

export default function Parameters() {
  return (
    <View style={styles.parameters}>
      <Text>Parameters / Todo...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  parameters: {
    flex: 1,
    width: "100%",
  },
});
