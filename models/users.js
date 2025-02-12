const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin : {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;