import { StyleSheet, Text, View } from "react-native";
import { Link, useLocation } from "react-router-native";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";

const Icon = ({ children, style }) => {
  switch (children) {
    case "Home":
      return <AntDesign name="home" style={style} />;
    case "Menu":
      return <EvilIcons name="navicon" style={style} />;
    case "Parameters":
      return <Ionicons name="settings-outline" style={style} />;
    case "Chat":
      return <Ionicons name="chatbox-outline" style={style} />;
    case "Profil":
      return <AntDesign name="user" style={style} />;
  }
};

const Button = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <Link to={children} style={styles.button}>
      <View style={styles.button}>
        <Icon
          style={{
            color: pathname.includes(children) ? "#336699" : "#292929",
            fontSize: 24,
          }}
        >
          {children}
        </Icon>
        <Text
          style={{
            color: pathname.includes(children) ? "#336699" : "#292929",
          }}
        >
          {children}
        </Text>
      </View>
    </Link>
  );
};

export default function Navbar() {
  return (
    <View style={styles.nav}>
      <Button>Home</Button>
      <Button>Menu</Button>
      <Button>Parameters</Button>
      <Button>Chat</Button>
      <Button>Profil</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flex: 0.1,
    width: "100%",
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    borderTopColor: "gainsboro",
    borderTopWidth: 1,
  },
  button: {
    height: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    size: 24,
  },
});
