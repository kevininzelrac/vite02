import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import "./notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useRouteLoaderData("layout");

  useEffect(() => {
    let timer;
    socket?.on("notifications", ({ author, date, title, content }) => {
      setNotifications((prev) => [{ author, date, title, content }, ...prev]);
      timer = setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((data) => data.author !== author && data.date !== date)
        );
      }, "5000");
    });
    return () => {
      socket?.off("notifications");
      clearTimeout(timer);
    };
  }, []);

  const deleteItem = (author, date) => {
    setNotifications((prev) =>
      prev.filter((data) => data.author !== author && data.date !== date)
    );
  };

  return (
    <div className="notifications">
      {notifications?.map(({ author, date, title, content }) => (
        <div className="notification" key={date}>
          <CancelIcon onClick={() => deleteItem(author, date)} />
          <img src={author?.avatar} />
          <section>
            <h5>{author?.name + " " + title}</h5>
            <p>{content}</p>
          </section>
        </div>
      ))}
    </div>
  );
}
