const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const db = require(path.join(__dirname, "db.js"));

require("dotenv").config();

const uri = process.env.MONGODB_URI;
const mongoOptions = {
    useUnifiedTopology: true
};
const Client = new MongoClient(uri, mongoOptions);
db.connect(Client);

const app = express();

app.use(express.static("./public"));
app.use(express.json());



app.get("/leaderboards/data", async (req, res) => {
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});