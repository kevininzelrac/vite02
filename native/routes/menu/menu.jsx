import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import { REACT_APP_API } from "@env";

export default function Menu() {
  const [nav, setNav] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(REACT_APP_API + "/api/nav");
        const data = await response.json();
        setNav(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    })();
  }, []);

  return (
    <View style={styles.menu}>
      {nav.map(({ label }) => (
        <Link to={"/" + label} key={label} style={styles.link}>
          <Text style={styles.text}>{label}</Text>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 6,
    paddingRight: 6,
  },
  link: {
    width: "100%",
  },
  text: {
    fontSize: 24,
  },
});
