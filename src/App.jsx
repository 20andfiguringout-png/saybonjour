import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Quizzes from './pages/Quizzes'
import StudyTools from './pages/StudyTools'
import Culture from './pages/Culture'
import Media from './pages/Media.jsx'
import MemoryBoosters from './pages/MemoryBoosters.jsx'
import FranceMap from './pages/FranceMap.jsx'
import Worksheets from './pages/Worksheets.jsx'
import PhraseOfTheDay from './pages/PhraseOfTheDay.jsx'
import Favorites from './pages/Favorites.jsx'
import Admin from './pages/Admin'
import Conjugate from './pages/Conjugate'
import Grammar from './pages/Grammar'
import Vocabulary from './pages/Vocabulary'
import Progress from './pages/Progress'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-cream-50">
            <Navbar />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/study-tools" element={<StudyTools />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/media" element={<Media />} />
                <Route path="/memory-boosters" element={<MemoryBoosters />} />
                <Route path="/france-map" element={<FranceMap />} />
                <Route path="/worksheets" element={<Worksheets />} />
                <Route path="/phrase-of-the-day" element={<PhraseOfTheDay />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/conjugate" element={<Conjugate />} />
                <Route path="/grammar" element={<Grammar />} />
                <Route path="/vocabulary" element={<Vocabulary />} />
                <Route path="/progress" element={<Progress />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
