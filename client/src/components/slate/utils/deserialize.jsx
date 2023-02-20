import { jsx } from "slate-hyperscript";

const deserialize = (element, attributes = {}) => {
  if (element.nodeType === Node.TEXT_NODE) {
    return jsx("text", attributes, element.textContent);
  } else if (element.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const nodeAttributes = { ...attributes };

  switch (element.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
      break;
    case "I":
      nodeAttributes.italic = true;
      break;
    case "U":
      nodeAttributes.underline = true;
      break;
    case "CODE":
      nodeAttributes.code = true;
      break;
    default:
      break;
  }

  const children = Array.from(element.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();

  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }

  const textAlign = (element) => {
    return element.getAttribute("class")?.includes("textAlignLeft")
      ? "textAlignLeft"
      : element.getAttribute("class")?.includes("textAlignRight")
      ? "textAlignRight"
      : element.getAttribute("class")?.includes("textAlignCenter")
      ? "textAlignCenter"
      : element.getAttribute("class")?.includes("textAlignJustify")
      ? "textAlignJustify"
      : "";
  };
  const float = (element) => {
    return element.getAttribute("class")?.includes("floatLeft")
      ? "floatLeft"
      : element.getAttribute("class")?.includes("floatRight")
      ? "floatRight"
      : "";
  };

  const breakLine = (element) => {
    return element.getAttribute("class")?.includes("breakLine")
      ? "breakLine"
      : "";
  };

  const shape = (element) => {
    return element.getAttribute("class")?.includes("circle") ? "circle" : "";
  };

  switch (element.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "P":
      return jsx(
        "element",
        {
          type: "paragraph",
          textAlign: textAlign(element),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
        },
        children
      );
    case "H2":
      return jsx(
        "element",
        {
          type: "h2",
          textAlign: textAlign(element),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
        },
        children
      );
    case "H3":
      return jsx(
        "element",
        {
          type: "h3",
          textAlign: textAlign(element),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
        },
        children
      );
    case "H4":
      return jsx(
        "element",
        {
          type: "h4",
          textAlign: textAlign(element),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
        },
        children
      );
    case "BLOCKQUOTE":
      return jsx(
        "element",
        {
          type: "blockquote",
          textAlign: textAlign(element),
        },
        children
      );
    case "OL":
      return jsx(
        "element",
        {
          type: "ol",
          textAlign: textAlign(element),
        },
        children
      );
    case "UL":
      return jsx(
        "element",
        {
          type: "ul",
          textAlign: textAlign(element),
        },
        children
      );
    case "LI":
      return jsx(
        "element",
        {
          type: "li",
          textAlign: textAlign(element),
        },
        children
      );
    case "IMG":
      return jsx(
        "element",
        {
          type: "image",
          src: element.getAttribute("src"),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
          shape: shape(element),
        },
        children
      );
    case "IFRAME":
      return jsx(
        "element",
        {
          type: "youtube",
          src: element.getAttribute("src"),
          width: element.getAttribute("width"),
          height: element.getAttribute("height"),
          float: float(element),
          breakLine: breakLine(element),
          shape: shape(element),
        },
        children
      );
    case "A":
      return jsx(
        "element",
        {
          type: "link",
          href: element.getAttribute("href"),
          textAlign: textAlign(element),
        },
        children
      );
    default:
      return children;
  }
};
export default deserialize;
