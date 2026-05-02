export const businessVocab = [
  { fr: 'le PDG (Président-directeur général)', en: 'CEO', category: 'Roles' },
  { fr: 'le directeur financier', en: 'CFO (Finance Director)', category: 'Roles' },
  { fr: 'le responsable des ressources humaines', en: 'HR Manager', category: 'Roles' },
  { fr: 'le chef de projet', en: 'Project Manager', category: 'Roles' },
  { fr: 'le stagiaire', en: 'Intern', category: 'Roles' },
  { fr: 'le collègue', en: 'Colleague', category: 'Roles' },
  { fr: 'le fournisseur', en: 'Supplier / Vendor', category: 'Roles' },
  { fr: 'le client', en: 'Client / Customer', category: 'Roles' },
  { fr: 'la réunion', en: 'Meeting', category: 'Meetings' },
  { fr: 'l\'ordre du jour', en: 'Agenda', category: 'Meetings' },
  { fr: 'le compte rendu', en: 'Minutes / Report', category: 'Meetings' },
  { fr: 'la visioconférence', en: 'Video conference', category: 'Meetings' },
  { fr: 'prendre la parole', en: 'To take the floor / speak', category: 'Meetings' },
  { fr: 'reporter une réunion', en: 'To postpone a meeting', category: 'Meetings' },
  { fr: 'le budget', en: 'Budget', category: 'Finance' },
  { fr: 'le bilan', en: 'Balance sheet', category: 'Finance' },
  { fr: 'le chiffre d\'affaires', en: 'Turnover / Revenue', category: 'Finance' },
  { fr: 'la marge bénéficiaire', en: 'Profit margin', category: 'Finance' },
  { fr: 'les charges', en: 'Expenses / Costs', category: 'Finance' },
  { fr: 'la facture', en: 'Invoice', category: 'Finance' },
  { fr: 'le devis', en: 'Quote / Estimate', category: 'Finance' },
  { fr: 'le contrat', en: 'Contract', category: 'Legal' },
  { fr: 'la clause', en: 'Clause', category: 'Legal' },
  { fr: 'signer un accord', en: 'To sign an agreement', category: 'Legal' },
  { fr: 'la propriété intellectuelle', en: 'Intellectual property', category: 'Legal' },
  { fr: 'la stratégie', en: 'Strategy', category: 'Strategy' },
  { fr: 'la croissance', en: 'Growth', category: 'Strategy' },
  { fr: 'le marché cible', en: 'Target market', category: 'Strategy' },
  { fr: 'la concurrence', en: 'Competition', category: 'Strategy' },
  { fr: 'l\'appel d\'offres', en: 'Tender / Call for bids', category: 'Strategy' },
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
]

export const businessQuiz = [
  { q: 'How do you say "turnover / revenue" in French?', options: ['le profit', 'le chiffre d\'affaires', 'le budget', 'la marge'], answer: 1 },
  { q: '"Veuillez trouver ci-joint" means:', options: ['Please see below', 'Please find attached', 'Please respond quickly', 'Please contact me'], answer: 1 },
  { q: 'The formal email sign-off "Cordialement" means:', options: ['Best wishes', 'Kind regards', 'Yours faithfully', 'With respect'], answer: 1 },
  { q: 'What is "un devis"?', options: ['An invoice', 'A contract', 'A quote/estimate', 'A receipt'], answer: 2 },
  { q: '"Prétentions salariales" refers to:', options: ['Work experience', 'Job title expectations', 'Salary expectations', 'Holiday entitlement'], answer: 2 },
  { q: 'How do you say "to postpone a meeting"?', options: ['annuler une réunion', 'reporter une réunion', 'organiser une réunion', 'diriger une réunion'], answer: 1 },
]
