module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('serverMessage', 'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');
  socket.broadcast.emit('serverMessage', `Iiiiiirraaaa! ${socket.id} acabou de se conectar :D`);

  socket.on('clientMessage', (message) => {
    console.log(`Mensagem: ${message}`);
    io.emit('clientMessage', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
  });
});
