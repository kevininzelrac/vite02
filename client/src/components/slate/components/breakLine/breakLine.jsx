import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import Icon from "../icons";
import "./breakLine.css";

const isActive = (editor, name) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.breakLine === name,
  });
  return !!match;
};

const BreakLine = ({ name }) => {
  const editor = useSlate();

  return (
    <button
      className={isActive(editor, name) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (isActive(editor, name)) {
          Transforms.setNodes(editor, {
            breakLine: null,
          });
          return;
        }
        Transforms.setNodes(editor, {
          breakLine: name,
        });
      }}
    >
      <Icon format={name} />
    </button>
  );
};
export default BreakLine;
