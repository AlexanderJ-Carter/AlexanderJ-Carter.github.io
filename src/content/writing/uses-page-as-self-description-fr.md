---
title: 'La page Uses : écrire sa stack comme auto-description lisible'
description: 'Uses n’est pas une vitrine matérielle. Explique ce que tu utilises et pourquoi — visiteurs et futur toi en profitent.'
category: 'Design Thinking'
pubDate: 2026-07-19
updatedDate: 2026-08-07
lang: fr
tags: ['Uses', 'workflow', 'site personnel']
timeToRead: '10 min'
---

Les pages `/uses` sont courantes : éditeurs, claviers, appareils, hébergeurs en liste. Mal faites = tickets de caisse ; bien faites = courte culture d’ingénierie — comment tu travailles et quelle complexité tu acceptes.

## Pourquoi on clique

- Curiosité sur la stack, envie de reproduire ;
- Sensibles vie privée / perf, vérifient la cohérence ;
- Collaborateurs potentiels jugent le coût de collaboration.

Uses doit répondre **pourquoi ce choix**, pas seulement **ce que j’ai acheté**.

## Comment je groupe

Sur alexander.xin :

- **Le site** : Astro, Tailwind, deploy et CDN ;
- **Écriture et design** : éditeur, polices, images ;
- **Appareils** : seulement ce qui affecte la sortie — pas vitrine flagship annuelle.

Chaque groupe : quelques phrases de compromis. Ex. : SSG car rythme de mise à jour et forme du contenu ; une police pour la lecture chinoise et le caractère des titres.

## Stratégie de mise à jour

Nouveau laptop ≠ mise à jour immédiate ; nouvelle chaîne de build ou analytics = oui — comme la politique de confidentialité. Uses périméé sape la confiance ailleurs.

Revue trimestrielle. Retirer les outils abandonnés avant d’en ajouter.

## About vs Uses

- About : qui tu es, ce qui compte, contact ;
- Uses : matériaux et contraintes du métier ;
- Projects : ce qui est construit.

Liens croisés, pas de copier-coller long. Modèle mental en deux minutes.

## Honnêteté > exhaustivité

Lister chaque package npm = bruit. Lister les choix qui façonnent vitesse, vie privée, maintenance = signal. Outils locaux gênants — seulement s’ils affectent ce que voit le visiteur.

## Uses comme contrat avec soi

Écrire « j’ai choisi X parce que Y » rend les upgrades plus difficiles à repousser. Changer analytics ou hébergement → Uses et privacy policy bougent ensemble.

## À ne pas mettre

Outils salaire, expériences d’un week-end — sauf s’ils changent le fonctionnement du site. Pas d’affiliation déguisée en recommandation. Sponsoring ailleurs ; Uses reste propre.

## Ton et longueur

Comme un collègue qui décrit son bureau, pas un unboxing. Deux ou trois paragraphes par section. Les numéros de version → `package.json` ; Uses répond à l’intention.

## Exemples de « pourquoi »

Pas « Éditeur : VS Code » — « VS Code : raccourcis familiers, extension Astro, déjà utilisé pour les cours, donc peu de changement de contexte. »

Pas « Hébergeur : Cloudflare » — « DNS et cache edge au même endroit ; `_headers` dans le repo alignés sur ma façon de déployer. »

Ces phrases vieillissent quand la raison change — c’est le but.

## Conclusion

Uses = instrument de confiance discret. Court, vrai, opinionné — miniature de l’éthique technique du site. Le matériel se déprécie ; les phrases expliquant pourquoi tu travailles ainsi vieillissent mieux.
