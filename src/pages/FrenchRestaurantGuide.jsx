import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Star, Coffee } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const MENU_VOCAB = [
  {
    category: 'The Menu — La carte',
    emoji: '📋',
    items: [
      { fr: 'la carte', en: 'the menu (à la carte)', note: '"La carte" = the full menu you choose from freely. "Manger à la carte" = ordering individual dishes at full price.' },
      { fr: 'le menu', en: 'set menu (fixed price)', note: 'CRITICAL false friend! "Le menu" in French = a set-price meal, NOT the overall menu. "Le menu du jour" = today\'s set menu.' },
      { fr: 'la formule', en: 'meal deal / set combination', note: 'Typically "entrée + plat" or "plat + dessert". Excellent value — many French workers use the formule du midi (lunchtime deal) daily.' },
      { fr: 'l\'entrée (f)', en: 'starter / first course', note: 'NOT the same as English "entrée" (which means the main course in the US). This false friend catches many people out.' },
      { fr: 'le plat (principal)', en: 'main course', note: '"Le plat du jour" = today\'s special. "Quel est le plat du jour ?" is a great question in any French restaurant.' },
      { fr: 'le dessert', en: 'dessert / pudding', note: '"On passe au dessert ?" = shall we move to dessert? The cheese course often comes before the dessert.' },
      { fr: 'le fromage', en: 'the cheese course', note: 'A serious stand-alone course in French dining — served between main and dessert. The cheeseboard (le plateau de fromages) is a highlight.' },
      { fr: 'l\'apéritif / l\'apéro (m)', en: 'aperitif / pre-dinner drinks', note: '"Prendre l\'apéro" is a deeply French ritual — wine, kir, pastis or champagne with nibbles before eating.' },
      { fr: 'le digestif', en: 'digestive / after-dinner drink', note: 'Cognac, Armagnac, Calvados, or Chartreuse — sipped slowly after coffee at the end of a long meal.' },
      { fr: 'le plat du jour', en: 'the dish of the day', note: 'Usually the freshest and best-value option — made from what the chef bought at the market that morning.' },
      { fr: 'la carte des vins', en: 'the wine list', note: '"Un carafe de vin rouge / blanc / rosé" = a carafe (house wine). Better value than a bottle.' },
      { fr: 'la carte des desserts', en: 'the dessert menu', note: 'Presented separately in French restaurants — often a delightful surprise.' },
    ],
  },
  {
    category: 'Ordering — Commander',
    emoji: '🗣️',
    items: [
      { fr: 'Je voudrais…', en: 'I would like…', note: 'Conditional = polite. Always use "je voudrais" (I would like) not "je veux" (I want) in restaurants.' },
      { fr: 'Qu\'est-ce que vous recommandez ?', en: 'What do you recommend?', note: 'Great phrase — waiters love being asked this. Shows you trust their expertise.' },
      { fr: 'Avez-vous une table pour deux personnes ?', en: 'Do you have a table for two?', note: '"Une table pour deux" = a table for two. Always specify the number.' },
      { fr: 'On peut avoir la carte, s\'il vous plaît ?', en: 'Can we have the menu, please?', note: 'Note: you ask for "la carte" (the menu), not "le menu".' },
      { fr: 'Nous sommes prêts à commander.', en: 'We\'re ready to order.', note: '"Prêt à commander" = ready to order. Catches the waiter\'s eye politely.' },
      { fr: 'C\'est compris ?', en: 'Is it included?', note: 'Useful for checking if bread, water, or coffee is included in the price.' },
      { fr: 'L\'addition, s\'il vous plaît.', en: 'The bill, please.', note: '"L\'addition" = the bill. NOT "la facture" (that\'s an invoice). Often accompanied by a discreet hand gesture.' },
      { fr: 'Le service est compris ?', en: 'Is service included?', note: 'In France, service (15%) is always legally included — "service compris" or "s.c." appears on the bill. Tips are optional.' },
      { fr: 'On peut payer séparément ?', en: 'Can we pay separately?', note: '"Payer chacun sa part" = to pay each one\'s share. Splitting bills is less common in traditional French restaurants.' },
      { fr: 'C\'est délicieux !', en: 'It\'s delicious!', note: '"Excellent !" / "C\'est très bon !" / "Un régal !" = a treat/delight. Always compliment the food — French cooks deeply appreciate it.' },
      { fr: 'Je prends la formule.', en: 'I\'ll have the set menu.', note: '"Je prends" = I\'ll take/have (for ordering). More decisive than "je voudrais".' },
      { fr: 'Et comme boisson ?', en: 'And to drink? (waiter asking)', note: 'The standard follow-up question. "Une carafe d\'eau, s\'il vous plaît" = a carafe of tap water (free by law in France).' },
    ],
  },
  {
    category: 'Dietary — Régimes alimentaires',
    emoji: '🥗',
    items: [
      { fr: 'végétarien(ne)', en: 'vegetarian', note: 'France is improving but vegetarianism was historically rare. Ask about meat stock in soups — "Il y a du bouillon de viande dedans ?"' },
      { fr: 'végan(e)', en: 'vegan', note: '"Vegan" has become widely understood in France. Paris has many dedicated vegan restaurants now.' },
      { fr: 'sans gluten', en: 'gluten-free', note: '"Sans gluten" is now on many French menus. "Coeliacie" = coeliac disease.' },
      { fr: 'sans lactose', en: 'lactose-free', note: '"Intolérant(e) au lactose" = lactose intolerant.' },
      { fr: 'une allergie à…', en: 'an allergy to…', note: '"J\'ai une allergie sévère à…" = I have a severe allergy to… Restaurants are legally required to list allergens.' },
      { fr: 'Je suis allergique aux arachides / aux noix.', en: 'I\'m allergic to peanuts / nuts.', note: '"Les arachides" = peanuts. "Les noix" = nuts. Critical to know.' },
      { fr: 'les fruits de mer', en: 'seafood', note: '"Fruits de mer" lit. = fruits of the sea. Shellfish, crustaceans, molluscs — all included.' },
      { fr: 'Est-ce qu\'il y a de la viande / du poisson dedans ?', en: 'Is there meat / fish in this?', note: 'Essential for vegetarians — anchovies and lardons often lurk in salads.' },
      { fr: 'Avez-vous des plats végétariens / sans gluten ?', en: 'Do you have vegetarian / gluten-free dishes?', note: '"Des plats végétariens" = vegetarian dishes. More restaurants offer dedicated options now.' },
      { fr: 'casher / halal', en: 'kosher / halal', note: '"Nourriture casher / halal" — available in specific restaurants in Paris and other cities.' },
    ],
  },
  {
    category: 'Table Manners & Culture — À table',
    emoji: '🥂',
    items: [
      { fr: 'Bon appétit !', en: 'Enjoy your meal! (said before eating)', note: 'Always said before starting — the host says it, guests respond. Don\'t eat until it\'s been said.' },
      { fr: 'Santé !', en: 'Cheers! (when toasting)', note: 'Crucial rule: always look into each other\'s eyes when clinking glasses. Failure brings bad luck (and side-eye from the French).' },
      { fr: 'À la vôtre ! / À ta santé !', en: 'To your health! (formal/informal toast)', note: '"À la vôtre" = formal. "À ta santé" = informal. "À nous !" = to us!' },
      { fr: 'C\'est ma tournée.', en: 'It\'s my round (drinks).', note: 'At the bar, rounds are less common than in the UK — each person often buys their own.' },
      { fr: 'On partage ?', en: 'Shall we split (the bill)?', note: '"Faire moitié-moitié" = to go halves. "Chacun paie sa part" = everyone pays their share.' },
      { fr: 'Ne mets pas les coudes sur la table.', en: 'Don\'t put your elbows on the table.', note: 'Classic French parental phrase. Hands should be visible at the table.' },
      { fr: 'à point / saignant / bien cuit / bleu', en: 'medium / medium-rare / well done / very rare (steak)', note: 'French steak order: bleu (barely seared) → saignant (rare) → à point (medium) → bien cuit (well done). Ordering "bien cuit" may attract a look.' },
      { fr: 'une carafe d\'eau', en: 'a carafe of tap water', note: 'By law, French restaurants must provide free tap water. Ask for "une carafe d\'eau" — it\'s always free.' },
    ],
  },
]

const DISH_GLOSSARY = [
  { fr: 'le steak tartare', en: 'raw minced beef with egg yolk, capers, shallots', region: 'National', note: 'Raw! Make sure you know what you\'re ordering — not for everyone, but a French classic.' },
  { fr: 'les escargots de Bourgogne', en: 'snails in garlic herb butter', region: 'Burgundy', note: 'Served in the shell with parsley-garlic butter. Use the special tongs to hold them.' },
  { fr: 'le foie gras', en: 'duck or goose liver pâté', region: 'Southwest', note: 'Luxury item — served at celebrations and festive meals. A political controversy (force-feeding) but deeply embedded in French gastronomy.' },
  { fr: 'la quiche lorraine', en: 'egg, cream and smoked bacon tart', region: 'Lorraine', note: 'Authentic quiche lorraine has no cheese — that\'s a modern addition. The original is just egg, cream and lardons in pastry.' },
  { fr: 'le confit de canard', en: 'slow-cooked preserved duck leg', region: 'Gascony/Southwest', note: 'Duck leg cooked and preserved in its own fat — incredibly rich and tender. A staple of southwest French cuisine.' },
  { fr: 'la bouillabaisse', en: 'Provençal fish and shellfish stew', region: 'Marseille', note: 'A Marseille speciality — multiple fish varieties, rouille (spicy sauce), croutons. Authentic versions are expensive. Pronounced "boo-ya-BESS".' },
  { fr: 'la tarte tatin', en: 'upside-down caramelised apple tart', region: 'Sologne', note: 'Created accidentally by the Tatin sisters in the 1880s. Served warm with crème fraîche. A French dessert classic.' },
  { fr: 'les moules marinières', en: 'mussels in white wine and shallots', region: 'Atlantic coast', note: 'Classic mussels dish — always served with frites. "Moules-frites" = mussels and chips, a beloved combination.' },
  { fr: 'le croque-monsieur / croque-madame', en: 'grilled ham and cheese / with fried egg on top', region: 'National', note: '"Croque" = crunch. Add a fried egg on top = croque-madame. A French café staple.' },
  { fr: 'la ratatouille', en: 'Provençal slow-cooked vegetable stew', region: 'Provence/Nicoise', note: 'Aubergine, courgette, tomato, pepper — fully vegetarian. The 2007 Pixar film introduced it to millions.' },
  { fr: 'le cassoulet', en: 'white bean, pork and duck casserole', region: 'Languedoc/Toulouse', note: 'A deeply hearty winter dish — slow-cooked over hours. Three towns (Castelnaudary, Carcassonne, Toulouse) dispute the authentic version.' },
  { fr: 'le bœuf bourguignon', en: 'beef braised in Burgundy red wine', region: 'Burgundy', note: 'Julia Child popularised it internationally. The wine must be good enough to drink — "Cuisinez avec le vin que vous buvez."' },
  { fr: 'le soufflé', en: 'baked light savoury or sweet soufflé', region: 'National', note: '"Tomber comme un soufflé" = to collapse like a soufflé. Must be served immediately — don\'t let it wait.' },
  { fr: 'le crêpe / la galette', en: 'thin pancake (sweet/savoury)', region: 'Brittany', note: 'Crêpe = sweet (wheat flour). Galette = savoury (buckwheat). "Galette complète" = egg, ham, cheese. Must be eaten in Brittany.' },
]

const RESTAURANT_CULTURE = [
  { emoji: '🍽️', title: 'The French dining rhythm', detail: 'A traditional French meal has a strict rhythm: apéro → entrée → plat → fromage → dessert → café (→ digestif). This can last 2–4 hours. Rushing is deeply unwelcome. The waiter will not bring the bill until you ask — it\'s considered rude to hurry you. This is a feature, not a bug.' },
  { emoji: '⭐', title: 'The Michelin Guide', detail: 'The Michelin Guide (Le Guide Michelin) was created in 1900 by the tyre company to encourage motoring. One star = excellent. Two = worth a detour. Three = worth a journey. France has the second most 3-star restaurants in the world. The loss of a star has historically caused chefs to weep or even resign. The red Michelin and Bib Gourmand (good value) are equally influential.' },
  { emoji: '🥖', title: 'Bread and water are free', detail: 'By law, French restaurants must provide tap water for free (une carafe d\'eau) if requested. Bread (le pain) is always provided without charge in traditional restaurants — do not butter it in a French restaurant (butter is for breakfast bread). Break off a piece, don\'t cut it.' },
  { emoji: '💶', title: 'Service and tipping', detail: 'Service charge (15%) is legally included in all French restaurant prices — "service compris" is printed on the bill. Tips are optional and not expected — but leaving a few euros for exceptional service is appreciated. Never tip at a café for a single coffee at the counter.' },
]

export default function FrenchRestaurantGuide() {
  const [tab, setTab] = useState('ordering')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Restaurant Guide | SayBonjour!" description="Navigate a French restaurant with confidence — menu vocabulary, ordering phrases, dish glossary, and French dining culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">At the French Restaurant</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Au restaurant — order with confidence and navigate the menu like a local</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'ordering', label: 'Vocabulary' },
            { id: 'dishes', label: 'Dish Glossary' },
            { id: 'culture', label: 'Dining Culture' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {MENU_VOCAB[activeCategory].items.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">— {item.en}</span>
                    </div>
                    {item.note && <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'dishes' && (
          <div className="space-y-3">
            {DISH_GLOSSARY.map((dish, i) => (
              <motion.div key={dish.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="w-9 h-9 rounded-lg bg-cream-50 dark:bg-dark-warm-200 flex items-center justify-center text-xl shrink-0">🍽️</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900 dark:text-cream-50 font-playfair italic">{dish.fr}</span>
                    <SpeakButton text={dish.fr} size="sm" />
                    <span className="text-xs bg-gray-100 dark:bg-dark-warm-200 text-gray-500 px-1.5 py-0.5 rounded">{dish.region}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{dish.en}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 italic">💡 {dish.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {RESTAURANT_CULTURE.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
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
