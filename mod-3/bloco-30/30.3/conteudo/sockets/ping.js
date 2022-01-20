module.exports = (io) => io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);
  socket.emit('ola', 'Que bom que você chegou aqui! Fica mais um cadin, vai ter bolo :)');

  socket.on('ping', () => {
    console.log(`Ping! ID: ${socket.id}`);
    io.emit('pong', `${socket.id} enviou um ping!`);
  });
});
