class BoltMessenger {
  constructor() {
    this.token = localStorage.getItem('token');
    this.currentUser = null;
    this.currentChat = null;
    this.chats = [];
    this.socket = null;
    
    // Auto-detect API URL
    const protocol = window.location.protocol;
    const host = window.location.host;
    this.apiUrl = `${protocol}//${host}/api`;
    
    console.log('API URL:', this.apiUrl);
    this.init();
  }

  async init() {
    if (this.token) {
      await this.loadUserData();
      this.renderMainApp();
      this.connectSocket();
    } else {
      this.renderAuthScreen();
    }
  }

  async loadUserData() {
    try {
      const response = await fetch(`${this.apiUrl}/users/profile/me`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      this.currentUser = await response.json();
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }

  connectSocket() {
    // Auto-detect socket URL
    const socketUrl = `${window.location.protocol}//${window.location.host}`;
    this.socket = io(socketUrl, {
      auth: { token: this.token }
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socket.emit('userJoined', this.currentUser._id);
    });

    this.socket.on('newMessage', (message) => {
      this.onNewMessage(message);
    });

    this.socket.on('userTyping', (data) => {
      this.showTypingIndicator(data);
    });
  }

  renderAuthScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="auth-container">
        <div class="auth-form">
          <h1>⚡ Bolt</h1>
          <div id="auth-content"></div>
        </div>
      </div>
    `;
    this.showLoginForm();
  }

  showLoginForm() {
    const authContent = document.getElementById('auth-content');
    authContent.innerHTML = `
      <form id="login-form">
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="password" required>
        </div>
        <button type="submit" class="auth-btn">Login</button>
        <div class="toggle-auth">
          Don't have an account? <a onclick="messenger.showRegisterForm()">Sign Up</a>
        </div>
      </form>
    `;

    document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
  }

  showRegisterForm() {
    const authContent = document.getElementById('auth-content');
    authContent.innerHTML = `
      <form id="register-form">
        <div class="form-group">
          <label>Username</label>
          <input type="text" id="username" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="password" required>
        </div>
        <button type="submit" class="auth-btn">Sign Up</button>
        <div class="toggle-auth">
          Already have an account? <a onclick="messenger.showLoginForm()">Login</a>
        </div>
      </form>
    `;

    document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        this.token = data.token;
        this.currentUser = data.user;
        this.renderMainApp();
        this.connectSocket();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${this.apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        this.token = data.token;
        this.currentUser = data.user;
        this.renderMainApp();
        this.connectSocket();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration failed');
    }
  }

  renderMainApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container">
        <div class="sidebar">
          <div class="header">
            <h1>⚡ Bolt</h1>
            <div class="header-icons">
              <button class="icon-btn" onclick="messenger.newChat()">+</button>
              <button class="icon-btn" onclick="messenger.logout()">🚪</button>
            </div>
          </div>
          <div class="search-container">
            <input type="text" class="search-input" placeholder="Search chats..." id="search-input">
          </div>
          <div class="chat-list" id="chat-list"></div>
        </div>
        <div class="chat-window">
          <div id="chat-content"></div>
        </div>
      </div>
    `;

    this.loadChats();
    document.getElementById('search-input').addEventListener('input', (e) => this.searchChats(e.target.value));
  }

  async loadChats() {
    try {
      const response = await fetch(`${this.apiUrl}/chats`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      this.chats = await response.json();
      this.renderChatList();
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  }

  renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = '';

    this.chats.forEach(chat => {
      const chatName = chat.isGroupChat ? chat.groupName : chat.participants.find(p => p._id !== this.currentUser.id)?.username;
      const chatItem = document.createElement('div');
      chatItem.className = `chat-item ${this.currentChat?.id === chat._id ? 'active' : ''}`;
      chatItem.innerHTML = `
        <div class="avatar ${chat.participants.some(p => p.isOnline) ? 'online' : ''}">${chatName.charAt(0).toUpperCase()}</div>
        <div class="chat-info">
          <div class="chat-name">${chatName}</div>
          <div class="chat-preview">${chat.lastMessage?.content || 'No messages yet'}</div>
        </div>
      `;
      chatItem.addEventListener('click', () => this.openChat(chat));
      chatList.appendChild(chatItem);
    });
  }

  openChat(chat) {
    this.currentChat = chat;
    this.loadMessages();
    this.renderChatList();
    this.socket?.emit('joinChat', chat._id);
  }

  async loadMessages() {
    try {
      const response = await fetch(`${this.apiUrl}/messages/chat/${this.currentChat._id}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const messages = await response.json();
      this.renderChatWindow(messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }

  renderChatWindow(messages) {
    const chatContent = document.getElementById('chat-content');
    const chatName = this.currentChat.isGroupChat ? this.currentChat.groupName : 
                     this.currentChat.participants.find(p => p._id !== this.currentUser.id)?.username;

    chatContent.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <h2>${chatName}</h2>
          <p>Online</p>
        </div>
      </div>
      <div class="messages-container" id="messages"></div>
      <div class="input-area">
        <div class="input-field">
          <input type="text" class="message-input" id="message-input" placeholder="Type a message...">
        </div>
        <button class="send-btn" onclick="messenger.sendMessage()">⚡ Send</button>
      </div>
    `;

    const messagesDiv = document.getElementById('messages');
    if (messages.length === 0) {
      messagesDiv.innerHTML = '<div class="empty-state"><p>No messages yet</p><small>Start the conversation!</small></div>';
    } else {
      messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender._id === this.currentUser.id ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
          <div class="message-bubble ${msg.sender._id === this.currentUser.id ? 'sent' : 'received'}">
            ${msg.content}
            <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        `;
        messagesDiv.appendChild(messageDiv);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    document.getElementById('message-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  async sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();

    if (!content) return;

    try {
      const response = await fetch(`${this.apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          chatId: this.currentChat._id,
          content
        })
      });

      const message = await response.json();
      input.value = '';
      this.socket?.emit('sendMessage', { chatId: this.currentChat._id, message });
      this.loadMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  onNewMessage(message) {
    if (this.currentChat && message.chatId === this.currentChat._id) {
      this.loadMessages();
    }
    this.loadChats();
  }

  showTypingIndicator(data) {
    const messagesDiv = document.getElementById('messages');
    if (messagesDiv) {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'message received';
      typingDiv.innerHTML = `<div class="message-bubble received">${data.username} is typing...</div>`;
      messagesDiv.appendChild(typingDiv);
    }
  }

  searchChats(query) {
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
      const chatName = item.querySelector('.chat-name').textContent;
      item.style.display = chatName.toLowerCase().includes(query.toLowerCase()) ? 'flex' : 'none';
    });
  }

  newChat() {
    alert('Feature coming soon: Start a new chat!');
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.currentUser = null;
    this.socket?.disconnect();
    this.init();
  }
}

// Initialize app
const messenger = new BoltMessenger();
