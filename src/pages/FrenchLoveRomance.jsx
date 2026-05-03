import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const LOVE_VOCAB = [
  { fr: 'l\'amour (m)', en: 'love', note: '"L\'amour avec un grand A" = Love with a capital L — big, deep love.' },
  { fr: 'un coup de foudre', en: 'love at first sight', note: 'Lit. "a lightning bolt" — the sudden electricity of falling instantly in love. One of France\'s most expressive concepts.' },
  { fr: 'le/la petit(e) ami(e)', en: 'boyfriend / girlfriend', note: 'Informal. More serious: "le compagnon / la compagne" or "mon/ma partenaire".' },
  { fr: 'le fiancé / la fiancée', en: 'fiancé / fiancée', note: 'From "fiancer" = to betroth. The word came into English from French.' },
  { fr: 'le mari / la femme', en: 'husband / wife', note: '"La femme" = wife AND woman — context determines which. "Mon époux / mon épouse" = more formal.' },
  { fr: 'le/la partenaire', en: 'partner (in a relationship)', note: 'Gender-neutral — increasingly used for all couple types.' },
  { fr: 'le compagnon / la compagne', en: 'life partner / companion', note: 'Used for long-term unmarried partners — more serious than petit ami/e. Very common for PACS partners.' },
  { fr: 'tomber amoureux / amoureuse de', en: 'to fall in love with', note: '"Tomber" (to fall) — the same metaphor as English.' },
  { fr: 'être amoureux / amoureuse de', en: 'to be in love with', note: '"Je suis follement amoureux d\'elle" = I\'m madly in love with her.' },
  { fr: 'flirter', en: 'to flirt', note: 'The word "flirt" came into French from English — now fully adopted.' },
  { fr: 'draguer', en: 'to chat someone up / to flirt (more actively)', note: '"Se faire draguer" = to be chatted up. More forward than "flirter".' },
  { fr: 'sortir avec quelqu\'un', en: 'to go out with someone / to date', note: '"On sort ensemble depuis deux ans" = we\'ve been going out for two years.' },
  { fr: 'se fréquenter', en: 'to see each other regularly / to date', note: 'Slightly more formal / older expression than "sortir avec".' },
  { fr: 'se fiancer', en: 'to get engaged', note: '"Les fiançailles" = the engagement. "Une bague de fiançailles" = an engagement ring.' },
  { fr: 'se marier (avec)', en: 'to get married (to)', note: '"On s\'est mariés en juin" = we got married in June. "Le mariage" = the wedding/marriage.' },
  { fr: 'se séparer / rompre', en: 'to separate / to break up', note: '"La rupture" = the break-up. "Rompre" is more definitive, "se séparer" can mean temporary.' },
  { fr: 'divorcer', en: 'to divorce', note: '"Le divorce" = divorce. France has one of the easier divorce processes in Europe — since 2017, uncontested divorce by mutual consent takes 3 months.' },
  { fr: 'le PACS', en: 'civil partnership (Pacte Civil de Solidarité)', note: 'Introduced 1999 — available to any two adults regardless of gender. Nearly as popular as marriage. Simpler to enter and exit than marriage.' },
]

const LOVE_PHRASES = [
  { fr: 'Je t\'aime.', en: 'I love you.', note: 'Strong and sincere — reserved for deep romantic love or family. NOT said casually to friends. "Je t\'aime bien" = I like you (the "bien" softens it to friendship).' },
  { fr: 'Je t\'adore.', en: 'I adore you.', note: 'Lighter than "je t\'aime" — can be used between close friends too. "J\'adore cette chanson" = I love this song.' },
  { fr: 'Tu me manques.', en: 'I miss you.', note: 'Lit. "you are missing to me" — the absent person is the subject in French. A beautiful grammatical reversal — the person you miss acts on you.' },
  { fr: 'Je pense à toi.', en: 'I\'m thinking of you.' },
  { fr: 'Tu es magnifique.', en: 'You\'re gorgeous / beautiful.', note: '"Tu es belle / beau" = you\'re beautiful. "Tu es ravissante" = you look stunning (to a woman).' },
  { fr: 'Tu es la personne de ma vie.', en: 'You\'re the person of my life / my soulmate.', note: 'Deeply romantic — equivalent of "the love of my life".' },
  { fr: 'Je suis fou / folle de toi.', en: 'I\'m crazy about you.', note: '"Follement amoureux / amoureuse" = madly in love. Strong and passionate.' },
  { fr: 'Veux-tu m\'épouser ?', en: 'Will you marry me?', note: '"M\'épouser" = to marry me. "Veux-tu" = do you want to (more intimate than "voulez-vous").' },
  { fr: 'Depuis que je te connais, je suis heureux / heureuse.', en: 'Since I\'ve known you, I\'ve been happy.', note: 'Note the present tense "je suis" with "depuis" — French uses present for ongoing states that started in the past.' },
  { fr: 'Tu comptes énormément pour moi.', en: 'You mean a great deal to me.', note: '"Compter" = to count, to matter. "Tu comptes beaucoup" = you matter a lot to me.' },
  { fr: 'Je n\'imaginais pas rencontrer quelqu\'un comme toi.', en: 'I never imagined meeting someone like you.', note: 'Beautiful and genuine — a real declaration.' },
  { fr: 'On est bien ensemble.', en: 'We\'re good together. / We\'re happy together.', note: '"Être bien" with someone = to feel good, at ease — a quiet but genuine expression of compatibility.' },
  { fr: 'Je t\'aime de tout mon cœur.', en: 'I love you with all my heart.', note: '"De tout mon cœur" = with all my heart. A classic, sincere declaration.' },
  { fr: 'On a de la chance de s\'être trouvés.', en: 'We\'re lucky to have found each other.', note: '"Se trouver" = to find each other — mutual and reciprocal.' },
]

const ENDEARMENTS = [
  { fr: 'mon amour', en: 'my love', note: 'The most common. "Mon amour" between couples is universal.' },
  { fr: 'mon chéri / ma chérie', en: 'my darling / sweetheart', note: 'Very common. Used by parents to children and between couples.' },
  { fr: 'mon cœur', en: 'my heart', note: '"Mon cœur" = my heart — warm and sincere.' },
  { fr: 'mon trésor', en: 'my treasure', note: '"Mon trésor" = my treasure. Used for children especially.' },
  { fr: 'mon bébé', en: 'my baby', note: 'Modern, informal — influenced by English and pop culture.' },
  { fr: 'ma puce', en: 'my flea (term of endearment)', note: 'Sounds strange but deeply affectionate — used for children and partners. Origins uncertain.' },
  { fr: 'mon chou / mon petit chou', en: 'my cabbage / my little cabbage', note: 'Also odd to English ears — but very sweet. "Mon petit chou" is very tender.' },
  { fr: 'mon lapin', en: 'my rabbit (term of endearment)', note: '"Mon lapin" / "ma lapine" — a sweet, playful endearment.' },
  { fr: 'mon ange', en: 'my angel', note: '"Mon ange" — used for children and romantic partners.' },
  { fr: 'mon petit / ma petite', en: 'my little one', note: 'Tender — used between close couples regardless of actual height.' },
  { fr: 'ma belle / mon beau', en: 'my beautiful one', note: '"Ma belle" (f) / "mon beau" (m) — admiring and affectionate.' },
  { fr: 'ma choupette', en: 'my little sweetheart', note: 'A diminutive of "chou" — very sweet and playful. Used for young children especially.' },
]

const CULTURE_NOTES = [
  { title: 'La séduction française', desc: 'France is famous for its culture of seduction and romantic flirtation. Light, witty, intellectual banter (la conversation) is central to French romantic culture. Being direct about attraction is considered natural and honest — not aggressive. A compliment from a stranger on the street is not necessarily unwelcome, but the line between charm and harassment is taken seriously. The concept of "la drague" (chatting someone up) is culturally embedded but increasingly contested.', icon: '💫' },
  { title: 'Le mariage et le PACS', desc: 'France introduced the PACS (Pacte Civil de Solidarité) in 1999 — a civil union available to any two adults regardless of gender. The PACS is hugely popular: in 2022, nearly as many couples PACSed as got married. Same-sex marriage (le mariage pour tous) has been legal since 2013, with strong political support but fierce debate before its passage. France was one of the earlier European countries to legalise it.', icon: '💍' },
  { title: '"Tu me manques" — the beautiful grammatical reversal', desc: 'English says "I miss you" — the speaker (I) is the subject. French says "tu me manques" — literally "you are lacking to me" or "you are missing to me." The person you miss (tu) is grammatically acting on you — they make you feel incomplete. Many French learners find this one of the most poetic aspects of the language. "Paris me manque" = I miss Paris.', icon: '🌙' },
  { title: 'La Saint-Valentin', desc: 'Valentine\'s Day (14 February) is celebrated, but in a more couple-focused way than in the UK or US. Cards, flowers (especially red roses — des roses rouges), chocolates, and romantic dinners are typical. In many French schools, children no longer do whole-class Valentine exchanges (as in the US) — it\'s primarily an adult romantic occasion. Paris is full of romantic activities: Seine cruises, candlelit dinners, theatre.', icon: '🌹' },
  { title: 'Terms of endearment — why French uses food and animals', desc: '"Mon chou" (my cabbage), "ma puce" (my flea), "mon lapin" (my rabbit), "mon petit canard" (my little duck) — French endearments are famously bizarre to English speakers. These terms date from rural France where animals and vegetables were the most immediate expressions of abundance and warmth. They\'ve survived because they feel intimate, playful, and uniquely tender.', icon: '🐇' },
]

export default function FrenchLoveRomance() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Love & Romance Vocabulary | SayBonjour!" description="French romantic vocabulary — love phrases, endearments, le PACS, dating culture, and la séduction française." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Love & Romance in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">L\'amour — vocabulary, phrases, endearments, and French romantic culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Vocabulary' },
            { id: 'phrases', label: 'Love Phrases' },
            { id: 'endearments', label: 'Endearments' },
            { id: 'culture', label: 'Culture Notes' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {LOVE_VOCAB.map((item, i) => (
              <motion.div key={item.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={item.fr} size="sm" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{item.fr}</span>
                    <span className="text-xs text-gray-400">— {item.en}</span>
                  </div>
                  {item.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {item.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-4">
            {LOVE_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="flex items-center gap-3 mb-1">
                  <SpeakButton text={p.fr} size="md" />
                  <p className="font-bold text-lg italic font-playfair text-burgundy-700 dark:text-burgundy-vibrant-300">"{p.fr}"</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-8">{p.en}</p>
                {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic ml-8 mt-1">💡 {p.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'endearments' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {ENDEARMENTS.map((e, i) => (
              <motion.div key={e.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={e.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{e.fr}</p>
                  <p className="text-xs text-gray-400">{e.en}</p>
                  {e.note && <p className="text-xs text-amber-500 italic mt-0.5">{e.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CULTURE_NOTES.map((note, i) => (
              <motion.div key={note.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(4, 'vocabulary')}>
                <span className="text-3xl shrink-0">{note.icon}</span>
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
