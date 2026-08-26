# NetPath

**The practical path to network engineering.**

NetPath is a content-first learning and reference platform for aspiring and working network engineers. It organizes Cisco, Linux, automation, security, labs, troubleshooting, and portfolio projects around career progression—from networking foundations to senior engineering work.

## Phase 1 status

Phase 1 establishes the product foundation:

- premium dark-first NetPath design system
- responsive global navigation and footer
- animated, accessible network-topology hero
- homepage with roadmap, technology, lab, reference, project, automation, and security previews
- interactive six-stage career roadmap
- scalable learning-systems index
- responsive three-column documentation shell
- two structured sample lessons
- reusable terminal with independent horizontal scrolling and copy controls
- global `Ctrl + K` / `Cmd + K` command search
- SEO metadata, sitemap, robots rules, loading state, error state, and custom 404
- designed placeholder asset system

Phase 2 will introduce the MDX content pipeline, full technology hubs, searchable command library, filters, lab modes, and downloadable lab infrastructure.

## Stack

- Next.js-compatible React application powered by Vinext
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI primitives
- Lucide icons
- Cloudflare-compatible production output

## Run locally

### Requirements

- Node.js `22.13.0` or newer
- npm
- WSL/Linux is recommended on Windows because the verified build scripts use Bash utilities

```bash
git clone https://github.com/mohamadreza121/NetworkStuff.git
cd NetworkStuff
npm ci
npm run dev
```

Open the local address printed by Vite.

For Reza's existing Windows checkout:

```powershell
cd C:\Dev\NetworkStuff
wsl
npm ci
npm run dev
```

## Important routes

| Route | Purpose |
| --- | --- |
| `/` | Product homepage and platform overview |
| `/roadmap` | Interactive career-progression roadmap |
| `/learn` | Technology and learning-system explorer |
| `/learn/cisco/ccna/ospf-fundamentals` | Cisco lesson-template example |
| `/learn/linux/networking/ip-command` | Linux command-reference lesson example |

## Project structure

```text
app/
├── layout.tsx                 # Global shell and metadata
├── page.tsx                   # Homepage
├── roadmap/page.tsx           # Career roadmap
├── learn/page.tsx             # Learning systems
└── learn/[...slug]/page.tsx   # Data-driven lesson renderer

components/
├── docs-navigation.tsx        # Desktop and mobile documentation navigation
├── lesson-article.tsx         # Reusable lesson architecture
├── roadmap-explorer.tsx       # Interactive roadmap control
├── search-command.tsx         # Ctrl/Cmd + K search
├── terminal-block.tsx         # Copyable technical terminal
└── topology-hero.tsx          # Network topology hero visual

lib/
├── lessons.ts                 # Structured sample lesson data
└── site-data.ts               # Roadmap, technologies, search, and navigation data

public/images/placeholders/    # Designed replaceable asset placeholders
```

## Add or edit a Phase 1 lesson

Lesson content is deliberately separated from React route components. Add a lesson object to `lib/lessons.ts` and include its URL segments in `slug`:

```ts
{
  slug: ["cisco", "ccna", "vlan-fundamentals"],
  title: "VLAN Fundamentals",
  // metadata and structured lesson sections...
}
```

The catch-all lesson route renders the common documentation layout. Phase 2 will migrate this content layer to MDX/frontmatter while preserving the same presentation components.

## Add searchable content

Add a record to `searchItems` in `lib/site-data.ts`. Search matches title, description, category, and keywords. Every result must point to a real route or heading anchor.

## Placeholder assets

Replace files under `public/images/placeholders/` in place, or add technology-specific assets under the matching future directory. Keep the same public path when replacing an asset so content pages do not need to change.

Do not commit large videos, proprietary Cisco images, firewall VM images, GNS3 VM disks, or ISO files. Use legal appliance notices and external hosting for large downloads.

## Quality commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment

Copy `.env.example` to `.env.local` when setting a production canonical URL:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Never commit credentials, tokens, private keys, or proprietary appliance images.

