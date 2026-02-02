# Project Cleanup & Organization Plan

## Files to Keep (Core Application)

### Root Level
- `.env` - Environment variables
- `.gitignore` - Git ignore
- `package.json` - Dependencies
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript config
- `vite.config.ts` - Vite config
- `vitest.config.ts` - Vitest config
- `tailwind.config.ts` - Tailwind config
- `postcss.config.js` - PostCSS config
- `eslint.config.js` - ESLint config
- `components.json` - UI components config
- `index.html` - Main HTML
- `src/` - Source code
- `server/` - Backend
- `public/` - Public assets

### Documentation (Core)
- `README.md` - Main project readme

---

## Files to Archive/Remove (Documentation - Can be consolidated)

### Old/Duplicate Documentation Files (in root)
- `CLEANUP_COMPLETE.md` - Old cleanup summary
- `AUTHENTICATION_SYSTEM.md` - Detailed but comprehensive
- `API_REFERENCE.md` - Detailed API docs
- `DASHBOARD_FLOW.md` - User flow docs
- `DASHBOARD_CHANGES.md` - Change summary
- `USER_CONTROLS_GUIDE.md` - User guide
- `SYSTEM_IMPLEMENTATION.md` - System overview
- `ARCHITECTURE_DIAGRAM.md` - Architecture diagrams
- `IMPLEMENTATION_COMPLETE.md` - Completion status

### Solution
- Create `docs/` folder
- Move all documentation there
- Create one main `DOCUMENTATION.md` in docs/
- Update root README to reference docs/

---

## Folders to Organize

### src/
- ✅ App.tsx
- ✅ main.tsx
- ✅ vite-env.d.ts
- ✅ index.css
- components/ - UI and feature components
- pages/ - Page components
- contexts/ - React context
- hooks/ - Custom hooks
- types/ - TypeScript types
- lib/ - Utilities
- services/ - API services
- test/ - Tests
- constants/ - Constants
- utils/ - Utility functions

---

## Cleanup Steps

1. Create `docs/` folder
2. Move all .md files to docs/
3. Create consolidated DOCUMENTATION.md
4. Update root README.md with quick links
5. Organize and verify structure
6. Delete dist/ (build output)

---

## File Organization After Cleanup

```
gentle-mood-friend-main/
├── README.md (main readme with quick links)
├── QUICK_START.md (in docs/)
│
├── docs/
│   ├── DOCUMENTATION.md (main documentation index)
│   ├── GETTING_STARTED.md
│   ├── ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   ├── AUTHENTICATION.md
│   ├── USER_GUIDE.md
│   └── TROUBLESHOOTING.md
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── index.css
│   │
│   ├── components/
│   │   ├── (UI components)
│   │   ├── ProtectedRoute.tsx
│   │   └── ui/ (shadcn components)
│   │
│   ├── pages/
│   │   ├── Index.tsx (home/dashboard)
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── Profile.tsx
│   │   ├── Dashboard.tsx (stats dashboard)
│   │   └── NotFound.tsx
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── types/
│   │   └── mood.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── services/
│   │   └── (API services if any)
│   │
│   ├── constants/
│   │   └── (constants)
│   │
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   │
│   └── utils/
│       └── (utility functions)
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── public/
│   └── robots.txt
│
├── Configuration files
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── vitest.config.ts
│   ├── components.json
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── index.html
│
└── .git/
```

---

## Status: READY TO EXECUTE

This cleanup will:
- ✅ Organize documentation
- ✅ Keep all important files
- ✅ Create clear folder structure
- ✅ Make project easier to navigate
- ✅ Maintain functionality
- ✅ No breaking changes
