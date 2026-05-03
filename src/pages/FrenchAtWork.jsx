import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Clock, Mail, Users } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const WORK_SECTIONS = [
  {
    category: 'Job Titles — Les métiers',
    items: [
      { fr: 'un(e) médecin', en: 'a doctor' },
      { fr: 'un(e) infirmier/infirmière', en: 'a nurse' },
      { fr: 'un(e) avocat(e)', en: 'a lawyer' },
      { fr: 'un(e) comptable', en: 'an accountant' },
      { fr: 'un(e) enseignant(e) / professeur', en: 'a teacher' },
      { fr: 'un(e) ingénieur(e)', en: 'an engineer' },
      { fr: 'un(e) informaticien(ne)', en: 'an IT professional' },
      { fr: 'un(e) développeur/développeuse', en: 'a developer' },
      { fr: 'un(e) architecte', en: 'an architect' },
      { fr: 'un(e) journaliste', en: 'a journalist' },
      { fr: 'un(e) chef(fe) de projet', en: 'a project manager' },
      { fr: 'un(e) commercial(e)', en: 'a sales representative' },
      { fr: 'un(e) directeur/directrice', en: 'a director / manager' },
      { fr: 'un(e) PDG', en: 'a CEO', note: 'Président-Directeur Général' },
      { fr: 'un(e) fonctionnaire', en: 'a civil servant', note: 'Very secure employment in France' },
      { fr: 'un(e) entrepreneur(e)', en: 'an entrepreneur' },
      { fr: 'un(e) freelance / indépendant(e)', en: 'a freelancer', note: 'Auto-entrepreneur is the official French status' },
    ],
  },
  {
    category: 'Workplace Vocabulary — Au travail',
    items: [
      { fr: 'le bureau', en: 'office / desk' },
      { fr: 'le télétravail', en: 'remote working', note: 'Huge growth post-2020' },
      { fr: 'une réunion', en: 'a meeting' },
      { fr: 'un entretien', en: 'an interview / meeting', note: '"Entretien d\'embauche" = job interview' },
      { fr: 'un contrat', en: 'a contract' },
      { fr: 'le CDI', en: 'permanent contract', note: 'Contrat à Durée Indéterminée — very prized in France' },
      { fr: 'le CDD', en: 'fixed-term contract', note: 'Contrat à Durée Déterminée' },
      { fr: 'la période d\'essai', en: 'trial / probation period' },
      { fr: 'le salaire', en: 'salary / wage' },
      { fr: 'le SMIC', en: 'minimum wage', note: 'Salaire Minimum Interprofessionnel de Croissance' },
      { fr: 'les congés payés', en: 'paid leave / holiday', note: 'France: 5 weeks minimum!' },
      { fr: 'les RTT', en: 'extra days off (35-hour week system)', note: 'Réduction du Temps de Travail' },
      { fr: 'licencier', en: 'to make redundant / fire (formal)' },
      { fr: 'démissionner', en: 'to resign' },
      { fr: 'une promotion', en: 'a promotion' },
      { fr: 'le bilan de compétences', en: 'a skills assessment (govt-funded)' },
    ],
  },
  {
    category: 'Email & Communication — Email et communication',
    items: [
      { fr: 'Objet :', en: 'Subject: (email)', note: 'Always required in formal French emails' },
      { fr: 'Madame, Monsieur,', en: 'Dear Sir/Madam,', note: 'Standard formal email opening' },
      { fr: 'Suite à notre entretien…', en: 'Following our interview/meeting…' },
      { fr: 'Je me permets de vous contacter…', en: 'I am writing to contact you…' },
      { fr: 'Veuillez trouver en pièce jointe…', en: 'Please find attached…' },
      { fr: 'Dans l\'attente de votre réponse…', en: 'Looking forward to your reply…' },
      { fr: 'Cordialement,', en: 'Kind regards, / Best regards,', note: 'Standard sign-off' },
      { fr: 'Bien cordialement,', en: 'Best wishes, (slightly warmer)' },
      { fr: 'Bien à vous,', en: 'Yours sincerely, (formal)' },
      { fr: 'Je vous prie d\'agréer…', en: 'Please accept… (very formal)', note: 'Used in cover letters' },
    ],
  },
]

const WORK_CULTURE = [
  { title: '35-hour working week', fr: 'la semaine de 35 heures', desc: 'France introduced the 35-hour working week in 2000. Hours beyond this generate RTT (extra days off) or overtime pay.', icon: '⏰' },
  { title: 'La pause déjeuner', fr: 'lunch break', desc: 'French workers typically take a proper 1–2 hour lunch break. Many companies have a company restaurant (la cantine d\'entreprise).', icon: '🍽️' },
  { title: 'Les grandes vacances', fr: 'summer holidays', desc: 'France mandates minimum 5 weeks paid leave. August is when many businesses slow significantly — don\'t plan important meetings in August.', icon: '🏖️' },
  { title: 'Le CDI culture', fr: 'permanent contract culture', desc: 'A CDI (permanent contract) is enormously prized. Banks and landlords often require one before giving you a mortgage or even renting a flat.', icon: '📄' },
  { title: 'Tutoyer vs. vouvoyer at work', fr: 'tu vs. vous', desc: 'French work culture varies: start-ups may use "tu" immediately; traditional sectors use "vous" with hierarchy. Follow your colleagues\' lead.', icon: '👔' },
]

const PHRASES = [
  { fr: 'Qu\'est-ce que vous faites dans la vie ?', en: 'What do you do for a living? (formal)' },
  { fr: 'Je travaille pour une entreprise de…', en: 'I work for a company in…' },
  { fr: 'Je suis en télétravail aujourd\'hui.', en: 'I\'m working from home today.' },
  { fr: 'On a une réunion à 14h.', en: 'We have a meeting at 2pm.' },
  { fr: 'Je vais prendre ma pause déjeuner.', en: 'I\'m going to take my lunch break.' },
  { fr: 'Je suis en congé la semaine prochaine.', en: 'I\'m on leave next week.' },
  { fr: 'Je cherche un nouveau poste.', en: 'I\'m looking for a new position.' },
  { fr: 'J\'ai décroché un CDI !', en: 'I landed a permanent contract!' },
]

export default function FrenchAtWork() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French at Work | SayBonjour!" description="Learn French workplace vocabulary — job titles, office phrases, email etiquette, and work culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French at Work</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le monde du travail — workplace vocabulary and French work culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'culture', label: 'Work Culture' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {WORK_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{WORK_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {WORK_SECTIONS[activeCategory].items.map(item => (
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

        {tab === 'culture' && (
          <div className="space-y-4">
            {WORK_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-cream-50">{item.title}</h3>
                    <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic">{item.fr}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {PHRASES.map((phrase, i) => (
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
