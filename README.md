# NetPath

**The practical path to network engineering.**

NetPath is a production-oriented learning, lab, troubleshooting, project, reference,
and career platform for network engineers. Its interface combines technical
documentation, terminal workflows, network topology, and portfolio-ready case studies
in an obsidian / graphite / platinum visual system.

## Current features

- 42 schema-validated lessons across Cisco, Linux, Python, Ansible, automation,
  firewalls, and GNS3
- six technology hubs, 24 searchable Linux commands, and six practice/solution labs
- 12 GNS3 and Packet Tracer project architectures with reusable case-study pages
- nine evidence-led troubleshooting incidents with protected diagnoses
- 12 role- and technology-based interview questions with hints and reasoning
- a device-local junior Network Engineer readiness checklist
- an 18-term searchable glossary
- working IPv4 subnet and wildcard-mask calculators
- global keyboard search across hubs, lessons, labs, projects, commands, tools,
  incidents, interview questions, glossary terms, and reference pages
- canonical metadata, sitemap coverage, OpenGraph imagery, responsive navigation,
  reduced-motion support, and accessible interaction states

## Technology stack

- Next.js 16 / React 19
- Vinext + Vite for Cloudflare Workers output
- TypeScript and Zod content validation
- Tailwind CSS 4 plus vendored Shadcn primitives
- Node's built-in test runner
- ChatGPT Sites deployment manifest

## Install and run

Node.js 22.13 or newer and npm are required.

```bash
npm ci
npm run dev
```

The standard quality gates are:

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

## Repository structure

```text
app/          Routes, metadata, sitemap, and error states
components/   Shared presentation and interactive systems
content/      Validated lessons, labs, projects, incidents, interviews, glossary
lib/          Search, site configuration, selectors, and calculator logic
public/       Approved images and redistributable downloads
tests/        Content, logic, routing, and rendered-output validation
docs/         Authoring, design-system, and deployment guidance
```

## Major routes

| Route | Purpose |
| --- | --- |
| `/roadmap` | Six-stage Network Engineer progression |
| `/learn` | Technology and curriculum index |
| `/labs` | Practice/solution lab library |
| `/projects` | Project showcase and portfolio system |
| `/projects/gns3` | GNS3 engineering case studies |
| `/projects/packet-tracer` | Packet Tracer project architecture |
| `/troubleshooting` | Incident and diagnostic center |
| `/interview` | Interview questions, hints, and reasoning |
| `/job-ready` | Device-local readiness checklist |
| `/tools` | Engineer's toolkit |
| `/tools/subnet-calculator` | Working IPv4 subnet calculator |
| `/tools/wildcard-calculator` | Working wildcard-mask calculator |
| `/glossary` | Fast, searchable term reference |
| `/reference/linux` | Searchable Linux command reference |
| `/about` | Concise project mission |

## Add or replace content

The platform is intentionally content-driven. Most additions require one validated
record and optional approved assets, not layout changes.

- lessons: `content/lessons.ts`
- Linux commands: `content/commands.ts`
- labs: `content/labs.ts`
- projects: `content/projects.ts`
- troubleshooting scenarios: `content/troubleshooting.ts`
- interview questions: `content/interviews.ts`
- glossary terms: `content/glossary.ts`
- schemas: `content/schema.ts`

See [docs/CONTENT.md](docs/CONTENT.md) for field-level workflows and
[docs/PROJECTS.md](docs/PROJECTS.md) for project/download rules.

## Downloads, images, and video

- Put small, redistributable files in `public/downloads/` and reference them with
  root-relative URLs.
- Put approved optimized images in `public/images/`; provide explicit dimensions and
  avoid full-resolution topology exports when a smaller derivative is sufficient.
- Link or embed videos from an approved host instead of committing large binaries.
- Update `app/sitemap.ts` when adding a new static route outside a generated catalog.
- Set `NEXT_PUBLIC_SITE_URL` when the canonical origin differs from the deployment URL.

Never commit credentials, private configurations, licensed training material, Cisco
IOS/IOSv/IOS-XE images, FortiGate or Palo Alto VM images, qcow2 disks, GNS3 VM disks,
ISO files, or other proprietary/large binaries.

## Deployment

The production build emits a Cloudflare Worker-compatible bundle through the existing
Sites workflow. Preserve `.openai/hosting.json`, `vite.config.ts`, the lockfile, and the
build scripts. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
