# 🚀 Getting Started - MindMate

Quick setup guide to get MindMate running.

## Prerequisites

- Node.js v16+ 
- npm or yarn
- MongoDB (local or Atlas)

## Installation

### 1. Frontend Setup

```bash
cd gentle-mood-friend-main
npm install
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Configure Environment

Create `.env` file in root:
```
VITE_API_URL=http://localhost:5000/api
```

Create `.env` in server folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindmate
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Running

### Terminal 1 - Frontend

```bash
cd gentle-mood-friend-main
npm run dev
```

Runs on: http://localhost:5173

### Terminal 2 - Backend

```bash
cd server
npm run dev
```

Runs on: http://localhost:5000

## First Steps

1. **Open App**
   - Visit http://localhost:5173

2. **Create Account**
   - Click "Sign Up"
   - Enter email, password, name
   - Click "Create Account"

3. **Automatic Login**
   - You'll be logged in automatically
   - Redirected to dashboard

4. **Use Dashboard**
   - Log your mood
   - Access tools
   - Write journal entries
   - View history

5. **Profile Settings**
   - Click ⚙️ (Settings) button
   - Update name, preferences
   - Change password if needed

6. **Logout**
   - Click ↗️ (Logout) button
   - Return to login page

## Building for Production

### Frontend

```bash
npm run build
npm run preview
```

### Backend

```bash
cd server
npm run build
npm start
```

## Troubleshooting

**Port Already in Use**
```bash
# Change port in .env
PORT=5001
```

**MongoDB Connection Error**
```bash
# Ensure MongoDB is running
# Or use MongoDB Atlas connection string
```

**API Not Connecting**
- Check VITE_API_URL in .env
- Ensure backend is running on correct port
- Check browser DevTools Network tab

## Next Steps

- Read [DOCUMENTATION.md](./DOCUMENTATION.md) for full docs
- Check [USER_GUIDE.md](./USER_GUIDE.md) for features
- See [API_REFERENCE.md](./API_REFERENCE.md) for endpoints

## Need Help?

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

---

**Ready to start?** Open two terminals and run both servers!
