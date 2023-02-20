import Button from "../button/button";
import "./dropdown.css";

const Item = ({ children }) => <div className="item">{children}</div>;

const Menu = ({ children }) => {
  const { pathname } = new URL(document.location);
  return (
    <div className={"menu " + (pathname?.includes(children) ? "active" : "")}>
      {children}
    </div>
  );
};

const Dropdown = ({ label, type, parent, children }) => {
  return (
    <div className="dropdown">
      {children?.length ? (
        ["post", "category"].includes(type) || label === "Blog" ? (
          <Button parent={parent}>{label}</Button>
        ) : (
          <Menu>{label}</Menu>
        )
      ) : (
        <Button parent={parent}>{label}</Button>
      )}
      <Item>{children}</Item>
    </div>
  );
};

export default Dropdown;
