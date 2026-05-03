import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const OPINION_GROUPS = [
  {
    category: 'Giving your opinion',
    items: [
      { fr: 'Je pense que…', en: 'I think that…' },
      { fr: 'Je crois que…', en: 'I believe that…' },
      { fr: 'Je trouve que…', en: 'I find that… / I think that…' },
      { fr: 'À mon avis,…', en: 'In my opinion,…' },
      { fr: 'Selon moi,…', en: 'According to me,…' },
      { fr: 'D\'après moi,…', en: 'In my view,…' },
      { fr: 'Pour moi,…', en: 'For me,…' },
      { fr: 'Il me semble que…', en: 'It seems to me that…' },
      { fr: 'J\'ai l\'impression que…', en: 'I have the impression that…' },
    ],
  },
  {
    category: 'Agreeing',
    items: [
      { fr: 'Je suis d\'accord.', en: 'I agree.' },
      { fr: 'Tout à fait !', en: 'Absolutely! / Quite right!' },
      { fr: 'Exactement !', en: 'Exactly!' },
      { fr: 'C\'est vrai.', en: 'That\'s true.' },
      { fr: 'Bien sûr !', en: 'Of course!' },
      { fr: 'Évidemment.', en: 'Obviously / Clearly.' },
      { fr: 'Tu as (tout à fait) raison.', en: 'You\'re (absolutely) right.' },
      { fr: 'Je partage ton avis.', en: 'I share your opinion.' },
    ],
  },
  {
    category: 'Disagreeing',
    items: [
      { fr: 'Je ne suis pas d\'accord.', en: 'I disagree.' },
      { fr: 'Au contraire !', en: 'On the contrary!' },
      { fr: 'Ce n\'est pas mon avis.', en: 'That\'s not my opinion.' },
      { fr: 'Je ne suis pas tout à fait d\'accord.', en: 'I don\'t entirely agree.' },
      { fr: 'Tu as tort.', en: 'You\'re wrong.' },
      { fr: 'Pas forcément.', en: 'Not necessarily.' },
      { fr: 'Je vois les choses différemment.', en: 'I see things differently.' },
      { fr: 'Je n\'en suis pas si sûr(e).', en: 'I\'m not so sure about that.' },
    ],
  },
  {
    category: 'Expressing uncertainty',
    items: [
      { fr: 'Je ne sais pas.', en: 'I don\'t know.' },
      { fr: 'Peut-être.', en: 'Maybe / Perhaps.' },
      { fr: 'C\'est possible.', en: 'It\'s possible.' },
      { fr: 'Ça dépend.', en: 'It depends.' },
      { fr: 'Bof, je ne sais pas trop.', en: 'Meh, I\'m not sure really.' },
      { fr: 'C\'est difficile à dire.', en: 'It\'s hard to say.' },
      { fr: 'Je n\'ai pas d\'opinion là-dessus.', en: 'I don\'t have an opinion on that.' },
    ],
  },
  {
    category: 'Asking for opinions',
    items: [
      { fr: 'Qu\'est-ce que tu en penses ?', en: 'What do you think (about it)?' },
      { fr: 'Quel est ton avis ?', en: 'What\'s your opinion?' },
      { fr: 'Tu es d\'accord ?', en: 'Do you agree?' },
      { fr: 'Et toi ?', en: 'And you? / What about you?' },
      { fr: 'Vous pensez quoi de… ?', en: 'What do you think of…?' },
      { fr: 'C\'est quoi ta position là-dessus ?', en: 'What\'s your stance on that?' },
    ],
  },
]

const DEBATE_CONNECTORS = [
  { fr: 'D\'un côté… de l\'autre côté…', en: 'On one hand… on the other hand…' },
  { fr: 'Certes, mais…', en: 'Granted, but…' },
  { fr: 'Cependant,…', en: 'However,…' },
  { fr: 'Néanmoins,…', en: 'Nevertheless,…' },
  { fr: 'En revanche,…', en: 'On the other hand,…' },
  { fr: 'Par ailleurs,…', en: 'Furthermore / Moreover,…' },
  { fr: 'En outre,…', en: 'In addition,…' },
  { fr: 'En conclusion,…', en: 'In conclusion,…' },
  { fr: 'En résumé,…', en: 'In summary,…' },
]

export default function FrenchOpinions() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [tab, setTab] = useState('opinions')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Opinion Phrases | SayBonjour!" description="Express and debate opinions in French — agreeing, disagreeing, uncertainty phrases, and debate connectors." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Expressing Opinions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Exprimer son opinion — agree, disagree, and debate like a native</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'opinions', label: 'Opinion Phrases' }, { id: 'connectors', label: 'Debate Connectors' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'opinions' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {OPINION_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {OPINION_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-3">
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400 ml-2">— {item.en}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'connectors' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              These linking words help structure debates and arguments — essential for DELF B2, conversation, and writing.
            </div>
            {DEBATE_CONNECTORS.map((c, i) => (
              <motion.div key={c.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-3">
                <SpeakButton text={c.fr} size="sm" />
                <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{c.fr}</span>
                <span className="text-xs text-gray-400 ml-auto">{c.en}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
