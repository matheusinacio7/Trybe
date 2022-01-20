/* Importando o pacote NET, responsável pela implementação dos sockets no Node. */
const net = require('net');
let clientCounter = 0;

let connections = [];

/* Criando o servidor com o método 'createServer', onde recebe uma conexao na qual são expostos os eventos que podemos manipular no nosso servidor. */
const server = net.createServer((connection) => {
  const clientId = clientCounter++;
  console.log(`Cliente de id ${clientId} conectado`);
  connections.push(connection);

  /* Assim como um evento normal do Node.js, o método ".on()" escuta um evento em específico e, quando ele é ativado, nossa função de callback é chamada. */
  connection.on('end', () => {
    console.log(`Cliente de id ${clientId} desconectado`);
  });

  connection.on('data', (data) => {
    console.log(`Client ${clientId}: ${data.toString()}`);
    connections.forEach((conn) => {
      conn.write(data);
    });
    // mds ainda bem que temos o socket.io
  });
  /* Nessa conexão que foi aberta, podemos fazer várias coisas. Uma delas é escrever/devolver uma mensagem para o cliente. */
  // connection.write('Mensagem do servidor!\r\n');
  // connection.pipe(connection);
});

/* Após termos programado o servidor, é só colocá-lo de pé */
server.listen(8080, () => {
  console.log('Servidor escutando na porta 8080');
});
