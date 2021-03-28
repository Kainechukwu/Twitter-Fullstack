const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const signupAPIRouter = require("./APIs/signup.js");
const loginRouter = require("./APIs/login")

const app = express();

mongoose.connect("mongodb://localhost:27017/TwitterDB", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));

app.use("/signup", signupAPIRouter);
app.use("/login", loginRouter);

app.get("/", function(req, res){
  res.send("This is the home page");
});

app.listen(3000, function(err) {
  if (!err) {
    console.log("Wormhole active on port 3000");
  }
});
