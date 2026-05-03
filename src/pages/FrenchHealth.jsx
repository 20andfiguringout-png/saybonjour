import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Stethoscope, Pill } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HEALTH_SECTIONS = [
  {
    category: 'At the Doctor — Chez le médecin',
    emoji: '🩺',
    items: [
      { fr: 'un médecin / un docteur', en: 'a doctor', note: '"Médecin" is the formal/official term. "Docteur" is used for address ("Bonjour Docteur").' },
      { fr: 'un généraliste / un médecin de famille', en: 'a GP / general practitioner', note: 'Your first port of call in France. Must be registered with your "médecin traitant" for full reimbursement.' },
      { fr: 'un spécialiste', en: 'a specialist', note: 'Must be referred by your généraliste for reimbursement. "Un cardiologue" = cardiologist. "Un dermatologue" = dermatologist.' },
      { fr: 'un rendez-vous', en: 'an appointment', note: '"Prendre rendez-vous" = to make an appointment. "Le cabinet médical" = the doctor\'s surgery.' },
      { fr: 'une ordonnance', en: 'a prescription', note: 'French prescriptions are pink slips. You take them to any pharmacy. Medicines are reimbursed through the Sécurité sociale.' },
      { fr: 'la Sécurité sociale / la Sécu', en: 'the French health system (like the NHS)', note: '"La Sécu" covers 70–100% of approved medical costs. Nearly universal — the envy of many countries. Funded by payroll taxes.' },
      { fr: 'une mutuelle', en: 'complementary health insurance', note: 'Top-up insurance covering the remainder after the Sécu pays. Most employers provide one. Without it, 30% of costs are personal.' },
      { fr: 'la carte Vitale', en: 'French health insurance card', note: 'Green chip card you present at every medical appointment and pharmacy. Contains your health data and enables automatic reimbursement.' },
      { fr: 'un arrêt maladie / un arrêt de travail', en: 'a sick note / sick leave', note: '"L\'arrêt maladie" = the period of sick leave. "Être en arrêt" = to be signed off sick. French employers must continue paying during sick leave.' },
      { fr: 'une radio / une radiographie', en: 'an X-ray', note: '"Passer une radio" = to have an X-ray. "Une IRM" = an MRI scan. "Un scanner" = a CT scan.' },
      { fr: 'une prise de sang', en: 'a blood test', note: 'Done at a "laboratoire d\'analyses médicales" — these are common and widely spread throughout France.' },
      { fr: 'une consultation', en: 'a consultation / appointment', note: '"La consultation" has a fixed price set by the state: currently around €25–30 for a GP, mostly reimbursed.' },
    ],
  },
  {
    category: 'Symptoms — Les symptômes',
    emoji: '🤒',
    items: [
      { fr: 'avoir mal à…', en: 'to have a pain in… / to hurt', note: '"J\'ai mal à la tête" = I have a headache. "J\'ai mal au dos" = I have backache. "Avoir mal" + à + body part.' },
      { fr: 'la douleur', en: 'pain', note: '"Une douleur aiguë" = sharp pain. "Une douleur chronique" = chronic pain. "Évaluer la douleur sur 10" = rate pain out of 10.' },
      { fr: 'avoir de la fièvre', en: 'to have a fever / temperature', note: '"J\'ai 38,5 de fièvre" = I have a temperature of 38.5°C. Normal temp in France: 37°C. "La fièvre" = the fever/temperature.' },
      { fr: 'la toux', en: 'a cough', note: '"Tousser" = to cough. "Une toux grasse" = a chesty cough. "Une toux sèche" = a dry cough.' },
      { fr: 'le rhume', en: 'a cold', note: '"Avoir un rhume" = to have a cold. "Être enrhumé(e)" = to have a cold (adj). "Un gros rhume" = a bad cold.' },
      { fr: 'la grippe', en: 'flu / influenza', note: '"La grippe" is taken seriously in France — annual flu vaccination is widely promoted. "La grippe espagnole" = the 1918 Spanish flu.' },
      { fr: 'vomir / avoir envie de vomir', en: 'to vomit / to feel sick (nauseous)', note: '"Avoir envie de vomir" = to feel nauseous. "Un vomissement" = vomiting. "Des nausées" = nausea.' },
      { fr: 'avoir la nausée', en: 'to feel nauseous', note: '"J\'ai la nausée" = I feel sick. "Des nausées matinales" = morning sickness.' },
      { fr: 'un étourdissement / le vertige', en: 'a dizzy spell / vertigo', note: '"J\'ai la tête qui tourne" = I feel dizzy (lit. my head is spinning). "Des vertiges" = dizziness.' },
      { fr: 'la fatigue / l\'épuisement', en: 'fatigue / exhaustion', note: '"Je suis épuisé(e)" = I\'m exhausted. "La fatigue chronique" = chronic fatigue. "Être à plat" = to be run down.' },
      { fr: 'une allergie', en: 'an allergy', note: '"Être allergique à" = to be allergic to. "Une réaction allergique" = an allergic reaction. "Un choc anaphylactique" = anaphylaxis.' },
      { fr: 'une éruption cutanée', en: 'a rash', note: '"La peau" = skin. "Une éruption" = a rash. "Des démangeaisons" = itching.' },
      { fr: 'gonfler / une enflure', en: 'to swell / swelling', note: '"Mon cheville a gonflé" = my ankle has swollen. "Une enflure" = swelling.' },
      { fr: 'une fracture / se casser (quelque chose)', en: 'a fracture / to break (something)', note: '"Je me suis cassé le bras" = I broke my arm. "Une fracture ouverte" = a compound fracture.' },
      { fr: 'saigner / une blessure', en: 'to bleed / a wound', note: '"Il saigne beaucoup" = he\'s bleeding a lot. "Une blessure" = a wound/injury. "Une plaie" = a cut/wound.' },
    ],
  },
  {
    category: 'Pharmacy — À la pharmacie',
    emoji: '💊',
    items: [
      { fr: 'une pharmacie', en: 'a pharmacy / chemist', note: 'Green illuminated cross — unmissable. Pharmacists give free health advice and can recommend treatments. Open on a rotating Sunday/night rota ("pharmacie de garde").' },
      { fr: 'un pharmacien / une pharmacienne', en: 'a pharmacist', note: 'French pharmacists have 6 years of university training. They can advise on many conditions without a prescription.' },
      { fr: 'un médicament', en: 'a medicine / medication', note: '"Les médicaments" = medicines generally. "Un médicament sur ordonnance" = prescription-only medicine.' },
      { fr: 'un comprimé / un cachet', en: 'a tablet / pill', note: '"Deux comprimés matin et soir" = two tablets morning and evening. "Croquer le comprimé" = chew the tablet.' },
      { fr: 'une gélule', en: 'a capsule / gelcap', note: '"Avaler la gélule avec de l\'eau" = swallow the capsule with water.' },
      { fr: 'un sirop', en: 'a syrup / liquid medicine', note: '"Un sirop contre la toux" = a cough syrup. "Deux cuillères à soupe" = two tablespoons.' },
      { fr: 'une crème / une pommade', en: 'a cream / an ointment', note: '"Appliquer la crème deux fois par jour" = apply the cream twice a day. "Une pommade" = thicker than a cream.' },
      { fr: 'un pansement', en: 'a plaster / dressing', note: '"Un pansement adhésif" = a sticking plaster (like Elastoplast). "Un bandage" = a bandage for larger wounds.' },
      { fr: 'le paracétamol / le Doliprane', en: 'paracetamol', note: 'Doliprane is the iconic French brand of paracetamol — as synonymous with it as Nurofen is with ibuprofen in the UK.' },
      { fr: 'l\'ibuprofène', en: 'ibuprofen', note: '"Advil" is the common French brand. Not sold in large quantities over-the-counter — pharmacist dispenses.' },
      { fr: 'un antibiotique', en: 'an antibiotic', note: '"Les antibiotiques, c\'est pas automatique" = a famous French health campaign (antibiotics aren\'t automatic). French prescribing of antibiotics is now much more restrained.' },
      { fr: 'la posologie', en: 'dosage / dosing instructions', note: '"La posologie recommandée" = the recommended dosage. Always read "la notice" = the leaflet.' },
      { fr: 'les effets secondaires', en: 'side effects', note: '"Effets indésirables" = adverse effects (more technical term). "Contre-indications" = contraindications.' },
    ],
  },
  {
    category: 'Emergency — Urgences',
    emoji: '🚑',
    items: [
      { fr: 'le SAMU', en: 'French emergency medical service', note: 'Service d\'Aide Médicale Urgente — call 15. Dispatch ambulances and coordinate emergency medical response.' },
      { fr: 'les urgences', en: 'A&E / emergency room', note: '"Aller aux urgences" = go to A&E. French ERs are famously overcrowded — a national crisis. "Les urgences débordent" = A&E is overwhelmed.' },
      { fr: 'appeler le 15 / le 112', en: 'to call emergency services', note: '15 = medical emergency (SAMU). 17 = police. 18 = fire brigade/pompiers. 112 = EU-wide general emergency. 15 is best for medical.' },
      { fr: 'une ambulance', en: 'an ambulance', note: '"Les pompiers" (firemen) often respond to medical emergencies faster than SAMU in France — they have first-aid training.' },
      { fr: 'les pompiers', en: 'fire brigade (but also medical first responders)', note: 'French pompiers are trained medical first responders — often the first on scene at accidents and medical emergencies.' },
      { fr: 'Au secours !', en: 'Help!', note: 'The clearest French call for help. "À l\'aide !" also means help. "Aidez-moi !" = help me!' },
      { fr: 'Je me suis blessé(e) — j\'ai besoin d\'aide !', en: 'I\'ve hurt myself — I need help!', note: 'Reflexive verb: "se blesser" = to hurt oneself. "Je suis blessé(e)" = I am injured.' },
      { fr: 'Il / Elle a perdu connaissance.', en: 'He / She has lost consciousness.', note: '"Perdre connaissance" = to lose consciousness. "Être inconscient(e)" = to be unconscious.' },
      { fr: 'Je pense que j\'ai une fracture.', en: 'I think I have a fracture.', note: '"Je pense que" + indicative = I think that. "Une fracture" = fracture/break.' },
    ],
  },
]

const USEFUL_SENTENCES = [
  { fr: 'J\'ai rendez-vous avec le docteur Martin à dix heures.', en: 'I have an appointment with Dr Martin at 10am.', note: '"Chez le médecin" = at the doctor\'s.' },
  { fr: 'J\'ai mal à la gorge depuis hier soir.', en: 'My throat has been hurting since last night.', note: '"Depuis" + present tense = since / for (ongoing situation).' },
  { fr: 'Je tousse beaucoup et j\'ai de la fièvre — trente-huit degrés.', en: 'I\'m coughing a lot and I have a temperature — 38 degrees.' },
  { fr: 'Pouvez-vous me donner quelque chose contre la douleur ?', en: 'Can you give me something for the pain?', note: '"Contre" = for/against (used for medicines targeting something).' },
  { fr: 'Je suis allergique à la pénicilline.', en: 'I\'m allergic to penicillin.', note: 'Crucial to say at any medical appointment.' },
  { fr: 'Il faut rester au lit et boire beaucoup d\'eau.', en: 'You need to rest in bed and drink plenty of water.', note: '"Il faut" + infinitive = you must / it\'s necessary to.' },
  { fr: 'Avez-vous votre carte Vitale ?', en: 'Do you have your Carte Vitale?', note: 'Asked at every French medical appointment. Without it, you pay upfront and are reimbursed later.' },
  { fr: 'Est-ce que c\'est remboursé par la Sécu ?', en: 'Is it covered by French health insurance?', note: '"Remboursé" = reimbursed. Some treatments have partial ("remboursé à 70%") or no coverage.' },
  { fr: 'Prenez ce comprimé trois fois par jour, pendant les repas.', en: 'Take this tablet three times a day, with meals.', note: '"Pendant les repas" = with meals. "À jeun" = on an empty stomach.' },
  { fr: 'Je vais faire une prise de sang lundi matin — à jeun.', en: 'I\'m having a blood test Monday morning — fasting.', note: '"À jeun" = fasting (nothing to eat or drink since midnight before).' },
]

const HEALTH_CULTURE = [
  { emoji: '🏥', title: 'La Sécurité sociale — the jewel of the French state', detail: 'Created in 1945 by Ambroise Croizat and inspired by the National Council of the Resistance, the French Sécurité sociale provides near-universal healthcare coverage. France consistently ranks among the world\'s best healthcare systems (WHO ranked it #1 in 2000). It covers the vast majority of medical costs — though the system faces funding pressure from an ageing population.' },
  { emoji: '💊', title: 'French relationship with medicines', detail: 'The French consume more medicines per capita than almost any other country. France\'s "médicament culture" means people expect a prescription for minor ailments. However, the famous campaign "les antibiotiques, c\'est pas automatique" successfully reduced antibiotic prescribing by 20% between 2000–2010. Homeopathy was reimbursed until 2021, when France stopped coverage after scientific consensus against efficacy.' },
  { emoji: '🩺', title: 'Médecin traitant — your health gateway', detail: 'Since 2004, French patients must register a "médecin traitant" (their chosen GP). This doctor coordinates all healthcare — referrals to specialists, sick notes, chronic condition management. Seeing a specialist without a GP referral reduces your reimbursement. The system creates continuity of care and reduces unnecessary specialist visits.' },
  { emoji: '😰', title: 'The French healthcare crisis', detail: 'Despite its excellence, the French system faces serious challenges: a shortage of GPs especially in rural areas ("déserts médicaux"), overwhelmed emergency rooms, and increasing costs. France has invested in "maisons de santé" (health centres with multiple practitioners). Téléconsultation (remote video consultation) expanded rapidly post-COVID and is now reimbursed.' },
]

export default function FrenchHealth() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Health Vocabulary | SayBonjour!" description="French health vocabulary — symptoms, doctor visits, pharmacy terms, emergencies, and the French healthcare system." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Health in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La santé en français — symptoms, doctors, pharmacies, emergencies, and healthcare culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'phrases', label: 'Useful Sentences' },
            { id: 'culture', label: 'Healthcare Culture' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {HEALTH_SECTIONS[activeCategory].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                    </div>
                    {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {USEFUL_SENTENCES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                  {phrase.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {phrase.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {HEALTH_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
