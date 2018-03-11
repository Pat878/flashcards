const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

const DATA_FILE = path.join(__dirname, "data.json");

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/api/cards", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.put("/api/update", (req, res) => {
  const cards = req.body;

  fs.writeFile(DATA_FILE, JSON.stringify(cards, null, 4), () => {
    res.json(cards);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
