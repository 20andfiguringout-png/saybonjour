export const sentenceExercises = [
  {
    id: 's1',
    level: 'A1',
    hint: 'Form a greeting sentence.',
    words: ['Bonjour', ',', 'comment', 'allez', '-vous', '?'],
    correct: ['Bonjour', ',', 'comment', 'allez', '-vous', '?'],
    translation: 'Hello, how are you?',
    explanation: 'French formal greeting — "allez-vous" uses the formal "vous" form.'
  },
  {
    id: 's2',
    level: 'A1',
    hint: 'Introduce yourself.',
    words: ['m\'appelle', 'Marie', 'Je'],
    correct: ['Je', 'm\'appelle', 'Marie'],
    translation: 'My name is Marie.',
    explanation: '"Je m\'appelle" literally means "I call myself" — always verb after subject.'
  },
  {
    id: 's3',
    level: 'A1',
    hint: 'Express where something is.',
    words: ['dans', 'Le', 'est', 'chat', 'la', 'maison'],
    correct: ['Le', 'chat', 'est', 'dans', 'la', 'maison'],
    translation: 'The cat is in the house.',
    explanation: 'Article + noun + verb + preposition + article + noun. "Le" for masculine, "la" for feminine.'
  },
  {
    id: 's4',
    level: 'A2',
    hint: 'Talk about a daily activity.',
    words: ['matin', 'café', 'Je', 'bois', 'le', 'chaque', 'du'],
    correct: ['Je', 'bois', 'du', 'café', 'chaque', 'matin'],
    translation: 'I drink coffee every morning.',
    explanation: '"Du" (partitive article) is used with uncountable things like coffee. "Chaque" means "each/every".'
  },
  {
    id: 's5',
    level: 'A2',
    hint: 'Make a polite request.',
    words: ['plaît', 'addition', 's\'il', 'vous', 'L\'', ','],
    correct: ['L\'', 'addition', ',', 's\'il', 'vous', 'plaît'],
    translation: 'The bill, please.',
    explanation: 'L\' is used before words starting with a vowel. "S\'il vous plaît" = formal "please".'
  },
  {
    id: 's6',
    level: 'A2',
    hint: 'Talk about weekend plans.',
    words: ['vais', 'week-end', 'ce', 'au', 'aller', 'Je', 'cinéma'],
    correct: ['Je', 'vais', 'aller', 'au', 'cinéma', 'ce', 'week-end'],
    translation: 'I\'m going to go to the cinema this weekend.',
    explanation: '"Aller + infinitive" forms the near future in French. "Au" = à + le (contracted).'
  },
  {
    id: 's7',
    level: 'B1',
    hint: 'Express a past experience.',
    words: ['passé', 'France', 'trois', 'J\'ai', 'en', 'semaines'],
    correct: ['J\'ai', 'passé', 'trois', 'semaines', 'en', 'France'],
    translation: 'I spent three weeks in France.',
    explanation: '"J\'ai passé" uses passé composé (avoir + past participle). "En France" — use "en" before feminine countries.'
  },
  {
    id: 's8',
    level: 'B1',
    hint: 'Give a condition.',
    words: ['Si', 'j\'', 'avais', 'du', 'temps', ',', 'je', 'visiterais', 'Paris'],
    correct: ['Si', 'j\'', 'avais', 'du', 'temps', ',', 'je', 'visiterais', 'Paris'],
    translation: 'If I had time, I would visit Paris.',
    explanation: 'Conditional sentences: si + imparfait → conditionnel présent. A key French grammar pattern.'
  },
  {
    id: 's9',
    level: 'A1',
    hint: 'Say what you like.',
    words: ['cuisine', 'J\'aime', 'française', 'la'],
    correct: ['J\'aime', 'la', 'cuisine', 'française'],
    translation: 'I love French cuisine.',
    explanation: '"Aimer + definite article (le/la/les)" expresses general liking in French.'
  },
  {
    id: 's10',
    level: 'A2',
    hint: 'Describe someone.',
    words: ['sœur', 'et', 'grande', 'Ma', 'intelligente', 'est', 'très'],
    correct: ['Ma', 'sœur', 'est', 'très', 'grande', 'et', 'intelligente'],
    translation: 'My sister is very tall and intelligent.',
    explanation: 'Adjectives come AFTER nouns in French (unlike English), except a few common ones like "grand/petit".'
  },
  {
    id: 's11',
    level: 'B1',
    hint: 'Express an obligation.',
    words: ['faut', 'Il', 'qu\'il', 'parte', 'maintenant'],
    correct: ['Il', 'faut', 'qu\'il', 'parte', 'maintenant'],
    translation: 'He must leave now.',
    explanation: '"Il faut que" triggers the subjunctive mood — "parte" is subjunctif of "partir".'
  },
  {
    id: 's12',
    level: 'A2',
    hint: 'Ask about price.',
    words: ['coûte', 'Combien', 'baguette', 'cette', '?'],
    correct: ['Combien', 'coûte', 'cette', 'baguette', '?'],
    translation: 'How much does this baguette cost?',
    explanation: '"Combien coûte…?" = How much is…? "Cette" is the feminine demonstrative adjective (this).'
  },
]

export const fillInBlanks = [
  {
    id: 'f1',
    level: 'A1',
    sentence: 'Je ___ un café, s\'il vous plaît.',
    blanks: ['voudrais'],
    options: ['voudrais', 'mange', 'fais', 'dis'],
    answer: 0,
    translation: 'I would like a coffee, please.',
    explanation: '"Voudrais" is the conditionnel of "vouloir" — used for polite requests.'
  },
  {
    id: 'f2',
    level: 'A1',
    sentence: '___ vous parlez français?',
    blanks: ['Est-ce que'],
    options: ['Est-ce que', 'Pourquoi', 'Depuis', 'Pendant'],
    answer: 0,
    translation: 'Do you speak French?',
    explanation: '"Est-ce que" is the most common way to form a yes/no question in French.'
  },
  {
    id: 'f3',
    level: 'A2',
    sentence: 'Il ___ aller au cinéma hier soir.',
    blanks: ['voulait'],
    options: ['veut', 'voulait', 'voudra', 'a voulu'],
    answer: 1,
    translation: 'He wanted to go to the cinema yesterday evening.',
    explanation: '"Voulait" is imparfait — used for past desires/states. "Hier soir" = yesterday evening.'
  },
  {
    id: 'f4',
    level: 'A2',
    sentence: 'Nous ___ en France depuis cinq ans.',
    blanks: ['habitons'],
    options: ['habitons', 'avons habité', 'habitâmes', 'habitions'],
    answer: 0,
    translation: 'We have been living in France for five years.',
    explanation: 'With "depuis" (for/since), use PRESENT tense in French to describe ongoing situations!'
  },
  {
    id: 'f5',
    level: 'B1',
    sentence: 'C\'est le livre ___ je t\'ai parlé.',
    blanks: ['dont'],
    options: ['que', 'qui', 'dont', 'où'],
    answer: 2,
    translation: 'That\'s the book I told you about.',
    explanation: '"Dont" replaces "de + noun/pronoun" — here "parler de" requires "dont".'
  },
  {
    id: 'f6',
    level: 'B1',
    sentence: 'Il faut que vous ___ la vérité.',
    blanks: ['disiez'],
    options: ['dites', 'direz', 'disiez', 'dire'],
    answer: 2,
    translation: 'You must tell the truth.',
    explanation: '"Il faut que" triggers the subjunctive. "Disiez" is subjunctif présent of "dire".'
  },
  {
    id: 'f7',
    level: 'A1',
    sentence: 'Où ___ les toilettes?',
    blanks: ['sont'],
    options: ['est', 'sont', 'a', 'ont'],
    answer: 1,
    translation: 'Where are the toilets?',
    explanation: '"Les toilettes" is plural, so use "sont" (plural of être). Essential travel phrase!'
  },
  {
    id: 'f8',
    level: 'A2',
    sentence: 'J\'ai ___ mes clés.',
    blanks: ['perdu'],
    options: ['perdu', 'perdais', 'perdre', 'perd'],
    answer: 0,
    translation: 'I have lost my keys.',
    explanation: '"J\'ai perdu" = passé composé of "perdre". Past participle = perdu.'
  },
]
