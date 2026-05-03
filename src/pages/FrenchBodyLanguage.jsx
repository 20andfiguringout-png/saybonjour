import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const BODY_VOCAB = [
  {
    category: 'The Head — La tête',
    emoji: '🧠',
    items: [
      { fr: 'la tête', en: 'head', extra: '"Perdre la tête" = to lose one\'s mind. "En tête" = at the head/top. "Avoir la grosse tête" = to be big-headed.' },
      { fr: 'le visage / la figure', en: 'face', extra: '"Faire bonne figure" = to put on a brave face. "La figure" is slightly more literary than "le visage".' },
      { fr: 'le front', en: 'forehead', extra: '"De front" = head-on, simultaneously. "Avoir du front" = to have nerve/cheek.' },
      { fr: 'les sourcils', en: 'eyebrows', extra: '"Froncer les sourcils" = to frown (lit. to gather the eyebrows). "Lever un sourcil" = to raise an eyebrow.' },
      { fr: 'les yeux (un œil)', en: 'eyes (one eye)', extra: '"Avoir l\'œil" = to have a sharp eye. "Œil de lynx" = eagle eye. "Coup d\'œil" = a glance.' },
      { fr: 'les cils', en: 'eyelashes', extra: '"Les cils" = lashes. "La paupière" = eyelid. "La pupille" = pupil.' },
      { fr: 'le nez', en: 'nose', extra: '"Mettre le nez dehors" = to step outside. "Avoir le nez creux" = to have good instincts.' },
      { fr: 'les joues', en: 'cheeks', extra: '"Embrasser sur les joues" = to kiss on the cheeks (la bise). "Les joues roses" = rosy cheeks.' },
      { fr: 'la bouche', en: 'mouth', extra: '"Bouche bée" = mouth agape, dumbfounded. "Garder le silence" = lit. to guard the mouth.' },
      { fr: 'les lèvres', en: 'lips', extra: '"Sur le bout des lèvres" = on the tip of one\'s tongue. "Les lèvres pincées" = pursed lips.' },
      { fr: 'les dents', en: 'teeth', extra: '"Serrer les dents" = to grit your teeth. "Se faire les dents" = to cut one\'s teeth (to practise).' },
      { fr: 'la langue', en: 'tongue / language', extra: '"Avoir la langue bien pendue" = to be a chatterbox. "La langue" = both tongue and language.' },
      { fr: 'les oreilles', en: 'ears', extra: '"Dresser l\'oreille" = to prick up your ears. "Avoir les oreilles qui sifflent" = ears ringing.' },
      { fr: 'le menton', en: 'chin', extra: '"La mâchoire" = jaw. "Garder le menton haut" = to keep your chin up.' },
      { fr: 'le cou', en: 'neck', extra: '"Se casser le cou" = to ruin yourself (figuratively). "Tête-à-tête" = face-to-face.' },
      { fr: 'les cheveux', en: 'hair (on the head)', extra: '"Les cheveux châtains" = brown hair. "Être à un cheveu de" = to be within a hair\'s breadth of.' },
    ],
  },
  {
    category: 'The Torso — Le tronc',
    emoji: '💪',
    items: [
      { fr: 'les épaules', en: 'shoulders', extra: '"Hausser les épaules" = to shrug (the quintessential French gesture). "Porter le monde sur ses épaules" = to carry the world on your shoulders.' },
      { fr: 'la poitrine', en: 'chest / breast', extra: '"La poitrine" = chest (for both sexes). "Le torse" = torso.' },
      { fr: 'le dos', en: 'back', extra: '"En avoir plein le dos" = to be fed up. "Tourner le dos à" = to turn your back on.' },
      { fr: 'la colonne vertébrale', en: 'spine / backbone', extra: '"Avoir de la colonne" or colloquially "avoir du cran" = to have backbone/guts.' },
      { fr: 'le ventre', en: 'stomach / belly', extra: '"Avoir les yeux plus grands que le ventre" = eyes bigger than stomach. "À plat ventre" = flat on your stomach.' },
      { fr: 'le nombril', en: 'navel / belly button', extra: '"Se prendre pour le nombril du monde" = to think the world revolves around you.' },
      { fr: 'la taille', en: 'waist / size (clothing)', extra: '"Taille fine" = slim waist. "Quelle est votre taille ?" = what is your size? (clothing)' },
      { fr: 'les hanches', en: 'hips', extra: '"Les mains sur les hanches" = hands on hips (assertive stance).' },
      { fr: 'les fesses', en: 'buttocks / bottom', extra: '"Le derrière" = polite. "Les fesses" = standard. "Le cul" = vulgar but used.' },
    ],
  },
  {
    category: 'Arms & Hands — Les bras et les mains',
    emoji: '🤝',
    items: [
      { fr: 'les bras', en: 'arms', extra: '"Bras dessus, bras dessous" = arm in arm. "Les bras m\'en tombent" = I\'m gobsmacked.' },
      { fr: 'le coude', en: 'elbow', extra: '"Jouer des coudes" = to elbow your way through. "Coup de coude" = nudge.' },
      { fr: 'le poignet', en: 'wrist', extra: '"La montre au poignet" = watch on the wrist. "Un poignet solide" = a strong wrist.' },
      { fr: 'la main', en: 'hand', extra: '"Avoir la main heureuse" = to have a lucky hand / be skilled. "Donner un coup de main" = to give a hand.' },
      { fr: 'la paume', en: 'palm', extra: '"Avoir dans la paume de la main" = to have in the palm of your hand.' },
      { fr: 'les doigts', en: 'fingers', extra: '"Mettre le doigt sur" = to put your finger on (identify). "Les doigts de pied" = toes.' },
      { fr: 'le pouce', en: 'thumb', extra: '"Se tourner les pouces" = to twiddle your thumbs. "Faire de l\'auto-stop / faire du pouce" = to hitchhike.' },
      { fr: 'l\'index', en: 'index / pointer finger', extra: '"Pointer du doigt" = to point at. Also: le majeur (middle), l\'annulaire (ring), l\'auriculaire (little finger).' },
      { fr: 'les ongles', en: 'nails (finger)', extra: '"Se ronger les ongles" = to bite your nails (anxiety habit).' },
    ],
  },
  {
    category: 'Legs & Feet — Les jambes et les pieds',
    emoji: '🦵',
    items: [
      { fr: 'les jambes', en: 'legs', extra: '"Couper les jambes" = to knock the wind out of someone. "Avoir les jambes en coton" = to have wobbly legs (from fear/shock).' },
      { fr: 'le genou', en: 'knee', extra: '"Se mettre à genoux" = to kneel down. "Un genou à terre" = one knee down.' },
      { fr: 'la cheville', en: 'ankle', extra: '"Ne pas arriver à la cheville de quelqu\'un" = not to be a patch on someone (not as good).' },
      { fr: 'le pied', en: 'foot', extra: '"Mettre les pieds dans le plat" = to put your foot in it. "Casser les pieds" = to annoy.' },
      { fr: 'les orteils', en: 'toes', extra: '"Le gros orteil" = the big toe. "Le petit orteil" = the little toe.' },
      { fr: 'le talon', en: 'heel', extra: '"Les talons hauts" = high heels. "Les talons aiguilles" = stilettos. "Achille" = Achilles heel.' },
      { fr: 'la plante du pied', en: 'sole of the foot', extra: '"Chatouiller la plante des pieds" = to tickle the soles of the feet.' },
    ],
  },
  {
    category: 'Organs & Internal — Les organes',
    emoji: '❤️',
    items: [
      { fr: 'le cœur', en: 'heart', extra: '"Avoir le cœur sur la main" = to be very generous. "De bon cœur" = wholeheartedly.' },
      { fr: 'les poumons', en: 'lungs', extra: '"Crier à pleins poumons" = to shout at the top of one\'s lungs.' },
      { fr: 'le cerveau', en: 'brain', extra: '"Un cerveau" = a very intelligent person (colloquial). "Se creuser le cerveau" = to rack your brain.' },
      { fr: 'le foie', en: 'liver', extra: '"Avoir les foies" = to be scared (colloquial). Important organ in French gastronomy — "foie gras".' },
      { fr: 'le rein', en: 'kidney', extra: '"Les reins" (pl) = the lower back/kidneys. "En avoir dans les reins" = to be tough.' },
    ],
  },
]

const BODY_EXPRESSIONS = [
  { fr: 'Avoir le cœur sur la main', en: 'To be very generous (lit. to have your heart in your hand)', note: 'Said of someone who gives freely and warmly.' },
  { fr: 'Garder la tête hors de l\'eau', en: 'To keep your head above water', note: 'Managing to survive despite difficulties.' },
  { fr: 'Casser les pieds à quelqu\'un', en: 'To annoy/bore someone relentlessly (lit. to break their feet)', note: '"Tu me casses les pieds !" = you\'re driving me mad.' },
  { fr: 'Avoir le bras long', en: 'To have influence / connections (lit. to have a long arm)', note: 'Having reach and power beyond your immediate circle.' },
  { fr: 'Tourner le dos à quelqu\'un', en: 'To turn your back on someone', note: 'To abandon or reject someone.' },
  { fr: 'Avoir le ventre creux', en: 'To be starving (lit. to have an empty belly)', note: 'Also: "avoir l\'estomac dans les talons" = to be ravenously hungry.' },
  { fr: 'Mettre la main à la pâte', en: 'To roll up your sleeves / pitch in (lit. put your hand in the dough)', note: 'To get actively involved in physical work.' },
  { fr: 'Avoir les mains libres', en: 'To have free rein / a free hand (lit. free hands)', note: 'To have the authority and freedom to act.' },
  { fr: 'Ne pas lever le petit doigt', en: 'Not to lift a finger', note: 'To do absolutely nothing to help.' },
  { fr: 'Avoir les deux pieds dans le même sabot', en: 'To be clumsy / slow (lit. both feet in the same clog)', note: 'Clumsy or incompetent — stuck unable to move forward.' },
  { fr: 'Hausser les épaules', en: 'To shrug (lit. to raise the shoulders)', note: 'The quintessential French gesture — dismissiveness, indifference, or "what can you do?".' },
  { fr: 'Avoir un œil de lynx', en: 'To have eagle eyes / lynx eyes', note: '"Lynx" = lynx. To see sharply and notice everything.' },
  { fr: 'Prêter l\'oreille', en: 'To lend an ear / to listen attentively', note: '"Prêter" = to lend. To give someone your full attention.' },
  { fr: 'Avoir la langue bien pendue', en: 'To have the gift of the gab (lit. to have a well-hung tongue)', note: 'To be a fluent, unstoppable talker.' },
  { fr: 'Garder un œil sur quelqu\'un', en: 'To keep an eye on someone', note: 'Same as English — to watch over or monitor.' },
]

const FRENCH_GESTURES = [
  { gesture: 'Le haussement d\'épaules', desc: 'The shrug — "bof", indifference, "what can you do?" The most French of all gestures. Accompanies "bof", "comme ci, comme ça", or silence.', emoji: '🤷' },
  { gesture: 'La moue', desc: 'Pursed lips or a pout — expressing doubt, scepticism, or mild dissatisfaction. Often accompanied by a slight tilt of the head.', emoji: '😒' },
  { gesture: '"Mon œil !"', desc: 'Pulling down the lower eyelid with one finger — "I don\'t believe a word of it!" / "Oh yeah, right!" A classic French scepticism gesture.', emoji: '👁️' },
  { gesture: 'La bise', desc: 'The cheek kiss — greeting friends and acquaintances. 1–4 cheek kisses depending on region. Paris: typically 2. Never actual lip contact — air kiss cheek-to-cheek.', emoji: '😘' },
  { gesture: '"Ça sent bon !"', desc: 'Pinching the fingers together and kissing them — expressing that something is delicious, excellent, or perfect. The "chef\'s kiss" gesture is genuinely French.', emoji: '🤌' },
  { gesture: 'Se gratter la tête', desc: 'Scratching the head — confusion, perplexity, or uncertainty. Universal but especially associated with Astérix cartoons and French rural stereotypes.', emoji: '🤔' },
]

export default function FrenchBodyLanguage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('parts')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Body Vocabulary | SayBonjour!" description="French body parts vocabulary — head to toe, body idioms, expressions, and distinctly French gestures." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Body Parts in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le corps humain — vocabulary, body idioms, and French gestures</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'parts', label: 'Body Parts' },
            { id: 'idioms', label: 'Body Idioms' },
            { id: 'gestures', label: 'French Gestures' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {BODY_VOCAB[activeCategory].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                    </div>
                    {item.extra && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.extra}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-3">
            {BODY_EXPRESSIONS.map((expr, i) => (
              <motion.div key={expr.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={expr.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50 italic">"{expr.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{expr.en}</p>
                  {expr.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {expr.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'gestures' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Understanding French non-verbal communication is as important as the words themselves. These gestures are genuinely and distinctly French.</p>
            {FRENCH_GESTURES.map((g, i) => (
              <motion.div key={g.gesture} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{g.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{g.gesture}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
