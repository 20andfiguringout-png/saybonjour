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
        id: 'a1-etre-avoir',
        title: 'Être & Avoir — The Two Core Verbs',
        summary: 'Être (to be) and avoir (to have) are the most important verbs in French. Both are irregular and must be memorised.',
        content: [
          {
            heading: 'Être (to be)',
            table: {
              headers: ['Pronoun', 'Conjugation', 'Meaning'],
              rows: [
                ['je', 'suis', 'I am'],
                ['tu', 'es', 'you are'],
                ['il / elle / on', 'est', 'he/she/one is'],
                ['nous', 'sommes', 'we are'],
                ['vous', 'êtes', 'you are (formal/plural)'],
                ['ils / elles', 'sont', 'they are'],
              ]
            }
          },
          {
            heading: 'Avoir (to have)',
            table: {
              headers: ['Pronoun', 'Conjugation', 'Meaning'],
              rows: [
                ['je', 'ai', 'I have'],
                ['tu', 'as', 'you have'],
                ['il / elle / on', 'a', 'he/she/one has'],
                ['nous', 'avons', 'we have'],
                ['vous', 'avez', 'you have'],
                ['ils / elles', 'ont', 'they have'],
              ]
            }
          },
          {
            heading: 'Common Avoir Expressions',
            text: 'Avoir is used in many fixed expressions where English uses "to be":',
            list: [
              'avoir faim — to be hungry (literally: to have hunger)',
              'avoir soif — to be thirsty',
              'avoir froid / chaud — to be cold / hot',
              'avoir peur — to be afraid',
              'avoir raison / tort — to be right / wrong',
              'avoir l\'air — to seem / look',
            ]
          }
        ],
        examples: [
          { french: 'Je suis étudiant.', english: 'I am a student.' },
          { french: 'Elle a vingt ans.', english: 'She is twenty years old.' },
          { french: 'Nous avons faim — on va manger?', english: 'We\'re hungry — shall we eat?' },
        ],
        quiz: [
          { question: '"We are" in French:', options: ['nous avons', 'nous sommes', 'nous êtes', 'nous sont'], answer: 1 },
          { question: '"I have" in French:', options: ['je suis', 'j\'ai', 'j\'es', 'j\'est'], answer: 1 },
          { question: '"Avoir faim" literally means:', options: ['to be hungry', 'to have hunger', 'to feel hot', 'to be tired'], answer: 1 },
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
      },
      {
        id: 'a1-numbers-time',
        title: 'Numbers, Days & Time (les chiffres, les jours, l\'heure)',
        summary: 'Numbers 1–100, days of the week, and how to tell the time in French.',
        content: [
          {
            heading: 'Numbers 1–20',
            table: {
              headers: ['Number', 'French', 'Number', 'French'],
              rows: [
                ['1', 'un / une', '11', 'onze'],
                ['2', 'deux', '12', 'douze'],
                ['3', 'trois', '13', 'treize'],
                ['4', 'quatre', '14', 'quatorze'],
                ['5', 'cinq', '15', 'quinze'],
                ['6', 'six', '16', 'seize'],
                ['7', 'sept', '17', 'dix-sept'],
                ['8', 'huit', '18', 'dix-huit'],
                ['9', 'neuf', '19', 'dix-neuf'],
                ['10', 'dix', '20', 'vingt'],
              ]
            }
          },
          {
            heading: 'Tens & Patterns',
            list: [
              '30 = trente, 40 = quarante, 50 = cinquante, 60 = soixante',
              '70 = soixante-dix (60+10), 80 = quatre-vingts (4×20)',
              '90 = quatre-vingt-dix (4×20+10)',
              '100 = cent, 1000 = mille',
              'Compound numbers use a hyphen: vingt-deux (22)',
            ]
          },
          {
            heading: 'Days of the Week',
            list: [
              'lundi (Monday), mardi (Tuesday), mercredi (Wednesday)',
              'jeudi (Thursday), vendredi (Friday)',
              'samedi (Saturday), dimanche (Sunday)',
              'Days are NOT capitalised in French',
              'Use "le lundi" for every Monday; "lundi" for this Monday',
            ]
          },
          {
            heading: 'Telling the Time',
            text: 'Use "Il est..." to say what time it is. France uses the 24-hour clock in formal contexts.',
            list: [
              'Il est deux heures. — It is 2 o\'clock.',
              'Il est deux heures et demie. — It is 2:30.',
              'Il est deux heures et quart. — It is 2:15.',
              'Il est deux heures moins le quart. — It is 1:45.',
              'Il est midi / minuit. — It is noon / midnight.',
            ]
          }
        ],
        examples: [
          { french: 'Il est trois heures et quart.', english: 'It is quarter past three.' },
          { french: 'J\'ai cours le lundi et le mercredi.', english: 'I have class on Mondays and Wednesdays.' },
          { french: 'Il y a soixante-dix étudiants dans l\'école.', english: 'There are seventy students in the school.' },
        ],
        quiz: [
          { question: 'How do you say 80 in French?', options: ['huitante', 'octante', 'quatre-vingts', 'quatre-vingts-zéro'], answer: 2 },
          { question: 'How do you say "It is 2:30"?', options: ['Il est deux heures moins demie', 'Il est deux heures et demie', 'Il est demi-deux', 'Il est deux heures trente'], answer: 1 },
          { question: 'Days of the week in French are:', options: ['Capitalised', 'Not capitalised', 'Only capitalised on Sundays', 'Capitalised in writing only'], answer: 1 },
        ]
      },
      {
        id: 'a1-questions',
        title: 'Asking Questions — Three Ways',
        summary: 'French has three equally correct ways to form questions, from casual to formal.',
        content: [
          {
            heading: 'Method 1 — Intonation (most casual)',
            text: 'Simply raise your voice at the end of a statement:',
            list: [
              'Tu parles français? — Do you speak French?',
              'Elle travaille ici? — Does she work here?',
              'Vous avez une chambre? — Do you have a room?',
            ]
          },
          {
            heading: 'Method 2 — Est-ce que (neutral)',
            text: 'Add "Est-ce que" before the subject:',
            list: [
              'Est-ce que tu parles français? — Do you speak French?',
              'Est-ce qu\'il habite ici? — Does he live here?',
              'Est-ce que vous avez une chambre? — Do you have a room?',
            ]
          },
          {
            heading: 'Method 3 — Inversion (formal)',
            text: 'Invert the subject pronoun and verb, joined by a hyphen:',
            list: [
              'Parles-tu français? — Do you speak French?',
              'Travaille-t-elle ici? (insert -t- between vowels)',
              'Avez-vous une chambre? — Do you have a room?',
            ]
          },
          {
            heading: 'Question Words',
            table: {
              headers: ['French', 'English', 'Example'],
              rows: [
                ['Qui', 'Who', 'Qui est là? (Who is there?)'],
                ['Quoi / Que', 'What', 'Qu\'est-ce que tu fais? (What are you doing?)'],
                ['Où', 'Where', 'Où habitez-vous? (Where do you live?)'],
                ['Quand', 'When', 'Quand arrive-t-il? (When does he arrive?)'],
                ['Pourquoi', 'Why', 'Pourquoi pleures-tu? (Why are you crying?)'],
                ['Comment', 'How', 'Comment allez-vous? (How are you?)'],
                ['Combien', 'How much/many', 'Combien ça coûte? (How much does it cost?)'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Est-ce que tu aimes le café?', english: 'Do you like coffee?' },
          { french: 'Où est la gare?', english: 'Where is the train station?' },
          { french: 'Pourquoi est-ce qu\'il part si tôt?', english: 'Why is he leaving so early?' },
        ],
        quiz: [
          { question: 'Which method is most formal?', options: ['Intonation', 'Est-ce que', 'Inversion', 'All equal'], answer: 2 },
          { question: '"Where" in French is:', options: ['quand', 'comment', 'où', 'pourquoi'], answer: 2 },
          { question: 'To avoid a vowel clash in inversion, you insert:', options: ['-s-', '-t-', '-n-', '-r-'], answer: 1 },
        ]
      },
      {
        id: 'a1-prepositions',
        title: 'Prepositions of Place & Movement',
        summary: 'Basic prepositions tell you where things are and where you\'re going.',
        content: [
          {
            heading: 'Location Prepositions',
            table: {
              headers: ['French', 'English', 'Example'],
              rows: [
                ['dans', 'in / inside', 'Le chat est dans la boîte.'],
                ['sur', 'on / on top of', 'Le livre est sur la table.'],
                ['sous', 'under', 'Le chien est sous le lit.'],
                ['devant', 'in front of', 'Il attend devant l\'école.'],
                ['derrière', 'behind', 'La voiture est derrière la maison.'],
                ['entre', 'between', 'La banque est entre l\'hôtel et la pharmacie.'],
                ['à côté de', 'next to', 'La bibliothèque est à côté du parc.'],
                ['en face de', 'opposite / across from', 'La boulangerie est en face de la mairie.'],
              ]
            }
          },
          {
            heading: 'À vs En — Cities, Countries, Regions',
            text: 'Use à for cities, en/au/aux for countries:',
            list: [
              'Je suis à Paris. (à + city)',
              'Je suis en France. (en + feminine country)',
              'Je suis au Canada. (au = à + le, masculine country)',
              'Je suis aux États-Unis. (aux + plural country)',
            ]
          }
        ],
        examples: [
          { french: 'Le café est à côté de la pharmacie.', english: 'The café is next to the pharmacy.' },
          { french: 'Mon stylo est sous le cahier.', english: 'My pen is under the notebook.' },
          { french: 'Elle habite en Espagne, mais son ami est au Japon.', english: 'She lives in Spain, but her friend is in Japan.' },
        ],
        quiz: [
          { question: 'Which preposition means "between"?', options: ['devant', 'entre', 'sous', 'sur'], answer: 1 },
          { question: '"In Paris" in French is:', options: ['en Paris', 'dans Paris', 'à Paris', 'au Paris'], answer: 2 },
          { question: '"Au" is a contraction of:', options: ['à + la', 'à + le', 'en + le', 'de + le'], answer: 1 },
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
      },
      {
        id: 'a2-futur-simple',
        title: 'Futur Simple (Simple Future)',
        summary: 'Use the futur simple to talk about future plans and predictions. Formed by adding endings directly to the infinitive.',
        content: [
          {
            heading: 'Formation',
            text: 'For -er and -ir verbs, add endings to the infinitive. For -re verbs, drop the final -e first.',
            table: {
              headers: ['Pronoun', 'Ending', 'Parler', 'Finir', 'Attendre'],
              rows: [
                ['je', '-ai', 'parlerai', 'finirai', 'attendrai'],
                ['tu', '-as', 'parleras', 'finiras', 'attendras'],
                ['il/elle', '-a', 'parlera', 'finira', 'attendra'],
                ['nous', '-ons', 'parlerons', 'finirons', 'attendrons'],
                ['vous', '-ez', 'parlerez', 'finirez', 'attendrez'],
                ['ils/elles', '-ont', 'parleront', 'finiront', 'attendront'],
              ]
            }
          },
          {
            heading: 'Key Irregular Futures',
            table: {
              headers: ['Verb', 'Future stem', 'Je form'],
              rows: [
                ['être', 'ser-', 'je serai'],
                ['avoir', 'aur-', 'j\'aurai'],
                ['aller', 'ir-', 'j\'irai'],
                ['faire', 'fer-', 'je ferai'],
                ['pouvoir', 'pourr-', 'je pourrai'],
                ['venir', 'viendr-', 'je viendrai'],
                ['voir', 'verr-', 'je verrai'],
              ]
            }
          },
          {
            heading: 'Futur Proche vs Futur Simple',
            text: 'Futur proche (aller + infinitive) is used for near or certain future events:',
            list: [
              'Je vais partir demain. (near future, decided)',
              'Je partirai un jour. (future simple, more distant or hypothetical)',
            ]
          }
        ],
        examples: [
          { french: 'Demain, il fera beau.', english: 'Tomorrow, the weather will be nice.' },
          { french: 'Nous partirons en vacances en juillet.', english: 'We will go on holiday in July.' },
          { french: 'Est-ce que tu viendras à la fête?', english: 'Will you come to the party?' },
        ],
        quiz: [
          { question: 'Future stem of "être" is:', options: ['ét-', 'ér-', 'ser-', 'êtr-'], answer: 2 },
          { question: '"Nous parlerons" means:', options: ['We were speaking', 'We speak', 'We will speak', 'We had spoken'], answer: 2 },
          { question: 'Futur proche uses:', options: ['être + infinitive', 'aller + infinitive', 'avoir + infinitive', 'devoir + infinitive'], answer: 1 },
        ]
      },
      {
        id: 'a2-reflexive-verbs',
        title: 'Reflexive Verbs (Verbes Pronominaux)',
        summary: 'Reflexive verbs include a pronoun that refers back to the subject. They are very common in daily routine descriptions.',
        content: [
          {
            heading: 'Reflexive Pronouns',
            table: {
              headers: ['Subject', 'Reflexive Pronoun', 'Example (se lever — to get up)'],
              rows: [
                ['je', 'me (m\')', 'je me lève'],
                ['tu', 'te (t\')', 'tu te lèves'],
                ['il/elle', 'se (s\')', 'il se lève'],
                ['nous', 'nous', 'nous nous levons'],
                ['vous', 'vous', 'vous vous levez'],
                ['ils/elles', 'se (s\')', 'ils se lèvent'],
              ]
            }
          },
          {
            heading: 'Common Reflexive Verbs',
            list: [
              's\'appeler — to be called (Je m\'appelle Marie)',
              'se lever — to get up (Je me lève à 7h)',
              'se coucher — to go to bed',
              'se laver — to wash oneself',
              'se réveiller — to wake up',
              'se dépêcher — to hurry',
              's\'habiller — to get dressed',
              'se souvenir de — to remember',
            ]
          },
          {
            heading: 'Negation & Passé Composé',
            list: [
              'Negation: Je ne me lève pas. (ne goes before the pronoun)',
              'Past tense: always use être as auxiliary',
              'Je me suis levé(e) à 8h. — I got up at 8.',
              'Agreement: past participle agrees with subject',
            ]
          }
        ],
        examples: [
          { french: 'Je me réveille à six heures tous les jours.', english: 'I wake up at six o\'clock every day.' },
          { french: 'Nous nous retrouvons au café à midi.', english: 'We meet up at the café at noon.' },
          { french: 'Elle s\'est couchée très tard hier soir.', english: 'She went to bed very late last night.' },
        ],
        quiz: [
          { question: 'Reflexive pronoun for "nous" is:', options: ['me', 'se', 'nous', 'vous'], answer: 2 },
          { question: 'Reflexive verbs in the passé composé use:', options: ['avoir', 'être', 'either', 'aller'], answer: 1 },
          { question: '"Je m\'appelle" means:', options: ['I call you', 'My name is / I am called', 'I call myself up', 'I remember'], answer: 1 },
        ]
      },
      {
        id: 'a2-pronouns',
        title: 'Direct & Indirect Object Pronouns',
        summary: 'Object pronouns replace nouns to avoid repetition. Direct objects receive the action directly; indirect objects use a preposition (à).',
        content: [
          {
            heading: 'Direct Object Pronouns',
            table: {
              headers: ['Person', 'Pronoun', 'Example'],
              rows: [
                ['1st singular', 'me (m\')', 'Il me voit. (He sees me.)'],
                ['2nd singular', 'te (t\')', 'Je te comprends. (I understand you.)'],
                ['3rd m. singular', 'le (l\')', 'Je le mange. (I eat it/him.)'],
                ['3rd f. singular', 'la (l\')', 'Je la connais. (I know her/it.)'],
                ['1st plural', 'nous', 'Elle nous invite. (She invites us.)'],
                ['2nd plural', 'vous', 'Je vous aide. (I help you.)'],
                ['3rd plural', 'les', 'Il les aime. (He loves them.)'],
              ]
            }
          },
          {
            heading: 'Indirect Object Pronouns',
            text: 'Used when the verb construction requires à (parler à, donner à, téléphoner à...)',
            table: {
              headers: ['Person', 'Pronoun', 'Example'],
              rows: [
                ['1st singular', 'me (m\')', 'Il me parle. (He speaks to me.)'],
                ['2nd singular', 'te (t\')', 'Je te téléphone. (I\'ll call you.)'],
                ['3rd singular', 'lui', 'Je lui donne le livre. (I give him/her the book.)'],
                ['1st plural', 'nous', 'Il nous écrit. (He writes to us.)'],
                ['2nd plural', 'vous', 'Je vous envoie un email. (I send you an email.)'],
                ['3rd plural', 'leur', 'Elle leur explique. (She explains to them.)'],
              ]
            }
          },
          {
            heading: 'Placement Rule',
            text: 'Object pronouns go BEFORE the conjugated verb:',
            list: [
              'Je le mange. → Je ne le mange pas. (not: Je mange le pas)',
              'In infinitive constructions: Je vais le faire. (I\'m going to do it.)',
              'Imperative positive: Mange-le! (Eat it!) — goes after the verb',
            ]
          }
        ],
        examples: [
          { french: 'Tu connais Marie? Oui, je la connais bien.', english: 'Do you know Marie? Yes, I know her well.' },
          { french: 'Je lui ai donné mon numéro.', english: 'I gave him/her my number.' },
          { french: 'Ce gâteau? Je vais le manger ce soir.', english: 'That cake? I\'m going to eat it tonight.' },
        ],
        quiz: [
          { question: 'Direct object pronoun for "them" is:', options: ['leur', 'lui', 'les', 'le'], answer: 2 },
          { question: 'Indirect pronoun for "him/her" is:', options: ['le/la', 'lui', 'leur', 'se'], answer: 1 },
          { question: 'Object pronouns go ___ the conjugated verb:', options: ['after', 'before', 'at the end', 'in the middle'], answer: 1 },
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
                ['qui', 'Subject of relative clause', 'L\'homme qui parle est mon père.'],
                ['que / qu\'', 'Object of relative clause', 'Le livre que je lis est excellent.'],
                ['dont', 'Replaces de + noun', 'Le film dont tu parles est magnifique.'],
                ['où', 'Place or time', 'La ville où j\'habite est Paris.'],
              ]
            }
          },
          {
            heading: 'Key Distinction: qui vs que',
            list: [
              'Qui = subject (followed by a verb): L\'homme qui chante...',
              'Que = object (followed by a subject + verb): La chanson que j\'aime...',
              'Que contracts before vowels: qu\'il, qu\'elle, qu\'on',
            ]
          }
        ],
        examples: [
          { french: 'Le professeur qui enseigne le français est sympa.', english: 'The teacher who teaches French is nice.' },
          { french: 'C\'est la chose dont j\'ai besoin.', english: 'That\'s the thing I need.' },
          { french: 'Le restaurant où nous avons mangé était cher.', english: 'The restaurant where we ate was expensive.' },
        ],
        quiz: [
          { question: '"The book ___ I read" — which pronoun?', options: ['qui', 'que', 'dont', 'où'], answer: 1 },
          { question: '"The man ___ sings" — which pronoun?', options: ['que', 'dont', 'qui', 'où'], answer: 2 },
          { question: '"dont" replaces:', options: ['à + noun', 'de + noun', 'en + noun', 'sur + noun'], answer: 1 },
        ]
      },
      {
        id: 'b1-conditionnel',
        title: 'The Conditional Tense',
        summary: 'The conditionnel expresses hypothetical situations, polite requests, and "would" in English. It combines the future stem with imperfect endings.',
        content: [
          {
            heading: 'Formation',
            text: 'Future stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient)',
            table: {
              headers: ['Pronoun', 'Parler', 'Être', 'Avoir'],
              rows: [
                ['je', 'parlerais', 'serais', 'aurais'],
                ['tu', 'parlerais', 'serais', 'aurais'],
                ['il/elle', 'parlerait', 'serait', 'aurait'],
                ['nous', 'parlerions', 'serions', 'aurions'],
                ['vous', 'parleriez', 'seriez', 'auriez'],
                ['ils/elles', 'parleraient', 'seraient', 'auraient'],
              ]
            }
          },
          {
            heading: 'Uses of the Conditional',
            list: [
              'Polite requests: Pourriez-vous m\'aider? (Could you help me?)',
              'Wishes: Je voudrais un café. (I would like a coffee.)',
              'Hypotheticals: Si j\'avais de l\'argent, je voyagerais. (If I had money, I would travel.)',
              'Reported speech: Il a dit qu\'il viendrait. (He said he would come.)',
              'Rumours / unverified facts: Le suspect serait à Paris. (The suspect is reportedly in Paris.)',
            ]
          },
          {
            heading: 'Conditional with Si-clauses',
            table: {
              headers: ['If clause (si)', 'Main clause', 'Example'],
              rows: [
                ['Imparfait', 'Conditionnel présent', 'Si j\'avais le temps, je lirais plus.'],
                ['Plus-que-parfait', 'Conditionnel passé', 'Si j\'avais su, je serais venu.'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Je voudrais une chambre avec vue sur la mer.', english: 'I would like a room with a sea view.' },
          { french: 'Si elle étudiait plus, elle réussirait.', english: 'If she studied more, she would succeed.' },
          { french: 'Pourriez-vous répéter, s\'il vous plaît?', english: 'Could you please repeat that?' },
        ],
        quiz: [
          { question: 'Conditionnel uses the future stem + which endings?', options: ['Présent', 'Imparfait', 'Subjonctif', 'Futur'], answer: 1 },
          { question: '"I would like" in French is:', options: ['je voulais', 'je voudrais', 'je veuxdrais', 'j\'aurais voulu'], answer: 1 },
          { question: 'In a si-clause (hypothetical present), the si clause uses:', options: ['futur', 'conditionnel', 'imparfait', 'subjonctif'], answer: 2 },
        ]
      },
      {
        id: 'b1-gerondif',
        title: 'The Gerund (Le Gérondif)',
        summary: 'The gerund expresses two actions happening simultaneously, or describes how/when/why something is done.',
        content: [
          {
            heading: 'Formation',
            text: 'En + present participle. Form the present participle: nous form → remove -ons → add -ant.',
            table: {
              headers: ['Infinitive', 'Nous form', 'Participle', 'Gérondif'],
              rows: [
                ['parler', 'parlons', 'parlant', 'en parlant'],
                ['finir', 'finissons', 'finissant', 'en finissant'],
                ['faire', 'faisons', 'faisant', 'en faisant'],
                ['lire', 'lisons', 'lisant', 'en lisant'],
              ]
            }
          },
          {
            heading: 'Three Irregular Participles',
            list: [
              'être → étant',
              'avoir → ayant',
              'savoir → sachant',
            ]
          },
          {
            heading: 'Uses of the Gérondif',
            list: [
              'Simultaneity: Il chante en cuisinant. (He sings while cooking.)',
              'How: Elle améliore son français en regardant des films. (She improves her French by watching films.)',
              'Condition: En travaillant mieux, tu réussiras. (By working better, you will succeed.)',
              'The subject of both verbs must be the same.',
            ]
          }
        ],
        examples: [
          { french: 'Il apprend le français en écoutant des podcasts.', english: 'He learns French by listening to podcasts.' },
          { french: 'Elle chantait en faisant la vaisselle.', english: 'She was singing while doing the dishes.' },
          { french: 'En arrivant à la gare, j\'ai vu mon ami.', english: 'On arriving at the station, I saw my friend.' },
        ],
        quiz: [
          { question: 'The gérondif is formed with:', options: ['à + infinitive', 'de + infinitive', 'en + present participle', 'pour + infinitive'], answer: 2 },
          { question: 'Irregular present participle of "être":',  options: ['estant', 'étant', 'êtrant', 'soyant'], answer: 1 },
          { question: '"En mangeant" means:', options: ['in order to eat', 'while eating / by eating', 'before eating', 'after eating'], answer: 1 },
        ]
      },
      {
        id: 'b1-countries-prepositions',
        title: 'Prepositions with Countries, Cities & Transport',
        summary: 'French uses different prepositions depending on the grammatical gender of the country and the mode of transport.',
        content: [
          {
            heading: 'Countries & Regions',
            table: {
              headers: ['Type', 'Preposition', 'Example'],
              rows: [
                ['City', 'à', 'à Paris, à Tokyo, à Londres'],
                ['Feminine country', 'en', 'en France, en Espagne, en Chine'],
                ['Masculine country', 'au', 'au Canada, au Japon, au Maroc'],
                ['Plural country', 'aux', 'aux États-Unis, aux Pays-Bas'],
                ['Feminine region', 'en', 'en Bretagne, en Provence'],
                ['Masculine region', 'dans le', 'dans le Midi, dans le Nord'],
              ]
            }
          },
          {
            heading: 'Transport Prepositions',
            table: {
              headers: ['Transport', 'Preposition', 'Example'],
              rows: [
                ['Car / taxi / bus', 'en', 'en voiture, en taxi, en bus'],
                ['Train', 'en / par le', 'en train / par le train'],
                ['Plane', 'en / par avion', 'en avion'],
                ['Boat', 'en bateau', 'en bateau'],
                ['Bike / motorbike', 'à vélo, à moto', 'Je vais au travail à vélo.'],
                ['On foot', 'à pied', 'J\'y vais à pied.'],
              ]
            }
          }
        ],
        examples: [
          { french: 'Je suis allé au Portugal en avion.', english: 'I went to Portugal by plane.' },
          { french: 'Elle habite en Belgique mais travaille aux Pays-Bas.', english: 'She lives in Belgium but works in the Netherlands.' },
          { french: 'Je vais au bureau à vélo tous les matins.', english: 'I cycle to the office every morning.' },
        ],
        quiz: [
          { question: 'Which preposition goes with "Japon" (masculine country)?', options: ['en', 'à', 'au', 'aux'], answer: 2 },
          { question: '"By plane" in French is:', options: ['à avion', 'en avion', 'par un avion', 'avec avion'], answer: 1 },
          { question: '"On foot" in French is:', options: ['à pied', 'en pied', 'par pied', 'avec les pieds'], answer: 0 },
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
      },
      {
        id: 'b2-indirect-speech',
        title: 'Indirect Speech (Le Discours Indirect)',
        summary: 'Indirect speech reports what someone said without quoting their exact words. Verb tenses and pronouns shift when the reporting verb is in the past.',
        content: [
          {
            heading: 'Sequence of Tenses',
            text: 'When the reporting verb (dire, expliquer, annoncer...) is in the past, the reported speech tense shifts back:',
            table: {
              headers: ['Direct Speech', 'Indirect Speech (after past verb)'],
              rows: [
                ['Présent → "Je suis fatigué."', 'Imparfait → Il a dit qu\'il était fatigué.'],
                ['Passé composé → "J\'ai mangé."', 'Plus-que-parfait → Il a dit qu\'il avait mangé.'],
                ['Futur → "Je viendrai."', 'Conditionnel → Il a dit qu\'il viendrait.'],
                ['Impératif → "Viens!"', 'De + infinitif → Il m\'a dit de venir.'],
              ]
            }
          },
          {
            heading: 'Pronoun & Time Reference Changes',
            list: [
              '"Je" → "il/elle" (speaker becomes third person)',
              '"ici" → "là"',
              '"maintenant" → "alors / à ce moment-là"',
              '"aujourd\'hui" → "ce jour-là"',
              '"demain" → "le lendemain"',
              '"hier" → "la veille"',
            ]
          },
          {
            heading: 'Indirect Questions',
            list: [
              'Yes/no questions: si → Il m\'a demandé si je parlais français.',
              'Qu\'est-ce que → ce que: Il a demandé ce que je faisais.',
              'Où, quand, comment, pourquoi — stay the same: Il a demandé où j\'habitais.',
            ]
          }
        ],
        examples: [
          { french: 'Elle a dit qu\'elle viendrait demain. → "Je viendrai demain."', english: 'She said she would come the next day. → "I will come tomorrow."' },
          { french: 'Il m\'a demandé si j\'aimais le cinéma.', english: 'He asked me if I liked cinema.' },
          { french: 'Le professeur a expliqué que les élèves devaient étudier davantage.', english: 'The teacher explained that the students needed to study more.' },
        ],
        quiz: [
          { question: 'In indirect speech after a past verb, the présent becomes:', options: ['passé composé', 'plus-que-parfait', 'imparfait', 'futur'], answer: 2 },
          { question: '"Viens!" (come!) in indirect speech becomes:', options: ['qu\'il vienne', 'de venir', 'qu\'il est venu', 'viendrait'], answer: 1 },
          { question: 'For yes/no indirect questions, use:', options: ['que', 'si', 'ce que', 'quoi'], answer: 1 },
        ]
      },
      {
        id: 'b2-discourse-markers',
        title: 'Connectors & Discourse Markers',
        summary: 'Linking words and expressions structure your writing and speech, making it coherent and sophisticated.',
        content: [
          {
            heading: 'Addition & Contrast',
            table: {
              headers: ['French', 'English', 'Register'],
              rows: [
                ['De plus / en outre', 'Moreover / Furthermore', 'Formal'],
                ['Cependant / néanmoins', 'However / Nevertheless', 'Formal'],
                ['En revanche / par contre', 'On the other hand', 'Neutral/Informal'],
                ['Pourtant', 'Yet / Still', 'Neutral'],
                ['Bien que + subjonctif', 'Although', 'Formal'],
                ['Or', 'Now / But (argumentative)', 'Formal written'],
              ]
            }
          },
          {
            heading: 'Cause & Consequence',
            table: {
              headers: ['French', 'English', 'Usage'],
              rows: [
                ['Car', 'Because / For', 'Written only'],
                ['Puisque', 'Since / Given that', 'Obvious cause'],
                ['C\'est pourquoi / voilà pourquoi', 'That\'s why', 'Neutral'],
                ['Ainsi / donc', 'Thus / So', 'Conclusion'],
                ['Par conséquent', 'As a result', 'Formal'],
                ['C\'est la raison pour laquelle', 'That is the reason why', 'Formal'],
              ]
            }
          },
          {
            heading: 'Structuring an Argument',
            list: [
              'Introduction: Tout d\'abord / En premier lieu... (First of all...)',
              'Second point: Ensuite / Par ailleurs... (Furthermore...)',
              'Concession: Certes... mais... (Admittedly... but...)',
              'Conclusion: En conclusion / Pour conclure... (In conclusion...)',
            ]
          }
        ],
        examples: [
          { french: 'Ce projet est intéressant; cependant, il présente quelques risques.', english: 'This project is interesting; however, it presents some risks.' },
          { french: 'Puisque vous êtes d\'accord, nous pouvons commencer.', english: 'Since you agree, we can start.' },
          { french: 'Certes, il travaille beaucoup, mais il manque d\'organisation.', english: 'Admittedly, he works a lot, but he lacks organisation.' },
        ],
        quiz: [
          { question: '"Car" is used only in:', options: ['spoken French', 'informal speech', 'written French', 'questions'], answer: 2 },
          { question: '"En revanche" means:', options: ['As a result', 'Moreover', 'On the other hand', 'Therefore'], answer: 2 },
          { question: '"C\'est pourquoi" introduces:', options: ['a cause', 'a consequence', 'a concession', 'an addition'], answer: 1 },
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
      },
      {
        id: 'c1-plusqueparfait',
        title: 'Pluperfect & Sequence of Tenses',
        summary: 'The plus-que-parfait (pluperfect) expresses an action completed before another past action. Mastering it is key for advanced storytelling.',
        content: [
          {
            heading: 'Formation',
            text: 'Auxiliary verb (avoir / être) in the imparfait + past participle',
            table: {
              headers: ['Pronoun', 'Avoir verbs (manger)', 'Être verbs (partir)'],
              rows: [
                ['j\'', 'avais mangé', 'étais parti(e)'],
                ['tu', 'avais mangé', 'étais parti(e)'],
                ['il/elle', 'avait mangé', 'était parti(e)'],
                ['nous', 'avions mangé', 'étions partis/parties'],
                ['vous', 'aviez mangé', 'étiez partis/parties'],
                ['ils/elles', 'avaient mangé', 'étaient partis/parties'],
              ]
            }
          },
          {
            heading: 'Sequence of Tenses in Past Narrative',
            table: {
              headers: ['Tense', 'Role', 'Example'],
              rows: [
                ['Passé composé', 'Main completed events', 'Il est arrivé, il a vu, il a agi.'],
                ['Imparfait', 'Background / ongoing state', 'Il faisait nuit. Il pleuvait.'],
                ['Plus-que-parfait', 'Events before the main story', 'Il avait déjà mangé quand elle est arrivée.'],
              ]
            }
          },
          {
            heading: 'Key Trigger Phrases',
            list: [
              'après que + plus-que-parfait: Après qu\'il eut fini...',
              'avant que + subjonctif (not plus-que-parfait)',
              'quand / lorsque + plus-que-parfait: Quand il avait fini, il sortait.',
              'déjà, à peine, vite: signals anteriority',
            ]
          }
        ],
        examples: [
          { french: 'Quand je suis arrivé, ils avaient déjà mangé.', english: 'When I arrived, they had already eaten.' },
          { french: 'Elle ne savait pas qu\'il était parti.', english: 'She didn\'t know that he had left.' },
          { french: 'Il avait étudié toute la nuit, mais il a quand même raté l\'examen.', english: 'He had studied all night, but he still failed the exam.' },
        ],
        quiz: [
          { question: 'Plus-que-parfait uses auxiliary in:', options: ['présent', 'futur', 'imparfait', 'passé simple'], answer: 2 },
          { question: '"They had already left" = Ils ___ déjà partis:', options: ['ont', 'sont', 'étaient', 'avaient'], answer: 2 },
          { question: 'The plus-que-parfait describes an action that occurred ___ another past action:', options: ['after', 'during', 'before', 'at the same time as'], answer: 2 },
        ]
      },
      {
        id: 'c1-nominalization',
        title: 'Nominalization & Abstract Nouns',
        summary: 'Nominalization — turning verbs and adjectives into nouns — is a hallmark of sophisticated written French.',
        content: [
          {
            heading: 'Common Nominalization Patterns',
            table: {
              headers: ['Pattern', 'Example verb/adj', 'Noun form'],
              rows: [
                ['-tion / -sion', 'décider → ', 'la décision'],
                ['-ment', 'développer → ', 'le développement'],
                ['-ure', 'ouvrir → ', 'l\'ouverture'],
                ['-age', 'atterrir → ', 'l\'atterrissage'],
                ['-ance / -ence', 'résister → ', 'la résistance'],
                ['-ité', 'complexe → ', 'la complexité'],
                ['-eur / -eur', 'chaud → ', 'la chaleur'],
              ]
            }
          },
          {
            heading: 'Why Nominalization Matters',
            text: 'Formal French text (academic papers, journalism, official documents) prefers noun phrases over verbal structures:',
            list: [
              'Informal: On a décidé de partir tôt.',
              'Formal: La décision de partir tôt a été prise.',
              'Informal: Les étudiants travaillent davantage.',
              'Formal: Une intensification du travail étudiant a été observée.',
            ]
          },
          {
            heading: 'False Friends in Nominalization',
            list: [
              '"information" is feminine in French: une information',
              '"développement" does NOT take an accent on the first é',
              '"une manifestation" = a demonstration (not a party)',
            ]
          }
        ],
        examples: [
          { french: 'La mise en œuvre de ce projet nécessite une planification rigoureuse.', english: 'The implementation of this project requires rigorous planning.' },
          { french: 'L\'augmentation du chômage a entraîné une baisse de la consommation.', english: 'The rise in unemployment led to a drop in consumption.' },
          { french: 'Le renforcement des liens culturels est au cœur de notre politique.', english: 'The strengthening of cultural ties is at the heart of our policy.' },
        ],
        quiz: [
          { question: 'Nominalization turns ___ into nouns:', options: ['only verbs', 'only adjectives', 'verbs and adjectives', 'adverbs only'], answer: 2 },
          { question: 'Noun form of "décider" is:', options: ['décidure', 'décision', 'décidement', 'décidance'], answer: 1 },
          { question: 'Why is nominalization important in French?', options: ['It\'s used in casual speech', 'It marks formal / academic register', 'It avoids subjunctive', 'It replaces passé simple'], answer: 1 },
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
      },
      {
        id: 'c2-rhetorical-devices',
        title: 'French Rhetorical Devices',
        summary: 'Near-native speakers recognise and use classical rhetorical figures in speech and writing — from the chiasme to the litote.',
        content: [
          {
            heading: 'Key Rhetorical Figures',
            table: {
              headers: ['Figure', 'Definition', 'Example'],
              rows: [
                ['Anaphore', 'Repetition at the start of successive clauses', '"Travailler, travailler, toujours travailler." (Flaubert)'],
                ['Chiasme', 'Reversed parallel structure (ABBA)', '"Il faut manger pour vivre, et non vivre pour manger." (Molière)'],
                ['Antithèse', 'Contrasting ideas in parallel', '"C\'est une honte de vivre dans l\'abondance et de mourir dans la misère."'],
                ['Litote', 'Understatement (saying less to mean more)', '"Ce n\'est pas mauvais." = It\'s very good.'],
                ['Euphémisme', 'Softening a harsh reality', '"Il nous a quittés." = He died.'],
                ['Oxymore', 'Contradictory words combined', '"Une obscure clarté" (Corneille)'],
              ]
            }
          },
          {
            heading: 'The Litote in French',
            text: 'The litote is deeply embedded in French cultural communication — especially understatement and irony:',
            list: [
              '"Ce n\'est pas mal du tout." = It\'s actually very good.',
              '"Ce n\'est pas sans intérêt." = It\'s quite interesting.',
              '"Il ne manque pas de culot." = He has a lot of nerve.',
              '"Je ne suis pas mécontent." = I\'m quite pleased.',
            ]
          },
          {
            heading: 'The Euphemism in Formal Contexts',
            list: [
              '"Licencier" → "mettre fin à sa collaboration" (to fire → to end one\'s collaboration)',
              '"Mourir" → "s\'éteindre / nous quitter / disparaître"',
              '"Vieillir" → "prendre de l\'âge" (to age → to gain years)',
              '"Prison" → "établissement pénitentiaire"',
            ]
          }
        ],
        examples: [
          { french: '"Il ne manque pas d\'audace." — C\'est une litote.', english: '"He is not lacking in audacity." — An understatement (he\'s very bold).' },
          { french: '"Partir, c\'est mourir un peu; mourir, c\'est partir beaucoup."', english: '"To leave is to die a little; to die is to leave a great deal." — Chiasme.' },
          { french: 'Mon père nous a quittés il y a dix ans.', english: 'My father passed away ten years ago. (euphémisme)' },
        ],
        quiz: [
          { question: 'A litote says ___ than what is meant:', options: ['more', 'less', 'exactly', 'the opposite'], answer: 1 },
          { question: '"Il faut manger pour vivre, non vivre pour manger" is a:', options: ['anaphore', 'chiasme', 'euphémisme', 'oxymore'], answer: 1 },
          { question: '"Il nous a quittés" is an example of:', options: ['litote', 'oxymore', 'euphémisme', 'antithèse'], answer: 2 },
        ]
      },
      {
        id: 'c2-idiomatic-expressions',
        title: 'Advanced Idiomatic Expressions',
        summary: 'C2-level French is marked by idiomatic fluency — fixed expressions, proverbs, and culturally loaded phrases that can\'t be translated literally.',
        content: [
          {
            heading: 'Body-Based Idioms',
            table: {
              headers: ['Expression', 'Literal meaning', 'Real meaning'],
              rows: [
                ['Casser les pieds', 'To break the feet', 'To annoy, to bore someone to death'],
                ['Avoir le cafard', 'To have the cockroach', 'To feel down / depressed'],
                ['Prendre la tête', 'To take the head', 'To annoy / to overthink things'],
                ['Avoir le coup de foudre', 'To have the lightning strike', 'To fall in love at first sight'],
                ['Donner sa langue au chat', 'To give one\'s tongue to the cat', 'To give up guessing'],
                ['Poser un lapin à quelqu\'un', 'To stand a rabbit to someone', 'To stand someone up'],
              ]
            }
          },
          {
            heading: 'Common French Proverbs',
            list: [
              '"Mieux vaut tard que jamais." — Better late than never.',
              '"Vouloir, c\'est pouvoir." — Where there\'s a will, there\'s a way.',
              '"Chaque chose en son temps." — Everything in its own time.',
              '"L\'habit ne fait pas le moine." — Don\'t judge a book by its cover.',
              '"Qui ne risque rien n\'a rien." — Nothing ventured, nothing gained.',
            ]
          },
          {
            heading: 'Fixed Expressions in Formal Contexts',
            list: [
              '"Être à la hauteur de" — to be up to the task / to meet expectations',
              '"Faire fi de" — to disregard, to dismiss',
              '"Mettre en lumière" — to highlight, to bring to light',
              '"Prendre acte de" — to take note of formally',
              '"Dans le cadre de" — in the context/framework of',
            ]
          }
        ],
        examples: [
          { french: 'J\'avais le cafard après son départ — j\'avais vraiment eu le coup de foudre.', english: 'I was feeling down after he left — I had truly fallen in love at first sight.' },
          { french: 'Il m\'a posé un lapin hier soir. Ça m\'a vraiment cassé les pieds!', english: 'He stood me up last night. That really annoyed me!' },
          { french: 'Cette étude met en lumière les inégalités persistantes dans le système.', english: 'This study highlights the persistent inequalities in the system.' },
        ],
        quiz: [
          { question: '"Avoir le cafard" means:', options: ['To be excited', 'To feel depressed', 'To be hungry', 'To be surprised'], answer: 1 },
          { question: '"Poser un lapin à quelqu\'un" means:', options: ['To give a gift', 'To stand someone up', 'To surprise someone', 'To ask a favour'], answer: 1 },
          { question: '"L\'habit ne fait pas le moine" is equivalent to:', options: ['Clothes make the man', 'Don\'t judge a book by its cover', 'Actions speak louder than words', 'The early bird catches the worm'], answer: 1 },
        ]
      }
    ]
  }
]
