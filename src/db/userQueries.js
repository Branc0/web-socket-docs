import { userCollection } from "./dbConnect.js";
import passwordHashing from "../utils/passwordHashing.js";

function findUser(user) {
  return userCollection.findOne({ user });
}

function createUser({ user, password }) {
  const { passwordHash, salt } = passwordHashing(password);
  return userCollection.insertOne({ user, salt, password: passwordHash });
}

export { findUser, createUser };
