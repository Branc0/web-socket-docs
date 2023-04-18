import { editText } from "./index.js";
const socket = io();

function selectDocument(value) {
  socket.emit("document-selected", value, (value) => {
    editText(value);
  });
}

function emitValue({ value, room }) {
  socket.emit("text-input", { value, room });
}

socket.on("text-output", (text) => {
  editText(text);
});

export { emitValue, selectDocument };
