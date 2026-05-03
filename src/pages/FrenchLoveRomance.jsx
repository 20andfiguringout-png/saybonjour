import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const LOVE_VOCAB = [
  { fr: 'l\'amour (m)', en: 'love' },
  { fr: 'un coup de foudre', en: 'love at first sight', note: 'Lit. "a lightning bolt" — a very French concept' },
  { fr: 'le petit ami / la petite amie', en: 'boyfriend / girlfriend', note: 'Informal. More formal: le compagnon / la compagne' },
  { fr: 'le fiancé / la fiancée', en: 'fiancé / fiancée' },
  { fr: 'le mari / la femme', en: 'husband / wife' },
  { fr: 'le partenaire / la partenaire', en: 'partner' },
  { fr: 'tomber amoureux/amoureuse de', en: 'to fall in love with' },
  { fr: 'être amoureux/amoureuse de', en: 'to be in love with' },
  { fr: 'flirter', en: 'to flirt' },
  { fr: 'draguer', en: 'to chat someone up', note: 'Colloquial — "se faire draguer" = to be chatted up' },
  { fr: 'sortir avec quelqu\'un', en: 'to go out with someone / to date' },
  { fr: 'se fiancer', en: 'to get engaged' },
  { fr: 'se marier', en: 'to get married' },
  { fr: 'se séparer / rompre', en: 'to separate / to break up' },
  { fr: 'divorcer', en: 'to divorce' },
  { fr: 'le PACS', en: 'civil partnership (pacte civil de solidarité)', note: 'Very popular in France — alternative to marriage for couples' },
]

const LOVE_PHRASES = [
  { fr: 'Je t\'aime.', en: 'I love you.', note: 'Strong — only for deep love or family. Not used casually.' },
  { fr: 'Je t\'adore.', en: 'I adore you.', note: 'Lighter than "je t\'aime". Can be used with friends too.' },
  { fr: 'Tu me manques.', en: 'I miss you.', note: 'Lit. "You are missing to me" — reversed from English.' },
  { fr: 'Je pense à toi.', en: 'I\'m thinking of you.' },
  { fr: 'Tu es magnifique.', en: 'You\'re gorgeous / magnificent.' },
  { fr: 'Tu es la personne de ma vie.', en: 'You\'re the person of my life / my soulmate.' },
  { fr: 'Je suis fou/folle de toi.', en: 'I\'m crazy about you.' },
  { fr: 'Veux-tu m\'épouser ?', en: 'Will you marry me?' },
  { fr: 'Depuis que je te connais, je suis heureux/heureuse.', en: 'Since I\'ve known you, I\'ve been happy.' },
  { fr: 'Tu comptes énormément pour moi.', en: 'You mean a great deal to me.' },
]

const CULTURE_NOTES = [
  { title: 'La séduction française', desc: 'France is famous for its culture of seduction and flirtation. Light, witty, intellectual banter (la conversation) is a key part of French romantic culture. Being direct about attraction is normal.', icon: '💫' },
  { title: 'Le mariage et le PACS', desc: 'France introduced the PACS (civil partnership) in 1999. It\'s hugely popular — nearly as common as marriage. Same-sex marriage has been legal since 2013.', icon: '💍' },
  { title: '"Tu me manques" — the beautiful reversal', desc: 'English says "I miss you" (subject = I). French says "tu me manques" — literally "you are lacking to me." The person you miss is the subject, not you.', icon: '🌙' },
  { title: 'Valentine\'s Day', desc: 'La Saint-Valentin (14 February) is celebrated, but it\'s more couple-focused than in the UK or US. Cards, flowers (especially red roses), and romantic dinners are typical.', icon: '🌹' },
  { title: 'Terms of endearment', desc: '"Mon amour" (my love), "mon cœur" (my heart), "mon chéri/chérie" (my darling), "ma puce" (my flea — oddly sweet!), "mon chou" (my cabbage — also sweet!), "mon lapin" (my rabbit).', icon: '🐇' },
]

const ENDEARMENTS = [
  { fr: 'mon amour', en: 'my love' },
  { fr: 'mon chéri / ma chérie', en: 'my darling / sweetheart' },
  { fr: 'mon cœur', en: 'my heart' },
  { fr: 'mon trésor', en: 'my treasure' },
  { fr: 'mon bébé', en: 'my baby' },
  { fr: 'ma puce', en: 'my flea (term of endearment)', note: 'Sounds odd but very affectionate!' },
  { fr: 'mon chou', en: 'my cabbage (term of endearment)', note: 'Also odd-sounding but sweet' },
  { fr: 'mon lapin', en: 'my rabbit (term of endearment)' },
  { fr: 'mon ange', en: 'my angel' },
  { fr: 'mon petit / ma petite', en: 'my little one' },
]

export default function FrenchLoveRomance() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Love & Romance Vocabulary | SayBonjour!" description="Learn French romantic vocabulary — love phrases, endearments, dating culture, and la séduction française." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Love & Romance in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'amour — vocabulary, phrases, endearments, and French romantic culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Love Phrases' }, { id: 'endearments', label: 'Endearments' }, { id: 'culture', label: 'Culture Notes' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {LOVE_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-4">
            {LOVE_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-3 mb-1">
                  <SpeakButton text={p.fr} size="md" />
                  <p className="font-bold text-lg italic font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300">"{p.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">{p.en}</p>
                {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic ml-8 mt-1">💡 {p.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'endearments' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {ENDEARMENTS.map((e, i) => (
              <motion.div key={e.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={e.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{e.fr}</p>
                  <p className="text-xs text-gray-400">{e.en}</p>
                  {e.note && <p className="text-xs text-amber-500 italic">{e.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CULTURE_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{note.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
