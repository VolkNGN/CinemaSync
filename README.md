# Créateurs
Alex & Sidney

# MovieSync

MovieSync est une application web développée avec React permettant aux utilisateurs de rechercher des films, de consulter les détails des films et de les ajouter à leurs favoris.

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Contributions](#contributions)

## Aperçu

MovieSync offre une interface conviviale pour explorer les films populaires, les tendances actuelles et gérer une liste de favoris. Vous pouvez également consulter les détails de chaque film, y compris des bandes-annonces et des informations détaillées.

## Fonctionnalités

- Consultation des films populaires et des tendances actuelles.
- Ajout et suppression de films dans les favoris.
- Visualisation des détails des films y compris les bandes-annonces.
- Interface utilisateur réactive et conviviale.

## Technologies

- React
- React Router
- CSS
- TMDB API (The Movie Database)
- YouTube IFrame API

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/VolkNGN/MovieSync.git

   Accédez au répertoire du projet :

bash
Copier le code
cd MovieSync
Installez les dépendances :

bash
Copier le code
npm install
Créez un fichier .env à la racine du projet et ajoutez-y vos clés API :

env
Copier le code
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
Utilisation
Lancez l'application :

bash
Copier le code
npm start
Ouvrez votre navigateur et accédez à http://localhost:3000.


## Structure du Projet
bash
Copier le code
MovieSync/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── BackgroundAccueil/
│   │   │   ├── BackgroundAccueil.jsx
│   │   │   └── BackgroundAccueil.css
│   │   ├── FavoriteMovies.jsx
│   │   ├── MovieList.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── SuggestionsCarousel/
│   │   │   ├── SuggestionsCarousel.jsx
│   │   │   └── SuggestionsCarousel.css
│   │   ├── TrendCarousel/
│   │   │   ├── TrendCarousel.jsx
│   │   │   └── TrendCarousel.css
│   │   ├── MovieDetails/
│   │   │   ├── MovieDetails.jsx
│   │   │   └── MovieDetails.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── ...
├── .env
├── package.json
└── README.md

## Contributions :) 
Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre les étapes suivantes :

Forkez le projet.
Créez une branche pour votre fonctionnalité (git checkout -b feature/nouvelle-fonctionnalité).
Commitez vos modifications (git commit -m 'Ajout de nouvelle fonctionnalité').
Poussez votre branche (git push origin feature/nouvelle-fonctionnalité).
Ouvrez une Pull Request.
