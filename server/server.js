"use strict";

const express = require('express')
const bodyParser = require('body-parser')
const {red} = require('chalk')
const app = express()
const path = require("path")

const port = process.env.PORT || 3000
app.set('port', port)

////////middlewares///////////
app.use(express.static('client'))


app.use((req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html').replace("server/", ""))
});


app.listen(port, () => {
  console.log("server started on port 3000");
})
