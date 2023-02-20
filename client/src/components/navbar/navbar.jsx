import { Link, Outlet, useFetcher, useLoaderData } from "react-router-dom";
import Button from "../button/button";
import Dropdown from "../drowdown/dropdown";
import "./navbar.css";

export async function navbarLoader() {
  const nav = await fetch("/api/nav");
  return nav;
}

const Navbar = () => {
  const { nav, user } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <>
      <nav>
        <Recursive nav={nav} />
        {user ? (
          <>
            <Dropdown label={user.name}>
              <Link to="Parametres" relative="path">
                Parametres
              </Link>
              <Link to="Dashboard" relative="path">
                Dashboard
              </Link>
              <fetcher.Form method="delete" action="Login" relative="path">
                <button type="submit">Log Out</button>
              </fetcher.Form>
            </Dropdown>
            <Link to="#">+</Link>
          </>
        ) : (
          <Link to="Login" relative="path">
            Log In
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;

const Recursive = ({ nav, parent = "" }) => {
  const { user } = useLoaderData();
  return (
    <>
      {nav.map(({ label, type, children }) =>
        children.length ? (
          <Dropdown key={label} label={label} type={type} parent={parent}>
            <Recursive nav={children} parent={parent + label + "/"} />
            {user && <Link to="#">+</Link>}
          </Dropdown>
        ) : user ? (
          <Dropdown key={label} label={label} type={type} parent={parent}>
            <Link to="#">+</Link>
          </Dropdown>
        ) : (
          <Button key={label} parent={parent}>
            {label}
          </Button>
        )
      )}
    </>
  );
};