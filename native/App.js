import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

export default function App() {
  const [nav, setNav] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/nav");
        const data = await response.json();
        setNav(data.nav);
        console.log(data.nav);
      } catch (err) {
        console.log(err);
      } finally {
      }
    })();
  }, [nav]);

  return (
    <View style={styles.nav}>
      {nav.map(({ label }) => (
        //<Button key={label} title={label} />
        <Link to={label} key={label}>
          <Text>{label}</Text>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 20,
  },
});
