import { Transforms } from "slate";
import { wrapLink } from "../components/links";
import { toggleMark } from "../components/marks";

export default function Shortcuts(e, editor) {
  if (e.key === "Enter" /* && e.shiftKey */) {
    e.preventDefault();
    const newLine = {
      type: "paragraph",
      children: [
        {
          text: "",
        },
      ],
    };
    Transforms.insertNodes(editor, newLine);
  }

  if (!e.metaKey) {
    return;
  }

  switch (e.key) {
    case "`": {
      e.preventDefault();
      toggleMark(editor, "blockquote");
      break;
    }
    case "b": {
      e.preventDefault();
      toggleMark(editor, "bold");
      break;
    }
    case "i": {
      e.preventDefault();
      toggleMark(editor, "italic");
      break;
    }
    case "u": {
      e.preventDefault();
      toggleMark(editor, "underline");
      break;
    }
    case "l": {
      e.preventDefault();
      const href = prompt("Enter a URL");
      wrapLink(editor, href);
      break;
    }
    default:
      return;
  }
}
