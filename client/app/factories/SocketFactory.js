"use strict";

app.factory('SocketFactory', function() {
  const socket = io()


const connect = () => {
   socket.on("connection", function (data){
    console.log(data.userNumber);
  })
}
  ////////this is recieving data from the socket on the server
  socket.on("message", function (data){
    ////this is emmiting data back to the server
    socket.emit('my other event', { my: 'data' });
    //////////////////////////////////////////////
    })







return {connect}
})
