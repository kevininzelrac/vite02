import escapeHtml from "escape-html";
import { Text } from "slate";

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<i>${string}</i>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.code) {
      string = `<code>${string}/code>`;
    }
    return string;
  }

  const children = node.children?.map((n) => serialize(n)).join("");
  const { breakLine, textAlign, float, shape, height, width, href, src } = node;

  switch (node.type) {
    case "paragraph":
      return `<p class="${
        textAlign + " " + breakLine + " " + float
      }" width="${width}" height="${height}">${children}</p>`;
    case "h2":
      return `<h2 class="${
        textAlign + " " + breakLine + " " + float
      }" width="${width}" height="${height}">${children}</h2>`;
    case "h3":
      return `<h3 class="${
        textAlign + " " + breakLine + " " + float
      } width="${width}" height="${height}">${children}</h3>`;
    case "h4":
      return `<h4 class="${
        textAlign + " " + breakLine + " " + float
      }" width="${width}" height="${height}">${children}</h4>`;
    case "blockquote":
      return `<blockquote class="${textAlign}">${children}</blockquote>`;
    case "ol":
      return `<ol class="${textAlign}">${children}</ol>`;
    case "ul":
      return `<ul class="${textAlign}">${children}</ul>`;
    case "li":
      return `<li class="${textAlign}">${children}</li>`;
    case "image":
      return `<img class="${
        breakLine + " " + float + " " + shape
      }" width="${width}" height="${height}" src="${escapeHtml(src)}"/>`;
    case "youtube":
      return `<iframe class="${
        breakLine + " " + float + " " + shape
      }" width="${width}" height="${height}" src="${escapeHtml(
        src
      )}"></iframe>`;
    case "link":
      return `<a href="${escapeHtml(
        href
      )}" class="${textAlign}">${children}</a>`;
    default:
      return children;
  }
};
export default serialize;
