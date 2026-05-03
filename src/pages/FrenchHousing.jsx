import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Key, Wrench } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const HOUSING_SECTIONS = [
  {
    category: 'Types of Housing — Les types de logement',
    emoji: '🏠',
    items: [
      { fr: 'un appartement', en: 'a flat / apartment', note: '"Un appart" = informal shortening. The majority of French urban dwellers live in apartments.' },
      { fr: 'une maison', en: 'a house', note: '"Une maison de ville" = a townhouse. "Une maison de campagne" = a country house.' },
      { fr: 'une maison individuelle', en: 'a detached house', note: '"Individuelle" = individual/standalone. Increasingly common in suburbs — and controversial for urban sprawl.' },
      { fr: 'une maison mitoyenne', en: 'a semi-detached or terraced house', note: '"Mitoyenne" = shared wall. Less common in France than in the UK.' },
      { fr: 'un studio', en: 'a studio flat / bedsit', note: 'A studio = one main room with a kitchenette and bathroom. Common for students and young workers.' },
      { fr: 'un deux-pièces / un F2', en: 'a one-bedroom flat', note: 'The French count TOTAL rooms (not bedrooms): un deux-pièces = living room + 1 bedroom. F2 = same classification.' },
      { fr: 'un trois-pièces / un F3', en: 'a two-bedroom flat', note: 'Living room + 2 bedrooms. The kitchen, bathroom and WC are not counted as "pièces".' },
      { fr: 'un duplex', en: 'a duplex (two-floor flat)', note: '"Un duplex" = a flat spread over two floors. "Un triplex" = three floors.' },
      { fr: 'un loft', en: 'a loft / open-plan conversion', note: 'Converted industrial spaces — popular in cities. "Un loft industriel" is highly sought after in Paris.' },
      { fr: 'une résidence', en: 'a residential building / complex', note: '"Une résidence principale" = primary residence. "Une résidence secondaire" = holiday/second home — France has 3.7 million.' },
      { fr: 'une HLM', en: 'social housing (low-rent flat)', note: '"Habitation à Loyer Modéré" — France\'s council housing. 5 million HLMs house 10 million people. Waiting lists can be years long.' },
      { fr: 'une maison de retraite / un EHPAD', en: 'a care home / retirement home', note: '"EHPAD" = Établissement d\'Hébergement pour Personnes Âgées Dépendantes. France has around 7,000 EHPADs.' },
    ],
  },
  {
    category: 'Rooms — Les pièces',
    emoji: '🚪',
    items: [
      { fr: 'le salon', en: 'the living room / lounge', note: 'Also: "la salle de séjour" = sitting room. "La salle de vie" = family room.' },
      { fr: 'la salle à manger', en: 'the dining room', note: 'Often combined with the salon in modern flats — "le séjour-salon".' },
      { fr: 'la cuisine', en: 'the kitchen', note: '"La cuisine américaine" = an open-plan kitchen. "La cuisine équipée" = fitted kitchen.' },
      { fr: 'la chambre (à coucher)', en: 'the bedroom', note: '"La chambre principale" = master bedroom. "La chambre d\'amis" = spare room / guest room.' },
      { fr: 'la salle de bains', en: 'the bathroom', note: 'Contains the bath and/or shower. In France, the toilet is often a separate room.' },
      { fr: 'les toilettes / le WC', en: 'the toilet / bathroom', note: '"Les WC" is pronounced "le vay-say". In France, toilets are very often separate from the bathroom — practical for large families.' },
      { fr: 'l\'entrée (f) / le couloir', en: 'entrance hall / corridor', note: '"L\'entrée" = the entrance hall. "Le couloir" = corridor. Important in French apartments — often contains storage.' },
      { fr: 'le bureau', en: 'home office / study', note: '"Faire du télétravail dans son bureau" = working from home in the study. Post-COVID, having a bureau is a major selling point.' },
      { fr: 'le grenier', en: 'attic', note: '"Un grenier" = attic (used for storage, or converted into a "chambre de bonne" = maid\'s room in Haussmanian buildings).' },
      { fr: 'la cave', en: 'cellar / basement', note: 'Many French apartment buildings have individual cave storage (un box) in the basement. Essential for wine storage.' },
      { fr: 'le balcon', en: 'balcony', note: '"Un balcon filant" = a running balcony. Balconies add significant value in French cities.' },
      { fr: 'la terrasse', en: 'terrace / deck', note: '"Une terrasse en plein air" = an outdoor terrace. "Une terrasse de café" = a café terrace (iconic French scene).' },
      { fr: 'le jardin', en: 'garden', note: '"Un jardin privatif" = a private garden (very valuable in cities). "Un potager" = a kitchen garden / vegetable plot.' },
    ],
  },
  {
    category: 'Renting — La location',
    emoji: '🔑',
    items: [
      { fr: 'louer', en: 'to rent', note: '"Louer" can mean both to rent out (as landlord) AND to rent (as tenant) — context makes it clear.' },
      { fr: 'un locataire', en: 'a tenant / renter', note: '"Le locataire" pays the rent. "Sous-louer" = to sublet (requires landlord permission in France).' },
      { fr: 'un propriétaire / un bailleur', en: 'a landlord / property owner', note: '"Propriétaire" = owner. "Bailleur" = landlord specifically in a rental context.' },
      { fr: 'le loyer', en: 'the rent', note: '"Payer le loyer" = to pay the rent. "Le loyer mensuel" = monthly rent. "Le loyer encadré" = rent-controlled (Paris and some cities).' },
      { fr: 'les charges', en: 'service charges / utilities', note: '"CC" = charges comprises (included). "HC" = hors charges (excluding charges). Always check what\'s included.' },
      { fr: 'la caution', en: 'security deposit', note: 'Usually 1 month\'s rent for unfurnished, 2 months for furnished. Must be returned within 1 month of departure.' },
      { fr: 'un bail', en: 'a lease / tenancy agreement', note: '"Un bail de 3 ans" (unfurnished) or "un bail de 1 an" (furnished). "Rompre le bail" = to break the lease.' },
      { fr: 'un état des lieux', en: 'a property inspection report', note: 'Done at check-in ("entrée") and check-out ("sortie") — compares the property condition. Disputes over "état des lieux" are very common.' },
      { fr: 'un garant', en: 'a guarantor', note: 'Required by most French landlords (especially for students). Must typically earn 3× the rent. "Visale" = French government guarantor scheme.' },
      { fr: 'une agence immobilière', en: 'an estate agency', note: '"L\'agent immobilier" = the estate agent. Fees ("honoraires") are capped by law since the Alur Law (2014).' },
      { fr: 'préavis', en: 'notice period', note: '"Donner son préavis" = to give notice. 3 months for unfurnished (can be reduced to 1 month in "zones tendues" = high-demand areas).' },
    ],
  },
  {
    category: 'Home & DIY — La maison et le bricolage',
    emoji: '🔧',
    items: [
      { fr: 'les meubles', en: 'furniture', note: '"Meublé(e)" = furnished. "Non-meublé(e)" = unfurnished. Furnished rentals include beds, tables, appliances.' },
      { fr: 'rénover', en: 'to renovate', note: '"Des travaux de rénovation" = renovation work. "Rénover une cuisine" = to renovate a kitchen. A major national hobby.' },
      { fr: 'bricoler', en: 'to do DIY / home improvement', note: '"Le bricolage" is a huge French passion. "Mr Bricolage" and "Leroy Merlin" are the dominant DIY chains.' },
      { fr: 'peindre', en: 'to paint', note: '"Peindre les murs" = to paint the walls. "La peinture" = paint OR painting (context determines). "Un pinceau" = a paintbrush.' },
      { fr: 'un robinet', en: 'a tap / faucet', note: '"Le robinet coule" = the tap is dripping. "Un robinet mélangeur" = a mixer tap.' },
      { fr: 'le chauffage', en: 'heating', note: '"Le chauffage central" = central heating. "Le chauffage au sol" = underfloor heating. "Le chauffage électrique" = electric heating.' },
      { fr: 'la chaudière', en: 'the boiler', note: '"La chaudière est en panne" = the boiler has broken down. "Changer la chaudière" = to replace the boiler.' },
      { fr: 'les charges comprises', en: 'bills included', note: '"CC" in listings. Important to check what "charges" covers — water, heating, gardening, lift maintenance.' },
      { fr: 'le DPE', en: 'Energy Performance Certificate', note: '"Diagnostic de Performance Énergétique" — rating A to G. New laws restrict renting of very low-rated ("passoires thermiques" = thermal sieves) properties.' },
      { fr: 'la copropriété', en: 'co-ownership / commonhold', note: 'Most French apartment buildings are "copropriétés" — shared ownership with a managing body ("syndic de copropriété").' },
    ],
  },
]

const HOUSING_PHRASES = [
  { fr: 'Je cherche un appartement à louer dans le centre-ville.', en: 'I\'m looking for a flat to rent in the city centre.', note: '"Chercher à louer" = looking to rent.' },
  { fr: 'Le loyer est de combien par mois, charges comprises ?', en: 'How much is the rent per month, charges included?', note: 'Always ask "charges comprises" — utilities vary a lot.' },
  { fr: 'Est-ce que les charges sont comprises dans le loyer ?', en: 'Are utilities included in the rent?', note: '"Comprises" = included. Critical question in France.' },
  { fr: 'L\'appartement est meublé ou non-meublé ?', en: 'Is the flat furnished or unfurnished?', note: 'Furnished = quicker to move in but more expensive. Unfurnished = cheaper, longer lease.' },
  { fr: 'Je souhaite visiter le logement — êtes-vous disponible ?', en: 'I\'d like to visit the property — are you available?', note: '"Le logement" = the accommodation/property. Formal way to request a viewing.' },
  { fr: 'Le bail est pour quelle durée ?', en: 'What is the duration of the lease?', note: '"Quelle durée ?" = what duration? Unfurnished = 3 years minimum. Furnished = 1 year.' },
  { fr: 'Il faut absolument un garant pour louer ici ?', en: 'Is a guarantor absolutely required to rent here?', note: 'Many landlords require a guarantor earning 3× the rent. "Visale" is a free government scheme.' },
  { fr: 'Le chauffage est en panne — pouvez-vous appeler le plombier ?', en: 'The heating has broken down — can you call the plumber?', note: '"Appeler le plombier" = call the plumber. "Le plombier" = plumber/heating engineer.' },
  { fr: 'Je donne mon préavis pour la fin du mois prochain.', en: 'I\'m giving my notice for the end of next month.', note: 'Send by registered letter ("lettre recommandée avec accusé de réception") — required by French law.' },
  { fr: 'Il y a une fuite d\'eau dans la salle de bains.', en: 'There\'s a water leak in the bathroom.', note: '"Une fuite" = a leak. "La plomberie" = plumbing. Must report immediately — tenant liability.' },
]

const HOUSING_CULTURE = [
  { emoji: '🏙️', title: 'Paris — the housing crisis', detail: 'Paris has one of Europe\'s worst housing shortage crises. Average rent in Paris: €1,500+/month for a 30m² studio. Demand vastly outstrips supply. "Les zones tendues" (high-pressure zones) include Paris and 28 major cities — subject to rent control ("encadrement des loyers"). Many Parisians spend 40–50% of income on rent.' },
  { emoji: '🏡', title: 'The French dream of ownership', detail: '"Être propriétaire" (being a homeowner) is the French dream. Home ownership stands at 57% — below the EU average. The number of "primo-accédants" (first-time buyers) has fallen as prices rose. The "Pass Foncier" and "Prêt à Taux Zéro" (zero-interest loan) are government schemes to help first-time buyers.' },
  { emoji: '📋', title: 'French tenants have strong rights', detail: 'French tenancy law (Loi Alur, 2014) is strongly pro-tenant. Landlords cannot raise rents freely, cannot evict without long legal process, cannot refuse to return deposits without justification. "La trêve hivernale" (winter truce, Nov–March) means no evictions during winter. Squatters\' rights are notoriously strong — legally installed squatters are almost impossible to evict.' },
  { emoji: '🌿', title: 'Green housing and the energy transition', detail: 'France\'s DPE (Diagnostic de Performance Énergétique) rates homes A–G. From 2025, G-rated homes cannot be offered for new rentals. "Les passoires thermiques" (thermal sieves) — poorly insulated homes — must be renovated. Government subsidies ("MaPrimeRénov\'") pay for up to 70% of insulation and heating improvements.' },
]

export default function FrenchHousing() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Housing Vocabulary | SayBonjour!" description="French housing vocabulary — types of homes, rooms, renting terms, French tenancy law, and housing culture." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Housing in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le logement — types of housing, rooms, renting, and French housing culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'phrases', label: 'Phrases' },
            { id: 'culture', label: 'Housing Culture' },
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
              {HOUSING_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.emoji} {cat.category.split('—')[0].trim()}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {HOUSING_SECTIONS[activeCategory].items.map((item, i) => (
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
            {HOUSING_PHRASES.map((phrase, i) => (
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
            {HOUSING_CULTURE.map((item, i) => (
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
