import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Star, Coffee } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const MENU_VOCAB = [
  {
    category: 'The Menu — La carte',
    items: [
      { fr: 'la carte', en: 'the menu (à la carte)', note: '"La carte" = the full menu you choose from' },
      { fr: 'le menu', en: 'set menu (fixed price)', note: '"Le menu" in French = a set-price meal, not the overall menu' },
      { fr: 'la formule', en: 'meal deal / set combination', note: 'Typically entrée + plat or plat + dessert' },
      { fr: 'l\'entrée', en: 'starter / first course', note: 'NOT the same as English "entrée" (which is the main!)' },
      { fr: 'le plat (principal)', en: 'main course', note: 'Also: "le plat du jour" = today\'s special' },
      { fr: 'le dessert', en: 'dessert' },
      { fr: 'le fromage', en: 'the cheese course', note: 'A serious course in French dining — between main and dessert' },
      { fr: 'l\'apéritif / l\'apéro', en: 'aperitif / pre-dinner drinks', note: '"Prendre l\'apéro" is a French ritual' },
      { fr: 'le digestif', en: 'digestive / after-dinner drink' },
      { fr: 'le plat du jour', en: 'the dish of the day' },
    ],
  },
  {
    category: 'Ordering — Commander',
    items: [
      { fr: 'Je voudrais…', en: 'I would like…' },
      { fr: 'Qu\'est-ce que vous recommandez ?', en: 'What do you recommend?' },
      { fr: 'Avez-vous une table pour deux ?', en: 'Do you have a table for two?' },
      { fr: 'On peut avoir la carte, s\'il vous plaît ?', en: 'Can we have the menu, please?' },
      { fr: 'Nous sommes prêts à commander.', en: 'We\'re ready to order.' },
      { fr: 'C\'est compris ?', en: 'Is it included?' },
      { fr: 'L\'addition, s\'il vous plaît.', en: 'The bill, please.' },
      { fr: 'Le service est compris ?', en: 'Is service included?' },
      { fr: 'On peut payer séparément ?', en: 'Can we pay separately?' },
      { fr: 'C\'est délicieux !', en: 'It\'s delicious!' },
    ],
  },
  {
    category: 'Dietary — Régimes alimentaires',
    items: [
      { fr: 'végétarien(ne)', en: 'vegetarian', note: 'France is improving but ask about meat stock in soups!' },
      { fr: 'végan(e)', en: 'vegan' },
      { fr: 'sans gluten', en: 'gluten-free' },
      { fr: 'sans lactose', en: 'lactose-free' },
      { fr: 'une allergie à…', en: 'an allergy to…' },
      { fr: 'Je suis allergique aux…', en: 'I\'m allergic to…' },
      { fr: 'les arachides / les noix', en: 'peanuts / nuts' },
      { fr: 'les fruits de mer', en: 'seafood' },
      { fr: 'Est-ce qu\'il y a de la viande dedans ?', en: 'Is there meat in this?' },
      { fr: 'Avez-vous des plats végétariens ?', en: 'Do you have vegetarian dishes?' },
    ],
  },
  {
    category: 'French Dining Customs — Les habitudes à table',
    items: [
      { fr: 'Bon appétit !', en: 'Enjoy your meal! (said before eating)', note: 'Always said before starting — don\'t eat until the host says it' },
      { fr: 'Santé !', en: 'Cheers! (when toasting)', note: 'Look into each other\'s eyes when toasting!' },
      { fr: 'À la vôtre !', en: 'To your health! (formal toast)' },
      { fr: 'À ta santé !', en: 'To your health! (informal)' },
      { fr: 'C\'est ma tournée.', en: 'It\'s my round (drinks).' },
      { fr: 'On partage ?', en: 'Shall we split it?' },
      { fr: 'Ne mets pas les coudes sur la table.', en: 'Don\'t put your elbows on the table.' },
      { fr: 'à point', en: 'medium (steak)', note: 'Steak doneness: bleu → saignant → à point → bien cuit' },
    ],
  },
]

const DISH_GLOSSARY = [
  { fr: 'le steak tartare', en: 'raw minced beef with egg yolk', caution: 'Raw! Make sure you know what you\'re ordering.' },
  { fr: 'les escargots', en: 'snails (in garlic butter)', caution: 'A classic French starter.' },
  { fr: 'le foie gras', en: 'duck or goose liver pâté', caution: 'Luxury item — served at celebrations.' },
  { fr: 'la quiche lorraine', en: 'egg, cream and bacon tart', caution: 'Originally from the Lorraine region.' },
  { fr: 'le confit de canard', en: 'slow-cooked duck leg', caution: 'A staple of southwest French cuisine.' },
  { fr: 'la bouillabaisse', en: 'Provençal fish stew', caution: 'A Marseille speciality — ask about the fish.' },
  { fr: 'la tarte tatin', en: 'upside-down caramelised apple tart', caution: 'French dessert classic.' },
  { fr: 'les moules frites', en: 'mussels and chips (fries)', caution: 'A Belgian-French favourite.' },
  { fr: 'le croque-monsieur', en: 'hot ham and cheese toastie', caution: 'Add a fried egg = croque-madame.' },
  { fr: 'la ratatouille', en: 'Provençal vegetable stew', caution: 'Fully vegetarian — safe for herbivores.' },
]

export default function FrenchRestaurantGuide() {
  const [tab, setTab] = useState('ordering')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Restaurant Guide | SayBonjour!" description="Navigate a French restaurant confidently — menu vocabulary, ordering phrases, dietary needs, and dish glossary." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">At the French Restaurant</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Au restaurant — order with confidence and navigate the menu</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'ordering', label: 'Vocabulary' }, { id: 'dishes', label: 'Dish Glossary' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'ordering' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {MENU_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{MENU_VOCAB[activeCategory].category}</h2>
              <div className="space-y-3">
                {MENU_VOCAB[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0">
                    <SpeakButton text={item.fr} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                      </div>
                      {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'dishes' && (
          <div className="space-y-3">
            {DISH_GLOSSARY.map((dish, i) => (
              <motion.div key={dish.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cream-50 dark:bg-dark-warm-200 flex items-center justify-center text-xl shrink-0">🍽️</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-gray-900 dark:text-cream-50 font-playfair italic">{dish.fr}</span>
                    <SpeakButton text={dish.fr} size="sm" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{dish.en}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {dish.caution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
