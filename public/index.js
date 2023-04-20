import { getDocuments, addDocument } from "./socket-index.js";

const documentList = document.getElementById("doc-list");
getDocuments();

const form = document.getElementById("form-adiciona-documento");
const input = document.getElementById("input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDocumentName = input.value;
  if (newDocumentName) {
    addDocument(newDocumentName);
    input.value = "";
  }
});

function populateDocList(documents) {
  documents.forEach((document) => {
    documentList.innerHTML += `
       <a
       href="documento.html?nome=${document.title}"
       class="list-group-item list-group-item-action"
       >
       ${document.title}
       </a>
       `;
  });
}

function insertDocument(documentName) {
  documentList.innerHTML += `
    <a
    href="documento.html?nome=${documentName}"
    class="list-group-item list-group-item-action"
    >
    ${documentName}
    </a>
    `;
}

export { populateDocList, insertDocument };
