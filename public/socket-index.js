import { editText } from "./index.js";
const socket = io();

socket.on("text-output", (value) => {
  editText(value);
});

function emitValue({ value, room }) {
  socket.emit("text-input", { value, room });
}

function selectDocument(value) {
  socket.emit("document-selected", value);
}

export { emitValue, selectDocument };
