import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ADJECTIVE_GROUPS = [
  {
    category: 'Personality & Character',
    level: 'A2',
    items: [
      { masc: 'gentil', fem: 'gentille', en: 'kind / nice', example: 'Il est très gentil avec ses amis.' },
      { masc: 'sympa(thique)', fem: 'sympa(thique)', en: 'friendly / likeable', example: 'C\'est une fille vraiment sympa.', note: 'Invariable in informal use' },
      { masc: 'intelligent', fem: 'intelligente', en: 'intelligent / clever', example: 'Elle est très intelligente.' },
      { masc: 'drôle', fem: 'drôle', en: 'funny / amusing', example: 'Tu es drôle ce soir.', note: 'Same form for masc and fem' },
      { masc: 'sérieux', fem: 'sérieuse', en: 'serious / hardworking', example: 'Il est très sérieux dans son travail.' },
      { masc: 'généreux', fem: 'généreuse', en: 'generous', example: 'Ma grand-mère est très généreuse.' },
      { masc: 'courageux', fem: 'courageuse', en: 'brave / courageous', example: 'Elle a été très courageuse.' },
      { masc: 'paresseux', fem: 'paresseuse', en: 'lazy', example: 'Ne sois pas paresseux !' },
      { masc: 'timide', fem: 'timide', en: 'shy / timid', example: 'Il est timide avec les inconnus.' },
      { masc: 'bavard', fem: 'bavarde', en: 'talkative / chatty', example: 'Ma sœur est très bavarde.' },
      { masc: 'curieux', fem: 'curieuse', en: 'curious / nosy', example: 'Les enfants sont toujours curieux.' },
      { masc: 'honnête', fem: 'honnête', en: 'honest', example: 'Sois honnête avec moi.', note: 'Same form for both genders' },
      { masc: 'têtu', fem: 'têtue', en: 'stubborn / headstrong', example: 'Il est têtu comme une mule.' },
      { masc: 'ambitieux', fem: 'ambitieuse', en: 'ambitious', example: 'Elle est très ambitieuse dans sa carrière.' },
      { masc: 'créatif', fem: 'créative', en: 'creative', example: 'Tu as un esprit très créatif.', note: '-if → -ive in feminine' },
    ],
  },
  {
    category: 'Size & Appearance',
    level: 'A1',
    items: [
      { masc: 'grand', fem: 'grande', en: 'tall / big', example: 'Il est grand pour son âge.', note: 'In BAGS — comes before noun: "un grand homme"' },
      { masc: 'petit', fem: 'petite', en: 'small / short', example: 'Elle est petite mais dynamique.', note: 'In BAGS — before noun: "une petite maison"' },
      { masc: 'beau', fem: 'belle', en: 'beautiful / handsome', example: 'C\'est un bel homme.', note: 'beau → bel before vowel/mute h: "un bel appartement"' },
      { masc: 'joli', fem: 'jolie', en: 'pretty / nice', example: 'C\'est une jolie robe.' },
      { masc: 'mince', fem: 'mince', en: 'slim / thin', example: 'Elle est très mince.', note: 'Same form for masc and fem' },
      { masc: 'gros', fem: 'grosse', en: 'big / fat / thick', example: 'Un gros problème !', note: 'Doubles consonant: -s → -sse' },
      { masc: 'vieux', fem: 'vieille', en: 'old (person/thing)', example: 'Un vieil ami de ma famille.', note: 'vieux → vieil before vowel/h: "un vieil homme". Irregular feminine: vieille.' },
      { masc: 'jeune', fem: 'jeune', en: 'young', example: 'Elle est encore très jeune.', note: 'Same form for both genders' },
      { masc: 'nouveau', fem: 'nouvelle', en: 'new / fresh', example: 'Un nouvel appartement.', note: 'nouveau → nouvel before vowel/h. Before noun (BAGS).' },
      { masc: 'fort', fem: 'forte', en: 'strong / good at', example: 'Elle est forte en maths.' },
    ],
  },
  {
    category: 'Qualities & Properties',
    level: 'A2',
    items: [
      { masc: 'bon', fem: 'bonne', en: 'good', example: 'C\'est une bonne idée.', note: 'Doubles consonant: -n → -nne. Before noun (BAGS).' },
      { masc: 'mauvais', fem: 'mauvaise', en: 'bad', example: 'C\'est une mauvaise habitude.' },
      { masc: 'long', fem: 'longue', en: 'long', example: 'C\'est un long voyage.' },
      { masc: 'court', fem: 'courte', en: 'short (length)', example: 'Une robe courte.' },
      { masc: 'lourd', fem: 'lourde', en: 'heavy', example: 'Ce sac est très lourd.' },
      { masc: 'léger', fem: 'légère', en: 'light (weight) / gentle', example: 'Un repas léger.', note: '-er → -ère in feminine (accent change)' },
      { masc: 'chaud', fem: 'chaude', en: 'hot / warm', example: 'L\'eau est bien chaude.' },
      { masc: 'froid', fem: 'froide', en: 'cold', example: 'Il fait très froid ce matin.' },
      { masc: 'doux', fem: 'douce', en: 'soft / gentle / mild / sweet', example: 'Un tissu très doux.', note: '-oux → -ouce in feminine' },
      { masc: 'dur', fem: 'dure', en: 'hard / tough / difficult', example: 'C\'est dur comme travail.' },
      { masc: 'propre', fem: 'propre', en: 'clean / own (different meaning before/after)', example: 'Ma propre chambre (my own room) / une chambre propre (a clean room).', note: 'Before noun: "own". After noun: "clean". Same form.' },
      { masc: 'plein', fem: 'pleine', en: 'full', example: 'Le verre est plein.' },
      { masc: 'vide', fem: 'vide', en: 'empty', example: 'Le frigo est vide.' },
    ],
  },
  {
    category: 'Opinion & Feeling',
    level: 'B1',
    items: [
      { masc: 'content', fem: 'contente', en: 'happy / pleased / satisfied', example: 'Je suis très content de ce résultat.' },
      { masc: 'triste', fem: 'triste', en: 'sad', example: 'Elle est triste aujourd\'hui.', note: 'Same form for both genders' },
      { masc: 'fatigué', fem: 'fatiguée', en: 'tired / exhausted', example: 'Je suis complètement fatigué.' },
      { masc: 'heureux', fem: 'heureuse', en: 'happy / joyful', example: 'Elle a l\'air très heureuse.' },
      { masc: 'inquiet', fem: 'inquiète', en: 'worried / anxious', example: 'Je suis très inquiet pour toi.', note: '-et → -ète in feminine (accent change)' },
      { masc: 'fâché', fem: 'fâchée', en: 'angry / cross', example: 'Il est fâché contre moi.' },
      { masc: 'surpris', fem: 'surprise', en: 'surprised', example: 'Elle était très surprise.' },
      { masc: 'ennuyeux', fem: 'ennuyeuse', en: 'boring / tedious', example: 'Ce film est vraiment ennuyeux.' },
      { masc: 'intéressant', fem: 'intéressante', en: 'interesting', example: 'C\'est un sujet très intéressant.' },
      { masc: 'difficile', fem: 'difficile', en: 'difficult', example: 'C\'est difficile à expliquer.', note: 'Same form for both genders' },
      { masc: 'passionnant', fem: 'passionnante', en: 'exciting / fascinating', example: 'C\'est une histoire passionnante.' },
    ],
  },
  {
    category: 'Nationalities & Origin',
    level: 'A1',
    items: [
      { masc: 'français', fem: 'française', en: 'French', example: 'Il est français.', note: 'Lowercase when adjective: "il est français". Uppercase only when used as a noun: "un Français".' },
      { masc: 'anglais', fem: 'anglaise', en: 'English', example: 'Elle est anglaise.' },
      { masc: 'espagnol', fem: 'espagnole', en: 'Spanish', example: 'Mon ami est espagnol.' },
      { masc: 'allemand', fem: 'allemande', en: 'German', example: 'Elle est allemande.' },
      { masc: 'américain', fem: 'américaine', en: 'American', example: 'Il est américain.' },
      { masc: 'japonais', fem: 'japonaise', en: 'Japanese', example: 'C\'est un restaurant japonais.' },
      { masc: 'chinois', fem: 'chinoise', en: 'Chinese', example: 'La cuisine chinoise est délicieuse.' },
      { masc: 'italien', fem: 'italienne', en: 'Italian', example: 'C\'est un chanteur italien.', note: '-ien → -ienne in feminine (doubles the n)' },
      { masc: 'brésilien', fem: 'brésilienne', en: 'Brazilian', example: 'Elle est brésilienne.' },
      { masc: 'marocain', fem: 'marocaine', en: 'Moroccan', example: 'Le couscous est un plat marocain.' },
    ],
  },
  {
    category: 'B1+ Advanced Adjectives',
    level: 'B1',
    items: [
      { masc: 'épanoui', fem: 'épanouie', en: 'fulfilled / flourishing', example: 'Elle semble vraiment épanouie.' },
      { masc: 'déconcertant', fem: 'déconcertante', en: 'disconcerting / baffling', example: 'Sa réaction était déconcertante.' },
      { masc: 'poignant', fem: 'poignante', en: 'poignant / deeply moving', example: 'C\'est une histoire vraiment poignante.' },
      { masc: 'subtil', fem: 'subtile', en: 'subtle', example: 'C\'est une différence très subtile.' },
      { masc: 'saisissant', fem: 'saisissante', en: 'striking / stunning', example: 'Une ressemblance saisissante.' },
      { masc: 'ingénieux', fem: 'ingénieuse', en: 'ingenious / clever', example: 'C\'est une solution ingénieuse.' },
      { masc: 'bienveillant', fem: 'bienveillante', en: 'benevolent / kind-hearted', example: 'Un professeur très bienveillant.' },
      { masc: 'navrant', fem: 'navrante', en: 'distressing / lamentable', example: 'C\'est navrant de voir ça.' },
    ],
  },
]

const GRAMMAR_RULES = [
  {
    rule: 'Basic agreement',
    desc: 'Adjectives in French must agree in gender (masculine/feminine) and number (singular/plural) with the noun they describe. Four forms are possible: masc sg, fem sg, masc pl, fem pl.',
    examples: [
      { fr: 'un chien noir', en: 'a black dog (masc sg)' },
      { fr: 'une voiture noire', en: 'a black car (fem sg)' },
      { fr: 'des chiens noirs', en: 'black dogs (masc pl)' },
      { fr: 'des voitures noires', en: 'black cars (fem pl)' },
    ],
  },
  {
    rule: 'BAGS — adjectives before the noun',
    desc: 'Most adjectives follow the noun in French. BAGS adjectives (Beauty, Age, Goodness/Badness, Size) come BEFORE. Add: jeune, vieux, nouveau, petit, grand, bon, mauvais, beau, joli, gros.',
    examples: [
      { fr: 'un beau jardin', en: 'a beautiful garden (Beauty → before)' },
      { fr: 'un vieux château', en: 'an old castle (Age → before)' },
      { fr: 'une bonne idée', en: 'a good idea (Goodness → before)' },
      { fr: 'un grand homme', en: 'a great man (Size → before)' },
    ],
  },
  {
    rule: 'Feminine: -eux → -euse',
    desc: 'Adjectives ending in -eux or -oux form the feminine by changing to -euse or -ouse. This is a very productive pattern — master it for dozens of adjectives.',
    examples: [
      { fr: 'heureux → heureuse', en: 'happy (m/f)' },
      { fr: 'sérieux → sérieuse', en: 'serious (m/f)' },
      { fr: 'généreux → généreuse', en: 'generous (m/f)' },
      { fr: 'jaloux → jalouse', en: 'jealous (m/f)' },
    ],
  },
  {
    rule: 'Feminine: -if → -ive',
    desc: 'Adjectives ending in -if form the feminine with -ive. These often correspond to English adjectives ending in -ive.',
    examples: [
      { fr: 'actif → active', en: 'active (m/f)' },
      { fr: 'créatif → créative', en: 'creative (m/f)' },
      { fr: 'naïf → naïve', en: 'naive (m/f)' },
      { fr: 'positif → positive', en: 'positive (m/f)' },
    ],
  },
  {
    rule: 'Irregular feminine forms',
    desc: 'Key adjectives have completely irregular feminine forms — these must be memorised. They are all high-frequency adjectives.',
    examples: [
      { fr: 'beau → belle (bel before vowel)', en: 'beautiful / handsome' },
      { fr: 'vieux → vieille (vieil before vowel)', en: 'old' },
      { fr: 'nouveau → nouvelle (nouvel before vowel)', en: 'new' },
      { fr: 'blanc → blanche', en: 'white' },
    ],
  },
  {
    rule: 'Adjectives that don\'t change',
    desc: 'Some adjectives have the same form in masculine and feminine: those ending in -e (jeune, libre, calme, timide, triste). Also: compound colours, colour-nouns (marron, orange).',
    examples: [
      { fr: 'un homme triste / une femme triste', en: 'a sad man / a sad woman (same form)' },
      { fr: 'un livre utile / une méthode utile', en: 'a useful book / a useful method (same form)' },
      { fr: 'un sac orange / des sacs orange', en: 'an orange bag / orange bags (invariable)' },
      { fr: 'un ami calme / une amie calme', en: 'a calm friend m/f (same form)' },
    ],
  },
  {
    rule: 'Position changes meaning',
    desc: 'Some adjectives change meaning depending on whether they come before or after the noun. This is a subtle but important phenomenon in French.',
    examples: [
      { fr: 'un grand homme / un homme grand', en: 'a great man (important) / a tall man (height)' },
      { fr: 'ma propre chambre / ma chambre propre', en: 'my own room (possession) / my clean room (cleanliness)' },
      { fr: 'un certain âge / un fait certain', en: 'a certain age (vague) / a certain fact (definite)' },
      { fr: 'la dernière fois / la semaine dernière', en: 'the last time (final) / last week (previous)' },
    ],
  },
]

const LEVEL_COLORS = { A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-blue-100 text-blue-700', B1: 'bg-yellow-100 text-yellow-700', B2: 'bg-orange-100 text-orange-700' }

export default function FrenchAdjectives() {
  const [tab, setTab] = useState('vocab')
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeRule, setActiveRule] = useState(0)
  const [showExamples, setShowExamples] = useState(true)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Adjectives | SayBonjour!" description="Learn essential French adjectives — personality, appearance, qualities, nationalities — with gender agreement rules and examples." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Adjectives</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les adjectifs — vocabulary, agreement rules, and how to use them correctly</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'grammar', label: 'Grammar Rules' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ADJECTIVE_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.category}
                  <span className={`px-1 py-0.5 rounded text-xs ${activeGroup === i ? 'bg-white/20' : LEVEL_COLORS[g.level] || 'bg-gray-100 text-gray-600'}`}>{g.level}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50">{ADJECTIVE_GROUPS[activeGroup].category}</h2>
              <button onClick={() => setShowExamples(!showExamples)}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
                {showExamples ? 'Hide' : 'Show'} examples
              </button>
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <div className="space-y-4">
                {ADJECTIVE_GROUPS[activeGroup].items.map((adj, i) => (
                  <motion.div key={adj.masc} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 dark:border-dark-warm-200 pb-3 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
                    <div className="flex items-start gap-2 mb-1">
                      <SpeakButton text={adj.masc} size="sm" />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-burgundy-700 dark:text-burgundy-vibrant-300 text-sm">{adj.masc}</span>
                          <span className="text-gray-400">/</span>
                          <span className="font-medium text-rose-600 dark:text-rose-400 text-sm">{adj.fem}</span>
                          <span className="text-xs text-gray-400">— {adj.en}</span>
                        </div>
                        {adj.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{adj.note}</p>}
                      </div>
                    </div>
                    {showExamples && adj.example && (
                      <div className="ml-7 flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-1.5 mt-1">
                        <SpeakButton text={adj.example} size="sm" />
                        <p className="text-xs italic text-gray-500 dark:text-gray-400">"{adj.example}"</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'grammar' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {GRAMMAR_RULES.map((r, i) => (
                <button key={r.rule} onClick={() => { setActiveRule(i); addXP(3, 'grammar') }}
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
      </div>
    </div>
  )
}
