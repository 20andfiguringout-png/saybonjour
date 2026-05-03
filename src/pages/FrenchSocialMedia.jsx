import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Hash } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SOCIAL_VOCAB = [
  { fr: 'les réseaux sociaux', en: 'social media / social networks' },
  { fr: 'une publication / un post', en: 'a post' },
  { fr: 'partager', en: 'to share' },
  { fr: 'liker / mettre un j\'aime', en: 'to like', note: '"Liker" is the informal French version; "mettre un j\'aime" is more formal' },
  { fr: 'commenter', en: 'to comment' },
  { fr: 'suivre', en: 'to follow' },
  { fr: 'un abonné / une abonnée', en: 'a follower / subscriber' },
  { fr: 's\'abonner', en: 'to subscribe / to follow' },
  { fr: 'se désabonner', en: 'to unsubscribe / unfollow' },
  { fr: 'un hashtag / un mot-dièse', en: 'a hashtag', note: '"Mot-dièse" is the official French term but "hashtag" is universally used' },
  { fr: 'un influenceur / une influenceuse', en: 'an influencer' },
  { fr: 'un story / une story', en: 'a story (Instagram/WhatsApp)', note: 'Borrowed from English — feminine is gaining ground' },
  { fr: 'une vidéo en direct', en: 'a live video / livestream' },
  { fr: 'un profil', en: 'a profile' },
  { fr: 'une bio(graphie)', en: 'a bio' },
  { fr: 'la messagerie instantanée', en: 'instant messaging' },
  { fr: 'un message privé (MP)', en: 'a private message (DM)', note: 'Also "DM" is used informally' },
  { fr: 'le cyberharcèlement', en: 'cyberbullying' },
  { fr: 'une fake news', en: 'fake news', note: 'Officially "infox" in French but "fake news" is widely used' },
  { fr: 'viral / devenir viral', en: 'viral / to go viral' },
]

const TEXT_ABBREV = [
  { abbr: 'MDR', full: 'Mort De Rire', en: 'LOL (Lit. dying of laughter)' },
  { abbr: 'PTDR', full: 'Pété De Rire', en: 'ROFL (Lit. bursting with laughter)' },
  { abbr: 'PK', full: 'Pourquoi', en: 'Why' },
  { abbr: 'STP', full: 'S\'il Te Plaît', en: 'Please (informal)' },
  { abbr: 'SVP', full: 'S\'il Vous Plaît', en: 'Please (formal)' },
  { abbr: 'OKLM', full: 'Au Calme (verlan)', en: 'Chill / relaxed', note: 'Verlan slang — reversed "calme"' },
  { abbr: 'ASV', full: 'Âge, Sexe, Ville', en: 'Age, sex, location (old chat)' },
  { abbr: 'TBM', full: 'Trop Bien', en: 'So good / great' },
  { abbr: 'WESH', full: 'Wesh (from Arabic)', en: 'Hey / yo (informal greeting)' },
  { abbr: 'LGTM', full: 'Ça me va', en: 'LGTM (looks good to me)' },
  { abbr: 'TLM', full: 'Tout Le Monde', en: 'Everyone / everybody' },
  { abbr: 'JSP', full: 'Je Sais Pas', en: 'IDK (I don\'t know)' },
  { abbr: 'JTM', full: 'Je T\'aime', en: 'I love you' },
  { abbr: 'MSG', full: 'Message', en: 'Message' },
]

const INTERNET_CULTURE = [
  { title: 'French YouTube & Streaming', desc: 'French YouTubers (Youtubeurs) are hugely popular — Norman fait des vidéos, Cyprien, Squeezie have millions of subscribers. Netflix France produces original French content.' },
  { title: 'Verlan on social media', desc: '"Verlan" (French back-slang: "à l\'envers" → "verlan") is common online: "ouf" (fou), "zarbi" (bizarre), "meuf" (femme), "laisse tomber" → "laisse béton".' },
  { title: 'The French "lol" equivalent', desc: '"MDR" (Mort De Rire) is the French equivalent of "LOL" and is used universally in French text and social media. "Hihi" or "héhé" are also used for mild amusement.' },
  { title: 'Digital French etiquette', desc: 'French professionals still maintain formality in emails (even to colleagues). But WhatsApp groups and social media are very informal — tu, abbreviations, and emoji are standard.' },
]

export default function FrenchSocialMedia() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Social Media & Internet Language | SayBonjour!" description="French social media vocabulary, text abbreviations, internet slang, and digital culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Social Media & Internet French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le français numérique — vocabulary, text abbreviations, and internet culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Social Media Vocab' }, { id: 'abbrev', label: 'Text Abbreviations' }, { id: 'culture', label: 'Internet Culture' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {SOCIAL_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'abbrev' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {TEXT_ABBREV.map((item, i) => (
              <motion.div key={item.abbr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{item.abbr}</span>
                  <span className="text-xs text-gray-400">= {item.full}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.en}</p>
                {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{item.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {INTERNET_CULTURE.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{note.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
