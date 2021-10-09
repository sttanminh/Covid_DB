const express = require('express')
const path = require('path');
const { server } = require('./service.js')
if (process.env.NODE_ENV === "production") {
  server.use('/',
    express.static('./client/build')
  );
  server.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'/client/public','index.html'))
  })
  }
const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}`)
})