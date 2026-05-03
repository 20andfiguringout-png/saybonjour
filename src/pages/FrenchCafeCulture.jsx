import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const DRINKS_VOCAB = [
  { fr: 'un café', en: 'an espresso (small, strong)', note: 'In France, "un café" always means espresso — a tiny concentrated cup. Never a large milky coffee.' },
  { fr: 'un café allongé', en: 'a long black / americano (espresso + water)' },
  { fr: 'un café crème / un crème', en: 'espresso with hot milk (like a cappuccino)', note: 'Never say "un latte" in a French café — you\'ll get a blank stare!' },
  { fr: 'un café au lait', en: 'coffee with warm milk (larger, for breakfast)', note: 'Drunk at home for breakfast, often with a bowl (un bol). Less common in cafés.' },
  { fr: 'un noisette', en: 'espresso with a tiny dash of milk', note: 'Lit. "hazelnut" — refers to the light hazelnut colour of the drink' },
  { fr: 'un double espresso / un serré', en: 'a double espresso / a very strong espresso', note: '"Un serré" = tightly packed espresso, very concentrated' },
  { fr: 'un déca', en: 'a decaf coffee', note: 'Short for "un décaféiné" — always available in French cafés' },
  { fr: 'un thé', en: 'a tea', note: 'Usually served as a tea bag in hot water — not the elaborate ritual of some countries' },
  { fr: 'un thé au lait', en: 'tea with milk', note: 'Ask for "du lait" separately — it won\'t be offered automatically' },
  { fr: 'une infusion / une tisane', en: 'herbal tea (chamomile, mint, verbena)', note: '"Thé" = tea from tea plants. "Tisane / infusion" = herbal, caffeine-free.' },
  { fr: 'un chocolat chaud', en: 'hot chocolate', note: 'Often thick and rich in French cafés — made from real chocolate, not powder' },
  { fr: 'un jus d\'orange pressé', en: 'freshly squeezed orange juice', note: '"Pressé" = freshly squeezed. "Un jus d\'orange" alone may mean carton juice.' },
  { fr: 'une eau minérale', en: 'a mineral water (bottle)', note: '"gazeuse" = sparkling; "plate" = still. Always specify: "gazeuse ou plate ?"' },
  { fr: 'une carafe d\'eau', en: 'a jug of tap water', note: 'Tap water is free by law in French restaurants — ask for "une carafe d\'eau, s\'il vous plaît"' },
  { fr: 'un verre de vin (rouge/blanc/rosé)', en: 'a glass of red/white/rosé wine', note: 'House wine by the glass is "le vin de la maison" or "le pichet" (pitcher)' },
  { fr: 'une bière pression', en: 'a draught beer', note: '"Un demi" = a standard 25cl glass of draught beer. "Un demi" is the classic café order.' },
  { fr: 'un pastis', en: 'pastis (anise-flavoured spirit + water)', note: 'The signature drink of Provence — Ricard and Pernod are the main brands. Always diluted with cold water (5 parts water to 1 part pastis).' },
  { fr: 'un kir', en: 'white wine with blackcurrant liqueur', note: '"Un kir royal" = champagne version. Named after Canon Kir, mayor of Dijon.' },
  { fr: 'un apéritif / un apéro', en: 'a pre-dinner drink / aperitif', note: 'The apéro is a sacred French ritual — 6–8pm, before dinner, with nibbles (des amuse-bouches).' },
  { fr: 'l\'addition / la note', en: 'the bill', note: '"L\'addition s\'il vous plaît" = "the bill please". Never ask for "le billet" — that means a banknote.' },
  { fr: 'le service (est compris)', en: 'service charge (is included)', note: 'Service is ALWAYS included in France (15% by law). Tipping is genuinely optional — rounding up is appreciated.' },
]

const FOOD_VOCAB = [
  { fr: 'une formule / un menu', en: 'a fixed-price set menu', note: 'The "formule" = great value: typically entrée + plat, or plat + dessert. Always ask for it.' },
  { fr: 'le plat du jour', en: 'the dish of the day', note: 'Always fresh and seasonal — one of the best deals in any French café or brasserie' },
  { fr: 'une entrée', en: 'a starter / first course', note: 'False friend alert — in French, "entrée" = starter (not the main course as in American English)' },
  { fr: 'un plat (principal)', en: 'a main course', note: '"Le plat" is the heart of the French meal' },
  { fr: 'un dessert', en: 'a dessert / pudding' },
  { fr: 'une baguette', en: 'a baguette', note: 'Served free and automatically in restaurants — placed directly on the table, not on a plate' },
  { fr: 'un croissant', en: 'a croissant', note: '"Au beurre" = made with real butter (the good kind). Key breakfast pastry.' },
  { fr: 'un pain au chocolat', en: 'a chocolate pastry (pain au chocolat)', note: 'Called "une chocolatine" in southwest France — a genuine regional language battle!' },
  { fr: 'une viennoiserie', en: 'a pastry / sweet breakfast item', note: 'The category including croissants, pain au chocolat, brioche, chausson aux pommes' },
  { fr: 'un croque-monsieur', en: 'toasted ham and cheese sandwich (grilled)', note: '"Croque-madame" adds a fried egg on top. Iconic café lunch.' },
  { fr: 'une quiche (lorraine)', en: 'a quiche / savoury tart', note: 'Quiche Lorraine = bacon, cream, eggs. From Lorraine region in northeast France.' },
  { fr: 'un réaliste du jour', en: 'the special of the day (restaurant board)', note: 'Also called "l\'ardoise" (the chalkboard) — the daily specials written on a blackboard' },
  { fr: 'sans lactose / sans gluten', en: 'lactose-free / gluten-free', note: 'Awareness of dietary requirements is growing in France — more common now than 10 years ago' },
]

const ORDERING_PHRASES = [
  { fr: 'Je voudrais un café, s\'il vous plaît.', en: 'I\'d like an espresso, please.' },
  { fr: 'Vous avez une table pour deux / pour quatre ?', en: 'Do you have a table for two / four?' },
  { fr: 'C\'est quoi la formule du jour ?', en: 'What\'s today\'s set menu?' },
  { fr: 'Qu\'est-ce que vous nous recommandez ?', en: 'What do you recommend?' },
  { fr: 'Je prends le plat du jour.', en: 'I\'ll have the dish of the day.' },
  { fr: 'Est-ce que je peux avoir l\'addition ?', en: 'Can I have the bill?' },
  { fr: 'Le service est compris ?', en: 'Is service included?', note: '"Oui, le service est compris" is always the answer in France' },
  { fr: 'C\'est pour emporter ou sur place ?', en: 'Is it to take away or to eat in?' },
  { fr: 'Avez-vous une carte des vins ?', en: 'Do you have a wine list?' },
  { fr: 'Je suis allergique à… / sans gluten, s\'il vous plaît.', en: 'I\'m allergic to… / gluten-free, please.' },
  { fr: 'C\'était délicieux, merci !', en: 'It was delicious, thank you!' },
  { fr: 'Garçon ! / Monsieur ! / Madame !', en: 'Waiter! (to call the waiter)', note: '"Garçon" is old-fashioned and potentially rude. Use "Monsieur" or "Madame" instead.' },
  { fr: 'Une carafe d\'eau, s\'il vous plaît.', en: 'A jug of tap water, please.' },
  { fr: 'Qu\'est-ce que vous avez comme bières pression ?', en: 'What draught beers do you have?' },
  { fr: 'Je peux voir la carte ?', en: 'Can I see the menu?' },
  { fr: 'C\'est compris dans le menu ?', en: 'Is it included in the set menu?' },
]

const CAFE_CULTURE_NOTES = [
  { title: 'Drinking at the bar (au comptoir)', desc: 'In many French cafés, it\'s cheaper to stand and drink at the bar (au comptoir) than to sit at a table. An espresso at the bar might cost €1–1.50; seated at a terrace table it can be twice that. Locals know to sit only when they\'re settling in.', icon: '🧍' },
  { title: 'La formule — France\'s best value secret', desc: 'The "formule" or "menu du jour" is a fixed-price set menu (typically entrée + plat OR plat + dessert) at a significantly better price than ordering à la carte. Always ask "Vous avez une formule ?" — it\'s one of France\'s great culinary bargains and changes daily.', icon: '📋' },
  { title: 'Le service compris (mandatory)', desc: 'By French law, a 15% service charge is included in all restaurant and café bills. Tipping is genuinely optional — rounding up the bill or leaving €1–2 is generous. Unlike in the US, waiters are paid a proper wage. No guilt needed!', icon: '💶' },
  { title: 'L\'heure de l\'apéro (sacred)', desc: 'The "apéritif" (apéro) is the pre-dinner drink ritual — usually 6–8pm. Wine, pastis, kir, or beer — with nibbles like olives, crisps, or charcuterie. An unmovable French social institution. Being invited for "l\'apéro" is a significant gesture of friendship.', icon: '🍷' },
  { title: 'Café after dinner — never during', desc: 'In France, coffee is always served after dessert, never with it. Ordering a coffee "with" your meal is unusual and may confuse the waiter. Espresso after dessert aids digestion (digestif). A "digestif" liqueur (Calvados, Armagnac, Cointreau) is another option.', icon: '☕' },
  { title: 'Pain gratuit (bread is free)', desc: 'Bread is free and automatically brought to the table in any restaurant. It goes directly on the tablecloth, not on a bread plate — that\'s the French way. You can ask for more bread: "Encore du pain, s\'il vous plaît ?"', icon: '🥖' },
  { title: 'La brasserie vs le bistrot vs le café', desc: 'Key distinctions: "Le café" = primarily for drinks; "Le bistrot" = small, informal restaurant serving traditional food; "La brasserie" = larger, serves food all day (originally linked to Belgian beer). "Le restaurant" = formal dining. "La cantine" = canteen/staff restaurant.', icon: '🏠' },
  { title: 'Terrace culture (la terrasse)', desc: 'The French terrace (terrasse) is a cultural institution — Parisians sit outside year-round, with parasols in summer and heaters in winter. The famous Café de Flore and Les Deux Magots terraces in Saint-Germain were where Sartre, de Beauvoir, and Hemingway worked. The terrace is for people-watching, reading, and thinking — not rushing.', icon: '☀️' },
  { title: 'Le café du commerce', desc: '"Le café du commerce" literally means "the commercial café" but in French culture it means pub/bar political debate — the opinionated, sometimes heated conversations about politics, sport, and society that happen between strangers at a café bar. A cornerstone of French public life.', icon: '🗣️' },
]

export default function FrenchCafeCulture() {
  const [tab, setTab] = useState('drinks')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Café Culture | SayBonjour!" description="Navigate French cafés like a local — drinks vocabulary, food, ordering phrases, café etiquette, and French food culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Café Culture</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le café français — drinks, food, ordering, and everything you need to know</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'drinks', label: 'Drinks Vocabulary' },
            { id: 'food', label: 'Café Food' },
            { id: 'phrases', label: 'Ordering Phrases' },
            { id: 'culture', label: 'Café Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'drinks' && (
          <div className="space-y-2">
            {DRINKS_VOCAB.map((item, i) => (
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

        {tab === 'food' && (
          <div className="space-y-2">
            {FOOD_VOCAB.map((item, i) => (
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CAFE_CULTURE_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{note.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
