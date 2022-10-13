const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const axios = require("axios");

const app = express();
const uuidV4 = uuid.v4;

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (request, response) => {
  return response.send(commentsByPostId[request.params.id] || []);
});

app.post("/posts/:id/comments", async (request, response) => {
  const comment = {
    id: uuidV4(),
    content: request.body.content,
    status: "pending",
  };

  const comments = commentsByPostId[request.params.id] || [];

  comments.push(comment);

  commentsByPostId[request.params.id] = comments;

  await axios
    .post("http://event-bus-service:4005/events", {
      type: "CommentCreated",
      data: {
        id: comment.id,
        content: comment.content,
        postId: request.params.id,
        status: "pending",
      },
    })
    .catch((error) => {
      console.log(error.message);
    });

  return response.status(201).send(comments);
});

app.post("/events", async (request, response) => {
  const { type, data } = request.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    await axios.post("http://event-bus-service:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  response.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
