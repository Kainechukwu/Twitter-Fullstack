const mongoose = require("mongoose");

const year = new Date().getFullYear();

const tweetSchema = new mongoose.Schema({

  user_id: String,
  tweet: String,
  tweetImage: String,
  // handle: String
  // ,
  // time : { type : Date, default: Date.now }

  // time: String

}
  , { timestamps: { createdAt: 'created_at' } }
);


module.exports = mongoose.model("Tweet", tweetSchema);
