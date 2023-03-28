import { StyleSheet, Text, View } from "react-native";

export default function Chat() {
  return (
    <View style={styles.chat}>
      <Text>Chat / Todo...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    width: "100%",
  },
});
