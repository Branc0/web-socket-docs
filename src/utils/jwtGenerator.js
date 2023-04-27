import jwt from "jsonwebtoken";

function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export default generateJWT;
