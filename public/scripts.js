const login = document.getElementById('login');
const chat = document.getElementById('chat');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');
const roomList = document.getElementById('roomList');
const newRoomInput = document.getElementById('newRoomInput');
const createRoomButton = document.getElementById('createRoomButton');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');

let username = '';
let currentRoom = '';
let socket = null;

loginButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        login.style.display = 'none';
        chat.style.display = 'flex';
        connectWebSocket();
    }
});

createRoomButton.addEventListener('click', () => {
    const newRoom = newRoomInput.value.trim();
    if (newRoom) {
        socket.emit('createRoom', newRoom);
        newRoomInput.value = '';
    }
});

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { room: currentRoom, message, username });
        messageInput.value = '';
    }
});

roomList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentRoom = e.target.textContent;
        joinRoom(currentRoom);
    }
});

function connectWebSocket() {
    socket = io('http://localhost:3000');
    socket.emit('login', username);

    socket.on('updateRooms', (rooms) => {
        roomList.innerHTML = '';
        rooms.forEach(room => {
            const li = document.createElement('li');
            li.textContent = room;
            roomList.appendChild(li);
        });
    });

    socket.on('message', (data) => {
        const { message, username, timestamp } = data;
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<strong>${username}</strong>: ${message}<span>${new Date(timestamp).toLocaleTimeString()}</span>`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    });

    socket.on('joinRoom', (room) => {
        currentRoom = room;
        messages.innerHTML = '';
    });
}

function joinRoom(room) {
    socket.emit('joinRoom', room);
}
