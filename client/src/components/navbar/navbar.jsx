import { Suspense, useState, useEffect } from "react";
import {
  Await,
  defer,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Button from "../button/button";
import Dropdown from "../drowdown/dropdown";
import { AwaitError } from "../errors/errors";
import Loading from "../loading/loading";
import Messenger from "../messenger/messenger";
import Header from "../header/header";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
import "./navbar.css";
import Footer from "../footer/footer";

export async function navbarLoader() {
  const data = fetch("/api/user/").then((res) => res.json());
  const { user, accessToken } = await data;

  const nav = fetch("/api/nav/").then((res) => res.json());

  return defer({
    nav: nav,
    user: await user,
    accessToken: await accessToken,
  });
}

const Navbar = () => {
  const { nav, user } = useLoaderData();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  let navigation = useNavigation();
  const isIdle = navigation.state === "idle";

  useEffect(() => {
    !isIdle && setIsOpen(false);
  }, [navigation]);

  const socket = io.connect(location.origin);
  socket.emit("fetchUsers", { name: user?.name });

  return (
    <Suspense fallback={<Loading>Loadind Site ...</Loading>}>
      <Await resolve={nav} errorElement={<AwaitError />}>
        {(nav) => (
          <>
            <Header />
            <button
              className="burger"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <nav className={isOpen ? "open" : "close"}>
              <Recursive nav={nav} />
              {user ? (
                <Dropdown label={user}>
                  <Link
                    to="Parametres"
                    relative="path"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Parametres
                  </Link>
                  {/* <Link to="Dashboard" relative="path">
                    Dashboard
                  </Link> */}
                  <fetcher.Form method="delete" action="Login" relative="path">
                    <button
                      type="submit"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  </fetcher.Form>
                </Dropdown>
              ) : (
                <Link
                  to="Login"
                  relative="path"
                  onClick={(e) => {
                    setIsOpen(false);
                  }}
                >
                  Log In
                </Link>
              )}
            </nav>
            <Outlet context={{ socket }} />
            {user && <Messenger socket={socket} user={user} />}
            <Footer />
          </>
        )}
      </Await>
    </Suspense>
  );
};
export default Navbar;

const Recursive = ({ nav, parent = "" }) => {
  return (
    <>
      {nav?.map(({ label, type, children }) =>
        children.length ? (
          <Dropdown key={label} label={label} type={type} parent={parent}>
            <Recursive nav={children} parent={parent + label + "/"} />
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
