const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const axios = require("axios");

const app = express();
const uuidV4 = uuid.v4;

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (request, response) => {
  return response.send(posts);
});

app.post("/posts", async (request, response) => {
  const post = {
    id: uuidV4(),
    title: request.body.title,
  };

  posts[post.id] = post;

  await axios
    .post("http://event-bus-service:4005/events", {
      type: "PostCreated",
      data: {
        id: post.id,
        title: post.title,
      },
    })
    .catch((error) => {
      console.log("Error on posts", error.message);
    });

  return response.status(201).send(post);
});

app.post("/events", (request, response) => {
  console.log("Received Event", request.body.type);
  return response.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
