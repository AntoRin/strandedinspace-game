const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const db = require("./db.js");

require("dotenv").config();

const uri = process.env.MONGODB_URI;
const mongoOptions = {
    useUnifiedTopology: true
};
const Client = new MongoClient(uri, mongoOptions);
db.connect(Client, (err) => {
    if(err)
    {
        console.log("error encountered while trying to connect to your database: " + err);
    }
});

const app = express();

app.use(express.static("./public"));
app.use(express.json());



app.get("/leaderboards/data", async (req, res) => {
    const Client = new MongoClient(uri, mongoOptions);
    await db.connect(Client);
    let leaderboards = await db.listEntries(Client);
    res.json(leaderboards);
});

app.get("/leaderboards/data/:name", async (req, res) => {
    let name = req.params.name;
    let result = await db.findEntry(Client, name);
    let isPresent = {
        found: result
    };
    res.json(isPresent);
});

app.put("/leaderboards/data", async (req, res) => {
    const data = req.body;
    await db.findAndUpdate(Client, data);
    res.end();
});


app.post("/leaderboards/data", async (req, res) => {
    const data = req.body;
    await db.addEntry(Client, data);
    res.end();
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});