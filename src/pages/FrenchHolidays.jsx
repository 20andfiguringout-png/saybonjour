import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Globe, Gift } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HOLIDAYS = [
  {
    date: '1 janvier', name: 'Le Jour de l\'An', en: 'New Year\'s Day', emoji: '🎆', type: 'Civil',
    desc: 'Celebrated with the réveillon du Nouvel An — a late-night feast on the 31st. "Bonne année !" is exchanged into January. Traditionally, adults give étrennes (monetary gifts) to children and service workers. The French government broadcasts a speech at midnight.',
    vocab: [{ fr: 'Bonne année !', en: 'Happy New Year!' }, { fr: 'un réveillon', en: 'a late-night celebration / feast' }, { fr: 'les vœux', en: 'wishes / New Year greetings' }]
  },
  {
    date: 'Variable (mars/avril)', name: 'Pâques & Lundi de Pâques', en: 'Easter & Easter Monday', emoji: '🥚', type: 'Religious',
    desc: 'A major family holiday. According to French tradition, the church bells fly to Rome on Good Friday and return at Easter with chocolate eggs — a beloved story for children. Easter Monday (Lundi de Pâques) is an official public holiday. French pâtisseries produce elaborate chocolate displays.',
    vocab: [{ fr: 'Joyeuses Pâques !', en: 'Happy Easter!' }, { fr: 'les cloches de Pâques', en: 'the Easter bells' }, { fr: 'un œuf en chocolat', en: 'a chocolate egg' }]
  },
  {
    date: '1 mai', name: 'La Fête du Travail', en: 'Labour Day / May Day', emoji: '🌼', type: 'Civil',
    desc: 'The only French public holiday where shops are legally required to close. The tradition of giving lily of the valley (le muguet) for good luck dates to 1561, when Charles IX received a sprig. Union marches (défilés syndicaux) are held in major cities. Vendors sell muguet outside supermarkets.',
    vocab: [{ fr: 'le muguet', en: 'lily of the valley' }, { fr: 'un défilé syndical', en: 'a trade union march' }, { fr: 'Bonne fête du Travail !', en: 'Happy May Day!' }]
  },
  {
    date: '8 mai', name: 'La Victoire 1945', en: 'Victory in Europe Day', emoji: '🕊️', type: 'Civil',
    desc: 'Commemorates Germany\'s surrender and the end of World War II in Europe on 8 May 1945. The President lays a wreath at the Tomb of the Unknown Soldier under the Arc de Triomphe. Ceremonies are held at war memorials (monuments aux morts) across the country.',
    vocab: [{ fr: 'un monument aux morts', en: 'a war memorial' }, { fr: 'l\'Armistice', en: 'the Armistice / ceasefire' }, { fr: 'la Résistance', en: 'the (French) Resistance' }]
  },
  {
    date: 'Variable (mai)', name: 'L\'Ascension', en: 'Ascension Day', emoji: '⛪', type: 'Religious',
    desc: 'Falls 39 days after Easter — always on a Thursday, making it a popular day for a long weekend (faire le pont, bridging to Monday). Celebrates the Christian feast of Jesus\' ascension. One of six Catholic-origin public holidays in France.',
    vocab: [{ fr: 'faire le pont', en: 'to take a long weekend (lit. to bridge)' }, { fr: 'un week-end prolongé', en: 'a long weekend' }]
  },
  {
    date: 'Variable (mai/juin)', name: 'La Pentecôte & Lundi de Pentecôte', en: 'Whitsun & Whit Monday', emoji: '🕊️', type: 'Religious',
    desc: 'Whit Monday (Lundi de Pentecôte) is officially a public holiday. From 2004–2007, France controversially abolished this holiday to fund care for the elderly after the 2003 heatwave killed 14,000 people — but it was restored in 2008.',
    vocab: [{ fr: 'la Pentecôte', en: 'Whitsun / Pentecost' }, { fr: 'une journée de solidarité', en: 'solidarity day (unpaid work day for charity)' }]
  },
  {
    date: '14 juillet', name: 'La Fête Nationale', en: 'Bastille Day', emoji: '🇫🇷', type: 'Civil',
    desc: 'France\'s national day — one of the most important in the calendar. The military parade on the Champs-Élysées is the world\'s oldest and largest. It commemorates both the Storming of the Bastille (1789) and the Fête de la Fédération (1790). Fireworks light up every French town. Bal des pompiers (firemen\'s balls) are a beloved tradition.',
    vocab: [{ fr: 'le défilé militaire', en: 'the military parade' }, { fr: 'le feu d\'artifice', en: 'fireworks' }, { fr: 'le bal des pompiers', en: 'the firemen\'s ball (popular street dance)' }]
  },
  {
    date: '15 août', name: 'L\'Assomption', en: 'Assumption of Mary', emoji: '☀️', type: 'Religious',
    desc: 'The peak of French summer holiday season — France effectively shuts down in August. This Catholic feast celebrates the Virgin Mary\'s assumption into heaven. Historically, many factories and businesses closed for the entire month of August. "Faire le pont" is common if 15 août falls on a Thursday or Tuesday.',
    vocab: [{ fr: 'les grandes vacances', en: 'the long summer holidays' }, { fr: 'août', en: 'August (the main holiday month)' }]
  },
  {
    date: '1 novembre', name: 'La Toussaint', en: 'All Saints\' Day', emoji: '🌸', type: 'Religious',
    desc: 'A deeply observed day of family remembrance. Families visit cemeteries to place chrysanthemums (les chrysanthèmes) on graves — so strongly associated with Toussaint that you should never give chrysanthemums as a gift in France. Schools have a full week off (les vacances de la Toussaint). A quiet, reflective day.',
    vocab: [{ fr: 'le chrysanthème', en: 'chrysanthemum (the Toussaint flower)' }, { fr: 'le cimetière', en: 'the cemetery' }, { fr: 'les vacances de la Toussaint', en: 'half-term / autumn school holiday' }]
  },
  {
    date: '11 novembre', name: 'L\'Armistice', en: 'Armistice Day', emoji: '🎗️', type: 'Civil',
    desc: 'Commemorates the Armistice of 11 November 1918 ending World War I — in which France lost 1.4 million soldiers. The President lays a wreath at the Tomb of the Unknown Soldier beneath the Arc de Triomphe. At 11am, a minute of silence is observed. A solemn national observance across all towns.',
    vocab: [{ fr: 'la minute de silence', en: 'the minute of silence' }, { fr: 'la Grande Guerre', en: 'the Great War (WWI)' }, { fr: 'un soldat inconnu', en: 'an unknown soldier' }]
  },
  {
    date: '25 décembre', name: 'Noël', en: 'Christmas Day', emoji: '🎄', type: 'Religious',
    desc: 'The French celebrate Christmas Eve (la nuit de Noël / le réveillon de Noël) as the main event — with a grand family feast after midnight mass. Traditional dishes include foie gras, smoked salmon, oysters, and a bûche de Noël (Yule log cake). Christmas Day itself is quieter. Père Noël (Father Christmas) brings presents.',
    vocab: [{ fr: 'le réveillon de Noël', en: 'Christmas Eve feast' }, { fr: 'la bûche de Noël', en: 'Yule log cake (Christmas dessert)' }, { fr: 'Joyeux Noël !', en: 'Merry Christmas!' }]
  },
]

const NON_OFFICIAL = [
  { name: 'La Saint-Valentin', date: '14 février', en: 'Valentine\'s Day', desc: 'Celebrated romantically — restaurants are fully booked weeks in advance. The "loterie d\'amour" (love lottery) was a traditional French practice before Valentine\'s Day as we know it.', emoji: '❤️' },
  { name: 'La Chandeleur', date: '2 février', en: 'Candlemas / Crêpe Day', desc: 'The French make and eat crêpes on Candlemas — the tradition is to flip the crêpe with one hand while holding a coin in the other for good luck in the coming year.', emoji: '🥞' },
  { name: 'La Saint-Nicolas', date: '6 décembre', en: 'St Nicholas Day', desc: 'Celebrated in eastern France (Alsace, Lorraine) and Belgium. St. Nicholas brings gifts for well-behaved children. A major event in Strasbourg\'s Christmas market.', emoji: '🎅' },
  { name: 'La Fête de la Musique', date: '21 juin', en: 'Music Day / Summer Solstice', desc: 'Created in France in 1982, now celebrated in 120+ countries. Free concerts fill every street, town square, and garden across France — from classical to electronic. "Faites de la musique !" = make music!', emoji: '🎵' },
  { name: 'La Fête des Mères', date: 'Dernier dimanche de mai', en: 'Mother\'s Day', desc: 'France\'s Mother\'s Day — officially established in 1950. Children give flowers, cards, and presents to their mothers. Restaurants are fully booked.', emoji: '💐' },
  { name: 'La Galette des Rois', date: 'Début janvier', en: 'Epiphany King Cake', desc: 'From 6 January (Epiphany) through January, French pâtisseries sell galettes des rois — puff pastry cakes with a frangipane filling and a hidden ceramic figure (la fève). Whoever finds it wears the paper crown and becomes king or queen.', emoji: '👑' },
]

const GREETINGS = [
  { fr: 'Bonne année !', en: 'Happy New Year!', when: 'New Year (said until mid-January)' },
  { fr: 'Joyeux Noël !', en: 'Merry Christmas!', when: 'Christmas' },
  { fr: 'Joyeuses Pâques !', en: 'Happy Easter!', when: 'Easter' },
  { fr: 'Bonne fête !', en: 'Happy name day!', when: 'Name day (every day has a saint\'s name)', note: 'Every day of the year is linked to a saint — wish someone "bonne fête" on their name day' },
  { fr: 'Meilleurs vœux !', en: 'Best wishes!', when: 'New Year / general occasion' },
  { fr: 'Joyeux anniversaire !', en: 'Happy birthday!', when: 'Birthday' },
  { fr: 'Bon courage !', en: 'Good luck! / Hang in there!', when: 'Before a challenge', note: 'Used more for difficult situations than "bonne chance" — implies moral support' },
  { fr: 'Bonne continuation !', en: 'All the best going forward!', when: 'When parting ways after a period together' },
  { fr: 'À la vôtre !', en: 'Cheers! (formal)', when: 'Toasting (formal)', note: 'Also "à la tienne" (informal) or "tchin tchin" (casual)' },
  { fr: 'Félicitations !', en: 'Congratulations!', when: 'Achievements, weddings, births' },
  { fr: 'Bon anniversaire de mariage !', en: 'Happy wedding anniversary!', when: 'Wedding anniversary' },
]

const VACATION_VOCAB = [
  { fr: 'les vacances', en: 'holidays / vacation', note: 'Always plural in French — "une vacance" (singular) = a job vacancy! False friend alert.' },
  { fr: 'partir en vacances', en: 'to go on holiday' },
  { fr: 'les grandes vacances', en: 'the summer holidays (July–August)', note: 'Around 8 weeks — the longest school holiday. France empties as families head to the coast or countryside.' },
  { fr: 'le week-end prolongé', en: 'a long weekend', note: 'France has 11 public holidays — several fall on weekdays, creating long weekends' },
  { fr: 'faire le pont', en: 'to take a long weekend', note: 'Lit. "to make the bridge" — taking Friday off when the holiday is on Thursday, or Monday off when it\'s Tuesday' },
  { fr: 'un jour férié', en: 'a public holiday', note: 'France has 11 official jours fériés — one of the most in Europe' },
  { fr: 'la rentrée', en: 'the return to school/work in September', note: 'Hugely significant culturally — publishers release major books, politicians make speeches, the whole country "restarts"' },
  { fr: 'les vacances scolaires', en: 'school holidays', note: 'France divides the country into 3 zones (A, B, C) with staggered holidays to reduce transport congestion' },
  { fr: 'la zone A / B / C', en: 'school holiday zones', note: 'Zone A: Bordeaux, Lille, Lyon; Zone B: Aix-Marseille, Montpellier, Nice, Paris; Zone C: Créteil, Paris, Versailles' },
  { fr: 'les vacances de la Toussaint', en: 'autumn half-term (late Oct–early Nov)' },
  { fr: 'les vacances de Noël', en: 'Christmas holidays (2 weeks in December–January)' },
  { fr: 'les vacances d\'hiver', en: 'winter half-term (February, staggered by zone)', note: 'Many families ski during les vacances d\'hiver — French Alps resorts are packed' },
  { fr: 'les vacances de printemps / de Pâques', en: 'spring half-term / Easter holidays' },
]

export default function FrenchHolidays() {
  const [tab, setTab] = useState('holidays')
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Holidays & Celebrations | SayBonjour!" description="Discover all 11 French public holidays — Bastille Day, Toussaint, Christmas — with cultural notes, greetings, and vacation vocabulary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Holidays & Celebrations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les jours fériés et les fêtes — all 11 public holidays, non-official celebrations, greetings, and vacation culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'holidays', label: 'Public Holidays' },
            { id: 'unofficial', label: 'Other Celebrations' },
            { id: 'greetings', label: 'Festive Greetings' },
            { id: 'vacances', label: 'Vacation Vocabulary' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'holidays' && (
          <div className="space-y-3">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-4 text-sm text-blue-800 dark:text-blue-300">
              France has <strong>11 official jours fériés</strong> per year — 5 civil holidays and 6 with Catholic origins. Alsace-Moselle has 2 extra (Good Friday and St Stephen's Day).
            </div>
            {HOLIDAYS.map((holiday, i) => (
              <motion.div key={holiday.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden"
                onClick={() => { setExpanded(expanded === i ? null : i); addXP(4, 'vocabulary') }}>
                <div className="p-4 flex items-center gap-4 cursor-pointer">
                  <span className="text-2xl shrink-0">{holiday.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <SpeakButton text={holiday.name} size="sm" />
                      <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{holiday.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${holiday.type === 'Civil' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{holiday.type}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs font-mono text-gray-400">{holiday.date}</span>
                      <span className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic">{holiday.en}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{expanded === i ? '▲' : '▼'}</span>
                </div>
                {expanded === i && (
                  <div className="px-4 pb-4 border-t border-gray-50 dark:border-dark-warm-200 pt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">{holiday.desc}</p>
                    {holiday.vocab && (
                      <div className="flex flex-wrap gap-2">
                        {holiday.vocab.map(v => (
                          <div key={v.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 rounded-lg px-2.5 py-1.5">
                            <SpeakButton text={v.fr} size="sm" />
                            <span className="text-xs font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                            <span className="text-xs text-gray-400">— {v.en}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'unofficial' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Not official public holidays, but culturally essential celebrations in France.</p>
            {NON_OFFICIAL.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(3, 'vocabulary')}>
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <SpeakButton text={item.name} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{item.name}</h3>
                    <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{item.en}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'greetings' && (
          <div className="space-y-3">
            {GREETINGS.map((g, i) => (
              <motion.div key={g.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="flex items-center gap-3 mb-1">
                  <SpeakButton text={g.fr} size="sm" />
                  <p className="font-bold text-lg font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300 italic">"{g.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">{g.en}</p>
                <p className="text-xs text-gray-400 ml-8 italic">Used: {g.when}</p>
                {g.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic ml-8 mt-0.5">💡 {g.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'vacances' && (
          <div className="space-y-3">
            {VACATION_VOCAB.map((v, i) => (
              <motion.div key={v.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={v.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</span>
                    <span className="text-xs text-gray-400">— {v.en}</span>
                  </div>
                  {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {v.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
