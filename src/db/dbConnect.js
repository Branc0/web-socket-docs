import { MongoClient } from "mongodb";

const password = process.env.DB_PASSWORD;

const client = new MongoClient(
  `mongodb+srv://rrochadeazevedo:${password}@cluster0.lxserh9.mongodb.net/?retryWrites=true&w=majority`
);

let documentCollection;
let userCollection;

try {
  await client.connect();
  const db = client.db("alura-websocket");
  documentCollection = db.collection("documents");
  userCollection = db.collection("users");
} catch (err) {
  console.log(err);
}

export { documentCollection, userCollection };
