---
title: 'CI pour sites statiques : chaque push prouve que ça build'
description: 'Install, check, build — automatiser pour éviter « ça marche chez moi » après un push.'
category: 'Engineering'
pubDate: 2026-07-21
updatedDate: 2026-08-07
lang: fr
tags: ['CI', 'GitHub Actions', 'qualité']
timeToRead: '8 min'
---

L’accident classique du site perso : tweak i18n local, oubli de build, push, Pages cassées dans le métro. La CI ne rend pas plus créatif — elle fait échouer tôt.

## Pipeline minimum

1. Install propre (lockfile)
2. `astro check`
3. `npm run build`

Ensuite seulement : link check, Lighthouse, preview. Pas dix badges avant un build vert.

## Pourquoi le local ne suffit pas

- Version Node différente
- Casse de chemins sur Linux CI
- Fichiers générés ou env oubliés
- Erreur sur une seule locale

CI sur Linux propre = assurance pour le futur vous.

## Séparer check et deploy

PR : prouver le build. `main` : publier après vert. Logs doivent nommer la page / l’entrée collection en échec.

## Ne pas en faire déguisement

Secrets dans les logs = public. Scans quotidiens inutiles = ignorer le rouge. Court, stable, aligné sur le risque réel.

## Bénéfice étudiant

Reprise après pause : la CI dit si la branche est saine avant de retrouver le fil.

## Conclusion

Pour un site Astro perso, trois étapes suffisent souvent. Automatise l’habitude que tu ferais déjà — sans théâtre.
