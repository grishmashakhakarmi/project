const {haversine}  = require('../helpers/haversine');
const User = require("../models/user");
const Near = require("../models/near");

const addToNearSchema = (postIdCoordinate) => {
  postIdCoordinate = {"id": postIdCoordinate._id,"coordinate": postIdCoordinate.coordinates, "authorId": postIdCoordinate.authorId}
  User.find({}, (err, users) => {
    // Iterate and save user id and coordinates to list
    let userIdCoordinates = []
    users.forEach((user) => {
      //exclude the author who posted
      if(String(user._id) !== String(postIdCoordinate.authorId)){
        userIdCoordinates.push({id:user._id, coordinate: user.coordinates})

      }
    });


    // Calculate user distance with post distance and save to list
    let uidPidDistance = new Map()
    for(let {id, coordinate} of userIdCoordinates){
      let d = haversine(postIdCoordinate.coordinate, coordinate)
      uidPidDistance.set(id, [postIdCoordinate.id, d])
    }

    // save userid, postid, calculated distance to near schema
    for(let [key, value] of uidPidDistance){
      let near = new Near({
        "userid": key,
        "postid": value[0],
        "distance": value[1],

      })
      near.save()
    }


  })
}



module.exports = {
  addToNearSchema,
}
