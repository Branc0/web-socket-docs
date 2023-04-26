const socket = io();

function authUser(credentials) {
  socket.emit("user:auth", credentials);
}

export { authUser };
