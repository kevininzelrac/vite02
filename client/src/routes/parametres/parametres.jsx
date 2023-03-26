import "./parametres.css";
import { useFetcher, useRouteLoaderData } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

export async function paramsAction({ request }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);

  const response = await fetch("/api/updateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + update.accessToken,
    },
    credentials: "include",
    body: JSON.stringify(update),
  });

  const data = await response.json();
  return await data;
}

export default function Parametres() {
  const { user, accessToken } = useRouteLoaderData("layout");
  const fetcher = useFetcher();
  const idle = fetcher.state === "idle";
  const error = fetcher.data?.error;
  const success = fetcher.data?.success;

  const handleSubmit = () => {
    fetcher.submit({ accessToken: accessToken }, { method: "post" });
  };

  return (
    <fetcher.Form className="parametres" method="post" onSubmit={handleSubmit}>
      <h2>Parametres</h2>
      <Avatar>{user.avatar}</Avatar>
      <Input name="name">{user.name}</Input>
      <Input name="email">{user.email}</Input>
      <Password key={success} />
      {!idle ? (
        <small>{fetcher.state}</small>
      ) : error ? (
        <small>{error}</small>
      ) : (
        <small>{success}</small>
      )}
      <button type="submit">Sauvegarder</button>
    </fetcher.Form>
  );
}

const Avatar = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState(children);
  return (
    <fieldset className="avatar">
      <img
        src={value}
        style={{ animationName: toggle ? "turnOut" : "turnIn" }}
      />
      <span style={{ animationName: toggle ? "turnIn" : "turnOut" }}>?</span>
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? <VisibilityIcon /> : <EditIcon />}
      </button>

      <input
        key={toggle}
        style={{
          animationName: toggle ? "in" : "out",
        }}
        autoFocus={toggle}
        type="text"
        name="avatar"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </fieldset>
  );
};

const Input = ({ children, name }) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState(children);

  return (
    <fieldset className="input">
      <label
        className={name}
        style={{ animationName: toggle ? "rotateXout" : "rotateXin" }}
      >
        {value}
      </label>
      <input
        key={toggle}
        style={{
          animationName: toggle ? "rotateXin" : "rotateXout",
        }}
        autoFocus={toggle}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? <VisibilityIcon /> : <EditIcon />}
      </button>
    </fieldset>
  );
};

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [verified, setVerified] = useState("");
  const fetcher = useFetcher();

  useEffect(() => {
    setPassword(""), setConfirm(""), setVerified("");
  }, [fetcher.state.success]);

  useEffect(() => {
    password && password === confirm && setVerified(password);
    if (password === confirm) {
      setVerified(password);
    } else {
      setVerified("");
    }
  }, [password, confirm]);

  return (
    <fieldset className="password">
      <label>
        <small>
          {verified
            ? "Nouveau mot de passe validé"
            : "Réinitialisez votre mot de passe"}
        </small>
      </label>
      <input type="hidden" name="password" value={verified} />
      <input
        style={{
          border: !password
            ? ""
            : password === confirm
            ? "1px solid green"
            : "1px solid red",
        }}
        type="password"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        style={{
          border: !confirm
            ? ""
            : password === confirm
            ? "2px solid green"
            : "2px solid red",
        }}
        type="password"
        placeholder="Confirm New Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
    </fieldset>
  );
};
