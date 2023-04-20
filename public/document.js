import { emitValue, selectDocument } from "./socket-document.js";

const documentName = new URLSearchParams(window.location.search).get("nome");

const textField = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.textContent = documentName;

selectDocument(documentName);

textField.addEventListener("keyup", () => {
  emitValue({ value: textField.value, room: documentName });
});

function editText(value) {
  textField.value = value;
}

export { editText };
