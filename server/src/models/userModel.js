import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { defaultImagePath } from "../secret.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    maxlength: [31, "username must be within 31 characters"],
    minlength: [3, "username must be more than 3 characters"], // Fixed typo: minlength
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      // Fixed: removed 'function' keyword to use clean ES6 arrow syntax
      validator: (v) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      }, // Fixed: added missing comma here
      message: "please enter a valid email",
    },
  },
  password : {
    type: String,
    required: [true, "passsword is required"],
    minlength: [6, "password must be more than 6 characters"],
    set : (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
  },
  image : {
    type: String,
    default: defaultImagePath
  },
  address : {
    type: String,
    required: [true, "passsword is required"]
  },
  phone : {
    type: String,
    required: [true, "phone number must be required"]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const User = model("Users", userSchema);
export {User};