const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const events = [];

app.post("/events", async (request, response) => {
  const event = request.body;

  events.push(event);

  await axios
    .post("http://posts-clusterip-service:4000/events", event)
    .catch((err) => {
      console.log(err.message);
    });

  await axios
    .post("http://comments-service:4001/events", event)
    .catch((err) => {
      console.log(err.message);
    });

  await axios.post("http://query-service:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  await axios
    .post("http://moderation-service:4003/events", event)
    .catch((err) => {
      console.log(err.message);
    });

  return response.send({ status: "OK" });
});

app.get("/events", (request, response) => {
  response.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
