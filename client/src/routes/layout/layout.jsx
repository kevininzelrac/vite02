import { defer, Outlet, useLoaderData } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../../components/header/header";
import Navbar from "../../components/navbar/navbar";
import Notifications from "../../components/notifications/notifications";
import Messenger from "../../components/messenger/messenger";
import Footer from "../../components/footer/footer";

export async function layoutLoader() {
  const nav = fetch("/api/nav/").then((res) => res.json());

  const data = fetch("/api/user/").then((res) => res.json());
  const { user, accessToken } = await data;

  const socket = io(location.origin, {
    upgrade: true,
    autoConnect: false,
    transports: ["websocket", "polling"],
    //withCredentials: true,
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
