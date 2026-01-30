const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let offer = null;
let answer = null;

app.get("/offer", (req, res) => {
  if (!offer) return res.status(404).send("No offer yet");
  res.json(offer);
});

app.post("/offer", (req, res) => {
  offer = req.body;
  res.sendStatus(200);
});

app.post("/answer", (req, res) => {
  answer = req.body;
  console.log("Answer received");
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Signaling server on :3000");
});
