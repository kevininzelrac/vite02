import { useState } from "react";
import { useSlate } from "slate-react";
import Icon from "./icons";

export const UndoButton = () => {
  const [active, setActive] = useState(false);
  const editor = useSlate();
  return (
    <button
      className={active ? "active" : ""}
      onMouseDown={() => {
        editor.undo();
        setActive(true);
      }}
      onMouseUp={() => {
        setActive(false);
      }}
    >
      <Icon format="undo" />
    </button>
  );
};

export const RedoButton = () => {
  const [active, setActive] = useState(false);
  const editor = useSlate();
  return (
    <button
      className={active ? "active" : ""}
      onMouseDown={() => {
        editor.redo();
        setActive(true);
      }}
      onMouseUp={() => {
        setActive(false);
      }}
    >
      <Icon format="redo" />
    </button>
  );
};
