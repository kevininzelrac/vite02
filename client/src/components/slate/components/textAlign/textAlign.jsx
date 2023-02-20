import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import Icon from "../icons";
import "./textAlign.css";

const isActive = (editor, textAlign) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.textAlign === textAlign,
  });
  return !!match;
};

const TextAlign = ({ textAlign }) => {
  const editor = useSlate();

  return (
    <button
      className={isActive(editor, textAlign) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (isActive(editor, textAlign)) {
          Transforms.setNodes(editor, { textAlign: undefined });
        }
        Transforms.setNodes(editor, { textAlign });
      }}
    >
      <Icon format={textAlign} />
    </button>
  );
};
export default TextAlign;
