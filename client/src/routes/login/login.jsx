import { redirect, useFetcher } from "react-router-dom";
import "./login.css";

export async function loginAction({ request }) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(update),
      });
      if (!response.ok) {
        return await response.json();
      }
      //const data = await response.json();
      //console.log(data);
      //return data;
      let { pathname } = new URL(request.url);
      return redirect(pathname?.replace("/Login", ""));
    }
    case "DELETE": {
      const response = await fetch("/api/logout");
      const data = await response.json();
      console.log(data);
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
