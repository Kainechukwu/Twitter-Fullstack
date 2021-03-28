const express = require("express");
const router = express.Router();
const User = require("../Models/users.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// router.use(function(req, res, next) {
//   console.log(reg.url, "@", Date.now());
//   next();
// })

router.route("/")
  .get(function(req, res) {
    res.send("this is the sign up page");
  })

  .post(function(req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      const user = new User({
        name: {
          firstName: req.body.firstname,
          lastName: req.body.lastname
        },
        email: req.body.email,
        birthday: {
          month: req.body.month,
          day: req.body.day,
          year: req.body.year
        },
        password: hash
      });

      user.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          // res.send("data received from " + req.body.firstname + " " + req.body.lastname + " and saved successfully");
          res.send(`data received from ${req.body.firstname} ${req.body.lastname} and saved successfully`);
        }
      })
    });





  });

module.exports = router;
