const socket = window.io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true});

socket.emit('joinRoom', { username, room });

const messagesListContainer = document.querySelector('#messages');

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  message = inputMessage.value;
  socket.emit('roomClientMessage', { room, message });
  inputMessage.value = '';
  return false;
});

const appendNewMessage = (message) => {
  const newMessageElement = document.createElement('li');
  newMessageElement.innerText = message;
  messagesListContainer.appendChild(newMessageElement);
}

socket.on('clientMessage', appendNewMessage);
socket.on('serverMessage', appendNewMessage);
