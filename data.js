// Seul fichier à modifier à chaque nouvelle liste.
// Dates au format AAAA-MM-JJ. "icon" : pot, pasta, fish, sausage, soup, suitcase, chicken, chili, roast.
// altMidi / altSoir : recettes de rechange faites avec les mêmes courses.
window.MENU_DATA = {
  titre: "Menus du 2 au 12 novembre",
  sousTitre: "3 à table · restes le midi",
  jours: [
    { date: "2026-11-02", label: "Lun 2", icon: "pot", midi: "—", soir: "Émincé de porc crème champignons + purée maison",
      altSoir: ["Porc sauté aux champignons + grenailles rissolées", "Porc au curry doux + riz thaï"] },
    { date: "2026-11-03", label: "Mar 3", icon: "pasta", midi: "Restes de porc", soir: "Pâtes bolognaise (double dose)",
      altSoir: ["Hachis parmentier (purée en flocons)", "Boulettes sauce tomate + penne"] },
    { date: "2026-11-04", label: "Mer 4", icon: "fish", midi: "Restes de bolo", soir: "Saumon au four, semoule, haricots verts",
      altSoir: ["Saumon en papillote, poireaux à la crème", "Pâtes au saumon et à la crème"] },
    { date: "2026-11-05", label: "Jeu 5", icon: "sausage", midi: "Restes de bolo", soir: "Chipolatas + lentilles",
      altSoir: ["Chipolatas + purée maison", "Lentilles carottes-oignons et chipolatas mijotées"] },
    { date: "2026-11-06", label: "Ven 6", icon: "soup", midi: "Restes de lentilles", soir: "Croque-monsieur + soupe maison (on en congèle)",
      altSoir: ["Wraps jambon-emmental gratinés + soupe", "Pâtes jambon-crème + soupe"] },
    { date: "2026-11-07", label: "Sam 7", icon: "suitcase", absent: true, note: "Bon week-end ! Rien à cuisiner." },
    { date: "2026-11-08", label: "Dim 8", icon: "suitcase", absent: true, note: "Ce soir : sortir le poulet et le haché du congélo." },
    { date: "2026-11-09", label: "Lun 9", icon: "chicken", midi: "Soupe (du congélo)", soir: "Poulet jaune rôti + grenailles",
      altSoir: ["Poulet au four + haricots verts", "Poulet à la crème et aux champignons + riz"] },
    { date: "2026-11-10", label: "Mar 10", icon: "chili", midi: "Wraps au poulet (restes)", soir: "Chili con carne + riz thaï",
      altMidi: ["Salade de poulet, tomates, concombre"], altSoir: ["Burritos au chili (wraps)", "Pâtes bolognaise express"] },
    { date: "2026-11-11", label: "Mer 11 · férié", icon: "roast", midi: "Rôti de porc, haricots verts, semoule", soir: "Gratin de pâtes jambon-brocolis",
      altMidi: ["Sauté de porc aux carottes + semoule"], altSoir: ["Croque-monsieur + salade", "Pâtes jambon-crème"] },
    { date: "2026-11-12", label: "Jeu 12", icon: "roast", midi: "Restes du rôti", soir: "—" }
  ],
  penseBete: [
    { titre: "Au congélo en rentrant", items: ["Le poulet jaune", "La moitié du haché (farce + steaks) pour le chili", "1,2 kg de porc pour le rôti", "Une partie de la soupe, vendredi"] },
    { titre: "À acheter ailleurs", items: ["Œufs (en rupture au drive)", "Céleri branche, pour la bolo", "Salade (pas de sucrine au drive)"] }
  ],
  courses: [
    { rayon: "Fruits et légumes", items: ["Grenailles 1,5 kg", "Carottes ~1 kg", "Oignons jaunes 3 kg", "Ail 250 g", "Tomates allongées ~500 g", "Concombre", "Champignons blancs 400 g", "Pommes Gala 2,6 kg", "Bananes 1 kg", "Oranges 2 kg"] },
    { rayon: "Viande et poisson", items: ["Épaule de porc 1,9 kg", "Farce à légumes 450 g", "Steaks façon bouchère 15 % et 5 %", "Poulet jaune 1,5 kg", "Filet de saumon 600 g", "Chipolatas x12", "Jambon de Paris x10"] },
    { rayon: "Surgelés", items: ["Haricots verts 1 kg", "Poireaux émincés bio 600 g", "Courgettes en rondelles 1 kg"] },
    { rayon: "Crèmerie", items: ["Beurre moulé demi-sel 500 g", "Crème fraîche 15 % x2", "Emmental 500 g", "Yaourt grec nature x12", "Lait facile à digérer 6 × 1 L", "Pom'Potes x12"] },
    { rayon: "Épicerie", items: ["Spaghetti Panzani 1 kg", "Penne Panzani 500 g", "Riz thaï 1 kg", "Lentilles blondes 500 g", "Purée en flocons 1 kg", "Haricots rouges x2", "Purée de tomates x2", "Épices chili", "Pain de mie complet", "Wraps"] },
    { rayon: "Boissons", items: ["Volvic 8 L x2", "Ondine 6 × 1,5 L"] },
    { rayon: "Maison", items: ["Tablettes lave-vaisselle Apta x20", "Carrés coton bio Pommette", "Maxi carrés Labell"] }
  ]
};
