# Les petits plats #

 Ce projet correspond au projet 7 de la formation développeur d'applications JS React de OPENCLASSROOMS.


 ## Table des Matières

- [Introduction](#introduction)
- [Installation et utilisation](#installation-et-utilisation)
- [Structure du Projet](#structure-du-projet)
- [Auteurs](#auteurs)
- [Exigences fonctionnelles](#exigences-fonctionnelles)
- [Outils et contraintes techniques](#outils-et-contraintes-techniques) 


## Introduction

- Le projet a pour but de proposer un site permettant de trouver des recettes de cuisines à l'aide d'un moteur de recherche fluide, à partir des maquettes Figma (https://www.figma.com/file/LY5VQTAqnrAf0bWObOBrt8/Les-petits-plats---Maquette-2.0?type=design&node-id=0%3A1&t=23dNyQrjg9DVtnrM-1)


## Installation et utilisation

- Aucune installation n'est requise. Le projet se lance avec `live server`


## Structure du Projet

-   ├── assets                 # Contient les images 
-   │      ├── icons/          # Contient les icônes au format SVG
-   │      └── photos/         # Contient toutes les images des plats
-   ├── css/                   # Contient le fichier CSS
-   ├── data/                  # Contient les données du projet au format JSON
-   ├── scripts/               # Contient le contenu JS du site
-   │      ├── api/            # Contient le fonction de récupération des données 
-   │      ├── pages/          # Contient les fonctions d'affichage des pages
-   │      ├── templates/      # Contient les fonctions de structuration des modèles
-   │      └── utils/          # Contient les fonctions utilitaires
-   └── index.html             # Page d'accueil du site


## Auteurs

- [GUIEBA Kévin](https://github.com/Kguie/)

## Exigences fonctionnelles ##

- Implémenter une fonctionnalité de recherche
    - Proposer 2 versions de la fonctionnalité

- Faire attention au risque d’injection de balises html ou toute autre faille de sécurité  dans le site via les formulaires.

- Choisir le meilleur algorithme après avoir tester les performances de chacun

### Outils et contraintes techniques ###

- Utiliser du HTML, CSS et JS.
- Styling:Seuls Bootstrap et Tailwind css sont autorisées comme librairie.
- Utiliser une fiche d'investigation pour développer la fonctionnalité de recherche.
- Utiliser un algorigramme pour chacune des propositions d'algorithme de recherche.
- Respecter les pratiques du Green Code
