import { findUser, createUser } from "../db/userQueries.js";
import authUser from "../utils/userAuthentication.js";
import generateJWT from "../utils/jwtGenerator.js";

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

  socket.on("user:auth", async (credentials) => {
    const user = await findUser(credentials.user);
    if (user) {
      if (authUser(user, credentials.password)) {
        const token = generateJWT({ user: credentials.user });
        socket.emit("user:login-success", token);
      } else {
        socket.emit("user:login-error", "invalid credentials!");
      }
    } else {
      socket.emit("user:login-error", "this user does not exist!");
    }
  });
};

export default userHandler;
