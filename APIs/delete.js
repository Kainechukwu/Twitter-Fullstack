const express = require("express");
const router = express.Router();
const Tweet = require("../Models/tweets");

router.route("/")
.post(function (req, res){

  console.log(req.body._id);

  Tweet.findByIdAndRemove(req.body._id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted tweet");
    }
  })


});

module.exports = router;
