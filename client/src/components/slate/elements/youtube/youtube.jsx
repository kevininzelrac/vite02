import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react";
import { Transforms } from "slate";
import Drag from "../../components/drag/drag";
import Float from "../../components/float/float";
import Shape from "../../components/shape/shape";
import Resize from "../../components/resize/resize";
import { RemoveVoid } from "../../components/voids";
import { pxTo100, pxToVh, pxToVw } from "../../utils/convertPixels";
import "./youtube.css";

const Youtube = ({ attributes, children, element }) => {
  const { breakLine, float, shape, height, width } = element;
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);

  const _url = new URL(element.src);
  const [url, setUrl] = useState("");

  const ref = useRef(null);
  const [size, setSize] = useState({});
  const [drag, setDrag] = useState(false);

  useLayoutEffect(() => {
    if (!width || ["null", "undefined"].includes(width)) {
      setSize({
        width: 600,
        height: 337,
      });
      Transforms.setNodes(
        editor,
        {
          width: 600,
          height: 337,
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

  useEffect(() => {
    if (element.src.includes("watch?v=")) {
      setUrl(element.src.replace("watch?v=", "embed/"));
    }
    if (element.src.includes("embed")) {
      setUrl(element.src);
    } else if (element.src.includes("youtu.be")) {
      setUrl("https://www.youtube.com/embed/" + _url.pathname);
    }
  }, [_url.pathname, element.url]);

  return (
    <>
      {breakLine && <div style={{ clear: "both" }}></div>}
      <div
        ref={ref}
        draggable={drag}
        contentEditable={false}
        className={"youtube " + (shape || "") + " " + (float || "clearBoth")}
        style={{
          /* maxWidth:
            (
              (size.width / ref.current?.parentElement.offsetWidth) *
              100
            ).toFixed(2) + "%", */
          /* width: size.width + "px", */
          /* height: size.height + "px", */
          boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : " none ",
        }}
      >
        <iframe
          width={size.width}
          height={size.height}
          {...attributes}
          src={url}
          title="YouTube video player"
          allowFullScreen
        />
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
          <Shape name="circle" />
          <RemoveVoid />
        </div>
        {size.width && <Resize size={size} setSize={setSize} />}
      </div>
    </>
  );
};

export default Youtube;
