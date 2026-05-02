# SayBonjour! - French Learning Platform

## Overview
An interactive French learning platform called "SayBonjour!" with a React/Vite frontend and Express.js backend. Includes user accounts, dark mode, daily challenges, mini-games, reading comprehension, skill assessment onboarding, rank tiers, and a full learning suite.

## Architecture

### Frontend
- **Framework**: React 18 + Vite 4
- **Port**: 5000 (dev server on 0.0.0.0)
- **Routing**: react-router-dom v6
- **Styling**: Tailwind CSS (dark mode via `.dark` class on `<html>`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: react-helmet-async

### Backend
- **Framework**: Express.js
- **Port**: 3001 (localhost)
- **Database**: SQLite via better-sqlite3 (file: `backend/french_learning.db`)
- **Auth**: JWT tokens — separate admin JWT (`Authorization: Bearer`) and user JWT (`X-User-Token`)
- **Security**: Helmet, rate limiting, input validation, PBKDF2 password hashing
- **Logging**: Morgan

### Data Storage
- JSON files for articles, quizzes, sections: `backend/data/`
- SQLite DB: phrases, phrase_sections, **users** tables

## Key Files
- `vite.config.js` - Vite config with proxy to backend at localhost:3001
- `backend/server.js` - Express server; user routes added before error handler (line ~941)
- `src/App.jsx` - Main React app: ThemeProvider → AuthProvider → UserProvider
- `src/context/ThemeContext.jsx` - Dark mode toggle; persists to localStorage; adds `dark` class to `<html>`
- `src/context/UserContext.jsx` - Regular user auth (separate from admin AuthContext)
- `src/context/AuthContext.jsx` - Admin-only JWT auth (unchanged)
- `src/utils/progress.js` - XP, streaks, levels, badges, rank tiers, daily login reward
- `src/utils/srs.js` - SM-2 spaced repetition algorithm

## Pages
- `/` - Home
- `/resources` - Articles/learning resources
- `/quizzes` - Interactive quizzes
- `/study-tools` - Study tools (flashcards, bookmarks)
- `/culture` - French culture content
- `/media` - Media content
- `/memory-boosters` - Memory exercises
- `/france-map` - Interactive France map
- `/worksheets` - Downloadable worksheets
- `/phrase-of-the-day` - Daily French phrase
- `/favorites` - Saved favorites
- `/admin` - Admin panel (requires admin login)
- `/conjugate` - Verb conjugation tool (25 verbs, 8 tenses)
- `/grammar` - Grammar Hub A1–C2 (CEFR structured, quizzes)
- `/vocabulary` - SRS Vocabulary Builder (SM-2 spaced repetition)
- `/progress` - Learning Dashboard (XP, streaks, badges, rank, CEFR level map)
- `/login` - User login page
- `/signup` - User registration page
- `/profile` - User profile with stats, badges, edit form
- `/onboarding` - 3-step skill assessment (goal → daily time → 8-question CEFR quiz)
- `/daily-challenges` - 3 daily challenges (vocab sprint, grammar quiz, translation) — resets at midnight
- `/word-match` - Timed word matching mini-game (6 categories, 60s timer, high scores)
- `/reading` - Reading comprehension passages A1–B2 (5 passages, comprehension questions)

## Feature Modules

### User Accounts (`/api/users/*`)
- `POST /api/users/register` — creates account, returns JWT
- `POST /api/users/login` — validates credentials, returns JWT
- `GET /api/users/profile` — authenticated via `X-User-Token` header
- `PUT /api/users/profile` — update name, goal, cefr_level, daily_goal_mins

### Dark Mode
- CSS already present in `src/index.css` (all `.dark` Tailwind overrides)
- ThemeContext toggles `dark` class on `document.documentElement`
- Moon/Sun toggle button in Navbar (desktop + mobile)

### Rank Tiers (in `src/utils/progress.js`)
- Bronze: 0–499 XP
- Silver: 500–1499 XP
- Gold: 1500–2999 XP
- Platinum: 3000–5999 XP
- Diamond: 6000+ XP

### Daily Login Reward
- `claimDailyLoginReward()` in progress.js; fires once per calendar day
- Shows a toast notification (+10 XP) on app load via `DailyLoginReward` component in App.jsx

## Navigation
- Navbar: Home, Quizzes, Learn dropdown (Verb Conjugator, Grammar, Vocabulary, Study Tools, Reading, Daily Challenges, Word Match), Resources dropdown, Progress (streak badge), Favorites, Dark Mode toggle, Log in / Sign up (or user avatar menu when logged in)

## Data Files
- `src/data/conjugations.js` - 25 verbs, 8 tenses
- `src/data/grammarData.js` - A1–C2 grammar curriculum
- `src/data/readingData.js` - 5 French passages (A1×2, A2, B1, B2) with questions

## Environment Variables
- `PORT` - Backend port (3001)
- `NODE_ENV` - Environment (development)
- `JWT_SECRET` - Admin JWT secret
- `USER_JWT_SECRET` - User JWT secret (auto-generated if not set)
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD_HASH` - PBKDF2 hashed admin password

## Development
- Run both frontend and backend: `npm run dev:full`
- Frontend only: `npm run dev`
- Backend only: `npm run server`

## Workflow
- **Start application**: `npm run dev:full` on port 5000 (webview)

## Deployment
- Target: VM (needed for SQLite file persistence)
- Build: `npm run build`
- Run: `bash -c "node backend/server.js & npx vite preview --host 0.0.0.0 --port 5000"`
