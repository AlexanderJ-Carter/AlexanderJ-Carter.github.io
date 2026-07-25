---
title: "The Uses Page: Writing Your Stack as Readable Self-Description"
description: "A Uses page is not gear flex. Explain what you use and why — visitors and future-you benefit."
category: "Design Thinking"
pubDate: 2026-07-19
updatedDate: 2026-07-25
lang: en-GB
tags: ["Uses", "workflow", "personal sites"]
timeToRead: "10 min"
---

`/uses` pages are common on independent sites: editors, keyboards, cameras, hosts in a list. Done badly they read like uncensored receipts; done well like short engineering culture — how you work and what complexity you accept.

## Why Visitors Click

- Curious about site stack, want to replicate similar setup;
- Privacy- and performance-minded, checking if you practise what you preach;
- Potential collaborators judging collaboration cost quickly.

Uses should answer **why this choice**, not only **what I bought**.

## How I Group

On alexander.xin roughly:

- **The site itself**: Astro, Tailwind, deploy and CDN;
- **Writing and design**: editor, fonts, image workflow;
- **Devices**: only what affects output — not annual flagship showcase.

Each group gets a few sentences on trade-offs. Example: static generation because update rhythm and content shape match; a font because Chinese reading and headline character.

## Update Strategy

New laptop need not update the page immediately; new build chain or analytics tool should — same principle as syncing privacy policy. Stale Uses undermines trust in other pages.

Quarterly review is enough. Remove tools you no longer use before adding more.

## Division With About

- About: who you are, what you care about, how to contact;
- Uses: materials and constraints of craft;
- Projects: things built.

Cross-link, do not paste long duplicate prose. Visitor should build a mental model in two minutes.

## Honesty Over Completeness

Listing every npm package is noise. Listing the choices that shape speed, privacy, and maintenance burden is signal. If I run something embarrassing locally (proprietary font app, odd backup script), I mention it only when it affects what visitors see.

## Uses as Contract With Yourself

Writing "I chose X because Y" publicly makes future upgrades slightly harder to procrastinate. When I switch analytics or hosting, Uses and privacy policy are the reminder that trust pages must move together.

## What Not to Put on Uses

Salary tools, one-off experiments, and "I tried this for a weekend" do not belong unless they changed how the site runs. Similarly, avoid affiliate links disguised as recommendations — the page is self-description, not monetisation. If a tool is sponsored, say so elsewhere; Uses should stay clean enough to trust.

## Voice and Length

I aim for the tone of a colleague explaining their desk setup, not a product unboxing video. Two or three paragraphs per section is enough. Visitors who want every version number can read `package.json`; Uses answers the human question of intent.

## Examples of Good "Why" Sentences

Instead of "Editor: VS Code", write "Editor: VS Code — familiar keybindings, Astro extension, and I already use it for coursework so context switching stays low." Instead of "Host: Cloudflare", write "DNS and edge cache in one place; `_headers` in repo match how I think about deploy."

Those sentences age when the reason changes; that is the point — they force you to notice drift.

## Visitors From Hire and Collab Contexts

Recruiters sometimes skim Uses to see if you live in the same ecosystem as their team. That is fine. The page still should not read as keyword stuffing. If you list a tool, tie it to something you shipped on the site — a page, a workflow, a constraint you accepted.

## Closing Thoughts

Uses is a quiet trust instrument. Keep it short, true, and opinionated — a thumbnail of site technical ethics. Gear depreciates; sentences explaining why you work this way age better.
