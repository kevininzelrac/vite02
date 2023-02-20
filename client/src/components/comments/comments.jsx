import { Suspense, useEffect, useState } from "react";
import {
  Await,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import DateFormat from "../../utils/DateFormat";
import { AwaitError } from "../errors/errors";
import "./comments.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import io from "socket.io-client";

/* const socket = io.connect(
  new WebSocket(location.origin.replace(/^http/, "ws") + "/socket.io")
); */

export default function Comments() {
  const { comments, post } = useLoaderData();
  const navigation = useNavigation();

  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Await resolve={comments} errorElement={<AwaitError />}>
        {(comments) => (
          <div
            className="comments"
            style={{
              animationName: navigation.state === "idle" ? "fadeIn" : "fadeOut",
            }}
          >
            <h4>Commentaires</h4>
            <Recursive data={comments} />
            <Await resolve={post} errorElement={<AwaitError />}>
              {({ _id }) => <Form _id={_id} />}
            </Await>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

const Recursive = ({ data }) => {
  const { user } = useRouteLoaderData("navbar");
  const fetcher = useFetcher();
  /* const [favorite, setFavorite] = useState({});

  const handleClick = (id) => {
    favorite.id?.includes(id)
      ? socket.emit("favorite", { id: "" })
      : socket.emit("favorite", { id });
    console.log(favorite);
  };

  useEffect(() => {
    socket.on("favorite", (data) => {
      setFavorite(data);
    });
  }, [socket]); */
  return (
    <>
      {data.map(({ _id, content, author, date, comment, likes }) => (
        <div className="comment" key={_id}>
          <section>
            <img src={author.avatar} />
            <div>
              <span>
                <h2>{author.name} </h2>
                <p>{content}</p>
              </span>
              <time>{DateFormat(date)}</time>

              <Form _id={_id} />
              {likes.includes(user._id) ? (
                <fetcher.Form method="delete" action="Like">
                  <input type="hidden" name="_id" value={_id} />
                  <input type="hidden" name="user_id" value={user._id} />
                  <button type="submit" style={{ color: "#336699" }}>
                    J'aime
                  </button>
                </fetcher.Form>
              ) : (
                <>
                  <fetcher.Form method="post" action="Like">
                    <input type="hidden" name="_id" value={_id} />
                    <input type="hidden" name="user_id" value={user._id} />
                    <button type="submit" style={{ color: "grey" }}>
                      J'aime
                    </button>
                  </fetcher.Form>
                </>
              )}
              {/*  <button onClick={() => handleClick(_id)}>
                <FavoriteIcon
                  sx={{
                    color: favorite.id?.includes(_id) ? "red" : "grey",
                    fontSize: "small",
                  }}
                />
              </button> */}
            </div>
            {likes.length > 0 && (
              <div className="likes">
                <ThumbUpIcon />
                <small>{likes.length}</small>
              </div>
            )}
          </section>
          {comment && <Recursive data={comment} />}
        </div>
      ))}
    </>
  );
};

const Form = ({ _id }) => {
  const fetcher = useFetcher();
  const [visible, setVisible] = useState(false);
  const isIdle = fetcher.state === "idle";
  const isSubmitting = fetcher.state === "submitting";
  const isLoading = fetcher.state === "loading";

  useEffect(() => {
    isIdle & visible && setVisible(false);
  }, [isIdle]);

  return (
    <>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "Annuler" : "Répondre"}
      </button>
      {visible && (
        <>
          <small>{fetcher.state !== "idle" && fetcher.state}</small>
          <fetcher.Form method="post">
            <input
              style={{
                color: isSubmitting ? "red" : isLoading ? "green" : "inherit",
              }}
              type="text"
              name="content"
              autoFocus
            />
            <input type="hidden" name="_id" value={_id} />
          </fetcher.Form>
        </>
      )}
    </>
  );
};
