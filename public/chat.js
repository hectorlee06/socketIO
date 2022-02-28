

const socket = io ();
let userId = document.getElementById('userid');
let btnId = document.getElementById('user-id')
let massage = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


btnId.addEventListener('click', function (e) {
  
  socket.emit('userid',  userId.value)
  console.log(`Soy el Usuario con el Id ${userId.value} y Mi socket Id Es ${socket.id}`);
  
});

 
btn.addEventListener('click', function (e) {
  
  
  socket.emit('chat:message',{
    senderId: userId,
    receiverId,
    massage: massage.value,
    username: username.value,
    })  
});

 

massage.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});



socket.on('chat:message', function (data) {
   actions.innerHTML = '';
  output.innerHTML +=`<p>
    <strong>${data.username}</strong>: ${data.massage}
   </p>`
})

socket.on('chat:typing', function (data) {
  actions.innerHTML +=`<p><em>${data} is typing a Message</em></p>`
  
})


