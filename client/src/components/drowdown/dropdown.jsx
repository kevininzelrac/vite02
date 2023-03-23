import { useLocation } from "react-router-dom";
import Button from "../button/button";
import "./dropdown.css";

const Item = ({ children }) => <div className="item">{children}</div>;

const Menu = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className={"menu " + (pathname?.includes(children) && "active")}>
      {children}
    </div>
  );
};

const User = ({ children }) => {
  return (
    <div className="menu user">
      <img src={children.avatar} />
      {children.name}
    </div>
  );
};

export default function Dropdown({ label, type, parent, children }) {
  return (
    <div className="dropdown">
      {["post", "category"].includes(type) || label === "Blog" ? (
        <Button parent={parent}>{label}</Button>
      ) : label.name ? (
        <User>{label}</User>
      ) : (
        <Menu>{label}</Menu>
      )}
      <Item>{children}</Item>
    </div>
  );
}
