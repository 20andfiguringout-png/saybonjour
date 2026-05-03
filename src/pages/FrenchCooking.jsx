import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Flame, ShoppingCart } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const COOKING_SECTIONS = [
  {
    category: 'Cooking Methods — Les modes de cuisson',
    items: [
      { fr: 'faire bouillir', en: 'to boil', note: '"Faire bouillir de l\'eau" = to boil water' },
      { fr: 'faire frire / frire', en: 'to fry / deep-fry' },
      { fr: 'faire sauter', en: 'to sauté / stir-fry', note: '"Faire sauter à la poêle" = to sauté in a pan' },
      { fr: 'faire cuire au four', en: 'to bake / roast in the oven' },
      { fr: 'rôtir', en: 'to roast' },
      { fr: 'griller', en: 'to grill / barbecue' },
      { fr: 'mijoter', en: 'to simmer / stew slowly' },
      { fr: 'pocher', en: 'to poach' },
      { fr: 'cuire à la vapeur', en: 'to steam' },
      { fr: 'flamber', en: 'to flambé', note: 'Set alight with alcohol — classic French technique' },
      { fr: 'émulsionner', en: 'to emulsify' },
      { fr: 'blanchir', en: 'to blanch', note: 'Briefly boil then plunge in ice water' },
    ],
  },
  {
    category: 'Ingredients — Les ingrédients',
    items: [
      { fr: 'la farine', en: 'flour' },
      { fr: 'le beurre', en: 'butter', note: 'France is famous for its high-quality butter — beurre demi-sel (salted) and doux (unsalted)' },
      { fr: 'les œufs', en: 'eggs' },
      { fr: 'le lait', en: 'milk' },
      { fr: 'la crème fraîche', en: 'crème fraîche', note: 'Thicker and tangier than standard cream — used widely in French cooking' },
      { fr: 'l\'huile d\'olive', en: 'olive oil' },
      { fr: 'le sel', en: 'salt' },
      { fr: 'le poivre', en: 'pepper' },
      { fr: 'les herbes aromatiques', en: 'herbs', note: 'Thym (thyme), persil (parsley), laurier (bay leaf), estragon (tarragon)' },
      { fr: 'l\'ail', en: 'garlic' },
      { fr: 'l\'oignon', en: 'onion' },
      { fr: 'les échalotes', en: 'shallots', note: 'Used more than onions in classic French cooking' },
      { fr: 'le bouillon', en: 'stock / broth' },
      { fr: 'le vinaigre', en: 'vinegar', note: 'Vinaigre balsamique, vinaigre de vin blanc' },
      { fr: 'la levure', en: 'yeast / baking powder' },
    ],
  },
  {
    category: 'Kitchen Equipment — La batterie de cuisine',
    items: [
      { fr: 'une casserole', en: 'a saucepan' },
      { fr: 'une poêle', en: 'a frying pan' },
      { fr: 'une cocotte', en: 'a casserole dish / Dutch oven', note: 'La Cocotte-Minute = pressure cooker' },
      { fr: 'un fouet', en: 'a whisk' },
      { fr: 'une spatule', en: 'a spatula' },
      { fr: 'un couteau de chef', en: 'a chef\'s knife' },
      { fr: 'une planche à découper', en: 'a chopping board' },
      { fr: 'un rouleau à pâtisserie', en: 'a rolling pin' },
      { fr: 'un four', en: 'an oven' },
      { fr: 'une balance de cuisine', en: 'kitchen scales', note: 'French recipes use weight not cup measures' },
      { fr: 'un mixeur / un blender', en: 'a blender' },
      { fr: 'une passoire', en: 'a colander / strainer' },
    ],
  },
  {
    category: 'French Cooking Terms — La cuisine française',
    items: [
      { fr: 'la mise en place', en: 'preparation of all ingredients before cooking begins', note: 'A key professional kitchen concept' },
      { fr: 'la julienne', en: 'thin matchstick cuts of vegetables' },
      { fr: 'la brunoise', en: 'very fine dice of vegetables' },
      { fr: 'le roux', en: 'flour and butter cooked together (base for sauces)', note: 'Blanc, blond, or brun depending on cooking time' },
      { fr: 'la béchamel', en: 'white sauce (roux + milk)', note: 'One of the five French mother sauces' },
      { fr: 'déglacer', en: 'to deglaze (add liquid to a hot pan to release caramelised bits)' },
      { fr: 'réduire', en: 'to reduce (simmer liquid to concentrate it)' },
      { fr: 'assaisonner', en: 'to season', note: '"Goûtez et assaisonnez à votre goût" = taste and season to your liking' },
      { fr: 'napper', en: 'to coat with sauce' },
    ],
  },
]

const FRENCH_DISHES = [
  { name: 'La soupe à l\'oignon', type: 'Starter', region: 'Paris', desc: 'Caramelised onion soup topped with gruyère croutons. A bistro classic.' },
  { name: 'Le bœuf bourguignon', type: 'Main', region: 'Bourgogne', desc: 'Beef slow-cooked in red wine with lardons, mushrooms, and pearl onions.' },
  { name: 'Le coq au vin', type: 'Main', region: 'Nationwide', desc: 'Chicken braised in red wine with mushrooms and lardons.' },
  { name: 'La quiche lorraine', type: 'Main / Starter', region: 'Lorraine', desc: 'Egg and cream tart with bacon (lardons) in a shortcrust pastry case.' },
  { name: 'La tarte tatin', type: 'Dessert', region: 'Sologne', desc: 'Caramelised upside-down apple tart. Created by accident by the Tatin sisters.' },
  { name: 'Les crêpes Suzette', type: 'Dessert', region: 'Bretagne / Paris', desc: 'Thin crêpes in orange butter sauce, flambéed at the table.' },
  { name: 'Le soufflé au chocolat', type: 'Dessert', region: 'Nationwide', desc: 'The iconic baked egg dish — must be eaten immediately from the oven.' },
  { name: 'La ratatouille niçoise', type: 'Side / Main', region: 'Provence', desc: 'Slow-cooked Provençal vegetable stew — aubergine, courgette, tomatoes, peppers.' },
]

export default function FrenchCooking() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Cooking Vocabulary | SayBonjour!" description="Learn French cooking vocabulary — cooking methods, ingredients, equipment, and classic French dishes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Cooking</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La cuisine française — cooking methods, ingredients, and classic recipes</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'dishes', label: 'Classic Dishes' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {COOKING_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{COOKING_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {COOKING_SECTIONS[activeCategory].items.map(item => (
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
          <div className="space-y-4">
            {FRENCH_DISHES.map((dish, i) => (
              <motion.div key={dish.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <span className="font-bold text-gray-900 dark:text-cream-50 font-playfair italic">{dish.name}</span>
                      <SpeakButton text={dish.name} size="sm" />
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 text-gray-500 px-2 py-0.5 rounded-full">{dish.type}</span>
                    <span className="text-xs bg-burgundy-50 dark:bg-burgundy-vibrant-600/10 text-burgundy-600 dark:text-burgundy-vibrant-300 px-2 py-0.5 rounded-full">{dish.region}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
