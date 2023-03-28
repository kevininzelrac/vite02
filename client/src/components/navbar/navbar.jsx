import "./navbar.css";
import { Suspense, useState, useEffect } from "react";
import {
  Await,
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Button from "../button/button";
import Dropdown from "../drowdown/dropdown";
import { AwaitError } from "../errors/errors";
import Loading from "../loading/loading";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const { user, nav, socket } = useLoaderData();

  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  let navigation = useNavigation();
  const isIdle = navigation.state === "idle";

  useEffect(() => {
    !isIdle && setIsOpen(false);
  }, [navigation]);

  return (
    <Suspense fallback={<Loading>Loadind Site ...</Loading>}>
      <Await resolve={nav} errorElement={<AwaitError />}>
        {(nav) => (
          <>
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
                  <fetcher.Form
                    method="delete"
                    action="Login"
                    relative="path"
                    onSubmit={() => {
                      setIsOpen(false);
                      socket.close();
                    }}
                  >
                    <button type="submit">Log Out</button>
                  </fetcher.Form>
                </Dropdown>
              ) : (
                <Link
                  to="Login"
                  relative="path"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Log In
                </Link>
              )}
            </nav>
          </>
        )}
      </Await>
    </Suspense>
  );
}

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
