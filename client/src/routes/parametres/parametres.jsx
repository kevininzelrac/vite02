import { useState, useEffect } from "react";
import { useRouteLoaderData, useFetcher } from "react-router-dom";
import "./parametres.css";

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
    <div className="parametres">
      <h2>Paramètres</h2>
      <header>
        <img width="100" src={user?.avatar} />
        <span>
          <h3>{user.name}</h3>
          <small> {user.email} </small>
        </span>
      </header>

      <fetcher.Form method="post" onSubmit={handleSubmit}>
        <Input name="avatar">{user.avatar}</Input>
        <Input name="name">{user.name}</Input>
        <Input name="email">{user.email}</Input>
        <Password key={fetcher?.data?.success} />
        {!idle ? (
          fetcher.state
        ) : error ? (
          <label>{error}</label>
        ) : (
          <label>{success}</label>
        )}
        <button type="submit">Enregistrer</button>
      </fetcher.Form>
    </div>
  );
}

const Input = ({ name, type, children }) => {
  const [toggle, setToggle] = useState(true);
  const [value, setValue] = useState(children);

  return (
    <fieldset>
      <label
        className={name}
        style={{
          animationName: toggle ? "jumpIn" : "jumpOut",
        }}
      >
        {value}
      </label>
      <input
        className={name}
        style={{
          animationName: toggle ? "jumpOut" : "jumpIn",
        }}
        type={type ?? "text"}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setToggle(!toggle);
        }}
      >
        {toggle ? "Modifier" : "Aperçu"}
      </button>
    </fieldset>
  );
};

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [verified, setVerified] = useState("");
  const [disabled, setDisable] = useState(true);
  const fetcher = useFetcher();
  useEffect(() => {
    setPassword(""), setConfirm(""), setVerified(""), setDisable(true);
  }, [fetcher.state.success]);

  useEffect(() => {
    password && password === confirm ? setDisable(false) : setDisable(true);
  }, [password, confirm]);

  return (
    <fieldset className="password">
      <label>
        <small>
          {verified
            ? "Vos modifications sont pretes à être soumises"
            : " Réinitialisez votre mot de passe"}
        </small>
      </label>
      <input type="hidden" name="password" value={verified} />
      <input
        //required
        style={{
          border: !password
            ? ""
            : password === confirm
            ? "2px solid green"
            : "2px solid red",
        }}
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        //required
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
      <button
        style={{
          opacity: disabled ? "0.8" : "1",
        }}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          setVerified(password);
        }}
      >
        Modifier
      </button>
    </fieldset>
  );
};
