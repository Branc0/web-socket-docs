import { insertDocument, populateDocList, removeListItem } from "./index.js";
import { getCookie } from "./utils/cookieService.js";

const socket = io("/documents", {
  auth: {
    token: getCookie("user"),
  },
});

socket.on("document-added", (documentName) => {
  insertDocument(documentName);
});

socket.on("invalid-document", () => {
  alert("Invalid document");
});

socket.on("document-deleted", (docName) => {
  removeListItem(docName);
});

socket.on("connect_error", (error) => {
  alert(error);
  window.location.href = "/login";
});

function getDocuments() {
  socket.emit("list-documents", (documents) => populateDocList(documents));
}

function addDocument(name) {
  socket.emit("add-document", name);
}

export { getDocuments, addDocument };
