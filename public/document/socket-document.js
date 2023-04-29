import { getCookie } from "../utils/cookieService.js";
import {
  editText,
  documentDeleted,
  documentNoLongerExist,
} from "./document.js";

const socket = io("/documents", {
  auth: {
    token: getCookie("user"),
  },
});

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

socket.on("document-deleted", (documentName) => {
  documentNoLongerExist(documentName);
});

export { emitValue, selectDocument, deleteDocument };
