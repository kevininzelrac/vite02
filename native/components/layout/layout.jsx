import { StyleSheet, Text, View } from "react-native";
import { Outlet } from "react-router-native";
import Button from "../button/button";
import Navbar from "../navbar/navbar";

export default function Layout() {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.h1}>Kev'instagram</Text>
        <Button to="Chat"></Button>
      </View>
      <Outlet />
      <View style={styles.nav}>
        <Button to="Home">Home</Button>
        <Button to="Profil">Profil</Button>
        <Button to="Menu">Menu</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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
  nav: {
    flex: 0.1,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    borderTopColor: "gainsboro",
    borderTopWidth: 1,
  },
});
