import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const ARTWORKS = [
  {
    title: 'La Liberté guidant le peuple',
    en: 'Liberty Leading the People',
    artist: 'Eugène Delacroix',
    year: 1830,
    movement: 'Romantisme',
    location: 'Musée du Louvre, Paris',
    description: 'Painted to commemorate the July Revolution of 1830, this iconic work shows the allegorical figure of Liberty leading the people over fallen bodies, clutching a musket and the French tricolour.',
    vocabulary: [
      { fr: 'la liberté', en: 'liberty / freedom' },
      { fr: 'le drapeau', en: 'the flag' },
      { fr: 'la révolution', en: 'the revolution' },
      { fr: 'le peuple', en: 'the people' },
    ],
    whyLearn: 'Used on French currency and stamps — one of the most recognisable symbols of France. Great for discussing history and politics in French.',
    emoji: '🗽',
  },
  {
    title: 'Impression, soleil levant',
    en: 'Impression, Sunrise',
    artist: 'Claude Monet',
    year: 1872,
    movement: 'Impressionnisme',
    location: 'Musée Marmottan Monet, Paris',
    description: 'This small painting of Le Havre harbour gave the entire Impressionist movement its name. A critic used "Impression" mockingly — and it stuck. Monet\'s loose brushwork and focus on light transformed Western art.',
    vocabulary: [
      { fr: 'l\'impression', en: 'impression' },
      { fr: 'le soleil levant', en: 'the rising sun' },
      { fr: 'le port', en: 'the harbour' },
      { fr: 'la lumière', en: 'the light' },
    ],
    whyLearn: 'The painting that named Impressionism — understanding this helps unlock French cultural history and art criticism vocabulary.',
    emoji: '🌅',
  },
  {
    title: 'Le Déjeuner sur l\'herbe',
    en: 'Luncheon on the Grass',
    artist: 'Édouard Manet',
    year: 1863,
    movement: 'Réalisme / Précurseur de l\'Impressionnisme',
    location: 'Musée d\'Orsay, Paris',
    description: 'This scandalous painting depicting a nude woman picnicking with fully dressed men was rejected from the official Salon. It shocked Paris and launched Manet as a revolutionary figure in modern art.',
    vocabulary: [
      { fr: 'le déjeuner', en: 'lunch' },
      { fr: 'l\'herbe', en: 'the grass' },
      { fr: 'le scandale', en: 'the scandal' },
      { fr: 'le tableau', en: 'the painting' },
    ],
    whyLearn: 'Discussing this painting introduces art criticism vocabulary in French: shocking (choquant), provocateur, moderne, le nu (the nude).',
    emoji: '🌿',
  },
  {
    title: 'La Grande Jatte',
    en: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    year: 1886,
    movement: 'Pointillisme',
    location: 'Art Institute of Chicago',
    description: 'A masterpiece of Pointillism — Seurat applied thousands of tiny dots of pure colour to create this scene of Parisians relaxing on an island in the Seine. Took two years to complete.',
    vocabulary: [
      { fr: 'le pointillisme', en: 'pointillism' },
      { fr: 'le point', en: 'dot / point' },
      { fr: 'la couleur pure', en: 'pure colour' },
      { fr: 'la technique', en: 'technique / method' },
    ],
    whyLearn: 'Perfect for learning art technique vocabulary: la touche (brushstroke), la composition, les couleurs complémentaires.',
    emoji: '🔵',
  },
  {
    title: 'La Nuit étoilée',
    en: 'The Starry Night (Arles version)',
    artist: 'Vincent van Gogh',
    year: 1888,
    movement: 'Post-impressionnisme',
    location: 'Musée d\'Orsay, Paris',
    description: 'Though Dutch, Van Gogh lived and worked in Provence, France, and this period produced some of his greatest works. His time in Arles and Saint-Rémy deeply shaped French art history.',
    vocabulary: [
      { fr: 'étoilé(e)', en: 'starry' },
      { fr: 'la nuit', en: 'the night' },
      { fr: 'le tourbillon', en: 'the swirl / whirlpool' },
      { fr: 'le pinceau', en: 'the paintbrush' },
    ],
    whyLearn: 'Van Gogh is deeply associated with Provence — discussing his art introduces southern French vocabulary and landscape terms.',
    emoji: '⭐',
  },
  {
    title: 'Les Demoiselles d\'Avignon',
    en: 'The Young Ladies of Avignon',
    artist: 'Pablo Picasso',
    year: 1907,
    movement: 'Cubisme',
    location: 'MoMA, New York',
    description: 'Though Picasso was Spanish, he created this groundbreaking work in Paris. It shattered the conventions of Western painting and launched Cubism — one of the most influential movements in art history.',
    vocabulary: [
      { fr: 'le cubisme', en: 'cubism' },
      { fr: 'le cube', en: 'cube' },
      { fr: 'fragmenté(e)', en: 'fragmented' },
      { fr: 'révolutionnaire', en: 'revolutionary' },
    ],
    whyLearn: 'Paris was the birthplace of Cubism — this painting introduces the vocabulary of avant-garde art movements in French.',
    emoji: '🎭',
  },
]

const ART_VOCAB = [
  { fr: 'un tableau', en: 'a painting / picture' },
  { fr: 'une toile', en: 'a canvas / painting' },
  { fr: 'une aquarelle', en: 'a watercolour' },
  { fr: 'une sculpture', en: 'a sculpture' },
  { fr: 'un dessin', en: 'a drawing' },
  { fr: 'un musée', en: 'a museum' },
  { fr: 'une galerie', en: 'a gallery' },
  { fr: 'un peintre', en: 'a painter' },
  { fr: 'un sculpteur', en: 'a sculptor' },
  { fr: 'une œuvre d\'art', en: 'a work of art' },
  { fr: 'un chef-d\'œuvre', en: 'a masterpiece' },
  { fr: 'un pinceau', en: 'a paintbrush' },
  { fr: 'la toile de fond', en: 'the background' },
  { fr: 'le premier plan', en: 'the foreground' },
  { fr: 'les couleurs vives', en: 'bright / vivid colours' },
  { fr: 'les tons pastels', en: 'pastel tones' },
]

export default function FrenchArt() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('artworks')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Art & Culture | SayBonjour!" description="Explore famous French artworks, artists and movements with vocabulary and cultural context." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Art & Culture</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'art français — masterpieces that shaped the world</p>
        </div>

        <div className="flex gap-3 mb-8">
          {[{ id: 'artworks', label: 'Famous Works' }, { id: 'vocab', label: 'Art Vocabulary' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'artworks' && (
          <div className="space-y-4">
            {ARTWORKS.map((art, i) => {
              const isOpen = expanded === art.title
              return (
                <motion.div key={art.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => setExpanded(isOpen ? null : art.title)}
                    className="w-full text-left px-6 py-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center text-3xl shrink-0">
                      {art.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{art.title}</h2>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{art.artist} · {art.year} · <span className="italic">{art.movement}</span></p>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{art.description}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1"><Palette size={12} /> {art.location}</p>

                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key vocabulary from this artwork</p>
                            <div className="flex flex-wrap gap-2">
                              {art.vocabulary.map(v => (
                                <div key={v.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 border border-gray-100 dark:border-dark-warm-50 rounded-lg px-3 py-1.5">
                                  <SpeakButton text={v.fr} size="sm" />
                                  <span className="text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{v.fr}</span>
                                  <span className="text-gray-400 text-xs">— {v.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 text-sm">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Why study with this artwork?</p>
                            <p className="text-emerald-800 dark:text-emerald-300">{art.whyLearn}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}

        {tab === 'vocab' && (
          <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Essential art vocabulary</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ART_VOCAB.map(v => (
                <div key={v.fr} className="flex items-center gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3">
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
