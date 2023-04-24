import io from "./server.js";
import documentHandler from "./handlers/documentHandler.js";

const onConnection = (socket) => {
  documentHandler(io, socket);
};

io.on("connection", onConnection);
