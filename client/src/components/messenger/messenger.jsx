import { useState, useEffect } from "react";
import "./messenger.css";

export default function Messenger({ socket, user }) {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await socket.emit("fetchUsers", { name: user.name });
        await socket.on("users", async ({ name, users }) => {
          const filtered = await users.filter(({ name }) => name !== user.name);
          setUsers(filtered);
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      socket.off("users");
    };
  }, []);

  return (
    <div className="messenger">
      <h3 style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
        Contacts
      </h3>

      {open &&
        users.map(({ name, avatar }) => (
          <div className="user" key={name}>
            <img src={avatar} />
            <span>{name}</span>
          </div>
        ))}
    </div>
  );
}
