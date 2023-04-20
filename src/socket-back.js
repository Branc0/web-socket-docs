import io from "./server.js";
import { collection } from "./dbConnect.js";

io.on("connection", (socket) => {
  socket.on("list-documents", async (callBack) => {
    const documents = await getDocumentList();
    console.log(documents);
    callBack(documents);
  });

  socket.on("document-selected", async (room, callback) => {
    socket.join(room);
    const document = await getRoomHistory(room);
    callback(document.content);
  });

  socket.on("text-input", async ({ value, room }) => {
    const res = await patchRoomHistory(room, value);
    if (res.modifiedCount) {
      socket.to(room).emit("text-output", value);
    }
  });
});

function getRoomHistory(room) {
  return collection.findOne({ title: room });
}

function patchRoomHistory(title, content) {
  return collection.updateOne({ title }, { $set: { content } });
}

function getDocumentList() {
  return collection.find().toArray();
}
