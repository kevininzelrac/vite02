import { useLayoutEffect, useRef, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import usePourcent from "../../../../hooks/usePourcent";
import Drag from "../../components/drag/drag";
import Float from "../../components/float/float";
import Resize from "../../components/resize/resize";
import "./block.css";

const Block = ({ element, children }) => {
  const { breakLine, textAlign, float, height, width } = element;
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);

  //console.log(path);
  //console.log(editor.children.indexOf(element));
  //console.log(editor);

  const ref = useRef(null);
  const [size, setSize] = useState({});
  const [drag, setDrag] = useState(false);

  useLayoutEffect(() => {
    if (!width || ["null", "undefined"].includes(width)) {
      setSize({
        width: ref.current?.parentElement.offsetWidth,
        height: ref.current?.offsetHeight,
      });
      Transforms.setNodes(
        editor,
        {
          width: ref.current?.parentElement.offsetWidth,
          height: ref.current?.offsetHeight,
        },
        { at: path /* editor.children.indexOf(element) */ }
      );
    } else {
      setSize({
        width: width,
        height: height,
      });
    }
  }, []);

  return (
    <>
      {breakLine && <div style={{ clear: "both" }}></div>}
      <div
        ref={ref}
        draggable={drag}
        className={"block " + (textAlign ?? "") + " " + (float || "")}
        style={{
          width: usePourcent(
            size.width,
            ref.current?.parentElement.offsetWidth
          ),
          height: size.height + "px",
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
          zIndex: selected && focused ? "1" : " inherit ",
        }}
      >
        {children}
        <div
          className="tools "
          style={{
            display: selected && focused ? "flex" : "none",
          }}
        >
          <Drag drag={drag} setDrag={setDrag} />
          <Float name="floatLeft" />
          <Float name="floatRight" />
        </div>
        {size.width && <Resize size={size} setSize={setSize} />}
      </div>
    </>
  );
};
export default Block;
