import { populateDocList } from "./index.js";
const socket = io();

function getDocuments() {
  socket.emit("list-documents", (documents) => populateDocList(documents));
}

export { getDocuments };
