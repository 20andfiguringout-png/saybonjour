import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Hash, MessageCircle } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const SOCIAL_VOCAB = [
  { fr: 'les réseaux sociaux', en: 'social media / social networks', note: 'The official French term — "médias sociaux" is also used in formal writing' },
  { fr: 'une publication / un post', en: 'a post', note: '"Poster" = to post (informal); "publier" = more formal/correct' },
  { fr: 'partager', en: 'to share', note: '"Partager une publication" = to share a post; "un partage" = a share' },
  { fr: 'liker / mettre un j\'aime', en: 'to like', note: '"Liker" is the informal French version; Facebook uses "j\'aime" (I like)' },
  { fr: 'commenter', en: 'to comment', note: '"Un commentaire" = a comment; "commenter à chaud" = to react immediately' },
  { fr: 'suivre', en: 'to follow (an account)', note: '"Je suis 300 comptes" = I follow 300 accounts' },
  { fr: 'un abonné / une abonnée', en: 'a follower / subscriber', note: '"Nombre d\'abonnés" = follower count — hugely important in influencer culture' },
  { fr: 's\'abonner', en: 'to subscribe / to follow an account' },
  { fr: 'se désabonner', en: 'to unsubscribe / unfollow' },
  { fr: 'un hashtag / un mot-dièse', en: 'a hashtag', note: '"Mot-dièse" is the official French term (from the musical sharp sign ♯) but nobody uses it — "hashtag" is universal' },
  { fr: 'tagger / taguer quelqu\'un', en: 'to tag someone', note: '"Identifie-moi dans ta photo" is also used — "to identify me in your photo"' },
  { fr: 'un influenceur / une influenceuse', en: 'an influencer', note: 'Both forms actively used — French takes gender agreement seriously in new professions' },
  { fr: 'une story', en: 'a story (Instagram/WhatsApp/Snapchat)', note: 'Borrowed from English — now feminine in French usage: "une story"' },
  { fr: 'aller en direct / en live', en: 'to go live / to livestream', note: '"En direct" is official French; "en live" is the informal equivalent — both widely used' },
  { fr: 'un profil', en: 'a profile', note: '"Ton profil est privé" = your profile is private' },
  { fr: 'une bio(graphie)', en: 'a bio (profile description)', note: '"La bio est limitée à 150 caractères" = the bio is limited to 150 characters' },
  { fr: 'la messagerie instantanée', en: 'instant messaging', note: 'WhatsApp is dominant in France for personal messaging — more than SMS' },
  { fr: 'un message privé (MP)', en: 'a private message (DM)', note: '"MP moi" = DM me. Also "glisse dans mes DM" (slide into my DMs).' },
  { fr: 'le cyberharcèlement', en: 'cyberbullying', note: 'A major policy issue in France — the Paty murder (2020) led to sweeping online hate speech laws (la loi Avia)' },
  { fr: 'une fake news / une infox', en: 'fake news / misinformation', note: '"Infox" is the official French neologism (information + intoxication) but "fake news" is universally understood' },
  { fr: 'viral / devenir viral(e)', en: 'viral / to go viral', note: '"Cette vidéo est devenue virale" = This video went viral' },
  { fr: 'le fil d\'actualité', en: 'the (news) feed / timeline', note: '"Fil" = thread/feed. "Mon fil d\'actualité" = my news feed' },
  { fr: 'une notification', en: 'a notification', note: '"Activer les notifications" = to turn on notifications' },
  { fr: 'une chaîne YouTube', en: 'a YouTube channel', note: '"Un Youtubeur / une Youtubeuse" = a YouTuber (French-coined term)' },
  { fr: 'un créateur / une créatrice de contenu', en: 'a content creator', note: 'The broader term for YouTubers, TikTokers, podcasters, etc.' },
  { fr: 'le dark web', en: 'the dark web', note: 'Same term used in French — la cybersécurité is a growing French government priority' },
]

const TEXT_ABBREV = [
  { abbr: 'MDR', full: 'Mort De Rire', en: 'LOL (literally "dying of laughter")', note: 'The French LOL — used universally' },
  { abbr: 'PTDR', full: 'Pété De Rire', en: 'ROFL (literally "bursting with laughter")', note: 'Stronger than MDR — used for very funny things' },
  { abbr: 'PK / PKoi', full: 'Pourquoi', en: 'Why / How come' },
  { abbr: 'STP', full: 'S\'il Te Plaît', en: 'Please (informal / tu)', note: '"SVP" is the formal version (s\'il vous plaît)' },
  { abbr: 'SVP', full: 'S\'il Vous Plaît', en: 'Please (formal / vous)' },
  { abbr: 'OKLM', full: 'Au Calme', en: 'Chill / relaxed / no drama', note: 'Verlan of "calme" — popularised by the rap duo PNL' },
  { abbr: 'TBM', full: 'Trop Bien', en: 'So good / awesome / great' },
  { abbr: 'WESH', full: 'Wesh (Arabic origin)', en: 'Hey / Yo / Bro (greeting)', note: 'From Arabic "wesh" — adopted widely by French youth' },
  { abbr: 'TLM', full: 'Tout Le Monde', en: 'Everyone / everybody' },
  { abbr: 'JSP', full: 'Je Sais Pas', en: 'IDK (I don\'t know)', note: 'Used with or without spaces — "jsp" is very common' },
  { abbr: 'JTM', full: 'Je T\'aime', en: 'I love you', note: 'Used between friends AND romantically' },
  { abbr: 'OMG', full: 'Oh Mon Dieu', en: 'OMG', note: 'The English abbreviation has been adopted; "OMD" (Oh Mon Dieu) is also used' },
  { abbr: 'AFK', full: 'Away From Keyboard', en: 'Away / not available', note: 'English tech abbreviation widely used' },
  { abbr: 'BBL', full: 'Bientôt de retour (back soon)', en: 'BRB (be right back)', note: 'Sometimes "BBL" (English BRB) is used directly' },
  { abbr: 'CHO', full: 'Chaud', en: 'Hot / intense / crazy (slang)', note: '"C\'est chaud" = it\'s tough/intense/risky' },
  { abbr: 'ASAP', full: 'As Soon As Possible', en: 'As soon as possible', note: 'English abbreviation used directly in French professional communication' },
  { abbr: 'DEG', full: 'Dégueulasse', en: 'Disgusting / gross (slang)', note: '"C\'est deg" = that\'s gross' },
  { abbr: 'TIP TOP', full: 'Tout est parfait', en: 'Everything is great / perfect', note: '"C\'est tip-top" = everything is spot-on' },
]

const INTERNET_CULTURE = [
  { title: 'French YouTube — Les Youtubeurs', desc: 'French YouTubers have built massive audiences: Norman fait des vidéos, Cyprien, Squeezie (gaming), Léo Duff (comedy), McFly & Carlito (comedy/lifestyle — who challenged Macron to a YouTube video). TikTok has massively grown among French teens since 2020.', emoji: '🎬' },
  { title: 'Verlan on social media', desc: '"Verlan" (French back-slang: "l\'envers" = reversed) is common online: "ouf" (fou = crazy), "zarbi" (bizarre), "meuf" (femme = woman), "chelou" (louche = shady), "relou" (lourd = annoying). Originally Parisian banlieue slang, now standard youth language nationwide.', emoji: '🔄' },
  { title: 'MDR vs LOL', desc: '"MDR" (Mort De Rire = "dying of laughter") is the French LOL and is used universally. "Hihi" and "héhé" are used for mild amusement. "Je suis mort(e)" (I\'m dead) = I died laughing. "Je suis plié(e) en deux" = I\'m doubled over laughing.', emoji: '😂' },
  { title: 'Digital French etiquette (le nétiquette)', desc: 'French professionals maintain formal email conventions (Madame/Monsieur, full sentences, "je vous prie d\'agréer" closings — even to colleagues). WhatsApp groups are very informal. Formal emails are a distinct skill — the "vouvoiement" in email closings is an art form.', emoji: '📧' },
  { title: 'The CNIL and data privacy', desc: 'France\'s CNIL (Commission Nationale de l\'Informatique et des Libertés) is one of Europe\'s most active data regulators — has fined Google €50M and Amazon €35M. France championed the "right to be forgotten" (le droit à l\'oubli) in the GDPR. Privacy is constitutionally important.', emoji: '🔒' },
  { title: 'French digital slang phrases', desc: '"Clashé(e)" = got called out/exposed publicly. "Gros bill" = a dominant player (gaming). "Cacha" = Snapchat (from the disappearing feature — "cache-cache" = hide and seek). "Faire un bad buzz" = to create a PR disaster online. "Être en PLS" = to be in a terrible state.', emoji: '💬' },
]

export default function FrenchSocialMedia() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Social Media & Internet Language | SayBonjour!" description="French social media vocabulary, text abbreviations, internet slang, influencer culture, and digital etiquette." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Social Media & Internet French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Le français numérique — vocabulary, abbreviations, internet culture, and digital etiquette</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Social Media Vocab' },
            { id: 'abbrev', label: 'Text Abbreviations' },
            { id: 'culture', label: 'Internet Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {SOCIAL_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'abbrev' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {TEXT_ABBREV.map((item, i) => (
              <motion.div key={item.abbr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg font-mono text-burgundy-700 dark:text-burgundy-vibrant-300">{item.abbr}</span>
                  <span className="text-xs text-gray-400 italic">= {item.full}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.en}</p>
                {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">{item.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {INTERNET_CULTURE.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{note.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{note.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
