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
import Messenger from "../messenger/messenger";
import Header from "../header/header";

export async function navbarLoader() {
  const data = fetch("/api/user/").then((res) => res.json());
  const { user, accessToken } = await data;
  console.log(accessToken);

  const nav = fetch("/api/nav/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + (await accessToken),
    },
    credentials: "include",
    //body: JSON.stringify(update),
  }).then((res) => res.json());

  return defer({
    nav: nav,
    user: await user,
    accessToken: await accessToken,
  });
}

const Navbar = () => {
  const { nav, user, accessToken } = useLoaderData();
  const fetcher = useFetcher();

  const socket = io.connect(location.origin);
  socket.emit("fetchUsers", { name: user?.name });

  return (
    <Suspense fallback={<Loading>Loadind Site ...</Loading>}>
      <Await resolve={nav} errorElement={<AwaitError />}>
        {(nav) => (
          <>
            <Header />
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
                      <input type="hidden" name="name" value={user.name} />
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
            {user && <Messenger socket={socket} user={user} />}
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
