import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, ChevronDown, ChevronUp } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ARTWORKS = [
  {
    title: 'La Liberté guidant le peuple',
    en: 'Liberty Leading the People',
    artist: 'Eugène Delacroix',
    year: 1830,
    movement: 'Romantisme',
    location: 'Musée du Louvre, Paris',
    description: 'Painted to commemorate the July Revolution of 1830, this iconic work shows the allegorical figure of Liberty — bare-breasted, wearing a Phrygian cap — leading the people over fallen bodies, clutching a musket and the French tricolour. The small boy with pistols on the right is thought to have inspired Gavroche in Les Misérables.',
    vocabulary: [
      { fr: 'la liberté', en: 'liberty / freedom' },
      { fr: 'le drapeau', en: 'the flag' },
      { fr: 'la révolution', en: 'the revolution' },
      { fr: 'le peuple', en: 'the people' },
      { fr: 'une allégorie', en: 'an allegory' },
    ],
    whyLearn: 'Used on French currency, stamps, and the Marianne effigy — one of the most recognisable symbols of France. Appears on French postage stamps and coin designs. Great for discussing history and politics in French.',
    emoji: '🗽',
  },
  {
    title: 'Impression, soleil levant',
    en: 'Impression, Sunrise',
    artist: 'Claude Monet',
    year: 1872,
    movement: 'Impressionnisme',
    location: 'Musée Marmottan Monet, Paris',
    description: 'This small (48×63cm) painting of Le Havre harbour gave the entire Impressionist movement its name. When critic Louis Leroy mocked it in the satirical journal Le Charivari (1874) as merely "une impression", the artists adopted the name as a badge of pride. Monet\'s loose brushwork and focus on light over form transformed Western art.',
    vocabulary: [
      { fr: 'l\'impression', en: 'impression' },
      { fr: 'le soleil levant', en: 'the rising sun' },
      { fr: 'le port', en: 'the harbour' },
      { fr: 'la lumière', en: 'the light' },
      { fr: 'la touche', en: 'the brushstroke' },
    ],
    whyLearn: 'The painting that named Impressionism — understanding this helps unlock French cultural history and art criticism vocabulary (critique d\'art, coup de pinceau, lumière, atmosphère).',
    emoji: '🌅',
  },
  {
    title: 'Le Déjeuner sur l\'herbe',
    en: 'Luncheon on the Grass',
    artist: 'Édouard Manet',
    year: 1863,
    movement: 'Réalisme / Précurseur de l\'Impressionnisme',
    location: 'Musée d\'Orsay, Paris',
    description: 'Rejected from the official Salon of 1863, this controversial painting of a nude woman picnicking with fully dressed men was exhibited at the Salon des Refusés (Salon of the Rejected) — itself a key moment in art history. The woman\'s direct gaze at the viewer was considered shocking. It launched Manet as the great revolutionary of modern art.',
    vocabulary: [
      { fr: 'le déjeuner', en: 'lunch' },
      { fr: 'l\'herbe', en: 'the grass' },
      { fr: 'le scandale', en: 'the scandal' },
      { fr: 'le tableau', en: 'the painting' },
      { fr: 'le Salon des Refusés', en: 'Salon of the Rejected (1863 exhibition)' },
    ],
    whyLearn: 'Introduces art criticism vocabulary in French: choquant (shocking), provocateur, le nu (the nude), le regard direct (the direct gaze). Essential for discussing art history in French.',
    emoji: '🌿',
  },
  {
    title: 'Un dimanche après-midi à l\'Île de la Grande Jatte',
    en: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    year: 1886,
    movement: 'Pointillisme / Néo-impressionnisme',
    location: 'Art Institute of Chicago',
    description: 'A masterpiece of Pointillism — Seurat applied thousands of tiny dots of pure colour that the eye mixes optically into a scene of Parisians relaxing on an island in the Seine. He called his technique "chromoluminism" or "divisionism". Took two years to complete, with numerous preparatory studies.',
    vocabulary: [
      { fr: 'le pointillisme', en: 'pointillism' },
      { fr: 'le point / la touche', en: 'dot / brushstroke' },
      { fr: 'les couleurs complémentaires', en: 'complementary colours' },
      { fr: 'la technique', en: 'technique / method' },
      { fr: 'le divisionnisme', en: 'divisionism (Seurat\'s own term)' },
    ],
    whyLearn: 'Perfect for learning art technique vocabulary: la composition, les couleurs complémentaires, la lumière artificielle. Also inspires discussion of Parisian leisure culture.',
    emoji: '🔵',
  },
  {
    title: 'Les Nymphéas (Water Lilies series)',
    en: 'The Water Lilies',
    artist: 'Claude Monet',
    year: '1896–1926',
    movement: 'Impressionnisme tardif',
    location: 'Musée de l\'Orangerie, Paris',
    description: 'Monet\'s greatest late achievement — a series of approximately 250 paintings of his garden at Giverny. The eight enormous canvases in the Musée de l\'Orangerie form an immersive panorama — Monet called them "an aqueous mirror of the world". Created while going blind, they prefigure Abstract Expressionism by decades.',
    vocabulary: [
      { fr: 'un nymphéa', en: 'a water lily' },
      { fr: 'le reflet', en: 'the reflection' },
      { fr: 'le jardin', en: 'the garden' },
      { fr: 'l\'étang', en: 'the pond' },
      { fr: 'la série', en: 'a series (of paintings)' },
    ],
    whyLearn: 'Giverny (Normandy) is one of France\'s most visited sites — learning about Les Nymphéas opens rich vocabulary for discussing gardens, seasons, light, and impressionist technique.',
    emoji: '🌸',
  },
  {
    title: 'Les Demoiselles d\'Avignon',
    en: 'The Young Ladies of Avignon',
    artist: 'Pablo Picasso',
    year: 1907,
    movement: 'Cubisme (proto)',
    location: 'MoMA, New York',
    description: 'Though Picasso was Spanish, he created this groundbreaking work in Paris. It shattered the conventions of Western painting — fractured forms, multiple perspectives simultaneously, African mask influences. Even Picasso\'s friends (Braque, Matisse) were disturbed by it. It launched Cubism and became the most analysed painting in history.',
    vocabulary: [
      { fr: 'le cubisme', en: 'cubism' },
      { fr: 'fragmenté(e)', en: 'fragmented' },
      { fr: 'révolutionnaire', en: 'revolutionary' },
      { fr: 'la perspective multiple', en: 'multiple perspective' },
      { fr: 'l\'avant-garde', en: 'the avant-garde' },
    ],
    whyLearn: 'Paris was the birthplace of Cubism — this painting introduces the vocabulary of avant-garde art movements in French. Picasso lived and worked in Paris for most of his life.',
    emoji: '🎭',
  },
  {
    title: 'La Mariée mise à nu par ses célibataires, même (Le Grand Verre)',
    en: 'The Bride Stripped Bare by Her Bachelors, Even (The Large Glass)',
    artist: 'Marcel Duchamp',
    year: '1915–1923',
    movement: 'Dadaïsme / Art conceptuel',
    location: 'Philadelphia Museum of Art',
    description: 'Duchamp worked on this for 8 years, then left it "definitively unfinished". When it shattered in transport, Duchamp incorporated the cracks into the work. His "readymades" (like the famous urinal "Fontaine", 1917) challenged the very definition of art — "Is art whatever an artist declares to be art?" The most influential question in 20th-century art.',
    vocabulary: [
      { fr: 'l\'art conceptuel', en: 'conceptual art' },
      { fr: 'un ready-made', en: 'a readymade (everyday object as artwork)' },
      { fr: 'le dadaïsme', en: 'Dadaism (anti-art movement born of WWI)' },
      { fr: 'la provocation', en: 'provocation' },
      { fr: 'définitivement inachevé', en: 'definitively unfinished (Duchamp\'s term)' },
    ],
    whyLearn: 'Duchamp is the father of conceptual art — understanding his work unlocks the vocabulary of modern and contemporary art criticism in French.',
    emoji: '🪟',
  },
]

const ART_VOCAB = [
  { fr: 'un tableau', en: 'a painting / picture (on canvas or board)' },
  { fr: 'une toile', en: 'a canvas / a painting', note: '"Une toile de maître" = a masterwork' },
  { fr: 'une aquarelle', en: 'a watercolour painting' },
  { fr: 'une fresque', en: 'a fresco (wall painting)', note: 'Notre-Dame de la Garde (Marseille) has famous interior frescoes' },
  { fr: 'une gravure', en: 'an engraving / print' },
  { fr: 'une sculpture', en: 'a sculpture' },
  { fr: 'un dessin', en: 'a drawing / sketch' },
  { fr: 'un musée', en: 'a museum', note: 'Le Louvre, Le Musée d\'Orsay, Le Centre Pompidou, Musée Picasso…' },
  { fr: 'une galerie', en: 'an art gallery' },
  { fr: 'un peintre / une peintre', en: 'a painter' },
  { fr: 'un sculpteur / une sculptrice', en: 'a sculptor' },
  { fr: 'une œuvre d\'art', en: 'a work of art' },
  { fr: 'un chef-d\'œuvre', en: 'a masterpiece', note: '"Chef-d\'œuvre" = lit. "master work" — originally the piece a craftsman made to gain mastership' },
  { fr: 'un pinceau', en: 'a paintbrush', note: '"Un coup de pinceau" = a brushstroke' },
  { fr: 'la toile de fond', en: 'the background (of a painting)', note: 'Also used metaphorically: "la toile de fond politique" = the political backdrop' },
  { fr: 'le premier plan', en: 'the foreground', note: '"Au premier plan" = in the foreground; "à l\'arrière-plan" = in the background' },
  { fr: 'les couleurs vives', en: 'bright / vivid colours', note: '"Les fauves" (wild beasts) — Matisse\'s movement — used the most vivid colours in art history' },
  { fr: 'les tons pastels', en: 'pastel tones' },
  { fr: 'la composition', en: 'the composition / arrangement', note: '"La règle des tiers" = the rule of thirds' },
  { fr: 'la perspective', en: 'perspective', note: '"La perspective aérienne" = aerial perspective (receding colour and detail with distance)' },
  { fr: 'le clair-obscur', en: 'chiaroscuro (light and shadow contrast)', note: 'Rembrandt and Caravaggio perfected it; French artists studied it at the Académie' },
  { fr: 'la nature morte', en: 'a still life (painting)', note: 'Lit. "dead nature" — the genre of fruit bowls, flowers, skulls' },
  { fr: 'un autoportrait', en: 'a self-portrait', note: '"Un portrait" = any portrait; "autoportrait" = self-portrait' },
  { fr: 'un vernissage', en: 'a private view / opening night (of an exhibition)', note: 'Lit. "a varnishing" — artists used to varnish their paintings on the day before the Salon opened' },
]

const MUSEUMS = [
  { name: 'Le Louvre', city: 'Paris', desc: 'The world\'s most visited museum (9 million visitors/year). Houses the Mona Lisa (La Joconde), Venus de Milo, Winged Victory. Originally a medieval fortress, rebuilt as a royal palace, became a museum in 1793 during the Revolution.', emoji: '🔺' },
  { name: 'Musée d\'Orsay', city: 'Paris', desc: 'In a converted Beaux-Arts railway station (Gare d\'Orsay). The world\'s finest collection of Impressionist and Post-Impressionist art — Monet, Renoir, Degas, Manet, Cézanne, Van Gogh, Seurat. Must-visit.', emoji: '🚉' },
  { name: 'Centre Pompidou', city: 'Paris', desc: 'The "inside-out building" — designed by Renzo Piano and Richard Rogers (1977) with coloured pipes and services on the exterior. Houses France\'s national collection of modern and contemporary art (Kandinsky, Matisse, Picasso).', emoji: '🎨' },
  { name: 'Musée de l\'Orangerie', city: 'Paris', desc: 'Purpose-built to house Monet\'s eight enormous Water Lilies canvases in two oval rooms — one of the great immersive art experiences in the world. Also houses the Walter-Guillaume collection.', emoji: '🌸' },
  { name: 'Musée Picasso', city: 'Paris', desc: 'In the Hôtel Salé, Marais district. Contains over 5,000 works by Picasso — paintings, sculptures, ceramics, drawings. The state accepted them from his estate in lieu of inheritance tax.', emoji: '🎭' },
  { name: 'Fondation Maeght', city: 'Saint-Paul-de-Vence', desc: 'A modernist building in Provence housing works by Miró, Giacometti, Braque, Chagall, and Calder. Set in a beautiful Mediterranean garden. One of the world\'s finest private modern art foundations.', emoji: '🌿' },
]

export default function FrenchArt() {
  const [expanded, setExpanded] = useState(null)
  const [tab, setTab] = useState('artworks')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Art & Culture | SayBonjour!" description="Explore famous French artworks, artists, movements, art vocabulary, and France's greatest museums." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Art & Culture</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L'art français — masterpieces, vocabulary, and France's great museums</p>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { id: 'artworks', label: 'Famous Works' },
            { id: 'vocab', label: 'Art Vocabulary' },
            { id: 'museums', label: 'Museums of France' },
          ].map(t => (
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
                <motion.div key={art.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 overflow-hidden">
                  <button onClick={() => { setExpanded(isOpen ? null : art.title); if (!isOpen) addXP(5, 'vocabulary') }}
                    className="w-full text-left px-6 py-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center text-3xl shrink-0">
                      {art.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h2 className="font-bold text-gray-900 dark:text-cream-50 font-playfair italic">{art.title}</h2>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{art.artist} · {art.year} · <span className="italic">{art.movement}</span></p>
                    </div>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-warm-200 pt-4 space-y-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{art.description}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1"><Palette size={12} /> {art.location}</p>

                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key vocabulary from this artwork</p>
                            <div className="flex flex-wrap gap-2">
                              {art.vocabulary.map(v => (
                                <div key={v.fr} className="flex items-center gap-1.5 bg-cream-50 dark:bg-dark-warm-200 border border-gray-100 dark:border-dark-warm-50 rounded-lg px-3 py-1.5"
                                  onClick={() => addXP(2, 'vocabulary')}>
                                  <SpeakButton text={v.fr} size="sm" />
                                  <span className="text-sm text-burgundy-700 dark:text-burgundy-vibrant-300 font-medium">{v.fr}</span>
                                  <span className="text-gray-400 text-xs">— {v.en}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3 text-sm">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Why study with this artwork?</p>
                            <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed">{art.whyLearn}</p>
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
            <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-5">Essential art vocabulary — Le vocabulaire de l'art</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ART_VOCAB.map(v => (
                <div key={v.fr} className="flex items-start gap-2 bg-cream-50 dark:bg-dark-warm-200 rounded-xl px-4 py-3"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={v.fr} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{v.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{v.en}</p>
                    {v.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{v.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'museums' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">France has over 1,200 museums — more per capita than almost any country. Here are the essential ones for French cultural literacy.</p>
            {MUSEUMS.map((museum, i) => (
              <motion.div key={museum.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{museum.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SpeakButton text={museum.name} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{museum.name}</h3>
                    <span className="text-xs text-gray-400 font-mono">{museum.city}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{museum.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
