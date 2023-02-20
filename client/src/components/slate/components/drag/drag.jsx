import Icon from "../icons";
import "./drag.css";

const Drag = ({ drag, setDrag }) => {
  const HandleDrag = () => {
    setDrag(true);
    const onMouseUp = () => {
      setDrag(false);
    };
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  return (
    <button className={drag ? "active" : ""} onMouseDown={() => HandleDrag()}>
      <Icon format={"dragHandle"} />
    </button>
  );
};

export default Drag;
