const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connects = require('./config/db');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config();
connects();


/*
 Requires .env file in backend directory having
 PORT: Port number
 API: backend api number
 DATABASE: mongodb connection url
 JWT_SECRET: secret
 EMAIL: email
 PASSWORD: password
 
 */



const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notification");

const app = express();
const http = require('http');
const server = http.createServer(app);
const {socketConnection} = require('./socket/socket.js');
const { connect } = require("http2");
socketConnection(server)



       

// middlewares
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.json());

//routes
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/", notificationRoutes);

//setup nodemailer
// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
// 	user:process.env.EMAIL,
// 	pass:process.env.PASSWORD
//     }
// })
// let mailOptions = {
//     from: "rp813149@gmail.com",
//     to: "rp813149@protonmail.com",
//     subject: "testing and testing",
//     text: "It works"
    
// };

// transporter.sendMail(mailOptions, (err, data) => {
//     if(err){
// 	console.log("cant send email", err)
//     }else{
// 	console.log("email sent")
//     }
    
// })

//port
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
