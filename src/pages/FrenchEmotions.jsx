import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Frown, Smile, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const EMOTION_GROUPS = [
  {
    group: 'Happy & Positive — Heureux et positif',
    emoji: '😊',
    color: 'from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20',
    emotions: [
      { fr: 'heureux / heureuse', en: 'happy', sentence: 'Je suis si heureux aujourd\'hui !' },
      { fr: 'content(e)', en: 'pleased / satisfied', sentence: 'Je suis content(e) de te voir.' },
      { fr: 'joyeux / joyeuse', en: 'joyful / cheerful', sentence: 'Elle était joyeuse après la bonne nouvelle.' },
      { fr: 'ravi(e)', en: 'delighted', sentence: 'Je suis ravi(e) de faire votre connaissance.' },
      { fr: 'enthousiaste', en: 'enthusiastic', sentence: 'Il était très enthousiaste à l\'idée du voyage.' },
      { fr: 'fier / fière', en: 'proud', sentence: 'Je suis fier(ière) de toi.' },
      { fr: 'soulagé(e)', en: 'relieved', sentence: 'Je suis soulagé(e) que tout aille bien.' },
      { fr: 'reconnaissant(e)', en: 'grateful', sentence: 'Je vous suis très reconnaissant(e).' },
      { fr: 'épanoui(e)', en: 'fulfilled / flourishing', sentence: 'Elle semble vraiment épanouie dans ce travail.' },
      { fr: 'enchanté(e)', en: 'delighted / enchanted', sentence: 'Enchanté(e) — c\'est magnifique ici.' },
    ],
  },
  {
    group: 'Sad & Negative — Triste et négatif',
    emoji: '😢',
    color: 'from-blue-100 to-slate-100 dark:from-blue-900/20 dark:to-slate-900/20',
    emotions: [
      { fr: 'triste', en: 'sad', sentence: 'Je suis triste de te voir partir.' },
      { fr: 'malheureux / malheureuse', en: 'unhappy / miserable', sentence: 'Il était malheureux dans son ancien travail.' },
      { fr: 'déprimé(e)', en: 'depressed / down', sentence: 'Elle se sent déprimée ces derniers temps.' },
      { fr: 'avoir le cafard', en: 'to feel down (idiom)', sentence: 'J\'ai le cafard depuis lundi.' },
      { fr: 'déçu(e)', en: 'disappointed', sentence: 'Je suis vraiment déçu(e) par ce résultat.' },
      { fr: 'nostalgique', en: 'nostalgic', sentence: 'Cette chanson me rend nostalgique.' },
      { fr: 'mélancolique', en: 'melancholic', sentence: 'Il est d\'humeur mélancolique en automne.' },
      { fr: 'découragé(e)', en: 'discouraged', sentence: 'Ne sois pas découragé(e) — tu vas y arriver.' },
      { fr: 'désespéré(e)', en: 'desperate / hopeless', sentence: 'La situation semblait désespérée.' },
      { fr: 'inconsolable', en: 'inconsolable', sentence: 'Elle était inconsolable après la perte de son chat.' },
    ],
  },
  {
    group: 'Angry & Frustrated — En colère et frustré',
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
    ],
  },
  {
    group: 'Fear & Anxiety — Peur et anxiété',
    emoji: '😨',
    color: 'from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20',
    emotions: [
      { fr: 'avoir peur', en: 'to be afraid / scared', sentence: 'J\'ai peur du noir.' },
      { fr: 'effrayé(e)', en: 'frightened', sentence: 'Il était effrayé par l\'orage.' },
      { fr: 'anxieux / anxieuse', en: 'anxious', sentence: 'Elle est anxieuse avant les examens.' },
      { fr: 'inquiet / inquiète', en: 'worried', sentence: 'Je suis inquiet(ète) pour toi.' },
      { fr: 'stressé(e)', en: 'stressed', sentence: 'Je suis tellement stressé(e) en ce moment.' },
      { fr: 'paniqué(e)', en: 'panicked', sentence: 'Il a paniqué quand il n\'a pas trouvé ses clés.' },
      { fr: 'terrorisé(e)', en: 'terrified', sentence: 'Elle était terrorisée par les araignées.' },
      { fr: 'nerveux / nerveuse', en: 'nervous', sentence: 'Je suis nerveux(se) à l\'idée de parler en public.' },
    ],
  },
  {
    group: 'Surprise & Confusion — Surprise et confusion',
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
    ],
  },
]

const EXPRESSING = [
  { fr: 'Je me sens…', en: 'I feel…' },
  { fr: 'Je suis…', en: 'I am…' },
  { fr: 'Tu as l\'air…', en: 'You seem…' },
  { fr: 'Ça me rend…', en: 'It makes me feel…' },
  { fr: 'Je commence à me sentir…', en: 'I\'m starting to feel…' },
  { fr: 'Elle est d\'une humeur de chien.', en: 'She\'s in a terrible mood. (lit. a dog\'s mood)' },
  { fr: 'Il a le moral à zéro.', en: 'He\'s really down. (lit. morale at zero)' },
  { fr: 'Elle est aux anges.', en: 'She\'s over the moon. (lit. with the angels)' },
  { fr: 'Je suis sur un nuage.', en: 'I\'m on cloud nine. (lit. on a cloud)' },
  { fr: 'Il broie du noir.', en: 'He\'s in a dark mood / very gloomy. (lit. grinding black)' },
]

export default function FrenchEmotions() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [tab, setTab] = useState('emotions')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Emotions Vocabulary | SayBonjour!" description="Learn how to express feelings in French — happy, sad, angry, scared — with example sentences." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Emotions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les émotions — how to express feelings in French</p>
        </div>

        <div className="flex gap-3 mb-6">
          {[{ id: 'emotions', label: 'Emotion Words' }, { id: 'expressing', label: 'Expressing Emotions' }].map(t => (
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
                  <span>{g.emoji}</span> {g.group.split('—')[0].trim()}
                </button>
              ))}
            </div>

            <div className={`rounded-2xl p-4 mb-4 bg-gradient-to-br ${EMOTION_GROUPS[activeGroup].color}`}>
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 text-lg">{EMOTION_GROUPS[activeGroup].group}</h2>
            </div>

            <div className="space-y-3">
              {EMOTION_GROUPS[activeGroup].emotions.map((emotion, i) => (
                <motion.div key={emotion.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SpeakButton text={emotion.fr} size="sm" />
                    <span className="font-bold text-gray-900 dark:text-cream-50">{emotion.fr}</span>
                    <span className="text-xs text-gray-400">— {emotion.en}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-3 py-2">
                    <SpeakButton text={emotion.sentence} size="sm" />
                    <p className="text-xs italic text-gray-600 dark:text-gray-400">"{emotion.sentence}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'expressing' && (
          <div className="space-y-3">
            {EXPRESSING.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
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
