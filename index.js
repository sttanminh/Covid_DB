const express = require('express')
const path = require('path');
const { server } = require('./service.js')
if (process.env.NODE_ENV === "production") {
  server.use('/',
    express.static((__dirname, 'client/build'))
  );
  server.get('/*',(req,res)=>{
    res.sendFile(path.join('./client/build','index.html'))
  })
  }
const port = process.env.PORT || 9000;
server.listen(port)