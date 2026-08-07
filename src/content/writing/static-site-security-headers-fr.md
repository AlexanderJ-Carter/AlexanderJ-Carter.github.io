---
title: 'En-têtes de sécurité sur sites statiques : _headers, CSP et compromis'
description: 'Un site statique peut prendre les en-têtes au sérieux. _headers Cloudflare/Pages, la douleur d’une CSP stricte, et l’équilibre sur ce site.'
category: 'Technical Practice'
pubDate: 2026-07-06
updatedDate: 2026-08-07
lang: fr
tags: ['sécurité', 'CSP', 'Cloudflare']
timeToRead: '13 min'
---

Pas de session côté serveur ne signifie pas ignorer le navigateur. Clickjacking, sniffing MIME, scripts tiers incontrôlés — un site perso peut souffrir. Bonne nouvelle : avec GitHub Pages + Cloudflare, `_headers` peut diffuser des en-têtes de base partout.

## Baseline d’abord, CSP parfaite plus tard

Au minimum :

- **`X-Content-Type-Options: nosniff`**
- **`Referrer-Policy`** adaptée
- **`X-Frame-Options` ou CSP `frame-ancestors`**
- **`Permissions-Policy`** sans capteurs inutiles

Coût faible, bénéfice clair. N’attends pas la CSP parfaite pour les déployer.

## `_headers` en pratique

Cloudflare Pages lit `_headers` dans la sortie de build. Fichier dans `public/_headers`, copié au build.

```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Global sûr d’abord, exceptions ensuite.

## CSP : utile et facile à se bloquer

CSP limite scripts, styles, iframes, connexions. Idéal : `default-src 'self'`, allowlist courte.

Douleur réelle :

- Thème, analytics, Turnstile, AdSense, fonts CDN — chacun une entrée ;
- Inline = hash/nonce ou `'unsafe-inline'` qui affaiblit ;
- Un oubli = écran blanc en prod.

Stratégie :

1. **Inventaire des sources réelles**
2. **Élargir par feature flag** — pas de domaines pub avant activation
3. **Smoke test** après changement — accueil, article, contact, outil
4. **Report-Only** si collecteur disponible

Pages sécurité, `security.txt`, PGP = posture humaine ; en-têtes = machine. Les deux.

## Tiers honnêtes

CSP stricte + pubs + Turnstile + fonts externes = allowlist longue. Choix produit, pas échec. Échec = badge sécurité avec en-têtes vides ou exemple obsolète.

## Sites statiques : vigilance

- **Supply chain** : lockfiles
- **XSS** : Markdown et `set:html`
- **Secrets** : jamais en repo public
- **Cache** : mauvais headers = vieille CSP collée

## AdSense + CSP

Ads activées → `pagead2.googlesyndication.com` etc. Même jour : `_headers`, politique de confidentialité, `ads.txt`. Tester iframe pub en navigation privée.

## HSTS et TLS

HTTPS forcé, HSTS quand la chaîne est stable. Pas de mixed content.

## Documenter les changements

Commit explicite : « CSP : Turnstile sur contact » — pas « update headers ».

## security.txt

`/.well-known/security.txt` indique comment te joindre. En-têtes protègent les visiteurs ; security.txt protège quand on trouve un vrai bug.

## Conclusion

En-têtes sur site statique = levier fort : baseline d’abord, CSP progressive, trous minimaux pour les tiers activés. `_headers` en Git, révisable, réversible. Sécurité = ouvrir Network après deploy et vérifier ce qui a chargé.
