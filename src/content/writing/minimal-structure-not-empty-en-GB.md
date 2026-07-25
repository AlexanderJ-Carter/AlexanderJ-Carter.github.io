---
title: 'Minimal Web Design Is Not About Removing Things: Structure, Tracking, and Space'
description: 'After decoration goes, spacing and type must be more precise. Constraints I actually use on this site.'
category: 'Design Thinking'
pubDate: 2026-06-18
updatedDate: 2026-07-25
lang: en-GB
tags: ['design', 'minimalism', 'typography']
timeToRead: '13 min'
---

"Minimal" is easily mistaken for empty: white background, one slogan, one button, brand complete. Visitors leave remembering "there was almost nothing".

Real minimalism is harder: **everything left must earn its place** — hierarchy through size and weight, sections through spacing, action through one clear primary control. Home, writing, and about on alexander.xin are ongoing practice in that discipline.

## Set a Budget Before Trusting Feel

I keep hard budgets (numbers can change per project, but the budget must exist):

1. **Colour**: two or three neutrals plus one accent. Accent only for links and primary actions — not decorative borders everywhere.
2. **Type**: one or two families. Distinguish heading and body with weight and size, not a third "personality" face.
3. **Spacing**: step on an 8px-style scale (8 / 16 / 24 / 32 / 48 / 64…). Do not random blank lines between paragraphs.
4. **Measure**: body copy at a comfortable reading width (often cited as ~60–70 characters); for Chinese I rely more on "this line is too long" instinct and testing.

Minimalism without budgets quietly reintroduces borders, shadows, and pill labels by the third revision — ending as a "restrained dashboard".

## White Space Is Structure, Not a Premium Filter

Bad white space: huge emptiness to "look expensive", content and actions pushed far apart, endless scrolling on mobile.

Good white space:

- **Group what belongs together** — title close to lede, lede slightly farther from body;
- **Separate topics with distance** — larger gaps between sections, not a hairline between everything;
- **Clear room for focus** — clean around the main headline; do not stack stats and six entry points on the first screen.

Empty space in painting is not "unpainted"; on the web it should not mean "not decided yet". It works like punctuation — telling the eye where to pause.

## Hierarchy and Tracking Beat Decoration

Minimal sites make type do the talking. When reviewing a page I ask:

- Eyes closed, then open — **where does the first glance land?** Is it the line I want?
- Do H1 / H2 / body form a stable ladder, or does each block invent its own?
- Is body contrast sufficient? Light grey on light grey is a common "fake premium" failure.
- Are links visible and focus rings present? Accessibility is not a bonus; it is the line between minimal and shippable.

Ultra-light weights and tiny sizes look editorial on large screens and unfinished on phones. When I use serif or display faces for character, body readability matters more than making everything "thin to the point of trembling".

## Can You Skip Cards Entirely?

Default answer: **yes, and often better.**

Cards (background, border, shadow, radius) suit a clickable interactive group. Three paragraphs of explanation need title, paragraphs, and spacing — not another container. Each container adds visual noise and another border colour to tune in dark mode.

Exception: tools, forms, filterable lists — users need "this is an operable region". Then cards are function, not style.

## Trade-offs on This Site

- **First screen does little.** Brand, one main line, one clear destination — better than writing list, sponsorship, and tools competing in one composition.
- **Dark mode is not an invert filter.** Minimal layouts go muddy in dark themes; neutral ramps need separate tuning, not colour-inverted light design.
- **Motion stays restrained.** Two or three intentional transitions can establish presence; fades everywhere feel like loading. Always respect `prefers-reduced-motion`.

## Self-check: Is It Empty?

Hide navigation and look at the first screen only. If swapping the domain still makes sense, brand may be weak. If removing one hollow sentence collapses the page, content may be thin. Minimalism needs **a specific person, specific work, specific sentences** — not space pretending to depth.

## Mobile: Where Minimalism Shows Cracks First

Desktop whitespace on a phone becomes "title far away, button after long scroll". The fix is not abandoning space but:

- Shrink first-screen task: one sentence + one primary action;
- Scale spacing by breakpoint, not copy desktop values;
- Touch targets large enough — do not shrink hit areas for "delicacy".

Minimal mobile means fewer scroll decisions per screen, not less content — long articles can be long if each viewport still has a reading anchor.

## Rhythm and Vertical Measure

Beyond horizontal line length, vertical rhythm matters: consistent spacing between headings and following paragraphs makes scanning easier without extra rules. When every section invents its own margin, the page feels assembled from blocks rather than one voice.

## Links and Affordance in Restrained UI

With few colours, links must still read as links — underline, weight, or clear hue shift. "Minimal" that hides interaction is not minimal; it is hostile. I test link discovery by asking someone unfamiliar to find the primary action in five seconds.

## Closing Thoughts

Minimal web work often hides in constraints you cannot see: palette budget, type scale, spacing ruler, contrast. Fewer elements are the outcome; correct structure is the cause. Before adding a divider or badge, ask: can spacing do this? If yes, do not add.
