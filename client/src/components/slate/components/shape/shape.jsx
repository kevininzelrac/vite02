import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import Icon from "../icons";
import "./shape.css";

const isActive = (editor, name) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.shape === name,
  });
  return !!match;
};

const Shape = ({ name }) => {
  const editor = useSlate();

  return (
    <button
      className={isActive(editor, name) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (isActive(editor, name)) {
          Transforms.setNodes(editor, {
            shape: null,
          });
          return;
        }
        Transforms.setNodes(editor, {
          shape: name,
        });
      }}
    >
      <Icon format={name} />
    </button>
  );
};
export default Shape;
