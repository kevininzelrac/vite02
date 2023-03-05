import { Suspense } from "react";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
  useOutletContext,
} from "react-router-dom";
import { AwaitError } from "../../components/errors/errors";
import Loading from "../../components/loading/loading";
import TextEditor from "../../components/slate/editor";
import "./page.css";

export async function pageLoader({ params }) {
  await new Promise((res) => {
    setTimeout(res, 300);
  });
  const page = fetch("/api/pages/" + params.page).then((res) => {
    try {
      return res.json();
    } catch (error) {
      return error;
    }
  });
  return defer({ page });
}

export async function pageAction({ request }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  const response = await fetch("/api/updatePage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(update),
  });
  const data = await response.json();
  return await data;
}

export default function Page() {
  const { user } = useRouteLoaderData("navbar");
  const { page } = useLoaderData();
  const { socket } = useOutletContext();

  let navigation = useNavigation();

  return (
    <>
      <Suspense fallback={<Loading>Loading page ...</Loading>}>
        <Await resolve={page} errorElement={<AwaitError />}>
          {(page) => (
            <main
              style={{
                animationName:
                  navigation.state === "idle" ? "slideDown" : "slideUp",
              }}
            >
              <TextEditor key={page?.about} data={page} user={user} />
            </main>
          )}
        </Await>
      </Suspense>
      <Outlet context={{ socket }} />
    </>
  );
}
