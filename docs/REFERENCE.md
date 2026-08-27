# Command reference authoring

The unified reference center contains 609 structured entries:

| Platform | File | Route | Entries |
| --- | --- | --- | ---: |
| Linux | `content/reference/linux.ts` | `/reference/linux` | 153 |
| Cisco IOS / IOS-XE | `content/reference/cisco.ts` | `/reference/cisco` | 280 |
| Palo Alto PAN-OS | `content/reference/palo-alto.ts` | `/reference/palo-alto` | 58 |
| FortiGate FortiOS | `content/reference/fortigate.ts` | `/reference/fortigate` | 57 |
| Git | `content/reference/git.ts` | `/reference/git` | 34 |
| Ansible | `content/reference/ansible.ts` | `/reference/ansible` | 27 |

`content/reference/index.ts` defines public slugs, titles, descriptions, official
sources, counts, and the combined catalog. `components/reference-browser.tsx` provides
query, platform, category, level, mode, and status filters plus collapsed detail cards.

## Record contract

Every record is validated by `referenceCommandSchema` in `content/schema.ts` and
contains command, platform, category, level, mode, purpose, syntax, examples,
explanation, common options, verification commands, related commands, operational
notes, warnings, aliases, tags, status, safety flags, related tools, and an official
source.

The compact source row format is:

```text
command|category|purpose|mode|level|flags|example
```

- Leave `mode` empty to use the platform default.
- Levels are `FOUNDATION`, `JUNIOR`, `PROFESSIONAL`, or `ADVANCED`.
- Use `L` for legacy syntax and `D` for a destructive, disruptive, or materially
  state-changing operation. Flags may be combined.
- An example may contain shell pipe characters; the parser preserves every field
  after the flags column as part of the example.
- Keep placeholders visibly generic (`ADDRESS`, `PREFIX`, `NAME`) and use
  documentation address space in concrete examples.

`makeReferenceSet()` adds prompt context, source metadata, platform operating notes,
status, warnings, tags, and relevant calculator links. If an entry needs richer
aliases, verification, options, or related commands, add those fields to the seed and
keep the normalized output schema-valid.

## Source policy

Prefer the vendor or project owner. The current collections use:

- [Linux man-pages index](https://man7.org/linux/man-pages/dir_all_alphabetic.html)
- [Cisco IOS XE command reference](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/command_reference/b_1713_9300_cr/1713_9300_cr_CLT_chapter.html)
- [PAN-OS CLI networking cheat sheet](https://docs.paloaltonetworks.com/ngfw/pan-os-cli-quick-start/cli-cheat-sheet-networking)
- [FortiOS CLI reference](https://docs.fortinet.com/document/fortigate/8.0.0/cli-reference/84566/fortios-cli-reference)
- [Official Git reference](https://git-scm.com/docs)
- [Ansible command-line guide](https://docs.ansible.com/projects/ansible/latest/command_guide/index.html)

Syntax and fields can change between releases. State the platform family accurately,
avoid presenting a version-specific command as universal, and tell readers to use
local CLI help or installed man pages before scripting changes.

## Authoring checklist

1. Confirm syntax and mode against an official source.
2. Write an original, task-oriented purpose and a bounded example.
3. Mark legacy and service-impacting operations conservatively.
4. Use the narrowest useful category and realistic experience level.
5. Confirm the platform count and combined count update automatically.
6. Search the global command dialog and the platform route for the new entry.
7. Run TypeScript, lint, unit, rendered-route, and production-build validation.

The older 24-entry `content/commands.ts` catalog remains only as a Phase 2 regression
fixture. New command content belongs in `content/reference/`.
