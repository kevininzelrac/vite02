import { useContext, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { MessengerContext } from "../messenger";
import "./rooms.css";

export default function Rooms() {
  const { user, socket } = useRouteLoaderData("layout");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit("fetchRooms");
    socket.on("rooms", (rooms) => {
      const filtered = rooms.filter(({ blob }) => blob !== user.name);

      setRooms(filtered);
    });
    return () => {
      socket.off("rooms");
    };
  }, []);

  return (
    <div className="rooms">
      <h5>Discussions</h5>
      {rooms?.map((props) => (
        <Room {...props} key={props._id} />
      ))}
    </div>
  );
}

const Room = ({ blob, _id, from, to, status, message }) => {
  const { user, socket } = useRouteLoaderData("layout");
  const { room, setRoom } = useContext(MessengerContext);
  const [STATUS, setStatus] = useState(status);

  useEffect(() => {
    socket.on("status", (data) => {
      data._id === _id && setStatus(data.status);
    });
    if (to._id === user._id && STATUS !== "read") {
      socket.emit("status", {
        from,
        to,
        _id: _id,
        status: from._id === room?._id ? "read" : "received",
      });
    }
  }, [room]);

  return (
    <button
      style={{
        background: blob === room?.name && "gainsboro",
        fontWeight: to._id === user._id && STATUS === "received" && "bold",
        fontStyle: to._id === user._id && STATUS === "received" && "italic",
      }}
      onClick={() => setRoom(from._id === user._id ? to : from)}
    >
      <img src={from._id === user._id ? to.avatar : from.avatar} />
      <span>
        <strong>{from._id === user._id ? to.name : from.name}</strong>
        <p>{message}</p>
      </span>
    </button>
  );
};
