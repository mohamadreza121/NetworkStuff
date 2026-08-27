import { defineReferenceCommands, type ReferenceCommand, type ReferencePlatform, type SkillLevel } from "@/content/schema";

type ReferenceSeed = {
  command: string;
  category: string;
  purpose: string;
  mode?: string;
  level?: SkillLevel;
  flags?: string;
  example?: string;
  aliases?: string[];
  related?: string[];
};

export function parseReferenceRows(input: string): ReferenceSeed[] {
  return input.trim().split("\n").map((line) => {
    const [command, category, purpose, mode, level, flags, ...exampleParts] = line.split("|").map((value) => value.trim());
    const example = exampleParts.join(" | ");
    return {
      command,
      category,
      purpose,
      mode: mode || undefined,
      level: (level || undefined) as SkillLevel | undefined,
      flags: flags || undefined,
      example: example || undefined,
    };
  });
}

const promptForMode: Record<string, string> = {
  "User EXEC": "R1> ",
  "Privileged EXEC": "R1# ",
  "Global Configuration": "R1(config)# ",
  "Interface Configuration": "R1(config-if)# ",
  "Router Configuration": "R1(config-router)# ",
  "Address Family Configuration": "R1(config-router-af)# ",
  "Line Configuration": "R1(config-line)# ",
  "ACL Configuration": "R1(config-ext-nacl)# ",
  "VLAN Configuration": "SW1(config-vlan)# ",
  "Route Map Configuration": "R1(config-route-map)# ",
  "DHCP Pool Configuration": "R1(dhcp-config)# ",
  "Class Map Configuration": "R1(config-cmap)# ",
  "Policy Map Configuration": "R1(config-pmap)# ",
  "Policy Map Class Configuration": "R1(config-pmap-c)# ",
  Operational: "> ",
  Configuration: "# ",
  "FortiOS CLI": "FGT # ",
  Shell: "$ ",
};

const operationalNoteFor = (platform: ReferencePlatform, category: string) => {
  if (platform === "Cisco IOS / IOS-XE") return `Confirm the active command mode and verify ${category.toLowerCase()} state before and after a change.`;
  if (platform === "Palo Alto PAN-OS") return "PAN-OS syntax and available fields can vary by release; use question-mark completion on the target firewall.";
  if (platform === "FortiGate FortiOS") return "FortiOS output and object paths can vary by release and enabled feature set; use CLI help on the target appliance.";
  if (platform === "Linux") return "Package availability and option spelling may vary by distribution; consult the installed man page when scripting.";
  if (platform === "Ansible") return "Run syntax, inventory, check-mode, and diff validation before applying network changes.";
  return "Inspect the working tree and current branch before using a command that changes repository state.";
};

const toolLinksFor = (platform: ReferencePlatform, category: string, command: string) => {
  const links: Array<{ label: string; href: string; meta?: string }> = [];
  const haystack = `${category} ${command}`.toLowerCase();
  if (haystack.includes("acl") || haystack.includes("access-list")) links.push({ label: "Open ACL Builder", href: "/tools/acl-builder" }, { label: "Open Wildcard Calculator", href: "/tools/wildcard-calculator" });
  if (haystack.includes("ospf")) links.push({ label: "Open OSPF Cost Calculator", href: "/tools/ospf-cost-calculator" });
  if (haystack.includes("eigrp")) links.push({ label: "Open EIGRP Calculator", href: "/tools/eigrp-calculator" });
  if (haystack.includes("ipv6")) links.push({ label: "Open IPv6 Helper", href: "/tools/ipv6-helper" });
  if (platform === "Linux" && (haystack.includes("address") || haystack.includes("routing"))) links.push({ label: "Open Subnet Calculator", href: "/tools/subnet-calculator" });
  return links;
};

export function makeReferenceSet(config: {
  platform: ReferencePlatform;
  source: { label: string; href: string };
  defaultMode: string;
  rows: ReferenceSeed[];
}): ReferenceCommand[] {
  return defineReferenceCommands(config.rows.map((seed) => {
    const mode = seed.mode ?? config.defaultMode;
    const legacy = seed.flags?.includes("L") ?? false;
    const destructive = seed.flags?.includes("D") ?? false;
    const prompt = promptForMode[mode] ?? "$ ";
    const firstWord = seed.command.split(/[\s[]/)[0].replace(/[^a-z0-9-]/gi, "").toLowerCase();
    return {
      command: seed.command,
      platform: config.platform,
      category: seed.category,
      level: seed.level ?? "JUNIOR",
      mode,
      purpose: seed.purpose,
      syntax: seed.command,
      examples: [`${prompt}${seed.example ?? seed.command}`],
      explanation: `${seed.purpose} This entry is scoped to the operational workflow a network engineer is most likely to perform.`,
      commonOptions: [],
      verification: seed.related?.slice(0, 2) ?? [],
      related: seed.related ?? [],
      operationalNotes: [operationalNoteFor(config.platform, seed.category)],
      warnings: destructive ? ["This operation can interrupt service, remove state, or discard data. Confirm scope and rollback before execution."] : legacy ? ["This command remains common on older systems, but a modern replacement is preferred for new workflows."] : [],
      aliases: seed.aliases ?? [],
      tags: Array.from(new Set([config.platform, seed.category, firstWord, ...(seed.aliases ?? [])].filter(Boolean))),
      status: legacy ? "LEGACY" : "CURRENT",
      destructive,
      legacy,
      toolLinks: toolLinksFor(config.platform, seed.category, seed.command),
      source: config.source,
    };
  }));
}
