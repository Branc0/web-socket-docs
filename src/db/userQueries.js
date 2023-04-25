import { userCollection } from "./dbConnect.js";

function findUser(user) {
  return userCollection.findOne({ user });
}

function createUser(credentials) {
  return userCollection.insertOne(credentials);
}

export { findUser, createUser };
