const socket = io();

function registerUser(credentials) {
  socket.emit("user:create", credentials);
}

socket.on("user:register-success", () => {
  alert("user registered successfully");
});

socket.on("user:register-error", (message) => {
  alert(message);
});

export { registerUser };
