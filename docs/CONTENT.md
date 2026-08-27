# Content authoring

NetPath catalogs are TypeScript data today and are shaped so they can be moved to MDX
frontmatter later without changing presentation components. Every record is validated
at module load by Zod in `content/schema.ts`.

## Workflow

1. Copy a nearby record in the relevant `content/*.ts` catalog.
2. Give it a unique lowercase slug.
3. Replace every educational placeholder with accurate, original material.
4. Add only approved root-relative image and download paths.
5. Add the record to search automatically by using the existing catalog export.
6. Run lint, TypeScript, tests, and the production build.

## Lesson

Add to `content/lessons.ts`. Required lesson structure includes prerequisites,
objectives, overview, terminology, a command example, verification, troubleshooting,
real-world context, and interview questions. The catch-all learning route is generated
from the slug array.

## Command reference

Add platform records under `content/reference/`. Keep the purpose concise, identify
the exact command mode, show one practical example, distinguish current and legacy
syntax, and mark any state-changing or service-impacting operation. The catalog is
validated by `referenceCommandSchema` and automatically joins global search. See
`docs/REFERENCE.md` for the complete authoring and source workflow.

## Lab

Add to `content/labs.ts`. Practice data must be independent from the protected
solution. Include topology, addressing, requirements, tasks, hints, starter state,
completed configuration, verification, failure analysis, and safe downloads.

## Project

Add to `content/projects.ts`. A project needs platform, category, standardized level,
estimated minutes, status, site/device counts, technologies, topology, architecture,
objectives, skills, prerequisites, addressing, engineering sections, downloads, and
related resources. `projectHref()` and the dynamic route create its URL.

Equivalent future frontmatter:

```yaml
---
title: "Enterprise Dual-Site Network"
slug: "enterprise-dual-site"
platform: "GNS3"
category: "Enterprise"
level: "PROFESSIONAL"
estimatedMinutes: 240
status: "DRAFT"
sites: 2
devices: 18
technologies: [VLAN, STP, OSPF, BGP, NAT, IPsec, Linux]
---
```

## Troubleshooting scenario

Add a seed to `content/troubleshooting.ts`. Preserve this separation:

- learner-visible: symptoms, known information, topology, possible causes,
  investigation, commands, and evidence
- protected solution: diagnosis, fix, verification, root cause, and takeaway

This enables the reusable solution gate on `/troubleshooting/[slug]`.

## Interview question

Add to `content/interviews.ts`. Use one of the schema categories and provide both an
answer and reasoning. The answer should explain how an engineer narrows or proves the
claim, not merely define a term.

## Glossary term

Add to `content/glossary.ts`. Define the term in one concise paragraph, state why it
matters operationally, and connect related terms. A related lesson is optional.

## Images and video

Put optimized, approved images under `public/images/` and use stable root-relative
paths. Keep dimensions explicit, load below-fold media lazily, and create smaller
topology derivatives rather than shipping giant source exports. Use hosted video or an
approved embed. Do not commit large video files.
