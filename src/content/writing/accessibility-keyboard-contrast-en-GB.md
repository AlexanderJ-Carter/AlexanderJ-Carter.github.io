---
title: "Accessibility Is Not a Bonus: Keyboard, Contrast, and Focus"
description: "Visible is not the same as usable. A personal site should survive Tab, screen readers, and users who hate flashing animation."
category: "Design Thinking"
pubDate: 2026-07-14
updatedDate: 2026-07-25
lang: en-GB
tags: ["accessibility", "a11y", "UX"]
timeToRead: "13 min"
---

Accessibility often lands on the "when we have time" list. Personal sites feel exempt: few visitors, simple pages, "normal people can click". But "normal" is not one body state — a sprained wrist, phone in bright sun, ageing eyes, keyboard-only users are more common than assumed.

This site has a dedicated accessibility statement; this piece covers what I actually check when shipping everyday changes.

## Semantics Before ARIA Makeup

Priority order:

1. Correct heading levels, `<button>` for buttons, `<a href>` for links;
2. Visible `<label>` on form controls;
3. Meaningful `alt` on images (decorative: empty alt);
4. ARIA only when native HTML cannot do the job.

`div` plus click handler pretending to be a button, then `role="button"`, is backwards. Screen readers and voice control trust native controls.

## Keyboard: Tab Through Primary Navigation

Whenever Header, overlays, or theme menus change:

- Complete main paths keyboard-only, no touch;
- Confirm focus is visible — removing outline without replacement kicks keyboard users out;
- Modal open: focus trapped; on close, return to trigger;
- "Skip to main content" exists and works.

If hover works but keyboard never reaches a control, it is not finished.

## Contrast: Frequent Minimal-Site Failure

Light grey on light ground, dark grey on dark ground looks "premium" in mockups and vanishes on a balcony in sun. Body text and icons need readable contrast. Dark mode is not invert — test both neutral ramps.

Do not rely on colour alone for state (error, success). Add text or icon.

## Motion: Respect Reduced Motion

Under `prefers-reduced-motion: reduce`, weaken or remove non-essential animation. Flashing, large movement, parallax is not mere dislike for some users — it is physical discomfort. Site convention: motion for hierarchy and presence, not noise; always compatible with reduced-motion preference.

## Language and Page Titles

Correct `lang` or screen reader pronunciation becomes comic and hard to follow. On multilingual sites, title and main content language should match after switch. Unique `<title>` per page helps history and assistive navigation.

## Media and Verification Gates

- Video/audio: captions or text alternative; at least note "no dialogue";
- Gallery: keyboard users must not be trapped in an uncloseable lightbox;
- Bot challenges (Turnstile etc.): they raise abuse cost and may raise friction for assistive tech — document the trade-off on privacy/about and keep a completable path.

## What a Personal Site Should Reach

No need to claim perfect WCAG before launch, but:

- Main flows keyboard-usable;
- Contrast not embarrassing;
- Focus visible;
- Reduced motion respected;
- Public accessibility contact or feedback route.

Treating accessibility as a badge produces theatre; treating it as default engineering hygiene produces results.

## Mini Checklist on Every Redesign

When nav, overlay, theme colour, or type changes, at least:

1. Tab main path on desktop and phone;
2. Glance body in system high-contrast / dark;
3. Mouse off — focus ring always visible?;
4. System reduced motion on — animations not fighting it?;
5. Spot-check one gallery `alt` — describes content, not filename.

Five steps, ~ten minutes. Cheaper than email: "I cannot close the lightbox".

## Copy Is Accessibility Too

"Click here" fails out of context for screen readers. "Send message" and "Read accessibility statement" beat "Learn more". Error text should say how to fix, not only turn red.

Multilingual: do not cram long English into narrow buttons — truncation hurts sighted and assistive users.

## Forms and Custom Controls

Contact and tool pages are where personal sites slip. Native inputs, associated labels, logical tab order, and error text tied to fields — not only red borders. If you build a custom select or theme menu, test with keyboard and one screen reader you can access (NVDA on Windows, VoiceOver on Mac). You do not need certification; you need main path not broken.

## Images and Decorative Flourish

Minimal sites still use hero images, gallery grids, icons. Decorative SVGs should be hidden from assistive tech; informative images need alt that says what matters. Icon-only controls need `aria-label`. The gallery on alexander.xin is a frequent regression surface — every lightbox change gets the five-step checklist.

## Closing Thoughts

Accessibility, minimalism, and performance point the same way: fewer barriers, less noise, clear structure. Tab navigation once, glance contrast, read alts — cost is tiny next to rework. Few readers on a personal site, but each reader is whole; "just my page" is a poor excuse to leave the door half-shut for keyboard-only visitors.
