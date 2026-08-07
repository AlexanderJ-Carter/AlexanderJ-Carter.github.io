---
title: 'Architecture du site : GitHub Pages et Cloudflare ensemble'
description: 'Du Markdown au bord global. Pourquoi ce site est généré statiquement, comment il se déploie, et où passent les limites.'
category: 'Technical Practice'
pubDate: 2026-07-10
updatedDate: 2026-08-07
lang: fr
tags: ['architecture', 'GitHub Pages', 'Cloudflare']
timeToRead: '12 min'
---

« Quel backend pour alexander.xin ? » Réponse courte : souvent aucun backend classique. Réponse longue : ce texte — contenu, build, empilement GitHub Pages + Cloudflare.

## Forme visée

Site perso :

- **Peu cher et durable** — survit aux vacances sans attention ;
- **Rapide** — pas de taxe d’hydratation sur les pages document ;
- **Auditable** — config en Git, en-têtes et redirects revus ;
- **Évolutif** — Workers, formulaires, pubs plus tard sans tout jeter.

→ Astro SSG + build Git + Cloudflare devant (DNS, cache, protection).

## Au build

Astro compile :

- routes `src/pages` ;
- layouts `templates` ;
- Markdown `content/writing` ;
- chaînes `i18n` ;

en arbre statique : HTML, CSS, peu de JS, images, `public/` brut (`ads.txt`, `_headers`, `.well-known`).

Pas de « requête → BDD → about ». About est HTML au build.

## Rôle de GitHub Pages

Repo = source de vérité. Pages sert la sortie. Pour un perso : permissions familières, PR, coût maîtrisé.

Surveiller : domaine custom + HTTPS, `404`, pas de secrets dans les logs Actions.

## Rôle de Cloudflare

Devant le domaine :

- **DNS et proxy** ;
- **Cache edge et compression** ;
- **WAF / bots** (selon plan) ;
- **`_headers`, redirects, Workers** si besoin.

Comprendre cache HTML vs assets hashés — article « stale » après publish ? cache avant build.

## Dynamique au bord, pas SSR partout

Formulaires, Turnstile, redirects spéciaux sans SSR sitewide :

- Pages statiques ;
- Soumissions → tiers ou Worker ;
- Vérification client (About/Contact sur ce site).

Scripts pub gated au build : pas d’id → pas d’injection.

## Ce que j’ai renoncé

- **CMS runtime** — Markdown + Git ;
- **TMS lourd multilingue** — cinq langues UI suffisent ; long-form d’abord en chinois ;
- **Microservices démo** — fichiers statiques suffisent.

## Quand ça casse

1. Build vert ? (`build` / `astro check`)
2. Bonne branche / environnement ?
3. Cache ou règles Cloudflare ?
4. Une seule locale en 404 ?

Debug par couches.

## Coût mental

Cash ~ zéro (selon trafic), mais :

- DNS, cache, logs Pages à comprendre ;
- Pas d’admin UI — Markdown + PR ;
- Tu gères en-têtes et dépendances.

Ça me convient : contrôle, portabilité. Changer d’hébergeur = copier des fichiers.

## Carte du repo

- `src/content/writing` : long-form ;
- `src/components/templates` : forme des pages ;
- `src/pages` : routes minces ;
- `public/` : brut, `_headers`, `ads.txt` ;
- Workers : seulement où il faut du dynamique.

Lire les dossiers bat les diagrammes.

## Déploiement et attentes

Statique ≠ instantané partout. Après merge, quelques minutes — DNS, file build, purge cache.

## Migration

Output = fichiers → copier `dist` ou pointer DNS ailleurs. Contenu Git = vrai actif ; hôte = plomberie interchangeable.

## Conclusion

Architecture volontairement ennuyeuse : fichiers statiques, hébergement fiable, Cloudflare au bord. L’ennui laisse du temps pour écrire et photographier. Fais marcher ce chemin d’abord — Workers et BDD ensuite. Souvent HTML suffit.
