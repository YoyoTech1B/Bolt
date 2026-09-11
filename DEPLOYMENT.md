# Bolt - Lightning Messenger Deployment Guide

## Quick Start - Free Cloud Deployment

Your Bolt messenger is ready to deploy for FREE! Choose your platform:

### Option 1: Deploy to Render (Recommended - Easiest)

1. Go to https://render.com and sign up (free, no credit card)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (YoyoTech1B/Bolt)
4. Fill in:
   - **Name**: bolt-messenger
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://yoyoblue30_db_user:P13PfewjuE1Xyap@cluster0.evcxtxz.mongodb.net/bolt?retryWrites=true&w=majority`
   - `JWT_SECRET`: `bolt_secret_key_2026`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your Render URL (e.g., `https://bolt-messenger.onrender.com`)
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. Your Bolt messenger will be live! ⚡

### Option 2: Deploy to Glitch

1. Go to https://glitch.com
2. Click "New Project" → "Import from GitHub"
3. Enter: `YoyoTech1B/Bolt`
4. Add the same environment variables in `.env`
5. Project auto-deploys!

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose YoyoTech1B/Bolt
5. Add environment variables
6. Deploy!

## Features

✅ User Authentication (Login/Register)
✅ Real-time Messaging with Socket.IO
✅ One-to-One Chats
✅ Group Chats
✅ Typing Indicators
✅ Read Receipts
✅ Online/Offline Status
✅ Lightning Theme UI

## API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/chats` - Get chats
- `GET /api/messages/chat/:chatId` - Get messages
- `POST /api/messages` - Send message
- `GET /api/health` - Check server status

## Need Help?

The app automatically:
- Detects your server URL
- Connects frontend to backend
- Serves all files from one URL

Just deploy and it works! 🚀

---

⚡ **Bolt - Lightning Messenger** ⚡
