// api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const client = await MongoClient.connect("mongodb+srv://atlas:MON!jul21@cluster0.mnljr.mongodb.net/meetups_db?retryWrites=true&w=majority");
    //store in database
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler;
