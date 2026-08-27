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
