import Bold from "@mui/icons-material/FormatBold";
import Italic from "@mui/icons-material/FormatItalic";
import Underline from "@mui/icons-material/FormatUnderlined";
import Code from "@mui/icons-material/Code";
import UnCode from "@mui/icons-material/CodeOff";
import Title from "@mui/icons-material/Title";
import Blockquote from "@mui/icons-material/FormatQuote";
import Ol from "@mui/icons-material/FormatListNumbered";
import Ul from "@mui/icons-material/FormatListBulleted";
import AlignLeft from "@mui/icons-material/FormatAlignLeft";
import AlignCenter from "@mui/icons-material/FormatAlignCenter";
import AlignRight from "@mui/icons-material/FormatAlignRight";
import AlignJustify from "@mui/icons-material/FormatAlignJustify";
import Link from "@mui/icons-material/Link";
import UnLink from "@mui/icons-material/LinkOff";
import Image from "@mui/icons-material/Image";
import DeleteImage from "@mui/icons-material/HideImage";
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import FloatLeft from "@mui/icons-material/FormatIndentIncrease";
import Square from "@mui/icons-material/Square";
import Circle from "@mui/icons-material/Circle";
import YouTube from "@mui/icons-material/YouTube";
import Resize from "@mui/icons-material/AspectRatio";
import Undo from "@mui/icons-material/Undo";
import Redo from "@mui/icons-material/Redo";
import DragHandle from "@mui/icons-material/DragHandle";
import TextFormat from "@mui/icons-material/TextFormat";
import Edit from "@mui/icons-material/Edit";
import Article from "@mui/icons-material/Article";
import BreakLine from "@mui/icons-material/KeyboardReturn";

const Icon = ({ format, size }) => {
  size ? (size = size) : (size = 18);

  switch (format) {
    case "paragraph":
      /* return <TextFormat sx={{ width: size }} />; */
      return (
        <span style={{ width: size }}>
          <strong>P</strong>
        </span>
      );
    case "bold":
      return <Bold sx={{ width: size }} />;
    case "italic":
      return <Italic sx={{ width: size }} />;
    case "underline":
      return <Underline sx={{ width: size }} />;
    case "code":
      return <Code sx={{ width: size }} />;
    case "unCode":
      return <UnCode sx={{ width: size }} />;
    case "h2":
      return <Title sx={{ width: size }} />;
    case "h3":
      return <Title sx={{ width: size - 2 }} />;
    case "h4":
      return <Title sx={{ width: size - 4 }} />;
    case "blockquote":
      return <Blockquote sx={{ width: size }} />;
    case "ol":
      return <Ol sx={{ width: size }} />;
    case "ul":
      return <Ul sx={{ width: size }} />;
    case "textAlignLeft":
      return <AlignLeft sx={{ width: size }} />;
    case "textAlignCenter":
      return <AlignCenter sx={{ width: size }} />;
    case "textAlignRight":
      return <AlignRight sx={{ width: size }} />;
    case "textAlignJustify":
      return <AlignJustify sx={{ width: size }} />;
    case "link":
      return <Link sx={{ width: size }} />;
    case "unLink":
      return <UnLink sx={{ width: size }} />;
    case "image":
      return <Image sx={{ width: size }} />;
    case "deleteImage":
      return <DeleteImage sx={{ width: size }} />;
    case "save":
      return <Save sx={{ width: size }} />;
    case "delete":
      return <Delete sx={{ width: size }} />;
    case "floatLeft":
      return <FloatLeft sx={{ width: size }} />;
    case "floatRight":
      return <FloatLeft sx={{ width: size, rotate: "180deg" }} />;
    case "square":
      return <Square sx={{ width: size }} />;
    case "circle":
      return <Circle sx={{ width: size }} />;
    case "youtube":
      return <YouTube sx={{ width: size }} />;
    case "resize":
      return <Resize sx={{ width: size }} />;
    case "undo":
      return <Undo sx={{ width: size }} />;
    case "redo":
      return <Redo sx={{ width: size }} />;
    case "dragHandle":
      return <DragHandle sx={{ width: size }} />;
    case "edit":
      return <Edit sx={{ width: size }} />;
    case "article":
      return <Article sx={{ width: size }} />;
    case "breakLine":
      return <BreakLine sx={{ width: size }} />;

    default:
      break;
  }
};

export default Icon;
