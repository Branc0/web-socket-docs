import {
  emitValue,
  selectDocument,
  deleteDocument,
} from "./socket-document.js";

const documentName = new URLSearchParams(window.location.search).get("nome");

const textField = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const deleteButton = document.getElementById("delete-document");

documentTitle.textContent = documentName;

selectDocument(documentName);

textField.addEventListener("keyup", () => {
  emitValue({ value: textField.value, room: documentName });
});

deleteButton.addEventListener("click", () => {
  const res = confirm(`are you sure you want to exclude ${documentName}?`);
  if (res) {
    deleteDocument(documentName);
  }
});

function documentDeleted() {
  window.location.href = "index.html";
}

function documentNoLongerExist(document) {
  if (documentName === document) {
    alert("this document was deleted");
    documentDeleted();
  }
}

function editText(value) {
  textField.value = value;
}

export { editText, documentDeleted, documentNoLongerExist };
