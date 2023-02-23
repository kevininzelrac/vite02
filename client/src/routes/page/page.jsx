import { Suspense } from "react";
import {
  Await,
  defer,
  Outlet,
  useAsyncValue,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
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

export default function Page() {
  const { page } = useLoaderData();
  const { user } = useRouteLoaderData("navbar");
  let navigation = useNavigation();

  return (
    <>
      <Suspense fallback={<Loading />}>
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
      <Outlet />
    </>
  );
}
