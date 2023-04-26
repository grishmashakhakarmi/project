const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    blood_group: {
      type: String,
      required: true,
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
    is_verified: false,
    role: 0,
    password_hash: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

userSchema.set("toJSON", {
  virtuals: true,
});
userSchema.methods = {
  authenticate: function (text) {
    return bcrypt.compareSync(text, this.password_hash);
  },
};
module.exports = mongoose.model("User", userSchema);
