import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Flame, ShoppingCart, Award } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const COOKING_SECTIONS = [
  {
    category: 'Cooking Methods',
    fr: 'Les modes de cuisson',
    items: [
      { fr: 'faire bouillir', en: 'to boil', note: '"Faire bouillir de l\'eau" = to boil water; "à l\'eau bouillante" = in boiling water' },
      { fr: 'faire frire / frire', en: 'to fry / deep-fry', note: '"Friture" = the act of frying; "des frites" = chips/fries' },
      { fr: 'faire sauter', en: 'to sauté / stir-fry', note: 'From "sauter" (to jump) — the food "jumps" in the hot pan' },
      { fr: 'faire cuire au four', en: 'to bake / roast in the oven', note: '"Cuit au four" appears on French menus for baked dishes' },
      { fr: 'rôtir', en: 'to roast', note: '"Un rôti" = a roast joint of meat — a Sunday classic in France' },
      { fr: 'griller', en: 'to grill / barbecue', note: '"Grillé(e)" on a menu = grilled. "Le barbecue" = the BBQ event' },
      { fr: 'mijoter', en: 'to simmer / stew slowly', note: 'The secret to French cuisine — long slow cooking builds deep flavour' },
      { fr: 'pocher', en: 'to poach', note: '"Œufs pochés" = poached eggs; "poire pochée" = poached pear' },
      { fr: 'cuire à la vapeur', en: 'to steam', note: '"À la vapeur" = steamed; healthier cooking method gaining popularity in France' },
      { fr: 'flamber', en: 'to flambé', note: 'Set alight with alcohol — theatrical technique in French restaurants. "Crêpes Suzette" are flambéed.' },
      { fr: 'blanchir', en: 'to blanch', note: 'Briefly boil then plunge in ice water — preserves colour and texture of vegetables' },
      { fr: 'braiser', en: 'to braise', note: 'Sear then slow-cook in a covered pot with liquid — key to coq au vin, bœuf bourguignon' },
      { fr: 'confire', en: 'to confit (preserve in fat or sugar)', note: '"Canard confit" = duck preserved in its own fat — a classic of Gascony' },
      { fr: 'émulsionner', en: 'to emulsify', note: 'Creating a stable mixture of fat and water — the science behind vinaigrettes and hollandaise' },
    ],
  },
  {
    category: 'Knife Cuts & Prep',
    fr: 'La découpe et la préparation',
    items: [
      { fr: 'la julienne', en: 'thin matchstick strips (~3mm × 3mm × 5cm)', note: 'Thought to be named after chef Julienne, 1722 — used for salads, soups, garnishes' },
      { fr: 'la brunoise', en: 'very fine dice (3mm cubes)', note: 'Made by dicing julienned vegetables further — used in sauces and stuffings' },
      { fr: 'la macédoine', en: 'medium dice (5mm cubes)', note: 'Named after Macedonia — used for mixed vegetable salads ("macédoine de légumes")' },
      { fr: 'le chiffonnade', en: 'finely shredded leafy herbs or greens', note: 'Lit. "rag cutting" — stack leaves, roll, then slice into thin ribbons' },
      { fr: 'la ciseler', en: 'to finely dice (especially onions, shallots)', note: 'More precise than "couper" — used by professional chefs for mirepoix' },
      { fr: 'hacher', en: 'to chop / mince', note: '"Steak haché" = minced beef / burger' },
      { fr: 'émincer', en: 'to slice thinly', note: '"Oignons émincés" = thinly sliced onions' },
      { fr: 'éplucher / peler', en: 'to peel', note: '"Éplucher" = peel by hand or knife; "peler" = same' },
      { fr: 'égoutter', en: 'to drain', note: '"Égoutter les pâtes" = drain the pasta' },
      { fr: 'ciseler les fines herbes', en: 'to chiffonnade fine herbs', note: 'Standard in classical French kitchen prep — chives, parsley, tarragon cut this way' },
    ],
  },
  {
    category: 'Ingredients',
    fr: 'Les ingrédients',
    items: [
      { fr: 'la farine', en: 'flour', note: '"Farine T45" is fine pastry flour; "T55" is all-purpose; "T65" is bread flour — the French classify by ash content' },
      { fr: 'le beurre', en: 'butter', note: 'France uses 8kg per person per year — the highest in the world. "Beurre demi-sel" (salted) is from Bretagne.' },
      { fr: 'les œufs', en: 'eggs', note: '"Un œuf au plat" = fried egg; "à la coque" = soft boiled; "dur" = hard boiled' },
      { fr: 'la crème fraîche', en: 'crème fraîche', note: 'Thicker and tangier than UK/US cream due to bacterial culture — never substitute with standard cream for French recipes' },
      { fr: 'l\'huile d\'olive', en: 'olive oil', note: 'From Provence, the AOC Huile d\'Olive de Provence is protected by French law' },
      { fr: 'les échalotes', en: 'shallots', note: 'Used far more than onions in classical French cooking — sweeter, more complex flavour' },
      { fr: 'l\'ail', en: 'garlic', note: '"L\'ail en chemise" = unpeeled garlic roasted in its skin' },
      { fr: 'le bouillon', en: 'stock / broth', note: '"Fond de veau" (veal stock) and "fumet de poisson" (fish stock) are cornerstones of French sauce-making' },
      { fr: 'les herbes aromatiques', en: 'aromatic herbs', note: 'Thym (thyme), persil (parsley), laurier (bay leaf), estragon (tarragon), cerfeuil (chervil) — the "fines herbes" quartet' },
      { fr: 'le vinaigre', en: 'vinegar', note: '"Vinaigre de vin rouge/blanc" — wine vinegar is standard in French vinaigrettes; not malt vinegar' },
      { fr: 'la moutarde de Dijon', en: 'Dijon mustard', note: 'Protected by AOC. A French kitchen staple — used in sauces, dressings, marinades' },
      { fr: 'le lardons', en: 'bacon lardons (small cubes)', note: 'Distinct from British bacon — cut into cubes, not strips. Essential in bœuf bourguignon, quiche, and salads.' },
    ],
  },
  {
    category: 'Kitchen Equipment',
    fr: 'La batterie de cuisine',
    items: [
      { fr: 'une casserole', en: 'a saucepan', note: '"Casserole" in French means saucepan — not the baked dish it refers to in English!' },
      { fr: 'une poêle', en: 'a frying pan', note: '"Poêle antiadhésive" = non-stick pan' },
      { fr: 'une cocotte', en: 'a casserole dish / Dutch oven', note: '"Cocotte-Minute" is the Seb brand pressure cooker — hugely popular in French homes' },
      { fr: 'un fouet', en: 'a whisk', note: '"Fouetter" = to whisk; essential for egg whites ("blancs en neige") and cream' },
      { fr: 'une spatule', en: 'a spatula / palette knife' },
      { fr: 'un couteau de chef', en: 'a chef\'s knife', note: 'French knife skills (la technique de couteau) are taught systematically in culinary schools' },
      { fr: 'une planche à découper', en: 'a chopping board' },
      { fr: 'un rouleau à pâtisserie', en: 'a rolling pin', note: 'Essential for pastry (pâte brisée, pâte feuilletée)' },
      { fr: 'une balance de cuisine', en: 'kitchen scales', note: 'French recipes always use weight (grams), never volume cups — precision is key in French baking' },
      { fr: 'une passoire', en: 'a colander / strainer' },
      { fr: 'un tamis', en: 'a sieve / sifter', note: 'For sifting flour, passing sauces — creates very smooth textures' },
      { fr: 'une mandoline', en: 'a mandoline slicer', note: 'For ultra-thin slices — beloved in professional kitchens for gratins and salads' },
    ],
  },
  {
    category: 'Classical Terms',
    fr: 'La terminologie classique',
    items: [
      { fr: 'la mise en place', en: 'preparation of all ingredients before cooking begins', note: 'The golden rule of professional kitchens — everything measured, chopped, and in place before heat is applied' },
      { fr: 'le roux', en: 'flour and butter cooked together (sauce base)', note: 'Roux blanc (white), roux blond (golden), roux brun (dark) — the colour determines use' },
      { fr: 'la béchamel', en: 'white sauce (roux + milk)', note: 'One of the five French mother sauces — named for Louis de Béchameil, steward to Louis XIV' },
      { fr: 'la velouté', en: 'stock-based white sauce (roux + stock)', note: 'Second mother sauce — veal, chicken, or fish stock based' },
      { fr: 'déglacer', en: 'to deglaze', note: 'Add liquid to a hot pan to dissolve the caramelised bits (le fond) — the base of most pan sauces' },
      { fr: 'réduire', en: 'to reduce', note: 'Simmer liquid to concentrate flavour — "réduire de moitié" = reduce by half' },
      { fr: 'lier (une sauce)', en: 'to thicken a sauce', note: 'Techniques: roux, maïzena, crème, beurre manié' },
      { fr: 'monter au beurre', en: 'to finish a sauce by whisking in cold butter', note: 'Classic French finishing technique — adds gloss and richness to sauces' },
      { fr: 'napper', en: 'to coat with sauce', note: '"Napper de sauce" = ladle sauce over to coat evenly' },
      { fr: 'assaisonner', en: 'to season', note: '"Goûtez et assaisonnez à votre goût" = taste and season to your liking — a cardinal rule' },
      { fr: 'passer au chinois', en: 'to strain through a conical sieve', note: 'The "chinois" is a fine-mesh conical strainer — gives silky-smooth sauces' },
    ],
  },
]

const FRENCH_DISHES = [
  { name: 'La soupe à l\'oignon', type: 'Entrée', region: 'Paris', desc: 'Caramelised onion soup topped with a croûton and melted gruyère. A Parisian bistro classic, historically eaten by market workers at Les Halles in the early morning.', diff: 'Facile' },
  { name: 'Le bœuf bourguignon', type: 'Plat', region: 'Bourgogne', desc: 'Beef slow-cooked in Burgundy red wine with lardons, mushrooms, and pearl onions. The collagen in the beef dissolves over hours into a silky, glossy sauce.', diff: 'Intermédiaire' },
  { name: 'Le coq au vin', type: 'Plat', region: 'National', desc: 'Chicken braised in red wine with mushrooms, lardons, and pearl onions. Originally a way to tenderise an old, tough rooster (coq).', diff: 'Intermédiaire' },
  { name: 'La quiche lorraine', type: 'Plat / Entrée', region: 'Lorraine', desc: 'Egg and crème fraîche tart with lardons in a shortcrust pastry (pâte brisée). The authentic version contains no cheese — that\'s a later adaptation.', diff: 'Intermédiaire' },
  { name: 'La ratatouille niçoise', type: 'Accompagnement', region: 'Provence', desc: 'Slow-cooked Provençal vegetable stew — aubergine, courgette, tomatoes, peppers, and herbs. Each vegetable cooked separately before combining, in the classical version.', diff: 'Facile' },
  { name: 'La tarte tatin', type: 'Dessert', region: 'Sologne', desc: 'Caramelised upside-down apple tart. Created by accident in 1889 by the Tatin sisters — one dropped a normal tart and baked it upside down to save it.', diff: 'Intermédiaire' },
  { name: 'Les crêpes Suzette', type: 'Dessert', region: 'Bretagne / Paris', desc: 'Thin crêpes in orange butter sauce, flambéed with Grand Marnier or Cointreau at the table. The dish was apparently created accidentally by 14-year-old Henri Charpentier in 1895.', diff: 'Intermédiaire' },
  { name: 'Le soufflé au chocolat', type: 'Dessert', region: 'National', desc: 'The legendary baked egg dish — must be served and eaten immediately. "Le soufflé n\'attend pas" (the soufflé doesn\'t wait). A test of timing and technique.', diff: 'Difficile' },
  { name: 'Le cassoulet', type: 'Plat', region: 'Languedoc', desc: 'A hearty slow-cooked casserole of white beans, sausage, duck confit, and pork — the three cities of Castelnaudary, Carcassonne, and Toulouse each claim the "authentic" recipe.', diff: 'Difficile' },
  { name: 'Les moules marinières', type: 'Plat / Entrée', region: 'Normandie / Bretagne', desc: 'Mussels steamed open in white wine, shallots, parsley, and butter. Eaten with crusty bread to soak up the broth.', diff: 'Facile' },
]

const MOTHER_SAUCES = [
  { name: 'Béchamel', base: 'Roux blanc + lait', uses: 'Lasagne, croque-monsieur, gratins, moussaka', note: 'Named for Louis de Béchameil, steward to Louis XIV' },
  { name: 'Velouté', base: 'Roux blond + fond blanc (bouillon)', uses: 'Sauce suprême, sauce vin blanc, sauce allemande', note: 'Lit. "velvety" — the stock can be chicken, veal, or fish' },
  { name: 'Espagnole', base: 'Roux brun + fond brun (viande)', uses: 'Sauce bordelaise, sauce Robert, demi-glace', note: 'The darkest mother sauce — hours of cooking for deep colour' },
  { name: 'Tomate', base: 'Tomates + fond de veau', uses: 'Pizza, pasta, braised dishes', note: 'The French mother sauce version is richer than Italian tomato sauce' },
  { name: 'Hollandaise', base: 'Beurre clarifié + jaunes d\'œuf + citron', uses: 'Œufs Bénédicte, asperges, poisson', note: 'An emulsion sauce — the most temperamental of the five. Béarnaise is a daughter sauce.' },
]

export default function FrenchCooking() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Cooking Vocabulary | SayBonjour!" description="Learn French cooking vocabulary — classical techniques, knife cuts, ingredients, equipment, classic dishes, and the five mother sauces." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Cooking</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La cuisine française — techniques, ingredients, equipment, and classic recipes</p>
          <p className="text-xs text-amber-600 mt-1 italic">UNESCO Intangible Cultural Heritage since 2010</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'dishes', label: 'Classic Dishes' },
            { id: 'sauces', label: 'The 5 Mother Sauces' },
          ].map(t => (
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
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{COOKING_SECTIONS[activeCategory].category}</h2>
              <p className="text-xs text-gray-400 italic mb-4">{COOKING_SECTIONS[activeCategory].fr}</p>
              <div className="space-y-3">
                {COOKING_SECTIONS[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-start gap-3 border-b border-gray-50 dark:border-dark-warm-200 pb-2 last:border-0"
                    onClick={() => addXP(2, 'vocabulary')}>
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
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-cream-50 font-playfair italic">{dish.name}</p>
                      <SpeakButton text={dish.name} size="sm" />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap shrink-0">
                    <span className="text-xs bg-cream-100 dark:bg-dark-warm-200 text-gray-500 px-2 py-0.5 rounded-full">{dish.type}</span>
                    <span className="text-xs bg-burgundy-50 dark:bg-burgundy-vibrant-600/10 text-burgundy-600 dark:text-burgundy-vibrant-300 px-2 py-0.5 rounded-full">{dish.region}</span>
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{dish.diff}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{dish.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'sauces' && (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 mb-2 text-sm text-amber-800 dark:text-amber-300">
              <strong>Les cinq sauces mères</strong> — codified by Auguste Escoffier in the early 20th century, these five "mother sauces" form the foundation of all classical French cuisine. Every other sauce is a "daughter sauce" derived from one of these five.
            </div>
            {MOTHER_SAUCES.map((sauce, i) => (
              <motion.div key={sauce.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(4, 'vocabulary')}>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-burgundy-600 shrink-0" />
                  <div className="flex items-center gap-2">
                    <SpeakButton text={`Sauce ${sauce.name}`} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair text-lg">Sauce {sauce.name}</h3>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-700 dark:text-gray-200">Base:</span> {sauce.base}</p>
                  <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-700 dark:text-gray-200">Uses:</span> {sauce.uses}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-1">💡 {sauce.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
