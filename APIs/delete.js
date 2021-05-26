const express = require("express");
const router = express.Router();
const Tweet = require("../Models/tweets");

router.route("/")
.delete(function (req, res){

  console.log("tweetId", req.body._id);

  Tweet.findByIdAndRemove(req.body._id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Successfully deleted tweet");
    }
  })


});

module.exports = router;
