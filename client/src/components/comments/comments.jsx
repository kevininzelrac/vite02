import "./comments.css";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import DateFormat from "../../utils/DateFormat";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Loading from "../loading/loading";

export default function Comments({ _id }) {
  const { socket } = useRouteLoaderData("layout");
  const [isPending, setIsPending] = useState(true);
  const [comments, setComments] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsPending(false);
        await socket.emit("getComments", { _id });
        await socket.on("comments", async (data) => {
          const recursive = (root, target) => {
            return target
              ?.filter(({ parent_id }) => parent_id === root)
              .map(({ _id, parent_id, author, date, content, likes }) => ({
                _id,
                parent_id,
                author,
                date,
                content,
                likes,
                comment: recursive(_id, target),
              }));
          };
          setComments(await recursive(_id, data));
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    })();
    return () => {
      socket.off("comments");
    };
  }, []);
  return (
    <>
      {isPending ? (
        <Loading>Loading comments</Loading>
      ) : (
        <div
          className="comments"
          style={{
            animationName: isPending ? "fadeOut" : "fadeIn",
          }}
        >
          <h4>Commentaires</h4>
          <Recursive comments={comments} />
          <Form _id={_id} key={comments}>
            Ajouter un commentaire
          </Form>
        </div>
      )}
    </>
  );
}

const Recursive = ({ comments }) => {
  return (
    <>
      {comments?.map(({ _id, content, author, date, comment, likes }) => (
        <div className="comment" key={_id}>
          <section>
            {author.socket === "on" && <div className="socket">•</div>}
            <img src={author.avatar} />
            <div>
              <span>
                <h2>{author.name} </h2>
                <p>{content}</p>
              </span>
              <time>{DateFormat(date)}</time>
              <Form _id={_id} key={comments}>
                Répondre
              </Form>
              <Like comment_id={_id} likes={likes} />
            </div>
            <LikeIcon comment_id={_id} likes={likes} key={comments.likes} />
          </section>
          {comment && <Recursive comments={comment} />}
        </div>
      ))}
    </>
  );
};

const Form = ({ _id, children }) => {
  const { user, socket } = useRouteLoaderData("layout");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsPending(true);
      await socket.emit("comment", {
        user: user,
        parent_id: _id,
        content: content,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      setVisible(false);
      setContent("");
    }
  };

  return (
    <>
      {visible && (
        <form onSubmit={handleSubmit}>
          <input
            style={{
              opacity: isPending ? 0.4 : 1,
            }}
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder=" Hit Enter to Submit"
            autoFocus
          />
        </form>
      )}
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "Annuler" : children}
      </button>
    </>
  );
};

const LikeIcon = ({ comment_id }) => {
  const { socket } = useRouteLoaderData("layout");
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
  const { user, socket } = useRouteLoaderData("layout");
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
