import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Key, Wrench } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'

const HOUSING_SECTIONS = [
  {
    category: 'Types of Housing — Les types de logement',
    items: [
      { fr: 'un appartement', en: 'a flat / apartment', note: '"Un appart" (informal)' },
      { fr: 'une maison', en: 'a house' },
      { fr: 'une maison individuelle', en: 'a detached house' },
      { fr: 'une maison mitoyenne', en: 'a semi-detached / terraced house' },
      { fr: 'un studio', en: 'a studio flat / bedsit' },
      { fr: 'un deux-pièces / un F2', en: 'a one-bedroom flat', note: 'French system counts total rooms (not bedrooms)' },
      { fr: 'un trois-pièces / un F3', en: 'a two-bedroom flat' },
      { fr: 'un duplex', en: 'a duplex (two-floor flat)' },
      { fr: 'un loft', en: 'a loft / open-plan conversion' },
      { fr: 'une résidence', en: 'a residential building / complex' },
      { fr: 'une HLM', en: 'social housing (low-rent flat)', note: 'Habitation à Loyer Modéré — France\'s council housing' },
    ],
  },
  {
    category: 'Rooms — Les pièces',
    items: [
      { fr: 'le salon', en: 'the living room', note: 'Also: "la salle de séjour"' },
      { fr: 'la salle à manger', en: 'the dining room' },
      { fr: 'la cuisine', en: 'the kitchen' },
      { fr: 'la chambre', en: 'the bedroom' },
      { fr: 'la salle de bains', en: 'the bathroom' },
      { fr: 'les toilettes / le WC', en: 'the toilet', note: 'In France, toilets are often separate from the bathroom' },
      { fr: 'l\'entrée / le couloir', en: 'entrance hall / corridor' },
      { fr: 'le bureau', en: 'home office / study' },
      { fr: 'le grenier', en: 'attic' },
      { fr: 'la cave', en: 'cellar / basement', note: 'Many French buildings have individual cave storage' },
      { fr: 'le balcon', en: 'balcony' },
      { fr: 'la terrasse', en: 'terrace' },
      { fr: 'le jardin', en: 'garden' },
      { fr: 'le garage', en: 'garage' },
    ],
  },
  {
    category: 'Renting — La location',
    items: [
      { fr: 'louer', en: 'to rent', note: '"Louer" can mean both to rent out AND to rent. Context makes it clear.' },
      { fr: 'un locataire', en: 'a tenant' },
      { fr: 'un propriétaire / un bailleur', en: 'a landlord / owner' },
      { fr: 'le loyer', en: 'rent' },
      { fr: 'les charges', en: 'service charges / utilities', note: 'Rent often shown as "loyer + charges"' },
      { fr: 'la caution', en: 'security deposit', note: 'Usually 1–2 months\' rent in France' },
      { fr: 'un bail', en: 'a lease / tenancy agreement' },
      { fr: 'un état des lieux', en: 'a property inspection report', note: 'Required at check-in and check-out in France' },
      { fr: 'un garant', en: 'a guarantor', note: 'Required by most French landlords, especially for students' },
      { fr: 'une agence immobilière', en: 'an estate agency', note: 'Also helps with rentals' },
      { fr: 'les frais d\'agence', en: 'agency fees', note: 'Limited by law (loi Alur) in France' },
    ],
  },
  {
    category: 'Home & DIY — La maison et le bricolage',
    items: [
      { fr: 'les meubles', en: 'furniture' },
      { fr: 'meublé(e) / non-meublé(e)', en: 'furnished / unfurnished' },
      { fr: 'rénover', en: 'to renovate' },
      { fr: 'bricoler', en: 'to do DIY', note: '"Le bricolage" is a major French hobby — Mr Bricolage is a major DIY chain' },
      { fr: 'peindre', en: 'to paint' },
      { fr: 'la peinture', en: 'paint / painting' },
      { fr: 'un robinet', en: 'a tap' },
      { fr: 'le chauffage', en: 'heating' },
      { fr: 'la chaudière', en: 'boiler' },
      { fr: 'les charges comprises', en: 'bills included', note: '"CC" in French housing listings' },
    ],
  },
]

const HOUSING_PHRASES = [
  { fr: 'Je cherche un appartement à louer dans le centre-ville.', en: 'I\'m looking for a flat to rent in the city centre.' },
  { fr: 'Le loyer est de combien par mois ?', en: 'How much is the rent per month?' },
  { fr: 'Est-ce que les charges sont comprises ?', en: 'Are utilities included?' },
  { fr: 'L\'appartement est meublé ?', en: 'Is the flat furnished?' },
  { fr: 'Je souhaite visiter le logement.', en: 'I\'d like to visit the property.' },
  { fr: 'Le bail est pour combien de temps ?', en: 'How long is the lease?' },
  { fr: 'Il faut un garant pour louer.', en: 'A guarantor is required to rent.' },
  { fr: 'Le chauffage est en panne.', en: 'The heating has broken down.' },
  { fr: 'Je donne mon préavis pour la fin du mois.', en: 'I\'m giving my notice for the end of the month.' },
]

export default function FrenchHousing() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Housing Vocabulary | SayBonjour!" description="Learn French housing vocabulary — types of homes, rooms, renting terms, and housing phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Housing in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le logement — types of housing, rooms, and renting vocabulary</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[{ id: 'vocab', label: 'Vocabulary' }, { id: 'phrases', label: 'Phrases' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {HOUSING_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => setActiveCategory(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-4">{HOUSING_SECTIONS[activeCategory].category}</h2>
              <div className="space-y-3">
                {HOUSING_SECTIONS[activeCategory].items.map(item => (
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
            {HOUSING_PHRASES.map((phrase, i) => (
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
