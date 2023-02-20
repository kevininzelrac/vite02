import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import deserialize from "./utils/deserialize";
import { RenderElement, RenderLeaf } from "./utils/render";
import "./styles.css";

const ReadOnly = ({ target, updated }) => {
  const document = new DOMParser().parseFromString(target.about, "text/html");

  const initialValue = useMemo(
    () =>
      deserialize(document.body) || {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
      },
    [document.body]
  );
  //const editor = useMemo(() => withReact(createEditor()), []);
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        readOnly
        className="readOnly"
        key={updated}
        editor={editor}
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
      />
    </Slate>
  );
};

export default ReadOnly;
