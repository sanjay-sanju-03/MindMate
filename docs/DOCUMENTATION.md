# MindMate - Complete Documentation

## 📚 Documentation Index

This folder contains all comprehensive documentation for the MindMate mental wellness application.

### Quick Links

| Document | Purpose |
|----------|---------|
| [GETTING_STARTED.md](#getting-started) | Setup and first steps |
| [ARCHITECTURE.md](#architecture) | System design and structure |
| [API_REFERENCE.md](#api-reference) | All API endpoints |
| [AUTHENTICATION.md](#authentication) | Auth system details |
| [USER_GUIDE.md](#user-guide) | How to use the app |
| [TROUBLESHOOTING.md](#troubleshooting) | Common issues & fixes |

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Frontend
cd gentle-mood-friend-main
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
```

### First Steps
1. Visit http://localhost:5173
2. Create account or login
3. Start adding moods
4. Access profile settings

See [GETTING_STARTED.md](./GETTING_STARTED.md) for detailed setup.

---

## Architecture

The application consists of:

### Frontend
- **React + TypeScript** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn UI** - Components
- **React Query** - Data fetching
- **Zustand/Context** - State management

### Backend
- **Node.js + Express** - Server
- **MongoDB** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Key Features
- User authentication (signup/login/logout)
- Per-user data isolation
- Mood tracking
- Journal entries
- AI chat support
- Breathing exercises

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete architecture diagram.

---

## API Reference

### Authentication Endpoints
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Mood Endpoints
- `POST /api/moods` - Create mood
- `GET /api/moods` - Get all moods
- `GET /api/moods/stats` - Get mood statistics
- `GET /api/moods/:id` - Get specific mood
- `PUT /api/moods/:id` - Update mood
- `DELETE /api/moods/:id` - Delete mood

### Journal Endpoints
- `POST /api/journal` - Create entry
- `GET /api/journal` - Get all entries
- `GET /api/journal/stats` - Get statistics
- `GET /api/journal/:id` - Get specific entry
- `PUT /api/journal/:id` - Update entry
- `DELETE /api/journal/:id` - Delete entry

See [API_REFERENCE.md](./API_REFERENCE.md) for complete details with examples.

---

## Authentication

### How It Works

1. **User Registration**
   - Email, password, name
   - Password hashed with bcryptjs
   - Account created in database

2. **User Login**
   - Email & password verified
   - JWT token generated (7-day expiry)
   - Token stored in localStorage

3. **API Requests**
   - Token sent in Authorization header
   - Middleware verifies token
   - userId extracted from token
   - Data filtered by userId

4. **Data Isolation**
   - Every mood/journal has userId
   - Queries: `filter({ userId })`
   - Ownership verified on modifications

### Security
- ✅ Passwords hashed (bcryptjs, 10 rounds)
- ✅ JWT tokens (7-day expiry)
- ✅ Bearer token in headers
- ✅ Server-side ownership checks
- ✅ CORS enabled for frontend

See [AUTHENTICATION.md](./AUTHENTICATION.md) for detailed security implementation.

---

## User Guide

### Main Dashboard (`/home`)

After login, users see:
- **Daily Check-In** - Log mood (6 options)
- **Quick Access Cards** - AI chat, breathing, journaling
- **Bottom Navigation** - Tabs for different features
- **User Controls** - Settings (⚙️) and Logout (↗️)

### Profile Management (`/profile`)

Click settings button (⚙️) to:
- Edit name
- Update study level
- Select stress source
- Change password
- View account info

### Features

**Dashboard Tab**
- View mood statistics
- Track mood patterns
- View recent entries
- Access quick actions

**Chat Tab**
- Talk to MindMate AI
- Get support
- Mental health tips

**Tools Tab**
- Breathing exercises
- Grounding techniques
- Stress relief

**Journal Tab**
- Write reflections
- Journal prompts
- Save thoughts

**History Tab**
- View mood history
- Analytics and charts
- Track progress

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed user instructions.

---

## Troubleshooting

### Blank Profile Page
**Problem:** Profile page shows nothing
**Solution:** 
- Check if logged in
- Refresh page
- Clear browser cache
- Check browser console for errors

### Can't Login
**Problem:** Login fails with error
**Solutions:**
- Check email is correct
- Verify password is correct
- Ensure backend is running
- Check .env file is configured

### API Errors
**Problem:** API calls fail
**Solutions:**
- Check backend server is running
- Verify VITE_API_URL in .env
- Check network tab in DevTools
- Look at browser console errors

### Data Not Showing
**Problem:** Moods/journal not displaying
**Solutions:**
- Verify user is authenticated
- Check data was actually saved
- Clear localStorage if corrupted
- Refresh page

### Compilation Errors
**Problem:** TypeScript errors
**Solutions:**
```bash
# Clear cache and rebuild
rm -rf node_modules .next dist
npm install
npm run build
```

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more solutions.

---

## Project Structure

```
gentle-mood-friend-main/
├── docs/                    ← Documentation
├── src/
│   ├── components/          ← React components
│   ├── pages/               ← Page components
│   ├── contexts/            ← Auth context
│   ├── hooks/               ← Custom hooks
│   ├── types/               ← TypeScript types
│   ├── lib/                 ← Utilities
│   └── test/                ← Tests
├── server/
│   ├── controllers/         ← Business logic
│   ├── routes/              ← API routes
│   ├── models/              ← Database models
│   └── middleware/          ← Express middleware
├── public/                  ← Static files
├── configuration files      ← Config files
└── package.json
```

---

## Development

### Commands

```bash
# Frontend development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build
npm run type-check       # Check TypeScript

# Backend development
cd server
npm run dev              # Start dev server
npm run build            # Build
npm start                # Start production

# Testing
npm test                 # Run tests
npm run test:ui          # Test UI
```

### Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## Support

For issues or questions:
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review relevant documentation
3. Check browser console for errors
4. Check server logs

---

## Version Information

- **Frontend:** React 18, TypeScript 5
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Build:** Vite
- **Status:** Production Ready ✅

---

## License

MIT License - Feel free to use and modify

---

**Last Updated:** February 2, 2026
**Status:** Complete and Organized ✅
