const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    condition: {
      type: String,
      required: true,
      enum: ["emergency", "urgent", "anytime"],
    },
    blood_group: {
      type: String,
      required: true,
      enum: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    },
    problem_name: {
      type: String,
      required: true,
      enum: ["blood", "kidney", "eyes", "liver", "pancreas", "heart", "lung"],
    },
    problem_status: {
      type: Boolean,
      required: false,
      default: false,
    },
    problem_description: {
      type: String,
      required: true,
      minlength: 120,
    },
    contact_number: {
      type: String,
      required: true,
    },
    occur_date: {
      type: Date,
      required: true,
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", postSchema);
