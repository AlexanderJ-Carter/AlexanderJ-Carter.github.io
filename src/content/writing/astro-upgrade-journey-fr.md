---
title: 'Mettre à jour Astro : pièges, rollback et ce qui est resté'
description: 'Journal de migration réel — Content Layer, slug→id, render(), et le build Windows à zéro page.'
category: 'Technical Practice'
pubDate: 2026-05-30
updatedDate: 2026-08-07
lang: fr
tags: ['Astro', 'upgrade', 'site statique']
timeToRead: '12 min'
---

Écrit trois jours après la fin — mémoire fraîche. Si tu changes de major Astro, ceci peut te sauver un week-end.

> Ce log décrit une migration Content Layer sur une ligne major antérieure. Le site tourne maintenant en **Astro 7** ; les patterns (collections typées, `render(post)`, chemins glob cross-platform) restent valides.

## Pourquoi upgrader

Correctifs sécurité même sans API vulnérable. Content Layer loaders = meilleur typage et perf build — j’ai estimé une demi-journée ; trois jours réels.

## Étapes douloureuses

### Dépendances

`npx @astrojs/upgrade`, puis réconcilier les peers `@astrojs/*`.

### Migration Content Layer

Ancien : `src/content/config.ts` avec Markdown auto-découvert.  
Nouveau : `src/content.config.ts` à la racine avec loader `glob` explicite.

Points :

1. **`z.date()` vs `z.coerce.date()`** — dates frontmatter en string ; formats non-ISO cassent silencieusement.
2. **`slug` → `id`** — routes et générateurs de liens à suivre.
3. **`render()`** — `await post.render()` → `import { render } from 'astro:content'; await render(post)`.

### Build Windows « 0 pages »

Build OK, **zéro page**, pas d’erreur. Collection `[]` jusqu’à `base` glob cross-platform (`fileURLToPath` sur early 6.x). **CI Linux cache les bugs Windows** — pousser une branche et laisser Actions builder.

### Tentation rollback

Presque revert mid-debug. Resté : maintenance old majors vs loaders futurs (sources distantes). Sur deadline, rollback est rationnel.

## Améliorations

- Migration Content Layer complète.
- Routes et types verts.
- Temps build en baisse (~12s → ~9s classe — variable).

Reporté : View Transitions breaking ; certaines intégrations en attente compat.

## Leçons

1. Branche d’abord — pas upgrade `main` vendredi soir.
2. Lire breaking changes **avant** d’éditer.
3. CI avant victoire déclarée.
4. Petits pas : deps → collections → routes → pages.
5. Commenter l’ancien code avant delete lors de gros renames.

## Conclusion

Upgrade framework = collecte dette technique. Douleur migration unique ; typage et builds composent. Semaine calme, branche, guide, petits pas — et ne combats pas seul les glob paths à minuit.
