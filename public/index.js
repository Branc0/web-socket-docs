import { emitValue } from "./socket-index.js";

const textField = document.getElementById("editor-texto");
textField.addEventListener("keyup", () => {
  emitValue(textField.value);
});

function editText(value) {
  textField.value = value;
}

export { editText };
