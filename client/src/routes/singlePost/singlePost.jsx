import { Suspense } from "react";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import Comments from "../../components/comments/comments";
import { AwaitError } from "../../components/errors/errors";
import TextEditor from "../../components/slate/editor";
import "./singlePost.css";

export async function singlePostLoader({ params }) {
  await new Promise((res) => {
    setTimeout(res, 300);
  });
  const post = fetch("/api/singlePost/" + params.post).then((res) => {
    try {
      return res.json();
    } catch (error) {
      return error;
    }
  });
  const comments = fetch("/api/comments/" + params.post).then((res) => {
    try {
      return res.json();
    } catch (error) {
      return error;
    }
  });
  return defer({ post, comments });
}

export async function singlePostAction({ request }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  const response = await fetch("/api/addComment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(update),
  });
  const data = await response.json();
  return data;
}

export default function SinglePost() {
  const { post } = useLoaderData();
  const { user } = useRouteLoaderData("navbar");
  let navigation = useNavigation();

  return (
    <>
      <Suspense fallback={<p>Loading post...</p>}>
        <Await resolve={post} errorElement={<AwaitError />}>
          {(post) => (
            <main
              style={{
                animationName:
                  navigation.state === "idle" ? "slideDown" : "slideUp",
              }}
            >
              <TextEditor key={post?.about} data={post} user={user} />
              {user && <Comments />}
            </main>
          )}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
}
