import { findUser, createUser } from "../db/userQueries.js";

const userHandler = (io, socket) => {
  socket.on("user:create", async (credentials) => {
    const userAlreadyExists = await findUser(credentials.user);
    if (userAlreadyExists) {
      socket.emit("user:register-error", "this user already exists");
    } else {
      const res = await createUser(credentials);
      if (res.acknowledged) {
        socket.emit("user:register-success");
      } else {
        socket.emit(
          "user:register-error",
          "not able to register user, please try again later"
        );
      }
    }
  });
};

export default userHandler;
