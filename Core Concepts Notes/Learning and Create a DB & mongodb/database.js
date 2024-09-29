const { MongoClient } = require('mongodb');

// Connection URL
const URL = "mongodb+srv://NAMASTENODEJS:SJzF8mUV5wgcjCGa@cluster0.u829d.mongodb.net/"
const client = new MongoClient(URL); //It is used to establish a connection between your Node.js application and a MongoDB database.


// Database Name
const dbName = 'HelloWorld';

const data = {
    firstname: "Parth",
    lastname: "patel"
}

async function main() {
    await client.connect(); // Here we connect with the MongoDB server.
    console.log('Connected successfully to MongoDB server ');
    const db = client.db(dbName); // Here we connect with the database.
    const collection = db.collection('Collection0');

    // const insertResult = await collection.insertMany([data]).toArrat();
    // console.log('Inserted documents =>', insertResult);

    // const findResult = await collection.find({}).toArray();
    // console.log("filding result ==> ", findResult)

    return 'done.';


}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

/*  WORKFLOW:
    - make a connection between the Node.js application and a MongoDB database. --> const client = new MongoClient(URL);
    - Now we connect with the MongoDB server(AWS, Azure etc.). --> await client.connect();   here client is our nodejs application.
    - Now we connect the client to the database which we make in mongodb compass --> const db = client.db(dbName);
    - Now we connnect the database to the collection which we make in mongodb compass --> const collection = db.collection('Collection0');
    - At the end Now we can perform CRUD operations on the collection. --> CURD = Create, Read, Update, Delete.

*/