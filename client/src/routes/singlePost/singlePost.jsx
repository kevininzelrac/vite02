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
import Loading from "../../components/loading/loading";
import "./singlePost.css";

export async function singlePostLoader({ params }) {
  console.log("singlePostLoader");

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

  return defer({ post });
}

export async function singlePostAction({ request }) {
  //empty space
}

export default function SinglePost() {
  const { post } = useLoaderData();
  const { user } = useRouteLoaderData("navbar");
  let navigation = useNavigation();

  return (
    <>
      <Suspense fallback={<Loading>Loading Post ...</Loading>}>
        <Await resolve={post} errorElement={<AwaitError />}>
          {(post) => (
            <>
              <main
                style={{
                  animationName:
                    navigation.state === "idle" ? "slideDown" : "slideUp",
                }}
              >
                <TextEditor key={post?.about} data={post} user={user} />
                {user && <Comments _id={post._id} key={post._id} />}
              </main>
              <Outlet />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
