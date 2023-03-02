import { NavLink } from "react-router-dom";
import "./button.css";

const Button = ({ parent, children }) => {
  return (
    <NavLink
      /* draggable */
      key={children}
      to={parent + children}
      className={({ isActive, isPending }) =>
        isActive ? "active" : isPending ? "pending" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default Button;
