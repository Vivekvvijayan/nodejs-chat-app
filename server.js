const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket io receiving and sedning messages
io.on("connection", (socket) => {

  socket.broadcast.emit("connected",socket.id)
  socket.on("message", ({name,message}) => {
    socket.broadcast.emit("msg", {
      name: name,
      message: message
    });
  });

    // hnadle onTyping event
    socket.on("typing",({isTyping,name}) => {
  
      socket.broadcast.emit("typing", {
        isTyping: isTyping,
        name: name
      })
    })


// handle disconnection in server
    socket.on("disconnect", () => {
      socket.broadcast.emit("leave",socket.id)
    })

 


});

server.listen(PORT, () => console.log("server running.."));
