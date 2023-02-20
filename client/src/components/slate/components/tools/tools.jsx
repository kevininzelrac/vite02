import Drag from "../drag/drag";
import Float from "../float/float";
import Shape from "../shape/shape";
import { RemoveVoid } from "../voids";
import "./tools.css";

const Tools = () => {
  return (
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
  );
};

export default Tools;
