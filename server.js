const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
let pass = 'testingpassword'
const uri = "mongodb+srv://fhd:" + pass + "@cluster0.bq5mpoq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express()
const PORT = process.env.port || 8080


app.use(express.json());
app.use(express.urlencoded());

app.post("/api", (req, res) => {
    noteName = req.body.noteName
    noteText = req.body.noteText
    noteAuthor = req.body.noteAuthor
    console.log(noteAuthor, noteName, noteText)
    if (noteName && noteText && noteAuthor) {
        console.log('mongo')
        mongo(noteName, noteText, noteAuthor)
    }
    res.json({ message: 'pushed' });
});

app.post("/username", async (req, res) => {
    console.log('username', req.body.username)
    oldNotes = await getOldNotes(req.body.username)
    console.log(oldNotes)
    arr = []
    for (note of oldNotes) {
        arr.push(note.noteName)
    }

    res.json({ message: arr });
});

app.get('/', function (req, res) {
    res.render('index', {});
});

app.listen(PORT, console.log(`server is starting at ${PORT}`))

async function mongo(noteName, noteText, noteAuthor) {
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db('Notes');
    const col = db.collection(noteAuthor)
    let doc = {
        noteName,
        noteText
    }
    const p = await col.insertOne(doc);
}

async function getOldNotes(noteAuthor) {
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db('Notes');
    const col = db.collection(noteAuthor)
    const findResult = await col.find({}).toArray();
    return findResult
}

async function getOldNoteTexts(noteAuthor, noteName) {
    await client.connect()
    console.log("Connected correctly to server");
    const db = client.db('Notes');
    const col = db.collection(noteAuthor)
    const findResult = await col.find({ noteName: noteName }).toArray();
    return findResult
}