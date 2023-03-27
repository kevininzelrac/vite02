import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";

export default function Icon({ children, style }) {
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
}
