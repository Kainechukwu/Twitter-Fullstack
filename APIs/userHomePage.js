const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");



router.route("/")
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.send("This is the user home page");
      // console.log(req.user.id);
    } else {
      res.send("You need to login");
    }
  })

  .post(function (req, res){
    console.log(req.user.id);
  });

module.exports = router;
