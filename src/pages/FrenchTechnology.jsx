import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Wifi, Smartphone, Code } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const TECH_SECTIONS = [
  {
    category: 'Devices & Hardware',
    fr: 'Les appareils et le matériel',
    items: [
      { fr: 'un ordinateur', en: 'a computer', note: '"Ordi" for short in everyday speech' },
      { fr: 'un ordinateur portable', en: 'a laptop', note: 'Also called "un laptop" informally' },
      { fr: 'une tablette', en: 'a tablet' },
      { fr: 'un smartphone / un téléphone portable', en: 'a smartphone / mobile phone', note: '"Un portable" is the common shorthand' },
      { fr: 'un écran', en: 'a screen / monitor', note: '"Écran tactile" = touchscreen' },
      { fr: 'un clavier', en: 'a keyboard', note: 'French keyboards use the AZERTY layout (not QWERTY)' },
      { fr: 'une souris', en: 'a mouse', note: 'Same word as the animal — "une souris sans fil" = wireless mouse' },
      { fr: 'une imprimante', en: 'a printer', note: '"Imprimer" = to print; "une imprimante 3D" = 3D printer' },
      { fr: 'une clé USB', en: 'a USB stick / flash drive', note: 'Also "une clé de mémoire" — widely used in French offices' },
      { fr: 'un disque dur', en: 'a hard drive', note: '"Un disque dur externe" = external hard drive; "un SSD" = SSD' },
      { fr: 'un casque (audio)', en: 'headphones / headset', note: '"Un casque sans fil" = wireless headphones; "des écouteurs" = earbuds' },
      { fr: 'une enceinte connectée', en: 'a smart speaker', note: '"Une enceinte Bluetooth" = a Bluetooth speaker' },
      { fr: 'un chargeur', en: 'a charger / charging cable' },
      { fr: 'une batterie externe', en: 'a power bank', note: '"La batterie est à plat" = the battery is dead flat' },
    ],
  },
  {
    category: 'Internet & Networks',
    fr: 'Internet et les réseaux',
    items: [
      { fr: 'Internet / le net', en: 'the internet', note: '"Surfer sur le net" = to surf the web — still used in France' },
      { fr: 'le Wi-Fi', en: 'Wi-Fi', note: 'Pronounced "wee-fee" in French — a key pronunciation difference' },
      { fr: 'la fibre (optique)', en: 'fibre broadband', note: '"Avoir la fibre" = to have fibre broadband — now standard in most French homes' },
      { fr: 'un mot de passe', en: 'a password', note: 'Lit. "a pass word". "Mot de passe oublié" = forgotten password' },
      { fr: 'un identifiant / un pseudo', en: 'a username / login / pseudonym' },
      { fr: 'un compte', en: 'an account', note: '"Créer un compte" = to create an account; "supprimer un compte" = to delete an account' },
      { fr: 'se connecter', en: 'to log in / connect', note: '"Connexion" = the act of connecting; "déconnecté" = offline' },
      { fr: 'télécharger', en: 'to download', note: '"Uploader" / "mettre en ligne" = to upload' },
      { fr: 'un navigateur (web)', en: 'a (web) browser', note: 'Firefox was originally developed with French input; France has its own browser project (Brave alternative)' },
      { fr: 'un moteur de recherche', en: 'a search engine', note: 'Google is dominant, but France developed Qwant (privacy-focused) as a European alternative' },
      { fr: 'la bande passante', en: 'bandwidth', note: 'Technical term — "la bande passante est saturée" = the network is overloaded' },
      { fr: 'une adresse IP', en: 'an IP address', note: 'Privacy is a hot topic in France — the CNIL regulates IP address data strictly' },
    ],
  },
  {
    category: 'Social Media',
    fr: 'Les réseaux sociaux',
    items: [
      { fr: 'les réseaux sociaux', en: 'social media / social networks', note: 'The official French term — "les médias sociaux" is also used in formal writing' },
      { fr: 'une publication / un post', en: 'a post', note: '"Poster" = to post (informal); "publier" = to publish (formal)' },
      { fr: 'un hashtag / un mot-dièse', en: 'a hashtag', note: '"Mot-dièse" is the official French term; "#hashtag" is universally used in practice' },
      { fr: 'un like / un j\'aime', en: 'a like', note: '"Liker" = to like (informal); "aimer" = formal equivalent. Facebook uses "j\'aime" (I like)' },
      { fr: 'partager', en: 'to share', note: '"Partager une publication" = to share a post' },
      { fr: 'un influenceur / une influenceuse', en: 'an influencer', note: 'The feminised form "influenceuse" is actively used in French — French language body (Académie française) supports this' },
      { fr: 'un abonné / une abonnée', en: 'a subscriber / follower' },
      { fr: 's\'abonner', en: 'to subscribe / follow', note: '"S\'abonner à une chaîne" = to subscribe to a channel' },
      { fr: 'une story', en: 'a story (Instagram/Snapchat)', note: 'English tech terms are widely adopted in French social media vocabulary' },
      { fr: 'aller en direct / en live', en: 'to go live', note: '"En direct" is the correct French; "en live" is the informal equivalent' },
      { fr: 'le cyberharcèlement', en: 'cyberbullying', note: 'A major policy issue in France — the Paty murder (2020) led to sweeping online hate speech laws' },
      { fr: 'les fake news / les infox', en: 'fake news / misinformation', note: '"Infox" is the official French neologism (information + intoxication) but "fake news" is universally understood' },
    ],
  },
  {
    category: 'Software & Digital',
    fr: 'Logiciels et numérique',
    items: [
      { fr: 'un logiciel', en: 'software / a program', note: 'Technically a single piece of software; "les logiciels" for software in general' },
      { fr: 'une application (une appli)', en: 'an app / application', note: '"Appli" is the universal shorthand in French — "t\'as l\'appli Doctolib ?"' },
      { fr: 'mettre à jour', en: 'to update', note: '"Une mise à jour" = an update (noun)' },
      { fr: 'un bug / une erreur', en: 'a bug / error', note: '"Bugger" = to bug/crash (informal). "L\'appli bugue" = the app is glitching' },
      { fr: 'sauvegarder', en: 'to save / back up', note: '"Sauvegarder automatiquement" = autosave; critical vocabulary for office French' },
      { fr: 'le nuage / le cloud', en: 'the cloud', note: 'Official French: "l\'informatique en nuage". "Mettre dans le cloud" = to put in the cloud' },
      { fr: 'une intelligence artificielle (IA)', en: 'artificial intelligence (AI)', note: 'France has invested heavily in AI — "AI for Humanity" strategy launched by Macron (2018), plus INRIA research institute' },
      { fr: 'un algorithme', en: 'an algorithm', note: 'France passed the first AI regulation laws in Europe before the EU AI Act' },
      { fr: 'les données (personnelles)', en: '(personal) data', note: '"Le RGPD" (Règlement Général sur la Protection des Données) = GDPR in French' },
      { fr: 'la cybersécurité', en: 'cybersecurity', note: 'France\'s ANSSI is one of Europe\'s most respected cybersecurity agencies' },
      { fr: 'le codage / la programmation', en: 'coding / programming', note: '"France est en train de coder" — coding is now taught from primary school in France' },
    ],
  },
  {
    category: 'French Tech Culture',
    fr: 'La France numérique',
    items: [
      { fr: 'la French Tech', en: 'France\'s tech startup ecosystem', note: 'Government-backed initiative (2013) — France now has 27+ unicorn startups, 3rd most in Europe after UK and Germany' },
      { fr: 'Station F', en: 'world\'s largest startup campus (Paris)', note: 'Opened 2017 in a renovated railway station (Halle Freyssinet) — hosts 1,000+ startups, backed by Xavier Niel (Iliad/Free)' },
      { fr: 'Doctolib', en: 'France\'s leading medical appointment platform', note: 'Used by 80 million patients. Became famous during COVID vaccination campaign — processed millions of bookings.' },
      { fr: 'BlaBlaCar', en: 'French ride-sharing and carpooling giant', note: 'Founded in Paris in 2006 — now operates in 22 countries. Valued at $2 billion.' },
      { fr: 'le droit à l\'oubli', en: 'the right to be forgotten (online)', note: 'Enshrined in the EU GDPR, strongly championed by France. The right to request removal of personal data from search engines.' },
      { fr: 'la CNIL', en: 'France\'s national data protection authority', note: 'Commission Nationale de l\'Informatique et des Libertés — one of Europe\'s most active regulators. Has fined Google €50M.' },
      { fr: 'le plan France Num', en: 'France\'s digital transformation strategy', note: 'Government programme to accelerate the digitisation of French SMEs and public services.' },
    ],
  },
]

const TECH_PHRASES = [
  { fr: 'Mon téléphone n\'a plus de batterie.', en: 'My phone has run out of battery.' },
  { fr: 'Est-ce que tu as le code Wi-Fi ?', en: 'Do you have the Wi-Fi password?' },
  { fr: 'L\'application a planté / bugué.', en: 'The app has crashed / is glitching.' },
  { fr: 'Il faut mettre à jour le logiciel.', en: 'The software needs to be updated.' },
  { fr: 'J\'ai perdu ma connexion.', en: 'I\'ve lost my connection.' },
  { fr: 'Peux-tu me taguer dans ta photo ?', en: 'Can you tag me in your photo?' },
  { fr: 'Je vais mettre ça dans le cloud.', en: 'I\'ll put that in the cloud.' },
  { fr: 'C\'est en mode hors ligne.', en: 'It\'s in offline mode.' },
  { fr: 'Il faut redémarrer l\'ordinateur.', en: 'The computer needs to be restarted.' },
  { fr: 'J\'ai reçu un message / un texto.', en: 'I received a message / a text.' },
  { fr: 'Partage-moi le lien.', en: 'Share the link with me.' },
  { fr: 'Télécharge l\'appli, c\'est gratuit.', en: 'Download the app, it\'s free.' },
  { fr: 'Mes données sont sauvegardées dans le cloud.', en: 'My data is backed up in the cloud.' },
  { fr: 'Le site est en maintenance.', en: 'The site is under maintenance.' },
]

export default function FrenchTechnology() {
  const [tab, setTab] = useState('vocab')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Technology Vocabulary | SayBonjour!" description="Learn French technology vocabulary — devices, internet, social media, software, AI, and the booming French tech scene." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Technology</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La technologie en français — devices, internet, social media, AI, and the French tech scene</p>
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
              {TECH_SECTIONS.map((cat, i) => (
                <button key={cat.category} onClick={() => { setActiveCategory(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {cat.category}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-6">
              <h2 className="font-semibold text-gray-800 dark:text-cream-50 mb-1">{TECH_SECTIONS[activeCategory].category}</h2>
              <p className="text-xs text-gray-400 italic mb-4">{TECH_SECTIONS[activeCategory].fr}</p>
              <div className="space-y-3">
                {TECH_SECTIONS[activeCategory].items.map(item => (
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

        {tab === 'phrases' && (
          <div className="space-y-3">
            {TECH_PHRASES.map((phrase, i) => (
              <motion.div key={phrase.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
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
