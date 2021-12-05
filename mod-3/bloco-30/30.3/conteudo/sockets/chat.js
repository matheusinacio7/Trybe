module.exports = (io) => io.on('connection', (socket) => {
  socket.on('clientMessage', (message) => {
    console.log(`Mensagem: ${message}`);
    io.emit('clientMessage', message);
  });
});
