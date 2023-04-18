import io from "./server.js";

const fakeDB = [
  {
    room: "JavaScript",
    history: "welcome to JS",
  },
  {
    room: "Socket.io",
    history: "welcome to Socket.io",
  },
  {
    room: "Node",
    history: "welcome to Node",
  },
];

io.on("connection", (socket) => {
  socket.on("document-selected", (room, callback) => {
    socket.join(room);
    const history = getRoomHistory(room);
    callback(history);
  });

  socket.on("text-input", ({ value, room }) => {
    patchRoomHistory(room, value);
    socket.to(room).emit("text-output", value);
  });
});

function getRoomHistory(room) {
  return fakeDB.find((data) => data.room === room).history;
}

function patchRoomHistory(room, value) {
  fakeDB.find((data) => data.room === room).history = value;
}
