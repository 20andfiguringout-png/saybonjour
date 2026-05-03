import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const BODY_GROUPS = [
  {
    category: 'Head & Face',
    emoji: '👤',
    items: [
      { fr: 'la tête', en: 'the head' },
      { fr: 'le visage / la figure', en: 'the face' },
      { fr: 'les yeux (sing. l\'œil)', en: 'the eyes (eye)', note: 'Irregular plural: œil → yeux' },
      { fr: 'le nez', en: 'the nose' },
      { fr: 'la bouche', en: 'the mouth' },
      { fr: 'les lèvres', en: 'the lips' },
      { fr: 'les dents', en: 'the teeth' },
      { fr: 'les oreilles', en: 'the ears' },
      { fr: 'les cheveux', en: 'the hair (on head)', note: 'Always plural in French. A single hair: un cheveu' },
      { fr: 'le front', en: 'the forehead' },
      { fr: 'les joues', en: 'the cheeks' },
      { fr: 'le menton', en: 'the chin' },
    ],
  },
  {
    category: 'Torso',
    emoji: '🫁',
    items: [
      { fr: 'le cou', en: 'the neck' },
      { fr: 'les épaules', en: 'the shoulders' },
      { fr: 'la poitrine', en: 'the chest' },
      { fr: 'le ventre / l\'estomac', en: 'the stomach / tummy' },
      { fr: 'le dos', en: 'the back' },
      { fr: 'la taille', en: 'the waist', note: 'Also means "size" (clothing size)' },
      { fr: 'les hanches', en: 'the hips' },
      { fr: 'le cœur', en: 'the heart' },
      { fr: 'les poumons', en: 'the lungs' },
    ],
  },
  {
    category: 'Arms & Hands',
    emoji: '✋',
    items: [
      { fr: 'le bras', en: 'the arm' },
      { fr: 'le coude', en: 'the elbow' },
      { fr: 'le poignet', en: 'the wrist' },
      { fr: 'la main', en: 'the hand' },
      { fr: 'les doigts', en: 'the fingers' },
      { fr: 'le pouce', en: 'the thumb', note: 'Also means "inch" in measurement' },
      { fr: 'l\'ongle', en: 'the fingernail' },
    ],
  },
  {
    category: 'Legs & Feet',
    emoji: '🦵',
    items: [
      { fr: 'la jambe', en: 'the leg' },
      { fr: 'la cuisse', en: 'the thigh' },
      { fr: 'le genou', en: 'the knee', note: 'Irregular plural: un genou → des genoux' },
      { fr: 'le mollet', en: 'the calf' },
      { fr: 'la cheville', en: 'the ankle' },
      { fr: 'le pied', en: 'the foot' },
      { fr: 'les orteils', en: 'the toes' },
    ],
  },
]

const BODY_IDIOMS = [
  { fr: 'avoir le cœur sur la main', en: 'to be very generous', note: 'Lit. "to have the heart in the hand"' },
  { fr: 'avoir les pieds sur terre', en: 'to be down-to-earth', note: 'Lit. "to have feet on the ground"' },
  { fr: 'coûter les yeux de la tête', en: 'to cost an arm and a leg', note: 'Lit. "to cost the eyes from the head"' },
  { fr: 'avoir la tête dans les nuages', en: 'to have one\'s head in the clouds' },
  { fr: 'donner un coup de main', en: 'to lend a hand', note: 'Very common — use freely!' },
  { fr: 'avoir le bras long', en: 'to have influence / connections', note: 'Lit. "to have a long arm"' },
  { fr: 'casser les pieds de quelqu\'un', en: 'to annoy someone', note: 'Lit. "to break someone\'s feet"' },
  { fr: 'tourner la tête à quelqu\'un', en: 'to turn someone\'s head / to go to someone\'s head' },
]

const HEALTH_PHRASES = [
  { fr: 'J\'ai mal à la tête.', en: 'I have a headache.' },
  { fr: 'J\'ai mal au dos.', en: 'I have back pain.' },
  { fr: 'J\'ai mal à la gorge.', en: 'I have a sore throat.' },
  { fr: 'Je me suis fait mal au genou.', en: 'I hurt my knee.' },
  { fr: 'Il a le bras cassé.', en: 'He has a broken arm.' },
  { fr: 'Elle s\'est foulé la cheville.', en: 'She sprained her ankle.' },
  { fr: 'Montrez-moi où vous avez mal.', en: 'Show me where it hurts.' },
]

export default function FrenchBodyParts() {
  const [tab, setTab] = useState('body')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Body Parts | SayBonjour!" description="Learn French body parts vocabulary — head, face, torso, arms, legs — with idioms and health phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Body Parts in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le corps humain — vocabulary, idioms, and health phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'body', label: 'Body Parts' }, { id: 'idioms', label: 'Body Idioms' }, { id: 'health', label: 'Health Phrases' }].map(t => (
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
            <div className="grid sm:grid-cols-2 gap-3">
              {BODY_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2">
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                    <p className="text-xs text-gray-400">{item.en}</p>
                    {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-4">
            {BODY_IDIOMS.map((idiom, i) => (
              <motion.div key={idiom.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
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
