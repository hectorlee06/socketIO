

const socket = io ();

let massage = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


btn.addEventListener('click', function () {
  socket.emit('chat:message',{
    massage: massage.value,
    username: username.value,
  } )
  
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
