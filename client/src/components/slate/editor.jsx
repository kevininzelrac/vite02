import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import { RenderElement, RenderLeaf } from "./utils/render";
import Toolbar from "./components/toolbar/toolbar";
import Shortcuts from "./utils/shortcuts";
import deserialize from "./utils/deserialize";
import "./editor.css";

function withInlines(editor) {
  editor.isInline = (element) => element.type === "link";
  return editor;
}
function withVoids(editor) {
  editor.isVoid = (element) => element.type?.includes("image", "youtube");
  return editor;
}

export default function TextEditor({ data, user }) {
  data?.about?.includes("<p>" && "</p>")
    ? (data.about = data.about)
    : (data.about = "<p>" + data.about + "</p>");

  const document = new DOMParser().parseFromString(data.about, "text/html");

  const initialValue = useMemo(
    () =>
      deserialize(document.body) || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    []
  );

  const [editor] = useState(() =>
    withVoids(withInlines(withHistory(withReact(createEditor()))))
  );
  const [about, setAbout] = useState({ children: initialValue });
  const [readOnly, setReadOnly] = useState(true);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        setAbout({ children: value });
      }}
    >
      {user && (
        <Toolbar
          label={data?.label}
          about={about}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
        />
      )}

      <Editable
        className={readOnly ? "readOnly" : "editor"}
        editor={editor}
        readOnly={readOnly}
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={(e) => {
          Shortcuts(e, editor);
        }}
      />
    </Slate>
  );
}
