import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ANIMAL_GROUPS = [
  {
    category: 'Pets & Farm',
    emoji: '🐕',
    items: [
      { fr: 'un chien / une chienne', en: 'a dog', sound: 'Ouaf ouaf !' },
      { fr: 'un chat / une chatte', en: 'a cat', sound: 'Miaou !' },
      { fr: 'un lapin', en: 'a rabbit' },
      { fr: 'un cochon d\'Inde', en: 'a guinea pig', note: 'Lit. "Indian pig"' },
      { fr: 'un perroquet', en: 'a parrot' },
      { fr: 'une vache', en: 'a cow', sound: 'Meuh !' },
      { fr: 'un cheval / des chevaux', en: 'a horse / horses' },
      { fr: 'un mouton', en: 'a sheep', sound: 'Bêê !' },
      { fr: 'un cochon', en: 'a pig', sound: 'Groin groin !' },
      { fr: 'une poule', en: 'a hen', sound: 'Cot cot !' },
      { fr: 'un coq', en: 'a rooster', sound: 'Cocorico !' },
      { fr: 'un âne', en: 'a donkey', sound: 'Hi-han !' },
    ],
  },
  {
    category: 'Wild Animals',
    emoji: '🦁',
    items: [
      { fr: 'un lion / une lionne', en: 'a lion / lioness' },
      { fr: 'un tigre', en: 'a tiger' },
      { fr: 'un éléphant', en: 'an elephant' },
      { fr: 'une girafe', en: 'a giraffe' },
      { fr: 'un singe', en: 'a monkey / ape' },
      { fr: 'un ours', en: 'a bear' },
      { fr: 'un loup', en: 'a wolf' },
      { fr: 'un renard', en: 'a fox' },
      { fr: 'un dauphin', en: 'a dolphin' },
      { fr: 'une baleine', en: 'a whale' },
      { fr: 'un requin', en: 'a shark' },
      { fr: 'un aigle', en: 'an eagle' },
    ],
  },
  {
    category: 'Insects & Small',
    emoji: '🐛',
    items: [
      { fr: 'une abeille', en: 'a bee', note: 'abeille also means bee as in honeybee (miel = honey)' },
      { fr: 'un papillon', en: 'a butterfly', note: 'Also means swimming stroke "butterfly"' },
      { fr: 'une araignée', en: 'a spider' },
      { fr: 'une fourmi', en: 'an ant' },
      { fr: 'un moustique', en: 'a mosquito' },
      { fr: 'une mouche', en: 'a fly' },
      { fr: 'un ver de terre', en: 'an earthworm' },
      { fr: 'une grenouille', en: 'a frog', note: 'The French are nicknamed "les grenouilles" by some!' },
      { fr: 'un serpent', en: 'a snake' },
      { fr: 'une tortue', en: 'a tortoise / turtle' },
    ],
  },
]

const ANIMAL_PHRASES = [
  { fr: 'Il pleut des cordes.', en: 'It\'s raining cats and dogs.', note: 'Lit. "it\'s raining ropes"' },
  { fr: 'Quand les poules auront des dents.', en: 'When pigs fly.', note: 'Lit. "when hens have teeth"' },
  { fr: 'Avoir le cafard.', en: 'To feel blue / down.', note: 'Lit. "to have the cockroach"' },
  { fr: 'Poser un lapin à quelqu\'un.', en: 'To stand someone up.', note: 'Lit. "to put a rabbit on someone"' },
  { fr: 'Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué.', en: 'Don\'t count your chickens.', note: 'Lit. "don\'t sell the bearskin before killing the bear"' },
  { fr: 'Avoir d\'autres chats à fouetter.', en: 'To have bigger fish to fry.', note: 'Lit. "to have other cats to whip"' },
  { fr: 'Quand le chat n\'est pas là, les souris dansent.', en: 'When the cat\'s away, the mice will play.' },
]

export default function FrenchAnimals() {
  const [tab, setTab] = useState('animals')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Animals | SayBonjour!" description="Learn French animal vocabulary — pets, farm animals, wildlife, insects — plus animal idioms." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Animals in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les animaux — plus French animal sounds and idioms</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'animals', label: 'Animals' }, { id: 'idioms', label: 'Animal Idioms' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'animals' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ANIMAL_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.emoji} {g.category}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ANIMAL_GROUPS[activeGroup].items.map((animal, i) => (
                <motion.div key={animal.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2">
                  <SpeakButton text={animal.fr.split('/')[0].trim()} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{animal.fr}</p>
                    <p className="text-xs text-gray-400">{animal.en}</p>
                    {animal.sound && <p className="text-xs text-emerald-600 dark:text-emerald-400 italic">🔊 {animal.sound}</p>}
                    {animal.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{animal.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-4">
            {ANIMAL_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-start gap-3 mb-2">
                  <SpeakButton text={p.fr} size="sm" />
                  <p className="font-semibold italic text-gray-900 dark:text-cream-50 font-playfair">"{p.fr}"</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 ml-8">English equiv.: <span className="font-medium">{p.en}</span></p>
                {p.note && <p className="text-xs text-amber-700 dark:text-amber-400 italic ml-8">💡 {p.note}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
