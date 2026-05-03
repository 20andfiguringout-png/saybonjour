import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FASHION_VOCAB = [
  {
    category: 'Clothing — Les vêtements',
    items: [
      { fr: 'un manteau', en: 'a coat' },
      { fr: 'un imperméable', en: 'a raincoat / mac' },
      { fr: 'une veste', en: 'a jacket' },
      { fr: 'un blazer', en: 'a blazer' },
      { fr: 'un pull', en: 'a jumper / sweater' },
      { fr: 'un débardeur', en: 'a vest top / tank top' },
      { fr: 'une chemise', en: 'a shirt (men\'s)' },
      { fr: 'un chemisier', en: 'a blouse (women\'s)' },
      { fr: 'un pantalon', en: 'trousers / pants' },
      { fr: 'un jean', en: 'jeans' },
      { fr: 'une jupe', en: 'a skirt' },
      { fr: 'une robe', en: 'a dress' },
      { fr: 'un short', en: 'shorts' },
      { fr: 'un costume', en: 'a suit (men\'s)' },
      { fr: 'un tailleur', en: 'a suit (women\'s)' },
      { fr: 'des chaussettes', en: 'socks' },
      { fr: 'des sous-vêtements', en: 'underwear' },
      { fr: 'un pyjama', en: 'pyjamas' },
    ],
  },
  {
    category: 'Shoes & Accessories — Chaussures & Accessoires',
    items: [
      { fr: 'des chaussures', en: 'shoes' },
      { fr: 'des baskets', en: 'trainers / sneakers' },
      { fr: 'des talons hauts', en: 'high heels' },
      { fr: 'des bottes', en: 'boots' },
      { fr: 'des sandales', en: 'sandals' },
      { fr: 'un sac à main', en: 'a handbag' },
      { fr: 'un portefeuille', en: 'a wallet' },
      { fr: 'une ceinture', en: 'a belt' },
      { fr: 'un foulard', en: 'a silk scarf' },
      { fr: 'une écharpe', en: 'a wool scarf' },
      { fr: 'des bijoux', en: 'jewellery' },
      { fr: 'une montre', en: 'a watch' },
      { fr: 'un chapeau', en: 'a hat' },
      { fr: 'une casquette', en: 'a cap' },
      { fr: 'des lunettes de soleil', en: 'sunglasses' },
    ],
  },
  {
    category: 'Describing Clothes — Décrire les vêtements',
    items: [
      { fr: 'élégant(e)', en: 'elegant' },
      { fr: 'chic', en: 'chic / stylish' },
      { fr: 'décontracté(e)', en: 'casual / relaxed' },
      { fr: 'sobre', en: 'understated / subdued' },
      { fr: 'à la mode', en: 'fashionable / trendy' },
      { fr: 'démodé(e)', en: 'old-fashioned / out of style' },
      { fr: 'uni(e)', en: 'plain / one-colour' },
      { fr: 'à rayures', en: 'striped' },
      { fr: 'à pois', en: 'polka-dot' },
      { fr: 'en cuir', en: 'leather' },
      { fr: 'en coton', en: 'cotton' },
      { fr: 'en soie', en: 'silk' },
      { fr: 'en laine', en: 'wool' },
    ],
  },
  {
    category: 'Shopping — Faire du shopping',
    items: [
      { fr: 'faire du shopping', en: 'to go shopping' },
      { fr: 'essayer', en: 'to try on' },
      { fr: 'la cabine d\'essayage', en: 'the fitting room' },
      { fr: 'la taille', en: 'the size (clothing)' },
      { fr: 'la pointure', en: 'the shoe size' },
      { fr: 'les soldes', en: 'the sales' },
      { fr: 'une réduction', en: 'a discount' },
      { fr: 'la caisse', en: 'the checkout / till' },
      { fr: 'un reçu', en: 'a receipt' },
      { fr: 'rembourser', en: 'to refund' },
    ],
  },
]

const MAISONS = [
  { name: 'Chanel', founded: 1910, signature: 'The little black dress, quilted bags, tweed jackets', founder: 'Gabrielle "Coco" Chanel', icon: '⬛' },
  { name: 'Louis Vuitton', founded: 1854, signature: 'Monogrammed luggage, the LV canvas, the Neverfull bag', founder: 'Louis Vuitton', icon: '🌸' },
  { name: 'Dior', founded: 1946, signature: 'The New Look (1947), the Bar jacket, the Lady Dior bag', founder: 'Christian Dior', icon: '🌹' },
  { name: 'Hermès', founded: 1837, signature: 'The Birkin bag, the Kelly bag, silk carrés (scarves)', founder: 'Thierry Hermès', icon: '🐎' },
  { name: 'Yves Saint Laurent', founded: 1961, signature: 'Le Smoking tuxedo suit for women, the Safari jacket', founder: 'Yves Saint Laurent', icon: '🖤' },
  { name: 'Givenchy', founded: 1952, signature: 'Audrey Hepburn\'s iconic costumes, Le De Givenchy perfume', founder: 'Hubert de Givenchy', icon: '💎' },
  { name: 'Balenciaga', founded: 1917, signature: 'The sack dress, avant-garde silhouettes (now Spanish-French)', founder: 'Cristóbal Balenciaga', icon: '🏛️' },
  { name: 'Coco Chanel quote', founded: null, signature: '"La mode se démode, le style jamais." (Fashion fades, style is eternal.)', founder: 'Coco Chanel', icon: '💬' },
]

const USEFUL_PHRASES = [
  { fr: 'Est-ce que vous avez ça en taille 40 ?', en: 'Do you have this in size 40?' },
  { fr: 'Est-ce que je peux l\'essayer ?', en: 'Can I try it on?' },
  { fr: 'C\'est trop grand / trop petit.', en: 'It\'s too big / too small.' },
  { fr: 'Ça me va bien / ça ne me va pas.', en: 'It suits me / it doesn\'t suit me.' },
  { fr: 'Vous faites les soldes ?', en: 'Do you have a sale on?' },
  { fr: 'C\'est soldé à combien ?', en: 'How much is it in the sale?' },
  { fr: 'Je cherche quelque chose de chic mais de décontracté.', en: 'I\'m looking for something chic but casual.' },
]

export default function FrenchFashion() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Fashion Vocabulary | SayBonjour!" description="Learn French fashion vocabulary — clothing, accessories, shopping phrases, and the great fashion houses." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Fashion</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La mode française — clothing vocab & haute couture culture</p>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'maisons', label: 'Fashion Houses' }, { id: 'phrases', label: 'Shopping Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {FASHION_VOCAB.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{FASHION_VOCAB[activeCategory].category}</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {FASHION_VOCAB[activeCategory].items.map(item => (
                  <div key={item.fr} className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-3 py-2">
                    <SpeakButton text={item.fr} size="sm" />
                    <span className="text-sm font-medium text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'maisons' && (
          <div className="space-y-4">
            {MAISONS.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cream-50 dark:bg-dark-warm-200 flex items-center justify-center text-2xl shrink-0">{m.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-gray-900 dark:text-cream-50">{m.name}</h3>
                    {m.founded && <span className="text-xs text-gray-400">founded {m.founded}</span>}
                  </div>
                  {m.founder && <p className="text-xs text-gray-400 mb-1">Founder: {m.founder}</p>}
                  <p className="text-sm text-gray-600 dark:text-gray-400">{m.signature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {USEFUL_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3">
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
