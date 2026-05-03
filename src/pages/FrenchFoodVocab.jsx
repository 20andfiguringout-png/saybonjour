import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FOOD_GROUPS = [
  {
    category: 'Bread & Bakery',
    emoji: '🥖',
    items: [
      { fr: 'une baguette', en: 'a baguette', note: 'The national symbol. "Une baguette bien cuite" = well-done baguette' },
      { fr: 'un croissant', en: 'a croissant', note: 'Crescent-shaped; a straight croissant is made with butter' },
      { fr: 'un pain au chocolat', en: 'a chocolate croissant', note: 'Called "chocolatine" in south-west France — a fierce regional debate!' },
      { fr: 'une brioche', en: 'a brioche', note: 'Enriched bread with butter and eggs — rich and slightly sweet' },
      { fr: 'un pain de campagne', en: 'a country loaf', note: 'Sourdough-style, denser than baguette' },
    ],
  },
  {
    category: 'Cheese',
    emoji: '🧀',
    items: [
      { fr: 'le fromage', en: 'cheese', note: 'France has 300–400 varieties. "Un pays qui produit 246 fromages ne peut pas périr" (de Gaulle)' },
      { fr: 'le camembert', en: 'camembert', note: 'Normandy. Soft white rind. Buy it ripe — it should be soft inside.' },
      { fr: 'le brie', en: 'brie', note: '"Le roi des fromages" — the king of cheeses.' },
      { fr: 'le comté', en: 'comté', note: 'Hard mountain cheese from Franche-Comté. Aged 4–36 months.' },
      { fr: 'le roquefort', en: 'roquefort', note: 'Blue cheese from Aveyron. Made only from sheep\'s milk.' },
      { fr: 'le chèvre', en: 'goat\'s cheese', note: 'Many varieties — fresh (frais), aged (affiné), rolled in ash (cendré).' },
    ],
  },
  {
    category: 'Fruits & Vegetables',
    emoji: '🍎',
    items: [
      { fr: 'une pomme', en: 'an apple' },
      { fr: 'une poire', en: 'a pear' },
      { fr: 'une fraise', en: 'a strawberry', note: 'Les fraises de Plougastel from Brittany are famous' },
      { fr: 'un citron', en: 'a lemon' },
      { fr: 'une tomate', en: 'a tomato' },
      { fr: 'une carotte', en: 'a carrot' },
      { fr: 'des haricots verts', en: 'green beans', note: 'A French dining staple — usually served with butter' },
      { fr: 'une courgette', en: 'a courgette / zucchini' },
      { fr: 'un poireau', en: 'a leek', note: 'Huge in French cooking — soups, quiches, tarts' },
      { fr: 'de l\'ail', en: 'garlic', note: 'Central to French cooking — aioli, ratatouille, soupe à l\'ail' },
    ],
  },
  {
    category: 'Classic Dishes',
    emoji: '🍲',
    items: [
      { fr: 'le bœuf bourguignon', en: 'beef burgundy stew', note: 'Beef slow-cooked in red wine. Burgundy\'s most famous dish.' },
      { fr: 'la ratatouille', en: 'ratatouille', note: 'Provençal vegetable stew — courgette, tomato, aubergine, peppers.' },
      { fr: 'la quiche lorraine', en: 'quiche lorraine', note: 'Egg and lardons tart from Lorraine. Never has cheese in the original!' },
      { fr: 'le cassoulet', en: 'cassoulet', note: 'Slow-cooked bean and meat casserole from Languedoc.' },
      { fr: 'la soupe à l\'oignon', en: 'French onion soup', note: 'Topped with melted Gruyère on croutons. A Parisian bistro classic.' },
      { fr: 'le coq au vin', en: 'chicken braised in wine', note: 'Traditional peasant dish. Red wine, lardons, mushrooms, onions.' },
      { fr: 'les crêpes', en: 'crêpes', note: 'Sweet (dessert) or savoury (galette de sarrasin, from Brittany).' },
    ],
  },
]

const FOOD_PHRASES = [
  { fr: 'Je suis gourmand(e).', en: 'I have a sweet tooth / I love good food.', note: '"Gourmand" means loving food; "gourmet" means having refined taste' },
  { fr: 'C\'est délicieux !', en: 'It\'s delicious!' },
  { fr: 'C\'est trop salé / sucré / épicé.', en: 'It\'s too salty / sweet / spicy.' },
  { fr: 'C\'est cuit à point.', en: 'It\'s cooked to perfection.' },
  { fr: 'J\'ai une intolérance au lactose.', en: 'I\'m lactose intolerant.' },
  { fr: 'Je suis végétarien(ne) / vegan.', en: 'I\'m vegetarian / vegan.', note: 'Veganism is growing in France but options can be limited in traditional restaurants' },
  { fr: 'C\'est fait maison.', en: 'It\'s homemade.', note: '"Fait maison" is an official label in French restaurants' },
  { fr: 'Je voudrais la recette.', en: 'I\'d like the recipe.' },
]

export default function FrenchFoodVocab() {
  const [tab, setTab] = useState('food')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Food Vocabulary | SayBonjour!" description="Essential French food vocabulary — bread, cheese, vegetables, classic dishes — and food phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Food Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La nourriture — bread, cheese, produce, classic dishes, and food phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'food', label: 'Food Groups' }, { id: 'phrases', label: 'Food Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'food' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {FOOD_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.emoji} {g.category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {FOOD_GROUPS[activeGroup].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3">
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {FOOD_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
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
      </div>
    </div>
  )
}
