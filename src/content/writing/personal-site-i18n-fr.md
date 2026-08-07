---
title: 'Sites personnels multilingues : routes, hreflang, couches de texte'
description: 'Cinq langues ne sont pas cinq copier-coller. URLs, templates et fichiers i18n sur ce site.'
category: 'Engineering'
pubDate: 2026-06-28
updatedDate: 2026-08-07
lang: fr
tags: ['i18n', 'multilingue', 'Astro']
timeToRead: '9 min'
---

Langue par défaut : zh-CN à `/` ; aussi zh-TW, en-GB (`/en/`), fr, ru. Le piège : la même chaîne de nav dans cinq fichiers, articles longs dans une seule langue, SEO confus.

## URLs

- `zh-CN` → `/about/`
- Autres → `/zh-TW/about/`, `/en/about/`, etc.

Pas de préfixe pour la langue principale ; `/en/` plutôt que `/en-GB/` pour la lisibilité — `hreflang` porte la locale exacte.

## Trois types de texte

1. **UI globale** — `src/i18n/ui.ts`
2. **Pages** — `src/i18n/pages/*.ts`
3. **Long format** — `src/content/writing/*.md` avec `lang:`

Principe : modifier la nav sans toucher aux articles. Mieux une note honnête « pas encore d’articles dans cette langue » qu’un faux duplicate.

## hreflang et canonical

Chaque page importante : canonical sur elle-même ; alternates + `x-default` (ici vers la racine zh-CN). Générer en masse depuis le layout.

## Routes minces, templates épais

`src/pages/` choisit la langue et rend le Template. Pas de logique complexe dans les routes.

## Contenu partiel

Toutes les langues n’ont pas tous les articles — normal. Index filtré par `lang` ; pas de machine translation de remplissage.

## Conclusion

Multilingue = architecture : URLs stables, texte par couche, SEO explicite. Fait une fois, ça scale mieux que cinq sites séparés.
