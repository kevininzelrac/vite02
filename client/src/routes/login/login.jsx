import { redirect, useFetcher } from "react-router-dom";
import "./login.css";
import { io } from "socket.io-client";

export async function loginAction({ request }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const { name, password } = update;
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      if (!response.ok) {
        return await response.json();
      }
      /* const socket = io.connect(location.origin);
      socket.emit("login", { name });
      socket.emit("fetchUsers", { name }); */
      //const data = await response.json();
      //console.log(data);
      //return data;
      let { pathname } = new URL(request.url);
      return redirect(pathname?.replace("/Login", ""));
    }
    case "DELETE": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const { name } = update;
      /* const socket = io.connect(location.origin);
      socket.emit("logout", { name });
      socket.emit("fetchUsers", { name }); */
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      return data;
    }

    default:
      return;
  }
}

export default function Login() {
  const fetcher = useFetcher();
  const error = fetcher?.data?.error;

  return (
    <fetcher.Form className="loginForm" method="post">
      <h4 className="underline">SIGN IN</h4>
      {error && <span className="error">{error}</span>}
      <fieldset>
        <label>Username</label>
        <input autoFocus type="text" className="underline" name="name" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input className="underline" type="password" name="password" />
      </fieldset>

      <button type="submit">Se connecter</button>
    </fetcher.Form>
  );
}
