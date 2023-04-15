// requiring mongodb and defining client
const mongodb = require("mongodb");
const url = "mongodb+srv://devolopkingbro:XRO1k8cSHFJPj8bM@cluster0.gresqe3.mongodb.net/test";
const client = new mongodb.MongoClient(url);
const database = "accountdata";

// making function to connect to collection and exproting it
const mongocall = async (req,res) => {
    const result= await client.connect();
    const db = result.db(database);
    idpass = db.collection("idpass");
    return idpass;
};
module.exports.mongocall = mongocall;