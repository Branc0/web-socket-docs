import {
  getDocumentList,
  getRoomHistory,
  patchRoomHistory,
  createDocument,
  deleteDocument,
} from "../db/documentQueries.js";

const documentHandler = (io, socket) => {
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
};

export default documentHandler;
