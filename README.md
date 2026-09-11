# ⚡ Bolt - Lightning Messenger

A WhatsApp-like real-time messaging website with a striking lightning theme. Built with Node.js, Express, MongoDB, and Socket.IO.

## Features

### Core Features
- 🔐 **User Authentication** - Secure login and registration with JWT
- 💬 **Real-time Messaging** - Instant message delivery using Socket.IO
- 👥 **One-to-One Chats** - Private messaging between users
- 👨‍👩‍👧‍👦 **Group Chats** - Create and manage group conversations
- 🔔 **Typing Indicators** - See when someone is typing
- 👁️ **Read Receipts** - Track message read status
- 🌐 **Online Status** - Real-time user status indicators
- 🗑️ **Message Management** - Delete and edit messages
- 🔍 **Search Functionality** - Search through chats

### Lightning Theme
- ⚡ Electric yellow and cyan color scheme
- 🌩️ Dark storm background gradient
- ✨ Glowing effects and animations
- ⚙️ Smooth transitions and interactions

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - Interactivity
- **Socket.IO Client** - Real-time updates

## Project Structure

```
Bolt/
├── config/
│   └── database.js           # MongoDB connection
├── models/
│   ├── User.js               # User schema
│   ├── Chat.js               # Chat schema
│   └── Message.js            # Message schema
├── routes/
│   ├── auth.js               # Authentication endpoints
│   ├── users.js              # User endpoints
│   ├── chats.js              # Chat endpoints
│   └── messages.js           # Message endpoints
├── middleware/
│   └── auth.js               # JWT authentication
├── socket/
│   └── socketHandler.js      # Socket.IO event handlers
├── frontend/
│   ├── index.html            # Main HTML file
│   ├── styles.css            # Lightning theme styles
│   └── app.js                # Frontend app logic
├── server.js                 # Main server file
├── package.json              # Dependencies
└── README.md                 # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/YoyoTech1B/Bolt.git
cd Bolt
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bolt
JWT_SECRET=your_super_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

6. **Open the frontend**
- Open `frontend/index.html` in your browser or serve it via a local web server
- Or deploy to a hosting service

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Chats
- `GET /api/chats` - Get all chats for logged-in user
- `POST /api/chats` - Create new one-to-one chat
- `POST /api/chats/group` - Create group chat

### Messages
- `GET /api/messages/chat/:chatId` - Get messages in a chat
- `POST /api/messages` - Send new message
- `PUT /api/messages/:messageId/read` - Mark message as read
- `DELETE /api/messages/:messageId` - Delete message

## Socket.IO Events

### Client → Server
- `userJoined` - User comes online
- `sendMessage` - Send message
- `typing` - User is typing
- `stopTyping` - User stopped typing
- `joinChat` - User joins a chat room
- `leaveChat` - User leaves a chat room

### Server → Client
- `userStatusChanged` - User online/offline status
- `newMessage` - Receive new message
- `userTyping` - User typing indicator
- `userStoppedTyping` - User stopped typing

## Usage

1. **Register/Login**
   - Create a new account or login with existing credentials

2. **Start a Chat**
   - Click the "+" button to start a new chat
   - Select a user or create a group

3. **Send Messages**
   - Type your message in the input field
   - Press Enter or click Send button
   - Message appears instantly for both users

4. **See Online Status**
   - Green dot indicates user is online
   - Last seen time for offline users

5. **Manage Chats**
   - Search chats using the search bar
   - Delete or archive conversations

## Customization

### Change Theme Colors
Edit `frontend/styles.css` to modify the CSS variables:
```css
:root {
  --primary-dark: #0f1419;
  --primary-light: #1a1f2e;
  --accent-yellow: #ffd700;
  --accent-white: #ffffff;
  --accent-blue: #00d4ff;
}
```

### Add Features
Extend the app by:
- Adding file upload support
- Implementing voice/video calls
- Adding emoji support
- Creating user profiles
- Adding message reactions
- Implementing end-to-end encryption

## Future Enhancements

- [ ] Voice and video calling
- [ ] File and media sharing
- [ ] Message search
- [ ] Emoji support
- [ ] Message reactions
- [ ] User blocking
- [ ] Message forwarding
- [ ] Admin controls for group chats
- [ ] End-to-end encryption
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainers.

## Author

Created by **YoyoTech1B**

---

⚡ **Stay Connected with Bolt!** ⚡
