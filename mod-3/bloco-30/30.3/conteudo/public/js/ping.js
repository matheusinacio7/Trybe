const socket = window.io();

const createMessageElement = (content) => {
  const newMessageElement = document.createElement('li');
  newMessageElement.textContent = content;
  return newMessageElement;
}

const serverMessagesListContainer = document.getElementById('server-messages');

const appendNewMessageToList = (textContent) => {
  serverMessagesListContainer.appendChild(createMessageElement(textContent));
}

function ping() {
  socket.emit('ping');
}

const pingButton = document.getElementById('emit-ping');
pingButton.addEventListener('click', ping);

socket.on('ola', appendNewMessageToList);
socket.on('pong', appendNewMessageToList);
