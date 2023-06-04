const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: false,
    },

    interestedIn: {
      type: String,
      required: false,
    },

    interests: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
