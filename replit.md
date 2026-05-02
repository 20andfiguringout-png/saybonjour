# SayBonjour! - French Learning Platform

## Overview
An interactive French learning platform called "SayBonjour!" with a React/Vite frontend and Express.js backend. Includes lessons, quizzes, cultural content, phrase of the day, memory boosters, study tools, and an admin panel.

## Architecture

### Frontend
- **Framework**: React 18 + Vite 4
- **Port**: 5000 (dev server on 0.0.0.0)
- **Routing**: react-router-dom v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: react-helmet-async

### Backend
- **Framework**: Express.js
- **Port**: 3001 (localhost)
- **Database**: SQLite via better-sqlite3 (file: `backend/french_learning.db`)
- **Auth**: JWT tokens with CSRF protection
- **Security**: Helmet, rate limiting, input validation (express-validator)
- **Logging**: Morgan

### Data Storage
- JSON files for articles, quizzes, sections: `backend/data/`
- SQLite DB for phrases and phrase sections: `backend/french_learning.db`

## Key Files
- `vite.config.js` - Vite config with proxy to backend at localhost:3001
- `backend/server.js` - Express server with all API routes
- `backend/seo-utils.js` - SEO sitemap/robots.txt generation
- `src/App.jsx` - Main React app with all routes
- `src/context/AuthContext.jsx` - Authentication context

## Pages
- `/` - Home
- `/resources` - Articles/learning resources
- `/quizzes` - Interactive quizzes
- `/study-tools` - Study tools
- `/culture` - French culture content
- `/media` - Media content
- `/memory-boosters` - Memory exercises
- `/france-map` - Interactive France map
- `/worksheets` - Downloadable worksheets
- `/phrase-of-the-day` - Daily French phrase
- `/favorites` - Saved favorites
- `/admin` - Admin panel (requires login)

## Environment Variables (all in "shared" environment)
- `PORT` - Backend port (3001)
- `NODE_ENV` - Environment (development)
- `JWT_SECRET` - JWT signing secret
- `ADMIN_USERNAME` - Admin login username (admin)
- `ADMIN_PASSWORD_HASH` - PBKDF2 hashed admin password (default: admin123)

## Development
- Run both frontend and backend: `npm run dev:full`
- Frontend only: `npm run dev`
- Backend only: `npm run server`
- Admin setup: `npm run setup-admin`

## Workflow
- **Start application**: `npm run dev:full` on port 5000 (webview)

## Deployment
- Target: VM (needed for SQLite file persistence)
- Build: `npm run build`
- Run: `bash -c "node backend/server.js & npx vite preview --host 0.0.0.0 --port 5000"`
