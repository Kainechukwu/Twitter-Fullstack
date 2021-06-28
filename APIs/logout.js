const express = require("express");
const router = express.Router();

router.route("/")
.get(function(req, res){
  console.log(req);
  req.logout();
  res.redirect("/");
  // res.status(200).send
});

module.exports = router;
