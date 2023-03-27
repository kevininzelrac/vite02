import { StyleSheet, Text, View } from "react-native";
import { Link, useLocation } from "react-router-native";
import Icon from "../Icon/icons";

export default function Button({ to, children }) {
  const { pathname } = useLocation();
  return (
    <Link to={to} style={styles.button}>
      <View style={styles.button}>
        <Icon
          style={{
            color: pathname.includes(to) ? "#336699" : "#292929",
            fontSize: 24,
          }}
        >
          {to}
        </Icon>
        {children && (
          <Text
            style={{
              color: pathname.includes(children) ? "#336699" : "#292929",
            }}
          >
            {children}
          </Text>
        )}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    size: 24,
  },
});
