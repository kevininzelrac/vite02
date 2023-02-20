const usePourcent = (target, parent) => {
  return ((target * 100) / parent).toFixed(2) + "%";
};
export default usePourcent;
