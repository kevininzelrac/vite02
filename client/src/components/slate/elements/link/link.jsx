import "./link.css";

const SlateLink = ({ attributes, children, element }) => {
  return (
    <a
      {...attributes}
      className={element.textAlign}
      href={
        element.href.includes("http://")
          ? element.href
          : "http://" + element.href
      }
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};
export default SlateLink;
