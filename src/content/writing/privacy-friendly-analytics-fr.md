---
title: 'Même un site statique a besoin de données : choisir une analyse respectueuse de la vie privée'
description: "Un site personnel n'a pas besoin du profilage complet de GA4. Voici comment j'arbitre entre « voir le trafic » et « ne pas suivre les visiteurs »."
category: 'Pratique technique'
pubDate: 2026-06-08
updatedDate: 2026-07-25
lang: fr
tags: ['vie privée', 'analyse', 'site statique']
timeToRead: '12 min'
---

Tôt ou tard, presque tout site personnel se pose la même question : d'où viennent les visiteurs ? Quels articles sont lus ? Est-ce que je suis le seul à rafraîchir la page d'accueil ?

La réponse par défaut de beaucoup, c'est Google Analytics. Puissant, bien documenté, tableaux de bord soignés — mais le prix est clair : cookies, identifiants inter-sites, bandeaux de consentement, et une politique de confidentialité qui s'allonge. Pour un site statique qui mise sur la clarté, la stabilité et peu de pistage, cette solution est souvent trop lourde.

Cet article n'est pas un comparatif de produits. C'est le cadre que j'utilise pour décider, et les principes que j'ai retenus pour ce site.

## Vous avez besoin de très peu de données

Commencez par clarifier l'objectif. Pour moi, l'analyse d'un site personnel doit répondre à quatre questions :

1. **Quelles pages sont ouvertes** — la part approximative de l'accueil, des écrits, de la galerie, des outils.
2. **D'où viennent les visites** — recherche, liens externes, accès direct ; une granularité grossière suffit.
3. **La répartition approximative appareils / navigateurs** — pour savoir si la mise en page mobile tient la route.
4. **Y a-t-il des pics anormaux** — par exemple quand un article est relayé et que le trafic bondit.

Je n'ai pas besoin de : profils inter-sites, entonnoirs de parcours, audiences de remarketing, replays de session individuels sur un an. Ces capacités existent, mais ce n'est pas le cœur d'un studio numérique personnel.

**La minimisation des données n'est pas un slogan, c'est un critère de choix.** Si un outil collecte par défaut bien plus de champs que vous ne pouvez en exploiter, il n'a pas sa place à côté de votre pied de page.

## « Sans cookie » ne suffit pas : regarder si l'identifiant persiste

Beaucoup de produits affichent « sans cookie / compatible RGPD ». Il faut creuser deux niveaux de plus :

- **Un identifiant persistant est-il écrit sur l'appareil ?** Cookie, `localStorage`, script d'empreinte — au fond, tout cela revient à « se souvenir de cette personne ».
- **Le serveur assemble-t-il IP + User-Agent en un hash recouvrable d'un jour à l'autre ?** Si le sel ne tourne jamais et que la rétention est longue, ce n'est pas forcément plus propre qu'un cookie au sens réglementaire.

Une posture plus sûre :

- ne pas profiler les visiteurs sur le long terme ;
- agréger autant que possible par jour ;
- ne pas stocker l'IP brute, ou la hasher puis la jeter immédiatement ;
- garder une liste blanche de champs assez courte pour tenir en un ou deux paragraphes de politique de confidentialité.

La page confidentialité de ce site mentionne AdSense et les cookies parce que la publicité l'exige ; **côté analyse, je garde un jeu de règles plus sobre** — brancher un outil quand j'ai besoin de chiffres, pas de tracking par défaut sur tout le site.

## Trois voies courantes

### 1. Produits hébergés orientés vie privée

Plausible, Fathom, Simple Analytics, et consorts. Avantages : intégration rapide, tableau de bord suffisant, souvent sans bandeau de consentement. Inconvénient : c'est toujours un tiers — vous confiez des résumés de trafic à quelqu'un d'autre, avec la confiance que cela implique sur l'hébergement des données et le modèle économique.

Convient à : un site personnel qui veut des tendances tout de suite, sans vouloir opérer l'infra.

### 2. Open source auto-hébergé (Umami, Matomo en mode allégé, etc.)

Les données restent sur votre serveur ou votre compte cloud ; la frontière d'audit est plus nette. Le coût : mises à jour, sauvegardes, domaine et HTTPS, et s'assurer que le service d'analyse ne devienne pas lui-même une surface d'attaque.

Convient à : ceux qui ont déjà un VPS ou des conteneurs stables, et qui consultent vraiment le tableau de bord.

### 3. Pixel minimal maison

Une route côté serveur qui enregistre URL, referrer, pays / appareil en buckets grossiers, écrit dans des logs ou une petite base. Pas de tableau de bord ? Un script occasionnel suffit.

Convient à : un trafic faible, quand on veut surtout confirmer que « le site respire encore ». Ce site aurait pu rester longtemps à ce niveau.

## Coexister avec la publicité et les bandeaux de consentement

Analyse et publicité sont deux sujets distincts :

- **Des statistiques de visite respectueuses de la vie privée** peuvent souvent fonctionner sans cookies publicitaires.
- **La publicité personnalisée** (AdSense, par exemple) introduit en général des cookies tiers ou des technologies équivalentes ; la politique de confidentialité doit le dire clairement et offrir un moyen de refuser la personnalisation.

Ne présentez pas « j'utilise une analyse sans cookie » comme « ce site ne trace personne ». L'honnêteté vaut mieux que le slogan. Les visiteurs distinguent ce qui sert à l'exploitation agrégée du site de ce qui relève des réseaux publicitaires.

## Les principes que j'applique ici

1. **Pas de script d'analyse lourd par défaut.** Les pages restent d'abord statiques, peu gourmandes en thread principal.
2. **Si j'en branche un : script court, pas d'identifiant persistant, le minimum de champs.** Auto-héberger si le coût ops est acceptable ; sinon choisir un hébergeur qui s'engage clairement à la minimisation.
3. **Politique de confidentialité alignée sur le comportement réel.** Le jour où je change de script, je change le texte — pas de mention périmée en ligne.
4. **Ne pas ajouter de champs pour un beau tableau de bord.** Si je ne comprends pas une métrique ou si elle ne me fait pas modifier le site, elle ne devrait pas être collectée.

## Quand on peut s'en passer un moment

- le site vient de sortir et le contenu compte plus que la courbe ;
- je n'ai pas le temps d'interpréter les données — un tiers de plus ne sert à rien ;
- je resserre la perf et la CSP et je ne veux pas ouvrir un trou de plus.

« Ne rien installer pour l'instant » est une décision complète. Quand le rythme de publication est stable, on peut toujours ajouter l'outil ; éviter d'empiler des trackers pour une plateforme, sans aide au contenu et avec une confiance qui en prend un coup.

## En bref

Un site statique mérite une idée basique du trafic, pas de devenir un terminal de pistage. Avant de choisir un outil, écrivez les quatre questions auxquelles vous voulez répondre, puis prenez la couche « juste assez » — hébergé, auto-hébergé ou pixel maison. L'essentiel : **collecter peu, l'expliquer clairement, et en tirer parti.**

Le jour où ce site branchera une solution précise, je le documenterai dans la politique de confidentialité — pas dans une petite ligne de pied de page.
