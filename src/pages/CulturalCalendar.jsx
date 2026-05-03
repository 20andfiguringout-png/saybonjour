import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Star, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const EVENTS = [
  { month: 'January', fr: 'Janvier', events: [
    { date: 'Jan 1', name: 'Le Jour de l\'An', en: 'New Year\'s Day', desc: 'Celebrated with family meals and the expression "Bonne Année !" Champagne and galette des rois mark the start of January.', type: 'holiday' },
    { date: 'Jan 6', name: 'La Fête des Rois', en: 'Feast of Kings (Epiphany)', desc: 'Families share the galette des rois — a puff pastry with a hidden fève (charm). Whoever finds it becomes king or queen for the day!', type: 'tradition' },
  ]},
  { month: 'February', fr: 'Février', events: [
    { date: 'Feb 2', name: 'La Chandeleur', en: 'Candlemas / Crêpe Day', desc: 'French families make crêpes and try to flip them with a coin in hand — legend says it brings prosperity. Synonymous with crepe-eating!', type: 'tradition' },
    { date: 'Feb 14', name: 'La Saint-Valentin', en: 'Valentine\'s Day', desc: 'France is the birthplace of Valentine\'s Day traditions. Paris, the "City of Love," hosts lovers from around the world.', type: 'holiday' },
  ]},
  { month: 'March', fr: 'Mars', events: [
    { date: 'Mar 20', name: 'Le Printemps', en: 'Spring Equinox', desc: 'Spring (le printemps) begins. French markets fill with asparagus, strawberries, and flowers. Terraces open for outdoor dining.', type: 'nature' },
    { date: 'Variable', name: 'Les Jours Gras / Carnaval', en: 'Mardi Gras / Carnival', desc: 'Celebrated in Nice with one of France\'s most famous carnivals — floats, masks, and flower battles. Also celebrated in Dunkirk.', type: 'festival' },
  ]},
  { month: 'April', fr: 'Avril', events: [
    { date: 'Apr 1', name: 'Le Poisson d\'Avril', en: 'April Fool\'s Day', desc: 'French children stick paper fish on people\'s backs and shout "Poisson d\'Avril!" Chocolate fish are sold in pâtisseries.', type: 'tradition' },
    { date: 'Variable', name: 'Pâques', en: 'Easter', desc: 'Celebrated with chocolate bells (cloches), eggs hidden in gardens, and family lunches. The bells fly from Rome, according to French tradition.', type: 'holiday' },
  ]},
  { month: 'May', fr: 'Mai', events: [
    { date: 'May 1', name: 'La Fête du Travail', en: 'Labour Day', desc: 'A public holiday. Lily of the valley (muguet) is traditionally given as a symbol of luck. Markets and street stalls sell muguet bouquets.', type: 'holiday' },
    { date: 'May 8', name: 'La Victoire 1945', en: 'Victory in Europe Day', desc: 'Marks the Allied victory over Nazi Germany. Official ceremonies at the Arc de Triomphe in Paris with the President.', type: 'holiday' },
    { date: 'Variable', name: 'L\'Ascension', en: 'Ascension Day', desc: '39 days after Easter. Public holiday in France. Many take a long weekend ("le pont de l\'Ascension").', type: 'holiday' },
  ]},
  { month: 'June', fr: 'Juin', events: [
    { date: 'Jun 21', name: 'La Fête de la Musique', en: 'Music Day', desc: 'Every year on the summer solstice, free concerts fill every street, park, and square across France. Everyone can perform — professionals and amateurs alike.', type: 'festival' },
  ]},
  { month: 'July', fr: 'Juillet', events: [
    { date: 'Jul 14', name: 'La Fête Nationale', en: 'Bastille Day', desc: 'France\'s national holiday — the most important. Military parade on the Champs-Élysées, fireworks at the Eiffel Tower, and "bals des pompiers" (firemen\'s balls).', type: 'holiday' },
    { date: 'Variable', name: 'Le Tour de France', en: 'Tour de France', desc: 'The world\'s most famous cycling race. 21 stages over 3 weeks, finishing on the Champs-Élysées in Paris. The yellow jersey (maillot jaune) is the ultimate prize.', type: 'festival' },
  ]},
  { month: 'August', fr: 'Août', events: [
    { date: 'Aug 15', name: 'L\'Assomption', en: 'Assumption of Mary', desc: 'A public holiday in France. Many French families are on summer holiday (les vacances d\'été) throughout August — shops often close.', type: 'holiday' },
    { date: 'All month', name: 'Les Grandes Vacances', en: 'Summer Holidays', desc: 'August is peak holiday season. Beaches in the south (Côte d\'Azur) and mountains fill with visitors. Many Parisians leave the city.', type: 'tradition' },
  ]},
  { month: 'September', fr: 'Septembre', events: [
    { date: 'Mid Sep', name: 'Les Journées du Patrimoine', en: 'Heritage Days', desc: 'Hundreds of normally closed historic buildings — the Élysée Palace, ministries, private châteaux — open to the public for free. A French institution since 1984.', type: 'festival' },
    { date: 'Late Sep', name: 'Les Vendanges', en: 'Grape Harvest', desc: 'Harvest time in Burgundy, Bordeaux, Alsace, and Champagne. Vineyards welcome visitors. Wine festivals celebrate the new vintage.', type: 'tradition' },
  ]},
  { month: 'October', fr: 'Octobre', events: [
    { date: 'Oct 31', name: 'Halloween', en: 'Halloween', desc: 'Increasingly popular in France since the 1990s. Children dress up, Jack-o\'-lanterns appear, though it\'s less central than in Anglo-Saxon countries.', type: 'tradition' },
  ]},
  { month: 'November', fr: 'Novembre', events: [
    { date: 'Nov 1', name: 'La Toussaint', en: 'All Saints\' Day', desc: 'Public holiday. Families visit cemeteries to lay chrysanthemums on graves. These flowers are strongly associated with death in France — never give them as gifts!', type: 'holiday' },
    { date: 'Nov 11', name: 'L\'Armistice', en: 'Armistice Day', desc: 'Commemorates the end of WWI in 1918. Solemn ceremonies at war memorials across France. The Eternal Flame under the Arc de Triomphe is rekindled.', type: 'holiday' },
    { date: 'Nov 25', name: 'La Sainte-Catherine', en: 'Saint Catherine\'s Day', desc: 'Traditionally celebrated by unmarried women aged 25 ("Catherinettes"). They wear extravagant hats — a tradition in the fashion industry.', type: 'tradition' },
  ]},
  { month: 'December', fr: 'Décembre', events: [
    { date: 'Dec 6', name: 'La Saint-Nicolas', en: 'Saint Nicholas Day', desc: 'Celebrated especially in Alsace and Lorraine — Saint Nicholas brings gifts for good children. Stalls sell bredele (spiced cookies) and mulled wine (vin chaud).', type: 'tradition' },
    { date: 'Dec 8', name: 'La Fête des Lumières', en: 'Festival of Lights (Lyon)', desc: 'Lyon\'s iconic annual festival — millions of candles and spectacular light installations transform the city. Dating back to 1852, it attracts 3+ million visitors.', type: 'festival' },
    { date: 'Dec 24–25', name: 'Noël', en: 'Christmas', desc: 'Réveillon de Noël (Christmas Eve dinner) is the main celebration — foie gras, oysters, bûche de Noël. Families exchange gifts. Churches hold midnight Mass.', type: 'holiday' },
    { date: 'Dec 31', name: 'La Saint-Sylvestre / Le Réveillon', en: 'New Year\'s Eve', desc: 'Celebrated with a festive dinner (réveillon), champagne, and fireworks. The Champs-Élysées is packed for midnight. "Bonne Année !" everywhere.', type: 'holiday' },
  ]},
]

const TYPE_COLORS = {
  holiday: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  tradition: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  festival: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  nature: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
}

const CURRENT_MONTH = new Date().toLocaleString('en-US', { month: 'long' })

export default function CulturalCalendar() {
  const [selected, setSelected] = useState(EVENTS.find(e => e.month === CURRENT_MONTH)?.month || 'January')
  const [expanded, setExpanded] = useState(null)

  const monthData = EVENTS.find(e => e.month === selected)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Cultural Calendar | SayBonjour!" description="Explore French holidays, traditions, and cultural events month by month." />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Cultural Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Le Calendrier des Fêtes et Traditions Françaises</p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {EVENTS.map(({ month, fr }) => (
            <button key={month} onClick={() => setSelected(month)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selected === month ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {fr}
            </button>
          ))}
        </div>

        {monthData && (
          <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-cream-50 mb-6 flex items-center gap-3">
              <Calendar className="text-burgundy-600" size={24} />
              {monthData.month} — {monthData.fr}
            </h2>
            <div className="space-y-4">
              {monthData.events.map((event, i) => (
                <div key={i} className="bg-white dark:bg-dark-warm-100 rounded-2xl border border-gray-100 dark:border-dark-warm-50 shadow-sm overflow-hidden">
                  <button className="w-full text-left px-6 py-4 flex items-start justify-between gap-4" onClick={() => setExpanded(expanded === i ? null : i)}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{event.date}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${TYPE_COLORS[event.type]}`}>{event.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900 dark:text-cream-50">{event.name}</h3>
                        <SpeakButton text={event.name} lang="fr-FR" size="sm" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.en}</p>
                    </div>
                    <ChevronRight size={18} className={`text-gray-400 mt-1 flex-shrink-0 transition-transform ${expanded === i ? 'rotate-90' : ''}`} />
                  </button>
                  {expanded === i && (
                    <div className="px-6 pb-5 border-t border-gray-100 dark:border-dark-warm-50 pt-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{event.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-10 bg-amber-50 dark:bg-dark-warm-100 border border-amber-200 dark:border-dark-warm-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 dark:text-cream-50 mb-3 flex items-center gap-2"><Star className="text-amber-500" size={18} /> French Public Holidays at a Glance</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700 dark:text-gray-300">
            {['Jan 1 — Jour de l\'An', 'Variable — Pâques & Lundi', 'May 1 — Fête du Travail', 'May 8 — Victoire 1945', 'Variable — Ascension', 'Variable — Pentecôte & Lundi', 'Jul 14 — Fête Nationale', 'Aug 15 — Assomption', 'Nov 1 — Toussaint', 'Nov 11 — Armistice', 'Dec 25 — Noël'].map(h => (
              <div key={h} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-burgundy-600 flex-shrink-0" />{h}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
