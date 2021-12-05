const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const messagesListContainer = document.querySelector('#messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = '';
  return false;
});

const appendNewMessage = (message) => {
  const newMessageElement = document.createElement('li');
  newMessageElement.innerText = message;
  messagesListContainer.appendChild(newMessageElement);
}

socket.on('clientMessage', appendNewMessage);
