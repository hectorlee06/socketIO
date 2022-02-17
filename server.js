const express = require('express');
const app = express();
const path = require('path')

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, ()=>{
  console.log(`Listening on ${port}`)
});

//WEB SOCKET
const SocketIO = require('socket.io');
const io = SocketIO(server);


io.on('connection', (socket) => {
  console.log(`new connection ` , socket.id)

  socket.on('chat:message', (data) =>{
   io.sockets.emit('chat:message', data)
  })

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data)
  })
})









  
  
