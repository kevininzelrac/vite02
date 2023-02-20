import { useRouteLoaderData } from "react-router-dom";
import "./parametres.css";

const Parametres = () => {
  const { user } = useRouteLoaderData("navbar");
  return (
    <div className="parametres">
      <h2>Paramètres</h2>
      <br />
      <form onSubmit={(e) => e.preventDefault()}>
        <h3>{user.name}</h3>
        <button>Modifier</button>
        <br />
        <br />
        <span>{user.email}</span>
        <br />
        <button type="submit">Modifier</button>
        <br />
        <br />

        <img width="80" src={user.avatar} />
        <br />
        <input type="file" />
        <br />
        <br />
        <div>
          <h4>Réinitialiser votre mot de passe</h4>
          <input type="password" placeholder="New Password" />
          <br />
          <input type="password" placeholder="Confirm New Password" />
          <br />
          <br />
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </div>
  );
};

export default Parametres;
