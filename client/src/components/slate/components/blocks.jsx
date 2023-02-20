import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import Icon from "./icons";

const isBlockActive = (editor, type) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
  });
  return !!match;
};

export const wrapBlock = (editor, type) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      ["ul", "ol"].includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isBlockActive(editor, type)
      ? "paragraph"
      : ["ul", "ol"].includes(type)
      ? "li"
      : type,
    textAlign: "",
    float: "",
    /* height: "20",
    width: "600", */
    children: [],
  });

  if (!isBlockActive(editor, type) && ["ul", "ol"].includes(type)) {
    Transforms.wrapNodes(editor, {
      type: type,
      textAlign: "",
      float: "",
      /* height: "20",
      width: "600", */
      children: [],
    });
  }
};

const Block = ({ type }) => {
  const editor = useSlate();

  return (
    <button
      className={isBlockActive(editor, type) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        wrapBlock(editor, type);
      }}
    >
      <Icon format={type} />
    </button>
  );
};
export default Block;
