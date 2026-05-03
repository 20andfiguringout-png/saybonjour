import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SHOP_TYPES = [
  { fr: 'une boulangerie', en: 'a bakery', sells: 'baguettes, croissants, pain', note: 'The French buy bread daily — often twice' },
  { fr: 'une pâtisserie', en: 'a pastry shop', sells: 'tarts, éclairs, macarons, gâteaux' },
  { fr: 'une fromagerie', en: 'a cheese shop', sells: 'cheese, France has 300+ varieties' },
  { fr: 'une charcuterie', en: 'a deli / pork butcher', sells: 'ham, saucisson, pâté, rillettes' },
  { fr: 'une épicerie', en: 'a grocery / corner shop', sells: 'general food and household items' },
  { fr: 'un supermarché', en: 'a supermarket', sells: 'everything', note: 'Major chains: Carrefour, Monoprix, Lidl, Auchan' },
  { fr: 'un marché', en: 'a market (outdoor)', sells: 'fresh produce, local goods', note: 'Most French towns have a weekly market' },
  { fr: 'une pharmacie', en: 'a pharmacy / chemist', sells: 'medicines, cosmetics', note: 'Green cross sign — also for minor health advice' },
  { fr: 'une librairie', en: 'a bookshop', sells: 'books, stationery', note: 'False friend! "Librairie" ≠ library (= bibliothèque)' },
  { fr: 'une bijouterie', en: 'a jewellery shop' },
  { fr: 'une boutique de vêtements', en: 'a clothes shop' },
  { fr: 'un magasin de sport', en: 'a sports shop' },
]

const SHOPPING_PHRASES = [
  { fr: 'Je cherche…', en: 'I\'m looking for…' },
  { fr: 'Vous avez ceci en taille M ?', en: 'Do you have this in size M?' },
  { fr: 'Je peux l\'essayer ?', en: 'Can I try it on?' },
  { fr: 'Les cabines d\'essayage sont où ?', en: 'Where are the fitting rooms?' },
  { fr: 'C\'est combien ?', en: 'How much is it?' },
  { fr: 'C\'est trop cher.', en: 'It\'s too expensive.' },
  { fr: 'Vous faites les soldes ?', en: 'Do you have a sale on?' },
  { fr: 'Je prends ça, s\'il vous plaît.', en: 'I\'ll take this one, please.' },
  { fr: 'Vous acceptez la carte bancaire ?', en: 'Do you accept card payment?' },
  { fr: 'Avez-vous un sac ?', en: 'Do you have a bag?' },
  { fr: 'Je voudrais un remboursement.', en: 'I\'d like a refund.' },
  { fr: 'Est-ce que je peux avoir un reçu ?', en: 'Can I have a receipt?' },
  { fr: 'C\'est pour offrir.', en: 'It\'s a gift.', note: 'They\'ll wrap it nicely!' },
]

const CLOTHING_VOCAB = [
  { fr: 'un manteau', en: 'a coat' },
  { fr: 'une veste', en: 'a jacket' },
  { fr: 'un pull', en: 'a jumper / sweater', note: 'Short for pull-over' },
  { fr: 'une chemise', en: 'a shirt (formal)' },
  { fr: 'un t-shirt', en: 'a t-shirt' },
  { fr: 'un pantalon', en: 'trousers / pants' },
  { fr: 'un jean', en: 'jeans' },
  { fr: 'une jupe', en: 'a skirt' },
  { fr: 'une robe', en: 'a dress' },
  { fr: 'des chaussures', en: 'shoes' },
  { fr: 'des baskets', en: 'trainers / sneakers' },
  { fr: 'une ceinture', en: 'a belt' },
  { fr: 'une écharpe', en: 'a scarf' },
  { fr: 'des gants', en: 'gloves' },
]

const SIZE_INFO = [
  { label: 'Clothing sizes', content: 'French sizes are different from UK/US. A UK 10 ≈ FR 38/40. Always try on or check conversion charts.' },
  { label: 'Shoe sizes', content: 'France uses European sizes (pointure). UK 7 ≈ EU 41. FR 38 ≈ UK 5.' },
  { label: 'Les soldes', content: 'France has legally regulated sale periods twice a year (summer and winter soldes) — massive discounts. Shopping festivals!' },
]

export default function FrenchShoppingVocab() {
  const [tab, setTab] = useState('shops')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Shopping Vocabulary | SayBonjour!" description="Navigate French shops — types of shops, shopping phrases, clothing vocabulary, and size tips." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Shopping in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le shopping et les magasins — shops, phrases, and clothing vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'shops', label: 'Types of Shops' }, { id: 'phrases', label: 'Shopping Phrases' }, { id: 'clothes', label: 'Clothing' }].map(t => (
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sells: {shop.sells}</p>
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
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic">{p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'clothes' && (
          <>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {CLOTHING_VOCAB.map((item, i) => (
                <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-center gap-2">
                  <SpeakButton text={item.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</p>
                    <p className="text-xs text-gray-400">{item.en}</p>
                    {item.note && <p className="text-xs text-amber-500 italic">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {SIZE_INFO.map(info => (
                <div key={info.label} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">💡 {info.label}</p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">{info.content}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
