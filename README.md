# NetPath

**The practical path to network engineering.**

NetPath is a dark, content-first learning and reference platform for network
engineers. Phase 2 turns the Phase 1 shell into a structured multi-route system
with technology hubs, validated lesson data, searchable commands, guided lab
practice, protected solutions, installation guides, and legal downloads.

## Phase 2 includes

- 42 schema-validated representative lessons across Linux, Cisco, Python,
  Ansible, automation, Palo Alto, FortiGate, and GNS3
- Linux, Cisco, CCNA, CCNP, Python, and Ansible technology hubs
- a searchable 24-command Linux field reference
- six complete labs with separate practice and revealed-solution modes
- addressing tables, topology panels, hints, expected output, and failure analysis
- Windows, Linux, and macOS GNS3 installation guides
- Packet Tracer, automation, and firewall entry routes
- global search across navigation, technologies, lessons, labs, commands,
  references, and troubleshooting
- copyable terminals, reusable callouts, video placeholders, and downloads

## Run locally

Requires Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

## Quality gates

```bash
npm run lint
npx tsc --noEmit
npm run build
node --test --test-concurrency=1 tests/*.test.mjs
```

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Product homepage |
| `/roadmap` | Career progression roadmap |
| `/learn` | Learning-system index |
| `/learn/linux` | Linux technology hub |
| `/learn/cisco/ccna` | CCNA curriculum hub |
| `/learn/cisco/ccnp` | CCNP curriculum hub |
| `/learn/python` | Python automation hub |
| `/learn/ansible` | Ansible hub |
| `/reference/linux` | Searchable Linux command library |
| `/labs` | Filterable lab library |
| `/labs/ospf-multi-area` | Representative practice/solution lab |
| `/automation` | Automation learning route |
| `/firewalls` | Palo Alto and FortiGate routes |
| `/gns3` | GNS3 platform hub |
| `/gns3/install/windows` | Representative 14-step install guide |
| `/packet-tracer` | Packet Tracer project route |

## Content architecture

The content layer lives in `content/`:

- `schema.ts` validates every lesson and optional content block with Zod.
- `lessons.ts` stores lesson seeds and produces consistent lesson records.
- `hubs.ts` defines technology-hub curricula and featured lessons.
- `commands.ts` defines Linux reference records.
- `labs.ts` defines practice and solution data independently.

See [`content/README.md`](content/README.md) for authoring instructions.

## Downloads and media

Small redistributable assets live under `public/downloads/`. Replace screenshot
and video placeholders with approved assets or hosted media. Never commit
credentials, private configurations, licensed course content, appliance images,
VM disks, ISO files, proprietary Packet Tracer files, or large videos.

Set `NEXT_PUBLIC_SITE_URL` in a local environment file when the canonical URL
differs from the provided deployment URL.
