import Block from "../blocks";
import AddVoid from "../voids";
import Mark from "../marks";
import TextAlign from "../textAlign/textAlign";
import Float from "../float/float";
import Save from "../save";
import { ToggleLink } from "../links";
import { RedoButton, UndoButton } from "../history";
import Shape from "../shape/shape";
import BreakLine from "../breakLine/breakLine";
import "./toolbar.css";

export default function Toolbar({
  label,
  about,
  /* setUpdated, */
  readOnly,
  setReadOnly,
}) {
  return (
    <div className="toolbar">
      <button
        className="toggleEditor"
        onMouseDown={() => setReadOnly(!readOnly)}
      >
        {readOnly ? "éditer" : "aperçu"}
      </button>

      {!readOnly && (
        <>
          <UndoButton />
          <RedoButton />

          <Mark format="bold" />
          <Mark format="italic" />
          <Mark format="underline" />
          <Mark format="code" />

          <Block type="h2" />
          <Block type="h3" />
          <Block type="h4" />
          <Block type="paragraph" />

          <Block type="blockquote" />

          <Block type="ol" />
          <Block type="ul" />

          <TextAlign textAlign="textAlignLeft" />
          <TextAlign textAlign="textAlignCenter" />
          <TextAlign textAlign="textAlignRight" />
          <TextAlign textAlign="textAlignJustify" />

          <Float name="floatLeft" />
          <Float name="floatRight" />

          <BreakLine name="breakLine" />

          <Shape name="circle" />

          <ToggleLink />
          <AddVoid type={"image"} />
          <AddVoid type={"youtube"} />

          <Save label={label} about={about} /* setUpdated={setUpdated} */ />
        </>
      )}
    </div>
  );
}
