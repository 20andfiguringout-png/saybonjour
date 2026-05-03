import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const BODY_VOCAB = [
  {
    category: 'The Head — La tête',
    items: [
      { fr: 'la tête', en: 'head', extra: 'Perdre la tête = to lose one\'s mind' },
      { fr: 'le visage / la figure', en: 'face', extra: 'Faire bonne figure = to put on a brave face' },
      { fr: 'le front', en: 'forehead', extra: 'De front = head-on, simultaneously' },
      { fr: 'les sourcils', en: 'eyebrows', extra: 'Froncer les sourcils = to frown' },
      { fr: 'les yeux (un œil)', en: 'eyes (one eye)', extra: 'Avoir l\'œil = to have a good eye for things' },
      { fr: 'les cils', en: 'eyelashes', extra: 'Also: la paupière = eyelid' },
      { fr: 'le nez', en: 'nose', extra: 'Mettre le nez dehors = to step outside' },
      { fr: 'les joues', en: 'cheeks', extra: 'Embrasser sur les joues = to kiss on the cheeks' },
      { fr: 'la bouche', en: 'mouth', extra: 'Bouche bée = mouth agape, dumbfounded' },
      { fr: 'les lèvres', en: 'lips', extra: 'Sur le bout des lèvres = on the tip of one\'s tongue' },
      { fr: 'les dents', en: 'teeth', extra: 'Serrer les dents = to grit your teeth' },
      { fr: 'la langue', en: 'tongue / language', extra: 'Avoir la langue bien pendue = to be a chatterbox' },
      { fr: 'les oreilles', en: 'ears', extra: 'Dresser l\'oreille = to prick up your ears' },
      { fr: 'le menton', en: 'chin', extra: 'Also: la mâchoire = jaw' },
      { fr: 'le cou', en: 'neck', extra: 'Se casser le cou = to ruin yourself (figuratively)' },
    ],
  },
  {
    category: 'The Torso — Le tronc',
    items: [
      { fr: 'les épaules', en: 'shoulders', extra: 'Hausser les épaules = to shrug' },
      { fr: 'la poitrine', en: 'chest / breast', extra: 'Also used for chest of drawers!' },
      { fr: 'le dos', en: 'back', extra: 'Avoir quelqu\'un dans le dos = to have someone out for you' },
      { fr: 'la colonne vertébrale', en: 'spine / backbone', extra: 'Aussi: le dos = informally' },
      { fr: 'le ventre', en: 'stomach / belly', extra: 'Avoir les yeux plus grands que le ventre = eyes bigger than stomach' },
      { fr: 'le nombril', en: 'navel / belly button', extra: 'Se prendre pour le nombril du monde = to think the world revolves around you' },
      { fr: 'la taille', en: 'waist / size', extra: 'Taille fine = slim waist; also means clothing size' },
      { fr: 'les hanches', en: 'hips', extra: 'Les mains sur les hanches = hands on hips' },
      { fr: 'les fesses', en: 'buttocks / bottom', extra: 'Also: le derrière (polite), le cul (rude)' },
    ],
  },
  {
    category: 'Arms & Hands — Les bras et les mains',
    items: [
      { fr: 'les bras', en: 'arms', extra: 'Bras dessus, bras dessous = arm in arm' },
      { fr: 'le coude', en: 'elbow', extra: 'Jouer des coudes = to elbow your way through' },
      { fr: 'le poignet', en: 'wrist', extra: 'Also: la montre au poignet = watch on the wrist' },
      { fr: 'la main', en: 'hand', extra: 'Avoir la main heureuse = to have a lucky hand; to be skilled' },
      { fr: 'la paume', en: 'palm', extra: 'Avoir dans la paume de la main = to have in the palm of your hand' },
      { fr: 'les doigts', en: 'fingers', extra: 'Mettre le doigt sur = to put your finger on (identify)' },
      { fr: 'le pouce', en: 'thumb', extra: 'Se tourner les pouces = to twiddle your thumbs (be idle)' },
      { fr: 'l\'index', en: 'index finger', extra: 'Also: le majeur (middle), l\'annulaire (ring), l\'auriculaire (little)' },
      { fr: 'les ongles', en: 'nails (finger/toe)', extra: 'Se ronger les ongles = to bite your nails (anxiety)' },
    ],
  },
  {
    category: 'Legs & Feet — Les jambes et les pieds',
    items: [
      { fr: 'les jambes', en: 'legs', extra: 'Couper les jambes à quelqu\'un = to cut the legs out from under someone' },
      { fr: 'le genou', en: 'knee', extra: 'Se mettre à genoux = to kneel down' },
      { fr: 'la cheville', en: 'ankle', extra: 'Ne pas arriver à la cheville de = not to be a patch on (not as good as)' },
      { fr: 'le pied', en: 'foot', extra: 'Mettre les pieds dans le plat = to put your foot in it' },
      { fr: 'les orteils', en: 'toes', extra: 'Le gros orteil = the big toe' },
      { fr: 'le talon', en: 'heel', extra: 'Les talons hauts = high heels; talons aiguilles = stilettos' },
    ],
  },
]

const BODY_EXPRESSIONS = [
  { fr: 'Avoir le cœur sur la main', en: 'To be very generous (lit. to have your heart in your hand)' },
  { fr: 'Garder la tête hors de l\'eau', en: 'To keep your head above water' },
  { fr: 'Casser les pieds à quelqu\'un', en: 'To annoy someone (lit. to break their feet)' },
  { fr: 'Avoir le bras long', en: 'To have influence / pull (lit. to have a long arm)' },
  { fr: 'Tourner le dos à', en: 'To turn your back on' },
  { fr: 'Avoir le ventre creux', en: 'To be starving (lit. to have an empty belly)' },
  { fr: 'Mettre la main à la pâte', en: 'To roll up your sleeves / pitch in (lit. put your hand in the dough)' },
  { fr: 'Avoir les mains libres', en: 'To have free hands / a free hand (to act)' },
  { fr: 'Ne pas lever le petit doigt', en: 'Not to lift a finger' },
  { fr: 'Avoir les deux pieds dans le même sabot', en: 'To be clumsy (lit. both feet in the same clog)' },
]

export default function FrenchBodyLanguage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('parts')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Body Vocabulary | SayBonjour!" description="Learn French body parts with idioms, expressions and cultural notes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Body Parts in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le corps humain — body vocabulary & body idioms</p>
        </div>

        <div className="flex gap-3 mb-6">
          {[{ id: 'parts', label: 'Body Parts' }, { id: 'idioms', label: 'Body Idioms' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'parts' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {BODY_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{BODY_VOCAB[activeCategory].category}</h2>
              <div className="space-y-3">
                {BODY_VOCAB[activeCategory].items.map(item => (
                  <motion.div key={item.fr} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.extra && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">{item.extra}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-3">
            {BODY_EXPRESSIONS.map((expr, i) => (
              <motion.div key={expr.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={expr.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50 italic">"{expr.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{expr.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
