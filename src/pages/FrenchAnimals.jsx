import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SpeakButton from '../components/SpeakButton'
import { addXP } from '../utils/progress'

const ANIMAL_GROUPS = [
  {
    category: 'Pets & Companions',
    emoji: '🐕',
    items: [
      { fr: 'un chien / une chienne', en: 'a dog (male / female)', sound: 'Ouaf ouaf !', verb: 'aboyer', note: 'France has around 7.5 million pet dogs — the most per capita in Europe' },
      { fr: 'un chat / une chatte', en: 'a cat (male / female)', sound: 'Miaou !', verb: 'miauler', note: '"Avoir un chat dans la gorge" = to have a frog in your throat' },
      { fr: 'un lapin / une lapine', en: 'a rabbit', sound: 'Grrr !', verb: 'grogner', note: '"Poser un lapin" = to stand someone up' },
      { fr: 'un cochon d\'Inde', en: 'a guinea pig', note: 'Lit. "Indian pig" — arrived via Spanish explorers from South America' },
      { fr: 'un hamster', en: 'a hamster' },
      { fr: 'un perroquet', en: 'a parrot', sound: 'Cot cot !', note: '"Répéter comme un perroquet" = to repeat like a parrot (mindlessly)' },
      { fr: 'une tortue', en: 'a tortoise / turtle', note: 'The same word covers both land tortoise and sea turtle in French' },
      { fr: 'un poisson rouge', en: 'a goldfish', note: 'Lit. "red fish"' },
      { fr: 'un oiseau', en: 'a bird' },
      { fr: 'une souris', en: 'a mouse', sound: 'Couic couic !', note: '"Trouille" (fear) is often linked to souris in idioms' },
    ],
  },
  {
    category: 'Farm Animals',
    emoji: '🐄',
    items: [
      { fr: 'une vache', en: 'a cow', sound: 'Meuh !', verb: 'meugler / mugir', note: '"Manger comme une vache" = to eat like a pig (greedily)' },
      { fr: 'un taureau', en: 'a bull', note: 'Symbol of strength — "prendre le taureau par les cornes" = to take the bull by the horns' },
      { fr: 'un veau', en: 'a calf' },
      { fr: 'un cheval / des chevaux', en: 'a horse / horses', sound: 'Hi hi !', verb: 'hennir', note: '"Monter à cheval" = to ride a horse; a fondly used animal in French culture' },
      { fr: 'une jument', en: 'a mare (female horse)' },
      { fr: 'un poulain', en: 'a foal' },
      { fr: 'un mouton / une brebis', en: 'a sheep / ewe', sound: 'Bêê !', verb: 'bêler' },
      { fr: 'un cochon / un porc', en: 'a pig', sound: 'Groin groin !', verb: 'grogner', note: '"Cochon" is casual; "porc" is used for the meat' },
      { fr: 'une poule', en: 'a hen', sound: 'Cot cot !', verb: 'caqueter', note: '"Quand les poules auront des dents" = when pigs fly (lit. when hens have teeth)' },
      { fr: 'un coq', en: 'a rooster', sound: 'Cocorico !', note: 'The rooster is France\'s national symbol — "le coq gaulois"' },
      { fr: 'un âne', en: 'a donkey', sound: 'Hi-han !', verb: 'braire' },
      { fr: 'une chèvre', en: 'a goat', sound: 'Bêê !', verb: 'bêler', note: 'French goat cheese (chèvre) is world-famous' },
      { fr: 'un canard', en: 'a duck', sound: 'Coin coin !', verb: 'cancaner', note: '"Le Canard Enchaîné" is France\'s famous satirical newspaper' },
      { fr: 'une oie', en: 'a goose', verb: 'cacarder', note: '"Oie" used in "jeu de l\'oie" — the traditional board game' },
    ],
  },
  {
    category: 'Wild Animals — France',
    emoji: '🦊',
    items: [
      { fr: 'un renard / une renarde', en: 'a fox', note: 'Symbol of cunning in French fables — "le renard" appears in La Fontaine\'s famous Fables' },
      { fr: 'un loup / une louve', en: 'a wolf', sound: 'Hwouu !', verb: 'hurler', note: 'Wolves were reintroduced to the French Alps in the 1990s — still a politically charged topic' },
      { fr: 'un sanglier', en: 'a wild boar', note: 'Hugely important in French hunting culture — "la chasse au sanglier" is a French tradition' },
      { fr: 'un cerf / une biche', en: 'a stag / a doe', verb: 'bramer' },
      { fr: 'un chevreuil', en: 'a roe deer', note: 'Common in French forests — the basis of many venison dishes' },
      { fr: 'un lapin de garenne', en: 'a wild rabbit' },
      { fr: 'un blaireau', en: 'a badger', note: '"Blaireau" is also informal for "fool" or "jerk" in French slang' },
      { fr: 'un hérisson', en: 'a hedgehog', note: 'Beloved in French gardens — often treated as a useful visitor for eating slugs' },
      { fr: 'une belette', en: 'a weasel' },
      { fr: 'un écureuil', en: 'a squirrel', note: 'A notoriously difficult French word for English speakers — écureuil! The "u" sound catches many out' },
      { fr: 'une chauve-souris', en: 'a bat', note: 'Lit. "bald mouse"' },
      { fr: 'un lynx', en: 'a lynx', note: 'The Eurasian lynx was reintroduced in France — now found in the Jura and Vosges regions' },
    ],
  },
  {
    category: 'Wild Animals — Global',
    emoji: '🦁',
    items: [
      { fr: 'un lion / une lionne', en: 'a lion / lioness', sound: 'ROARR !', verb: 'rugir' },
      { fr: 'un tigre / une tigresse', en: 'a tiger / tigress' },
      { fr: 'un éléphant', en: 'an elephant', sound: 'Barrit !', verb: 'barrir' },
      { fr: 'une girafe', en: 'a giraffe' },
      { fr: 'un singe', en: 'a monkey / ape', verb: 'crier' },
      { fr: 'un gorille', en: 'a gorilla' },
      { fr: 'un ours / une ourse', en: 'a bear', sound: 'Grommm !', verb: 'grogner', note: '"Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué" = don\'t count your chickens' },
      { fr: 'un dauphin', en: 'a dolphin', note: '"Le Dauphin" was the title of the heir to the French throne' },
      { fr: 'une baleine', en: 'a whale', verb: 'chanter' },
      { fr: 'un requin', en: 'a shark' },
      { fr: 'un aigle', en: 'an eagle', verb: 'crier', note: '"L\'Aigle" was a symbol of Napoleon\'s empire' },
      { fr: 'un crocodile', en: 'a crocodile', sound: 'Clac clac !' },
      { fr: 'un hippopotame', en: 'a hippopotamus' },
      { fr: 'un rhinocéros', en: 'a rhinoceros' },
    ],
  },
  {
    category: 'Birds — Les Oiseaux',
    emoji: '🦅',
    items: [
      { fr: 'un moineau', en: 'a sparrow', sound: 'Cui cui !', note: 'Édith Piaf was nicknamed "La Môme Piaf" — piaf is Parisian slang for sparrow' },
      { fr: 'un rouge-gorge', en: 'a robin', note: 'Lit. "red throat" — a beloved bird in France, especially at Christmas' },
      { fr: 'une hirondelle', en: 'a swallow', note: '"Une hirondelle ne fait pas le printemps" = one swallow doesn\'t make a summer' },
      { fr: 'un merle', en: 'a blackbird', sound: 'Flûté !', verb: 'siffler', note: 'Symbol of spring in France' },
      { fr: 'un pigeon', en: 'a pigeon', note: '"Pigeon" is also slang for a gullible person in French' },
      { fr: 'un corbeau', en: 'a crow / raven', verb: 'croasser', note: 'Featured in La Fontaine\'s fable "Le Corbeau et le Renard"' },
      { fr: 'une cigogne', en: 'a stork', note: 'The stork is the iconic symbol of Alsace' },
      { fr: 'une chouette', en: 'an owl (barn / tawny)', sound: 'Hou hou !', note: '"C\'est chouette !" = That\'s great! — a very common colloquial expression' },
      { fr: 'un hibou', en: 'an owl (eared owl)', note: 'Different from chouette — hibou has ear tufts, chouette doesn\'t' },
      { fr: 'un perdreau', en: 'a partridge', note: 'Classic French game bird — served during hunting season' },
    ],
  },
  {
    category: 'Insects & Small',
    emoji: '🐛',
    items: [
      { fr: 'une abeille', en: 'a bee', sound: 'Bzz bzz !', note: '"Abeilles" are a key symbol in French heraldry — Napoleon used golden bees on his imperial robes' },
      { fr: 'un bourdon', en: 'a bumblebee' },
      { fr: 'un papillon', en: 'a butterfly', note: 'Also means the butterfly swimming stroke — "nager le papillon"' },
      { fr: 'une araignée', en: 'a spider', note: '"Avoir des araignées au plafond" = to be a bit crazy (lit. to have spiders on the ceiling)' },
      { fr: 'une fourmi', en: 'an ant', sound: 'Cri cri !', note: '"Avoir des fourmis dans les jambes" = to have pins and needles in your legs' },
      { fr: 'un moustique', en: 'a mosquito' },
      { fr: 'une mouche', en: 'a fly', verb: 'bourdonner', note: '"On n\'entendait pas une mouche voler" = you could have heard a pin drop (silence)' },
      { fr: 'un cafard', en: 'a cockroach', note: '"Avoir le cafard" = to feel down/depressed — one of the most expressive French idioms' },
      { fr: 'une guêpe', en: 'a wasp', sound: 'Bzz bzz !' },
      { fr: 'un ver de terre', en: 'an earthworm' },
      { fr: 'une grenouille', en: 'a frog', sound: 'Coâ coâ !', verb: 'coasser', note: 'The French are nicknamed "les grenouilles" by some — a reference to the French love of frog legs' },
      { fr: 'un serpent', en: 'a snake', verb: 'siffler' },
      { fr: 'un lézard', en: 'a lizard', note: '"Faire le lézard" = to bask in the sun lazily' },
    ],
  },
  {
    category: 'Sea Life',
    emoji: '🐠',
    items: [
      { fr: 'un poisson', en: 'a fish', note: '"Poisson d\'avril" = April Fool (lit. April fish) — French children stick paper fish on people\'s backs on April 1st' },
      { fr: 'une pieuvre / un poulpe', en: 'an octopus', note: '"Pieuvre" is the literary term; "poulpe" is more common in everyday speech and cooking' },
      { fr: 'un crabe', en: 'a crab' },
      { fr: 'une crevette', en: 'a shrimp / prawn' },
      { fr: 'un homard', en: 'a lobster', note: 'A luxury in French haute cuisine — "le homard breton" from Brittany is prized' },
      { fr: 'une huître', en: 'an oyster', note: 'France is Europe\'s largest oyster producer — Cancale and Arcachon are famous oyster towns' },
      { fr: 'une moule', en: 'a mussel', note: '"Moules-frites" is a classic French/Belgian dish' },
      { fr: 'un dauphin', en: 'a dolphin' },
      { fr: 'un requin', en: 'a shark' },
      { fr: 'une méduse', en: 'a jellyfish', note: 'Also the name for the mythological Medusa — same word in French' },
    ],
  },
]

const ANIMAL_SOUNDS = [
  { animal: 'Chien (dog)', sound: 'ouaf ouaf', verb: 'aboyer', en: 'to bark' },
  { animal: 'Chat (cat)', sound: 'miaou', verb: 'miauler', en: 'to meow' },
  { animal: 'Vache (cow)', sound: 'meuh', verb: 'meugler', en: 'to moo' },
  { animal: 'Coq (rooster)', sound: 'cocorico', verb: 'chanter', en: 'to crow' },
  { animal: 'Canard (duck)', sound: 'coin coin', verb: 'cancaner', en: 'to quack' },
  { animal: 'Grenouille (frog)', sound: 'coâ coâ', verb: 'coasser', en: 'to croak' },
  { animal: 'Mouton (sheep)', sound: 'bêê', verb: 'bêler', en: 'to bleat' },
  { animal: 'Cochon (pig)', sound: 'groin groin', verb: 'grogner', en: 'to grunt' },
  { animal: 'Poule (hen)', sound: 'cot cot', verb: 'caqueter', en: 'to cluck' },
  { animal: 'Abeille (bee)', sound: 'bzz bzz', verb: 'bourdonner', en: 'to buzz' },
  { animal: 'Lion (lion)', sound: 'roarr', verb: 'rugir', en: 'to roar' },
  { animal: 'Âne (donkey)', sound: 'hi-han', verb: 'braire', en: 'to bray' },
  { animal: 'Cheval (horse)', sound: 'hi hi', verb: 'hennir', en: 'to neigh' },
  { animal: 'Loup (wolf)', sound: 'hwouu', verb: 'hurler', en: 'to howl' },
  { animal: 'Oiseau (bird)', sound: 'cui cui', verb: 'gazouiller', en: 'to chirp / tweet' },
  { animal: 'Corbeau (crow)', sound: 'croa croa', verb: 'croasser', en: 'to caw' },
]

const ANIMAL_PHRASES = [
  { fr: 'Avoir le cafard.', en: 'To feel blue / down.', note: 'Lit. "to have the cockroach" — one of the most expressive French idioms. Baudelaire used it famously.' },
  { fr: 'Poser un lapin à quelqu\'un.', en: 'To stand someone up.', note: 'Lit. "to put a rabbit on someone". Origin uncertain — one theory links it to 19th century Parisian slang.' },
  { fr: 'Quand les poules auront des dents.', en: 'When pigs fly.', note: 'Lit. "when hens have teeth" — an impossible condition' },
  { fr: 'Il ne faut pas vendre la peau de l\'ours avant de l\'avoir tué.', en: 'Don\'t count your chickens before they hatch.', note: 'Lit. "don\'t sell the bearskin before killing the bear" — a La Fontaine fable reference' },
  { fr: 'Avoir d\'autres chats à fouetter.', en: 'To have bigger fish to fry.', note: 'Lit. "to have other cats to whip" — means to have more important things to do' },
  { fr: 'Quand le chat n\'est pas là, les souris dansent.', en: 'When the cat\'s away, the mice will play.' },
  { fr: 'Il pleut des cordes.', en: 'It\'s raining cats and dogs.', note: 'Lit. "it\'s raining ropes" — interestingly, the French say ropes, not cats and dogs' },
  { fr: 'Se noyer dans un verre d\'eau.', en: 'To make a mountain out of a molehill.', note: 'Lit. "to drown in a glass of water" — to struggle with something easy' },
  { fr: 'Une hirondelle ne fait pas le printemps.', en: 'One swallow doesn\'t make a summer.', note: 'A caution against jumping to conclusions from one sign' },
  { fr: 'Donner sa langue au chat.', en: 'To give up guessing.', note: 'Lit. "to give your tongue to the cat" — said when you can\'t guess the answer to a riddle' },
  { fr: 'Avoir des fourmis dans les jambes.', en: 'To have pins and needles in your legs.', note: 'Lit. "to have ants in your legs"' },
  { fr: 'Faire le lézard.', en: 'To laze around in the sun.', note: 'Lit. "to do the lizard" — to sunbathe lazily' },
  { fr: 'Il n\'y a pas un chat.', en: 'There\'s not a soul around.', note: 'Lit. "there isn\'t a cat" — means the place is completely empty' },
  { fr: 'Avoir d\'autres chiens à fouetter.', en: 'To have other things to deal with.' },
  { fr: 'Prendre le taureau par les cornes.', en: 'To take the bull by the horns.' },
]

const CULTURAL_FACTS = [
  { emoji: '🐓', title: 'Le Coq Gaulois', detail: 'The Gallic Rooster is France\'s national animal — not the lion or the eagle. Its connection to France dates from a Latin wordplay: "gallus" meant both "Gaul" (a Frenchman) and "rooster". French sports teams often wear the cockerel emblem.' },
  { emoji: '🐸', title: 'Les Grenouilles', detail: '"Grenouilles" (frogs) is one of the oldest nicknames the English have given the French, referring to frog legs (cuisses de grenouille) — a French delicacy. Today fewer French people eat frog legs than the stereotype suggests.' },
  { emoji: '🐝', title: 'Les Abeilles Napoléoniennes', detail: 'Napoleon chose the golden bee as his personal imperial symbol, replacing the fleur-de-lis of the Ancien Régime. Bees represented industry, immortality, and resurrection. They appear on his coronation robes.' },
  { emoji: '🦌', title: 'Hunting Culture', detail: 'France has one of the strongest hunting (la chasse) cultures in Europe, with 1.1 million licensed hunters. Wild boar (sanglier), deer (cerf), and pheasant (faisan) are key game animals. Hunting is a major social tradition, especially in rural France.' },
  { emoji: '🐺', title: 'Le Retour du Loup', detail: 'Wolves (loups) were extinct in France by the 1930s. They began naturally repopulating from Italy in 1992. Today over 1,000 wolves live in France, particularly in the Alps. Their return has reignited fierce debates between farmers and environmentalists.' },
]

export default function FrenchAnimals() {
  const [tab, setTab] = useState('animals')
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-warm-300">
      <SEO title="French Animals | SayBonjour!" description="Learn French animal vocabulary — pets, farm animals, wildlife, sea life, birds — plus sounds, verbs, idioms, and cultural facts." />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-cream-50">Animals in French</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Les animaux — vocabulary, sounds, expressions, and French animal culture</p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { id: 'animals', label: 'Animals' },
            { id: 'sounds', label: 'Animal Sounds' },
            { id: 'idioms', label: 'Animal Idioms' },
            { id: 'culture', label: 'Culture & Facts' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${tab === t.id ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'animals' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {ANIMAL_GROUPS.map((g, i) => (
                <button key={g.category} onClick={() => { setActiveGroup(i); addXP(3, 'vocabulary') }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeGroup === i ? 'bg-burgundy-600 text-white' : 'bg-white dark:bg-dark-warm-100 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-warm-50 hover:border-burgundy-300'}`}>
                  {g.emoji} {g.category}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ANIMAL_GROUPS[activeGroup].items.map((animal, i) => (
                <motion.div key={animal.fr} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 p-3 flex items-start gap-2"
                  onClick={() => addXP(2, 'vocabulary')}>
                  <SpeakButton text={animal.fr.split('/')[0].trim()} size="sm" />
                  <div>
                    <p className="font-medium text-sm text-burgundy-700 dark:text-burgundy-vibrant-300">{animal.fr}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{animal.en}</p>
                    {animal.sound && <p className="text-xs text-emerald-600 dark:text-emerald-400 italic mt-0.5">🔊 {animal.sound}</p>}
                    {animal.note && <p className="text-xs text-amber-600 dark:text-amber-400 italic mt-0.5">💡 {animal.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'sounds' && (
          <div className="space-y-2">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 mb-4 text-sm text-blue-800 dark:text-blue-300">
              <strong>Did you know?</strong> Animal sounds are different in every language — French hears a dog say <em>ouaf ouaf</em>, English hears <em>woof woof</em>. French also gives each sound a dedicated <strong>verb</strong> (e.g. <em>aboyer</em> = to bark).
            </div>
            {ANIMAL_SOUNDS.map((item, i) => (
              <motion.div key={item.animal} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-dark-warm-100 rounded-xl shadow border border-gray-100 dark:border-dark-warm-50 px-4 py-3 flex items-center gap-4"
                onClick={() => addXP(2, 'vocabulary')}>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800 dark:text-cream-50">{item.animal}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 italic">🔊 <strong>{item.sound}</strong></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono text-burgundy-600 dark:text-burgundy-vibrant-300">{item.verb}</p>
                  <p className="text-xs text-gray-400">{item.en}</p>
                </div>
                <SpeakButton text={item.sound} size="sm" />
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'idioms' && (
          <div className="space-y-4">
            {ANIMAL_PHRASES.map((p, i) => (
              <motion.div key={p.fr} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5"
                onClick={() => addXP(3, 'vocabulary')}>
                <div className="flex items-start gap-3 mb-2">
                  <SpeakButton text={p.fr} size="sm" />
                  <p className="font-semibold italic text-gray-900 dark:text-cream-50 font-playfair">"{p.fr}"</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 ml-8">English: <span className="font-medium">{p.en}</span></p>
                {p.note && <p className="text-xs text-amber-700 dark:text-amber-400 italic ml-8">💡 {p.note}</p>}
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'culture' && (
          <div className="space-y-4">
            {CULTURAL_FACTS.map((fact, i) => (
              <motion.div key={fact.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-dark-warm-100 rounded-2xl shadow border border-gray-100 dark:border-dark-warm-50 p-5 flex items-start gap-4">
                <span className="text-3xl shrink-0">{fact.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-cream-50 font-playfair mb-1">{fact.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{fact.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
