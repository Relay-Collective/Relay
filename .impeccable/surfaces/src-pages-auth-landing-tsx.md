---
version: 1
slug: "src-pages-auth-landing-tsx"
primary_target: "src/pages/auth/Landing.tsx"
related_targets: ["src/components/landing"]
---

# Public landing page

Mode: Persuade. Audience: nonprofit leaders deciding whether their organization should join; also staff and volunteer drivers looking for the way in. Action: Get Started (/register) or Log in (/signin). Proof on hand: the working transportation workflow, the pilot with The Salvation Army – Belkin Communities of Hope, open source. No numbers, testimonials or photography.

Scope: `src/pages/auth/Landing.tsx` and `src/components/landing/*`, plus the landing-only `rcl-` CSS and landing tokens in `src/index.css`. The signed-in app is out of scope.

## Direction contract

seed: none (direction pinned by the user's brief, 2026-10-31)

THESIS: The page proves coordination by showing it. The hero is one Relay Collective workspace with the parts of the platform connected around it (organizations, volunteers, transportation, community services, community impact), so transportation reads as one module, not the product. It refuses the nonprofit stock-photo hero and the abstract-shape SaaS hero.

OWN-WORLD: Porcelain #F8F9F7 ground, white working surfaces with 1px #E5E9EC edges, midnight ink #111820 type and buttons. One large electric-blue field and a small cantaloupe disc sit behind the product. Space Grotesk display, DM Sans text, one Instrument Serif italic word per heading in cantaloupe-ink. A single blue route line threads through every section.

STORY: First you see what it is, then the flow (request → driver confirmed → completed), the capabilities with honest status labels, the workspace, three steps, why it matters, and the close.

FIRST VIEWPORT: A two-line headline at every width ("Technology that" / "brings us together."), sized from its column with container units so neither line wraps. Then the signature CTA pair (60px pills with a round arrow chamber and a hover handoff), stacked full width on phones. Beside it from xl (below it on smaller screens), the Connected Ecosystem: a large workspace overview framed by the logo's electric hook, cropped behind its top-left corner, and a cantaloupe disc at its right. Three tiers: Organizations and Volunteers float above as upper cards; Transportation and Community services dock on its lower edge as chips; Community impact hangs beneath as the outcome. Thin electric connectors with white casing are measured from the DOM. Cards are links to their capability sections; hovering or focusing one lights the matching nav item, metric and activity row, and brings its connector forward. Honest status: "Drivers today", "Planned". Phones: workspace, two upper cards tucked under it, a two-row services list, then impact. Pilot line follows the visual on phones.

SIGNATURE: The headline rises line by line, "together." last with a slight settle. The CTA arrows hand off on hover. The workspace lands, the upper cards and their connectors follow, the chips dock, impact arrives (all in by about 1.8s). One relay point then travels each connector once (blue in from Organizations, cantaloupe out to Volunteers, blue down to impact), and everything rests. Reduced motion shows the final state.

RISK: Five cards around a dashboard could read as a network diagram. Mitigation: a dominant workspace, three tiers of card weight, three thin connectors only, and real hover links between each card and the workspace.
