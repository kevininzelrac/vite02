import { useRouteLoaderData } from "react-router-dom";
import "./parametres.css";

const Parametres = () => {
  const { user } = useRouteLoaderData("navbar");
  const Todo = () => {
    return <span style={{ color: "red" }}>Todo...</span>;
  };
  return (
    <div className="parametres">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Paramètres</h2>
        <fieldset>
          <label>
            {user?.name} <Todo />
          </label>
          <button>Modifier</button>
        </fieldset>
        <fieldset>
          <label>
            Email <Todo />
          </label>
          <span>{user?.email}</span>
          <button type="submit">Modifier</button>
        </fieldset>
        <fieldset>
          <label>
            Avatar <Todo />
          </label>
          <img width="100" src={user?.avatar} />
          <input type="file" />
        </fieldset>
        <fieldset>
          <label>
            Réinitialiser votre mot de passe <Todo />
          </label>
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
        </fieldset>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default Parametres;
