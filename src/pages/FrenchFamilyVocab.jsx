import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const FAMILY_SECTIONS = [
  {
    category: 'Immediate Family — La famille proche',
    emoji: '🏡',
    items: [
      { fr: 'les parents', en: 'parents (or: relatives / family members)', note: 'IMPORTANT: "parents" means both "parents" AND relatives in general. "Mes parents" = my mum and dad. "Je n\'ai pas de parents là-bas" = I have no relatives there.' },
      { fr: 'le père', en: 'father', note: 'Informal: "le papa". Formal/old: "le père de famille" = the head of the household.' },
      { fr: 'la mère', en: 'mother', note: 'Informal: "la maman". "La mère de famille" = mother of the household.' },
      { fr: 'le fils', en: 'son', note: '"Fils" is pronounced "feess" — the s is silent alone but audible in "fils unique". "Fils à papa" = a daddy\'s boy (pejorative).' },
      { fr: 'la fille', en: 'daughter', note: 'Also means "girl" — context determines which. "La fille de la boulangère" = the baker\'s daughter OR the baker\'s girl.' },
      { fr: 'le frère', en: 'brother', note: '"Le frère aîné" = older brother. "Le frère cadet" = younger brother.' },
      { fr: 'la sœur', en: 'sister', note: '"La sœur aînée" = older sister. "La sœur cadette" = younger sister.' },
      { fr: 'le mari', en: 'husband', note: '"Mon mari" is the standard. "Mon époux" = my husband (more formal). "Monsieur" in very formal contexts.' },
      { fr: 'la femme', en: 'wife', note: 'Also means "woman" — context required! "Ma femme" = my wife. "Une femme" = a woman. "Mon épouse" = my wife (formal).' },
      { fr: 'le/la partenaire', en: 'partner (in a relationship)', note: 'Gender-neutral — used for any long-term partner, same-sex or different-sex.' },
      { fr: 'le conjoint / la conjointe', en: 'spouse / partner (legal term)', note: 'Used in legal and official documents for any partner (married or PACSed).' },
      { fr: 'le compagnon / la compagne', en: 'life partner / companion', note: 'Used for long-term unmarried partners — more serious than petit(e) ami(e). Very common.' },
    ],
  },
  {
    category: 'Extended Family — La famille étendue',
    emoji: '👨‍👩‍👦‍👦',
    items: [
      { fr: 'le grand-père', en: 'grandfather', note: 'Informal: "le papi" or "le papy". "Papy gâteau" = an indulgent grandfather (lit. "cake grandad").' },
      { fr: 'la grand-mère', en: 'grandmother', note: 'Informal: "la mamie" or "la mémé". "Mamie" is warm and affectionate.' },
      { fr: 'les grands-parents', en: 'grandparents', note: '"Mes grands-parents maternels" = maternal grandparents. "Paternels" = paternal.' },
      { fr: 'le petit-fils', en: 'grandson', note: '"Petit" here means descendant, not small. "Mon petit-fils" = my grandson.' },
      { fr: 'la petite-fille', en: 'granddaughter', note: 'Same — "petite" = descendant. "Les petits-enfants" = grandchildren.' },
      { fr: 'l\'oncle', en: 'uncle', note: '"Mon oncle maternel" = my maternal uncle. Jules Verne\'s "Voyage au centre de la terre" starts with an eccentric uncle.' },
      { fr: 'la tante', en: 'aunt', note: '"Ma tante" = my aunt. "Tante" is also slang for a gay man in informal/older French.' },
      { fr: 'le neveu', en: 'nephew', note: '"Un neveu" / "des neveux" (pl). "Mon neveu préféré" = my favourite nephew.' },
      { fr: 'la nièce', en: 'niece', note: '"Ma nièce" / "mes nièces" (pl).' },
      { fr: 'le cousin', en: 'male cousin', note: '"Mon cousin germain" = first cousin (lit. full cousin). "Un cousin éloigné" = a distant cousin.' },
      { fr: 'la cousine', en: 'female cousin', note: '"Ma cousine germaine" = first cousin (f). Also: "cousins par alliance" = cousins by marriage.' },
      { fr: 'le parrain / la marraine', en: 'godfather / godmother', note: '"Le filleul / la filleule" = godson / goddaughter. The godparent role (le parrainage) remains important in French Catholic families.' },
    ],
  },
  {
    category: 'In-Laws & Step Family — La belle-famille et la famille recomposée',
    emoji: '🤝',
    items: [
      { fr: 'le beau-père', en: 'father-in-law OR stepfather', note: 'Context determines meaning! "Mon beau-père" = the father of my spouse OR the man who married my mother.' },
      { fr: 'la belle-mère', en: 'mother-in-law OR stepmother', note: '"La belle-mère" appears in Cinderella — "la marâtre" is the fairytale equivalent. The dual meaning is confusing but standard.' },
      { fr: 'le beau-frère', en: 'brother-in-law', note: 'The spouse\'s brother, OR the husband of your sibling.' },
      { fr: 'la belle-sœur', en: 'sister-in-law', note: 'The spouse\'s sister, OR the wife of your sibling.' },
      { fr: 'le beau-fils', en: 'son-in-law OR stepson', note: 'Again, dual meaning by context. "Mon gendre" = my son-in-law (specific, no ambiguity).' },
      { fr: 'la belle-fille', en: 'daughter-in-law OR stepdaughter', note: '"Ma bru" = my daughter-in-law (specific, regional — used in Quebec and southern France).' },
      { fr: 'le demi-frère', en: 'half-brother OR stepbrother', note: '"Demi" = half. Children of the same mother or same father but different parents.' },
      { fr: 'la demi-sœur', en: 'half-sister OR stepsister', note: 'Same — "demi" indicates shared parent.' },
      { fr: 'les beaux-parents', en: 'in-laws OR step-parents', note: '"Belle-famille" = in-laws collectively. "Famille recomposée" = blended family.' },
    ],
  },
  {
    category: 'Describing Family — Parler de la famille',
    emoji: '📝',
    items: [
      { fr: 'être fils / fille unique', en: 'to be an only child', note: 'About 20% of French children are only children — higher in urban areas.' },
      { fr: 'l\'aîné(e)', en: 'the eldest (child)', note: '"Le droit d\'aînesse" = primogeniture (right of the firstborn) — historically important in France.' },
      { fr: 'le/la cadet(te)', en: 'the younger (of two)', note: '"Le cadet" = the younger of two siblings, or more broadly the youngest of several.' },
      { fr: 'le benjamin / la benjamine', en: 'the youngest child (of three or more)', note: 'From the Biblical name Benjamin — Jacob\'s youngest son. A rich cultural reference.' },
      { fr: 'les jumeaux / les jumelles', en: 'twins (masculine / feminine)', note: '"Des faux jumeaux" = fraternal twins. "Des vrais jumeaux" = identical twins.' },
      { fr: 'une famille nombreuse', en: 'a large family (3+ children)', note: 'France defines "famille nombreuse" as 3+ children — families get transport discounts, tax benefits. France has one of Europe\'s highest birth rates.' },
      { fr: 'une famille monoparentale', en: 'a single-parent family', note: 'Very common — around 20% of French families. "Un parent isolé" = a lone parent.' },
      { fr: 'une famille recomposée', en: 'a blended family', note: '"Recomposée" = recomposed/blended. Very common term as divorce rates rose.' },
      { fr: 'élever ses enfants', en: 'to raise / bring up one\'s children', note: '"L\'éducation des enfants" = child-rearing. "Élever" = to raise up — implies moral and educational formation.' },
      { fr: 'adopter un enfant', en: 'to adopt a child', note: '"L\'adoption" is well-established in France. France has international adoption agreements with several countries.' },
    ],
  },
]

const FAMILY_PHRASES = [
  { fr: 'J\'ai une grande famille — on se retrouve souvent.', en: 'I have a large family — we get together often.' },
  { fr: 'Je suis fils / fille unique — j\'ai grandi sans frères ni sœurs.', en: 'I\'m an only child — I grew up without brothers or sisters.' },
  { fr: 'J\'ai deux frères, une sœur, et de nombreux cousins.', en: 'I have two brothers, one sister, and many cousins.' },
  { fr: 'Mes grands-parents habitent en Bretagne — on leur rend visite en été.', en: 'My grandparents live in Brittany — we visit them in summer.' },
  { fr: 'Je ressemble beaucoup à ma mère, mais j\'ai le caractère de mon père.', en: 'I look a lot like my mother, but I have my father\'s personality.', note: '"Ressembler à" = to resemble/look like.' },
  { fr: 'On se retrouve en famille à Noël et à Pâques.', en: 'We get together as a family at Christmas and at Easter.', note: 'French family gatherings at Christmas and Easter are culturally important — long meals, multiple generations.' },
  { fr: 'Elle attend un enfant pour le mois de juin.', en: 'She\'s expecting a child in June.', note: '"Attendre un enfant" = to be expecting a child. "Être enceinte" = to be pregnant.' },
  { fr: 'Il est marié avec deux enfants et vit en banlieue parisienne.', en: 'He\'s married with two children and lives in the Paris suburbs.' },
  { fr: 'Mes parents sont divorcés depuis que j\'avais dix ans.', en: 'My parents have been divorced since I was ten.', note: '"Depuis que" + past tense = since when (an event happened).' },
  { fr: 'Je m\'entends très bien avec mon frère — on est très proches.', en: 'I get on very well with my brother — we\'re very close.', note: '"Être proches" = to be close. "Être soudés" = to be tight-knit.' },
  { fr: 'La famille, c\'est tout pour moi.', en: 'Family is everything to me.', note: '"C\'est tout" = that\'s everything. A deeply felt sentiment in French culture.' },
]

const FAMILY_CULTURE = [
  { emoji: '🥗', title: 'Le repas de famille', detail: 'The family meal (le repas de famille) is sacred in France. Sunday lunch ("le déjeuner du dimanche") is a multi-course, multi-generational event lasting 2–4 hours. Grandparents, parents, children and cousins gather — often at the grandparents\' home. Cooking for the family is an act of love. The decline of the family meal is mourned as a cultural loss.' },
  { emoji: '👶', title: 'French family policy and birth rate', detail: 'France has one of Europe\'s highest birth rates (around 1.8 children per woman) thanks to generous family policy: 16 weeks paid maternity leave (extended for second+ children), universal childcare (crèches), family allowances, and substantial tax breaks for large families. France sees family support as essential to national demographic health.' },
  { emoji: '🤝', title: 'Les solidarités familiales', detail: 'Family solidarity is taken seriously in France. Adult children are legally obligated to contribute to elderly parents\' care costs ("l\'obligation alimentaire"). Grandparents play a major childcare role. The concept of "l\'entraide familiale" (family mutual aid) — helping with childcare, money during studies, or housing — is culturally expected.' },
  { emoji: '🏡', title: 'La maison de famille', detail: 'Many French families maintain a "maison de famille" — a family house (often grandparents\') that serves as the gathering point for summers, holidays, and celebrations. The sale of a maison de famille can be deeply traumatic — it represents the dissolution of a family\'s shared memory and identity.' },
]

export default function FrenchFamilyVocab() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Family Vocabulary | SayBonjour!" description="French family vocabulary — immediate family, in-laws, extended family, phrases, and French family culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Family in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La famille — immediate family, relatives, phrases, and French family culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Family Words' },
            { id: 'phrases', label: 'Phrases' },
            { id: 'culture', label: 'Family Culture' },
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
              {FAMILY_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {FAMILY_SECTIONS[activeCategory].items.map((item, i) => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {FAMILY_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={phrase.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{phrase.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phrase.en}</p>
                  {phrase.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {phrase.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {FAMILY_CULTURE.map((item, i) => (
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
