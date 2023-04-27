const socket = io();

function authUser(credentials) {
  socket.emit("user:auth", credentials);
}

socket.on("user:login-success", (token) => {
  console.log(token);
  //   window.location.href = "index.html";
});
socket.on("user:login-error", (message) => alert(message));

export { authUser };
