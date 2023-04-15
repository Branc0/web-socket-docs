import io from "./server.js";

io.on("connection", (socket) => {
  socket.on("text-input", (value) => {
    socket.broadcast.emit("text-output", value);
  });
});
