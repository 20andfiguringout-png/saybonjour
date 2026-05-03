import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Stethoscope, Pill } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const HEALTH_SECTIONS = [
  {
    category: 'At the Doctor — Chez le médecin',
    items: [
      { fr: 'un médecin / un docteur', en: 'a doctor' },
      { fr: 'un généraliste', en: 'a GP / general practitioner' },
      { fr: 'un spécialiste', en: 'a specialist' },
      { fr: 'un rendez-vous', en: 'an appointment' },
      { fr: 'une ordonnance', en: 'a prescription' },
      { fr: 'la Sécurité sociale', en: 'the French health system (NHS equivalent)', note: '"La Sécu" — covers 70–100% of costs' },
      { fr: 'une mutuelle', en: 'complementary health insurance', note: 'Top-up insurance covering what la Sécu doesn\'t' },
      { fr: 'une consultation', en: 'a consultation / appointment' },
      { fr: 'un bilan de santé', en: 'a health check-up' },
      { fr: 'la carte Vitale', en: 'French health insurance card', note: 'Green card you present at every medical appointment' },
      { fr: 'un arrêt maladie', en: 'a sick note / sick leave', note: 'Prescribers issue "arrêts de travail"' },
      { fr: 'une radio / une radiographie', en: 'an X-ray' },
      { fr: 'une prise de sang', en: 'a blood test' },
    ],
  },
  {
    category: 'Symptoms — Les symptômes',
    items: [
      { fr: 'avoir mal à…', en: 'to have a pain in… / to hurt', note: '"J\'ai mal à la tête" = I have a headache' },
      { fr: 'la douleur', en: 'pain' },
      { fr: 'la fièvre', en: 'a fever / temperature' },
      { fr: 'la toux', en: 'a cough' },
      { fr: 'tousser', en: 'to cough' },
      { fr: 'le rhume', en: 'a cold' },
      { fr: 'la grippe', en: 'flu / influenza' },
      { fr: 'être enrhumé(e)', en: 'to have a cold' },
      { fr: 'vomir / avoir envie de vomir', en: 'to vomit / to feel sick (nauseous)' },
      { fr: 'avoir la nausée', en: 'to feel nauseous' },
      { fr: 'un étourdissement', en: 'a dizzy spell' },
      { fr: 'la fatigue', en: 'fatigue / tiredness' },
      { fr: 'une allergie', en: 'an allergy' },
      { fr: 'une éruption cutanée', en: 'a rash' },
      { fr: 'gonfler', en: 'to swell' },
      { fr: 'une fracture', en: 'a fracture / break' },
    ],
  },
  {
    category: 'Pharmacy — À la pharmacie',
    items: [
      { fr: 'une pharmacie', en: 'a pharmacy', note: 'In France, pharmacies display a green neon cross' },
      { fr: 'un pharmacien / une pharmacienne', en: 'a pharmacist' },
      { fr: 'un médicament', en: 'a medicine / medication' },
      { fr: 'un comprimé / un cachet', en: 'a tablet / pill' },
      { fr: 'une gélule', en: 'a capsule' },
      { fr: 'un sirop', en: 'a syrup / medicine in liquid form' },
      { fr: 'une crème', en: 'a cream / ointment' },
      { fr: 'un pansement', en: 'a bandage / plaster' },
      { fr: 'l\'aspirine', en: 'aspirin' },
      { fr: 'le paracétamol', en: 'paracetamol', note: 'The French brand Doliprane is iconic' },
      { fr: 'un antibiotique', en: 'an antibiotic' },
      { fr: 'la posologie', en: 'dosage / dosing instructions' },
      { fr: 'les effets secondaires', en: 'side effects' },
    ],
  },
  {
    category: 'Emergency — Urgences',
    items: [
      { fr: 'le SAMU', en: 'French emergency medical service (15)', note: 'Service d\'Aide Médicale Urgente — call 15' },
      { fr: 'les urgences', en: 'A&E / emergency room', note: 'Also called "salle des urgences"' },
      { fr: 'appeler le 15 / le 112', en: 'to call emergency services', note: '15 = medical, 17 = police, 18 = fire, 112 = EU general' },
      { fr: 'une ambulance', en: 'an ambulance' },
      { fr: 'les pompiers', en: 'fire brigade', note: 'Pompiers also respond to medical emergencies in France' },
      { fr: 'au secours !', en: 'Help!' },
      { fr: 'Je me suis blessé(e).', en: 'I\'ve hurt myself.' },
      { fr: 'Il / Elle a perdu connaissance.', en: 'He / She has lost consciousness.' },
    ],
  },
]

const USEFUL_SENTENCES = [
  { fr: 'J\'ai rendez-vous avec le médecin à 10h.', en: 'I have a doctor\'s appointment at 10am.' },
  { fr: 'J\'ai mal à la gorge depuis hier.', en: 'My throat has been hurting since yesterday.' },
  { fr: 'Je tousse beaucoup et j\'ai de la fièvre.', en: 'I\'m coughing a lot and I have a temperature.' },
  { fr: 'Pouvez-vous me donner quelque chose contre la douleur ?', en: 'Can you give me something for the pain?' },
  { fr: 'Je suis allergique à la pénicilline.', en: 'I\'m allergic to penicillin.' },
  { fr: 'Il faut rester au lit et boire beaucoup d\'eau.', en: 'You need to rest in bed and drink plenty of water.' },
  { fr: 'Est-ce que vous avez une carte Vitale ?', en: 'Do you have a Carte Vitale (health card)?' },
  { fr: 'C\'est remboursé par la Sécu ?', en: 'Is it covered by French health insurance?' },
  { fr: 'Prenez ce comprimé trois fois par jour.', en: 'Take this tablet three times a day.' },
]

export default function FrenchHealth() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Health Vocabulary | SayBonjour!" description="Learn French health vocabulary — symptoms, doctor visits, pharmacy, emergencies, and the French health system." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Health in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La santé en français — symptoms, doctors, pharmacies, and emergencies</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Useful Sentences' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {HEALTH_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{HEALTH_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {HEALTH_SECTIONS[activeCategory].items.map(item => (
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
            {USEFUL_SENTENCES.map((phrase, i) => (
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
