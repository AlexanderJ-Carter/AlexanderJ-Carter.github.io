---
title: 'Pourquoi Astro convient aux sites de contenu : zéro JS et Core Web Vitals'
description: "Un site personnel, c'est d'abord pour être lu. Astro n'envoie pas de runtime de framework par défaut — ce qui colle aux objectifs de performance d'un site de contenu."
category: 'Pratique technique'
pubDate: 2026-06-22
updatedDate: 2026-07-25
lang: fr
tags: ['Astro', 'performance', 'Core Web Vitals']
timeToRead: '12 min'
---

La livraison centrale d'un site de contenu, ce sont les mots et les images dans le HTML — pas un arbre d'état côté client. Beaucoup de frameworks supposent par défaut qu'« l'application doit tourner dans le navigateur » ; Astro suppose que « la page est d'abord un document, l'interactivité en îlots à la demande ». Pour l'écriture personnelle, les galeries et la documentation, cette seconde hypothèse est en général plus simple — et plus facile à mettre au vert sur les Core Web Vitals.

## Ce que les sites de contenu craignent vraiment

L'expérience lecteur se résume grosso modo à :

- **LCP** : combien de temps avant que le plus gros bloc (souvent le titre ou le hero) soit lisible ;
- **CLS** : polices et images décalent-elles la mise en page ;
- **INP / latence d'interaction** : après un clic, combien de temps avant une réponse.

Une SPA peut être très rapide, mais il faut encore gérer : coût d'hydratation, poids du routeur, et « importer tout un runtime UI pour quelques panneaux repliables ». Sur un site de contenu, ce coût dépasse souvent le gain.

## La réponse par défaut d'Astro

**Zéro JS sur le chemin par défaut.** Les composants deviennent du HTML à la build. Seules les îles avec `client:*` envoient du script au navigateur.

Conséquences :

- listes d'articles, page à propos, politique de confidentialité : presque du pur document ;
- thème, lecteur audio, petits outils : îlots isolés — en cas de problème, la page reste lisible ;
- le Total Blocking Time peut approcher le « rien à bloger » en labo.

Je ne mythifie aucun score — réseau réel, polices, grosses images, scripts tiers peuvent casser un 100. Mais **envoyer moins de JS par architecture** est plus stable que de gratter des octets après coup.

## Islands : de l'interactivité à la demande, pas une hydratation globale

Ce site a quelques interactions : thème, porte de vérification, pages outils, lecteur parfois. Elles vont en îlots, pas en « tout le site en React ».

En pratique :

1. **Si le CSS / HTML natif suffit, pas de composant framework.**
2. **`client:load` est un défaut coûteux ; `visible` / `idle` quand c'est possible.**
3. **Moins d'îlots par page.** Cinq petites îles peuvent quand même boucher la route.

## Sortie statique et cache en bordure

`output: 'static'` (ou prérendu équivalent) laisse GitHub Pages / Cloudflare servir des fichiers. Pas de « requête → base → page assemblée » ; le TTFB est plus prévisible.

La fréquence de mise à jour d'un site de contenu, c'est souvent « un article, un déploiement » — parfait pour le SSG. Les formulaires dynamiques peuvent passer par un tiers ou une edge function sans transformer tout le site en SSR.

## Les pièges qu'il faut quand même gérer

Astro ne corrige pas automatiquement :

- **grandes images sans dimensions** — tueur de LCP ;
- **flash de polices et reflow** — tueur de CLS ;
- **scripts d'analyse / chat / pub ajoutés à la légère** — tueurs d'INP et du thread principal ;
- **transitions de route côté client** — jolies, mais à peser face à la complexité.

Ce site a déjà un article sur l'optimisation perf ; celui-ci explique **pourquoi ce socle rend moins probable d'être lent**, l'autre **quoi faire quand c'est lent**.

## Quand ne pas forcer Astro

- collaboration temps réel lourde, dashboards complexes, état client dense ;
- équipe déjà investie dans l'écosystème Next/Nuxt et le contenu n'est qu'accessoire ;
- la densité d'interaction ressemble à une « app », pas à « document + quelques contrôles ».

L'outil suit l'objectif. Le mien : un studio personnel maintenable sur la durée, texte et images d'abord, scripts sobres. Astro se tient de ce côté.

## Par rapport à « tout faire en React », ce que j'économise concrètement

Ce n'est pas « savoir ou non React », c'est :

- la charge mentale de garder l'hydratation cohérente pour du texte statique ;
- les régressions à chaque montée de routeur ou de state ;
- le runtime téléchargé sur un téléphone modeste pour lire un billet.

J'utilise encore des composants framework dans les îlots — mais le chemin par défaut, c'est le HTML. Cette asymétrie — **document bon marché, interaction payée explicitement** — est très rentable pour un site personnel.

Si 80 % de vos pages sont articles et docs et 20 % petits outils, les défauts d'Astro jouent pour vous ; si c'est l'inverse, réévaluez.

## En bref

Astro convient aux sites de contenu non par mode, mais parce que la livraison par défaut s'aligne sur le lecteur : HTML complet d'abord, îlots réveillés à la demande. Les Core Web Vitals ne deviennent pas verts tout seuls — mais vous évitez une guerre « runtime de framework vs document ». Choisir les bons défauts compte plus que choisir la bonne marketplace de plugins.
