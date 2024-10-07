const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lasttName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  userID: {
    type: String,
    required: [true, "User ID is required"],
    unique: true,
    trim: true,
  },
  departemnet: {
    type: String,
    required: [true, "Departemnet is required"],
    trim: true,
  },
  passWord: { type: String, required: true },
  position: { type: String },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["adminIT", "itTechnician", "superUsers", "root"],
  },
  shift: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  configured: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("passWord")) return next();
  this.passWord = await bcrypt.hash(this.passWord, 12);
  next();
});

// this part to safely create a user from request body

userSchema.statics.createFromRequestBody = function (body) {
  const allowedFields = [
    "firstName",
    "lasttName",
    "userID",
    "departemnet",
    "passWord",
    "position",
    "role",
    "shift",
  ];
  const userData = allowedFields.reduce((obj, field) => {
    if (body[field] !== undefined) {
      obj[field] = body[field];
    }
    return obj;
  }, {});
  return new this(userData);
};

const User = mongoose.model("users", userSchema);
module.exports = User;
