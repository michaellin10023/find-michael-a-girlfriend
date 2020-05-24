const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var socket = require('socket.io');

var server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

var io = socket(server);
io.on('connection', function(){
  console.log('a user connected');
})

io.on('connection', (socket) => {
  socket.on('playEvent', (msg) => {
    console.log('{state: ' + msg.state + ' time: ' + msg.time + '}');
    io.sockets.emit('broadcast',msg);
  });
});

io.on('connection', (socket) => {
  socket.on('pauseEvent', (msg) => {
    console.log('{state: ' + msg.state + ' time: ' + msg.time + '}');
    io.sockets.emit('broadcast',msg);
  });
});

io.on('connection', (socket) =>{
  socket.on('timeEvent', (msg) => {
    console.log('time: ' + msg);
  })
})