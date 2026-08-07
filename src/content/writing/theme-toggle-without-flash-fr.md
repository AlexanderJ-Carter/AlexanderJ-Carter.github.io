---
title: 'Thème sans flash : décider avant le premier paint'
description: 'Un mode sombre qui clignote blanc puis noir paraît inachevé. Comment ce site choisit le thème avant l’affichage.'
category: 'Engineering'
pubDate: 2026-07-23
updatedDate: 2026-08-07
lang: fr
tags: ['thème', 'mode sombre', 'UX']
timeToRead: '8 min'
---

Le mode sombre est standard, mais la qualité d’implémentation varie. Flash blanc à chaque rechargement = mauvais timing de script, ressenti « brouillon ».

## D’où vient le flash

HTML rendu en clair → CSS → JS lit `localStorage` / `prefers-color-scheme` → classe `dark` sur `<html>`. L’utilisateur voit un FOUC thématique.

## Bonne posture

**La première frame doit être le bon thème.** Petit script synchrone tôt dans `<head>` : lire préférence, appliquer classe. Ne pas déplacer ce script en bas du bundle « pour nettoyer » — le flash revient.

## Stockage

- Garder le choix explicite light / dark / system.
- Si « system », re-évaluer au chargement, ne pas figer l’ancien thème OS pour toujours.

## Tokens et accessibilité

`html.dark` ne suffit pas : rampes neutres, bordures, blocs code doivent être conçus. Respecter `prefers-reduced-motion`. Bouton avec nom accessible, pas icône seule.

## Checklist

1. Rechargement dur, OS sombre — premier écran déjà sombre ?
2. Choix manuel persiste ?
3. Stockage vide — repli sensé ?
4. Sans JS — au moins un thème lisible ?

Sur un site de lecture la nuit, un flash à chaque navigation crie « app client » au lieu de « document ».

## Conclusion

Décision avant paint, tokens solides, distinction choix utilisateur / système — trois étapes, grand gain silencieux.
