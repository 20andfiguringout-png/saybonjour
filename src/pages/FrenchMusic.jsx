import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Play } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const MUSIC_VOCAB = [
  {
    category: 'Music Vocabulary — Le vocabulaire de la musique',
    items: [
      { fr: 'une chanson', en: 'a song' },
      { fr: 'un morceau', en: 'a piece / track' },
      { fr: 'un album', en: 'an album' },
      { fr: 'un concert', en: 'a concert' },
      { fr: 'un festival', en: 'a festival' },
      { fr: 'un chanteur / une chanteuse', en: 'a singer' },
      { fr: 'un musicien / une musicienne', en: 'a musician' },
      { fr: 'un groupe', en: 'a band / group' },
      { fr: 'un orchestre', en: 'an orchestra' },
      { fr: 'la mélodie', en: 'the melody' },
      { fr: 'le rythme', en: 'the rhythm' },
      { fr: 'les paroles', en: 'the lyrics' },
      { fr: 'la voix', en: 'the voice' },
      { fr: 'le refrain', en: 'the chorus / refrain' },
      { fr: 'le couplet', en: 'the verse' },
      { fr: 'le pont', en: 'the bridge (song section)' },
    ],
  },
  {
    category: 'Instruments — Les instruments',
    items: [
      { fr: 'le piano', en: 'piano' },
      { fr: 'la guitare', en: 'guitar' },
      { fr: 'la guitare électrique', en: 'electric guitar' },
      { fr: 'la basse', en: 'bass guitar' },
      { fr: 'la batterie', en: 'drum kit', note: '"Un batteur" = a drummer' },
      { fr: 'le violon', en: 'violin' },
      { fr: 'le violoncelle', en: 'cello' },
      { fr: 'la flûte', en: 'flute' },
      { fr: 'la trompette', en: 'trumpet' },
      { fr: 'le saxophone', en: 'saxophone', note: 'Invented by Belgian-French instrument maker Adolphe Sax in 1840' },
      { fr: 'l\'accordéon', en: 'accordion', note: 'The emblematic sound of traditional French music (musette)' },
      { fr: 'les percussions', en: 'percussion' },
      { fr: 'le synthétiseur', en: 'synthesiser' },
    ],
  },
  {
    category: 'Genres — Les genres musicaux',
    items: [
      { fr: 'la chanson française', en: 'French chanson (song)', note: 'A rich tradition of storytelling through song' },
      { fr: 'le jazz', en: 'jazz', note: 'Paris was a refuge for African-American jazz musicians in the 1920s–30s' },
      { fr: 'la musette', en: 'French café accordion music', note: 'The sound of Parisian accordion dance halls' },
      { fr: 'le classique', en: 'classical music' },
      { fr: 'le rock', en: 'rock' },
      { fr: 'la pop', en: 'pop' },
      { fr: 'le rap / le hip-hop', en: 'rap / hip-hop', note: 'France has the second-largest hip-hop scene in the world' },
      { fr: 'l\'électro / la musique électronique', en: 'electronic music', note: 'Daft Punk, Justice, Air — France excels here' },
      { fr: 'le R&B', en: 'R&B', note: 'Pronounced "r-n-b" in French' },
      { fr: 'la musique du monde', en: 'world music', note: 'Heavily influenced by North African (raï, gnawa) traditions' },
    ],
  },
]

const FRENCH_ARTISTS = [
  { name: 'Édith Piaf', era: '1940s–60s', genre: 'Chanson française', emoji: '🌹', known: '"Non, je ne regrette rien", "La Vie en rose" — the voice of France.' },
  { name: 'Serge Gainsbourg', era: '1960s–80s', genre: 'Chanson / Pop', emoji: '🚬', known: 'Provocateur, poet, pop star. "Je t\'aime moi non plus", "La Marseillaise" reggae version.' },
  { name: 'Jacques Brel', era: '1950s–70s', genre: 'Chanson belge-française', emoji: '🎭', known: '"Ne me quitte pas" — emotional intensity unmatched. Belgian but central to French song culture.' },
  { name: 'Daft Punk', era: '1993–2021', genre: 'French house / Électro', emoji: '🤖', known: '"Around the World", "Get Lucky". Defined French electronic music globally.' },
  { name: 'Christine and the Queens', era: '2008–present', genre: 'Synth-pop', emoji: '👑', known: 'Héloïse Letissier — bilingual art-pop icon redefining French pop internationally.' },
  { name: 'Stromae', era: '2009–present', genre: 'Électro / Pop belge', emoji: '🎤', known: 'Belgian francophone artist. "Alors on danse", "Papaoutai" — global French-language hits.' },
  { name: 'Angèle', era: '2018–present', genre: 'Pop belge', emoji: '⭐', known: 'Belgian French-language pop sensation. Sister of Roméo Elvis. Multiple Victoires de la Musique.' },
  { name: 'Françoise Hardy', era: '1962–2024', genre: 'Yé-yé / Chanson', emoji: '🌷', known: '"Tous les garçons et les filles" — the face of 60s French cool.' },
]

const USEFUL_PHRASES = [
  { fr: 'J\'adore écouter de la musique.', en: 'I love listening to music.' },
  { fr: 'Quel genre de musique tu aimes ?', en: 'What kind of music do you like?' },
  { fr: 'Je joue de la guitare depuis cinq ans.', en: 'I\'ve been playing guitar for five years.' },
  { fr: 'Tu as des billets pour le concert ?', en: 'Do you have tickets for the concert?' },
  { fr: 'Ce groupe est vraiment talentueux.', en: 'This band is really talented.' },
  { fr: 'J\'ai téléchargé leur dernier album.', en: 'I\'ve downloaded their latest album.' },
  { fr: 'La mélodie est vraiment accrocheuse.', en: 'The melody is really catchy.' },
]

export default function FrenchMusic() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Music | SayBonjour!" description="Explore French music vocabulary, genres, and legendary artists — from Piaf to Daft Punk." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Music</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La musique française — vocabulary, genres, and iconic artists</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'artists', label: 'Iconic Artists' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {MUSIC_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{MUSIC_VOCAB[activeCategory].category}</h2>
              <div className="space-y-3">
                {MUSIC_VOCAB[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'artists' && (
          <div className="space-y-4">
            {FRENCH_ARTISTS.map((artist, i) => (
              <motion.div key={artist.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{artist.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{artist.name}</h3>
                    <span className="text-xs text-gray-400">{artist.era}</span>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{artist.genre}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{artist.known}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {USEFUL_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
