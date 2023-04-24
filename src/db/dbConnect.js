import { MongoClient } from "mongodb";

const password = "123";

const client = new MongoClient(
  `mongodb+srv://rrochadeazevedo:${password}@cluster0.lxserh9.mongodb.net/?retryWrites=true&w=majority`
);

let collection;

try {
  await client.connect();
  const db = client.db("alura-websocket");
  collection = db.collection("documents");
} catch (err) {
  console.log(err);
}

export { collection };
