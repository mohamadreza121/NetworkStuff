# NetPath content model

Phase 2 separates authored learning data from route and presentation code.

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

## Replace placeholders

- Screenshot placeholders live in guide components and should be replaced with
  approved captures under `public/images/`.
- Video placeholders should become links or embeds from an approved hosting
  service; do not commit large video binaries.
- Lab downloads belong under `public/downloads/` only when redistributable.
