import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const BODY_GROUPS = [
  {
    category: 'Head & Face',
    fr: 'La tête et le visage',
    emoji: '👤',
    items: [
      { fr: 'la tête', en: 'the head', gender: 'f', note: '"Avoir la tête dans les nuages" = to have one\'s head in the clouds' },
      { fr: 'le visage / la figure', en: 'the face', gender: 'm/f', note: '"Visage" is standard; "figure" is slightly literary' },
      { fr: 'les yeux (sing. l\'œil)', en: 'the eyes (eye)', gender: 'm pl', note: 'Irregular plural: œil → yeux. "Coûter les yeux de la tête" = to cost an arm and a leg' },
      { fr: 'le nez', en: 'the nose', gender: 'm', note: '"Avoir le nez fin" = to have good instincts (lit. a sharp nose)' },
      { fr: 'la bouche', en: 'the mouth', gender: 'f', note: '"Bouche à oreille" = word of mouth' },
      { fr: 'les lèvres', en: 'the lips', gender: 'f pl' },
      { fr: 'les dents', en: 'the teeth', gender: 'f pl', note: '"Avoir la dent dure" = to be harsh / unforgiving (lit. to have the hard tooth)' },
      { fr: 'les oreilles', en: 'the ears', gender: 'f pl', note: '"Les oreilles sifflent" = ears are ringing; "casser les oreilles" = to be deafeningly loud' },
      { fr: 'les cheveux', en: 'the hair (on head)', gender: 'm pl', note: 'Always plural! "Un cheveu" (one hair). "Elle a les cheveux courts" = she has short hair.' },
      { fr: 'le front', en: 'the forehead', gender: 'm', note: 'Also means "the front" (in battle, work) — "le front de travail"' },
      { fr: 'les joues', en: 'the cheeks', gender: 'f pl', note: '"Faire la bise" (cheek kiss greeting) involves both joues' },
      { fr: 'le menton', en: 'the chin', gender: 'm' },
      { fr: 'le sourcil', en: 'the eyebrow', gender: 'm' },
      { fr: 'les cils', en: 'the eyelashes', gender: 'm pl' },
      { fr: 'la nuque', en: 'the nape of the neck', gender: 'f', note: 'The back of the neck — "avoir la nuque raide" = to have a stiff neck' },
    ],
  },
  {
    category: 'Torso & Organs',
    fr: 'Le tronc et les organes',
    emoji: '🫁',
    items: [
      { fr: 'le cou', en: 'the neck', gender: 'm' },
      { fr: 'les épaules', en: 'the shoulders', gender: 'f pl', note: '"Hausser les épaules" = to shrug (the quintessential French gesture)' },
      { fr: 'la poitrine', en: 'the chest', gender: 'f' },
      { fr: 'le ventre', en: 'the stomach / tummy (external)', gender: 'm', note: '"Avoir des papillons dans le ventre" = to have butterflies (lit. butterflies in the stomach)' },
      { fr: 'l\'estomac', en: 'the stomach (organ)', gender: 'm', note: '"Avoir l\'estomac dans les talons" = to be starving (lit. stomach in one\'s heels)' },
      { fr: 'le dos', en: 'the back', gender: 'm', note: '"En avoir plein le dos" = to be fed up (lit. to have one\'s back full of it)' },
      { fr: 'la taille', en: 'the waist', gender: 'f', note: 'Also means "size" — "quelle est votre taille ?" = what size are you? (height AND clothes size)' },
      { fr: 'les hanches', en: 'the hips', gender: 'f pl' },
      { fr: 'le cœur', en: 'the heart', gender: 'm', note: '"Avoir le cœur sur la main" = to be very generous (lit. heart in the hand)' },
      { fr: 'les poumons', en: 'the lungs', gender: 'm pl' },
      { fr: 'le foie', en: 'the liver', gender: 'm', note: 'Hugely important in French culture — "avoir mal au foie" (liver pain) is the classic French complaint after rich food' },
      { fr: 'les reins', en: 'the kidneys', gender: 'm pl', note: '"Avoir les reins solides" = to be financially robust (lit. to have strong kidneys)' },
    ],
  },
  {
    category: 'Arms & Hands',
    fr: 'Les bras et les mains',
    emoji: '✋',
    items: [
      { fr: 'le bras', en: 'the arm', gender: 'm', note: '"Avoir le bras long" = to have influence / connections (lit. to have a long arm)' },
      { fr: 'l\'avant-bras', en: 'the forearm', gender: 'm' },
      { fr: 'le coude', en: 'the elbow', gender: 'm', note: '"Jouer des coudes" = to elbow one\'s way (push through a crowd or competition)' },
      { fr: 'le poignet', en: 'the wrist', gender: 'm' },
      { fr: 'la main', en: 'the hand', gender: 'f', note: '"Donner un coup de main" = to lend a hand (very common phrase)' },
      { fr: 'les doigts', en: 'the fingers', gender: 'm pl', note: '"Avoir les doigts de fée" = to be very nimble/artistic (lit. fairy fingers)' },
      { fr: 'le pouce', en: 'the thumb', gender: 'm', note: 'Also means "inch" — "un pouce" = 2.54cm. "Faire du pouce" (Québec) = to hitchhike.' },
      { fr: 'l\'index', en: 'the index finger', gender: 'm' },
      { fr: 'le majeur', en: 'the middle finger', gender: 'm' },
      { fr: 'l\'annulaire', en: 'the ring finger', gender: 'm', note: 'The French wear wedding rings on the annulaire of the left hand' },
      { fr: 'l\'auriculaire / le petit doigt', en: 'the little finger / pinky', gender: 'm' },
      { fr: 'l\'ongle', en: 'the fingernail', gender: 'm' },
      { fr: 'la paume', en: 'the palm', gender: 'f' },
    ],
  },
  {
    category: 'Legs & Feet',
    fr: 'Les jambes et les pieds',
    emoji: '🦵',
    items: [
      { fr: 'la jambe', en: 'the leg', gender: 'f', note: '"Avoir des fourmis dans les jambes" = to have pins and needles in one\'s legs' },
      { fr: 'la cuisse', en: 'the thigh', gender: 'f', note: '"Cuisses de grenouille" = frog legs — the famous French delicacy' },
      { fr: 'le genou', en: 'the knee', gender: 'm', note: 'Irregular plural: un genou → des genoux. "Tomber à genoux" = to fall to one\'s knees' },
      { fr: 'le mollet', en: 'the calf', gender: 'm' },
      { fr: 'la cheville', en: 'the ankle', gender: 'f', note: '"Se fouler la cheville" = to sprain one\'s ankle — one of the most common sports injuries' },
      { fr: 'le pied', en: 'the foot', gender: 'm', note: '"Avoir les pieds sur terre" = to be down-to-earth. "Casser les pieds à quelqu\'un" = to annoy someone.' },
      { fr: 'les orteils', en: 'the toes', gender: 'm pl' },
      { fr: 'le talon', en: 'the heel', gender: 'm', note: '"Le talon d\'Achille" = the Achilles heel (used in French too)' },
    ],
  },
]

const BODY_IDIOMS = [
  { fr: 'avoir le cœur sur la main', en: 'to be very generous', note: 'Lit. "to have the heart in the hand" — one of the most common compliments in French' },
  { fr: 'avoir les pieds sur terre', en: 'to be down-to-earth / grounded', note: 'Lit. "to have feet on the ground"' },
  { fr: 'coûter les yeux de la tête', en: 'to cost an arm and a leg', note: 'Lit. "to cost the eyes from the head" — the French version of "cost a fortune"' },
  { fr: 'avoir la tête dans les nuages', en: 'to have one\'s head in the clouds / to be a daydreamer' },
  { fr: 'donner un coup de main', en: 'to lend a hand / to help out', note: 'Very common in everyday French — "tu peux me donner un coup de main ?"' },
  { fr: 'avoir le bras long', en: 'to have influence / important connections', note: 'Lit. "to have a long arm" — to know the right people' },
  { fr: 'casser les pieds de quelqu\'un', en: 'to annoy someone / to be a pain', note: 'Lit. "to break someone\'s feet" — a vivid expression of irritation' },
  { fr: 'tourner la tête à quelqu\'un', en: 'to go to someone\'s head / to turn someone\'s head', note: 'Used for fame, beauty, or flattery going to someone\'s head' },
  { fr: 'avoir le dos large', en: 'to take the blame / to be blamed for everything', note: 'Lit. "to have a wide back" — said when someone is made a scapegoat' },
  { fr: 'en avoir plein le dos', en: 'to be fed up / sick of something', note: 'Lit. "to have one\'s back full of it"' },
  { fr: 'avoir la main verte', en: 'to have green fingers / to be good with plants', note: 'Same metaphor as in English — "elle a la main verte"' },
  { fr: 'mettre les pieds dans le plat', en: 'to put one\'s foot in it / to blunder', note: 'Lit. "to put feet in the dish"' },
  { fr: 'garder la tête sur les épaules', en: 'to keep one\'s head / to stay sensible', note: 'Lit. "to keep the head on the shoulders"' },
  { fr: 'hausser les épaules', en: 'to shrug (one\'s shoulders)', note: 'The quintessential French gesture — implies indifference or disagreement' },
]

const HEALTH_PHRASES = [
  { fr: 'J\'ai mal à la tête.', en: 'I have a headache.' },
  { fr: 'J\'ai mal au dos.', en: 'I have back pain.' },
  { fr: 'J\'ai mal à la gorge.', en: 'I have a sore throat.' },
  { fr: 'J\'ai mal au ventre.', en: 'I have a stomach ache.' },
  { fr: 'J\'ai mal aux dents.', en: 'I have toothache.' },
  { fr: 'Je me suis fait mal au genou.', en: 'I hurt my knee.' },
  { fr: 'Il a le bras cassé.', en: 'He has a broken arm.' },
  { fr: 'Elle s\'est foulé la cheville.', en: 'She sprained her ankle.' },
  { fr: 'Montrez-moi où vous avez mal.', en: 'Show me where it hurts.' },
  { fr: 'J\'ai des courbatures.', en: 'I have muscle aches / am sore.', note: '"Les courbatures" = delayed muscle soreness after exercise' },
  { fr: 'J\'ai mal partout.', en: 'I ache all over.' },
  { fr: 'Où est-ce que tu t\'es blessé(e) ?', en: 'Where did you injure yourself?' },
]

const GRAMMAR_NOTES = [
  { title: 'Body parts take articles, not possessives', content: 'French uses definite articles (le, la, les) with body parts when the owner is clear from context: "Je me suis cassé le bras" (not "mon bras"), "Elle a les yeux bleus" (not "ses yeux"). The reflexive verb makes ownership clear.' },
  { title: 'Gender of body parts', content: 'Most French body parts are masculine (le bras, le pied, le nez, le dos). Several are feminine (la main, la jambe, la tête, la bouche). Internal organs tend to be masculine (le cœur, le foie, l\'estomac).' },
  { title: 'Irregular plurals', content: '"Un œil" → "des yeux" (not "des œils"). "Un genou" → "des genoux". These must be memorised. Most other body parts follow regular patterns.' },
  { title: 'J\'ai mal à…', content: 'To express pain in French, use "avoir mal à": "j\'ai mal à la tête" (headache), "j\'ai mal au dos" (back pain), "j\'ai mal aux dents" (toothache). Note the contraction: à + le = au, à + les = aux.' },
]

export default function FrenchBodyParts() {
  const [tab, setTab] = useState('body')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Body Parts | SayBonjour!" description="Learn French body parts vocabulary — head, face, torso, arms, legs — with idioms, grammar notes, and health phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Body Parts in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le corps humain — vocabulary, idioms, grammar notes, and health phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'body', label: 'Body Parts' },
            { id: 'idioms', label: 'Body Idioms' },
            { id: 'health', label: 'Health Phrases' },
            { id: 'grammar', label: 'Grammar Notes' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'body' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {BODY_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.emoji} {g.category}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 italic mb-4">{BODY_GROUPS[activeGroup].fr}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BODY_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.en}</p>
                    {item.gender && <span className="text-xs text-blue-500 italic">{item.gender}</span>}
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-4">
            {BODY_IDIOMS.map((idiom, i) => (
              <motion.div key={idiom.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-start gap-3 mb-1">
                  <SpeakButton text={idiom.fr} size="sm" />
                  <p className="font-semibold italic text-gray-900 dark:text-cream-50 font-playfair">"{idiom.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8 mb-1">{idiom.en}</p>
                {idiom.note && <p className="text-xs text-amber-700 dark:text-amber-400 italic ml-8">💡 {idiom.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'health' && (
          <div className="space-y-3">
            {HEALTH_PHRASES.map((p, i) => (
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

        {tab === 'grammar' && (
          <div className="space-y-4">
            {GRAMMAR_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 mb-2">{note.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{note.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
