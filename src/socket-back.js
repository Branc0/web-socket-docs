import "dotenv/config.js";

import io from "./server.js";
import documentHandler from "./handlers/documentHandler.js";
import userHandler from "./handlers/userHandler.js";

const onConnection = (socket) => {
  documentHandler(io, socket);
  userHandler(io, socket);
};

io.on("connection", onConnection);
