# SayBonjour! - French Learning Platform

## Overview
An interactive French learning platform called "SayBonjour!" with a React/Vite frontend and Express.js backend. Includes user accounts, dark mode, daily challenges, mini-games, reading comprehension, skill assessment onboarding, rank tiers, XP multipliers, and a full learning suite with Phase 1 and Phase 2 features.

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
- **Security**: Helmet, rate limiting, input validation, PBKDF2 password hashing (10,000 iterations, `user_salt_v1`)
- **Logging**: Morgan

### Data Storage
- JSON files for articles, quizzes, sections: `backend/data/`
- SQLite DB: `phrases`, `phrase_sections`, `users` tables

## Key Files
- `vite.config.js` - Vite config with proxy to backend at localhost:3001
- `backend/server.js` - Express server; user routes added at line ~941
- `src/App.jsx` - Main React app: ThemeProvider → AuthProvider → UserProvider → Router
- `src/context/ThemeContext.jsx` - Dark mode toggle; persists to localStorage; adds `dark` class to `<html>`
- `src/context/UserContext.jsx` - Regular user auth (separate from admin AuthContext)
- `src/context/AuthContext.jsx` - Admin-only JWT auth (unchanged)
- `src/utils/progress.js` - XP, streaks, levels, badges, rank tiers, XP multipliers, daily login reward
- `src/utils/srs.js` - SM-2 spaced repetition algorithm

## Pages (28 routes)

### Core
- `/` - Home (hero, features, animated background)
- `/login` - User login
- `/signup` - User registration
- `/profile` - User profile, stats, badges, edit form
- `/onboarding` - 3-step skill assessment (goal → daily time → 8-question CEFR quiz)
- `/progress` - Learning Dashboard (XP bar, heatmap, skill breakdown, rank, badges)
- `/favorites` - Saved favorites
- `*` - 404 Not Found page

### Learn
- `/grammar` - Grammar Hub A1–C2 (CEFR structured, dark-mode quizzes)
- `/vocabulary` - SRS Vocabulary Builder (SM-2 spaced repetition)
- `/conjugate` - Verb Conjugation tool (25 verbs, 8 tenses)
- `/study-tools` - Flashcards and bookmarks
- `/reading` - Reading comprehension passages A1–B2
- `/daily-challenges` - 3 daily challenges (vocab sprint, grammar quiz, translation)
- `/stories` - Interactive choose-your-path French stories
- `/sentence-builder` - Arrange words & fill-in-blank exercises
- `/word-match` - Timed word matching mini-game
- `/typing-race` - Type French translations fast
- `/business-french` - Professional vocabulary, phrases, dialogues, quiz
- `/slang-french` - Street French, verlan, informal register, quiz

### Resources
- `/resources` - Articles and learning content
- `/quizzes` - Interactive quizzes (fetched from backend)
- `/culture` - French culture and customs
- `/media` - Movies, music, TV show recommendations
- `/memory-boosters` - Cognates, idioms, mnemonics
- `/france-map` - Interactive map of French regions
- `/worksheets` - Downloadable practice sheets
- `/phrase-of-the-day` - Daily French phrase

### Admin
- `/admin` - Admin panel (requires admin login via `Authorization: Bearer` header)

## Feature Modules

### User Accounts (`/api/users/*`)
- `POST /api/users/register` — creates account, returns JWT (30d)
- `POST /api/users/login` — validates credentials, returns JWT (30d)
- `GET /api/users/profile` — authenticated via `X-User-Token` header
- `PUT /api/users/profile` — update name, goal, cefr_level, daily_goal_mins

### Progress & XP (`src/utils/progress.js`)
- `addXP(amount, reason)` — adds XP with streak multiplier, updates skillXP, weeklyXP, dailyXP
- `getXPMultiplier(streak)` — returns 1x / 2x (streak≥3) / 3x (streak≥7)
- `SKILL_MAP` — maps reason strings to skill categories (reading, grammar, vocabulary, games, challenges, stories)
- `claimDailyLoginReward()` — +10 XP once per calendar day

### Rank Tiers
- Bronze: 0–499 XP
- Silver: 500–1499 XP
- Gold: 1500–2999 XP
- Platinum: 3000–5999 XP
- Diamond: 6000+ XP

### Dark Mode
- ThemeContext toggles `dark` class on `document.documentElement`
- All pages and components have full dark mode CSS coverage

### Navbar
- Closes all dropdowns + mobile menu on route change
- Learn dropdown (4 sections): Language Tools, Practice, Mini Games, Specialist French
- Resources dropdown (3 sections): Core Learning, Quick Access, Culture & Media
- User avatar menu (logged in) or Login/Signup buttons

## Data Files
- `src/data/conjugations.js` — 25 verbs, 8 tenses
- `src/data/grammarData.js` — A1–C2 grammar curriculum with quizzes
- `src/data/readingData.js` — 5 French passages (A1×2, A2, B1, B2) with questions
- `src/data/sentenceData.js` — 12 arrange exercises + 8 fill-in-blank exercises
- `src/data/businessData.js` — Business vocabulary, phrases, dialogues, quiz
- `src/data/slangData.js` — Slang expressions, verlan, formal vs informal, quiz
- `src/data/storyData.js` — 2 interactive branching stories

## Environment Variables
- `PORT` — Backend port (default 3001)
- `NODE_ENV` — Environment
- `JWT_SECRET` — Admin JWT secret (auto-generated if not set)
- `USER_JWT_SECRET` — User JWT secret (auto-generated if not set)
- `ADMIN_USERNAME` — Admin login username
- `ADMIN_PASSWORD_HASH` — PBKDF2 hashed admin password

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

## PWA
- `public/site.webmanifest` — PWA manifest (name, icons, theme colour)
- `index.html` references favicon.svg, site.webmanifest, apple-touch-icon

## Known Constraints
- No public/ folder was present initially; created for site.webmanifest
- favicon files (favicon.svg, favicon-32x32.png, etc.) referenced in index.html — add actual files for full PWA support
- APK/mobile: Capacitor is the recommended path to wrap this as an Android APK; requires Android Studio (not available in Replit sandbox)
