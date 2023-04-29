import "dotenv/config.js";

import io from "./server.js";
import documentHandler from "./handlers/documentHandler.js";
import userHandler from "./handlers/userHandler.js";
import authGuard from "./middlewares/authGuard.js";

io.of("/").on("connection", (socket) => {
  userHandler(io, socket);
});

const nspDocument = io.of("/documents");
nspDocument.use(authGuard).on("connection", (socket) => {
  documentHandler(nspDocument, socket);
});
