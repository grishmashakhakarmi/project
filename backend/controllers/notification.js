const Notification = require("../models/notification");

exports.notificationList = async (req, res) => {
  await Notification.find({user: req.params.userId }, (err, docs) => {
    if (err || !docs) {
      return res.status(403).json({ error: "No notifications" });
    }
    if (docs) {
      res.json(docs);
    }
  }).clone()
};
