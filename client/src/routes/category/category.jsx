import { Suspense, useEffect, useRef } from "react";
import {
  Await,
  defer,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { AwaitError } from "../../components/errors/errors";
import Loading from "../../components/loading/loading";
import DateFormat from "../../utils/DateFormat";
import "./category.css";

export async function categoryLoader({ params }) {
  await new Promise((res) => {
    setTimeout(res, 300);
  });
  const posts = fetch("/api/category/" + params.category).then((res) =>
    res.json()
  );
  return defer({ posts });
}

export default function Category() {
  const { posts } = useLoaderData();
  let navigation = useNavigation();

  return (
    <>
      <Suspense fallback={<Loading>Loading Categories ...</Loading>}>
        <Await resolve={posts} errorElement={<AwaitError />}>
          {(posts) => (
            <main
              style={{
                animationName:
                  navigation.state === "idle" ? "slideDown" : "slideUp",
              }}
            >
              {posts.map((post) => (
                <Article key={post.label} post={post} />
              ))}
            </main>
          )}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
}

const Article = ({ post }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.innerHTML = post?.about;
  }, [post]);

  return (
    <article key={post.label}>
      <header>
        <h2>{post.label}</h2>
        <div>
          <Link to={"/Blog/" + post.category}>{post.category}</Link>
          <span>écrit par {post.author.name}</span>
          <time>le {DateFormat(post.date)}</time>
        </div>
      </header>
      <section>
        <img src={post.picture} alt="" />
        <p ref={ref}></p>
        <Link to={post.label}>Lire la suite</Link>
      </section>
    </article>
  );
};
