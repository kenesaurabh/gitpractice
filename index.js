// in nodejs - express is referred as module or package
// reuqire() is a nodejs function to load the module at run time
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// call the function
const app = express();

// for every incoming request, bodyParser will parse data from bytes into JSON object &
// vice-versa for every reponse JSON into bytes
// Will work with POST and PUT/PATCH
app.use(bodyParser.json());

// middleaware - to enable cors at server-side
app.use((req, res, next) => {
  console.log("within cors configuration middleware");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// a base url - localhost:3000
// get('url', callback function)
app.get("/", (req, res) => {
  res.json({ info: "GET - response - Node, express, postgres ready... " });
});

// define more URL
app.post("/api/users", db.postUsers);

const port = 3000;
app.listen(port, () => {
  console.log("Web server is listening on port 3000 ");
});
