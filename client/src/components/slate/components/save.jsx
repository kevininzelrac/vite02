import { useFetcher } from "react-router-dom";
import serialize from "../utils/serialize";
import Icon from "./icons";

export default function Save({ label, about }) {
  const fetcher = useFetcher();
  const isIdle = fetcher.state === "idle";
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";
  return (
    <>
      <fetcher.Form method="post" action="Save">
        <input type="hidden" name="label" value={label} />
        <input type="hidden" name="about" value={serialize(about)} />
        <button type="submit">
          <Icon format="save" />
        </button>
      </fetcher.Form>
      {fetcher.state}
      {fetcher && !isIdle && <p>sauvegarde en cours ...</p>}
    </>
  );
}
