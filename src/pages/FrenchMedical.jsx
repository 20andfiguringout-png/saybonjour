import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SYMPTOM_VOCAB = [
  { fr: 'J\'ai mal à…', en: 'I have pain in / I have a sore…', note: 'J\'ai mal à la tête = headache, au dos = back pain, à la gorge = sore throat' },
  { fr: 'J\'ai de la fièvre.', en: 'I have a fever.' },
  { fr: 'J\'ai des frissons.', en: 'I have chills.' },
  { fr: 'Je tousse.', en: 'I have a cough / I\'m coughing.' },
  { fr: 'J\'ai le nez qui coule.', en: 'I have a runny nose.', note: 'Lit. "my nose is running"' },
  { fr: 'J\'ai le nez bouché.', en: 'My nose is blocked / stuffy.' },
  { fr: 'J\'ai des nausées.', en: 'I feel nauseous.' },
  { fr: 'J\'ai vomi.', en: 'I was sick / I vomited.' },
  { fr: 'J\'ai la diarrhée.', en: 'I have diarrhoea.' },
  { fr: 'Je me suis blessé(e).', en: 'I injured myself.' },
  { fr: 'Je me suis cassé(e) le bras.', en: 'I broke my arm.' },
  { fr: 'Je suis allergique à…', en: 'I\'m allergic to…' },
  { fr: 'Je prends des médicaments.', en: 'I take medication.' },
  { fr: 'Je suis enceinte.', en: 'I\'m pregnant.' },
  { fr: 'Je me sens faible / étourdi(e).', en: 'I feel weak / dizzy.' },
]

const MEDICAL_PHRASES = [
  { fr: 'Je voudrais prendre un rendez-vous.', en: 'I\'d like to make an appointment.' },
  { fr: 'Je suis malade depuis deux jours.', en: 'I\'ve been ill for two days.' },
  { fr: 'C\'est urgent.', en: 'It\'s urgent.' },
  { fr: 'Appelez une ambulance, s\'il vous plaît.', en: 'Please call an ambulance.' },
  { fr: 'Où est l\'hôpital le plus proche ?', en: 'Where is the nearest hospital?' },
  { fr: 'Avez-vous de l\'aspirine / du paracétamol ?', en: 'Do you have aspirin / paracetamol?' },
  { fr: 'Pouvez-vous me faire une ordonnance ?', en: 'Can you write me a prescription?' },
  { fr: 'Est-ce que cela est remboursé ?', en: 'Is this covered / reimbursed?', note: 'France reimburses most medical costs through social security' },
  { fr: 'J\'ai mon ordonnance.', en: 'I have my prescription.' },
]

const MEDICAL_VOCAB = [
  { fr: 'un médecin / un docteur', en: 'a doctor (general practitioner)' },
  { fr: 'un spécialiste', en: 'a specialist' },
  { fr: 'une infirmière / un infirmier', en: 'a nurse' },
  { fr: 'une ordonnance', en: 'a prescription' },
  { fr: 'une pharmacie', en: 'a pharmacy', note: 'Identified by a green cross sign. Staff can advise on minor ailments.' },
  { fr: 'les urgences', en: 'A&E / emergency room' },
  { fr: 'le SAMU', en: 'Emergency medical service (call 15)', note: 'France\'s emergency medical service — like 999 in the UK or 911 in the US' },
  { fr: 'la Sécurité Sociale / la Sécu', en: 'French national health insurance', note: 'Most residents are covered — see a doctor for ~25€ and get most of it back' },
  { fr: 'une mutuelle', en: 'complementary health insurance', note: 'Top-up insurance that covers what Sécu doesn\'t' },
  { fr: 'le cabinet médical', en: 'the doctor\'s surgery / GP practice' },
  { fr: 'une prise de sang', en: 'a blood test' },
  { fr: 'une radio(graphie)', en: 'an X-ray' },
]

const EMERGENCY_NUMBERS = [
  { number: '15', service: 'SAMU', desc: 'Medical emergencies' },
  { number: '17', service: 'Police', desc: 'Police' },
  { number: '18', service: 'Pompiers', desc: 'Fire brigade (also respond to medical emergencies)' },
  { number: '112', service: 'European emergency', desc: 'Works anywhere in Europe' },
]

export default function FrenchMedical() {
  const [tab, setTab] = useState('symptoms')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Medical Vocabulary | SayBonjour!" description="Essential French medical vocabulary — symptoms, doctor phrases, pharmacy, and emergency numbers in France." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Medical French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La santé — symptoms, doctor visits, pharmacy, and emergencies</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="text-sm text-red-800 dark:text-red-300">
            <strong>Emergency numbers:</strong> {EMERGENCY_NUMBERS.map(e => `${e.number} (${e.service})`).join(' · ')}
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'symptoms', label: 'Symptoms' }, { id: 'phrases', label: 'Doctor Phrases' }, { id: 'vocab', label: 'Medical Vocab' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'symptoms' && (
          <div className="space-y-2">
            {SYMPTOM_VOCAB.map((item, i) => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {MEDICAL_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
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

        {tab === 'vocab' && (
          <div className="space-y-2">
            {MEDICAL_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3">
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
      </div>
    </div>
  )
}
