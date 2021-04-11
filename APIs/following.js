const express = require("express");
const router = express.Router();
const Following = require("../Models/following");

router.route("/")
.post(function (req, res){

  console.log(req.body.user_id, req.body.following_id);

  const following = new Following({
    user_id: req.body.user_id,
    following_id: req.body.following_id
  });

  following.save(function (err) {
    if(err) {
      console.log(err);
    }
  })


});

module.exports = router;
