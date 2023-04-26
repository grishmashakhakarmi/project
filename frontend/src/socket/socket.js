import io from "socket.io-client";
const SERVER = "http://localhost:8000";


// let jwt;
let socket = io(SERVER, {
    autoConnect:false,
    // auth: {
    // 	token: JSON.parse(localStorage['jwt']).token
    // }
});

if(localStorage['jwt']){
    // jwt = JSON.parse(localStorage['jwt']).token
    socket.connect()
}


socket.on("connect", () => {
    console.log("connected client :)")
})

socket.on("connect_error", () => {
    console.log("connect error :(")
    setTimeout(() => {
	socket.connect();
    }, 1000)})

socket.on("disconnect", () => {
      console.log("socket disconnected :(")
})

export default socket;
