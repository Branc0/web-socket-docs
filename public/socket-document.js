import { editText, documentDeleted } from "./document.js";
const socket = io();

function selectDocument(value) {
  socket.emit("document-selected", value, (value) => {
    editText(value);
  });
}

function emitValue({ value, room }) {
  socket.emit("text-input", { value, room });
}

function deleteDocument(documentName) {
  socket.emit("delete-document", documentName, () => {
    documentDeleted();
  });
}

socket.on("text-output", (text) => {
  editText(text);
});

export { emitValue, selectDocument, deleteDocument };
