import { ansibleReference } from "@/content/reference/ansible";
import { ciscoReference } from "@/content/reference/cisco";
import { fortigateReference } from "@/content/reference/fortigate";
import { gitReference } from "@/content/reference/git";
import { linuxReference } from "@/content/reference/linux";
import { paloAltoReference } from "@/content/reference/palo-alto";
import type { ReferenceCommand, ReferencePlatform } from "@/content/schema";

export type ReferencePlatformDefinition = {
  slug: string;
  platform: ReferencePlatform;
  title: string;
  shortTitle: string;
  description: string;
  sourceLabel: string;
  sourceHref: string;
  commands: ReferenceCommand[];
};

export const referencePlatforms: ReferencePlatformDefinition[] = [
  {
    slug: "linux",
    platform: "Linux",
    title: "Linux Network Command Reference",
    shortTitle: "Linux",
    description: "Interface, routing, packet capture, DNS, sockets, firewall, service, process, and file workflows for network engineers.",
    sourceLabel: "Linux man-pages index",
    sourceHref: "https://man7.org/linux/man-pages/dir_all_alphabetic.html",
    commands: linuxReference,
  },
  {
    slug: "cisco",
    platform: "Cisco IOS / IOS-XE",
    title: "Cisco IOS / IOS-XE Command Reference",
    shortTitle: "Cisco IOS / IOS-XE",
    description: "Operational, configuration, routing, switching, services, security, and troubleshooting commands organized by IOS mode.",
    sourceLabel: "Cisco IOS XE command reference",
    sourceHref: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/command_reference/b_1713_9300_cr/1713_9300_cr_CLT_chapter.html",
    commands: ciscoReference,
  },
  {
    slug: "palo-alto",
    platform: "Palo Alto PAN-OS",
    title: "Palo Alto PAN-OS Command Reference",
    shortTitle: "PAN-OS",
    description: "Operational and candidate-configuration workflows for routing, policy, sessions, VPN, HA, logs, and dataplane troubleshooting.",
    sourceLabel: "PAN-OS CLI quick start",
    sourceHref: "https://docs.paloaltonetworks.com/ngfw/pan-os-cli-quick-start/cli-cheat-sheet-networking",
    commands: paloAltoReference,
  },
  {
    slug: "fortigate",
    platform: "FortiGate FortiOS",
    title: "FortiGate FortiOS Command Reference",
    shortTitle: "FortiOS",
    description: "System, routing, policy, session, VPN, SD-WAN, HA, packet capture, debug-flow, logging, and configuration workflows.",
    sourceLabel: "FortiOS CLI reference",
    sourceHref: "https://docs.fortinet.com/document/fortigate/8.0.0/cli-reference/84566/fortios-cli-reference",
    commands: fortigateReference,
  },
  {
    slug: "git",
    platform: "Git",
    title: "Git Command Reference for Network Engineers",
    shortTitle: "Git",
    description: "Repository, staging, history, branching, remote, recovery, and troubleshooting workflows for version-controlled network automation.",
    sourceLabel: "Official Git reference",
    sourceHref: "https://git-scm.com/docs",
    commands: gitReference,
  },
  {
    slug: "ansible",
    platform: "Ansible",
    title: "Ansible Command Reference for Network Engineers",
    shortTitle: "Ansible",
    description: "Inventory, playbook, validation, targeting, vault, collection, and diagnostic commands for safer network automation runs.",
    sourceLabel: "Ansible command-line tools",
    sourceHref: "https://docs.ansible.com/projects/ansible/latest/command_guide/index.html",
    commands: ansibleReference,
  },
];

export const referencePlatformBySlug = Object.fromEntries(
  referencePlatforms.map((definition) => [definition.slug, definition]),
) as Record<string, ReferencePlatformDefinition>;

export const referenceCommands = referencePlatforms.flatMap((definition) => definition.commands);

export const referenceCounts = Object.fromEntries(
  referencePlatforms.map((definition) => [definition.slug, definition.commands.length]),
) as Record<string, number>;
