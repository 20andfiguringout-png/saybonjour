import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, Zap } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CATEGORIES = {
  'Faire + noun': {
    desc: 'Many common activities in French use "faire" + a noun where English uses a verb alone.',
    items: [
      { construction: 'faire la cuisine', en: 'to cook', example: 'Elle fait la cuisine tous les soirs.', exampleEn: 'She cooks every evening.' },
      { construction: 'faire les courses', en: 'to do the shopping', example: 'Je fais les courses le samedi.', exampleEn: 'I do the shopping on Saturdays.' },
      { construction: 'faire la vaisselle', en: 'to wash up / do the dishes', example: 'Il fait la vaisselle après le dîner.', exampleEn: 'He washes up after dinner.' },
      { construction: 'faire une promenade', en: 'to go for a walk', example: 'On fait une promenade au parc ?', exampleEn: 'Shall we go for a walk in the park?' },
      { construction: 'faire la grasse matinée', en: 'to sleep in / have a lie-in', example: 'Le dimanche, je fais la grasse matinée.', exampleEn: 'On Sundays, I have a lie-in.' },
      { construction: 'faire semblant de', en: 'to pretend to', example: 'Il fait semblant de dormir.', exampleEn: 'He is pretending to sleep.' },
      { construction: 'faire la queue', en: 'to queue / stand in line', example: 'Nous avons fait la queue pendant une heure.', exampleEn: 'We queued for an hour.' },
      { construction: 'faire du sport', en: 'to do sport / exercise', example: 'Elle fait du sport trois fois par semaine.', exampleEn: 'She exercises three times a week.' },
    ],
  },
  'Avoir + noun': {
    desc: '"Avoir" is used in French where English uses "to be" for many states and feelings.',
    items: [
      { construction: 'avoir faim', en: 'to be hungry', example: 'J\'ai très faim ce soir.', exampleEn: 'I am very hungry tonight.' },
      { construction: 'avoir soif', en: 'to be thirsty', example: 'Tu as soif ? Je vais chercher de l\'eau.', exampleEn: 'Are you thirsty? I\'ll get some water.' },
      { construction: 'avoir chaud / froid', en: 'to be hot / cold', example: 'Il a froid, il a besoin d\'un manteau.', exampleEn: 'He is cold, he needs a coat.' },
      { construction: 'avoir peur de', en: 'to be afraid of', example: 'Elle a peur des araignées.', exampleEn: 'She is afraid of spiders.' },
      { construction: 'avoir raison / tort', en: 'to be right / wrong', example: 'Tu as raison — j\'avais tort.', exampleEn: 'You are right — I was wrong.' },
      { construction: 'avoir besoin de', en: 'to need / to be in need of', example: 'J\'ai besoin d\'aide.', exampleEn: 'I need help.' },
      { construction: 'avoir envie de', en: 'to feel like / to want', example: 'J\'ai envie d\'une glace.', exampleEn: 'I feel like an ice cream.' },
      { construction: 'avoir lieu', en: 'to take place', example: 'Le concert a lieu ce soir.', exampleEn: 'The concert is taking place tonight.' },
      { construction: 'avoir du mal à', en: 'to struggle to / have difficulty', example: 'Il a du mal à comprendre.', exampleEn: 'He struggles to understand.' },
      { construction: 'avoir l\'air', en: 'to seem / to look (+ adj)', example: 'Tu as l\'air fatigué(e).', exampleEn: 'You look tired.' },
    ],
  },
  'Se + verb (reflexive)': {
    desc: 'Many French verbs are reflexive — the subject acts upon itself. Often daily routines.',
    items: [
      { construction: 'se réveiller', en: 'to wake up', example: 'Je me réveille à 7 heures.', exampleEn: 'I wake up at 7 o\'clock.' },
      { construction: 'se lever', en: 'to get up', example: 'Il se lève tôt le matin.', exampleEn: 'He gets up early in the morning.' },
      { construction: 'se doucher', en: 'to shower', example: 'Elle se douche avant le travail.', exampleEn: 'She showers before work.' },
      { construction: 'se souvenir de', en: 'to remember', example: 'Tu te souviens de lui ?', exampleEn: 'Do you remember him?' },
      { construction: 'se tromper', en: 'to make a mistake', example: 'Je me suis trompé(e), pardon.', exampleEn: 'I made a mistake, sorry.' },
      { construction: 'se débrouiller', en: 'to manage / to get by', example: 'Il se débrouille bien en français.', exampleEn: 'He manages well in French.' },
      { construction: 's\'en aller', en: 'to go away / to leave', example: 'Allez, on s\'en va !', exampleEn: 'Come on, let\'s go!' },
      { construction: 'se rendre compte', en: 'to realise', example: 'Je me suis rendu compte de mon erreur.', exampleEn: 'I realised my mistake.' },
    ],
  },
  'Être en train de': {
    desc: 'Express something currently in progress — the French equivalent of the English "-ing" form.',
    items: [
      { construction: 'être en train de + infinitive', en: 'to be (currently) doing', example: 'Je suis en train de travailler.', exampleEn: 'I am (in the process of) working.' },
      { construction: 'il était en train de…', en: 'he was (in the middle of)…', example: 'Il était en train de manger quand le téléphone a sonné.', exampleEn: 'He was eating when the phone rang.' },
      { construction: 'on était en train de discuter', en: 'we were having a discussion', example: 'Désolé, on était en train de discuter.', exampleEn: 'Sorry, we were having a discussion.' },
    ],
  },
  'Venir de + infinitive': {
    desc: 'Express something that has just happened — the recent past construction.',
    items: [
      { construction: 'venir de + infinitive', en: 'to have just done', example: 'Je viens de finir mon travail.', exampleEn: 'I have just finished my work.' },
      { construction: 'il vient d\'arriver', en: 'he has just arrived', example: 'Il vient d\'arriver — il est encore au couloir.', exampleEn: 'He has just arrived — he is still in the hallway.' },
      { construction: 'on venait de partir', en: 'we had just left', example: 'On venait de partir quand il a appelé.', exampleEn: 'We had just left when he called.' },
    ],
  },
  'Aller + infinitive': {
    desc: 'The near future — express what is about to happen.',
    items: [
      { construction: 'aller + infinitive', en: 'to be going to do', example: 'Je vais partir dans cinq minutes.', exampleEn: 'I am going to leave in five minutes.' },
      { construction: 'il va pleuvoir', en: 'it is going to rain', example: 'Prends ton parapluie — il va pleuvoir.', exampleEn: 'Take your umbrella — it\'s going to rain.' },
      { construction: 'on va voir', en: 'we\'ll see', example: 'On va voir ce qu\'il dit.', exampleEn: 'We\'ll see what he says.' },
    ],
  },
}

export default function PhrasalVerbs() {
  const [expanded, setExpanded] = useState('Avoir + noun')
  const [mastered, setMastered] = useState(() => {
    try { return JSON.parse(localStorage.getItem('saybonjour_phrasal_mastered') || '[]') } catch { return [] }
  })

  const toggleMaster = (construction) => {
    setMastered(prev => {
      const next = prev.includes(construction) ? prev.filter(c => c !== construction) : [...prev, construction]
      localStorage.setItem('saybonjour_phrasal_mastered', JSON.stringify(next))
      if (!prev.includes(construction)) addXP(5, 'grammar')
      return next
    })
  }

  const totalItems = Object.values(CATEGORIES).reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Verb Constructions | SayBonjour!" description="Master French verb patterns — avoir faim, faire la cuisine, se souvenir, être en train de." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Verb Constructions</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Expressions verbales — the patterns that unlock fluency</p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-dark-warm-100 rounded-xl border border-gray-100 dark:border-dark-warm-50 shadow px-4 py-3 mb-6">
          <Zap size={16} className="text-amber-500" />
          <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-bold text-burgundy-600">{mastered.length}</span> / {totalItems} constructions mastered
          </div>
          <div className="w-32 h-2 bg-gray-100 dark:bg-dark-warm-200 rounded-full">
            <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(mastered.length / totalItems) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(CATEGORIES).map(([cat, data]) => {
            const isOpen = expanded === cat
            const catMastered = data.items.filter(i => mastered.includes(i.construction)).length
            return (
              <div key={cat} className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : cat)}
                  className="w-full text-left px-6 py-4 flex items-center gap-3">
                  <BookOpen size={18} className="text-burgundy-600 shrink-0" />
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-900 dark:text-cream-50">{cat}</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{catMastered}/{data.items.length} mastered</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{data.desc}</p>
                        <div className="space-y-3">
                          {data.items.map(item => {
                            const isMastered = mastered.includes(item.construction)
                            return (
                              <div key={item.construction}
                                className={`rounded-xl border-2 p-4 transition-colors ${isMastered ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/10' : 'border-gray-100 dark:border-dark-warm-50 bg-cream-50 dark:bg-dark-warm-200'}`}>
                                <div className="flex items-start gap-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <span className="font-bold text-burgundy-700 dark:text-burgundy-vibrant-300 font-mono text-sm">{item.construction}</span>
                                      <span className="text-gray-400 text-xs">= {item.en}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <SpeakButton text={item.example} size="sm" />
                                      <div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">{item.example}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.exampleEn}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={() => toggleMaster(item.construction)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors shrink-0 ${isMastered ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600 hover:text-emerald-400'}`}>
                                    <CheckCircle2 size={18} fill={isMastered ? 'currentColor' : 'none'} />
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
