const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("assets"));

// build-in middleware
app.use(express.urlencoded({ extended: false }));

// routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});
app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/static/game.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});
app.get("/json", (req, res) => {
  res.sendFile(__dirname + "/db/data.json");
});
app.post("/userdata", (req, res) => {
  console.log("isi:", req.body);
  res.send(`nama: ${req.body.nama}, email: ${req.body.email}`);
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
