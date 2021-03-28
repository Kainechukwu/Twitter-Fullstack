const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("User", userSchema);
