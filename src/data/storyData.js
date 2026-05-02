export const stories = [
  {
    id: 'airport',
    title: 'Arrivée à Paris',
    englishTitle: 'Arriving in Paris',
    level: 'A2',
    intro: 'You\'ve just landed at Charles de Gaulle airport. Your French adventure begins!',
    coverEmoji: '✈️',
    nodes: {
      start: {
        text: 'Vous descendez de l\'avion à l\'aéroport Charles de Gaulle. Un agent de sécurité vous approche.',
        agent: '👮 Agent: "Bonjour! Votre passeport, s\'il vous plaît."',
        choices: [
          { label: 'Give your passport and say "Voilà, monsieur."', next: 'customs_polite', xp: 5 },
          { label: 'Say "Je l\'ai perdu!" (I lost it!)', next: 'customs_problem', xp: 2 },
        ]
      },
      customs_polite: {
        text: 'L\'agent vérifie votre passeport avec un sourire.',
        agent: '👮 Agent: "Merci. Bienvenue en France! Bonne visite!"',
        choices: [
          { label: 'Ask "Où est la sortie?" (Where is the exit?)', next: 'find_exit', xp: 5 },
          { label: 'Ask "Y a-t-il un bureau de change ici?" (Is there an exchange bureau here?)', next: 'exchange', xp: 5 },
        ]
      },
      customs_problem: {
        text: 'L\'agent est inquiet. Il appelle ses collègues.',
        agent: '👮 Agent: "Ne vous inquiétez pas. Venez avec moi au bureau."',
        tip: '💡 Tip: Always keep your passport safe when travelling!',
        choices: [
          { label: '"En fait, je l\'ai trouvé!" (Actually, I found it!)', next: 'customs_polite', xp: 3 },
        ]
      },
      find_exit: {
        text: 'L\'agent vous indique la direction.',
        agent: '👮 Agent: "Prenez l\'escalier roulant, puis tournez à gauche."',
        choices: [
          { label: 'Say "Merci beaucoup!" and follow the directions', next: 'taxi_stand', xp: 5 },
          { label: 'Say "Je ne comprends pas, pouvez-vous répéter?" (I don\'t understand, can you repeat?)', next: 'repeat_directions', xp: 5 },
        ]
      },
      exchange: {
        text: 'L\'agent vous montre une pancarte.',
        agent: '👮 Agent: "Oui, le bureau de change est au niveau 2, près des sorties."',
        choices: [
          { label: 'Go to the bureau de change', next: 'at_exchange', xp: 5 },
          { label: 'Decide to use an ATM instead — "Je vais chercher un distributeur."', next: 'taxi_stand', xp: 3 },
        ]
      },
      repeat_directions: {
        text: 'The agent speaks more slowly.',
        agent: '👮 Agent: "D\'accord. Escalier roulant... à gauche... et voilà — la sortie!"',
        choices: [
          { label: '"Ah, je comprends maintenant! Merci!"', next: 'taxi_stand', xp: 5 },
        ]
      },
      at_exchange: {
        text: 'Vous êtes au bureau de change.',
        agent: '💱 Employé: "Bonjour! Je peux vous aider?"',
        choices: [
          { label: '"Je voudrais changer 100 livres sterling en euros, s\'il vous plaît."', next: 'taxi_stand', xp: 10 },
          { label: '"Quel est le taux de change aujourd\'hui?" (What\'s the exchange rate today?)', next: 'taxi_stand', xp: 10 },
        ]
      },
      taxi_stand: {
        text: 'Vous êtes dehors. Il y a une file de taxis devant vous.',
        agent: '🚕 Chauffeur: "Bonjour! Où voulez-vous aller?"',
        choices: [
          { label: '"Je voudrais aller à l\'hôtel Lumière, dans le 9ème arrondissement."', next: 'in_taxi', xp: 10 },
          { label: 'Take the RER train instead — "Je cherche le RER B, s\'il vous plaît."', next: 'rer_train', xp: 10 },
        ]
      },
      in_taxi: {
        text: 'Dans le taxi, le chauffeur est bavard.',
        agent: '🚕 Chauffeur: "C\'est votre première fois à Paris?"',
        choices: [
          { label: '"Oui, c\'est ma première fois. Je suis très excité(e)!"', next: 'hotel_arrival', xp: 5 },
          { label: '"Non, je suis déjà venu(e) deux fois."', next: 'hotel_arrival', xp: 5 },
        ]
      },
      rer_train: {
        text: 'Un passant vous montre la direction du RER.',
        agent: '🧑 Passant: "Le RER B? C\'est par là, au fond du terminal."',
        choices: [
          { label: '"Merci infiniment!" and follow the signs', next: 'hotel_arrival', xp: 5 },
        ]
      },
      hotel_arrival: {
        text: 'Vous arrivez à votre hôtel. La réceptionniste vous accueille avec un grand sourire.',
        agent: '🏨 Réceptionniste: "Bonsoir et bienvenue! Vous avez une réservation?"',
        choices: [
          { label: '"Oui, au nom de [votre nom]. J\'ai réservé une chambre double."', next: 'end_success', xp: 10 },
          { label: '"Euh... j\'espère? Je crois avoir réservé en ligne."', next: 'end_success', xp: 5 },
        ]
      },
      end_success: {
        text: 'La réceptionniste vous remet votre clé.',
        agent: '🏨 Réceptionniste: "Voici votre clé — chambre 304, au 3ème étage. Bonne nuit et bonne visite à Paris!"',
        choices: [],
        isEnd: true,
        endMessage: '🎉 Bravo! You made it through your first evening in Paris! Your French carried you all the way from the airport to your hotel room.',
      },
    }
  },
  {
    id: 'cafe',
    title: 'Au Café Parisien',
    englishTitle: 'At a Parisian Café',
    level: 'A1',
    intro: 'It\'s morning in Paris. You want to enjoy a classic French breakfast at a local café.',
    coverEmoji: '☕',
    nodes: {
      start: {
        text: 'Vous entrez dans un petit café charmant. Le serveur vous voit arriver.',
        agent: '🧑‍🍳 Serveur: "Bonjour! Une table pour combien de personnes?"',
        choices: [
          { label: '"Pour une personne, s\'il vous plaît."', next: 'seated', xp: 5 },
          { label: '"Pour deux personnes — j\'attends un ami."', next: 'seated_two', xp: 5 },
        ]
      },
      seated: {
        text: 'Le serveur vous installe près de la fenêtre — quelle belle vue sur la rue!',
        agent: '🧑‍🍳 Serveur: "Voilà. Je vous apporte la carte."',
        choices: [
          { label: 'Look at the menu and order "Un café et un croissant, s\'il vous plaît."', next: 'order_basic', xp: 5 },
          { label: 'Ask "Qu\'est-ce que vous recommandez?" (What do you recommend?)', next: 'recommendation', xp: 5 },
        ]
      },
      seated_two: {
        text: 'Le serveur vous installe à une grande table.',
        agent: '🧑‍🍳 Serveur: "Très bien. Voilà la carte."',
        choices: [
          { label: 'Order for yourself: "Un café crème, s\'il vous plaît."', next: 'order_basic', xp: 5 },
        ]
      },
      recommendation: {
        text: 'The waiter smiles proudly.',
        agent: '🧑‍🍳 Serveur: "Notre spécialité, c\'est le tartine au beurre avec confiture maison et un grand café crème."',
        choices: [
          { label: '"Parfait! Je prends ça, merci."', next: 'order_special', xp: 10 },
          { label: '"Juste un espresso, merci."', next: 'order_basic', xp: 5 },
        ]
      },
      order_basic: {
        text: 'Le serveur note votre commande.',
        agent: '🧑‍🍳 Serveur: "Très bien. Ce sera prêt dans deux minutes."',
        choices: [
          { label: 'Wait and enjoy the atmosphere', next: 'food_arrives', xp: 3 },
          { label: 'Ask for the WiFi — "Avez-vous le WiFi?"', next: 'wifi', xp: 5 },
        ]
      },
      order_special: {
        text: 'Le serveur est ravi de votre choix.',
        agent: '🧑‍🍳 Serveur: "Excellent choix! Ce sera prêt dans cinq minutes."',
        choices: [
          { label: 'Wait and enjoy the view', next: 'food_arrives', xp: 3 },
        ]
      },
      wifi: {
        text: 'The waiter writes the password on a napkin.',
        agent: '🧑‍🍳 Serveur: "Bien sûr! Le code est café2024. Voilà!"',
        choices: [
          { label: '"Merci beaucoup!"', next: 'food_arrives', xp: 5 },
        ]
      },
      food_arrives: {
        text: 'Le serveur apporte votre commande.',
        agent: '🧑‍🍳 Serveur: "Voilà pour vous. Bon appétit!"',
        choices: [
          { label: '"Merci! C\'est délicieux!"', next: 'bill', xp: 5 },
          { label: 'Ask "Puis-je avoir un peu plus de sucre?" (Could I have a little more sugar?)', next: 'sugar', xp: 5 },
        ]
      },
      sugar: {
        text: 'The waiter quickly brings sugar.',
        agent: '🧑‍🍳 Serveur: "Mais bien sûr! Voilà."',
        choices: [
          { label: '"Merci, vous êtes gentil!"', next: 'bill', xp: 5 },
        ]
      },
      bill: {
        text: 'Vous avez fini. Il est temps de payer.',
        agent: '🧑‍🍳 Serveur: "Autre chose?"',
        choices: [
          { label: '"Non merci, l\'addition s\'il vous plaît!"', next: 'end_success', xp: 5 },
          { label: '"Un autre café, s\'il vous plaît."', next: 'second_coffee', xp: 3 },
        ]
      },
      second_coffee: {
        text: 'Le serveur vous apporte un deuxième café.',
        agent: '🧑‍🍳 Serveur: "Voilà!"',
        choices: [
          { label: '"L\'addition s\'il vous plaît!" (the bill)', next: 'end_success', xp: 5 },
        ]
      },
      end_success: {
        text: 'Le serveur vous apporte l\'addition. Vous laissez un pourboire.',
        agent: '🧑‍🍳 Serveur: "Merci beaucoup! Bonne journée et à bientôt!"',
        choices: [],
        isEnd: true,
        endMessage: '☕ Félicitations! You had a perfect French café experience. The croissants were délicieux and your French was magnifique!',
      },
    }
  }
]
