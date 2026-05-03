import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, ChevronDown, ChevronUp, UtensilsCrossed, Star } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const FOOD_CATEGORIES = {
  'Petit-déjeuner': {
    icon: '🥐',
    en: 'Breakfast',
    items: [
      { fr: 'le croissant', en: 'croissant', note: 'Buttery, flaky crescent pastry — the quintessential French breakfast' },
      { fr: 'la baguette', en: 'baguette', note: 'Long thin bread loaf — eaten at every meal, including with butter at breakfast' },
      { fr: 'le café au lait', en: 'coffee with milk', note: 'Espresso topped with hot steamed milk — drunk from a bowl traditionally' },
      { fr: 'le jus d\'orange', en: 'orange juice', note: 'Un jus d\'orange pressé (freshly squeezed) is the premium option' },
      { fr: 'la confiture', en: 'jam / preserve', note: 'Often strawberry (fraise) or apricot (abricot) — spread on bread or toast' },
      { fr: 'le pain grillé', en: 'toast', note: 'Less common than bread — French breakfast is typically bread-based' },
    ],
  },
  'Entrées': {
    icon: '🥗',
    en: 'Starters',
    items: [
      { fr: 'la soupe à l\'oignon', en: 'French onion soup', note: 'Slow-cooked onion broth topped with gruyère and croutons — a Parisian bistro classic' },
      { fr: 'les escargots', en: 'snails', note: 'Baked in garlic butter and parsley — typically served in their shells with special tongs' },
      { fr: 'le foie gras', en: 'foie gras', note: 'Fattened duck or goose liver — served with toast and fig jam, a French luxury' },
      { fr: 'la salade niçoise', en: 'Niçoise salad', note: 'From Nice: tuna, egg, olives, tomatoes, green beans — a full meal as a salad' },
      { fr: 'les crudités', en: 'raw vegetable platter', note: 'Assorted raw vegetables with dipping sauces — light French starter' },
    ],
  },
  'Plats principaux': {
    icon: '🍽️',
    en: 'Main courses',
    items: [
      { fr: 'le coq au vin', en: 'chicken in red wine', note: 'Classic braised chicken in Burgundy wine with mushrooms and lardons' },
      { fr: 'le bœuf bourguignon', en: 'beef Burgundy', note: 'Rich slow-cooked beef stew — made famous by Julia Child in the US' },
      { fr: 'le confit de canard', en: 'duck confit', note: 'Duck leg preserved and cooked in its own fat — served with sarladaise potatoes' },
      { fr: 'la bouillabaisse', en: 'Marseille fish stew', note: 'Provençal seafood stew from Marseille — served with rouille (spicy mayo) and croutons' },
      { fr: 'la quiche lorraine', en: 'Lorraine quiche', note: 'Savoury egg and cream tart with lardons from the Lorraine region' },
      { fr: 'les moules-frites', en: 'mussels and chips', note: 'Steamed mussels with French fries — hugely popular from Normandy to Belgium' },
      { fr: 'le steak-frites', en: 'steak and chips', note: 'The quintessential French bistro dish — served with Bernaise or pepper sauce' },
    ],
  },
  'Fromages': {
    icon: '🧀',
    en: 'Cheeses',
    items: [
      { fr: 'le camembert', en: 'Camembert', note: 'Soft, creamy Normandy cheese with a bloomy rind — named after its village of origin' },
      { fr: 'le brie', en: 'Brie', note: 'Similar to Camembert — milder, from the Île-de-France region, beloved by French kings' },
      { fr: 'le roquefort', en: 'Roquefort', note: 'Sharp blue-veined cheese from Aveyron — one of the world\'s oldest documented cheeses' },
      { fr: 'le comté', en: 'Comté', note: 'Nutty, aged hard cheese from the Jura mountains — excellent melted or in slices' },
      { fr: 'le chèvre', en: 'goat\'s cheese', note: 'Generic term for goat cheese — popular warm on salads or on crackers' },
    ],
  },
  'Desserts': {
    icon: '🍮',
    en: 'Desserts',
    items: [
      { fr: 'la crème brûlée', en: 'crème brûlée', note: 'Vanilla custard with a caramelised sugar crust — cracked with a spoon at the table' },
      { fr: 'la tarte tatin', en: 'upside-down apple tart', note: 'Invented by accident at Hôtel Tatin — caramelised apples baked under pastry' },
      { fr: 'le macaron', en: 'French macaron', note: 'Delicate almond meringue sandwich — not to be confused with the coconut macaroon' },
      { fr: 'le mille-feuille', en: 'mille-feuille / Napoleon', note: 'Literally "thousand leaves" — layers of puff pastry and crème pâtissière' },
      { fr: 'le profiterole', en: 'profiterole', note: 'Choux pastry filled with ice cream, drizzled with hot chocolate sauce' },
      { fr: 'le clafoutis', en: 'clafoutis', note: 'Cherry baked batter pudding from Limousin — traditionally uses unpitted cherries' },
    ],
  },
  'Boissons': {
    icon: '🍷',
    en: 'Drinks',
    items: [
      { fr: 'le vin rouge / blanc / rosé', en: 'red / white / rosé wine', note: 'France produces ~7 billion bottles annually across regions: Bordeaux, Bourgogne, Alsace...' },
      { fr: 'le champagne', en: 'Champagne', note: 'Sparkling wine that can only legally come from the Champagne region — used in celebrations' },
      { fr: 'le cidre', en: 'cider', note: 'Alcoholic apple cider from Normandy and Brittany — drunk in ceramic bowls (bols)' },
      { fr: 'le pastis', en: 'pastis', note: 'Anise-flavoured aperitif from Marseille — diluted with water and drunk before meals' },
      { fr: 'l\'apéritif', en: 'aperitif (pre-dinner drink)', note: 'The sacred French tradition: drinks and nibbles before a meal — Kir, wine, or pastis' },
      { fr: 'le digestif', en: 'digestif (after-dinner drink)', note: 'After dessert: Cognac, Calvados, or Chartreuse to "aid digestion"' },
    ],
  },
}

const RESTAURANT_PHRASES = [
  { fr: 'Une table pour deux, s\'il vous plaît.', en: 'A table for two, please.' },
  { fr: 'Avez-vous une réservation ?', en: 'Do you have a reservation?' },
  { fr: 'Le menu, s\'il vous plaît.', en: 'The menu, please.' },
  { fr: 'Je suis allergique à…', en: 'I am allergic to…' },
  { fr: 'C\'est quoi, la spécialité de la maison ?', en: 'What is the house speciality?' },
  { fr: 'Je voudrais la même chose.', en: 'I would like the same thing.' },
  { fr: 'L\'addition, s\'il vous plaît.', en: 'The bill, please.' },
  { fr: 'C\'était délicieux !', en: 'That was delicious!' },
  { fr: 'Bon appétit !', en: 'Enjoy your meal! (lit. good appetite)' },
  { fr: 'À votre santé !', en: 'Cheers! (to your health)' },
]

export default function FrenchFoodGuide() {
  const [activeSection, setActiveSection] = useState(null)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Food Guide | SayBonjour!" description="Explore French cuisine vocabulary — from croissants to coq au vin, with restaurant phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Food Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La gastronomie française — vocabulary and culture</p>
        </div>

        <div className="space-y-4 mb-10">
          {Object.entries(FOOD_CATEGORIES).map(([section, data], i) => {
            const isOpen = activeSection === section
            return (
              <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                <button onClick={() => setActiveSection(isOpen ? null : section)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4">
                  <span className="text-3xl">{data.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-900 dark:text-cream-50">{section}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data.en} · {data.items.length} items</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-3">
                        {data.items.map(item => (
                          <div key={item.fr} className="flex items-start gap-3 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                            <SpeakButton text={item.fr} size="sm" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-burgundy-700 dark:text-burgundy-vibrant-300 text-sm">{item.fr}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-xs">— {item.en}</span>
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
          <h2 className="font-bold text-gray-900 dark:text-cream-50 mb-4 flex items-center gap-2">
            <UtensilsCrossed size={18} className="text-burgundy-600" /> Restaurant phrases
          </h2>
          <div className="space-y-2">
            {RESTAURANT_PHRASES.map(phrase => (
              <div key={phrase.fr} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-dark-warm-200 last:border-0">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-cream-50">{phrase.fr}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{phrase.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
