import { useTransition } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import "./button.css";

const Button = ({ children, to, previous }) => {
  /* const data = useRouteLoaderData("page");
  promiseState(data?.page, function (state) {
    // `state` now either "pending", "fulfilled" or "rejected"
    console.log(state);
  }); */

  /* data?.page?.then((status, result) => {
    console.log(status, result);
  }); */

  let navigate = useNavigate();
  let { pathname } = useLocation();
  let match = useMatch({ path: to, end: false });

  const handleClick = () => {
    navigate(to, {
      replace: false,
      state: { animationName: "loading", previous },
    });
    /* navigate("#", {
      replace: false,
      state: { animationName: "loading", previous },
    });
    const timer = setTimeout(() => {
      navigate(to, {
        replace: false,
        state: { animationName: "idle", previous: pathname },
      });
    }, 300);
    return () => {
      clearTimeout(timer);
    }; */
  };
  return (
    <a
      href={to}
      className={match ? "active" : ""}
      onClick={(e) => {
        e.preventDefault();
        !match && handleClick();
      }}
    >
      {children}
    </a>
  );
};
//export default Button;
