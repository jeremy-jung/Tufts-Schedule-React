/*
    Serve React JS
    Created by Jeremy Jung
*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//Enable CORS
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'access-control-request-headers'
    );
    next();
});

// turn raw requests into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/frontend/build"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/build", "index.html"));
});

//export and start the site in start.js
module.exports = app;