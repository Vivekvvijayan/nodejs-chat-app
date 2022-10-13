const express = require("express");
const path = require("path");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket io receiving and sedning messages
io.on("connection", (socket) => {
  console.log("a user connect");
  socket.on("message", (message) => {
    console.log(message);
  });
});

server.listen(3000, () => console.log("server running.."));
