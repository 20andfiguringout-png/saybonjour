import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, AlertCircle, Stethoscope, Pill } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SYMPTOM_VOCAB = [
  { fr: 'J\'ai mal à…', en: 'I have pain in / I have a sore…', note: 'J\'ai mal à la tête = headache; au dos = back pain; à la gorge = sore throat; aux dents = toothache; à l\'estomac = stomach ache' },
  { fr: 'J\'ai de la fièvre.', en: 'I have a fever.', note: 'Normal temperature in France is 37°C. Fever = above 38°C (38,5°C is significant)' },
  { fr: 'J\'ai des frissons.', en: 'I have chills.' },
  { fr: 'Je tousse.', en: 'I have a cough / I\'m coughing.', note: '"Une toux sèche" = dry cough; "une toux grasse" = wet/productive cough' },
  { fr: 'J\'ai le nez qui coule.', en: 'I have a runny nose.', note: 'Lit. "my nose is running"' },
  { fr: 'J\'ai le nez bouché.', en: 'My nose is blocked / stuffy.' },
  { fr: 'J\'ai des nausées.', en: 'I feel nauseous.', note: '"Avoir la nausée" is also used — both forms are correct' },
  { fr: 'J\'ai vomi.', en: 'I was sick / I vomited.', note: 'The verb is "vomir". In slang: "j\'ai rendu"' },
  { fr: 'J\'ai la diarrhée.', en: 'I have diarrhoea.' },
  { fr: 'Je suis constipé(e).', en: 'I\'m constipated.' },
  { fr: 'Je me suis blessé(e).', en: 'I injured myself.', note: '"Une blessure" = a wound/injury; "une plaie" = a wound/cut' },
  { fr: 'Je me suis cassé(e) le bras / la jambe.', en: 'I broke my arm / leg.', note: '"Une fracture" = a fracture; "un plâtre" = a plaster cast' },
  { fr: 'Je me suis foulé(e) la cheville.', en: 'I sprained my ankle.', note: '"Une entorse" = a sprain' },
  { fr: 'Je saigne.', en: 'I\'m bleeding.', note: '"Faire une hémorragie" = to haemorrhage (more serious)' },
  { fr: 'Je suis allergique à…', en: 'I\'m allergic to…', note: '"Une allergie aux arachides" = peanut allergy — critical to communicate clearly' },
  { fr: 'Je prends des médicaments.', en: 'I take medication.', note: 'Always specify the name — French doctors need to check for interactions' },
  { fr: 'Je suis enceinte.', en: 'I\'m pregnant.', note: '"Un terme" = gestational age; "une grossesse" = a pregnancy' },
  { fr: 'Je me sens faible / étourdi(e).', en: 'I feel weak / dizzy.', note: '"Un vertige" = vertigo / dizziness; "un évanouissement" = a fainting episode' },
  { fr: 'J\'ai du mal à respirer.', en: 'I\'m having trouble breathing.', note: 'Serious symptom — may indicate asthme (asthma) or cardiac issues' },
  { fr: 'J\'ai des palpitations.', en: 'I have palpitations.' },
  { fr: 'Je n\'arrive pas à dormir.', en: 'I can\'t sleep.', note: '"L\'insomnie" = insomnia; "des troubles du sommeil" = sleep disorders' },
]

const MEDICAL_PHRASES = [
  { fr: 'Je voudrais prendre un rendez-vous.', en: 'I\'d like to make an appointment.', note: 'You usually need to call — online booking (Doctolib) is now common' },
  { fr: 'Je suis malade depuis deux jours.', en: 'I\'ve been ill for two days.', note: 'Specify duration — "depuis quand ?" (since when?) is always the first question' },
  { fr: 'Depuis quand avez-vous ces symptômes ?', en: 'How long have you had these symptoms?', note: 'What the doctor will ask you' },
  { fr: 'C\'est urgent.', en: 'It\'s urgent.', note: 'Say this clearly — it determines how quickly you\'re seen' },
  { fr: 'Appelez le SAMU, s\'il vous plaît.', en: 'Please call the emergency medical service (15).', note: 'SAMU = 15 for medical; 18 = fire brigade (also respond to medical emergencies)' },
  { fr: 'Où est l\'hôpital le plus proche ?', en: 'Where is the nearest hospital?' },
  { fr: 'Pouvez-vous me faire une ordonnance ?', en: 'Can you write me a prescription?' },
  { fr: 'Est-ce que cela est remboursé par la Sécurité Sociale ?', en: 'Is this covered by social security?', note: 'France reimburses 70% of most standard consultations and most prescription medications' },
  { fr: 'J\'ai mon ordonnance.', en: 'I have my prescription.', note: 'Presented at the pharmacy (pharmacie) for medication' },
  { fr: 'Avez-vous de l\'aspirine / du paracétamol ?', en: 'Do you have aspirin / paracetamol?' },
  { fr: 'Je suis suivi(e) par un médecin traitant.', en: 'I have a registered GP / family doctor.', note: 'The "médecin traitant" system is central to the French health system — register with one to get full reimbursement' },
  { fr: 'Je n\'ai pas de médecin traitant.', en: 'I don\'t have a registered GP.', note: 'France has a shortage of GPs ("déserts médicaux") in rural areas' },
  { fr: 'Je suis en bonne santé.', en: 'I\'m in good health.' },
  { fr: 'J\'ai des antécédents de…', en: 'I have a history of…', note: '"Antécédents médicaux" = medical history' },
]

const MEDICAL_VOCAB = [
  { fr: 'un médecin traitant / un généraliste', en: 'a GP / family doctor', note: 'Register with a "médecin traitant" for reduced costs and coordinated care — the gatekeeper of the French system' },
  { fr: 'un spécialiste', en: 'a specialist', note: 'Requires a referral (une ordonnance de référence) from your médecin traitant for full reimbursement' },
  { fr: 'un chirurgien / une chirurgienne', en: 'a surgeon' },
  { fr: 'une infirmière / un infirmier', en: 'a nurse', note: 'French nurses can work independently — "les infirmiers libéraux" visit patients at home' },
  { fr: 'un(e) kinésithérapeute / kiné', en: 'a physiotherapist', note: '"Aller chez le kiné" is very common — physio is widely prescribed and well-covered by the Sécu' },
  { fr: 'un(e) dentiste', en: 'a dentist', note: 'Dental care is partially reimbursed, but supplementary insurance ("mutuelle") is important for major dental work' },
  { fr: 'une ordonnance', en: 'a prescription', note: 'The pink ordonnance paper — presented at any pharmacy. Cannot buy many medications without one.' },
  { fr: 'une pharmacie', en: 'a pharmacy', note: 'Identified by a green illuminated cross. Pharmacists can advise on minor ailments and recommend over-the-counter treatments.' },
  { fr: 'les urgences', en: 'A&E / emergency room', note: '"Aller aux urgences" = to go to A&E. French hospitals are state-run and free at point of care.' },
  { fr: 'le SAMU (Service d\'Aide Médicale Urgente)', en: 'Emergency medical service', note: 'Call 15 for medical emergencies. SAMU dispatches doctors and ambulances. Free service.' },
  { fr: 'la Sécurité Sociale / la Sécu', en: 'French national health insurance', note: 'All legal residents are covered. A standard GP consultation costs ~26.50€ — 70% reimbursed by the Sécu.' },
  { fr: 'une mutuelle', en: 'complementary top-up health insurance', note: 'Covers the 30% remaining after the Sécu — employers must now provide one to all employees by law' },
  { fr: 'le cabinet médical', en: 'the GP\'s surgery', note: '"Cabinet" is the French word for a professional\'s private office — doctor, lawyer, accountant' },
  { fr: 'une prise de sang', en: 'a blood test', note: 'Done at a "laboratoire d\'analyses médicales" — common French labs include Synlab, Inovie, Cerba' },
  { fr: 'une radio(graphie)', en: 'an X-ray', note: 'Results are given directly to the patient in France — you keep a copy for your records' },
  { fr: 'une IRM (Imagerie par Résonance Magnétique)', en: 'an MRI scan' },
  { fr: 'un scanner / une tomodensitométrie', en: 'a CT scan' },
  { fr: 'un médicament', en: 'a medication / medicine', note: 'French medications have a visible "vignette" (sticker) which you remove and stick on the reimbursement form' },
  { fr: 'des antibiotiques', en: 'antibiotics', note: '"Les antibiotiques, c\'est pas automatique" — a famous French public health campaign against over-prescribing' },
  { fr: 'un vaccin', en: 'a vaccine', note: 'Several vaccines are mandatory in France for children, including DTP, ROR, and hepatitis B' },
]

const BODY_SYSTEMS = [
  { system: 'Le système cardiovasculaire', en: 'Cardiovascular system', terms: [
    { fr: 'le cœur', en: 'heart' },
    { fr: 'une artère', en: 'an artery' },
    { fr: 'une veine', en: 'a vein' },
    { fr: 'la tension artérielle', en: 'blood pressure' },
    { fr: 'un infarctus du myocarde', en: 'a heart attack (myocardial infarction)' },
    { fr: 'un AVC (Accident Vasculaire Cérébral)', en: 'a stroke', note: '"AVC" is the French term — call 15 (SAMU) immediately' },
  ]},
  { system: 'Le système respiratoire', en: 'Respiratory system', terms: [
    { fr: 'les poumons', en: 'lungs' },
    { fr: 'la trachée', en: 'trachea / windpipe' },
    { fr: 'l\'asthme', en: 'asthma' },
    { fr: 'une bronchite', en: 'bronchitis' },
    { fr: 'une pneumonie', en: 'pneumonia' },
    { fr: 'la toux', en: 'a cough' },
  ]},
  { system: 'Le système digestif', en: 'Digestive system', terms: [
    { fr: 'l\'estomac', en: 'stomach' },
    { fr: 'l\'intestin grêle', en: 'small intestine' },
    { fr: 'le côlon', en: 'colon' },
    { fr: 'le foie', en: 'liver' },
    { fr: 'le pancréas', en: 'pancreas' },
    { fr: 'une gastro-entérite', en: 'gastroenteritis / stomach bug' },
  ]},
]

const EMERGENCY_NUMBERS = [
  { number: '15', service: 'SAMU', desc: 'Medical emergencies — doctors dispatched', icon: '🚑' },
  { number: '17', service: 'Police', desc: 'Police / security emergencies', icon: '👮' },
  { number: '18', service: 'Pompiers', desc: 'Fire brigade — also respond to medical emergencies', icon: '🚒' },
  { number: '112', service: 'European emergency', desc: 'Works anywhere in the EU — routes to appropriate service', icon: '🌍' },
  { number: '3114', service: 'Prévention Suicide', desc: 'National suicide prevention hotline (24/7)', icon: '💙' },
  { number: '15', service: 'SOS Médecins', desc: 'Home-visit GP service available evenings and weekends', icon: '🏠' },
]

export default function FrenchMedical() {
  const [tab, setTab] = useState('symptoms')
  const [activeSystem, setActiveSystem] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Medical Vocabulary | SayBonjour!" description="Essential French medical vocabulary — symptoms, doctor phrases, the French health system, body systems, and emergency numbers." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Medical French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La santé — symptoms, the French health system, doctor visits, and emergencies</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-red-600 shrink-0" />
            <strong className="text-sm text-red-800 dark:text-red-300">Emergency Numbers in France</strong>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMERGENCY_NUMBERS.map(e => (
              <span key={e.number + e.service} className="text-xs bg-white dark:bg-dark-warm-100 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded-lg">
                {e.icon} <strong>{e.number}</strong> — {e.service}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'symptoms', label: 'Symptoms' },
            { id: 'phrases', label: 'Doctor Phrases' },
            { id: 'vocab', label: 'Medical Vocab' },
            { id: 'body', label: 'Body Systems' },
          ].map(t => (
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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

        {tab === 'body' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {BODY_SYSTEMS.map((sys, i) => (
                <button key={sys.system} onClick={() => setActiveSystem(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeSystem === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {sys.en}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{BODY_SYSTEMS[activeSystem].system}</h2>
              <p className="text-xs text-gray-400 italic mb-4">{BODY_SYSTEMS[activeSystem].en}</p>
              <div className="space-y-3">
                {BODY_SYSTEMS[activeSystem].terms.map(term => (
                  <div key={term.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <SpeakButton text={term.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{term.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {term.en}</span>
                      </div>
                      {term.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {term.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
