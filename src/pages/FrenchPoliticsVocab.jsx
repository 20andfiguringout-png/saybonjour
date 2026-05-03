import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Vote, Flag } from 'lucide-react'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const POLITICS_VOCAB = [
  { fr: 'la politique', en: 'politics / policy', note: '"Faire de la politique" = to be involved in politics. "Une politique" = a policy.' },
  { fr: 'le gouvernement', en: 'the government', note: 'In the 5th Republic, the Prime Minister leads the government; the President leads the state.' },
  { fr: 'le président / la présidente de la République', en: 'the President of the Republic', note: 'Elected every 5 years by direct universal suffrage — very powerful in the 5th Republic system.' },
  { fr: 'le Premier ministre / la Première ministre', en: 'the Prime Minister', note: 'Appointed by the President, leads the government. Can be from a different party (= "cohabitation").' },
  { fr: 'le Parlement', en: 'Parliament (the legislature)', note: 'Bicameral: l\'Assemblée nationale + le Sénat. Based at Le Palais Bourbon and Le Palais du Luxembourg.' },
  { fr: 'l\'Assemblée nationale', en: 'the National Assembly (lower house)', note: '577 deputies elected every 5 years. More powerful than the Senate — has the final say on legislation.' },
  { fr: 'le Sénat', en: 'the Senate (upper house)', note: '348 senators elected by indirect suffrage (local elected officials). More conservative chamber.' },
  { fr: 'un député / une députée', en: 'a Member of Parliament (MP)', note: 'Members of the National Assembly — elected by constituency every 5 years.' },
  { fr: 'un sénateur / une sénatrice', en: 'a senator', note: 'Elected for 6 years — the longest mandate in French politics.' },
  { fr: 'une élection', en: 'an election', note: 'France holds presidential, legislative, municipal, regional, and European elections — frequently!' },
  { fr: 'voter', en: 'to vote', note: '"Le droit de vote" = the right to vote; "voter blanc" = to cast a blank ballot' },
  { fr: 'le suffrage universel', en: 'universal suffrage', note: 'France introduced universal male suffrage in 1848; women\'s suffrage was only in 1944 — surprisingly late.' },
  { fr: 'la gauche / la droite / le centre', en: 'the left / the right / the centre', note: 'Terms originate from the French Revolution — seating position in the 1789 National Assembly.' },
  { fr: 'une loi', en: 'a law', note: '"Voter une loi" = to pass a law; "le projet de loi" = a bill.' },
  { fr: 'un décret', en: 'a decree (executive order)', note: '"Légiférer par décret" = to rule by decree — used under Article 49.3 of the Constitution.' },
  { fr: 'un référendum', en: 'a referendum', note: 'France uses referendums for constitutional changes (e.g., 1992 Maastricht Treaty was only barely approved).' },
  { fr: 'la laïcité', en: 'secularism / separation of church and state', note: 'A cornerstone of French republicanism since 1905. Religious symbols banned in state schools and public service.' },
  { fr: 'la République', en: 'the Republic', note: 'France is in its 5th Republic (since 1958, under de Gaulle). "Liberté, Égalité, Fraternité" is the motto.' },
  { fr: 'les droits de l\'homme', en: 'human rights', note: 'The Déclaration des droits de l\'homme et du citoyen (1789) is a founding document of modern human rights.' },
  { fr: 'l\'État', en: 'the State (with capital E)', note: 'In France, "l\'État" is deeply important — France has a very centralised state tradition since Louis XIV and Napoleon.' },
  { fr: 'la cohabitation', en: 'cohabitation — when President and PM are from opposite parties', note: 'Happened three times: 1986, 1993, 1997. The last was Chirac (right) + Jospin (left), 1997–2002.' },
  { fr: 'un remaniement ministériel', en: 'a cabinet reshuffle', note: 'Very common in France — the President regularly reshuffles ministers.' },
  { fr: 'le quinquennat', en: 'the 5-year presidential term', note: 'Changed from 7 years (septennat) to 5 years by referendum in 2000.' },
  { fr: 'l\'article 49.3', en: 'Article 49.3 — constitutional provision to pass a law without a vote', note: 'Controversial — used to bypass Parliament. Used by Macron\'s government for pension reform in 2023, triggering protests.' },
]

const KEY_INSTITUTIONS = [
  { name: 'L\'Élysée', en: 'the Élysée Palace', desc: 'Official residence and office of the French President — in the 8th arrondissement of Paris. The seat of executive power. Tours occasionally available on Heritage Days (Journées du Patrimoine).', emoji: '🏛️' },
  { name: 'Matignon', en: 'the Hôtel Matignon', desc: 'Official residence of the Prime Minister — the largest private gardens in Paris. When President and PM are from different parties, the resulting "cohabitation" creates intense political tension.', emoji: '🌳' },
  { name: 'Le Palais Bourbon', en: 'Bourbon Palace (National Assembly)', desc: 'Home of the Assemblée nationale on the Left Bank of the Seine, facing the Place de la Concorde. Open to the public during Heritage Days. Its neoclassical façade was built to match the Madeleine church opposite.', emoji: '🏛️' },
  { name: 'Le Palais du Luxembourg', en: 'Luxembourg Palace (Senate)', desc: 'Home of the Senate, in the Jardin du Luxembourg. Built for Marie de Médicis in the 17th century. The gardens are public — one of Paris\'s most beautiful.', emoji: '🌹' },
  { name: 'Le Conseil d\'État', en: 'the Council of State', desc: 'The highest administrative court AND the government\'s chief legal advisor. Reviews all government bills for legal soundness. Founded by Napoleon in 1799.', emoji: '⚖️' },
  { name: 'Le Conseil constitutionnel', en: 'the Constitutional Council', desc: 'France\'s constitutional court — 9 members appointed for 9-year non-renewable terms. Checks that laws conform to the Constitution. Former presidents become lifetime members.', emoji: '📜' },
  { name: 'La Préfecture', en: 'the Prefecture', desc: 'The local arm of the national government — handles official documents (driving licences, residency permits, vehicle registration). Every "département" has a prefecture.', emoji: '🏢' },
  { name: 'La Mairie / L\'Hôtel de Ville', en: 'the Town Hall', desc: 'The local government building — essential for marriages, registrations, and civic services. Every commune (there are 35,000 in France) has a mairie.', emoji: '🏬' },
  { name: 'La Cour des comptes', en: 'the Court of Auditors', desc: 'The supreme public audit institution — independently monitors how public money is spent. Publishes annual reports on government waste and efficiency.', emoji: '🔍' },
]

const POLITICAL_PHRASES = [
  { fr: 'Je suis plutôt à gauche / à droite.', en: 'I lean left / right politically.' },
  { fr: 'Je ne fais pas de politique.', en: 'I don\'t involve myself in politics.', note: 'Some French say this, but political debate is a beloved national sport — especially at dinner.' },
  { fr: 'Les élections présidentielles ont lieu tous les cinq ans.', en: 'Presidential elections are held every five years.' },
  { fr: 'Le taux d\'abstention est élevé.', en: 'Voter turnout / abstention is high.', note: 'Abstention rates have risen significantly in France — a major political concern.' },
  { fr: 'La laïcité est un principe fondamental de la République.', en: 'Secularism is a fundamental principle of the Republic.' },
  { fr: 'Il y a eu un vote de confiance.', en: 'There was a vote of confidence (in the government).' },
  { fr: 'Le gouvernement a utilisé l\'article 49.3.', en: 'The government used Article 49.3 (to bypass Parliament).' },
  { fr: 'Il / Elle est candidat(e) aux élections.', en: 'He / She is a candidate in the elections.' },
  { fr: 'On vote au premier / deuxième tour.', en: 'We vote in the first / second round.', note: 'France uses a two-round system — if no one gets 50%+ in round 1, the top two go to round 2.' },
  { fr: 'La France est une République laïque, démocratique et sociale.', en: 'France is a secular, democratic, and social Republic.', note: 'From Article 1 of the French Constitution' },
  { fr: 'Le mouvement social a duré plusieurs semaines.', en: 'The social movement / strike lasted several weeks.', note: '"Un mouvement social" = a protest movement (broader than just a strike)' },
]

const POLITICAL_CULTURE = [
  { emoji: '🗣️', title: 'French Political Debate', detail: 'Political debate is central to French culture — from dinner table arguments to grand televised debates (les grands débats). The 2-hour presidential TV debate between the two final candidates is a national event. Rhetoric, argument, and eloquence are deeply valued.' },
  { emoji: '✊', title: 'La Grève (The Strike)', detail: 'France has one of the highest rates of strike action in Europe. "La grève" is a constitutionally protected right. Major strikes (SNCF, education, hospitals) regularly paralyse the country. "Faire grève" = to go on strike is culturally legitimate and broadly respected.' },
  { emoji: '📜', title: 'Liberté, Égalité, Fraternité', detail: 'The Republican motto, adopted during the Revolution. "Liberté" = freedom from oppression; "Égalité" = equal treatment under law; "Fraternité" = solidarity/brotherhood. These three values create genuine tensions — especially between individual liberty and collective equality.' },
  { emoji: '🏛️', title: 'Les Grandes Écoles and the ENA', detail: 'France\'s ruling class is disproportionately produced by the Grandes Écoles — Sciences Po, ENA (now INSP), Polytechnique, HEC. An extraordinary proportion of French presidents, prime ministers, and CEOs are graduates of these 3–5 schools. "L\'Énarchie" = rule by ENA alumni.' },
]

export default function FrenchPoliticsVocab() {
  const [tab, setTab] = useState('vocab')

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Political Vocabulary | SayBonjour!" description="French political vocabulary — the 5th Republic, key institutions, elections, laïcité, and political phrases." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">French Political Vocabulary</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">La politique française — the 5th Republic, institutions, elections, and key phrases</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'vocab', label: 'Political Vocab' },
            { id: 'institutions', label: 'Key Institutions' },
            { id: 'phrases', label: 'Phrases' },
            { id: 'culture', label: 'Political Culture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vocab' && (
          <div className="space-y-2">
            {POLITICS_VOCAB.map((item, i) => (
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

        {tab === 'institutions' && (
          <div className="space-y-4">
            {KEY_INSTITUTIONS.map((inst, i) => (
              <motion.div key={inst.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4"
                onClick={() => addXP(3, 'vocabulary')}>
                <span className="text-3xl shrink-0">{inst.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SpeakButton text={inst.name} size="sm" />
                    <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair">{inst.name}</h3>
                  </div>
                  <p className="text-xs text-burgundy-600 dark:text-burgundy-vibrant-300 italic mb-1">{inst.en}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{inst.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'phrases' && (
          <div className="space-y-3">
            {POLITICAL_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-4 flex items-start gap-3"
                onClick={() => addXP(2, 'vocabulary')}>
                <SpeakButton text={p.fr} size="sm" />
                <div>
                  <p className="font-medium text-sm italic text-gray-800 dark:text-cream-50">"{p.fr}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.en}</p>
                  {p.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {p.note}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {POLITICAL_CULTURE.map((item, i) => (
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
