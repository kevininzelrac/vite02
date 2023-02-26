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
import { io } from "socket.io-client";
import Loading from "../loading/loading";

//const socket = io();
const socket = io.connect(
  new WebSocket(location.origin.replace(/^http/, "ws") + "/socket.io")
);

export default function Comments() {
  const { comments, post } = useLoaderData();
  const navigation = useNavigation();

  return (
    <Suspense fallback={<Loading>Loading Comments ...</Loading>}>
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
              {({ _id }) => <Form _id={_id}>Ajouter un commentaire</Form>}
            </Await>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

const Recursive = ({ data }) => {
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
              <Form _id={_id}>Répondre</Form>
              <Like comment_id={_id} likes={likes} />
            </div>
            <LikeIcon comment_id={_id} />
          </section>
          {comment && <Recursive data={comment} />}
        </div>
      ))}
    </>
  );
};

const Form = ({ _id, children }) => {
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
        {visible ? "Annuler" : children}
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

const LikeIcon = ({ comment_id }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    socket.emit("getLike", comment_id);
    socket.on("likes", (data) => {
      const filtered = data.find(({ _id }) => _id === comment_id);
      setLikes(filtered?.likes);
    });
    return () => {
      socket.off("likes");
    };
  }, []);
  return (
    <>
      {likes?.length > 0 && (
        <div className="likes">
          <ThumbUpIcon />
          <small>{likes.length}</small>
        </div>
      )}
    </>
  );
};

const Like = ({ comment_id }) => {
  const { user } = useRouteLoaderData("navbar");
  const [like, setLike] = useState(false);

  const handleLike = (comment_id, user_id) => {
    socket.emit("like", { comment_id, user_id });
  };

  useEffect(() => {
    socket.emit("getLike", comment_id);
    socket.on("likes", (data) => {
      const filtered = data.find(
        ({ _id, likes }) => likes.includes(user._id) && _id === comment_id
      );
      setLike(filtered);
    });
    return () => {
      socket.off("likes");
    };
  }, []);

  return (
    <button
      onClick={() => handleLike(comment_id, user._id)}
      style={{
        color: like ? "#336699" : "grey",
      }}
    >
      J'aime
    </button>
  );
};

/* <fetcher.Form
  method={likes.includes(user._id) ? "delete" : "post"}
  action="Like"
>
  <input type="hidden" name="_id" value={_id} />
  <input type="hidden" name="user_id" value={user._id} />
  <button
    type="submit"
    style={{
      color: likes.includes(user._id) ? "#336699" : "grey",
      opacity: isSubmitting || isLoading ? 0.5 : 1,
    }}
  >
    J'aime
  </button>
</fetcher.Form> */
