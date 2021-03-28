const express = require("express");
const router = express.Router();
const User = require("../Models/users.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// router.use(function(req, res, next) {
//   console.log(reg.url, "@", Date.now());
//   next();
// });


router.route("/")
  .get(function(req, res) {
    res.send("This is the login page");
  })

  .post(function(req, res) {
    const password = req.body.password;
    const userName = req.body.email;

    User.findOne({
      email: userName
    }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          bcrypt.compare(password, foundUser.password, function(err, result) {
            if(result === true) {
              res.send("user successfully authenticated");
            } else {
              res.send("Password incorrect");
            }
          });
        } else {
          res.send("Incorrect name, go to the sign in page");
        }
      }
    });
  });

  module.exports = router;
