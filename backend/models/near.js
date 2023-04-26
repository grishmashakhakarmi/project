const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const NearSchema = new mongoose.Schema(
  {
    userid: {
      type: ObjectId,
      ref: "User",
    },
    postid: {
      type: ObjectId,
      ref: "Post"
    },
    distance: {
      type: Number
    }
  },
);

module.exports = mongoose.model("Near", NearSchema);
