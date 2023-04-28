import { setCookie } from "../utils/cookieService.js";

const socket = io();

function authUser(credentials) {
  socket.emit("user:auth", credentials);
}

socket.on("user:login-success", (token) => {
  setCookie("user", token);
  window.location.href = "/";
});
socket.on("user:login-error", (message) => alert(message));

export { authUser };
