import { useLayoutEffect, useRef, useState } from "react";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { Transforms } from "slate";
import Drag from "../../components/drag/drag";
import Float from "../../components/float/float";
import Shape from "../../components/shape/shape";
import Resize from "../../components/resize/resize";
import { RemoveVoid } from "../../components/voids";
import { pxTo100 } from "../../utils/convertPixels";
import "./image.css";

const Image = ({ attributes, children, element }) => {
  const { breakLine, float, shape, height, width } = element;
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);

  const ref = useRef(null);
  const [size, setSize] = useState({});
  const [drag, setDrag] = useState(false);

  useLayoutEffect(() => {
    if (!width || ["null", "undefined"].includes(width)) {
      setSize({
        width: 180,
        height: 180,
      });
      Transforms.setNodes(
        editor,
        {
          width: 180,
          height: 180,
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
        contentEditable={false}
        className={"image " + (shape || "") + " " + (float || "clearBoth")}
        style={{
          width: pxTo100(size.width, ref.current?.parentElement.offsetWidth),
          /* height: size.height ? size.height + "px" : "auto", */
          /* height: "clamp('46%,'" + size.height + "px, 100%", */
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
        }}
      >
        <img {...attributes} src={element?.src} alt="page img"></img>
        {children}
        {
          <div
            className="tools"
            style={{
              display: selected && focused ? "flex" : "none",
            }}
          >
            <Drag drag={drag} setDrag={setDrag} />
            <Float name="floatLeft" />
            <Float name="floatRight" />
            <Shape name="circle" />
            <RemoveVoid />
          </div>
        }
        {size.width && <Resize size={size} setSize={setSize} />}
      </div>
    </>
  );
};
export default Image;
