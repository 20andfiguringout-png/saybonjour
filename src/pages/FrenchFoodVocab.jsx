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
      { fr: 'une baguette', en: 'a baguette', note: 'The national symbol. "Une baguette tradition" (sourdough method) is better than "une baguette ordinaire". UNESCO-listed in 2022.' },
      { fr: 'un croissant', en: 'a croissant', note: '"Au beurre" = made with real butter (the flaky, layered kind). A croissant droit (straight) is not au beurre. A curved croissant is au beurre.' },
      { fr: 'un pain au chocolat', en: 'a chocolate pastry', note: 'Called "une chocolatine" in south-west France and Quebec — a fierce regional debate. Straight and rectangular, not curved.' },
      { fr: 'une brioche', en: 'a brioche', note: 'Enriched bread with butter and eggs — rich and slightly sweet. "La Brioche Vendéenne" from the Vendée is the most famous.' },
      { fr: 'un pain de campagne', en: 'a country loaf', note: 'Denser sourdough-style loaf — often made with a mix of wheat and rye flour.' },
      { fr: 'un pain complet', en: 'a wholemeal loaf', note: 'Wholegrain bread — increasingly popular as health consciousness grows in France.' },
      { fr: 'une viennoiserie', en: 'a pastry / sweet breakfast item', note: 'The category: croissants, pain au chocolat, pain aux raisins, chausson aux pommes, tarte au citron.' },
      { fr: 'une tarte (Tatin)', en: 'a tart (Tarte Tatin)', note: 'Tarte Tatin = upside-down caramelised apple tart. Invented by the Tatin sisters in the 1880s in Lamotte-Beuvron.' },
      { fr: 'un éclair', en: 'an éclair', note: 'Choux pastry filled with cream, topped with chocolate or coffee glaze. "Éclair au café" = coffee éclair.' },
      { fr: 'un macaron', en: 'a macaron', note: 'NOT "macaroon". Pierre Hermé and Ladurée made Parisian macarons famous. Very different from the coconut macaroon.' },
    ],
  },
  {
    category: 'Cheese',
    emoji: '🧀',
    items: [
      { fr: 'le fromage', en: 'cheese', note: 'France has 300–400 official varieties. De Gaulle: "Comment voulez-vous gouverner un pays qui a 246 variétés de fromage ?"' },
      { fr: 'le camembert', en: 'camembert (Normandy)', note: 'Soft white bloomy rind. "Camembert de Normandie" (AOP) is made from raw milk. Buy it ripe — it should yield to gentle pressure.' },
      { fr: 'le brie', en: 'brie (Île-de-France)', note: '"Le roi des fromages". Two AOP varieties: Brie de Meaux (strong) and Brie de Melun (more intense). Flat disc, white rind.' },
      { fr: 'le comté', en: 'comté (Franche-Comté)', note: 'France\'s most consumed AOP cheese. Hard mountain cheese aged 4–36 months. The longer the aging, the more complex the flavour.' },
      { fr: 'le roquefort', en: 'roquefort (Aveyron)', note: '"Le roi des fromages bleus". Made only from raw Lacaune sheep\'s milk. Aged in the limestone caves of Combalou. The first AOP in France (1925).' },
      { fr: 'le chèvre', en: 'goat\'s cheese', note: '"Chèvre frais" = fresh and mild. "Chèvre affiné" = aged and pungent. "Crottin de Chavignol" = famous Loire Valley variety.' },
      { fr: 'le reblochon', en: 'reblochon (Savoie)', note: 'Soft washed-rind mountain cheese from the Alps. Used in tartiflette (potato, bacon, cream gratin).' },
      { fr: 'le munster', en: 'munster (Alsace-Lorraine)', note: 'Pungent washed-rind cheese from the Vosges mountains. Often served with caraway seeds.' },
    ],
  },
  {
    category: 'Fruits & Vegetables',
    emoji: '🍎',
    items: [
      { fr: 'une pomme', en: 'an apple', note: 'France is Europe\'s second-largest apple producer. Brittany produces famous cider apples.' },
      { fr: 'une poire', en: 'a pear', note: '"Une poire williams" = a Williams pear (used in pear brandy — "eau de vie de poire"). "C\'est une poire" = he\'s a pushover (slang).' },
      { fr: 'une fraise', en: 'a strawberry', note: '"Les fraises de Plougastel" (Brittany) and "les gariguettes" (Provence) are celebrated varieties. Always eaten at their best in spring.' },
      { fr: 'un citron', en: 'a lemon', note: '"Un citron vert" = a lime. "Un citron pressé" = freshly squeezed lemon juice (served with sugar and water to mix yourself).' },
      { fr: 'une tomate', en: 'a tomato', note: 'Technically a fruit but treated as a vegetable. Provence produces exceptional summer tomatoes — especially "les cœurs de bœuf".' },
      { fr: 'une carotte', en: 'a carrot', note: '"La carotte" is also slang for a police/gendarmerie station sign (red cone shape).' },
      { fr: 'des haricots verts', en: 'green beans', note: 'A French staple — served with butter or vinaigrette. The French are obsessive about the quality of their haricots verts.' },
      { fr: 'une courgette', en: 'a courgette / zucchini', note: 'Central to ratatouille and many Provençal dishes. "Les fleurs de courgette" = courgette flowers, stuffed and fried — a delicacy.' },
      { fr: 'un poireau', en: 'a leek', note: '"Le poireau" = huge in French cooking — soups (potage Parmentier), quiches, vichyssoise. Also: "Poireau" = slang for a police officer (like English "cabbage").' },
      { fr: 'de l\'ail', en: 'garlic', note: '"L\'ail rose de Lautrec" (Tarn) is one of France\'s most prized garlic varieties — lighter and sweeter than ordinary garlic.' },
      { fr: 'un artichaut', en: 'an artichoke', note: 'Brittany produces 70% of France\'s artichokes. Eaten boiled with vinaigrette or mayonnaise. "Avoir un cœur d\'artichaut" = to fall in love easily.' },
      { fr: 'une aubergine', en: 'an aubergine / eggplant', note: 'Essential in ratatouille and caviar d\'aubergine (aubergine dip similar to baba ganoush).' },
    ],
  },
  {
    category: 'Classic Dishes',
    emoji: '🍲',
    items: [
      { fr: 'le bœuf bourguignon', en: 'beef Burgundy (slow-cooked beef in red wine)', note: 'Beef braised for hours in Burgundy wine with pearl onions, mushrooms, and lardons. A weekend Sunday lunch dish.' },
      { fr: 'la ratatouille', en: 'ratatouille (Provençal vegetable stew)', note: 'Courgette, tomato, aubergine, peppers — slow-cooked together. Originates in Nice. The film brought it global fame.' },
      { fr: 'la quiche lorraine', en: 'quiche Lorraine (bacon and egg tart)', note: 'Savoury custard with lardons in a shortcrust pastry shell. The original never has cheese — that\'s a modern addition.' },
      { fr: 'le cassoulet', en: 'cassoulet (slow-cooked bean and meat casserole)', note: 'From Languedoc (Castelnaudary, Carcassonne, Toulouse). White beans, duck confit, pork sausage, sometimes lamb — slow-cooked for days.' },
      { fr: 'la soupe à l\'oignon', en: 'French onion soup', note: 'Topped with melted Gruyère cheese on croûtons. Traditionally eaten at Les Halles market in Paris at 6am by night workers.' },
      { fr: 'le coq au vin', en: 'chicken braised in wine', note: 'Old rooster (coq) slow-cooked in red wine with mushrooms, lardons, and pearl onions. Bourguignon style is most famous.' },
      { fr: 'les crêpes / les galettes', en: 'crêpes (sweet) / buckwheat galettes (savoury)', note: '"Galettes de sarrasin" from Brittany = savoury buckwheat pancakes. "Crêpes sucrées" = sweet crêpes. La Chandeleur (2 February) = crêpe day.' },
      { fr: 'le pot-au-feu', en: 'pot-au-feu (boiled beef and vegetable stew)', note: 'France\'s national dish — beef slowly simmered with root vegetables. Broth served first, then meat and vegetables. Sunday lunch tradition.' },
      { fr: 'la tartiflette', en: 'tartiflette (Savoie potato and reblochon gratin)', note: 'Potatoes, reblochon cheese, lardons, and crème fraîche — baked. A modern (1980s) creation that became a classic ski resort dish.' },
      { fr: 'les escargots à la bourguignonne', en: 'snails in garlic and parsley butter', note: 'A true French classic — snails in shells stuffed with garlic-parsley butter, baked until sizzling. More delicious than it sounds.' },
    ],
  },
  {
    category: 'Meat & Charcuterie',
    emoji: '🥩',
    items: [
      { fr: 'le jambon', en: 'ham', note: '"Jambon de Paris" = cooked ham; "jambon de Bayonne" = dry-cured; "jambon cru" = raw cured ham.' },
      { fr: 'le saucisson', en: 'dried sausage (for slicing)', note: '"Un saucisson sec" = dry-cured sausage sliced thin. "Saucisson de Lyon" is the most famous.' },
      { fr: 'le foie gras', en: 'foie gras (fattened duck or goose liver)', note: 'A protected French delicacy — served as terrine or pan-seared. Controversial for animal welfare; banned in some countries but beloved in France.' },
      { fr: 'le magret de canard', en: 'duck breast (from a fattened duck)', note: 'Thick, rich duck breast — cooked medium-rare like steak. Served with cherry or pepper sauce. A Gascon speciality.' },
      { fr: 'le confit de canard', en: 'duck confit (duck leg slow-cooked in its own fat)', note: 'Duck legs preserved and slow-cooked in fat — one of the great preservation techniques of French cuisine.' },
      { fr: 'un steak (bleu / saignant / à point)', en: 'a steak (very rare / rare / medium)', note: '"Bien cuit" = well done (frowned upon). "À point" = medium. Never order a steak well done in a good French restaurant.' },
    ],
  },
]

const FOOD_PHRASES = [
  { fr: 'Je suis gourmand(e).', en: 'I love food / I have a sweet tooth.', note: '"Gourmand" = loving food abundantly; "gourmet" = having refined taste. Both are compliments.' },
  { fr: 'C\'est délicieux / savoureux !', en: 'It\'s delicious / flavourful!' },
  { fr: 'C\'est trop salé / sucré / épicé / acide.', en: 'It\'s too salty / sweet / spicy / acidic.' },
  { fr: 'C\'est cuit à point.', en: 'It\'s cooked to perfection.' },
  { fr: 'C\'est fondant.', en: 'It melts in the mouth. / It\'s wonderfully tender.', note: '"Fondant" = melting texture — the highest compliment for meat or dessert.' },
  { fr: 'J\'ai une intolérance au lactose / au gluten.', en: 'I\'m lactose / gluten intolerant.' },
  { fr: 'Je suis végétarien(ne) / vegan / flexitarien(ne).', en: 'I\'m vegetarian / vegan / flexitarian.', note: 'Veganism is growing in France — but options remain more limited in traditional restaurants.' },
  { fr: 'C\'est fait maison.', en: 'It\'s homemade.', note: '"Fait maison" is an official regulated label in French restaurants — guarantees it\'s made on the premises.' },
  { fr: 'Je voudrais la recette !', en: 'I\'d love the recipe!', note: 'Asking for the recipe is the greatest compliment to a French host.' },
  { fr: 'Le fromage de chèvre est affiné combien de temps ?', en: 'How long is the goat\'s cheese aged?', note: 'Showing interest in the provenance and preparation of food is culturally valued in France.' },
  { fr: 'C\'est de saison ?', en: 'Is it in season?', note: 'The French take seasonality very seriously — asking this question will earn you respect.' },
  { fr: 'Quel est le plat régional typique ici ?', en: 'What\'s the typical regional dish here?', note: 'Every French region has its signature dishes — asking this opens wonderful conversations.' },
]

export default function FrenchFoodVocab() {
  const [tab, setTab] = useState('food')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Food Vocabulary | SayBonjour!" description="French food vocabulary — bread, cheese, vegetables, classic dishes, charcuterie, and food phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Food Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La gastronomie française — bread, cheese, produce, classic dishes, and food phrases</p>
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
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                  onClick={() => addXP(2, 'vocabulary')}>
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
      </div>
    </div>
  )
}
