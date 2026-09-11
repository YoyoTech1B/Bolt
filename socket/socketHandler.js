const socketHandler = (io) => {
  const userSockets = {}; // Map user IDs to socket IDs

  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // User joins
    socket.on('userJoined', (userId) => {
      userSockets[userId] = socket.id;
      io.emit('userStatusChanged', { userId, isOnline: true });
    });

    // Send message
    socket.on('sendMessage', (data) => {
      const { chatId, message } = data;
      io.to(chatId).emit('newMessage', message);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { chatId, userId, username } = data;
      socket.broadcast.to(chatId).emit('userTyping', { userId, username });
    });

    socket.on('stopTyping', (data) => {
      const { chatId } = data;
      socket.broadcast.to(chatId).emit('userStoppedTyping');
    });

    // Join chat room
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('leaveChat', (chatId) => {
      socket.leave(chatId);
    });

    // User disconnects
    socket.on('disconnect', () => {
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          io.emit('userStatusChanged', { userId, isOnline: false });
          break;
        }
      }
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
