import jwt from "jsonwebtoken";

function authGuard(socket, next) {
  const tokenJWT = socket.handshake.auth.token;
  try {
    jwt.verify(tokenJWT, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(error);
  }
}

export default authGuard;
