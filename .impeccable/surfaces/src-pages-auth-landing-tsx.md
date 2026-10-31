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

THESIS: The page proves coordination by showing it. The hero is one request travelling Request → Connection → Impact through real Relay Collective screens. It refuses the nonprofit stock-photo hero and the abstract-shape SaaS hero.

OWN-WORLD: Porcelain #F8F9F7 ground, white working surfaces with 1px #E5E9EC edges, midnight ink #111820 type and buttons. One large electric-blue field and a small cantaloupe disc sit behind the product. Space Grotesk display, DM Sans text, one Instrument Serif italic word per heading in cantaloupe-ink. A single blue route line threads through every section.

STORY: First you see what it is, then the flow (request → driver confirmed → completed), the capabilities with honest status labels, the workspace, three steps, why it matters, and the close.

FIRST VIEWPORT: Headline left. On the right, a layered composition: dashboard, request card, "Driver confirmed" panel and "Ride completed" chip, joined by a drawn route.

SIGNATURE: The hero plays the ride once (request appears, then the route draws to the driver, then to completion), then rests. The same route line returns in How it works.

RISK: The product cards could read as generic floating cards. Mitigation: real labels, a visible route linking them, and one composition, not a scatter.
