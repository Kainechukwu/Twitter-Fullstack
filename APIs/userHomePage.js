const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const Tweet = require("../Models/tweets");
const ObjectId = mongoose.Types.ObjectId;
const paginate = require("../Middleware/pagination");
// const cors = require("cors");

// let mWare = [paginate(Tweet), cors()]


router.route("/")
  .get(paginate(Tweet), function(req, res) {
    res.send(res.paginatedResults)
    
    // if (req.isAuthenticated()) {
    //   res.send("hello")
    //   // res.paginatedResults
    //   console.log(res.paginatedResults);
    //   console.log(`Sucessful login, welcome`)


    // } else {
    //   res.send("You need to login");
    // }
  });



module.exports = router;
