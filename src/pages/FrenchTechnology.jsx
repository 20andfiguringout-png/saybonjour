import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Wifi, Smartphone } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const TECH_SECTIONS = [
  {
    category: 'Devices & Hardware — Les appareils',
    items: [
      { fr: 'un ordinateur', en: 'a computer' },
      { fr: 'un ordinateur portable', en: 'a laptop' },
      { fr: 'une tablette', en: 'a tablet' },
      { fr: 'un smartphone / un téléphone portable', en: 'a smartphone / mobile phone' },
      { fr: 'un écran', en: 'a screen / monitor' },
      { fr: 'un clavier', en: 'a keyboard' },
      { fr: 'une souris', en: 'a mouse' },
      { fr: 'une imprimante', en: 'a printer' },
      { fr: 'une clé USB', en: 'a USB stick' },
      { fr: 'un disque dur', en: 'a hard drive' },
      { fr: 'un casque', en: 'headphones / headset' },
      { fr: 'une enceinte connectée', en: 'a smart speaker' },
    ],
  },
  {
    category: 'Internet & Social Media — Internet et réseaux sociaux',
    items: [
      { fr: 'Internet / le net', en: 'the internet' },
      { fr: 'le Wi-Fi', en: 'Wi-Fi', note: 'Pronounced "wee-fee" in French' },
      { fr: 'un mot de passe', en: 'a password' },
      { fr: 'un identifiant', en: 'a username / login' },
      { fr: 'un compte', en: 'an account' },
      { fr: 'se connecter', en: 'to log in / connect' },
      { fr: 'se déconnecter', en: 'to log out' },
      { fr: 'télécharger', en: 'to download', note: 'Also: "uploader" / "mettre en ligne" for upload' },
      { fr: 'envoyer', en: 'to send' },
      { fr: 'partager', en: 'to share' },
      { fr: 'une publication / un post', en: 'a post', note: '"Poster" is used informally' },
      { fr: 'un hashtag', en: 'a hashtag', note: 'Pronounced "hashtag" in French too' },
      { fr: 'un like / un j\'aime', en: 'a like', note: 'Official French: "un j\'aime"; informal: "un like"' },
      { fr: 'les réseaux sociaux', en: 'social media / social networks' },
      { fr: 'un influenceur / une influenceuse', en: 'an influencer' },
      { fr: 'un abonné', en: 'a subscriber / follower' },
    ],
  },
  {
    category: 'Software & Digital — Logiciels et numérique',
    items: [
      { fr: 'un logiciel', en: 'software / a program' },
      { fr: 'une application (une appli)', en: 'an app / application' },
      { fr: 'mettre à jour', en: 'to update' },
      { fr: 'une mise à jour', en: 'an update' },
      { fr: 'un bug', en: 'a bug', note: 'Same word used in French tech' },
      { fr: 'planter / crasher', en: 'to crash', note: 'Both used in informal French' },
      { fr: 'sauvegarder', en: 'to save / back up' },
      { fr: 'copier-coller', en: 'copy-paste', note: 'Sometimes "copier/coller"' },
      { fr: 'le nuage / le cloud', en: 'the cloud', note: 'Official French: "l\'informatique en nuage"' },
      { fr: 'une intelligence artificielle (IA)', en: 'artificial intelligence (AI)' },
      { fr: 'un algorithme', en: 'an algorithm' },
      { fr: 'les données', en: 'data', note: '"Les données personnelles" = personal data' },
    ],
  },
  {
    category: 'Tech French Culture — La France numérique',
    items: [
      { fr: 'la French Tech', en: 'France\'s tech startup ecosystem', note: 'Government-backed initiative to grow French startups' },
      { fr: 'Station F', en: 'world\'s largest startup campus (Paris)', note: 'Opened 2017 in a former railway station' },
      { fr: 'Doctolib', en: 'France\'s leading medical appointment app', note: 'The French NHS equivalent for booking appointments' },
      { fr: 'BlaBlaCar', en: 'French ride-sharing giant', note: 'Founded 2006 — now in 22 countries' },
      { fr: 'Criteo', en: 'French digital advertising tech company' },
      { fr: 'le droit à l\'oubli', en: 'the right to be forgotten', note: 'EU GDPR concept strongly advocated by France' },
      { fr: 'la Commission Nationale de l\'Informatique et des Libertés (CNIL)', en: 'France\'s data protection authority' },
    ],
  },
]

const TECH_PHRASES = [
  { fr: 'Mon téléphone n\'a plus de batterie.', en: 'My phone has run out of battery.' },
  { fr: 'Est-ce que tu as le code Wi-Fi ?', en: 'Do you have the Wi-Fi password?' },
  { fr: 'L\'application a planté.', en: 'The app has crashed.' },
  { fr: 'Il faut mettre à jour le logiciel.', en: 'The software needs to be updated.' },
  { fr: 'J\'ai perdu ma connexion.', en: 'I\'ve lost my connection.' },
  { fr: 'Peux-tu me taguer dans ta photo ?', en: 'Can you tag me in your photo?' },
  { fr: 'Je vais mettre ça dans le cloud.', en: 'I\'ll put that in the cloud.' },
  { fr: 'C\'est en mode hors ligne.', en: 'It\'s in offline mode.' },
  { fr: 'Il faut redémarrer l\'ordinateur.', en: 'The computer needs to be restarted.' },
]

export default function FrenchTechnology() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Technology Vocabulary | SayBonjour!" description="Learn French technology vocabulary — devices, internet, social media, software, and French tech culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Technology</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La technologie en français — devices, internet, and the French tech scene</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {TECH_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{TECH_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {TECH_SECTIONS[activeCategory].items.map(item => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {TECH_PHRASES.map((phrase, i) => (
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
