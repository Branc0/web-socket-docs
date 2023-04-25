import { documentCollection } from "./dbConnect.js";

function getRoomHistory(room) {
  return documentCollection.findOne({ title: room });
}

function patchRoomHistory(title, content) {
  return documentCollection.updateOne({ title }, { $set: { content } });
}

function getDocumentList() {
  return documentCollection.find().toArray();
}

function createDocument(documentName) {
  return documentCollection.insertOne({
    title: documentName,
    content: "",
  });
}

function deleteDocument(documentName) {
  return documentCollection.deleteOne({ title: documentName });
}

export {
  getDocumentList,
  getRoomHistory,
  patchRoomHistory,
  createDocument,
  deleteDocument,
};
