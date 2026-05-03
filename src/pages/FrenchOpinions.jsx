import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const OPINION_GROUPS = [
  {
    category: 'Giving your opinion',
    icon: '💬',
    items: [
      { fr: 'Je pense que…', en: 'I think that…', note: 'Most common and neutral. "Je pense que c\'est une bonne idée." Takes the indicative after it.' },
      { fr: 'Je crois que…', en: 'I believe that…', note: 'Slightly stronger conviction than "je pense". "Je crois qu\'il a raison."' },
      { fr: 'Je trouve que…', en: 'I find that… / I think that…', note: '"Trouver" = to find. Often used for judgements: "Je trouve que c\'est injuste."' },
      { fr: 'À mon avis,…', en: 'In my opinion,…', note: 'Very common in both speech and writing. "À mon avis, on devrait attendre."' },
      { fr: 'Selon moi,…', en: 'According to me,…', note: 'Slightly formal — more used in written French and formal debates.' },
      { fr: 'D\'après moi,…', en: 'In my view,…', note: '"D\'après" is versatile — also used for "according to": "D\'après le journal...".' },
      { fr: 'Pour moi,…', en: 'For me, / In my view,…', note: '"Pour moi" is very direct and personal. "Pour moi, la liberté est essentielle."' },
      { fr: 'Il me semble que…', en: 'It seems to me that…', note: 'More tentative — suggests a considered impression. "Il me semble qu\'on pourrait faire mieux."' },
      { fr: 'J\'ai l\'impression que…', en: 'I have the impression that…', note: 'Expresses a feeling or gut sense. "J\'ai l\'impression qu\'il ment."' },
      { fr: 'J\'estime que…', en: 'I consider that… / I hold that…', note: 'Formal and assertive — used in arguments. "J\'estime qu\'une telle décision est inacceptable."' },
    ],
  },
  {
    category: 'Agreeing',
    icon: '✅',
    items: [
      { fr: 'Je suis d\'accord (avec toi / vous).', en: 'I agree (with you).', note: 'Always say "je suis d\'accord" — NEVER "je suis agree". A very common learner error.' },
      { fr: 'Tout à fait !', en: 'Absolutely! / Quite right!', note: 'Strong agreement. "Tout à fait d\'accord !" = absolutely agree.' },
      { fr: 'Exactement !', en: 'Exactly!', note: 'When someone has said precisely what you were thinking.' },
      { fr: 'C\'est vrai / C\'est exact.', en: 'That\'s true / That\'s correct.', note: '"C\'est vrai" = that\'s true (factual). "C\'est exact" = that\'s correct/accurate.' },
      { fr: 'Bien sûr !', en: 'Of course!', note: '"Bien sûr que oui !" = of course yes! "Bien entendu" = of course (slightly more formal).' },
      { fr: 'Évidemment.', en: 'Obviously. / Clearly.', note: 'Can be agreement ("obviously, you\'re right") or mild sarcasm depending on tone.' },
      { fr: 'Tu as (tout à fait) raison.', en: 'You\'re (absolutely) right.', note: '"Avoir raison" = to be right. "Tu as tort" = you\'re wrong. Never "tu es correct/incorrect".' },
      { fr: 'Je partage ton avis / ta position.', en: 'I share your opinion / position.', note: '"Partager" = to share. More formal than "je suis d\'accord".' },
      { fr: 'Je suis entièrement de cet avis.', en: 'I entirely agree with this view.', note: 'Strong and formal agreement — suitable for written French and debates.' },
      { fr: 'On est sur la même longueur d\'onde.', en: 'We\'re on the same wavelength.', note: '"Longueur d\'onde" = wavelength. Informal but expressive.' },
    ],
  },
  {
    category: 'Disagreeing',
    icon: '❌',
    items: [
      { fr: 'Je ne suis pas d\'accord.', en: 'I disagree.', note: 'Direct and clear — not rude if said calmly. The French are comfortable with direct disagreement.' },
      { fr: 'Au contraire !', en: 'On the contrary!', note: 'Asserts the opposite — strong but not aggressive.' },
      { fr: 'Ce n\'est pas mon avis.', en: 'That\'s not my opinion.', note: 'Polite disagreement — stating your position differs without attacking theirs.' },
      { fr: 'Je ne suis pas tout à fait d\'accord.', en: 'I don\'t entirely agree.', note: 'Partial disagreement — more diplomatic. "Pas tout à fait" = not entirely.' },
      { fr: 'Tu as tort.', en: 'You\'re wrong.', note: 'Direct — the French use this more comfortably than English speakers. Not necessarily aggressive.' },
      { fr: 'Pas forcément.', en: 'Not necessarily.', note: 'A gentle pushback — doesn\'t fully deny, but questions the certainty.' },
      { fr: 'Je vois les choses différemment.', en: 'I see things differently.', note: 'Diplomatic — acknowledges the difference without confrontation.' },
      { fr: 'Je n\'en suis pas si sûr(e).', en: 'I\'m not so sure about that.', note: 'Politely expresses doubt without total rejection.' },
      { fr: 'Permettez-moi d\'en douter.', en: 'Allow me to doubt that.', note: 'Formal and slightly ironic — used in written or formal debate.' },
      { fr: 'C\'est une vision que je ne partage pas.', en: 'That\'s a view I don\'t share.', note: 'Formal — "vision" = perspective/view. Elegant in written French.' },
    ],
  },
  {
    category: 'Expressing uncertainty',
    icon: '🤔',
    items: [
      { fr: 'Je ne sais pas.', en: 'I don\'t know.', note: '"Je sais pas" = spoken shortening (no "ne"). Very common in speech.' },
      { fr: 'Peut-être.', en: 'Maybe / Perhaps.', note: '"Peut-être bien" = maybe, possibly. "Peut-être que + indicative" = perhaps that...' },
      { fr: 'C\'est possible.', en: 'It\'s possible.', note: '"Il est possible que + subjunctive" = it is possible that... (formal).' },
      { fr: 'Ça dépend.', en: 'It depends.', note: '"Ça dépend de..." = it depends on... Followed by noun or "si/que".' },
      { fr: 'Bof, je ne sais pas trop.', en: 'Meh, I\'m not really sure.', note: '"Bof" = uniquely French expression of mild indifference or uncertainty — one of the most expressive French sounds.' },
      { fr: 'C\'est difficile à dire.', en: 'It\'s hard to say.', note: 'A genuine reflection rather than evasion.' },
      { fr: 'Je n\'ai pas d\'opinion là-dessus.', en: 'I don\'t have an opinion on that.', note: '"Là-dessus" = on that / about that.' },
      { fr: 'Il faudrait y réfléchir davantage.', en: 'We\'d need to think about it more.', note: '"Davantage" = more (adverb). Formal and thoughtful response.' },
    ],
  },
  {
    category: 'Asking for opinions',
    icon: '❓',
    items: [
      { fr: 'Qu\'est-ce que tu en penses ?', en: 'What do you think (about it)?', note: '"En" refers back to the topic just discussed.' },
      { fr: 'Quel est ton avis (sur la question) ?', en: 'What\'s your opinion (on the matter)?', note: '"Sur la question" = on the matter — makes it slightly more formal.' },
      { fr: 'Tu es d\'accord ?', en: 'Do you agree?', note: 'Simple and direct. "Vous êtes d\'accord ?" = formal.' },
      { fr: 'Et toi, qu\'est-ce que tu en penses ?', en: 'And you, what do you think?', note: '"Et toi ?" alone = and you? — inviting someone into the conversation.' },
      { fr: 'C\'est quoi ta position là-dessus ?', en: 'What\'s your stance on that?', note: 'Informal but direct — good for debates.' },
      { fr: 'Tu as l\'air de douter — pourquoi ?', en: 'You seem doubtful — why?', note: '"Avoir l\'air de" = to seem to. Invites explanation.' },
    ],
  },
]

const DEBATE_CONNECTORS = [
  { fr: 'D\'un côté… de l\'autre côté…', en: 'On one hand… on the other hand…', type: 'Contrast', note: 'The standard French essay structure: thesis → antithesis → synthesis.' },
  { fr: 'Certes, mais…', en: 'Granted, but… / Admittedly, but…', type: 'Concession', note: '"Certes" = admittedly/granted. One of the most sophisticated concession words.' },
  { fr: 'Cependant,…', en: 'However,…', type: 'Contrast', note: 'Formal — preferred in written French over "mais".' },
  { fr: 'Néanmoins,…', en: 'Nevertheless,…', type: 'Contrast', note: 'Strong contrast — acknowledges the previous point but asserts something opposite.' },
  { fr: 'En revanche,…', en: 'On the other hand,…', type: 'Contrast', note: '"En revanche" ≠ "revenge" — it means "in return/contrast". A very useful French connector.' },
  { fr: 'Par ailleurs,…', en: 'Furthermore / Moreover / Also,…', type: 'Addition', note: 'Adds a new but related point. "Par ailleurs" = furthermore (also = besides).' },
  { fr: 'En outre,…', en: 'In addition / Furthermore,…', type: 'Addition', note: 'Formal — used in written French and formal presentations.' },
  { fr: 'De plus,…', en: 'Moreover / In addition,…', type: 'Addition', note: 'Very common addition connector — slightly less formal than "en outre".' },
  { fr: 'C\'est pourquoi…', en: 'That is why… / For this reason…', type: 'Consequence', note: '"C\'est pourquoi" introduces the logical consequence of what was just said.' },
  { fr: 'Ainsi,…', en: 'Thus / Therefore / And so,…', type: 'Consequence', note: '"Ainsi" = thus. Formal but elegant in both speech and writing.' },
  { fr: 'En conclusion,…', en: 'In conclusion,…', type: 'Conclusion', note: 'Standard essay / debate conclusion.' },
  { fr: 'En résumé / En somme,…', en: 'In summary / In short,…', type: 'Conclusion', note: '"En somme" is slightly more elegant than "en résumé".' },
  { fr: 'Il convient de souligner que…', en: 'It is worth noting that… / It should be highlighted that…', type: 'Emphasis', note: 'Formal and precise — used in academic and professional writing.' },
  { fr: 'Force est de constater que…', en: 'One must acknowledge that… / It must be noted that…', type: 'Emphasis', note: 'Very formal and emphatic — used in high-level French writing. Signals something inescapable.' },
]

const TYPE_COLORS = {
  Contrast: 'bg-orange-100 text-orange-700',
  Concession: 'bg-purple-100 text-purple-700',
  Addition: 'bg-blue-100 text-blue-700',
  Consequence: 'bg-green-100 text-green-700',
  Conclusion: 'bg-gray-100 text-gray-700',
  Emphasis: 'bg-red-100 text-red-700',
}

export default function FrenchOpinions() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [tab, setTab] = useState('opinions')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Opinion Phrases | SayBonjour!" description="Express and debate opinions in French — giving opinions, agreeing, disagreeing, uncertainty phrases, and debate connectors." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Expressing Opinions in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Exprimer son opinion — agree, disagree, and debate like a native</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'opinions', label: 'Opinion Phrases' }, { id: 'connectors', label: 'Debate Connectors' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'opinions' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {OPINION_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.icon} {g.category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {OPINION_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
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
          </>
        )}

        {tab === 'connectors' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300 mb-2">
              These linking words structure debates, essays, and arguments — essential for DELF B1/B2, academic writing, and sophisticated conversation.
            </div>
            {DEBATE_CONNECTORS.map((c, i) => (
              <motion.div key={c.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={c.fr} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{c.fr}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${TYPE_COLORS[c.type]}`}>{c.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{c.en}</p>
                  {c.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {c.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
