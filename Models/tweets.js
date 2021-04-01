const mongoose = require("mongoose");

const year = new Date().getFullYear();

const tweetSchema = new mongoose.Schema({

  user_id: String,
  tweet: String,
  time: String
});


module.exports = mongoose.model("Tweet", tweetSchema);
