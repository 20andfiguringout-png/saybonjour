import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Frown, Smile, Zap, Brain } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const EMOTION_GROUPS = [
  {
    group: 'Happy & Positive',
    fr: 'Heureux et positif',
    emoji: '😊',
    color: 'from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20',
    emotions: [
      { fr: 'heureux / heureuse', en: 'happy', sentence: 'Je suis si heureux de te voir aujourd\'hui !' },
      { fr: 'content(e)', en: 'pleased / satisfied', sentence: 'Je suis content(e) de te voir.' },
      { fr: 'joyeux / joyeuse', en: 'joyful / cheerful', sentence: 'Elle était joyeuse après la bonne nouvelle.' },
      { fr: 'ravi(e)', en: 'delighted', sentence: 'Je suis ravi(e) de faire votre connaissance.' },
      { fr: 'enthousiaste', en: 'enthusiastic', sentence: 'Il était très enthousiaste à l\'idée du voyage.' },
      { fr: 'fier / fière', en: 'proud', sentence: 'Je suis fier(ière) de toi.' },
      { fr: 'soulagé(e)', en: 'relieved', sentence: 'Je suis soulagé(e) que tout aille bien.' },
      { fr: 'reconnaissant(e)', en: 'grateful', sentence: 'Je vous suis très reconnaissant(e).' },
      { fr: 'épanoui(e)', en: 'fulfilled / flourishing', sentence: 'Elle semble vraiment épanouie dans ce travail.' },
      { fr: 'enchanté(e)', en: 'delighted / enchanted', sentence: 'Enchanté(e) — c\'est magnifique ici.' },
      { fr: 'comblé(e)', en: 'fulfilled / overjoyed', sentence: 'Je suis comblé(e) par ta gentillesse.' },
      { fr: 'émerveillé(e)', en: 'filled with wonder', sentence: 'Les enfants étaient émerveillés par les feux d\'artifice.' },
    ],
  },
  {
    group: 'Sad & Negative',
    fr: 'Triste et négatif',
    emoji: '😢',
    color: 'from-blue-100 to-slate-100 dark:from-blue-900/20 dark:to-slate-900/20',
    emotions: [
      { fr: 'triste', en: 'sad', sentence: 'Je suis triste de te voir partir.' },
      { fr: 'malheureux / malheureuse', en: 'unhappy / miserable', sentence: 'Il était malheureux dans son ancien travail.' },
      { fr: 'déprimé(e)', en: 'depressed / down', sentence: 'Elle se sent déprimée ces derniers temps.' },
      { fr: 'avoir le cafard', en: 'to feel down (idiom)', sentence: 'J\'ai le cafard depuis lundi.', note: 'Lit. "to have the cockroach" — a very French way to describe low mood' },
      { fr: 'déçu(e)', en: 'disappointed', sentence: 'Je suis vraiment déçu(e) par ce résultat.' },
      { fr: 'nostalgique', en: 'nostalgic', sentence: 'Cette chanson me rend nostalgique.' },
      { fr: 'mélancolique', en: 'melancholic', sentence: 'Il est d\'humeur mélancolique en automne.' },
      { fr: 'découragé(e)', en: 'discouraged', sentence: 'Ne sois pas découragé(e) — tu vas y arriver.' },
      { fr: 'désespéré(e)', en: 'desperate / hopeless', sentence: 'La situation semblait désespérée.' },
      { fr: 'inconsolable', en: 'inconsolable', sentence: 'Elle était inconsolable après la perte de son chat.' },
      { fr: 'abattu(e)', en: 'downcast / dejected', sentence: 'Il semblait abattu après l\'annonce.' },
      { fr: 'accablé(e)', en: 'overwhelmed / crushed', sentence: 'Je suis accablé(e) par les mauvaises nouvelles.' },
    ],
  },
  {
    group: 'Angry & Frustrated',
    fr: 'En colère et frustré',
    emoji: '😠',
    color: 'from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20',
    emotions: [
      { fr: 'en colère', en: 'angry', sentence: 'Je suis en colère contre lui.' },
      { fr: 'furieux / furieuse', en: 'furious', sentence: 'Elle était furieuse de l\'injustice.' },
      { fr: 'frustré(e)', en: 'frustrated', sentence: 'Je suis frustré(e) par cette situation.' },
      { fr: 'agacé(e)', en: 'annoyed / irritated', sentence: 'Tu m\'agaces vraiment !' },
      { fr: 'énervé(e)', en: 'irritated / worked up', sentence: 'Il s\'est énervé après l\'attente.' },
      { fr: 'irrité(e)', en: 'irritated', sentence: 'Elle semblait irritée par sa remarque.' },
      { fr: 'exaspéré(e)', en: 'exasperated', sentence: 'Je suis complètement exaspéré(e) !' },
      { fr: 'révolté(e)', en: 'outraged / revolted', sentence: 'C\'est révoltant — je suis révolté(e).' },
      { fr: 'indigné(e)', en: 'indignant', sentence: 'Elle était indignée par son comportement.' },
      { fr: 'hors de soi', en: 'beside oneself (with anger)', sentence: 'Il était hors de lui après l\'incident.', note: 'Strong expression — implies total loss of control' },
    ],
  },
  {
    group: 'Fear & Anxiety',
    fr: 'Peur et anxiété',
    emoji: '😨',
    color: 'from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
    emotions: [
      { fr: 'avoir peur', en: 'to be afraid / scared', sentence: 'J\'ai peur du noir.', note: 'French uses "avoir" (to have) not "être" (to be) — "I have fear" rather than "I am fearful"' },
      { fr: 'effrayé(e)', en: 'frightened', sentence: 'Il était effrayé par l\'orage.' },
      { fr: 'anxieux / anxieuse', en: 'anxious', sentence: 'Elle est anxieuse avant les examens.' },
      { fr: 'inquiet / inquiète', en: 'worried', sentence: 'Je suis inquiet(ète) pour toi.' },
      { fr: 'stressé(e)', en: 'stressed', sentence: 'Je suis tellement stressé(e) en ce moment.' },
      { fr: 'paniqué(e)', en: 'panicked', sentence: 'Il a paniqué quand il n\'a pas trouvé ses clés.' },
      { fr: 'terrorisé(e)', en: 'terrified', sentence: 'Elle était terrorisée par les araignées.' },
      { fr: 'nerveux / nerveuse', en: 'nervous', sentence: 'Je suis nerveux(se) à l\'idée de parler en public.' },
      { fr: 'angoissé(e)', en: 'full of anguish / deeply anxious', sentence: 'Il était angoissé à l\'idée d\'échouer.', note: '"Angoisse" is stronger than "anxiété" — implies existential dread' },
      { fr: 'craintif / craintive', en: 'fearful / timid', sentence: 'Elle a un caractère craintif.' },
    ],
  },
  {
    group: 'Surprise & Confusion',
    fr: 'Surprise et confusion',
    emoji: '😮',
    color: 'from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
    emotions: [
      { fr: 'surpris(e)', en: 'surprised', sentence: 'Je suis surpris(e) de te voir ici !' },
      { fr: 'étonné(e)', en: 'astonished', sentence: 'Elle était étonnée par sa générosité.' },
      { fr: 'stupéfait(e)', en: 'stunned / gobsmacked', sentence: 'Il était stupéfait par la nouvelle.' },
      { fr: 'abasourdi(e)', en: 'dumbfounded', sentence: 'Nous étions abasourdis par son discours.' },
      { fr: 'perplexe', en: 'perplexed', sentence: 'Je suis perplexe devant ce problème.' },
      { fr: 'confus(e)', en: 'confused', sentence: 'Elle était confuse par les instructions.' },
      { fr: 'embarrassé(e)', en: 'embarrassed', sentence: 'Il était très embarrassé d\'avoir oublié son nom.' },
      { fr: 'gêné(e)', en: 'awkward / embarrassed', sentence: 'Je me suis senti(e) gêné(e) dans cette situation.' },
      { fr: 'déconcerté(e)', en: 'disconcerted / thrown off', sentence: 'Sa réaction m\'a déconcerté(e).' },
    ],
  },
  {
    group: 'Love & Connection',
    fr: 'Amour et connexion',
    emoji: '❤️',
    color: 'from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20',
    emotions: [
      { fr: 'amoureux / amoureuse (de)', en: 'in love (with)', sentence: 'Il est éperdument amoureux d\'elle.' },
      { fr: 'affectueux / affectueuse', en: 'affectionate', sentence: 'Elle est très affectueuse avec ses proches.' },
      { fr: 'attendri(e)', en: 'moved / touched (tenderly)', sentence: 'Je suis attendri(e) par ce geste.' },
      { fr: 'jaloux / jalouse', en: 'jealous', sentence: 'Tu es jaloux(se) de son succès ?' },
      { fr: 'envieux / envieuse', en: 'envious', sentence: 'Je suis un peu envieux(euse) de tes vacances.' },
      { fr: 'solitaire', en: 'lonely', sentence: 'Il se sent solitaire depuis son déménagement.' },
      { fr: 'nostalgique', en: 'nostalgic', sentence: 'Ce parfum me rend nostalgique de mon enfance.' },
      { fr: 'touché(e)', en: 'moved / touched', sentence: 'J\'ai été très touché(e) par ton message.' },
    ],
  },
]

const EXPRESSING = [
  { fr: 'Je me sens…', en: 'I feel…', note: 'Most versatile — works for almost any emotion' },
  { fr: 'Je suis…', en: 'I am…', note: 'Used with adjectives: je suis triste, heureux, énervé…' },
  { fr: 'J\'ai…', en: 'I have…', note: 'Used with: peur (fear), honte (shame), honte, envie, chaud, froid' },
  { fr: 'Tu as l\'air…', en: 'You seem…', note: '"Tu as l\'air fatigué(e)" = you look tired' },
  { fr: 'Ça me rend…', en: 'It makes me feel…', note: '"Ça me rend heureuse" = it makes me happy' },
  { fr: 'Je commence à me sentir…', en: 'I\'m starting to feel…' },
  { fr: 'Elle est d\'une humeur de chien.', en: 'She\'s in a terrible mood.', note: 'Lit. "a dog\'s mood"' },
  { fr: 'Il a le moral à zéro.', en: 'He\'s really down.', note: 'Lit. "morale at zero"' },
  { fr: 'Elle est aux anges.', en: 'She\'s over the moon.', note: 'Lit. "with the angels"' },
  { fr: 'Je suis sur un nuage.', en: 'I\'m on cloud nine.', note: 'Lit. "on a cloud"' },
  { fr: 'Il broie du noir.', en: 'He\'s in a very dark mood.', note: 'Lit. "grinding black" — deep gloom' },
  { fr: 'Je suis dans tous mes états.', en: 'I\'m in a total state / very agitated.' },
  { fr: 'Il pète les plombs.', en: 'He\'s losing it / blowing a fuse.', note: 'Lit. "he\'s blowing the fuses" — informal' },
  { fr: 'Je suis à bout.', en: 'I\'m at my wit\'s end.', note: 'Lit. "I\'m at the end"' },
]

const UNTRANSLATABLE = [
  { fr: 'Dépaysement', lit: '"Un-country-ing"', en: 'The disorientation — and wonder — of being in a foreign place. Neither homesickness nor excitement alone, but a unique blend of both.', level: 'C1' },
  { fr: 'L\'esprit d\'escalier', lit: '"Staircase wit"', en: 'The perfect comeback or retort that occurs to you only after the moment has passed — on the way out, on the staircase.', level: 'B2' },
  { fr: 'Flâner', lit: 'To wander without purpose', en: 'To stroll through the city with no particular destination, purely for the pleasure of observation. A key part of Parisian identity.', level: 'B1' },
  { fr: 'Retrouvailles', lit: 'Re-findings', en: 'The joy of reuniting with someone you haven\'t seen for a long time. English has no single word for this feeling.', level: 'B2' },
  { fr: 'La douleur exquise', lit: 'Exquisite pain', en: 'The particular heartache of wanting someone you cannot have — a longing that is beautiful and painful at once.', level: 'C1' },
  { fr: 'Saudade (borrowed from Portuguese but used in French)', lit: 'Melancholic longing', en: 'A nostalgic, melancholic longing for something beautiful that may never return — used in French writing and philosophy.', level: 'C1' },
  { fr: 'Frisson', lit: 'Shiver', en: 'A shiver of excitement, emotion, or awe — the chill you get from a beautiful piece of music or an unexpected revelation. English now borrows this word.', level: 'B1' },
  { fr: 'Être bien dans sa peau', lit: 'To be well in one\'s skin', en: 'To be comfortable with who you are — at ease in your own body and identity. English can\'t say it quite the same way.', level: 'B1' },
  { fr: 'Empêchement', lit: 'Hindrance', en: 'A last-minute obstacle preventing you from keeping an appointment — often used as a polite excuse: "J\'ai eu un empêchement."', level: 'A2' },
]

const GRAMMAR_NOTES = [
  { title: 'être vs avoir for emotions', content: 'Most emotions use ÊTRE: "Je suis triste / heureux / inquiet". But key emotions use AVOIR: avoir peur (to be scared), avoir honte (to be ashamed), avoir envie (to feel like), avoir chaud/froid (to be hot/cold). Never say "je suis peur" — it\'s always "j\'ai peur".' },
  { title: 'Adjective agreement', content: 'Emotion adjectives must agree with the subject\'s gender: "Il est heureux" but "Elle est heureuse". "Il est fatigué" but "Elle est fatiguée". Some adjectives don\'t change: "Il / Elle est triste", "Il / Elle est calme".' },
  { title: 'Reflexive emotions', content: 'Many emotional states use reflexive verbs: "se sentir" (to feel), "s\'ennuyer" (to be bored), "se fâcher" (to get angry), "s\'énerver" (to get worked up), "se réjouir" (to rejoice). These always need the reflexive pronoun: "Je me sens bien."' },
  { title: 'Nuance: triste vs mélancolique', content: '"Triste" is general sadness. "Mélancolique" implies a deeper, more poetic or lasting sadness — often tinged with nostalgia. "Déprimé(e)" implies clinical or prolonged depression. Use these carefully — they aren\'t interchangeable.' },
]

export default function FrenchEmotions() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [tab, setTab] = useState('emotions')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Emotions Vocabulary | SayBonjour!" description="Learn how to express feelings in French — emotions, untranslatable words, idioms, grammar notes, and example sentences." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Emotions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les émotions — vocabulary, untranslatable words, and how to express feelings</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'emotions', label: 'Emotion Words' },
            { id: 'expressing', label: 'Expressing Emotions' },
            { id: 'untranslatable', label: 'Untranslatable' },
            { id: 'grammar', label: 'Grammar Notes' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'emotions' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {EMOTION_GROUPS.map((g, i) => (
                <button key={g.group} onClick={() => setActiveGroup(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  <span>{g.emoji}</span> {g.group}
                </button>
              ))}
            </div>

            <div className={`rounded-2xl p-4 mb-4 bg-gradient-to-br ${EMOTION_GROUPS[activeGroup].color}`}>
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 text-lg">{EMOTION_GROUPS[activeGroup].group} — <em>{EMOTION_GROUPS[activeGroup].fr}</em></h2>
            </div>

            <div className="space-y-3">
              {EMOTION_GROUPS[activeGroup].emotions.map((emotion, i) => (
                <motion.div key={emotion.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <div className="flex items-center gap-2 mb-2">
                    <SpeakButton text={emotion.fr} size="sm" />
                    <span className="font-bold text-gray-900 dark:text-cream-50">{emotion.fr}</span>
                    <span className="text-xs text-gray-400">— {emotion.en}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">
                    <SpeakButton text={emotion.sentence} size="sm" />
                    <p className="text-xs italic text-gray-600 dark:text-gray-400">"{emotion.sentence}"</p>
                  </div>
                  {emotion.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-1.5 ml-1">💡 {emotion.note}</p>}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'expressing' && (
          <div className="space-y-3">
            {EXPRESSING.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={phrase.fr} size="sm" />
                <div className="flex-1">
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                  {phrase.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {phrase.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'untranslatable' && (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-700 rounded-xl px-4 py-3 mb-4 text-sm text-purple-800 dark:text-purple-300">
              These French words describe emotional states that English simply cannot capture in a single word — evidence that language shapes how we experience the world.
            </div>
            {UNTRANSLATABLE.map((word, i) => (
              <motion.div key={word.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(4, 'vocabulary')}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <SpeakButton text={word.fr} size="sm" />
                    <h3 className="font-bold text-lg font-playfair italic text-burgundy-700 dark:text-burgundy-vibrant-300">{word.fr}</h3>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full shrink-0">{word.level}</span>
                </div>
                <p className="text-xs text-gray-400 italic mb-2 ml-8">Lit. {word.lit}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 ml-8 leading-relaxed">{word.en}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'grammar' && (
          <div className="space-y-4">
            {GRAMMAR_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-900 dark:text-cream-50 mb-2 flex items-center gap-2">
                  <Brain size={16} className="text-burgundy-600 shrink-0" />
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{note.content}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
