const express = require('express');
const { use } = require('express/lib/application');
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

const users = []

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({userId, socketId});
};

const removeUser = (socketId) =>{
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


io.on('connection', (socket) => {
  console.log(`El Usuario ${socket.id} Se Ha Connectado`)
 
   socket.on('userid', function(userId) {
     addUser(userId, socket.id);
     io.emit('getUsers', users);
     console.log(`Soy el Usuario con el ID ${userId} y Mi Socket Id Es ${socket.id}`)
     console.log(users);
   });
  

  socket.on('chat:message', ({senderId, receiverId, message, username}) =>{
    const user = getUser(receiverId);
   
   io.to(user).emit('chat:messge', {
     senderId,
     username,
     message
   })
   console.log(data)
  })

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data)
    
  })
})






