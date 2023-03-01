import { useRouteLoaderData } from "react-router-dom";
import "./parametres.css";

const Parametres = () => {
  const { user } = useRouteLoaderData("navbar");
  return (
    <div className="parametres">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Paramètres</h2>
        <fieldset>
          <label>{user?.name}</label>
          <button>Modifier</button>
        </fieldset>

        <fieldset>
          <label>Email</label>
          <span>{user?.email}</span>
          <button type="submit">Modifier</button>
        </fieldset>

        <fieldset>
          <label>Avatar</label>
          <img width="80" src={user?.avatar} />
          <input type="file" />
        </fieldset>

        <fieldset>
          <label>Réinitialiser votre mot de passe</label>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
        </fieldset>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default Parametres;
