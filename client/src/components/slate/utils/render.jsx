import SlateLink from "../elements/link/link";
import Image from "../elements/image/image";
import Youtube from "../elements/youtube/youtube";
import Block from "../elements/block/block";

export const RenderElement = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "paragraph":
      return (
        <Block element={props.element}>
          <p {...attributes}>{children}</p>
        </Block>
      );
    case "h2":
      return (
        <Block element={props.element}>
          <h2 {...attributes}>{children}</h2>
        </Block>
      );
    case "h3":
      return (
        <Block element={props.element}>
          <h3 {...attributes}>{children}</h3>
        </Block>
      );
    case "h4":
      return (
        <Block element={props.element}>
          <h4 {...attributes}>{children}</h4>
        </Block>
      );
    case "blockquote":
      return (
        <Block element={props.element}>
          <blockquote
            style={{
              marginLeft: "10px",
              paddingLeft: "10px",
              borderLeft: "3px solid lightGray",
            }}
            {...attributes}
          >
            <i>{children}</i>
          </blockquote>
        </Block>
      );
    case "ol":
      return (
        <ol className={element.textAlign} {...attributes}>
          {children}
        </ol>
      );
    case "ul":
      return (
        <ul className={element.textAlign} {...attributes}>
          {children}
        </ul>
      );
    case "li":
      return (
        <li className={element.textAlign} {...attributes}>
          {children}
        </li>
      );
    case "image":
      return <Image {...props} />;
    case "youtube":
      return <Youtube {...props} />;
    case "link":
      return <SlateLink {...props} />;
    default:
      break;
  }
};

export const RenderLeaf = ({ attributes, leaf, children }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code) children = <code>{children}</code>;
  return <span {...attributes}>{children}</span>;
};
