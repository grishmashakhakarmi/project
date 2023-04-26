const User = require("../models/user");
const {haversine}  = require('../helpers/haversine');

exports.updateUser = (req, res) => {
  User.findById(req.params.userId).exec((err, data) => {
    if (err || !data) {
      return res.status(403).json({ error: "User doesnt exists" });
    }
    if (data._id.toString() !== req.auth._id) {
      // raise error if user id doesnt match with authenticated user id
      return res.status(403).json({ error: "User Unauthenticated" });
    }
    // update user details here
    User.findOneAndUpdate(
      { _id: req.auth._id },
      { $set: req.body },
      { new: true },
      function (err, doc) {
        doc.password_hash = undefined // make password_hash undefined for response
        if (err) return res.status(500).send({ error: err });
        return res
          .status(200)
          .send({ success: "Succesfully updated your profile", doc : doc });
      }
    );
  });
};

exports.getUserData = (req, res) => {
  User.findById(req.params.userId).exec((err, data) => {
    if (err || !data) {
      return res.status(403).json({ error: "User doesnt exists" });
    }
    if (data._id.toString() !== req.auth._id) {
      return res.status(403).json({ error: "User Unauthenticated" });
    }
    return res.json({lngLat: data.coordinates, verified: data.is_verified });
  });
};

exports.getNearByUserList = async (req, res) => {
    // get all the users in the nearby location
    const currentUserId = req.params.userId;
    let currentUserLoc = [0,0]
    let nearByUsers = []
    
    await User.find({}, (err, users) => {
	users.forEach((user) => {
	    if(currentUserId === String(user._id)){
		currentUserLoc = user.coordinates
	    }
	    
	})
	
	users.forEach((user) => {
	    // calculate haversine between current user location with users
	    if(currentUserId != String(user._id)){
		let d = haversine(currentUserLoc, user.coordinates)
		if(d <= 50){
		    nearByUsers.push({distance: d, fullName: user.full_name, email: user.email, bloodGroup: user.blood_group })
		}
	
	    }
	})
	
    }).clone()
    return res.status(200).json(nearByUsers);
}
