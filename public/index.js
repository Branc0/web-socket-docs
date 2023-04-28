import { getDocuments, addDocument } from "./socket-index.js";
import { getCookie, removeCookie } from "./utils/cookieService.js";

const tokenJwt = getCookie("tokenJwt");

const documentList = document.getElementById("doc-list");
getDocuments();

const form = document.getElementById("form-adiciona-documento");
const input = document.getElementById("input");
const logoutButton = document.getElementById("button-logout");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDocumentName = input.value;
  if (newDocumentName) {
    addDocument(newDocumentName);
    input.value = "";
  }
});

logoutButton.addEventListener("click", () => {
  removeCookie(tokenJwt);
  window.location.href = "/login";
});

function populateDocList(documents) {
  documents.forEach((document) => {
    documentList.innerHTML += `
       <a
       id="doc-${document.title}"
       href="document?nome=${document.title}"
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
    href="document?nome=${documentName}"
    class="list-group-item list-group-item-action"
    >
    ${documentName}
    </a>
    `;
}

function removeListItem(documentName) {
  const deletedItem = document.getElementById("doc-" + documentName);
  documentList.removeChild(deletedItem);
}

export { populateDocList, insertDocument, removeListItem };
