import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Vote, Flag } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const POLITICS_VOCAB = [
  { fr: 'la politique', en: 'politics' },
  { fr: 'le gouvernement', en: 'the government' },
  { fr: 'le président / la présidente de la République', en: 'the President of the Republic', note: 'France is a semi-presidential republic — the President has significant powers' },
  { fr: 'le Premier ministre / la Première ministre', en: 'the Prime Minister' },
  { fr: 'le Parlement', en: 'Parliament', note: 'Consists of L\'Assemblée nationale (lower house) and Le Sénat (upper house)' },
  { fr: 'l\'Assemblée nationale', en: 'the National Assembly (lower house)' },
  { fr: 'le Sénat', en: 'the Senate (upper house)' },
  { fr: 'un député / une députée', en: 'a member of parliament (MP)', note: 'Members of the National Assembly — elected every 5 years' },
  { fr: 'un sénateur / une sénatrice', en: 'a senator' },
  { fr: 'une élection', en: 'an election' },
  { fr: 'voter', en: 'to vote' },
  { fr: 'le suffrage universel', en: 'universal suffrage', note: 'France introduced universal male suffrage in 1848; women\'s suffrage in 1944' },
  { fr: 'la gauche / la droite', en: 'the left / the right', note: 'Terms originate from the French Revolution — seating in the National Assembly' },
  { fr: 'le centre', en: 'the centre (politics)' },
  { fr: 'une loi', en: 'a law' },
  { fr: 'un référendum', en: 'a referendum', note: 'France uses referendums for constitutional changes — Brexit was much discussed in France' },
  { fr: 'la laïcité', en: 'secularism / separation of church and state', note: 'A cornerstone of French republicanism — religious symbols banned in state schools' },
  { fr: 'la République', en: 'the Republic', note: 'France is the 5th Republic (since 1958). "Liberté, Égalité, Fraternité" is the motto' },
  { fr: 'les droits de l\'homme', en: 'human rights', note: 'The Declaration of the Rights of Man was adopted in France in 1789' },
]

const KEY_INSTITUTIONS = [
  { name: 'L\'Élysée', en: 'the Élysée Palace', desc: 'Official residence and office of the French President in Paris (8th arrondissement).' },
  { name: 'Matignon', en: 'the Hôtel Matignon', desc: 'Official residence of the Prime Minister. When President and PM are from different parties: "cohabitation".' },
  { name: 'Le Conseil d\'État', en: 'the Council of State', desc: 'The highest administrative court and legal advisor to the French government.' },
  { name: 'Le Conseil constitutionnel', en: 'the Constitutional Council', desc: 'Checks that laws conform to the Constitution — 9 members appointed for 9-year terms.' },
  { name: 'La Préfecture', en: 'the Prefecture', desc: 'Local arm of the national government — handles official documents like driving licences and residency permits.' },
  { name: 'La Mairie', en: 'the Town Hall', desc: 'The local government building — essential for marriages, registrations, and civic services.' },
]

const POLITICAL_PHRASES = [
  { fr: 'Je suis plutôt à gauche / à droite.', en: 'I lean left / right politically.' },
  { fr: 'Je ne fais pas de politique.', en: 'I don\'t discuss politics.', note: 'Some French people say this — but political debate is very much a French tradition!' },
  { fr: 'Les élections présidentielles ont lieu tous les cinq ans.', en: 'Presidential elections are held every five years.' },
  { fr: 'Il y a eu un débat à l\'Assemblée nationale.', en: 'There was a debate in the National Assembly.' },
  { fr: 'Le taux d\'abstention est élevé.', en: 'Voter abstention is high.', note: 'Abstention rates have risen in France in recent decades' },
  { fr: 'La laïcité est un principe fondamental.', en: 'Secularism is a fundamental principle.' },
]

export default function FrenchPoliticsVocab() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Political Vocabulary | SayBonjour!" description="French political vocabulary — the Republic, key institutions, elections, and political phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Political Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La politique française — institutions, vocabulary, and key phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Political Vocab' }, { id: 'institutions', label: 'Key Institutions' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {POLITICS_VOCAB.map((item, i) => (
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

        {tab === 'institutions' && (
          <div className="space-y-4">
            {KEY_INSTITUTIONS.map((inst, i) => (
              <motion.div key={inst.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-2 mb-1">
                  <SpeakButton text={inst.name} size="sm" />
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{inst.name}</h3>
                </div>
                <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{inst.en}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{inst.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {POLITICAL_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
