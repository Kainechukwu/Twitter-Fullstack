const express = require("express");
const router = express.Router();
const User = require("../Models/users.js");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");




router.route("/")
  .get(function(req, res) {
    res.send("this is the sign up page");
  })

  .post(function(req, res) {
    console.log(req.body);
    User.register({username: req.body.username, year: req.body.year, day: req.body.day, month: req.body.month, firstname: req.body.firstname, lastname: req.body.lastname}, req.body.password, function(err, user){
      if(err){
        console.log(err);
        res.send("You need to reregister");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.send("This is your userhomepage");
        })
      }
    })


  });

module.exports = router;
