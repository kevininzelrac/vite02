import { useState } from "react";
import serialize from "../utils/serialize";
import Icon from "./icons";

const Save = ({ label, about /* , setUpdated */ }) => {
  const [alert, setAlert] = useState(false);

  const handleSave = () => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3001/updatepage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ label: label, about: serialize(about) }),
        });
        const data = await response.json();
        data && setAlert(true);
        //data && alert("Saved ! ");
        /* setUpdated(data); */
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    })();
  };

  return (
    <>
      <button
        onMouseUp={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Icon format="save" />
      </button>
      {alert && (
        <span style={{ color: "red" }}>
          <strong>Saved !! </strong>
        </span>
      )}
    </>
  );
};
export default Save;
