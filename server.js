const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.post("/api", (req, res) => {
    const data = req.body;
    console.log("received post request");
    if(data)
    {
        fs.writeFile("./public/leaderboards_data.json", JSON.stringify(data,null,4), err => {
            if(err)
                console.log(err);
            
            else
                console.log("File updated");
        })
    }
    res.end();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});