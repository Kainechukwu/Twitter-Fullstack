const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));

router.route("/")
  .get(function(req, res) {
    if(req.isAuthenticated()){
      res.send("This is the user home page");
    } else {
      res.send("You need to login");
    }
  });

  module.exports = router;
