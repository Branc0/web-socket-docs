import { editText } from "./index.js";
const socket = io();

socket.on("text-output", (value) => {
  editText(value);
});

function emitValue(value) {
  socket.emit("text-input", value);
}

export { emitValue };
