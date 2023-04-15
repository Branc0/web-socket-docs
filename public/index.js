import { emitValue, selectDocument } from "./socket-index.js";

const documentName = new URLSearchParams(window.location.search).get("nome");
const documentTitle = document.getElementById("titulo-documento");
documentTitle.textContent = documentName;
selectDocument(documentName);

const textField = document.getElementById("editor-texto");
textField.addEventListener("keyup", () => {
  emitValue({ value: textField.value, room: documentName });
});

function editText(value) {
  textField.value = value;
}

export { editText };
