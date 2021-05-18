const express = require("express");
const router = express.Router();
const User = require("../Models/users.js");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;






router.route("/")
  .get(function(req, res) {
    res.send("This is the login page");
  })

  .post(function(req, res, next) {
   
    console.log("body: " + req.body.username)
   

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    // console.log(user);

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
      // console.log("User: " + user);
      // console.log("Error: " + err);
      console.log("reqHeaders" + req.headers);
      console.log("loginuser: " + user)

      if (err) {
        throw err;
      } 
      if(!user) {
        res.send("No user exists");
      } 
      else {
        req.login(user, function(err) {
          if (err) {
            throw err
          } else if (!err){
            res.setHeader("username", req.body.username);
            res.setHeader("user_id", req.user._id)
  
            // console.log("resHeader:" + res.headers)

           

            
            
            res.send("Successfully Authenticated User");
          }
          
          
         
        });
      }

    })(req, res, next);
  //  console.log(req.user);
  });

module.exports = router;
