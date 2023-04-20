import { populateDocList, insertDocument } from "./index.js";
const socket = io();

socket.on("document-added", (documentName) => {
  insertDocument(documentName);
});

socket.on("invalid-document", () => {
  alert("Invalid document");
});

function getDocuments() {
  socket.emit("list-documents", (documents) => populateDocList(documents));
}

function addDocument(name) {
  socket.emit("add-document", name);
}

export { getDocuments, addDocument };
