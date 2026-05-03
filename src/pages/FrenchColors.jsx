import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const COLORS = [
  { fr: 'rouge', en: 'red', hex: '#ef4444', variants: 'rouge vif (bright red), rouge vin (wine red), rouge sang (blood red), rouge tomate' },
  { fr: 'bleu', en: 'blue', hex: '#3b82f6', variants: 'bleu marine (navy), bleu ciel (sky blue), bleu roi (royal blue), bleu canard (teal), bleu électrique' },
  { fr: 'vert', en: 'green', hex: '#22c55e', variants: 'vert foncé (dark green), vert clair (light green), vert olive, vert bouteille (bottle green), vert pomme' },
  { fr: 'jaune', en: 'yellow', hex: '#eab308', variants: 'jaune citron (lemon), jaune or (golden yellow), jaune paille (straw), jaune moutarde (mustard)' },
  { fr: 'orange', en: 'orange', hex: '#f97316', invariable: true, variants: 'orange vif, orange brûlé (burnt orange)' },
  { fr: 'violet', en: 'purple / violet', hex: '#8b5cf6', variants: 'violet foncé (dark purple), violet pastel, mauve, lilas, parme' },
  { fr: 'rose', en: 'pink', hex: '#ec4899', invariable: true, variants: 'rose pâle (pale pink), rose vif (hot pink), rose bonbon (candy pink), fuchsia' },
  { fr: 'blanc', en: 'white', hex: '#f8fafc', fem: 'blanche', variants: 'blanc cassé (off-white), blanc crème, blanc nacré (pearly white)' },
  { fr: 'noir', en: 'black', hex: '#0f172a', fem: 'noire', variants: 'noir de jais (jet black), noir charbon (charcoal black)' },
  { fr: 'gris', en: 'grey', hex: '#6b7280', fem: 'grise', variants: 'gris clair (light grey), gris foncé (dark grey), gris perle (pearl grey), gris anthracite' },
  { fr: 'marron', en: 'brown', hex: '#92400e', invariable: true, variants: 'marron clair, marron foncé. Note: "brun" is used for hair colour' },
  { fr: 'beige', en: 'beige', hex: '#d2b48c', invariable: true, variants: 'beige rosé, sable (sand colour), champagne' },
  { fr: 'bordeaux', en: 'burgundy / wine red', hex: '#7f1d1d', invariable: true, variants: 'Named after the Bordeaux wine region. Invariable.' },
  { fr: 'turquoise', en: 'turquoise', hex: '#06b6d4', invariable: true, variants: 'bleu turquoise, vert turquoise' },
  { fr: 'doré', en: 'golden', hex: '#ca8a04', fem: 'dorée', variants: 'doré mat, doré brillant, couleur or' },
  { fr: 'argenté', en: 'silver / silvery', hex: '#94a3b8', fem: 'argentée', variants: 'argenté mat, couleur argent, gris argent' },
  { fr: 'brun', en: 'brown (esp. hair)', hex: '#78350f', fem: 'brune', variants: 'Used for hair (elle a les cheveux bruns). "Marron" for objects.' },
  { fr: 'châtain', en: 'chestnut brown (hair)', hex: '#92400e', invariable: true, variants: 'châtain clair (light brown hair), châtain foncé. Invariable.' },
  { fr: 'roux', en: 'ginger / auburn (hair)', hex: '#b45309', fem: 'rousse', variants: 'Used exclusively for hair/fur colour' },
  { fr: 'indigo', en: 'indigo', hex: '#4f46e5', invariable: true, variants: 'bleu indigo' },
  { fr: 'corail', en: 'coral', hex: '#f87171', invariable: true, variants: 'orange corail, rose corail' },
  { fr: 'kaki', en: 'khaki / olive green', hex: '#84855c', invariable: true, variants: 'vert kaki. Military associations.' },
  { fr: 'crème', en: 'cream', hex: '#fef3c7', invariable: true, variants: 'blanc crème, couleur crème' },
  { fr: 'lavande', en: 'lavender', hex: '#a78bfa', invariable: true, variants: 'bleu lavande — linked to Provence' },
]

const GRAMMAR_RULES = [
  {
    rule: 'Agreement with nouns',
    desc: 'Most colour adjectives agree in gender (masculine/feminine) and number (singular/plural) with the noun they describe. Add -e for feminine, -s for plural (or -es for feminine plural).',
    examples: [
      { fr: 'un chat noir', en: 'a black cat (masc sg)' },
      { fr: 'une robe noire', en: 'a black dress (fem sg)' },
      { fr: 'des chats noirs', en: 'black cats (masc pl)' },
      { fr: 'des robes noires', en: 'black dresses (fem pl)' },
    ],
  },
  {
    rule: 'Invariable colours',
    desc: 'Colours that are also nouns (orange, marron, rose, bordeaux, turquoise, corail, kaki, crème, lavande, indigo) NEVER change. No -e or -s is ever added.',
    examples: [
      { fr: 'un sac orange', en: 'an orange bag' },
      { fr: 'des sacs orange', en: 'orange bags (NOT "oranges"!)' },
      { fr: 'une robe marron', en: 'a brown dress (NOT "marronne"!)' },
      { fr: 'des chaussures rose', en: 'pink shoes (NOT "roses"!)' },
    ],
  },
  {
    rule: 'Compound colours — always invariable',
    desc: 'When two colour words are joined with a hyphen, or when a colour is modified by a noun (bleu marine, rouge sang), the entire expression is invariable.',
    examples: [
      { fr: 'des yeux bleu-vert', en: 'blue-green eyes (never bleus-verts)' },
      { fr: 'des cheveux châtain clair', en: 'light chestnut hair (invariable)' },
      { fr: 'une veste bleu marine', en: 'a navy jacket (invariable)' },
      { fr: 'des voitures gris foncé', en: 'dark grey cars (invariable)' },
    ],
  },
  {
    rule: 'Position: after the noun',
    desc: 'Colour adjectives always FOLLOW the noun in French — the opposite of English.',
    examples: [
      { fr: 'une fleur rouge', en: 'a red flower (not "rouge fleur")' },
      { fr: 'le ciel bleu', en: 'the blue sky' },
      { fr: 'un manteau vert', en: 'a green coat' },
      { fr: 'des yeux noisette', en: 'hazel eyes (lit. "hazelnut eyes")' },
    ],
  },
  {
    rule: 'Hair & eye colours',
    desc: 'Hair colours use "avoir les cheveux + colour" and follow special rules. Some hair colours are invariable (châtain, roux in fem = rousse).',
    examples: [
      { fr: 'Elle a les cheveux bruns.', en: 'She has brown hair. (Use brun for hair, not marron)' },
      { fr: 'Il est roux. / Elle est rousse.', en: 'He is ginger. / She is ginger. (roux changes in fem)' },
      { fr: 'Ils ont les yeux verts.', en: 'They have green eyes.' },
      { fr: 'Elle a les cheveux châtain clair.', en: 'She has light brown hair. (châtain is invariable)' },
    ],
  },
  {
    rule: 'Intensifiers with colours',
    desc: 'Add adverbs before the colour to modify intensity. "Très" makes it more vivid; "clair" (light) and "foncé" (dark) follow the colour but are invariable in compound expressions.',
    examples: [
      { fr: 'une couleur très vive', en: 'a very vivid colour' },
      { fr: 'bleu clair vs bleu foncé', en: 'light blue vs dark blue (clair/foncé are invariable in compounds)' },
      { fr: 'C\'est d\'un rouge éclatant.', en: 'It\'s a brilliant red.' },
      { fr: 'des tons pastels', en: 'pastel tones' },
    ],
  },
]

const COLOR_IDIOMS = [
  { fr: 'Voir la vie en rose', en: 'To see life through rose-tinted glasses / to be optimistic', note: 'Lit. "to see life in pink" — also the title of Édith Piaf\'s most famous song (1946)' },
  { fr: 'Broyer du noir', en: 'To be in a dark mood / feel deeply gloomy', note: 'Lit. "to grind black" — stronger than "avoir le cafard"' },
  { fr: 'En faire voir de toutes les couleurs', en: 'To give someone a hard time / put them through it', note: 'Lit. "to make someone see all the colours"' },
  { fr: 'Un cordon bleu', en: 'An excellent cook', note: 'Lit. "a blue ribbon" — refers to the highest culinary prize. Now a cooking school brand.' },
  { fr: 'Se montrer sous son vrai jour', en: 'To show one\'s true colours', note: 'Lit. "to show oneself in one\'s true light"' },
  { fr: 'Avoir le cafard', en: 'To feel blue / down', note: 'Though "cafard" = cockroach, this is the standard French expression for feeling low' },
  { fr: 'Passer au vert', en: 'To get the green light / to go', note: 'From traffic lights — "le feu est vert" = green light' },
  { fr: 'Donner carte blanche', en: 'To give free rein / carte blanche', note: 'Lit. "to give a white card" — complete freedom of action' },
  { fr: 'Un humour noir', en: 'Black humour / dark comedy', note: 'André Breton coined "humour noir" — the French school of dark comedy' },
  { fr: 'Être dans le rouge', en: 'To be in the red / overdrawn', note: 'Same metaphor as in English — financial difficulty' },
  { fr: 'Une nuit blanche', en: 'A sleepless night / an all-nighter', note: '"Nuit Blanche" is also an annual Paris cultural event where museums open all night' },
  { fr: 'Un bleu', en: 'A bruise / a novice / a new recruit', note: 'Triple meaning — "j\'ai un bleu" = I have a bruise; also slang for a raw beginner' },
]

const CULTURE_NOTES = [
  { emoji: '🇫🇷', title: 'Bleu, Blanc, Rouge', detail: 'The French tricolour — created during the 1789 Revolution. Blue and red were the colours of Paris; white represented the monarchy. Today they symbolise liberty (bleu), equality (blanc), and fraternity (rouge). Adopted 14 February 1794.' },
  { emoji: '🍷', title: 'Bordeaux & Bourgogne', detail: 'Two of France\'s great wine regions give their names to colours. "Bordeaux" (dark wine red) and "bourgogne" (deep purple-red) are widely used in fashion and design. Both are invariable colour adjectives.' },
  { emoji: '💛', title: 'Yellow Vests — Les Gilets Jaunes', detail: '"Le gilet jaune" (the yellow vest/jacket) became the symbol of France\'s 2018–2019 protest movement against economic inequality. A single colour garment became one of the most politically charged symbols in modern French history.' },
  { emoji: '🟣', title: 'La Lavande de Provence', detail: 'The lavender fields of Provence are one of France\'s most iconic images — a sea of purple-blue. "Bleu lavande" and "violet lavande" are beloved colour names in French perfumery and design.' },
  { emoji: '🎨', title: 'French Colour in Art', detail: 'The Impressionists revolutionised the use of colour — Monet\'s series paintings explored how the same scene changes in different light. Matisse founded Fauvism ("les Fauves" = the wild beasts) which used wildly non-naturalistic, vivid colours to express emotion.' },
  { emoji: '🟡', title: 'Le Jaune — Caution or Joy?', detail: 'In France, yellow caution tape ("rubalise jaune") marks danger zones. But yellow is also the colour of joy and sunflowers in French culture. "Les Tournesols" (Van Gogh\'s sunflowers) were painted during his time in Provence.' },
]

const COLOR_PHRASES = [
  { fr: 'De quelle couleur est… ?', en: 'What colour is…?' },
  { fr: 'Il est bleu clair / bleu foncé.', en: 'It\'s light / dark blue.' },
  { fr: 'Je cherche quelque chose en rouge.', en: 'I\'m looking for something in red.' },
  { fr: 'Cette couleur ne me va pas.', en: 'This colour doesn\'t suit me.' },
  { fr: 'Le vert lui va très bien.', en: 'Green suits him/her very well.' },
  { fr: 'Je préfère les couleurs vives.', en: 'I prefer bright / vivid colours.' },
  { fr: 'C\'est une nuance de bleu.', en: 'It\'s a shade of blue.' },
  { fr: 'C\'est d\'un beau bordeaux.', en: 'It\'s a lovely burgundy.' },
  { fr: 'Quelle est votre couleur préférée ?', en: 'What\'s your favourite colour?' },
  { fr: 'Ce rouge est trop vif pour moi.', en: 'This red is too bright for me.' },
  { fr: 'Les tons pastels sont très tendance.', en: 'Pastel tones are very trendy.' },
  { fr: 'Voir la vie en rose — c\'est ma devise !', en: 'Looking on the bright side — that\'s my motto!' },
]

export default function FrenchColors() {
  const [tab, setTab] = useState('colors')
  const [activeRule, setActiveRule] = useState(0)
  const [showVariants, setShowVariants] = useState(false)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Colours | SayBonjour!" description="Learn French colours — vocabulary, shades, grammar rules, colour idioms, and French colour culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Colours in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les couleurs — shades, grammar, idioms, and French colour culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'colors', label: 'Colours' },
            { id: 'grammar', label: 'Grammar Rules' },
            { id: 'idioms', label: 'Colour Idioms' },
            { id: 'culture', label: 'Culture & Art' },
            { id: 'phrases', label: 'Phrases' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'colors' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Click to hear pronunciation. Invariable = never adds -e or -s.</p>
              <button onClick={() => setShowVariants(!showVariants)}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 border border-amber-200">
                {showVariants ? 'Hide' : 'Show'} shades
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {COLORS.map((color, i) => (
                <motion.div key={color.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-3 cursor-pointer"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 shrink-0" style={{ backgroundColor: color.hex }} />
                  <SpeakButton text={color.fr} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-medium text-sm text-gray-900 dark:text-cream-50">{color.fr}</p>
                      {color.fem && <span className="text-xs text-rose-500">(f: {color.fem})</span>}
                      {color.invariable && <span className="text-xs bg-purple-100 text-purple-600 px-1 rounded">invariable</span>}
                    </div>
                    <p className="text-xs text-gray-400">{color.en}</p>
                    {showVariants && color.variants && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5 leading-tight">{color.variants}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'grammar' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {GRAMMAR_RULES.map((r, i) => (
                <button key={r.rule} onClick={() => setActiveRule(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeRule === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {r.rule}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-bold text-lg text-gray-900 dark:text-cream-50 mb-2">{GRAMMAR_RULES[activeRule].rule}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{GRAMMAR_RULES[activeRule].desc}</p>
              <div className="space-y-2">
                {GRAMMAR_RULES[activeRule].examples.map(ex => (
                  <div key={ex.fr} className="flex items-center gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-2.5"
                    onClick={() => addXP(2, 'grammar')}>
                    <SpeakButton text={ex.fr} size="sm" />
                    <span className="text-sm font-medium text-burgundy-700 dark:text-burgundy-vibrant-300 italic">{ex.fr}</span>
                    <span className="text-xs text-gray-400">— {ex.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'idioms' && (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-2 text-sm text-amber-800 dark:text-amber-300">
              French colour idioms often differ completely from English equivalents. Mastering these is a great step toward C1 fluency.
            </div>
            {COLOR_IDIOMS.map((idiom, i) => (
              <motion.div key={idiom.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-start gap-3 mb-2">
                  <SpeakButton text={idiom.fr} size="sm" />
                  <p className="font-semibold italic text-gray-900 dark:text-cream-50 font-playfair">"{idiom.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8 mb-1">{idiom.en}</p>
                {idiom.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic ml-8">💡 {idiom.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CULTURE_NOTES.map((item, i) => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {COLOR_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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
