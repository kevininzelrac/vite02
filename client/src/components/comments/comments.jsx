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
import Loading from "../loading/loading";
import { io } from "socket.io-client";
const socket = io.connect(location.origin);

export default function Comments({ _id }) {
  const { comments } = useLoaderData();
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
            <Recursive comments={comments} />
            <Form _id={_id}>Ajouter un commentaire</Form>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

const Recursive = ({ comments }) => {
  return (
    <>
      {comments.map(({ _id, content, author, date, comment, likes }) => (
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
            <LikeIcon comment_id={_id} likes={likes} />
          </section>
          {comment && <Recursive comments={comment} />}
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
          <fetcher.Form method="put">
            <input type="hidden" name="_id" value={_id} />
            <input
              style={{
                color: isSubmitting ? "red" : isLoading ? "green" : "inherit",
              }}
              type="text"
              name="content"
              autoFocus
            />
          </fetcher.Form>
        </>
      )}
    </>
  );
};

const LikeIcon = ({ comment_id }) => {
  const [like, setLike] = useState();

  useEffect(() => {
    (async () => {
      try {
        await socket.emit("getLike", { comment_id });
        await socket.on("likes", async (data) => {
          const filtered = await data.find(({ _id }) => _id === comment_id);
          setLike(filtered?.likes);
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      socket.off("likes");
    };
  }, []);

  return (
    <>
      {like?.length > 0 && (
        <div className="likes">
          <ThumbUpIcon />
          <small>{like?.length}</small>
        </div>
      )}
    </>
  );
};

const Like = ({ comment_id }) => {
  const { user } = useRouteLoaderData("navbar");
  const [like, setLike] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await socket.on("likes", async (data) => {
          const filtered = await data.find(
            ({ _id, likes }) => likes.includes(user._id) && _id === comment_id
          );
          setLike(filtered?.likes);
          setIsPending(false);
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      socket.off("likes");
    };
  }, []);

  const handleClick = async () => {
    await socket.emit("like", { comment_id, user_id: user._id });
    setIsPending(true);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        color: like ? "#336699" : "grey",
        opacity: isPending ? 0.4 : 1,
      }}
    >
      J'aime
    </button>
  );
};
