import { Transforms } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import Icon from "../icons";
import "./resize.css";

const Resize = ({ size, setSize }) => {
  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();

  const handleResize = (e) => {
    let newSize = size;
    const startSize = size;
    const startPosition = {
      y: e.pageY,
      x: e.pageX,
    };

    const onMouseMove = (e) => {
      newSize = {
        width: startSize.width - startPosition.x + e.pageX,
        height: e.shiftKey
          ? startSize.width - startPosition.x + e.pageX
          : startSize.height - startPosition.y + e.pageY,
      };
      setSize(newSize);
    };

    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      Transforms.setNodes(editor, {
        width: newSize.width,
        height: newSize.height,
      });
    };
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <button
      className="resize"
      style={{
        display: selected && focused ? "flex" : "none",
      }}
      onMouseDown={handleResize}
    >
      <div>{size.width}</div>
      <div>{size.height}</div>
      <Icon format={"resize"} />
    </button>
  );
};

export default Resize;
