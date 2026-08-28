# NetPath content model

NetPath separates authored learning data from route and presentation code. All
catalogs use the schemas in `content/schema.ts`.

## Add a command reference

Add a row to the relevant `content/reference/*.ts` platform file. Each record is
normalized through `makeReferenceSet()` and validated by `referenceCommandSchema`.
Keep command mode, level, lifecycle status, safety flag, example, official source,
and operational context accurate for the target release. Add new platforms to
`content/reference/index.ts`; the unified route and global search then update
automatically. See `docs/REFERENCE.md` for the row format and safety rules.

## Add a lesson

1. Add one seed in `content/lessons.ts` with a unique slash-delimited `slug`.
2. Supply a useful title, technology, command example, and verification sequence.
3. Extend the seed or factory when a lesson needs a specialized optional section.
4. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

Every generated lesson is validated by `content/schema.ts`. The catch-all
`app/learn/[...slug]/page.tsx` route creates the page automatically.

## Maintain the CCNA 200-301 path

The CCNA system is intentionally separate from the small generic lesson seed:

- `content/cisco/ccna/objectives.ts` is the versioned v1.1 objective catalog.
- `content/cisco/ccna/modules.ts` defines the 12 ordered modules and book chapter map.
- `content/cisco/ccna/lessons-*.ts` contains original focused lesson records.
- `content/cisco/ccna/index.ts` builds routes, navigation data, statistics, legacy
  redirects, and the objective-to-lesson coverage matrix.
- `content/cisco/ccna/types.ts` requires exam version and objective identifiers on
  every lesson.

Add or revise a CCNA lesson through `makeCcnaLesson()`, then run
`npm run audit:ccna`. The audit must report zero missing objective IDs. Keep a
future blueprint in a separate versioned catalog rather than silently mixing it
into `200-301 v1.1`.

The official Cisco exam-topics document controls scope. The attached Official
Cert Guide volumes are topic-depth references only. Do not copy their prose,
figures, tables, questions, or labs into NetPath.

## Maintain the Linux network operations path

The Linux path uses a dedicated capability-driven model instead of the generic
lesson seed:

- `content/linux/network-engineering/modules.ts` defines 12 ordered modules and
  71 versioned network-operations capabilities.
- `content/linux/network-engineering/lessons-*.ts` contains the focused,
  original lesson records.
- `content/linux/network-engineering/index.ts` builds routes, legacy redirects,
  statistics, generic adapters, and the capability-to-lesson coverage matrix.
- `content/linux/network-engineering/types.ts` requires outcomes, mental model,
  mechanics, terminology, diagram, commands, verification, safety, mistakes,
  two fault scenarios, field use, practice, questions, references, and links.

Add or revise a lesson through `makeLinuxLesson()`, then run
`npm run audit:linux`. The audit must report all 71 capabilities covered and
zero missing capability IDs. Keep distribution-specific runtime details
explicit and preserve Ubuntu Server as the working baseline without presenting
one network manager or service name as universal Linux behavior.

Use primary manuals and official project documentation to anchor behavior.
NetPath explanations, diagrams, command narratives, questions, faults, and labs
must remain original. Never include real credentials, private keys, production
addresses, or destructive examples without a clear safety boundary and rollback.

## Add a technology hub

Add a record to `content/hubs.ts`. Hub slugs share the same catch-all route, and
featured lesson values use lesson slugs without the `/learn/` prefix.

## Add a lab

Add a complete record to `content/labs.ts`, including topology, addressing,
requirements, tasks, starter state, protected solution, failure analysis, and
download links. `/labs/[slug]` is generated automatically.

## Add a project

Add a record to `content/projects.ts` with platform, level, build time, topology,
technologies, engineering sections, safe downloads, and related content. The
`/projects/[platform]/[slug]` route is generated automatically.

## Add a troubleshooting scenario

Add a record seed to `content/troubleshooting.ts`. Keep symptoms, known information,
hypotheses, commands, and evidence separate from diagnosis, fix, verification, and
root cause so the solution gate remains meaningful.

## Add an interview question

Add a record to `content/interviews.ts` with a role, category, technology, hint,
answer, and explanation of the reasoning. Related lesson/lab links are optional.

## Add a glossary term

Add an entry to `content/glossary.ts` with the expanded name, concise definition,
operational relevance, and related terms. Add a related lesson when one exists.

## Replace placeholders

- Screenshot placeholders live in guide components and should be replaced with
  approved captures under `public/images/`.
- Video placeholders should become links or embeds from an approved hosting
  service; do not commit large video binaries.
- Lab downloads belong under `public/downloads/` only when redistributable.
