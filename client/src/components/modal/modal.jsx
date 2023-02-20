import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./modal.css";

export async function modalLoader() {
  await new Promise((res) => {
    setTimeout(res, 300);
  });
  return null;
}

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsOpen(false);
    const timer = setTimeout(() => {
      navigate(-1);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  /* isOpen
    ? document.body.classList.add("overflow-hidden")
    : document.body.classList.remove("overflow-hidden"); */

  return (
    <dialog style={{ animationName: isOpen ? "slideRight" : "slideLeft" }}>
      <div className="opaque" onClick={handleClick}></div>
      <Outlet />
    </dialog>
  );
};

export default Modal;
