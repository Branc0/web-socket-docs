import { getDocuments } from "./socket-index.js";

const documentList = document.getElementById("doc-list");
getDocuments();

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

export { populateDocList };
