const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = new express();

app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (event) => {
  const { type, data } = event;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (request, response) => {
  return response.send(posts);
});

app.post("/events", (request, response) => {
  const event = request.body;

  handleEvent(event);

  return response.send({ ok: "ok" });
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const events = await axios.get("http://api-event-bus:4005/events");

  for (let event of events.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event);
  }
});
