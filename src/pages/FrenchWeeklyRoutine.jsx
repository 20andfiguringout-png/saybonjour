import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ROUTINE_VOCAB = [
  { fr: 'se réveiller', en: 'to wake up', refl: true, note: 'je me réveille, tu te réveilles, il/elle se réveille', example: 'Je me réveille à sept heures du matin.' },
  { fr: 'se lever', en: 'to get up (out of bed)', refl: true, note: 'Different from "se réveiller" — you can wake up before getting up', example: 'Je me lève dix minutes après mon réveil.' },
  { fr: 'se doucher / prendre une douche', en: 'to shower', note: '"Une douche" = a shower (noun). "Un bain" = a bath. "J\'ai besoin de me doucher" = I need a shower.', example: 'Je me douche chaque matin pendant cinq minutes.' },
  { fr: 'se laver les dents', en: 'to brush one\'s teeth', refl: true, note: '"Se brosser les dents" is also used — exact same meaning', example: 'Je me lave les dents après le petit-déjeuner.' },
  { fr: 'se raser', en: 'to shave (oneself)', refl: true, note: '"Un rasoir" = a razor. "La mousse à raser" = shaving foam.', example: 'Il se rase tous les deux jours.' },
  { fr: 'se maquiller', en: 'to put on make-up', refl: true, note: '"Le maquillage" = make-up. "Un fond de teint" = foundation.', example: 'Elle se maquille légèrement pour aller au travail.' },
  { fr: 's\'habiller', en: 'to get dressed', refl: true, note: 'Opposite: "se déshabiller" = to undress. "Bien habillé(e)" = well-dressed.', example: 'Il s\'habille rapidement le matin.' },
  { fr: 'prendre le petit-déjeuner', en: 'to have breakfast', note: '"Le petit-déjeuner" = breakfast. "Petit-déj" = informal. French breakfast: café + baguette + beurre + confiture.', example: 'Je prends le petit-déjeuner debout en lisant les infos.' },
  { fr: 'partir au travail / à l\'école', en: 'to leave for work / school', note: '"Partir" = to leave (a place). "Quitter" = to leave permanently. "Je pars à 8h" = I leave at 8.', example: 'Je pars au travail à huit heures et demie.' },
  { fr: 'prendre le métro / le bus / le train', en: 'to take the metro / bus / train', note: 'Or: "Je prends ma voiture" = I take my car. "Je vais au travail à pied" = I walk.', example: 'Je prends le métro ligne 4 pour aller au bureau.' },
  { fr: 'arriver au bureau / à l\'école', en: 'to arrive at the office / school', note: '"Arriver" = irregular past: "je suis arrivé(e)". Uses être in passé composé.', example: 'J\'arrive au bureau vers neuf heures moins cinq.' },
  { fr: 'travailler', en: 'to work', note: '"Télétravailler" = to work from home (very common post-COVID). "Le bureau" = the office.', example: 'Je travaille de neuf heures à dix-huit heures.' },
  { fr: 'déjeuner', en: 'to have lunch', note: '"Le déjeuner" = lunch (noun). "La pause déjeuner" = the lunch break. French lunch is usually 1–1.5 hours.', example: 'Je déjeune avec des collègues à la cantine.' },
  { fr: 'rentrer à la maison', en: 'to come home / return home', note: '"Rentrer" = to return home specifically. Different from "retourner" (to return somewhere else).', example: 'Je rentre à la maison vers dix-neuf heures.' },
  { fr: 'faire la cuisine / cuisiner', en: 'to cook', note: '"Faire la cuisine" and "cuisiner" are interchangeable. "Faire à manger" is also very common.', example: 'Je fais la cuisine pendant que mon mari met la table.' },
  { fr: 'dîner', en: 'to have dinner', note: '"Le dîner" = dinner/supper (noun). In France, dinner is typically 7:30–8:30pm — later than in northern Europe.', example: 'On dîne en famille tous les soirs à vingt heures.' },
  { fr: 'se détendre / se reposer', en: 'to relax / to rest', refl: true, note: '"Se détendre" = to unwind/relax. "Se reposer" = to rest (after effort). Both are reflexive.', example: 'Le soir, je me détends en lisant ou en écoutant de la musique.' },
  { fr: 'regarder la télé / une série', en: 'to watch TV / a series', note: '"La télé" = informal. "Les infos" = the news. "Une série" = a TV series.', example: 'On regarde une série sur Netflix avant de dormir.' },
  { fr: 'se coucher', en: 'to go to bed', refl: true, note: '"Mettre quelqu\'un au lit" = to put someone to bed (a child). "L\'heure de se coucher" = bedtime.', example: 'Je me couche vers vingt-trois heures en semaine.' },
  { fr: 's\'endormir', en: 'to fall asleep', refl: true, note: '"Je dors" = I sleep. "Je m\'endors" = I fall asleep. Important distinction!', example: 'Je m\'endors en quelques minutes quand je suis fatigué(e).' },
]

const TIME_EXPRESSIONS = [
  { fr: 'le matin', en: 'in the morning', note: 'Specific time: "à sept heures du matin" (at 7 in the morning)' },
  { fr: 'l\'après-midi', en: 'in the afternoon', note: 'Also: "cet après-midi" = this afternoon' },
  { fr: 'le soir', en: 'in the evening', note: '"Ce soir" = tonight; "tous les soirs" = every evening' },
  { fr: 'la nuit', en: 'at night', note: '"Cette nuit" = tonight/last night; "de nuit" = night (adj): "le travail de nuit"' },
  { fr: 'le week-end', en: 'at the weekend', note: '"Ce week-end" = this weekend; "les week-ends" = at weekends' },
  { fr: 'en semaine', en: 'during the week / on weekdays', note: 'Contrast with "le week-end". "En semaine, je travaille."' },
  { fr: 'tous les jours', en: 'every day', note: '"Chaque jour" = each day (same meaning, slightly more formal)' },
  { fr: 'toujours', en: 'always', note: 'Position: after the verb. "Je me lève toujours tôt."' },
  { fr: 'souvent', en: 'often', note: '"Plus souvent" = more often; "assez souvent" = quite often' },
  { fr: 'parfois / quelquefois', en: 'sometimes', note: '"Parfois" is more common in speech; "quelquefois" slightly more formal' },
  { fr: 'de temps en temps', en: 'from time to time', note: '"De temps à autre" is a formal equivalent' },
  { fr: 'rarement', en: 'rarely', note: '"Je vais rarement au restaurant" = I rarely go to restaurants' },
  { fr: 'jamais', en: 'never', note: 'Requires "ne": "Je ne fais jamais ça." In speech, "ne" is often dropped: "Je fais jamais ça."' },
  { fr: 'd\'habitude', en: 'usually / as usual', note: '"D\'hab" = informal shortening. "Comme d\'habitude" = as usual.' },
  { fr: 'normalement', en: 'normally / usually', note: 'Also implies "if things go as expected"' },
  { fr: 'en général', en: 'generally / in general', note: '"En général, je préfère..." = Generally speaking, I prefer...' },
  { fr: 'vers + time', en: 'around / at about (a time)', note: '"Vers huit heures" = at around 8 o\'clock. Much softer than "à huit heures" (exactly at 8).' },
  { fr: 'tôt / tard', en: 'early / late', note: '"Se lever tôt" = to get up early. "Rester debout tard" = to stay up late.' },
]

const SAMPLE_ROUTINE = [
  { time: '6h30', fr: 'Mon réveil sonne. Je me lève directement.', en: 'My alarm goes off. I get straight up.' },
  { time: '6h40', fr: 'Je me douche et je me lave les dents.', en: 'I shower and brush my teeth.' },
  { time: '7h00', fr: 'Je m\'habille et je me prépare.', en: 'I get dressed and get ready.' },
  { time: '7h20', fr: 'Je prends un café et une tartine au petit-déjeuner.', en: 'I have a coffee and toast for breakfast.' },
  { time: '7h45', fr: 'Je pars au travail en métro.', en: 'I leave for work by metro.' },
  { time: '8h30', fr: 'J\'arrive au bureau. Je consulte mes emails.', en: 'I arrive at the office. I check my emails.' },
  { time: '9h00', fr: 'Je commence mes réunions et mon travail.', en: 'I start my meetings and my work.' },
  { time: '12h30', fr: 'Je déjeune avec des collègues au restaurant d\'entreprise.', en: 'I have lunch with colleagues at the company restaurant.' },
  { time: '13h30', fr: 'Je reprends le travail jusqu\'à dix-huit heures.', en: 'I go back to work until 6pm.' },
  { time: '18h15', fr: 'Je rentre à la maison en métro.', en: 'I come home by metro.' },
  { time: '19h30', fr: 'Je fais la cuisine et je mets la table.', en: 'I cook and set the table.' },
  { time: '20h00', fr: 'On dîne en famille.', en: 'We have dinner together as a family.' },
  { time: '21h00', fr: 'Je me détends en lisant ou en regardant une série.', en: 'I relax by reading or watching a series.' },
  { time: '23h00', fr: 'Je me couche et je m\'endors rapidement.', en: 'I go to bed and fall asleep quickly.' },
]

const WEEKEND_ROUTINE = [
  { time: '8h30', fr: 'Je me réveille sans réveil — on fait la grasse matinée.', en: 'I wake up without an alarm — we have a lie-in.' },
  { time: '9h00', fr: 'Je prends un petit-déjeuner long avec des croissants.', en: 'I have a leisurely breakfast with croissants.' },
  { time: '10h00', fr: 'Je vais faire les courses au marché du quartier.', en: 'I go shopping at the local market.' },
  { time: '12h00', fr: 'On prépare le déjeuner — un repas long et convivial.', en: 'We prepare lunch — a long and convivial meal.' },
  { time: '14h30', fr: 'On fait une petite sieste ou une promenade.', en: 'We have a little nap or a walk.' },
  { time: '16h00', fr: 'Je retrouve des amis pour un café ou un apéro.', en: 'I meet friends for a coffee or aperitif.' },
  { time: '19h00', fr: 'L\'apéro s\'enchaîne — on reste à dîner ensemble.', en: 'The aperitif turns into dinner — we stay to eat together.' },
  { time: '22h30', fr: 'Je rentre et je me couche — demain c\'est dimanche.', en: 'I go home and go to bed — tomorrow is Sunday.' },
]

const FRENCH_DAILY_CULTURE = [
  { emoji: '☕', title: 'Le petit-déjeuner français', detail: 'French breakfast is famously light: a café or café au lait, with a tartine (slice of baguette) with butter and jam, or a croissant. No cooked breakfast — that\'s very Anglo-Saxon. Children drink hot chocolate (chocolat chaud) with dipping bread. The French make up for it at lunch.' },
  { emoji: '🥗', title: 'La pause déjeuner — the sacred hour', detail: 'The French lunch break (traditionally 12–2pm) is legally protected and culturally sacred. Many companies and shops close for 1.5–2 hours. Eating at your desk is frowned upon. A hot 2-course meal is standard — the "formule" (set menu) at a nearby café is the worker\'s solution.' },
  { emoji: '😴', title: 'La sieste — the afternoon nap', detail: 'While less common in Paris, the siesta is alive and well in southern France (especially in August). Spanish and Italian cultures revere it; France is somewhere in between. French children have "le temps calme" at school. Some French companies now offer a napping room.' },
  { emoji: '🍷', title: 'L\'apéro — pre-dinner ritual', detail: '"L\'apéro" (apéritif) happens at 6–8pm — wine, pastis, kir, beer, with olives and nibbles. It\'s a social institution. "Viens à l\'apéro" (come for drinks) is an invitation to a deeply French ritual. It often extends well into dinner time — "l\'apéro dînatoire" is a full evening of nibbles and drinks.' },
]

export default function FrenchWeeklyRoutine() {
  const [tab, setTab] = useState('routine')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Daily Routine | SayBonjour!" description="Describe your daily routine in French — 20 reflexive verbs with examples, time expressions, sample day, weekend routine, and French daily culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Daily Routine in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La routine quotidienne — reflexive verbs, time expressions, and a typical French day</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'routine', label: 'Routine Verbs' },
            { id: 'time', label: 'Time Expressions' },
            { id: 'sample', label: 'Sample Weekday' },
            { id: 'weekend', label: 'Weekend Routine' },
            { id: 'culture', label: 'French Daily Life' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'routine' && (
          <>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800 dark:text-amber-300">
              💡 Many daily routine verbs are <strong>reflexive</strong> (verbes pronominaux) — the action is done to yourself. They always need a reflexive pronoun: <strong>me</strong> (je), <strong>te</strong> (tu), <strong>se</strong> (il/elle), <strong>nous</strong>, <strong>vous</strong>, <strong>se</strong> (ils/elles). In the passé composé, reflexive verbs use <strong>être</strong>.
            </div>
            <div className="space-y-3">
              {ROUTINE_VOCAB.map((v, i) => (
                <motion.div key={v.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3 cursor-pointer"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={v.fr.split('/')[0].trim()} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                      <span className="text-xs text-gray-400">— {v.en}</span>
                      {v.refl && <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-medium">réfl.</span>}
                    </div>
                    {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-1">💡 {v.note}</p>}
                    {v.example && (
                      <div className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2 py-1.5">
                        <SpeakButton text={v.example} size="sm" />
                        <p className="text-xs italic text-gray-500 dark:text-gray-400">"{v.example}"</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'time' && (
          <div className="space-y-2">
            {TIME_EXPRESSIONS.map((t, i) => (
              <motion.div key={t.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={t.fr.replace('+ time', '')} size="sm" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{t.fr}</span>
                    <span className="text-xs text-gray-400">— {t.en}</span>
                  </div>
                  {t.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {t.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'sample' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">A typical French working day — you can use this as a model to describe your own routine.</p>
            {SAMPLE_ROUTINE.map((item, i) => (
              <motion.div key={item.time} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-center gap-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="w-14 text-center shrink-0">
                  <span className="font-mono font-bold text-sm text-burgundy-600 dark:text-burgundy-vibrant-300">{item.time}</span>
                </div>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50 italic">"{item.fr}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'weekend' && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">The French weekend (especially Saturday) — a more leisurely pace, good food, and time with friends and family.</p>
            {WEEKEND_ROUTINE.map((item, i) => (
              <motion.div key={item.time} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-center gap-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="w-14 text-center shrink-0">
                  <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">{item.time}</span>
                </div>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50 italic">"{item.fr}"</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {FRENCH_DAILY_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
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
      </div>
    </div>
  )
}
