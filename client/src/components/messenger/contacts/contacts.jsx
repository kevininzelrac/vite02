import { useState, useEffect, useContext } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { MessengerContext } from "../messenger";
import "./contacts.css";

export default function Contacts() {
  const { user, socket } = useRouteLoaderData("layout");
  const { setRoom } = useContext(MessengerContext);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    socket.emit("fetchUsers");
    socket.on("users", (data) => {
      const filtered = data.filter(({ name }) => name !== user.name);
      setContacts(filtered);
    });
    return () => {
      socket.off("users");
    };
  }, []);

  return (
    <div className="contacts">
      {contacts.map((contact) => (
        <button
          key={contact.name}
          className="user"
          onClick={() => setRoom(contact)}
        >
          <div className="socket"></div>
          <img src={contact.avatar} />
        </button>
      ))}
    </div>
  );
}
