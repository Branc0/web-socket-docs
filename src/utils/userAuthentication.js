import { scryptSync, timingSafeEqual } from "crypto";

function authUser(user, password) {
  const encryptedPassword = scryptSync(password, user.salt, 64);

  const originalPassword = Buffer.from(user.password, "hex");

  return timingSafeEqual(encryptedPassword, originalPassword);
}

export default authUser;
