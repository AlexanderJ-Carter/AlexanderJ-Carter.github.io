---
title: "L'accessibilité n'est pas un bonus : clavier, contraste et focus"
description: "Voir n'est pas utiliser. Un site personnel doit aussi tenir la route avec Tab, un lecteur d'écran et les utilisateurs qui détestent les animations clignotantes."
category: 'Réflexion design'
pubDate: 2026-07-14
updatedDate: 2026-07-25
lang: fr
tags: ['accessibilité', 'a11y', 'expérience']
timeToRead: '13 min'
---

L'accessibilité finit souvent en bas de la liste « quand j'aurai le temps ». Sur un site personnel, encore plus : peu de visiteurs, pages simples, « les gens normaux cliquent bien ». Mais « normal » n'est jamais un seul état corporel — poignet blessé temporairement, écran au soleil, presbytie, utilisateur qui ne veut que le clavier : plus fréquent qu'on ne croit.

Ce site a une page dédiée à l'accessibilité ; cet article couvre ce que je vérifie vraiment à chaque refonte.

## La sémantique avant le maquillage ARIA

Ordre de priorité :

1. hiérarchie de titres correcte, `<button>` pour les boutons, `<a href>` pour les liens ;
2. contrôles de formulaire avec `<label>` visible ;
3. `alt` significatif sur les images (vide pour décoratif) ;
4. ARIA seulement si nécessaire.

Un `div` + clic pour faire un bouton, puis `role="button"`, c'est l'inverse de l'ordre. Lecteurs d'écran et commande vocale font plus confiance aux contrôles natifs.

## Clavier : Tab sur la navigation principale

À chaque changement de header, overlay, menu de thème :

- parcourir le chemin principal au clavier seul ;
- vérifier que le focus est visible (supprimer l'outline sans remplacement, c'est exclure les utilisateurs clavier) ;
- en modal : focus piégé dedans, retour au déclencheur à la fermeture ;
- lien « aller au contenu principal » présent et utilisable.

Si la souris réagit au survol mais le clavier n'atteint pas le contrôle, ce n'est pas fini.

## Contraste : accident fréquent des sites minimalistes

Gris clair sur fond clair, gris foncé sur fond foncé — « premium » sur la maquette, invisible au soleil sur le balcon. Texte et icônes doivent rester lisibles. Le mode sombre n'est pas un simple inversé : tester les deux jeux de neutres.

Ne pas non plus transmettre l'état (erreur, succès) par la couleur seule — ajouter texte ou icône.

## Animation : respecter « réduire les mouvements »

Avec `prefers-reduced-motion: reduce`, atténuer ou supprimer les animations non essentielles. Clignotement, grands déplacements, parallaxe ne sont pas qu'une question de goût — parfois de confort physiologique. Règle ici : l'animation sert la hiérarchie et la présence, pas le bruit ; et elle doit respecter la préférence réduite.

## Langue et titres de page

L'attribut `lang` doit être correct — sinon la synthèse vocale devient comique et obscure. Sur un site multilingue, langue du titre et du contenu principal alignées au changement. Chaque `<title>` unique — historique et navigation assistée.

## Médias et portes de vérification

- vidéo / audio : sous-titres ou alternative textuelle, au minimum « pas de dialogue » ;
- galerie : ne pas piéger l'utilisateur clavier dans une lightbox impossible à fermer ;
- vérification humaine (Turnstile, etc.) : elle augmente le coût des abus, et parfois la friction pour les technologies d'assistance — arbitrage produit à expliquer dans confidentialité / à propos, avec un chemin réalisable.

## Jusqu'où va un site personnel

Pas besoin de prétendre à une conformité WCAG parfaite pour mettre en ligne — mais :

- parcours principal utilisable au clavier ;
- contraste qui ne s'effondre pas ;
- focus visible ;
- mouvement réduit respecté ;
- contact ou retour accessibilité public.

Traiter l'accessibilité comme badge = faux. Comme hygiène d'ingénierie par défaut = vrai.

## Mini-checklist à chaque refonte

Navigation, overlay, couleurs de thème ou polices — au minimum :

1. Tab sur le chemin principal, bureau et mobile ;
2. coup d'œil en contraste élevé / sombre système ;
3. souris éteinte : l'anneau de focus reste-t-il visible ;
4. mouvement réduit activé : les animations cèdent-elles ;
5. un `alt` de galerie décrit-il le contenu, pas le nom de fichier.

Cinq étapes, environ dix minutes — moins cher qu'un mail « je ne peux pas fermer la lightbox ».

## Le texte aussi est de l'accessibilité

« Cliquez ici » ne aide pas le lecteur d'écran hors contexte. « Envoyer le message », « Lire la déclaration d'accessibilité » battent « En savoir plus ». Les messages d'erreur doivent dire comment corriger, pas seulement rougir.

Site multilingue : ne pas tasser de l'anglais court dans un bouton étroit — la troncature perd de l'info pour la vue et l'assistance.

## En bref

Accessibilité, minimalisme et performance vont dans le même sens : moins d'obstacles, moins de bruit, structure claire. Tab une fois la navigation, regarder le contraste, relire un alt — moins cher que refaire après coup. Peu de lecteurs sur un site personnel, mais chacun entier ; ne pas utiliser « c'est juste ma page » pour laisser la porte entrouverte à ceux qui n'ont que le clavier.
