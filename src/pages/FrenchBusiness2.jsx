import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Mail } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const BUSINESS_VOCAB = [
  { fr: 'une entreprise / une société', en: 'a company / business' },
  { fr: 'une réunion', en: 'a meeting' },
  { fr: 'un rendez-vous', en: 'an appointment / meeting' },
  { fr: 'un collègue / une collègue', en: 'a colleague' },
  { fr: 'le/la directeur/directrice', en: 'the director / manager' },
  { fr: 'le/la PDG (président-directeur général)', en: 'CEO' },
  { fr: 'un compte rendu', en: 'minutes / report of a meeting' },
  { fr: 'un devis', en: 'a quote / estimate' },
  { fr: 'une facture', en: 'an invoice' },
  { fr: 'le chiffre d\'affaires', en: 'turnover / revenue' },
  { fr: 'le bilan', en: 'balance sheet' },
  { fr: 'un contrat', en: 'a contract' },
  { fr: 'les ressources humaines (RH)', en: 'human resources (HR)' },
  { fr: 'un entretien d\'embauche', en: 'a job interview' },
  { fr: 'un CV (curriculum vitae)', en: 'a CV / résumé' },
  { fr: 'une lettre de motivation', en: 'a cover letter', note: 'Very important in France — much more detailed than in the UK/US' },
  { fr: 'un stage', en: 'an internship', note: 'Essential in French professional culture — even for senior roles' },
  { fr: 'un CDI (contrat à durée indéterminée)', en: 'permanent / open-ended contract', note: 'The holy grail of French employment — very hard to be dismissed with a CDI' },
  { fr: 'un CDD (contrat à durée déterminée)', en: 'fixed-term contract' },
]

const EMAIL_PHRASES = [
  { context: 'Opening (formal)', phrases: [
    { fr: 'Madame, Monsieur,', en: 'Dear Sir / Madam,' },
    { fr: 'Cher Monsieur Dupont,', en: 'Dear Mr Dupont,' },
    { fr: 'Suite à notre entretien téléphonique,', en: 'Following our telephone conversation,' },
    { fr: 'Je me permets de vous contacter au sujet de…', en: 'I am taking the liberty of contacting you regarding…' },
  ]},
  { context: 'Body phrases', phrases: [
    { fr: 'Veuillez trouver ci-joint…', en: 'Please find attached…' },
    { fr: 'Je vous remercie de votre réponse rapide.', en: 'Thank you for your prompt reply.' },
    { fr: 'N\'hésitez pas à me contacter.', en: 'Please do not hesitate to contact me.' },
    { fr: 'Dans l\'attente de votre réponse,', en: 'Awaiting your reply,' },
  ]},
  { context: 'Closing (formal)', phrases: [
    { fr: 'Veuillez agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', en: 'Yours faithfully / sincerely (very formal)', note: 'The full formal closing — required for official letters' },
    { fr: 'Cordialement,', en: 'Best regards / Kind regards (standard email)' },
    { fr: 'Bien cordialement,', en: 'Best regards (slightly warmer)' },
    { fr: 'Avec mes meilleures salutations,', en: 'With best wishes,' },
  ]},
]

const MEETING_PHRASES = [
  { fr: 'Pouvons-nous fixer un rendez-vous ?', en: 'Can we set up a meeting?' },
  { fr: 'Je suis disponible le mardi matin.', en: 'I\'m available Tuesday morning.' },
  { fr: 'La réunion commence à 10 heures.', en: 'The meeting starts at 10 o\'clock.' },
  { fr: 'Pouvez-vous répéter, s\'il vous plaît ?', en: 'Could you repeat that, please?' },
  { fr: 'Je ne comprends pas très bien.', en: 'I don\'t understand very well.' },
  { fr: 'Pouvez-vous parler plus lentement ?', en: 'Could you speak more slowly?' },
  { fr: 'Qu\'est-ce que vous entendez par là ?', en: 'What do you mean by that?' },
  { fr: 'Je suis d\'accord avec vous.', en: 'I agree with you.' },
  { fr: 'Je ne suis pas tout à fait d\'accord.', en: 'I don\'t entirely agree.' },
  { fr: 'Permettez-moi de résumer.', en: 'Allow me to summarise.' },
  { fr: 'Passons au point suivant.', en: 'Let\'s move on to the next point.' },
]

export default function FrenchBusiness2() {
  const [tab, setTab] = useState('vocab')
  const [emailSection, setEmailSection] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="Business French | SayBonjour!" description="Professional French for the workplace — business vocabulary, formal email phrases, and meeting language." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Business French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le français professionnel — vocabulary, emails, and meeting language</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Business Vocab' }, { id: 'emails', label: 'Email Phrases' }, { id: 'meetings', label: 'Meeting Language' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {BUSINESS_VOCAB.map((item, i) => (
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

        {tab === 'emails' && (
          <>
            <div className="flex gap-2 mb-5 flex-wrap">
              {EMAIL_PHRASES.map((s, i) => (
                <button key={s.context} onClick={() => setEmailSection(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${emailSection === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {s.context}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {EMAIL_PHRASES[emailSection].phrases.map((p, i) => (
                <motion.div key={p.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                  <SpeakButton text={p.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                    {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{p.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'meetings' && (
          <div className="space-y-3">
            {MEETING_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
