const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  seen: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model("Notification", notificationSchema);
