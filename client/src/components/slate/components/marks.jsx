import { Editor } from "slate";
import { useSlate } from "slate-react";
import Icon from "./icons";

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  isMarkActive(editor, format)
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true);
};

const MarkButton = ({ format }) => {
  const editor = useSlate();
  return (
    <button
      className={isMarkActive(editor, format) ? "active" : undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon format={format} />
    </button>
  );
};

export default MarkButton;
