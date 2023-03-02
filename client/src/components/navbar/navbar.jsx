import { Suspense } from "react";
import {
  Await,
  defer,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import Button from "../button/button";
import Dropdown from "../drowdown/dropdown";
import { AwaitError } from "../errors/errors";
import Loading from "../loading/loading";
import "./navbar.css";
import { io } from "socket.io-client";
const socket = io.connect(location.origin);

/* const socket = io(location.origin, {
  path: "/socket.io",
  transports: ["websocket"],
  secure: true,
}); */

export async function navbarLoader() {
  console.log("navbarLoader");
  const nav = fetch("/api/nav/").then((res) => res.json());
  const user = fetch("/api/user/")
    .then((res) => res.json())
    .then(({ user }) => user);

  return defer({ nav: nav, user: await user });
}

const Navbar = () => {
  const { nav, user } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <Suspense fallback={<Loading>Loadind Site ...</Loading>}>
      <Await resolve={nav} errorElement={<AwaitError />}>
        {(nav) => (
          <>
            <nav>
              <Recursive nav={nav} />
              {user ? (
                <>
                  <Dropdown label={user}>
                    <Link to="Parametres" relative="path">
                      Parametres
                    </Link>
                    <Link to="Dashboard" relative="path">
                      Dashboard
                    </Link>
                    <fetcher.Form
                      method="delete"
                      action="Login"
                      relative="path"
                    >
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
            <Outlet context={{ socket }} />
          </>
        )}
      </Await>
    </Suspense>
  );
};
export default Navbar;

const Recursive = ({ nav, parent = "" }) => {
  const { user } = useLoaderData();
  return (
    <>
      {nav?.map(({ label, type, children }) =>
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
