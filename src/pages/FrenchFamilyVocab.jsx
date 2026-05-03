import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const FAMILY_SECTIONS = [
  {
    category: 'Immediate Family — La famille proche',
    items: [
      { fr: 'les parents', en: 'parents (or: relatives)', note: '"Parents" means both parents AND relatives — be careful!' },
      { fr: 'le père', en: 'father', note: 'Informal: le papa' },
      { fr: 'la mère', en: 'mother', note: 'Informal: la maman' },
      { fr: 'le fils', en: 'son', note: 'Pronounced "feess" — the s is silent in isolation but heard in "fils unique"' },
      { fr: 'la fille', en: 'daughter', note: 'Also means "girl"' },
      { fr: 'le frère', en: 'brother' },
      { fr: 'la sœur', en: 'sister' },
      { fr: 'le mari', en: 'husband' },
      { fr: 'la femme', en: 'wife', note: 'Also means "woman"!' },
      { fr: 'le/la partenaire', en: 'partner' },
      { fr: 'le conjoint / la conjointe', en: 'spouse / partner (formal)' },
    ],
  },
  {
    category: 'Extended Family — La famille étendue',
    items: [
      { fr: 'le grand-père', en: 'grandfather', note: 'Informal: le papi / le papy' },
      { fr: 'la grand-mère', en: 'grandmother', note: 'Informal: la mamie / la mémé' },
      { fr: 'les grands-parents', en: 'grandparents' },
      { fr: 'le petit-fils', en: 'grandson' },
      { fr: 'la petite-fille', en: 'granddaughter' },
      { fr: 'l\'oncle', en: 'uncle' },
      { fr: 'la tante', en: 'aunt' },
      { fr: 'le neveu', en: 'nephew' },
      { fr: 'la nièce', en: 'niece' },
      { fr: 'le cousin', en: 'male cousin' },
      { fr: 'la cousine', en: 'female cousin' },
    ],
  },
  {
    category: 'In-Laws & Step Family — La belle-famille et la famille recomposée',
    items: [
      { fr: 'le beau-père', en: 'father-in-law OR stepfather', note: 'Context determines which!' },
      { fr: 'la belle-mère', en: 'mother-in-law OR stepmother', note: 'Context determines which!' },
      { fr: 'le beau-frère', en: 'brother-in-law' },
      { fr: 'la belle-sœur', en: 'sister-in-law' },
      { fr: 'le beau-fils', en: 'son-in-law OR stepson' },
      { fr: 'la belle-fille', en: 'daughter-in-law OR stepdaughter' },
      { fr: 'le demi-frère', en: 'half-brother OR stepbrother' },
      { fr: 'la demi-sœur', en: 'half-sister OR stepsister' },
      { fr: 'les beaux-parents', en: 'in-laws OR step-parents' },
    ],
  },
  {
    category: 'Describing Family — Parler de la famille',
    items: [
      { fr: 'être fils/fille unique', en: 'to be an only child' },
      { fr: 'l\'aîné(e)', en: 'the eldest' },
      { fr: 'le/la cadet(te)', en: 'the youngest (of two) / younger sibling' },
      { fr: 'le benjamin / la benjamine', en: 'the youngest (of three or more)' },
      { fr: 'les jumeaux / les jumelles', en: 'twins (m/f)' },
      { fr: 'une famille nombreuse', en: 'a large family' },
      { fr: 'une famille monoparentale', en: 'a single-parent family' },
      { fr: 'une famille recomposée', en: 'a blended family' },
      { fr: 'élever', en: 'to raise / bring up (children)' },
      { fr: 'adopter', en: 'to adopt' },
    ],
  },
]

const FAMILY_PHRASES = [
  { fr: 'J\'ai une grande famille.', en: 'I have a large family.' },
  { fr: 'Je suis fils / fille unique.', en: 'I\'m an only child.' },
  { fr: 'J\'ai deux frères et une sœur.', en: 'I have two brothers and one sister.' },
  { fr: 'Mes grands-parents habitent en Bretagne.', en: 'My grandparents live in Brittany.' },
  { fr: 'Je ressemble à ma mère.', en: 'I look like my mother.' },
  { fr: 'On se retrouve en famille à Noël.', en: 'We get together as a family at Christmas.' },
  { fr: 'Elle attend un enfant.', en: 'She\'s expecting a child.' },
  { fr: 'Il est marié avec deux enfants.', en: 'He\'s married with two children.' },
  { fr: 'Mes parents sont divorcés.', en: 'My parents are divorced.' },
  { fr: 'Je m\'entends bien avec mon frère.', en: 'I get on well with my brother.' },
]

export default function FrenchFamilyVocab() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Family Vocabulary | SayBonjour!" description="Learn French family vocabulary — immediate family, in-laws, extended family with phrases and notes." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Family in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La famille — immediate family, relatives and talking about family</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Family Words' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {FAMILY_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{FAMILY_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {FAMILY_SECTIONS[activeCategory].items.map(item => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {FAMILY_PHRASES.map((phrase, i) => (
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
