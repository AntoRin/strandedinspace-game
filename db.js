const MongoClient = require("mongodb").MongoClient;

async function connect(Client)
{
    try{
        await Client.connect();
    } catch(e){
        console.log(e);
    }
}

async function closeConnection(Client)
{
    try{
        await Client.close();
    } catch(e){
        console.log(e);
    }
}

async function findAndUpdate(Client, data)
{
    try{
        let response = await Client.db("stranded_in_space").collection("Leaderboards").updateOne({name: data.name}, {$set:{score: data.score}}, {upsert: false});

        console.log(response.modifiedCount + " entry was updated");
    } 
    catch(err){
        if(err)
            console.log(err);
    }
}

async function addEntry(Client, data)
{
    try{
        let response = await Client.db("stranded_in_space").collection("Leaderboards").insertOne(data);
        console.log("data added: " + response.result.n);
    }
    catch(error){
        console.log(error);
    }
}

async function findEntry(Client, name)
{
    let response = await Client.db("stranded_in_space").collection("Leaderboards").findOne({name: name});
    if(response)
        return true;
    else
        return false;
}

async function listEntries(Client)
{
    let response = await Client.db("stranded_in_space").collection("Leaderboards").find({score:{ $gt: 0}}).sort({score: -1});
    let data = await response.toArray();
    let object = {
        "leaderboards": data
    }
    return object;
    console.log(object);
}

module.exports = {connect, closeConnection, addEntry, listEntries, findEntry, findAndUpdate};