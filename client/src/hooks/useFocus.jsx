import { useCallback } from "react";

const useAutoFocus = () => {
  /*   const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 50);
  }, []); */

  const ref = useCallback((inputElement) => {
    setTimeout(() => {
      inputElement?.focus();
    }, 50);
  }, []);

  return ref;
};

export default useAutoFocus;
