const mongoose = require("mongoose");
const constants = require("../config/constants");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    maxLength: 150,
  },
  mobile_no: {
    type: Number,
    trim: true,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  address2: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  pin_code: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: [
      constants.CONST_DB_STATUS_ACTIVE,
      constants.CONST_DB_STATUS_INACTIVE,
    ],
    default: constants.CONST_DB_STATUS_ACTIVE,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports=mongoose.model("User",UserSchema)