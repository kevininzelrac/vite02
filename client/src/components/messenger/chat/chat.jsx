import "./chat.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import Message from "../message/message";
import { MessengerContext } from "../messenger";

export default function Chat() {
  const { user, socket } = useRouteLoaderData("layout");
  const { room, setRoom } = useContext(MessengerContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await socket.emit("fetchMessages", { from: user, to: room });
        await socket.on("messages", async ({ from, to, messages }) => {
          const target = from._id === user._id ? to : from;
          target._id === room._id && setMessages(await messages);
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      socket.off("messages");
    };
  }, [room]);

  useEffect(() => {
    (async () => {
      await scrollRef.current?.scrollIntoView({
        block: "end",
        //behavior: "smooth",
      });
    })();
  }, [messages]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await socket.emit("newMessage", {
        from: user,
        to: room,
        message: message,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <header>
        <img src={room.avatar} />
        <h5>{room.name}</h5>
        <CancelIcon onClick={() => setRoom(undefined)} />
      </header>
      <main>
        <section>
          {messages?.map((props) => (
            <Message {...props} key={props.date} />
          ))}
          <span ref={scrollRef}></span>
        </section>
      </main>

      <form onSubmit={handleSubmit}>
        <input
          key={room._id}
          type="text"
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          style={{
            opacity: message.length > 0 ? "1" : "0.3",
          }}
          disabled={message.length <= 0}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
