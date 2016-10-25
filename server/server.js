"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const {red} = require('chalk');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require("path");
const routes = require('./routes');
const {connect} = require("./db/database");
const app = express();
////////////may add passport here later for other forms of Auth////////////

const port = process.env.PORT || 3000
app.set('port', port)

////////middlewares///////////
////////////these are serving files to the client side////////////
app.use(express.static('../client'))
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
  res.sendFile(path.join(__dirname + '/client/index.html').replace("server/", ""))
});
///////////////////////////////////////
app.use((req, res, next) => {
  console.log("Request made to:", req.url);  ////every request will make this fire
  next() /////this will make the process continue
})


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
//////////////////////////


connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
