const mongoose = require("mongoose");
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const year = new Date().getFullYear();

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
    },
    lastName: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"]
    }
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'User email required']
  },
  birthday: {
    month: String,
    day: {
      type: Number,
      min: [1, "invalid day"],
      max: [31, "invalid day"]
    },
    year: {
      type: Number,
      required: [true, "invalid year"],
      max: [Number(`${year - 18}`), "You must be of ages 18 and above"]
    }
  },
  password: String

  // name: {
  //   firstName: String,
  //   lastName: String
  // },
  // email: String,
  // month: String,
  // day: Number,
  // year: Number,
  // password: String

});

userSchema.plugin(passportLocalMongoose, {
  selectFields: "username month day year"
});
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
