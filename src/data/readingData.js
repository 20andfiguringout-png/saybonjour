export const readingPassages = [
  {
    id: 'r1',
    level: 'A1',
    title: 'Ma Famille',
    englishTitle: 'My Family',
    text: `Je m'appelle Sophie. J'ai vingt-cinq ans. J'habite à Paris avec ma famille.

Ma famille est petite. J'ai un père, une mère et un frère. Mon père s'appelle Jean. Il est médecin. Ma mère s'appelle Marie. Elle est professeure. Mon frère s'appelle Paul. Il a dix-huit ans.

Nous avons aussi un chien. Il s'appelle Médor. Il est petit et marron.

J'aime ma famille!`,
    questions: [
      { q: 'What is the narrator\'s name?', options: ['Marie', 'Sophie', 'Paul', 'Jean'], answer: 1 },
      { q: 'How old is the narrator?', options: ['18', '21', '25', '30'], answer: 2 },
      { q: 'What does the father do?', options: ['Teacher', 'Doctor', 'Engineer', 'Chef'], answer: 1 },
      { q: 'What is the dog\'s name?', options: ['Fido', 'Rex', 'Médor', 'Bruno'], answer: 2 },
      { q: 'How many siblings does Sophie have?', options: ['None', 'One brother', 'One sister', 'Two brothers'], answer: 1 },
    ],
    vocab: [
      { word: 'la famille', def: 'the family' },
      { word: 'le père', def: 'the father' },
      { word: 'la mère', def: 'the mother' },
      { word: 'le frère', def: 'the brother' },
    ]
  },
  {
    id: 'r2',
    level: 'A2',
    title: 'Le Café Parisien',
    englishTitle: 'The Parisian Café',
    text: `À Paris, les cafés sont partout. Ils font partie de la vie quotidienne des Parisiens.

Le matin, les gens s'arrêtent au café pour prendre un express ou un crème. Beaucoup mangent aussi un croissant ou une tartine beurrée. Les cafés ouvrent tôt — souvent à sept heures du matin.

À midi, le café devient un restaurant. On peut manger un plat du jour, souvent une viande avec des légumes ou un plat de pâtes. Le service est rapide parce que les gens ont seulement une heure pour manger.

Le soir, c'est différent. Les gens restent plus longtemps. Ils boivent un verre de vin ou une bière et parlent avec leurs amis. Les terrasses sont très populaires en été.

Le café est un lieu social important en France.`,
    questions: [
      { q: 'When do cafés typically open?', options: ['6am', '7am', '8am', '9am'], answer: 1 },
      { q: 'What do people typically eat in the morning at a café?', options: ['Sandwich', 'Croissant or buttered bread', 'Omelette', 'Salad'], answer: 1 },
      { q: 'What happens at the café at noon?', options: ['It closes', 'It becomes a restaurant', 'Only drinks are served', 'It gets very quiet'], answer: 1 },
      { q: 'What do people drink in the evening?', options: ['Coffee', 'Tea', 'Wine or beer', 'Water only'], answer: 2 },
      { q: 'What are popular in summer?', options: ['Indoor tables', 'Terraces (outdoor seating)', 'Private rooms', 'Rooftop bars'], answer: 1 },
    ],
    vocab: [
      { word: 'quotidien(ne)', def: 'daily / everyday' },
      { word: 'tôt', def: 'early' },
      { word: 'le plat du jour', def: 'dish of the day' },
      { word: 'la terrasse', def: 'outdoor seating area' },
    ]
  },
  {
    id: 'r3',
    level: 'B1',
    title: 'L\'Intelligence Artificielle',
    englishTitle: 'Artificial Intelligence',
    text: `L'intelligence artificielle (IA) transforme notre société à une vitesse impressionnante. Des assistants vocaux aux voitures autonomes, les applications sont nombreuses et variées.

Dans le domaine médical, l'IA aide les médecins à diagnostiquer les maladies plus rapidement et avec plus de précision. Des algorithmes analysent des milliers d'images médicales pour détecter des anomalies que l'œil humain pourrait manquer.

Cependant, l'IA soulève également des questions éthiques importantes. Qui est responsable lorsqu'une décision automatisée cause du tort? Comment protéger la vie privée des individus dont les données sont utilisées pour entraîner ces systèmes?

Les experts s'accordent sur un point: l'IA ne remplacera pas entièrement les humains, mais elle changera profondément la nature du travail. Les emplois qui nécessitent de la créativité, de l'empathie et du jugement humain seront moins affectés que les tâches répétitives.

En fin de compte, c'est à nous — les citoyens, les législateurs et les entreprises — de façonner l'avenir de cette technologie de manière responsable.`,
    questions: [
      { q: 'In the medical field, what does AI help with?', options: ['Surgery', 'Diagnosing diseases more quickly', 'Prescribing medicine', 'Patient reception'], answer: 1 },
      { q: 'What ethical concern is mentioned?', options: ['AI being too expensive', 'Responsibility for automated decisions', 'AI replacing all jobs', 'Loss of internet access'], answer: 1 },
      { q: 'Which jobs will be LEAST affected by AI?', options: ['Repetitive tasks', 'Data entry', 'Creative and empathy-requiring roles', 'Manufacturing'], answer: 2 },
      { q: 'According to experts, what will AI do to work?', options: ['Replace humans entirely', 'Have no impact', 'Change the nature of work profoundly', 'Only affect science jobs'], answer: 2 },
      { q: 'Who does the author say should shape AI\'s future?', options: ['Only scientists', 'Only governments', 'Citizens, legislators and companies', 'AI itself'], answer: 2 },
    ],
    vocab: [
      { word: 'l\'intelligence artificielle', def: 'artificial intelligence' },
      { word: 'diagnostiquer', def: 'to diagnose' },
      { word: 'soulever une question', def: 'to raise a question' },
      { word: 'la vie privée', def: 'privacy' },
      { word: 'façonner', def: 'to shape' },
    ]
  },
  {
    id: 'r4',
    level: 'B2',
    title: 'Le Changement Climatique',
    englishTitle: 'Climate Change',
    text: `Le changement climatique représente l'un des défis les plus complexes auxquels l'humanité ait jamais été confrontée. La communauté scientifique s'accorde aujourd'hui sur un consensus clair: les activités humaines, notamment la combustion des énergies fossiles et la déforestation, sont les principales causes du réchauffement planétaire observé depuis le XIXe siècle.

Les conséquences se font déjà sentir à l'échelle mondiale: élévation du niveau des mers, multiplication des événements climatiques extrêmes, perturbation des écosystèmes et menace sur la biodiversité. Ces transformations ne touchent pas uniformément les populations; les régions les plus vulnérables, souvent les moins responsables historiquement des émissions, sont paradoxalement les premières à subir les effets les plus graves.

Face à ce constat, deux types de réponses s'imposent: l'atténuation, qui vise à réduire les émissions de gaz à effet de serre, et l'adaptation, qui cherche à préparer les sociétés aux changements inévitables. Or, ces deux approches nécessitent une coopération internationale sans précédent, mettant à l'épreuve les institutions mondiales et la volonté politique des États.

L'accord de Paris de 2015 constitue une avancée symbolique significative, mais les engagements pris restent insuffisants au regard des objectifs climatiques. La question fondamentale demeure: sommes-nous collectivement capables de transformer nos économies et nos modes de vie avant d'atteindre des seuils de non-retour?`,
    questions: [
      { q: 'What does the scientific community agree on?', options: ['Climate change is not real', 'Human activities are the main cause', 'Nature is the main cause', 'The problem is exaggerated'], answer: 1 },
      { q: 'Which regions are paradoxically most affected?', options: ['The most industrialised', 'The most responsible for emissions', 'The most vulnerable, least responsible', 'Cold northern regions'], answer: 2 },
      { q: '"Atténuation" refers to:', options: ['Adapting to change', 'Reducing greenhouse gas emissions', 'Measuring temperature', 'Protecting coastal areas'], answer: 1 },
      { q: 'What does the author say about the Paris Agreement?', options: ['It is sufficient', 'It is symbolic but commitments are insufficient', 'It was rejected', 'It solved the problem'], answer: 1 },
      { q: 'What is the fundamental question posed at the end?', options: ['When was climate change first measured?', 'Whether we can transform economies before reaching points of no return', 'Who signed the Paris Agreement', 'How much will adaptation cost'], answer: 1 },
    ],
    vocab: [
      { word: 'le réchauffement planétaire', def: 'global warming' },
      { word: 'la déforestation', def: 'deforestation' },
      { word: 'l\'atténuation', def: 'mitigation / attenuation' },
      { word: 'les gaz à effet de serre', def: 'greenhouse gases' },
      { word: 'un seuil de non-retour', def: 'a point of no return / tipping point' },
    ]
  },
  {
    id: 'r5',
    level: 'A1',
    title: 'À la Boulangerie',
    englishTitle: 'At the Bakery',
    text: `Chaque matin, Marc va à la boulangerie. La boulangerie s'appelle "Chez Dupont". Elle est dans la rue principale.

Marc aime le pain. Il achète une baguette tous les jours. Parfois, il achète aussi des croissants pour le petit-déjeuner.

La boulangère s'appelle Madame Dupont. Elle est sympathique et souriante. Elle connaît bien Marc.

- Bonjour Marc! La baguette habituelle?
- Oui, s'il vous plaît, et deux croissants aussi.
- Voilà! Ça fait deux euros cinquante.
- Merci, bonne journée!

Marc rentre chez lui. Il mange son croissant avec du café. Délicieux!`,
    questions: [
      { q: 'Where does Marc go every morning?', options: ['Supermarket', 'Bakery', 'School', 'Office'], answer: 1 },
      { q: 'What does Marc buy every day?', options: ['Croissants', 'Cake', 'Baguette', 'Bread rolls'], answer: 2 },
      { q: 'How much does the order cost?', options: ['€1.50', '€2.00', '€2.50', '€3.00'], answer: 2 },
      { q: 'What does Marc eat at home?', options: ['Baguette with butter', 'Croissant with coffee', 'Cake with tea', 'Nothing'], answer: 1 },
      { q: 'How is Madame Dupont described?', options: ['Strict and serious', 'Friendly and smiling', 'Tired', 'New to the job'], answer: 1 },
    ],
    vocab: [
      { word: 'la boulangerie', def: 'bakery' },
      { word: 'la baguette', def: 'French bread stick' },
      { word: 'le petit-déjeuner', def: 'breakfast' },
      { word: 'sympathique', def: 'friendly / nice' },
    ]
  },
]
