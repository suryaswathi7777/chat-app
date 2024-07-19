# Real-Time Chat Application

## Description
This project is a real-time chat application that allows users to join chat rooms, exchange messages in real-time, and have a smooth and interactive chat experience.

## Technologies
- HTML
- CSS
- JavaScript
- Node.js
- Socket.io

## Features
- User authentication with username selection
- Real-time communication using WebSockets
- Chat room creation and management
- Sending and receiving messages with timestamps

## Setup Instructions
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/chat-app.git
    cd chat-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the server:**
    ```bash
    node server.js
    ```

4. **Open the application:**
    - Open your web browser and navigate to `http://localhost:3000`.

## Usage
1. **Enter your username** on the login screen and click "Join Chat".
2. **Create a new chat room** by entering a room name and clicking "Create Room".
3. **Join an existing chat room** by clicking on the room name in the list.
4. **Send messages** by typing in the message input field and clicking "Send".

## Additional Considerations
- The application ensures unique usernames to prevent impersonation.
- Messages are displayed in real-time without the need to refresh the page.
- Users can create new chat rooms and join existing ones seamlessly.
