import io from "./server.js";
import { collection } from "./dbConnect.js";

io.on("connection", (socket) => {
  socket.on("list-documents", async (callBack) => {
    const documents = await getDocumentList();
    callBack(documents);
  });

  socket.on("add-document", async (documentName) => {
    const documentExist = (await getRoomHistory(documentName)) !== null;
    if (!documentExist) {
      const res = await createDocument(documentName);
      if (res.acknowledged) {
        io.emit("document-added", documentName);
      }
    } else {
      socket.emit("invalid-document");
    }
  });

  socket.on("delete-document", async (document, callback) => {
    await deleteDocument(document);
    callback();
    socket.broadcast.emit("document-deleted", document);
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

function createDocument(documentName) {
  return collection.insertOne({
    title: documentName,
    content: "",
  });
}

function deleteDocument(documentName) {
  return collection.deleteOne({ title: documentName });
}
