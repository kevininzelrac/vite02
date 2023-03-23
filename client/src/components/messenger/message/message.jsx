import { useContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { MessengerContext } from "../messenger";
import DateFormat from "../../../utils/DateFormat";

export default function Message({ from, to, message, _id, date, status }) {
  const { user, socket } = useRouteLoaderData("layout");
  const { room } = useContext(MessengerContext);
  const [STATUS, setStatus] = useState(status);

  useEffect(() => {
    (async () => {
      try {
        socket.on("status", (data) => {
          data._id === _id && setStatus(data.status);
        });

        if (to._id === user._id && STATUS === "received") {
          socket.emit("status", {
            from,
            to,
            _id: _id,
            status: "read",
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      socket.off("status");
    };
  }, [room]);

  return (
    <span className={from?._id === user._id ? "right" : "left"}>
      <h5>{from?.name || to?.name}</h5>
      <p>{message}</p>
      <small>
        <time>{DateFormat(date)}</time>
        {from?._id === user._id && " • " + STATUS}
      </small>
    </span>
  );
}
