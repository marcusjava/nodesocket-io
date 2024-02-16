const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const PORT = 3001;

var globalVariables = {
  username: "",
};

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.data.username = username;
    console.log(socket.data.username);
  });

  socket.on("message", (data) => {
    // console.log("data", socket.data);
    //servidor emitindo para todos
    io.emit("receive_message", {
      message: data.message,
      authorId: socket.id,
      name: data.username,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected for ${reason}`);
  });
});
server.listen(PORT, () => {
  console.log("server listening on port 3001");
});
