const express = require("express");
const router = express.Router();
const User = require("../Models/users.js");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;




// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



router.route("/")
  .get(function(req, res) {
    res.send("This is the login page");
  })

  .post(function(req, res, next) {
    console.log(req.user);

    const user = new User({
      username: req.body.email,
      password: req.body.password
    });

    // req.login(user, function(err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     passport.authenticate("local")(req, res, function(){
    //       res.redirect("/userHomePage?page=1&limit=3");
    //       // res.redirect("localhost:4000/userhomepage/?");
    //       // console.log(req.body)

    //     });
    //   }

    // });


    passport.authenticate("local", (err,user,info) => {
      // res.redirect("/userHomePage?page=1&limit=3");
      // res.redirect("localhost:4000/userhomepage/?");
      console.log(req.user);

      if (err) throw err;
      if(!user) res.send("No user exists");
      else {
        req.login(user, function(err) {
          if (err) throw err; 
          res.send("Successfully Authenticated");
          console.log(req.user);
    
        });
      }

    })(req, res, next);
   console.log(req.user)
  });

module.exports = router;
