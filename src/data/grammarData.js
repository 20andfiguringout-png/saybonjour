export const grammarLevels = [
  {
    level: 'A1',
    label: 'Beginner',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    headerColor: 'bg-emerald-600',
    description: 'Absolute beginner — basic greetings, numbers, everyday phrases.',
    topics: [
      {
        id: 'a1-articles',
        title: 'Gender & Articles (le, la, les)',
        summary: 'All French nouns have a gender — masculine or feminine — and articles must agree.',
        content: [
          {
            heading: 'Definite Articles',
            text: 'Use definite articles when referring to specific nouns or general categories.',
            table: {
              headers: ['', 'Masculine', 'Feminine', 'Plural'],
              rows: [
                ['Definite', 'le (l\')', 'la (l\')', 'les'],
                ['Example', 'le livre (the book)', 'la table (the table)', 'les enfants (the children)'],
              ]
            }
          },
          {
            heading: 'Indefinite Articles',
            text: 'Use indefinite articles when introducing a noun for the first time.',
            table: {
              headers: ['', 'Masculine', 'Feminine', 'Plural'],
              rows: [
                ['Indefinite', 'un', 'une', 'des'],
                ['Example', 'un chat (a cat)', 'une maison (a house)', 'des chats (some cats)'],
              ]
            }
          },
          {
            heading: 'Key Rules',
            list: [
              'Use l\' before nouns starting with a vowel or silent h: l\'ami, l\'heure',
              'Noun genders must often be memorised — there are few reliable rules',
              'Words ending in -tion, -sion, -ure are usually feminine',
              'Words ending in -ment, -age, -isme are usually masculine',
            ]
          }
        ],
        examples: [
          { french: 'Le garçon mange une pomme.', english: 'The boy eats an apple.' },
          { french: 'La fille lit un livre.', english: 'The girl reads a book.' },
          { french: 'Les enfants jouent dans le jardin.', english: 'The children play in the garden.' },
        ],
        quiz: [
          { question: 'Which article goes with "maison" (house)?', options: ['le', 'la', 'les', 'un'], answer: 1 },
          { question: 'Which article goes with "livre" (book)?', options: ['le', 'la', 'l\'', 'une'], answer: 0 },
          { question: '"Des" is the plural of which articles?', options: ['le/la', 'un/une', 'l\'', 'les'], answer: 1 },
        ]
      },
      {
        id: 'a1-present',
        title: 'Present Tense — Regular Verbs',
        summary: 'Regular -er, -ir, and -re verbs follow predictable conjugation patterns.',
        content: [
          {
            heading: '-ER Verbs (parler — to speak)',
            table: {
              headers: ['Pronoun', 'Conjugation', 'Pronunciation'],
              rows: [
                ['je', 'parle', 'parl'],
                ['tu', 'parles', 'parl'],
                ['il/elle/on', 'parle', 'parl'],
                ['nous', 'parlons', 'par-LOHN'],
                ['vous', 'parlez', 'par-LAY'],
                ['ils/elles', 'parlent', 'parl'],
              ]
            }
          },
          {
            heading: '-IR Verbs (finir — to finish)',
            table: {
              headers: ['Pronoun', 'Conjugation'],
              rows: [
                ['je', 'finis'],
                ['tu', 'finis'],
                ['il/elle', 'finit'],
                ['nous', 'finissons'],
                ['vous', 'finissez'],
                ['ils/elles', 'finissent'],
              ]
            }
          },
          {
            heading: '-RE Verbs (attendre — to wait)',
            table: {
              headers: ['Pronoun', 'Conjugation'],
              rows: [
                ['je', 'attends'],
                ['tu', 'attends'],
                ['il/elle', 'attend'],
                ['nous', 'attendons'],
                ['vous', 'attendez'],
                ['ils/elles', 'attendent'],
              ]
            }
          },
        ],
        examples: [
          { french: 'Je parle français.', english: 'I speak French.' },
          { french: 'Nous finissons le repas.', english: 'We finish the meal.' },
          { french: 'Ils attendent le bus.', english: 'They wait for the bus.' },
        ],
        quiz: [
          { question: 'Conjugate "parler" for "nous":', options: ['parlons', 'parlez', 'parlent', 'parle'], answer: 0 },
          { question: 'What is the nous form of "finir"?', options: ['finissons', 'finons', 'finissez', 'finirons'], answer: 0 },
          { question: 'Il/elle _____ (attendre):', options: ['attend', 'attende', 'attendit', 'attendons'], answer: 0 },
        ]
      },
      {
        id: 'a1-negation',
        title: 'Basic Negation (ne...pas)',
        summary: 'French negation uses two parts: ne before the verb and pas after it.',
        content: [
          {
            heading: 'Structure',
            text: 'Place ne before the conjugated verb and pas after it. The verb is sandwiched between them.',
            list: [
              'Je parle → Je ne parle pas (I do not speak)',
              'Il mange → Il ne mange pas (He does not eat)',
              'Nous sommes → Nous ne sommes pas (We are not)',
            ]
          },
          {
            heading: 'Before Vowels',
            text: 'Ne becomes n\' before a vowel or silent h:',
            list: [
              'J\'aime → Je n\'aime pas (I do not like)',
              'Il habite → Il n\'habite pas (He does not live)',
            ]
          },
          {
            heading: 'Other Negations',
            table: {
              headers: ['Expression', 'Meaning', 'Example'],
              rows: [
                ['ne...jamais', 'never', 'Je ne mange jamais de viande.'],
                ['ne...plus', 'no longer', 'Il ne parle plus.'],
                ['ne...rien', 'nothing', 'Je ne vois rien.'],
                ['ne...personne', 'nobody', 'Je ne connais personne.'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Je ne comprends pas.', english: 'I don\'t understand.' },
          { french: 'Elle ne parle pas anglais.', english: 'She doesn\'t speak English.' },
          { french: 'Nous n\'avons pas faim.', english: 'We are not hungry.' },
        ],
        quiz: [
          { question: 'Which is correct? "I do not eat meat."', options: ['Je pas mange de viande.', 'Je ne mange pas de viande.', 'Je mange ne pas viande.', 'Je ne pas mange viande.'], answer: 1 },
          { question: 'Ne becomes ___ before a vowel:', options: ['n\'', 'ne', 'not', 'ni'], answer: 0 },
          { question: '"Never" in French is:', options: ['ne...plus', 'ne...rien', 'ne...jamais', 'ne...pas'], answer: 2 },
        ]
      }
    ]
  },
  {
    level: 'A2',
    label: 'Elementary',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    headerColor: 'bg-blue-600',
    description: 'Simple sentences, daily routines, past and present tense.',
    topics: [
      {
        id: 'a2-passe-compose',
        title: 'Passé Composé (Past Tense)',
        summary: 'The passé composé is the main past tense for completed actions, formed with avoir or être + past participle.',
        content: [
          {
            heading: 'Formation',
            text: 'Two parts: auxiliary verb (avoir or être) in present tense + past participle.',
            list: [
              'Past participle of -er verbs: remove -er, add -é (parler → parlé)',
              'Past participle of -ir verbs: remove -ir, add -i (finir → fini)',
              'Past participle of -re verbs: remove -re, add -u (attendre → attendu)',
            ]
          },
          {
            heading: 'Verbs with ÊTRE (DR MRS VANDERTRAMP)',
            text: 'About 17 verbs use être as auxiliary. These often involve motion or state change.',
            list: [
              'aller (allé), venir (venu), partir (parti), arriver (arrivé)',
              'naître (né), mourir (mort), rester (resté), tomber (tombé)',
              'All reflexive verbs use être: se lever → je me suis levé(e)',
              'Agreement: past participle agrees with subject in gender/number',
            ]
          },
          {
            heading: 'With AVOIR',
            table: {
              headers: ['Pronoun', 'Parler'],
              rows: [
                ['j\'', 'ai parlé'],
                ['tu', 'as parlé'],
                ['il/elle', 'a parlé'],
                ['nous', 'avons parlé'],
                ['vous', 'avez parlé'],
                ['ils/elles', 'ont parlé'],
              ]
            }
          }
        ],
        examples: [
          { french: 'J\'ai mangé une pomme.', english: 'I ate an apple.' },
          { french: 'Elle est allée au marché.', english: 'She went to the market.' },
          { french: 'Nous avons fini le projet.', english: 'We finished the project.' },
        ],
        quiz: [
          { question: '"Aller" uses which auxiliary in passé composé?', options: ['avoir', 'être', 'either', 'neither'], answer: 1 },
          { question: 'Past participle of "parler" is:', options: ['parlé', 'parli', 'parlu', 'parlant'], answer: 0 },
          { question: 'She went: Elle ___ allée.', options: ['a', 'est', 'ai', 'ont'], answer: 1 },
        ]
      },
      {
        id: 'a2-imparfait',
        title: 'Imparfait (Imperfect Tense)',
        summary: 'The imparfait describes ongoing past states, habitual actions, and background context.',
        content: [
          {
            heading: 'Formation',
            text: 'Take the nous form of the present tense, remove -ons, and add the imparfait endings.',
            table: {
              headers: ['Pronoun', 'Ending', 'Parler example'],
              rows: [
                ['je', '-ais', 'parlais'],
                ['tu', '-ais', 'parlais'],
                ['il/elle', '-ait', 'parlait'],
                ['nous', '-ions', 'parlions'],
                ['vous', '-iez', 'parliez'],
                ['ils/elles', '-aient', 'parlaient'],
              ]
            }
          },
          {
            heading: 'When to use Imparfait vs Passé Composé',
            table: {
              headers: ['Imparfait', 'Passé Composé'],
              rows: [
                ['Ongoing/background action', 'Completed, one-time action'],
                ['Habitual past action', 'Action that interrupts'],
                ['Description, state of mind', 'Sequence of events'],
                ['Il pleuvait (it was raining)', 'Il a plu (it rained — once)'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Quand j\'étais enfant, je jouais au football.', english: 'When I was a child, I used to play football.' },
          { french: 'Il lisait quand elle est arrivée.', english: 'He was reading when she arrived.' },
          { french: 'Nous habitions à Paris.', english: 'We used to live in Paris.' },
        ],
        quiz: [
          { question: 'Which tense describes a past habit?', options: ['Passé composé', 'Imparfait', 'Futur simple', 'Présent'], answer: 1 },
          { question: 'Imparfait stem for "parler" is:', options: ['parl-', 'parla-', 'parlai-', 'parlon-'], answer: 0 },
          { question: '"I was eating" = Je _____ :', options: ['mangeais', 'ai mangé', 'mange', 'mangerais'], answer: 0 },
        ]
      },
      {
        id: 'a2-adjectives',
        title: 'Adjective Agreement & Placement',
        summary: 'French adjectives agree in gender and number with the noun they modify.',
        content: [
          {
            heading: 'Agreement Rules',
            table: {
              headers: ['', 'Masculine', 'Feminine', 'M. Plural', 'F. Plural'],
              rows: [
                ['grand (tall)', 'grand', 'grande', 'grands', 'grandes'],
                ['petit (small)', 'petit', 'petite', 'petits', 'petites'],
                ['beau (beautiful)', 'beau', 'belle', 'beaux', 'belles'],
              ]
            }
          },
          {
            heading: 'Placement',
            text: 'Most adjectives come AFTER the noun in French:',
            list: [
              'un livre intéressant (an interesting book)',
              'une maison bleue (a blue house)',
              'BAGS adjectives go BEFORE: Beauty, Age, Goodness, Size',
              'beau, vieux, bon, mauvais, petit, grand, jeune, nouveau',
            ]
          }
        ],
        examples: [
          { french: 'Un grand homme (a tall man) vs. un homme grand (a tall man — neutral)', english: 'Meaning can shift with placement.' },
          { french: 'Elle a les yeux bleus.', english: 'She has blue eyes.' },
          { french: 'C\'est une belle maison.', english: 'It\'s a beautiful house.' },
        ],
        quiz: [
          { question: 'Feminine form of "petit":', options: ['petite', 'petites', 'petit', 'petis'], answer: 0 },
          { question: 'Where do most adjectives go?', options: ['Before noun', 'After noun', 'Either', 'Before verb'], answer: 1 },
          { question: '"BAGS" adjectives go _____ the noun:', options: ['before', 'after', 'around', 'none'], answer: 0 },
        ]
      }
    ]
  },
  {
    level: 'B1',
    label: 'Intermediate',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    headerColor: 'bg-yellow-600',
    description: 'Longer conversations, travel and work scenarios.',
    topics: [
      {
        id: 'b1-subjunctive',
        title: 'The Subjunctive Mood — Introduction',
        summary: 'The subjunctive expresses doubt, emotion, desire, and obligation. It is triggered by specific conjunctions and verbs.',
        content: [
          {
            heading: 'Formation',
            text: 'Take the ils form of the present tense, remove -ent, add: -e, -es, -e, -ions, -iez, -ent',
            table: {
              headers: ['Pronoun', 'Parler → parlent', 'Finir → finissent'],
              rows: [
                ['que je', 'parle', 'finisse'],
                ['que tu', 'parles', 'finisses'],
                ['qu\'il', 'parle', 'finisse'],
                ['que nous', 'parlions', 'finissions'],
                ['que vous', 'parliez', 'finissiez'],
                ['qu\'ils', 'parlent', 'finissent'],
              ]
            }
          },
          {
            heading: 'When to Use',
            list: [
              'After "il faut que" (it is necessary that): Il faut que tu parles.',
              'After verbs of emotion: être content(e) que, avoir peur que',
              'After verbs of desire: vouloir que, préférer que',
              'After conjunctions: bien que (although), pour que (so that), avant que (before)',
            ]
          }
        ],
        examples: [
          { french: 'Il faut que vous parliez plus lentement.', english: 'You must speak more slowly.' },
          { french: 'Je veux qu\'il vienne.', english: 'I want him to come.' },
          { french: 'Bien qu\'il soit fatigué, il travaille.', english: 'Although he is tired, he works.' },
        ],
        quiz: [
          { question: 'Subjunctive is triggered by:', options: ['Statements of fact', 'Expressions of doubt/emotion', 'Past tense only', 'Questions'], answer: 1 },
          { question: '"Il faut que" is followed by:', options: ['indicatif', 'conditionnel', 'subjonctif', 'infinitif'], answer: 2 },
          { question: 'Subjunctif of "parler" for "que je":', options: ['parle', 'parlais', 'parlera', 'parlant'], answer: 0 },
        ]
      },
      {
        id: 'b1-relative-pronouns',
        title: 'Relative Pronouns (qui, que, dont, où)',
        summary: 'Relative pronouns link clauses together, replacing a noun in the second clause.',
        content: [
          {
            heading: 'The Four Main Relative Pronouns',
            table: {
              headers: ['Pronoun', 'Function', 'Example'],
              rows: [
                ['qui', 'Subject of relative clause', 'L\'homme qui parle est mon père. (The man who is speaking is my father.)'],
                ['que / qu\'', 'Object of relative clause', 'Le livre que je lis est excellent. (The book I am reading is excellent.)'],
                ['dont', 'Replaces de + noun', 'Le film dont tu parles est magnifique. (The film you\'re talking about is magnificent.)'],
                ['où', 'Place or time', 'La ville où j\'habite est Paris. (The city where I live is Paris.)'],
              ]
            }
          },
          {
            heading: 'Key Distinction: qui vs que',
            list: [
              'Qui = subject (followed by a verb): L\'homme qui chante... (The man who sings...)',
              'Que = object (followed by a subject + verb): La chanson que j\'aime... (The song I love...)',
              'Que contracts before vowels: qu\'il, qu\'elle, qu\'on',
            ]
          }
        ],
        examples: [
          { french: 'Le professeur qui enseigne le français est sympa.', english: 'The teacher who teaches French is nice.' },
          { french: 'C\'est la chose dont j\'ai besoin.', english: 'That\'s the thing I need. (avoir besoin de)' },
          { french: 'Le restaurant où nous avons mangé était cher.', english: 'The restaurant where we ate was expensive.' },
        ],
        quiz: [
          { question: '"The book ___ I read" — which pronoun?', options: ['qui', 'que', 'dont', 'où'], answer: 1 },
          { question: '"The man ___ sings" — which pronoun?', options: ['que', 'dont', 'qui', 'où'], answer: 2 },
          { question: '"dont" replaces:', options: ['à + noun', 'de + noun', 'en + noun', 'sur + noun'], answer: 1 },
        ]
      }
    ]
  },
  {
    level: 'B2',
    label: 'Upper Intermediate',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    headerColor: 'bg-orange-600',
    description: 'Nuanced discussion, news comprehension, DELF prep.',
    topics: [
      {
        id: 'b2-subjunctive-advanced',
        title: 'Subjunctive — Advanced Usage',
        summary: 'Going beyond the basics: irregular subjunctives, complex triggers, and when NOT to use it.',
        content: [
          {
            heading: 'Irregular Subjunctives',
            table: {
              headers: ['Verb', 'Que je...', 'Que nous...'],
              rows: [
                ['être', 'sois', 'soyons'],
                ['avoir', 'aie', 'ayons'],
                ['aller', 'aille', 'allions'],
                ['faire', 'fasse', 'fassions'],
                ['pouvoir', 'puisse', 'puissions'],
                ['savoir', 'sache', 'sachions'],
                ['vouloir', 'veuille', 'voulions'],
              ]
            }
          },
          {
            heading: 'Avoiding the Subjunctive',
            text: 'When both clauses share the same subject, use an infinitive instead:',
            list: [
              'Je veux partir (not: Je veux que je parte) — same subject',
              'Il est content de venir (not: Il est content qu\'il vienne)',
              'But: Je veux que TU partes — different subjects, use subjunctive',
            ]
          }
        ],
        examples: [
          { french: 'Bien qu\'il soit parti, elle l\'attend encore.', english: 'Although he has left, she still waits for him.' },
          { french: 'Je doute qu\'il puisse réussir.', english: 'I doubt that he can succeed.' },
          { french: 'Il faut que vous soyez à l\'heure.', english: 'You must be on time.' },
        ],
        quiz: [
          { question: 'Subjonctif of "être" for "que tu":', options: ['es', 'sois', 'soit', 'fusses'], answer: 1 },
          { question: 'Same subject after "vouloir" → use:', options: ['subjunctive', 'infinitive', 'indicatif', 'conditionnel'], answer: 1 },
          { question: '"I doubt that he knows" — "savoir" in subjonctif:', options: ['sache', 'sait', 'savait', 'su'], answer: 0 },
        ]
      },
      {
        id: 'b2-passive',
        title: 'Passive Voice',
        summary: 'The passive voice shifts focus from the actor to the action. Formed with être + past participle.',
        content: [
          {
            heading: 'Formation',
            text: 'être (conjugated in any tense) + past participle (agrees with subject)',
            table: {
              headers: ['Active', 'Passive'],
              rows: [
                ['Le chat mange la souris.', 'La souris est mangée par le chat.'],
                ['On a construit cette maison.', 'Cette maison a été construite.'],
                ['Le directeur signera le document.', 'Le document sera signé par le directeur.'],
              ]
            }
          },
          {
            heading: 'Avoiding Passive with ON',
            text: 'French often uses "on" (one/they/we) instead of the passive:',
            list: [
              'On parle français ici. = Le français est parlé ici.',
              'On a fermé le magasin. = Le magasin a été fermé.',
              'Using "on" is more natural in spoken French.',
            ]
          }
        ],
        examples: [
          { french: 'Le roman a été écrit par Flaubert.', english: 'The novel was written by Flaubert.' },
          { french: 'La tour Eiffel est visitée par des millions de touristes.', english: 'The Eiffel Tower is visited by millions of tourists.' },
          { french: 'Cette loi sera adoptée demain.', english: 'This law will be adopted tomorrow.' },
        ],
        quiz: [
          { question: 'Passive voice uses être + :', options: ['present participle', 'past participle', 'infinitive', 'subjonctif'], answer: 1 },
          { question: '"On" is often used to avoid:', options: ['subjunctive', 'passive voice', 'negation', 'conditionnel'], answer: 1 },
          { question: 'Past participle in passive agrees with:', options: ['the subject', 'the object', 'the verb', 'nothing'], answer: 0 },
        ]
      }
    ]
  },
  {
    level: 'C1',
    label: 'Advanced',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    headerColor: 'bg-purple-600',
    description: 'Academic and professional French, complex structures.',
    topics: [
      {
        id: 'c1-literary-tenses',
        title: 'Literary Tenses (Passé Simple & Subjonctif Imparfait)',
        summary: 'Literary tenses appear in formal writing and classic literature — rarely in speech.',
        content: [
          {
            heading: 'Passé Simple',
            text: 'The passé simple replaces the passé composé in formal/literary narrative writing.',
            table: {
              headers: ['Pronoun', '-er (parler)', '-ir (finir)', '-re (attendre)'],
              rows: [
                ['je', 'parlai', 'finis', 'attendis'],
                ['tu', 'parlas', 'finis', 'attendis'],
                ['il/elle', 'parla', 'finit', 'attendit'],
                ['nous', 'parlâmes', 'finîmes', 'attendîmes'],
                ['vous', 'parlâtes', 'finîtes', 'attendîtes'],
                ['ils/elles', 'parlèrent', 'finirent', 'attendirent'],
              ]
            }
          },
          {
            heading: 'Key Irregulars in Passé Simple',
            table: {
              headers: ['Verb', 'il/elle form'],
              rows: [
                ['être', 'fut'],
                ['avoir', 'eut'],
                ['faire', 'fit'],
                ['venir', 'vint'],
                ['voir', 'vit'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Il naquit en 1832 et mourut en 1910.', english: 'He was born in 1832 and died in 1910.' },
          { french: 'Elle prit son livre et s\'en alla.', english: 'She took her book and left.' },
          { french: 'Ils arrivèrent à Paris un soir d\'hiver.', english: 'They arrived in Paris on a winter evening.' },
        ],
        quiz: [
          { question: 'Passé simple is mainly used in:', options: ['Spoken French', 'Literary/formal writing', 'Questions', 'Negative sentences'], answer: 1 },
          { question: 'Passé simple of "parler" for "il":', options: ['parla', 'parlait', 'a parlé', 'parlera'], answer: 0 },
          { question: 'Irregular passé simple of "être" for "il":', options: ['était', 'est', 'fut', 'sera'], answer: 2 },
        ]
      }
    ]
  },
  {
    level: 'C2',
    label: 'Mastery',
    color: 'bg-red-100 text-red-800 border-red-200',
    headerColor: 'bg-red-700',
    description: 'Near-native proficiency, idioms, cultural and stylistic fluency.',
    topics: [
      {
        id: 'c2-register',
        title: 'Register & Stylistic Variation',
        summary: 'Mastery of French requires shifting between registers: familier, courant, soutenu.',
        content: [
          {
            heading: 'The Three Registers',
            table: {
              headers: ['Register', 'Context', 'Example'],
              rows: [
                ['Familier (Informal)', 'Friends, family, casual speech', '"T\'as vu ça?" (Tu as vu ça?)'],
                ['Courant (Standard)', 'Work, media, everyday writing', '"Avez-vous vu cela?"'],
                ['Soutenu (Formal)', 'Literature, official documents, speeches', '"Avez-vous eu l\'occasion d\'observer ce phénomène?"'],
              ]
            }
          },
          {
            heading: 'Common Informal Reductions',
            table: {
              headers: ['Informal', 'Standard', 'Meaning'],
              rows: [
                ['C\'est pas mal', 'Ce n\'est pas mal', 'It\'s not bad'],
                ['T\'inquiète pas', 'Ne t\'inquiète pas', 'Don\'t worry'],
                ['Y\'a pas de problème', 'Il n\'y a pas de problème', 'No problem'],
                ['J\'suis', 'Je suis', 'I am'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Soutenu: Permettez-moi de vous présenter mes sincères condoléances.', english: 'Formal: Allow me to present my sincere condolences.' },
          { french: 'Familier: T\'inquiète, c\'est bon !', english: 'Informal: Don\'t worry, it\'s fine!' },
        ],
        quiz: [
          { question: '"Soutenu" register is used in:', options: ['Text messages', 'Official speeches & literature', 'Casual chat', 'Social media'], answer: 1 },
          { question: '"T\'as vu ça?" is which register?', options: ['Soutenu', 'Courant', 'Familier', 'Académique'], answer: 2 },
          { question: 'Dropping "ne" in negation is typical of:', options: ['Written French', 'Soutenu register', 'Spoken informal French', 'Literary French'], answer: 2 },
        ]
      }
    ]
  }
]
