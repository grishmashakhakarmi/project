const Post = require("../models/post");
const Near = require("../models/near");
// const jwt = require('jsonwebtoken');

let io;

exports.socketConnection = (server) => {
    io = require("socket.io")(server, {
	cors: {
	    origin: "http://localhost:3000",
	    methods: ["GET", "POST", "PUT", "DELETE"],
	    credentials: true,
	},
    });
    //   io.use(async (socket, next) => {
    // try{
    //   const token = socket.handshake.auth.token;
    //   const payload = await jwt.verify(token, process.env.JWT_SECRET);
    //   socket.id = payload._id
    //   socket.iat = payload.iat
    //   next();
    // }catch(error){
    //     next(new Error("invalid JWT"));
    //     console.log("socket authentication error", error);
    // }
    //   })

    io.on("connection", async (socket) => {
	Post.find({}, (err, docs) => {
	    socket.emit("list posts", docs);
	});
	Post.watch().on("change", (data) => {
	    newPost = data.fullDocument;
	    socket.emit("post.read", {
		_id: newPost._id,
		condition: newPost.condition,
		blood_group: newPost.blood_group,
		problem_name: newPost.problem_name,
		problem_description: newPost.problem_description,
		contact_number: newPost.contact_number,
		occur_date: newPost.occur_date,
		coordinates: newPost.coordinates,
		problem_status: newPost.problem_status,
	    });
	});
	// Near.watch().on("change", (data) => {	
	Near.watch([{$match : {operationType: {$in: ["insert"]}}}]).on("change", (data) => {
	    const {userid, postid, distance} = data.fullDocument
	    if(distance <= 100){
		socket.emit("near.pop", {
		    userid,
		    distance,
		    postid,
		})
	    }
	})


	
	return io;
    });
};
