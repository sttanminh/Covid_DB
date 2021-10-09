const { server } = require('./service.js')
if (process.env.NODE_ENV === "production") {
  server.use('/',
    express.static('../build')
  );
  server.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../build','index.html'))
  })
  }
const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}`)
})