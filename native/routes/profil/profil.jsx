import { StyleSheet, Text, View } from "react-native";

export default function Profil() {
  return (
    <View style={styles.profil}>
      <Text>Profile / Todo...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profil: {
    flex: 1,
    width: "100%",
  },
});
