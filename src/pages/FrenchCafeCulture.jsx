import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const CAFE_VOCAB = [
  { fr: 'un café', en: 'an espresso', note: 'In France, "un café" always means espresso — not a long coffee' },
  { fr: 'un café allongé', en: 'a long black / americano' },
  { fr: 'un café crème', en: 'a coffee with cream/milk (like a cappuccino)', note: 'Never say "latte" in a French café!' },
  { fr: 'un noisette', en: 'espresso with a dash of milk', note: 'Lit. "hazelnut" — refers to the colour' },
  { fr: 'un déca', en: 'a decaf coffee', note: 'Short for décaféiné' },
  { fr: 'un thé au lait', en: 'tea with milk' },
  { fr: 'une infusion / tisane', en: 'herbal tea', note: '"Thé" is always tea (from tea plants); tisane is herbal' },
  { fr: 'un chocolat chaud', en: 'a hot chocolate', note: 'Often thick and rich — not Swiss Miss!' },
  { fr: 'un jus d\'orange pressé', en: 'freshly squeezed orange juice' },
  { fr: 'une eau minérale', en: 'a mineral water' },
  { fr: 'gazeuse / plate', en: 'sparkling / still (water)', note: 'Always specify: "gazeuse ou plate ?"' },
  { fr: 'un verre de vin', en: 'a glass of wine' },
  { fr: 'une bière pression', en: 'a draught beer', note: 'Also: un demi = a half pint of draught beer (25cl)' },
  { fr: 'l\'addition / la note', en: 'the bill', note: '"L\'addition s\'il vous plaît" = "the bill please"' },
  { fr: 'le service (est compris)', en: 'service charge (is included)', note: 'Service is always included in France — tipping is optional' },
]

const ORDERING_PHRASES = [
  { fr: 'Je voudrais un café, s\'il vous plaît.', en: 'I\'d like an espresso, please.' },
  { fr: 'Vous avez une table pour deux ?', en: 'Do you have a table for two?' },
  { fr: 'C\'est quoi la formule du jour ?', en: 'What\'s today\'s set menu?' },
  { fr: 'Je prends le plat du jour.', en: 'I\'ll have the dish of the day.' },
  { fr: 'Est-ce que je peux avoir l\'addition ?', en: 'Can I have the bill?' },
  { fr: 'Le service est compris ?', en: 'Is service included?' },
  { fr: 'C\'est pour emporter ou sur place ?', en: 'Is it to take away or to eat in?' },
  { fr: 'Avez-vous une carte des vins ?', en: 'Do you have a wine list?' },
  { fr: 'Je suis allergique à… / sans gluten, s\'il vous plaît.', en: 'I\'m allergic to… / gluten-free, please.' },
  { fr: 'C\'était délicieux, merci.', en: 'It was delicious, thank you.' },
]

const CAFE_CULTURE_NOTES = [
  { title: 'Standing at the bar', desc: 'In many French cafés, it\'s cheaper to drink standing at the bar (au comptoir) than seated at a table. A coffee at the bar can cost €1–1.50; seated it may cost double.', icon: '🧍' },
  { title: 'La formule', desc: 'The "formule" or "menu du jour" is a fixed-price set menu (usually entrée + plat, or plat + dessert) at a better price. Always ask for it — it\'s one of France\'s great culinary bargains.', icon: '📋' },
  { title: 'Le service compris', desc: 'In France, a 15% service charge is included in restaurant bills by law. Tipping is optional — rounding up or leaving a few euros is the norm; it\'s not expected to be 20%.', icon: '💶' },
  { title: 'L\'heure de l\'apéro', desc: 'The "apéritif" (apéro) is the pre-dinner drink — usually 6–8pm. Wine, pastis, or kir (white wine with blackcurrant liqueur). A beloved French social ritual.', icon: '🍷' },
  { title: 'Le café after dinner', desc: 'Coffee is always served after dessert, never with it. Ordering a coffee "with" your dessert is not typical in France.', icon: '☕' },
  { title: 'Pain gratuit', desc: 'Bread is free and automatically brought to the table in restaurants. It goes directly on the table, not on a bread plate — that\'s the French way.', icon: '🥖' },
]

export default function FrenchCafeCulture() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Café Culture | SayBonjour!" description="Navigate French cafés like a local — drinks vocabulary, ordering phrases, and café culture etiquette." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Café Culture</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le café français — drinks, ordering, and café etiquette</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Drinks & Menu' }, { id: 'phrases', label: 'Ordering Phrases' }, { id: 'culture', label: 'Café Culture' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {CAFE_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {ORDERING_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CAFE_CULTURE_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{note.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
