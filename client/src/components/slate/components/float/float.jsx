import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import Icon from "../icons";
import "./float.css";

const isActive = (editor, name) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.float === name,
  });
  return !!match;
};

const Float = ({ name }) => {
  const editor = useSlate();

  return (
    <button
      className={isActive(editor, name) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (isActive(editor, name)) {
          Transforms.setNodes(editor, {
            float: null,
          });
          return;
        }
        Transforms.setNodes(editor, {
          float: name,
        });
      }}
    >
      <Icon format={name} />
    </button>
  );
};
export default Float;
