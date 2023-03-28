import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
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
      const data = await response.json();
      const { user, accessToken } = data;
      return { user, accessToken };
    }
    case "DELETE": {
      const formData = await request.formData();
      const update = Object.fromEntries(formData);
      const response = await fetch("/api/logout");

      const data = await response.json();
      const { user, accessToken } = data;
      return { user, accessToken };
    }

    default:
      return;
  }
}

export default function Login() {
  const fetcher = useFetcher();
  const error = fetcher.data?.error;
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.data?.accessToken) {
      navigate(-1);
    }
  }, [fetcher.data?.accessToken]);

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

      <button type="submit">Sign In</button>
    </fetcher.Form>
  );
}
