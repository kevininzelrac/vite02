import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import isUrl from "isurl";
import Icon from "./icons";

const isActive = (editor, type) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
  });
  return !!match;
};

const isVoidUrl = (url, type) => {
  if (!url) return false;
  const _url = new URL(url);
  if (!isUrl.lenient(_url)) return false;

  switch (type) {
    case "image":
      const image = _url.pathname.split(".").pop();
      return ["jpg", "png"].includes(image);
    case "youtube":
      return ["www.youtube.com", "youtu.be"].includes(_url.host);
    default:
      break;
  }
};

const insertVoid = (editor, src, type) => {
  const customType = {
    type,
    /* width: "140",
    height: "140", */
    src,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, customType);
};

export const RemoveVoid = () => {
  const editor = useSlate();
  return (
    <button onClick={() => Transforms.removeNodes(editor)}>
      <Icon format={"delete"} />
    </button>
  );
};

const AddVoid = ({ type }) => {
  const editor = useSlate();

  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === type ? true : isVoid(element);
  };

  return (
    <button
      className={isActive(editor, type) ? "active" : undefined}
      onMouseDown={(event) => {
        event.preventDefault();
        if (isActive(editor, type)) {
          Transforms.removeNodes(editor);
        } else {
          const url = window.prompt("Enter the " + type + " URL");
          if (url && !isVoidUrl(url, type)) {
            alert("Enter a correct " + type + " url");
            return;
          }
          url && insertVoid(editor, url, type);
        }
      }}
    >
      <Icon
        format={
          type.includes("image")
            ? isActive(editor, type)
              ? "deleteImage"
              : type
            : type
        }
      />
    </button>
  );
};
export default AddVoid;
