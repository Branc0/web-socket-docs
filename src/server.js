import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "./dbConnect.js";

const app = express();

const port = process.env.port || 3000;

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "../..", "public");
app.use(express.static(publicDirectory));

const server = http.createServer(app);

server.listen(port, () => `server listening to port ${port}`);

const io = new Server(server);

export default io;
