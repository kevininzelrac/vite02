import { io } from "socket.io-client";

export async function likeAction({ request }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  const socket = io(location.origin);
  socket.emit("like", update);
  return null;
}

/* import { io } from "socket.io-client";
export async function likeLoader() {
  const socket = await io.connect(
    new WebSocket(location.origin.replace(/^http/, "ws") + "/socket.io")
  );
  await socket.on("likes", async (data) => {
    console.log(data);
    return await data;
  });
} */

/* export async function likeAction({ request }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/likeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      const data = await response.json();
      return data;
    }
    case "DELETE": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/unlikeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      const data = await response.json();
      return data;
    }
  }
} */
