import io from "./server.js";

io.on("connection", (socket) => {
  socket.on("document-selected", (room) => {
    socket.join(room);
  });

  socket.on("text-input", ({ value, room }) => {
    socket.to(room).emit("text-output", value);
  });
});
