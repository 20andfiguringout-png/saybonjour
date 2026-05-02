# SayBonjour! — Feature Summary & Implementation

## Platform Overview
**SayBonjour!** is an interactive French learning platform built with React 18 + Vite (frontend, port 5000) and Express.js + SQLite (backend, port 3001). The color scheme is burgundy (#800020), cream (#fffcef), and gold (#fcd34d).

---

## All Features

### 1. Home Page (`/`)
- Hero section with animated entrance and French flag accents
- Feature overview cards linking to all major sections
- "Phrase of the Day" preview widget
- Quick-access navigation tiles (Quizzes, Study Tools, Culture, etc.)
- SEO meta tags via react-helmet-async

---

### 2. Content & Resources (`/resources`)
- Admin-created article sections fetched from the Express API (`GET /api/articles`)
- Sidebar navigation with expandable sections and article list
- Rich-text article rendering (Markdown-style HTML) with styled tables, blockquotes, code blocks
- Bookmark integration — save any article to Favorites
- Fallback to demo data if the API is unavailable
- **Implementation:** `src/pages/Resources.jsx`, `backend/routes/articles.js`, `backend/data/articles.json`

---

### 3. Quizzes (`/quizzes`)
- Multiple quiz categories with difficulty filters
- Multiple-choice and true/false question formats
- Score tracking with pass/fail feedback
- XP awarded on completion
- **Implementation:** `src/pages/Quizzes.jsx`, backend quiz API

---

### 4. Study Tools (`/study-tools`)
- **Flashcards tab:** Flip-card UI with front/back, category filters, keyboard shortcuts
- **Bookmarks tab:** Saved phrases, articles, and cultural notes
- FlashcardButton component used across the platform to add cards from any page
- BookmarkButton component used across the platform
- **Implementation:** `src/pages/StudyTools.jsx`, `src/components/FlashcardButton.jsx`, `src/components/BookmarkButton.jsx`

---

### 5. French Verb Conjugator (`/conjugate`)
- Live search with dropdown suggestions across 25 common verbs
- Popular verbs quick-select bar (avoir, être, aller, faire, pouvoir, etc.)
- All 8 tenses displayed in collapsible panels:
  - Présent, Passé Composé, Imparfait, Futur Simple
  - Conditionnel Présent, Subjonctif Présent, Impératif, Passé Simple
- Irregular forms flagged with a star (★) marker
- Verb group badge (irregular, -er, -ir, -re, etc.)
- Frequency ranking badge (#1 most common, etc.)
- Usage notes for each verb
- Expand all / Collapse all controls
- Browse all 25 verbs at the bottom
- SEO optimized with per-page meta tags
- **Implementation:** `src/pages/Conjugate.jsx`, `src/data/conjugations.js`
- **Verbs covered:** avoir, être, aller, faire, pouvoir, vouloir, savoir, connaître, parler, manger, venir, prendre, dire, voir, finir, attendre, mettre, partir, lire, écrire, croire, donner, penser, trouver, devoir

---

### 6. Grammar Hub A1–C2 (`/grammar`)
- Full CEFR coverage across 6 levels: A1 Beginner → C2 Mastery
- Sticky tab bar for instant level switching
- Each level shows a description card and topic count
- **14 grammar topics** across all levels:

| Level | Topics |
|-------|--------|
| A1 | Gender & Articles, Present Tense Regular Verbs, Basic Negation |
| A2 | Passé Composé, Imparfait, Adjective Agreement & Placement |
| B1 | Subjunctive Introduction, Relative Pronouns (qui/que/dont/où) |
| B2 | Subjunctive Advanced Usage, Passive Voice |
| C1 | Literary Tenses (Passé Simple & Subjonctif Imparfait) |
| C2 | Register & Stylistic Variation (familier/courant/soutenu) |

- Each topic card expands to reveal:
  - Explanatory text and bullet-point rules
  - Formatted tables (conjugation, comparison, example)
  - Colour-coded examples (French + English translation)
  - **Built-in quick quiz** (3 MCQ per topic) with instant feedback and XP award
- Previous / Next level navigation at page bottom
- XP awarded: 10 XP per correct quiz answer
- **Implementation:** `src/pages/Grammar.jsx`, `src/data/grammarData.js`

---

### 7. Vocabulary SRS (`/vocabulary`)
- **SM-2 Spaced Repetition Algorithm** — calculates optimal review interval for each card based on response quality
- Three tabs: Browse, My Deck, Review

**Browse tab:**
- 4 curated word lists (85 words total):
  - Top 50 Essentials (articles, conjunctions, prepositions, adverbs)
  - Common Nouns (daily life nouns with articles)
  - Essential Adjectives (the 15 most important adjectives, m/f forms)
  - Travel Phrases (questions, restaurant, transport vocabulary)
- Add/remove words from personal deck with one click
- Category badge on each word card

**My Deck tab:**
- Shows all cards currently in the deck
- Displays next review date and repetition count
- "Mastered" badge for cards with 3+ successful reviews
- One-click remove
- "Review due" button with count badge

**Review tab:**
- Shows only cards due today (based on SM-2 schedule)
- Flip card: shows French → tap → reveals English
- Rating buttons: Again (0), Hard (1), Good (2), Easy (3)
- SM-2 updates interval and ease factor after each rating
- Progress bar during session
- Session complete screen with total XP earned
- XP rates: Easy=10, Good=7, Hard=3, Again=1

- **Persistence:** All deck data stored in localStorage (`saybonjour_srs`)
- **Implementation:** `src/pages/Vocabulary.jsx`, `src/utils/srs.js`

---

### 8. Progress Dashboard (`/progress`)
- **XP & Level system:** 500 XP per level, animated progress bar
- **Daily Streak:** 7-day visual calendar, streak increments on any daily activity
- **Weekly XP chart:** Animated bar chart showing XP earned each day this week
- **Stats grid:** Day streak, words learned, quizzes done, badges earned
- **CEFR level map:** Visual A1→C2 path showing current position with completed levels ticked
- **Badge system (11 badges):**

| Badge | Requirement |
|-------|-------------|
| 🌱 First Word | Learn 1 word |
| 📚 Vocabulary Builder | Learn 10 words |
| 📖 Word Collector | Learn 50 words |
| 🎓 Century Scholar | Learn 100 words |
| 🔥 3-Day Streak | 3 consecutive days |
| ⚡ Week Warrior | 7-day streak |
| 💎 Monthly Master | 30-day streak |
| 🧠 Quiz Taker | Complete 1 quiz |
| 🏆 Quiz Champion | Complete 10 quizzes |
| ⭐ XP Earner | Earn 100 XP |
| 🌟 XP Master | Earn 1000 XP |

- Live updates via `progressUpdated` custom DOM event
- **Persistence:** All data stored in localStorage (`saybonjour_progress`)
- **Implementation:** `src/pages/Progress.jsx`, `src/utils/progress.js`

---

### 9. Cultural Insights (`/culture`)
- Content for France, Quebec, and Belgium French
- Cultural articles with translation toggle
- Bookmark integration
- **Implementation:** `src/pages/Culture.jsx`

---

### 10. Interactive France Map (`/france-map`)
- Clickable French regions
- Regional facts, vocabulary, and cultural notes
- **Implementation:** `src/pages/FranceMap.jsx`

---

### 11. French in Media (`/media`)
- Curated films, TV shows, music, and podcasts for French learning
- Difficulty level tags
- **Implementation:** `src/pages/Media.jsx`

---

### 12. Memory Boosters (`/memory-boosters`)
- Cognates between English and French
- Common idioms with explanations
- Mnemonic tips
- **Implementation:** `src/pages/MemoryBoosters.jsx`

---

### 13. Worksheets (`/worksheets`)
- Downloadable PDF practice sheets by level
- **Implementation:** `src/pages/Worksheets.jsx`

---

### 14. Phrase of the Day (`/phrase-of-the-day`)
- Daily French phrase fetched from backend API
- Pronunciation guide and usage context
- Bookmark integration
- **Implementation:** `src/pages/PhraseOfTheDay.jsx`, `backend/routes/phrases.js`

---

### 15. Favorites (`/favorites`)
- Aggregated bookmarks from all sections (articles, phrases, flashcards)
- Remove individual items or clear all
- **Implementation:** `src/pages/Favorites.jsx`, `src/utils/favorites.js`

---

### 16. Admin Panel (`/admin`)
- JWT-authenticated admin login (PBKDF2 hashed passwords)
- Create, edit, delete articles and sections
- Rich-text editor with formatting toolbar
- Manage phrase sections and daily phrases
- CSRF protection on all write operations
- **Credentials:** username `admin`, password `admin123`
- **Implementation:** `src/pages/Admin.jsx`, `backend/routes/auth.js`, `backend/routes/admin.js`

---

## Technical Utilities

### `src/utils/srs.js` — SM-2 Spaced Repetition
- `calculateNextReview(card, quality)` — SM-2 algorithm, returns new interval/easeFactor/repetitions
- `getSRSDeck()` / `saveSRSDeck()` — localStorage persistence
- `addWordToSRS(word)` / `removeFromSRS(id)` — deck management
- `updateCardAfterReview(cardId, quality)` — applies SM-2 and saves
- `getDueCards()` — filters deck to cards with `nextReview <= now`

### `src/utils/progress.js` — XP & Gamification
- `getProgress()` / `saveProgress()` — localStorage persistence, fires `progressUpdated` event
- `addXP(amount)` — adds XP, updates level (every 500 XP), updates streak, checks badges
- `recordWordLearned()` / `recordQuiz()` / `recordLessonRead()` — activity helpers
- `checkBadges(progress)` — evaluates and unlocks badges automatically
- `getAllBadges()` — returns full badge catalogue
- `getXPForNextLevel(level)` — returns XP threshold for the next level

### `src/utils/favorites.js` — Bookmarks
- Saves/loads bookmarks per category from localStorage

---

## Navigation Structure

```
SayBonjour!
├── Home
├── Quizzes
├── Learn ▾
│   ├── Verb Conjugator  (/conjugate)
│   ├── Grammar A1–C2    (/grammar)
│   ├── Vocabulary SRS   (/vocabulary)
│   └── Study Tools      (/study-tools)
├── Resources ▾
│   ├── Core Learning
│   │   └── Content & Resources
│   ├── Quick Access
│   │   ├── Phrase of the Day
│   │   ├── Memory Boosters
│   │   └── Worksheets
│   └── Culture & Media
│       ├── Cultural Insights
│       ├── Interactive France Map
│       └── French in Media
├── Progress  🔥 (streak badge)
└── Favorites ♥ (count badge)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 4, Tailwind CSS 3 |
| Routing | react-router-dom v6 |
| Animations | Framer Motion |
| Icons | Lucide React |
| SEO | react-helmet-async |
| HTTP client | Axios |
| Backend | Express.js (Node.js) |
| Database | SQLite (better-sqlite3) |
| Auth | JWT + CSRF tokens |
| Security | Helmet, rate limiting, express-validator |
| Persistence (client) | localStorage |
| SRS Algorithm | SM-2 (SuperMemo 2) |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `burgundy-600` | `#800020` | Primary brand, headers, buttons |
| `cream-50` | `#fffcef` | Page backgrounds, cards |
| `gold-300` | `#fcd34d` | Accents, streak badges, XP |
| `burgundy-800` | `#4d0013` | Dark text, headings |
| `cream-200` | `#fffaeb` | Borders, subtle backgrounds |
