import { collection } from "./dbConnect.js";

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

export {
  getDocumentList,
  getRoomHistory,
  patchRoomHistory,
  createDocument,
  deleteDocument,
};
