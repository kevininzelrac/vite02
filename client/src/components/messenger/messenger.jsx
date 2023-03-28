import "./messenger.css";
import { createContext, useState } from "react";
import Chat from "./chat/chat";
import Contacts from "./contacts/contacts";
import Rooms from "./rooms/rooms";

export const MessengerContext = createContext();

export default function Messenger() {
  const [open, setOpen] = useState(true);
  const [room, setRoom] = useState();

  return (
    <MessengerContext.Provider value={{ open, room, setRoom }}>
      <div className="messenger">
        <header onClick={() => setOpen(!open)}>
          <h5>Messenger</h5>
        </header>
        {open && (
          <>
            <Contacts />
            <Rooms />
            {room && <Chat />}
          </>
        )}
      </div>
    </MessengerContext.Provider>
  );
}
