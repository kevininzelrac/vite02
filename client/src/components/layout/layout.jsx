import { defer, Outlet, useLoaderData } from "react-router-dom";
import { io } from "socket.io-client";
import Footer from "../footer/footer";
import Header from "../header/header";
import Messenger from "../messenger/messenger";
import Navbar from "../navbar/navbar";
import Notifications from "../notifications/notifications";

export async function layoutLoader() {
  const nav = fetch("/api/nav/").then((res) => res.json());

  const data = fetch("/api/user/").then((res) => res.json());
  const { user, accessToken } = await data;

  const socket = io(location.origin, {
    autoConnect: false,
    //transports: ["websocket", "polling"],
    auth: {
      _id: user?._id,
      name: user?.name,
      avatar: user?.avatar,
    },
  });
  user && socket.connect();

  return defer({
    nav: nav,
    user: await user,
    accessToken: await accessToken,
    socket: socket,
  });
}

export default function Layout() {
  const { user } = useLoaderData();

  return (
    <>
      <Header />
      {user && <Notifications />}
      <Navbar />
      <Outlet />
      {user && <Messenger />}
      <Footer />
    </>
  );
}
