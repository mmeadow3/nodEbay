"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const {red} = require('chalk');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require("path");
const routes = require('./routes');
const {connect} = require("./db/database");
const fs = require('fs');
const { Server } = require('http');
const socketio = require('socket.io');
const app = express();
const server = Server(app)
const io = socketio(server);


////////////may add passport here later for other forms of Auth////////////

const port = process.env.PORT || 3000
app.set('port', port)

////////middlewares///////////
////////////these are serving files to the client side////////////


app.use(express.static('client'))
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

/////////redis connection//////////
app.use(session({
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'nodebaySecret'
}))
////////////////////////////////////////
app.use(bodyParser.json());


app.use(routes);
//////////404 path/////////////////////
app.use('/api', (req, res) => {
  res.status(404).send({message: 'Not found'});
});

app.use((req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
});

// Error handling middleware
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {

    if (process.env.NODE_ENV === 'production') {
      res.sendStatus(err.status || 500)
    } else {
      res.set('Content-Type', 'text/plain').send(err.stack)
    }

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)
// image storage///
var imgPath = '/path/to/some/img.png';
//////////////////////////
connect()
  .then(() => {
    server.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)


//////socket logic/////////////
 let users = 0;

 io.on('connection', function (socket) {
   ///////on connection add a user
   users++
 socket.emit("user",
 {
   userNumber: users
 });
 //////getting data back from client ////////
 socket.on('bid', (bidData) => {
   socket.broadcast.emit("bid", {bid: bidData})
   console.log(bidData);
 })

 socket.on("disconnect", function() {
   users--
 })
});



//////time logic from Rob Dodson /////https://robdodson.me////////
// var countdown = 30;
//   setInterval(function() {
//     countdown--;
//     io.emit('timer', { countdown: countdown });
//   }, 1000);
