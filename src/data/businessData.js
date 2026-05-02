export const businessVocab = [
  // Roles
  { fr: 'le PDG (Président-directeur général)', en: 'CEO', category: 'Roles' },
  { fr: 'le directeur financier (DAF)', en: 'CFO (Finance Director)', category: 'Roles' },
  { fr: 'le responsable des ressources humaines', en: 'HR Manager', category: 'Roles' },
  { fr: 'le chef de projet', en: 'Project Manager', category: 'Roles' },
  { fr: 'le stagiaire / la stagiaire', en: 'Intern', category: 'Roles' },
  { fr: 'le collègue / la collègue', en: 'Colleague', category: 'Roles' },
  { fr: 'le fournisseur', en: 'Supplier / Vendor', category: 'Roles' },
  { fr: 'le client / la cliente', en: 'Client / Customer', category: 'Roles' },
  { fr: 'le directeur commercial', en: 'Sales Director', category: 'Roles' },
  { fr: 'le responsable marketing', en: 'Marketing Manager', category: 'Roles' },
  { fr: 'l\'actionnaire', en: 'Shareholder', category: 'Roles' },
  { fr: 'le sous-traitant', en: 'Subcontractor', category: 'Roles' },

  // Meetings
  { fr: 'la réunion', en: 'Meeting', category: 'Meetings' },
  { fr: 'l\'ordre du jour', en: 'Agenda', category: 'Meetings' },
  { fr: 'le compte rendu', en: 'Minutes / Report', category: 'Meetings' },
  { fr: 'la visioconférence', en: 'Video conference', category: 'Meetings' },
  { fr: 'prendre la parole', en: 'To take the floor / speak', category: 'Meetings' },
  { fr: 'reporter une réunion', en: 'To postpone a meeting', category: 'Meetings' },
  { fr: 'le procès-verbal (PV)', en: 'Official meeting minutes', category: 'Meetings' },
  { fr: 'l\'ordre du jour chargé', en: 'Packed agenda', category: 'Meetings' },
  { fr: 'la salle de conférence', en: 'Conference room', category: 'Meetings' },
  { fr: 'le brainstorming', en: 'Brainstorming session', category: 'Meetings' },

  // Finance
  { fr: 'le budget', en: 'Budget', category: 'Finance' },
  { fr: 'le bilan', en: 'Balance sheet', category: 'Finance' },
  { fr: 'le chiffre d\'affaires', en: 'Turnover / Revenue', category: 'Finance' },
  { fr: 'la marge bénéficiaire', en: 'Profit margin', category: 'Finance' },
  { fr: 'les charges', en: 'Expenses / Costs', category: 'Finance' },
  { fr: 'la facture', en: 'Invoice', category: 'Finance' },
  { fr: 'le devis', en: 'Quote / Estimate', category: 'Finance' },
  { fr: 'le bon de commande', en: 'Purchase order', category: 'Finance' },
  { fr: 'la trésorerie', en: 'Cash flow / Treasury', category: 'Finance' },
  { fr: 'le bénéfice net', en: 'Net profit', category: 'Finance' },
  { fr: 'le déficit', en: 'Deficit', category: 'Finance' },
  { fr: 'les bénéfices', en: 'Profits / Earnings', category: 'Finance' },

  // Legal
  { fr: 'le contrat', en: 'Contract', category: 'Legal' },
  { fr: 'la clause', en: 'Clause', category: 'Legal' },
  { fr: 'signer un accord', en: 'To sign an agreement', category: 'Legal' },
  { fr: 'la propriété intellectuelle', en: 'Intellectual property', category: 'Legal' },
  { fr: 'la clause de confidentialité', en: 'Non-disclosure clause (NDA)', category: 'Legal' },
  { fr: 'la rupture de contrat', en: 'Breach of contract', category: 'Legal' },
  { fr: 'le délai de préavis', en: 'Notice period', category: 'Legal' },
  { fr: 'l\'accord-cadre', en: 'Framework agreement', category: 'Legal' },

  // Strategy
  { fr: 'la stratégie', en: 'Strategy', category: 'Strategy' },
  { fr: 'la croissance', en: 'Growth', category: 'Strategy' },
  { fr: 'le marché cible', en: 'Target market', category: 'Strategy' },
  { fr: 'la concurrence', en: 'Competition', category: 'Strategy' },
  { fr: 'l\'appel d\'offres', en: 'Tender / Call for bids', category: 'Strategy' },
  { fr: 'l\'avantage concurrentiel', en: 'Competitive advantage', category: 'Strategy' },
  { fr: 'le positionnement', en: 'Market positioning', category: 'Strategy' },
  { fr: 'la part de marché', en: 'Market share', category: 'Strategy' },
  { fr: 'le partenariat', en: 'Partnership', category: 'Strategy' },
  { fr: 'la fusion-acquisition', en: 'Merger and acquisition (M&A)', category: 'Strategy' },

  // HR
  { fr: 'l\'entretien d\'embauche', en: 'Job interview', category: 'HR' },
  { fr: 'le CV (curriculum vitae)', en: 'CV / Résumé', category: 'HR' },
  { fr: 'la lettre de motivation', en: 'Cover letter', category: 'HR' },
  { fr: 'la période d\'essai', en: 'Probationary period', category: 'HR' },
  { fr: 'le salaire brut / net', en: 'Gross / Net salary', category: 'HR' },
  { fr: 'les congés payés', en: 'Paid holiday leave', category: 'HR' },
  { fr: 'la fiche de paie', en: 'Pay slip', category: 'HR' },
  { fr: 'le télétravail', en: 'Remote working / Working from home', category: 'HR' },
  { fr: 'la promotion', en: 'Promotion', category: 'HR' },
  { fr: 'la formation continue', en: 'Continuing professional development', category: 'HR' },
]

export const businessPhrases = [
  {
    category: 'Emails & Correspondence',
    phrases: [
      { fr: 'Je me permets de vous contacter au sujet de…', en: 'I am writing to you regarding…' },
      { fr: 'Suite à notre conversation téléphonique…', en: 'Following our phone conversation…' },
      { fr: 'Veuillez trouver ci-joint…', en: 'Please find attached…' },
      { fr: 'Dans l\'attente de votre réponse…', en: 'Awaiting your reply…' },
      { fr: 'Je reste disponible pour tout renseignement complémentaire.', en: 'I remain available for any further information.' },
      { fr: 'Cordialement', en: 'Kind regards' },
      { fr: 'Bien à vous', en: 'Yours sincerely' },
      { fr: 'Je vous remercie de votre message.', en: 'Thank you for your message.' },
      { fr: 'Je me permets de relancer ma candidature…', en: 'I am following up on my application…' },
      { fr: 'Pourriez-vous m\'accuser réception de ce mail?', en: 'Could you acknowledge receipt of this email?' },
      { fr: 'Je vous prie d\'agréer l\'expression de mes salutations distinguées.', en: 'Yours faithfully (most formal closing).' },
    ]
  },
  {
    category: 'Meetings & Negotiations',
    phrases: [
      { fr: 'Pouvons-nous fixer un rendez-vous?', en: 'Can we schedule a meeting?' },
      { fr: 'Je propose que nous passions au point suivant.', en: 'I suggest we move to the next item.' },
      { fr: 'Pourriez-vous clarifier ce point?', en: 'Could you clarify this point?' },
      { fr: 'Nous sommes d\'accord sur les grandes lignes.', en: 'We agree on the broad lines.' },
      { fr: 'Il faudrait revoir les termes de cet accord.', en: 'We would need to review the terms of this agreement.' },
      { fr: 'Nous allons étudier votre proposition.', en: 'We will study your proposal.' },
      { fr: 'C\'est hors de notre budget.', en: 'That is beyond our budget.' },
      { fr: 'Pouvez-vous faire un effort sur le prix?', en: 'Can you make an effort on the price?' },
      { fr: 'Nous avons besoin d\'un délai supplémentaire.', en: 'We need an additional deadline / more time.' },
      { fr: 'Permettez-moi de résumer les points clés.', en: 'Allow me to summarise the key points.' },
      { fr: 'Est-ce que tout le monde est sur la même longueur d\'onde?', en: 'Is everyone on the same page?' },
    ]
  },
  {
    category: 'Presentations',
    phrases: [
      { fr: 'Je vais vous présenter les résultats du trimestre.', en: 'I will present the quarterly results.' },
      { fr: 'Comme vous pouvez le voir sur ce graphique…', en: 'As you can see on this chart…' },
      { fr: 'En conclusion, je dirais que…', en: 'In conclusion, I would say that…' },
      { fr: 'Avez-vous des questions?', en: 'Do you have any questions?' },
      { fr: 'Je vous remercie de votre attention.', en: 'Thank you for your attention.' },
      { fr: 'Pour illustrer ce point, voici un exemple concret.', en: 'To illustrate this point, here is a concrete example.' },
      { fr: 'Passons maintenant à la deuxième partie.', en: 'Let us now move on to the second part.' },
      { fr: 'Ce diagramme montre clairement que…', en: 'This diagram clearly shows that…' },
    ]
  },
  {
    category: 'Telephone & Conference Calls',
    phrases: [
      { fr: 'Allô, je suis bien chez…?', en: 'Hello, is this…? (checking you have the right number)' },
      { fr: 'Pourrais-je parler à Madame Dupont, s\'il vous plaît?', en: 'Could I speak to Ms Dupont, please?' },
      { fr: 'C\'est de la part de qui?', en: 'Who is calling, please?' },
      { fr: 'Elle est en réunion pour le moment.', en: 'She is in a meeting at the moment.' },
      { fr: 'Voulez-vous laisser un message?', en: 'Would you like to leave a message?' },
      { fr: 'Je vous la passe.', en: 'I\'ll put you through to her.' },
      { fr: 'Désolé, vous avez fait un mauvais numéro.', en: 'Sorry, you have the wrong number.' },
      { fr: 'La ligne est mauvaise — pouvez-vous répéter?', en: 'The line is bad — can you repeat?' },
    ]
  },
  {
    category: 'Job Interviews',
    phrases: [
      { fr: 'Pouvez-vous vous présenter brièvement?', en: 'Could you briefly introduce yourself?' },
      { fr: 'Quelles sont vos principales compétences?', en: 'What are your main skills?' },
      { fr: 'Quelles sont vos prétentions salariales?', en: 'What are your salary expectations?' },
      { fr: 'Où vous voyez-vous dans cinq ans?', en: 'Where do you see yourself in five years?' },
      { fr: 'Je suis passionné(e) par ce secteur depuis…', en: 'I have been passionate about this sector since…' },
      { fr: 'J\'ai eu l\'occasion de développer mes compétences en…', en: 'I had the opportunity to develop my skills in…' },
      { fr: 'Je suis disponible immédiatement / sous préavis d\'un mois.', en: 'I am available immediately / with one month\'s notice.' },
    ]
  },
]

export const businessDialogues = [
  {
    id: 'd1',
    title: 'Un entretien d\'embauche',
    englishTitle: 'A job interview',
    level: 'B1',
    lines: [
      { speaker: 'Recruteur', text: 'Bonjour, je suis Pierre Dubois, DRH de la société. Asseyez-vous, je vous en prie.' },
      { speaker: 'Candidat', text: 'Bonjour Monsieur Dubois. Merci de me recevoir.' },
      { speaker: 'Recruteur', text: 'Pouvez-vous vous présenter brièvement?' },
      { speaker: 'Candidat', text: 'Bien sûr. Je m\'appelle Sophie Martin. J\'ai cinq ans d\'expérience dans le marketing digital.' },
      { speaker: 'Recruteur', text: 'Qu\'est-ce qui vous attire dans ce poste?' },
      { speaker: 'Candidat', text: 'Je suis passionnée par l\'innovation et votre entreprise est leader dans ce domaine.' },
      { speaker: 'Recruteur', text: 'Quelles sont vos prétentions salariales?' },
      { speaker: 'Candidat', text: 'Je vise un salaire de 45 000 euros brut annuel, mais je suis ouverte à la discussion.' },
    ],
    notes: [
      'DRH = Directeur(trice) des Ressources Humaines (HR Director)',
      'prétentions salariales = salary expectations',
      'brut = gross (before tax); net = after tax',
    ]
  },
  {
    id: 'd2',
    title: 'Une réunion d\'équipe',
    englishTitle: 'A team meeting',
    level: 'B1',
    lines: [
      { speaker: 'Manager', text: 'Bonjour à tous. Commençons par le point sur les ventes du mois dernier.' },
      { speaker: 'Équipe', text: 'Les ventes ont augmenté de 12% par rapport au mois précédent.' },
      { speaker: 'Manager', text: 'Excellent! Quelles sont les actions prévues pour ce mois-ci?' },
      { speaker: 'Équipe', text: 'Nous allons lancer une campagne sur les réseaux sociaux et contacter de nouveaux prospects.' },
      { speaker: 'Manager', text: 'Très bien. Est-ce qu\'il y a des obstacles que vous avez rencontrés?' },
      { speaker: 'Équipe', text: 'Oui, nous avons des problèmes de délais avec certains fournisseurs.' },
      { speaker: 'Manager', text: 'D\'accord. Nous allons traiter ce problème en priorité. Merci à tous.' },
    ],
    notes: [
      'par rapport au = compared to',
      'prospects = potential clients / leads',
      'délais = deadlines / lead times',
    ]
  },
  {
    id: 'd3',
    title: 'Une négociation commerciale',
    englishTitle: 'A commercial negotiation',
    level: 'B2',
    lines: [
      { speaker: 'Acheteur', text: 'Bonjour. Nous avons examiné votre devis et il dépasse notre budget initial.' },
      { speaker: 'Vendeur', text: 'Je comprends votre position. Quelle est votre fourchette de prix?' },
      { speaker: 'Acheteur', text: 'Nous envisageons un budget de 15 000 euros pour ce projet.' },
      { speaker: 'Vendeur', text: 'C\'est un peu serré, mais nous pouvons envisager une réduction si vous vous engagez sur un contrat de deux ans.' },
      { speaker: 'Acheteur', text: 'Un contrat de deux ans, c\'est possible. Quelles garanties proposez-vous?' },
      { speaker: 'Vendeur', text: 'Une garantie complète de 24 mois et un service après-vente dédié.' },
      { speaker: 'Acheteur', text: 'Très bien. Nous allons étudier votre proposition et revenir vers vous d\'ici vendredi.' },
      { speaker: 'Vendeur', text: 'Parfait. Je vous prépare un avenant au contrat en tenant compte de ces éléments.' },
    ],
    notes: [
      'fourchette de prix = price range',
      'serré = tight (here: budget is tight)',
      'avenant = amendment / addendum to a contract',
      'service après-vente = after-sales service',
    ]
  },
  {
    id: 'd4',
    title: 'Un appel téléphonique professionnel',
    englishTitle: 'A professional phone call',
    level: 'A2',
    lines: [
      { speaker: 'Secrétaire', text: 'Cabinet Legrand, bonjour. Comment puis-je vous aider?' },
      { speaker: 'Appelant', text: 'Bonjour, je souhaiterais parler à Monsieur Legrand, s\'il vous plaît.' },
      { speaker: 'Secrétaire', text: 'C\'est de la part de qui?' },
      { speaker: 'Appelant', text: 'Je suis Thomas Bernard, de la société Innov\'Tech.' },
      { speaker: 'Secrétaire', text: 'Monsieur Legrand est en réunion en ce moment. Souhaitez-vous laisser un message?' },
      { speaker: 'Appelant', text: 'Oui, pouvez-vous lui dire de me rappeler dès que possible? Mon numéro est le 06 12 34 56 78.' },
      { speaker: 'Secrétaire', text: 'Très bien, je lui transmettrai votre message. Bonne journée, Monsieur Bernard.' },
      { speaker: 'Appelant', text: 'Merci, bonne journée à vous.' },
    ],
    notes: [
      'Cabinet = firm / practice (law, medical, etc.)',
      'Je lui transmettrai = I will pass on (your message) to him',
      'Rappeler = to call back',
    ]
  },
]

export const businessQuiz = [
  { q: 'How do you say "turnover / revenue" in French?', options: ['le profit', 'le chiffre d\'affaires', 'le budget', 'la marge'], answer: 1 },
  { q: '"Veuillez trouver ci-joint" means:', options: ['Please see below', 'Please find attached', 'Please respond quickly', 'Please contact me'], answer: 1 },
  { q: 'The formal email sign-off "Cordialement" means:', options: ['Best wishes', 'Kind regards', 'Yours faithfully', 'With respect'], answer: 1 },
  { q: 'What is "un devis"?', options: ['An invoice', 'A contract', 'A quote/estimate', 'A receipt'], answer: 2 },
  { q: '"Prétentions salariales" refers to:', options: ['Work experience', 'Job title expectations', 'Salary expectations', 'Holiday entitlement'], answer: 2 },
  { q: 'How do you say "to postpone a meeting"?', options: ['annuler une réunion', 'reporter une réunion', 'organiser une réunion', 'diriger une réunion'], answer: 1 },
  { q: '"Le télétravail" means:', options: ['A work phone', 'Remote working / WFH', 'Overtime', 'Training'], answer: 1 },
  { q: '"La trésorerie" refers to:', options: ['Treasury / cash flow', 'Turnover', 'Balance sheet', 'Profit margin'], answer: 0 },
  { q: '"C\'est de la part de qui?" is said when:', options: ['Ending a meeting', 'Asking who is calling', 'Requesting a quote', 'Signing a contract'], answer: 1 },
  { q: 'What does "la période d\'essai" mean?', options: ['The trial period / probation', 'The notice period', 'The pay slip', 'The annual review'], answer: 0 },
]
