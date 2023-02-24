import Spinner from "@mui/icons-material/Autorenew";
import "./loading.css";

export default function Loading({ children }) {
  return (
    <div className="loading">
      <h2>{children}</h2>
      <Spinner />
    </div>
  );
}
