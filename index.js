const path = require("path")
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require('dotenv').config({path: __dirname + '\\.env.local'});

const whitelist = [
    "https://pastoring-gods-sheep-rd.pages.dev/",
    "http://localhost:3000"
];
const corsOptions = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error("CORS Not Supported"));
        }
    }
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", require("./api/api.js"));

app.listen(PORT);