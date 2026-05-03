import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SHOP_TYPES = [
  { fr: 'une boulangerie', en: 'a bakery', sells: 'baguettes, croissants, pain, viennoiseries', note: 'The French buy bread daily (often twice). A "boulanger artisan" makes bread by hand on-site — look for the official blue "artisan boulanger" sign. Opens early (7am) and closed Monday.' },
  { fr: 'une pâtisserie', en: 'a pastry shop', sells: 'tarts, éclairs, macarons, gâteaux, mille-feuilles', note: '"Pâtissier" is a highly skilled craft — pastry chefs train for 5+ years. Top names: Pierre Hermé, Ladurée, Fauchon.' },
  { fr: 'une fromagerie', en: 'a cheese shop', sells: '300+ varieties of French cheese', note: 'The "fromager" (cheese expert) will guide you, let you taste, and recommend what to have at what stage of ripeness. A dying art treasured by those who know.' },
  { fr: 'une charcuterie', en: 'a deli / pork butcher', sells: 'ham, saucisson, pâté, rillettes, andouillette, terrines', note: 'Also sometimes called "une traiteur" when it sells prepared dishes. "Charcuterie" = cuisine du porc (pork-based cured meats).' },
  { fr: 'une épicerie', en: 'a grocery / corner shop', sells: 'general food and household items', note: '"L\'épicier" = the grocer. "Une épicerie fine" = a fine foods deli.' },
  { fr: 'un supermarché', en: 'a supermarket', sells: 'everything — food, clothes, pharmacy, banking', note: 'Major chains: Carrefour, Monoprix, Lidl, Aldi, Casino, Intermarché, Leclerc. Most have a bakery counter.' },
  { fr: 'un hypermarché', en: 'a hypermarket (very large supermarket)', sells: 'everything including cars, electronics, garden furniture', note: '"Hypers" are outside town centres — you drive to them. Carrefour and Leclerc are the biggest.' },
  { fr: 'un marché (en plein air)', en: 'an outdoor market', sells: 'fresh produce, cheese, meat, fish, flowers, clothes', note: 'Every French town has at least one weekly market. Paris: Marché d\'Aligre, Marché des Batignolles (organic). The market is a social event as much as a shopping trip.' },
  { fr: 'une pharmacie', en: 'a pharmacy / chemist', sells: 'medicines, cosmetics, baby products, parapharmacy', note: 'Always marked with a green illuminated cross. Pharmacists give free health advice — a first stop for minor ailments. They can recommend (and sell) treatments that require a prescription elsewhere.' },
  { fr: 'une librairie', en: 'a bookshop', sells: 'books, stationery, maps, magazines', note: 'False friend! "Librairie" ≠ library (= bibliothèque). "Un libraire" = a bookseller.' },
  { fr: 'une bijouterie / une joaillerie', en: 'a jewellery shop / a fine jewellery shop', sells: 'jewellery, watches, accessories', note: '"Joaillerie" = high-end precious stone jewellery. Paris Vendôme square = world\'s finest jewellers.' },
  { fr: 'une boutique de vêtements', en: 'a clothes shop / boutique', sells: 'clothing, accessories', note: 'French fashion boutiques range from fast fashion to haute couture. "Prêt-à-porter" = ready-to-wear.' },
  { fr: 'un magasin de sport', en: 'a sports shop', sells: 'sports clothes, equipment, outdoor gear', note: 'Decathlon = France\'s dominant sports chain (now global). Produces its own brands at low prices.' },
  { fr: 'un vide-grenier / un marché aux puces', en: 'a car boot sale / flea market', sells: 'second-hand goods, antiques, vintage', note: '"Vide-grenier" = lit. "empty the attic". The Marché aux Puces de Saint-Ouen (Paris) is the world\'s largest antique market.' },
]

const SHOPPING_PHRASES = [
  { fr: 'Je cherche…', en: 'I\'m looking for…', note: 'The simplest opener. "Je cherche une veste en cuir" = I\'m looking for a leather jacket.' },
  { fr: 'Vous avez ceci en taille M / S / L / XL ?', en: 'Do you have this in size M / S / L / XL?' },
  { fr: 'Je peux l\'essayer ?', en: 'Can I try it on?', note: 'You can also say "Je peux essayer ça ?" or "Je voudrais l\'essayer."' },
  { fr: 'Les cabines d\'essayage sont où ?', en: 'Where are the fitting rooms?' },
  { fr: 'C\'est combien ?', en: 'How much is it?', note: '"Quel est le prix ?" is more formal. Both are widely used.' },
  { fr: 'C\'est trop cher. Vous avez quelque chose de moins cher ?', en: 'It\'s too expensive. Do you have something cheaper?' },
  { fr: 'Vous faites les soldes ?', en: 'Do you have a sale on?', note: '"Les soldes" = the legally regulated sales period (twice yearly).' },
  { fr: 'Je prends ça, s\'il vous plaît.', en: 'I\'ll take this one, please.' },
  { fr: 'Vous acceptez la carte bancaire ?', en: 'Do you accept card payment?', note: 'Most French shops accept cards now — even small boulangeries.' },
  { fr: 'Je peux payer en espèces ?', en: 'Can I pay in cash?', note: '"Les espèces" = cash. "Le liquide" = cash (informal).' },
  { fr: 'Avez-vous un sac (réutilisable) ?', en: 'Do you have a (reusable) bag?', note: 'Single-use plastic bags are banned in France since 2017. Bags are charged for.' },
  { fr: 'Je voudrais un remboursement / un échange.', en: 'I\'d like a refund / exchange.', note: '"Rembourser" = to refund. "Échanger" = to exchange. Keep your receipt!' },
  { fr: 'Est-ce que je peux avoir un reçu ?', en: 'Can I have a receipt?', note: '"Un ticket de caisse" = a cash register receipt. "Une facture" = a formal invoice.' },
  { fr: 'C\'est pour offrir — pouvez-vous faire un emballage cadeau ?', en: 'It\'s a gift — can you gift-wrap it?', note: 'Many French boutiques gift-wrap beautifully (and often for free). "Un emballage cadeau" = gift wrapping.' },
  { fr: 'Il y a une promotion / une réduction ?', en: 'Is there a promotion / discount?', note: '"En promo" = on special offer. "Une réduction de 20%" = a 20% discount.' },
  { fr: 'C\'est solde / en promotion jusqu\'à quand ?', en: 'How long is the sale / promotion on?', note: 'Useful for timing your purchases during the soldes.' },
]

const CLOTHING_VOCAB = [
  { fr: 'un manteau', en: 'a coat', note: '"Imperméable" = a raincoat. "Un trench-coat" = a trench coat.' },
  { fr: 'une veste', en: 'a jacket', note: '"Un blazer" is also used. "Une veste en cuir" = leather jacket.' },
  { fr: 'un pull', en: 'a jumper / sweater', note: 'Short for "pull-over". "Un col roulé" = a roll-neck / turtleneck.' },
  { fr: 'une chemise', en: 'a shirt (with buttons)', note: '"Une chemise" = formal shirt. "Un t-shirt" = t-shirt.' },
  { fr: 'un t-shirt', en: 'a t-shirt' },
  { fr: 'un pantalon', en: 'trousers / pants', note: 'Always singular in French: "mon pantalon" = my trousers.' },
  { fr: 'un jean', en: 'jeans', note: 'Also singular: "mon jean est bleu".' },
  { fr: 'une jupe', en: 'a skirt', note: '"Une mini-jupe" = a mini skirt. "Une jupe longue" = a maxi skirt.' },
  { fr: 'une robe', en: 'a dress', note: '"Une robe de soirée" = an evening dress. "Une robe de mariée" = a wedding dress.' },
  { fr: 'des chaussures', en: 'shoes', note: '"Des chaussures à talon" = heels. "Des mocassins" = loafers.' },
  { fr: 'des baskets / des sneakers', en: 'trainers / sneakers' },
  { fr: 'des bottes', en: 'boots', note: '"Des bottines" = ankle boots. "Des bottes en caoutchouc" = wellies.' },
  { fr: 'une ceinture', en: 'a belt' },
  { fr: 'une écharpe', en: 'a scarf', note: '"Un foulard" = a lighter silk or patterned scarf.' },
  { fr: 'des gants', en: 'gloves' },
  { fr: 'un chapeau', en: 'a hat', note: '"Un béret" = a beret (rarely worn daily now, but iconic).' },
  { fr: 'un sac à main', en: 'a handbag / purse', note: 'France is home to the world\'s most famous handbag brands: Chanel, Hermès (Birkin), Louis Vuitton.' },
  { fr: 'en coton / en soie / en laine / en cuir', en: 'in cotton / silk / wool / leather', note: '"Quelle est la matière ?" = What is the material?' },
]

const SHOPPING_CULTURE = [
  { emoji: '🛍️', title: 'Les Soldes — France\'s Regulated Sales', detail: 'France has two legally regulated sales periods per year: winter soldes (January–February) and summer soldes (June–July). Dates are set by the government and the same for all shops nationwide (with regional exceptions in border areas). Discounts can reach 70–80%. Shopping during the soldes is a national sport.' },
  { emoji: '🥖', title: 'The daily boulangerie ritual', detail: 'The French buy bread fresh daily — often twice (morning and evening). Over 30,000 artisan bakeries operate in France. The "baguette tradition" (made by hand, no additives) was protected by law in 1993. The "meilleure baguette de Paris" competition is a prestigious annual event.' },
  { emoji: '🌿', title: 'Organic and local shopping', detail: '"Le marché bio" (organic market) has exploded in France since 2010. The "AB" (Agriculture Biologique) label is France\'s organic certification. The AMAP system (similar to community-supported agriculture) connects urban consumers directly with local farms. Leclerc and Carrefour both now have huge organic sections.' },
  { emoji: '🏷️', title: 'French fashion and luxury', detail: 'France dominates global luxury fashion — LVMH (Louis Vuitton, Dior, Givenchy, Céline) and Kering (Gucci, Balenciaga, Saint Laurent, Bottega Veneta) are the world\'s two largest luxury conglomerates, both French. "Rue du Faubourg Saint-Honoré" in Paris is the world\'s most concentrated luxury shopping street.' },
]

const SIZE_CONVERSION = [
  { category: 'Women\'s clothing', uk: '8 / 10 / 12 / 14', fr: '36 / 38 / 40 / 42', us: '4 / 6 / 8 / 10' },
  { category: 'Men\'s clothing', uk: 'S / M / L / XL', fr: '44-46 / 48-50 / 52-54 / 56-58', us: 'S / M / L / XL' },
  { category: 'Women\'s shoes', uk: '4 / 5 / 6 / 7', fr: '37 / 38 / 39 / 40', us: '6.5 / 7.5 / 8.5 / 9.5' },
  { category: 'Men\'s shoes', uk: '7 / 8 / 9 / 10', fr: '41 / 42 / 43 / 44-45', us: '8 / 9 / 10 / 11' },
]

export default function FrenchShoppingVocab() {
  const [tab, setTab] = useState('shops')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Shopping Vocabulary | SayBonjour!" description="Navigate French shops — types of shops, shopping phrases, clothing vocabulary, size conversions, and shopping culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Shopping in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le shopping — shops, phrases, clothing, size conversions, and French retail culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'shops', label: 'Types of Shops' },
            { id: 'phrases', label: 'Shopping Phrases' },
            { id: 'clothes', label: 'Clothing Vocab' },
            { id: 'sizes', label: 'Size Guide' },
            { id: 'culture', label: 'Shopping Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'shops' && (
          <div className="space-y-3">
            {SHOP_TYPES.map((shop, i) => (
              <motion.div key={shop.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={shop.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{shop.fr}</span>
                    <span className="text-xs text-gray-400">— {shop.en}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 italic">Sells: {shop.sells}</p>
                  {shop.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {shop.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {SHOPPING_PHRASES.map((p, i) => (
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

        {tab === 'clothes' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {CLOTHING_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                  {item.note && <p className="text-xs text-amber-500 italic mt-0.5">{item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'sizes' && (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
              💡 Always try clothes on when shopping in France — size conversions are approximate and vary by brand. French sizing (especially for women) can run small.
            </div>
            {SIZE_CONVERSION.map((row, i) => (
              <motion.div key={row.category} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-5">
                <h3 className="font-bold text-gray-800 dark:text-cream-50 mb-3">{row.category}</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1 font-bold">UK</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{row.uk}</p>
                  </div>
                  <div className="text-center bg-burgundy-50 dark:bg-burgundy-900/20 rounded-lg p-2">
                    <p className="text-xs text-burgundy-500 mb-1 font-bold">France (EU)</p>
                    <p className="text-sm font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{row.fr}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1 font-bold">US</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{row.us}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-sm text-blue-800 dark:text-blue-300">
              <strong>Asking for your size:</strong> "Je fais du 38" (I take a 38). "J\'ai besoin d\'une taille en dessous / au-dessus" = I need a size down / up.
            </div>
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {SHOPPING_CULTURE.map((item, i) => (
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
