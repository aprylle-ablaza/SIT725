const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
let username = '';
while (!username) {
  username = prompt('Enter your username:').trim();
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('chat message', {
      user: username,
      text: input.value.trim()
    });
    input.value = '';
  }
});
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = `${msg.user}: ${msg.text}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});