🌤️ Mon Application Météo avec Icônes et Animations

Mon Application Météo est une solution interactive et dynamique pour afficher des données météorologiques en temps réel, avec des prévisions avancées, des thèmes personnalisables, des animations modernes et des icônes intégrées pour une meilleure expérience utilisateur.
Table des Matières

    🌟 Fonctionnalités
    📽️ Démo
    🚀 Installation et Configuration
    🛠️ Commandes
    💡 Utilisation
    🌍 Traductions
    🎨 Mode Clair et Mode Sombre
    📂 Structure du Projet
    🛡️ Technologies Utilisées
    🔗 Intégration API
    📸 Captures d’Écran et Vidéos
    ❓ FAQ (Foire Aux Questions)
    🤝 Contributions
    📜 Licence
    📬 Contact

🌟 Fonctionnalités

    🌦️ Météo en Temps Réel : Obtenez instantanément les données météo actuelles.
    ⏱️ Prévisions Horaires et Hebdomadaires : Restez informé avec des prévisions précises.
    🌫️ Indice de Qualité de l'Air (IQA) : Des données détaillées sur la pollution atmosphérique.
    🎨 Thèmes Personnalisables : Basculer facilement entre les modes clair et sombre avec des animations.
    🌐 Options Multilingues : Anglais, Français et Arabe disponibles.
    🌡️ Conversion des Unités : Alternez entre Celsius (°C) et Fahrenheit (°F).
    📱 Design Réactif : Parfaitement adapté aux écrans mobiles, tablettes et ordinateurs.
    ✨ Animations : Transitions fluides et éléments animés pour une expérience captivante.

📽️ Démo

    Démo en Ligne : Voir la Démo 🌍
    Vidéo de Présentation : Regarder la Vidéo 🎥

🚀 Installation et Configuration
📋 Prérequis

    Node.js : Assurez-vous que Node.js (v16+) est installé.
    Gestionnaire de Paquets : NPM ou Yarn.
    Librairies Additionnelles :
        Font Awesome pour les icônes
        Animate.css pour les animations

Étapes d’Installation

    Cloner le Référentiel

git clone https://github.com/votrenomutilisateur/mon-application-meteo.git
cd mon-application-meteo

Installer les Dépendances

npm install

Installer les Librairies Frontend

Ajoutez Font Awesome et Animate.css dans votre projet :

npm install @fortawesome/fontawesome-free animate.css

Lancer le Serveur de Développement

    npm run dev

    Accéder à l’Application
    Ouvrez votre navigateur et rendez-vous sur http://localhost:3000.

🛠️ Commandes

Voici une liste des commandes disponibles pour ce projet :
Commande	Description
npm install	Installe les dépendances du projet.
npm run dev	Lance l'application en mode développement.
npm run build	Construit l'application pour la production.
npm run preview	Prévisualise la version de production localement.
npm run lint	Analyse le code pour détecter les erreurs de style.
💡 Utilisation
🌦️ Rechercher une Ville

    Icône associée : 🏙️
    Entrez le nom d’une ville dans la barre de recherche.
    Animation : Effet de glissement sur l’entrée de texte.

🌡️ Changer d’Unité

    Icône associée : 🔄
    Alternez entre Celsius (°C) et Fahrenheit (°F).
    Animation : Transition douce du changement d’unité.

🎨 Changer de Thème

    Icône associée : 🌞🌜
    Passez du mode clair au mode sombre en un clic.
    Animation : Effet de fondu entre les thèmes.

🌍 Changer de Langue

    Icône associée : 🌐
    Sélectionnez une langue dans le menu des paramètres.
    Animation : Liste déroulante avec une rotation subtile.

🌍 Traductions

L'application prend en charge trois langues avec des icônes adaptées :
Langue	Icône	Code	Traduction Disponible
Anglais	🇺🇸	en	Oui
Français	🇫🇷	fr	Oui
Arabe	🇦🇪	ar	Oui
🎨 Mode Clair et Mode Sombre
Icônes associées

    🌞 Mode Clair : Thème lumineux pour une lecture confortable de jour.
    🌜 Mode Sombre : Idéal pour la nuit ou des environnements à faible luminosité.

Animations

    Transition douce lors du basculement entre les thèmes.
    Ajout d'une ombre progressive pour améliorer la lisibilité.

Personnalisation

Les couleurs sont définies dans src/styles/theme.css :

/* Mode Clair */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --card-color: #f9f9f9;
}

/* Mode Sombre */
[data-theme='dark'] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --card-color: #2a2a2a;
}

✨ Animations et Icônes
Ajout des Animations

Ajoutez les classes d'animation dans vos composants HTML :

<div class="animate__animated animate__fadeIn">
  <h1>Bienvenue dans Mon Application Météo 🌦️</h1>
</div>

Icônes Font Awesome

Exemple d'utilisation des icônes :

<i class="fas fa-cloud-sun"></i> <!-- Icône de météo -->
<i class="fas fa-sync-alt"></i>  <!-- Icône de chargement -->
<i class="fas fa-map-marker-alt"></i> <!-- Icône de localisation -->

📸 Captures d’Écran et Vidéos

    Mode Clair avec Animations

    Mode Sombre avec Icônes

❓ FAQ
Comment personnaliser les animations ?

Modifiez ou ajoutez des classes depuis Animate.css.
Les icônes ne s'affichent pas ?

Vérifiez que Font Awesome est correctement importé dans votre projet.
🤝 Contributions

Vous avez une idée d'amélioration ? Voici comment contribuer :

    Forkez ce dépôt.

    Créez une branche pour votre fonctionnalité.

git checkout -b nouvelle-fonctionnalite

Commitez vos changements avec une description claire.

    git commit -m "Ajout de l'animation pour le mode sombre"

    Poussez vos changements et ouvrez une pull request.

📜 Licence

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.
📬 Contact

    Nom : Votre Nom
    Email : votre-email@example.com

