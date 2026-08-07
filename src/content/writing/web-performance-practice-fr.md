---
title: 'De cinq secondes à une : journal de perf réel'
description: 'Pas un tutoriel — un diary honnête d’optimisation homepage, avec compromis inclus.'
category: 'Engineering'
pubDate: 2026-03-01
updatedDate: 2026-08-07
lang: fr
tags: ['performance', 'optimisation', 'Web']
timeToRead: '11 min'
---

La homepage prenait cinq secondes. Pas une app lourde — un site perso statique — mais lent. Comment j’ai passé sous une seconde : ce qui a cassé, ce que j’ai mesuré, ce que j’ai laissé.

## Où c’était lent ?

Lighthouse initial : Performance **47**. Douleur :

- **LCP** 4,8s — hero trop lourd ;
- **CLS** 0,18 — polices qui bougent la mise en page ;
- **FCP** 2,1s — CSS/JS bloquent le paint ;
- **TBT** 380ms — scripts tiers.

47 requêtes, ~3,2 Mo PNG, six fichiers Google Fonts, ~180 Ko CSS, analytics bloquant. Cibles : images, polices, CSS, tiers.

## Images

PNG/JPG → AVIF + fallback WebP. Hero 2,4 Mo → ~186 Ko AVIF. `srcset` 640 / 1024 / 1920. Lazy below-the-fold ; `fetchpriority="high"` above.

**Résultat** : LCP 4,8s → 2,3s ; transfert ~5,1 Mo → ~1,2 Mo.

## Polices

Self-hosted WOFF2 ; deux graisses (400/700) ; subset CJK ; `font-display: swap` ; preload.

**Résultat** : CLS 0,18 → 0,02 ; FCP 2,1s → 1,4s.

## CSS

Purge Tailwind mal configurée → 180 Ko. Chemins `content` corrigés → ~23 Ko. Prism seulement sur pages code. Critical CSS inline.

**Résultat** : FCP → ~0,9s.

## JavaScript

Trop de `client:load`. Theme toggle tôt ; copy → `client:visible` ; motion décorative → CSS.

**Résultat** : TBT 380ms → ~45ms.

## HTTP

Cloudflare `_headers` : cache long assets hashés ; HTML plus court. `preconnect` seulement si nécessaire.

## Chiffres finaux

| Métrique      | Avant | Après |
| ------------- | ----- | ----- |
| Performance   | 47    | 97    |
| LCP           | 4,8s  | 0,95s |
| FCP           | 2,1s  | 0,8s  |
| CLS           | 0,18  | 0,01  |
| TBT           | 380ms | 45ms  |
| Transfert     | 5,1Mo | 680Ko |

## Ce que je n’ai pas fait

Pas de CDN image payant pour un perso. Pas de SPA. Pas d’optimiser chaque article avant le hero — LCP d’abord.

## Conclusion

Perf = mesurer, une cible à la fois, accepter les compromis. Sous une seconde sur un site statique perso est réaliste — si tu traites images et polices comme du produit, pas de la décoration.
