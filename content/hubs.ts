import type { LucideIcon } from "lucide-react";
import { Braces, Network, Server, Terminal, Workflow } from "lucide-react";

export type HubModule = {
  title: string;
  description: string;
  href: string;
  level: string;
  lessons: number;
};

export type TechnologyHub = {
  slug: string[];
  code: string;
  title: string;
  description: string;
  eyebrow: string;
  level: string;
  icon: LucideIcon;
  outcomes: string[];
  modules: HubModule[];
  featured: string[];
  console: string[];
};

export const hubs: TechnologyHub[] = [
  {
    slug: ["linux"], code: "LIN", title: "Linux for Network Engineers", icon: Terminal,
    eyebrow: "HOST OPERATIONS / CORE SYSTEM", level: "FOUNDATION → PROFESSIONAL",
    description: "Inspect, configure, automate, and troubleshoot the Linux systems that sit beside every modern network.",
    outcomes: ["Read host network state", "Trace traffic and DNS", "Operate services safely", "Automate repeatable checks"],
    modules: [
      { title: "Linux foundations", description: "Filesystem, permissions, processes, packages, and remote access.", href: "/learn/linux/foundations/shell-navigation", level: "FOUNDATION", lessons: 5 },
      { title: "Networking", description: "Interfaces, routes, sockets, DNS, and packet capture.", href: "/learn/linux/networking/ip-command", level: "FOUNDATION", lessons: 7 },
      { title: "Operations", description: "Logs, services, firewalls, and repeatable triage.", href: "/learn/linux/operations/systemd-services", level: "JUNIOR", lessons: 6 },
    ],
    featured: ["linux/networking/ip-command", "linux/networking/tcpdump-basics", "linux/operations/systemd-services"],
    console: ["ip -br address", "ip route get 1.1.1.1", "ss -tulpn", "journalctl -u ssh"],
  },
  {
    slug: ["cisco"], code: "IOS", title: "Cisco Learning System", icon: Network,
    eyebrow: "ROUTING + SWITCHING / CISCO IOS", level: "JUNIOR → PROFESSIONAL",
    description: "Move from a first switchport to resilient enterprise routing with configuration, proof, and fault isolation.",
    outcomes: ["Configure campus switching", "Operate dynamic routing", "Protect traffic flows", "Troubleshoot from evidence"],
    modules: [
      { title: "CCNA", description: "Complete Cisco 200-301 v1.1 path with objective-level practice.", href: "/learn/cisco/ccna", level: "JUNIOR", lessons: 65 },
      { title: "CCNP Enterprise", description: "Advanced routing, design, services, and troubleshooting.", href: "/learn/cisco/ccnp", level: "PROFESSIONAL", lessons: 10 },
    ],
    featured: ["cisco/ccna/routing/ospf-neighbors-and-router-id", "cisco/ccna/vlans-campus/dot1q-trunks", "cisco/ccnp/bgp-path-selection"],
    console: ["show ip interface brief", "show interfaces trunk", "show ip ospf neighbor", "show ip bgp summary"],
  },
  {
    slug: ["cisco", "ccna"], code: "CCNA", title: "Complete CCNA 200-301 v1.1 Path", icon: Network,
    eyebrow: "CISCO / ASSOCIATE ROUTE", level: "FOUNDATION → JUNIOR",
    description: "A blueprint-complete curriculum for building, verifying, breaking, and repairing small and medium routed and switched networks.",
    outcomes: ["Cover all 97 leaf objectives", "Build IOS and GUI workflows", "Verify from evidence", "Practice every lesson"],
    modules: [
      { title: "Network Foundations", description: "Components, architectures, media, transport, and virtualization.", href: "/learn/cisco/ccna/network-foundations", level: "FOUNDATION", lessons: 6 },
      { title: "Cisco IOS Operations", description: "CLI, configuration state, interfaces, and secure management.", href: "/learn/cisco/ccna/cisco-ios", level: "FOUNDATION", lessons: 4 },
      { title: "Ethernet and Switching", description: "Frames, MAC tables, interfaces, discovery, and LACP.", href: "/learn/cisco/ccna/ethernet-switching", level: "JUNIOR", lessons: 5 },
      { title: "VLANs and Campus Networks", description: "Access, voice, trunks, inter-VLAN routing, and Rapid PVST+.", href: "/learn/cisco/ccna/vlans-campus", level: "JUNIOR", lessons: 5 },
      { title: "IPv4 and IPv6 Addressing", description: "Subnetting, VLSM, IPv6 types, and host verification.", href: "/learn/cisco/ccna/ip-addressing", level: "JUNIOR", lessons: 6 },
      { title: "Routing and IP Connectivity", description: "Route decisions, static routing, OSPF, and first-hop redundancy.", href: "/learn/cisco/ccna/routing", level: "JUNIOR", lessons: 7 },
      { title: "IP Services", description: "NAT, time, DHCP/DNS, telemetry, QoS, and file transfer.", href: "/learn/cisco/ccna/ip-services", level: "JUNIOR", lessons: 7 },
      { title: "Security Fundamentals", description: "Identity, VPNs, ACLs, and Layer 2 protections.", href: "/learn/cisco/ccna/security", level: "JUNIOR", lessons: 8 },
      { title: "Wireless Networking", description: "RF, architectures, infrastructure, GUI, and WPA security.", href: "/learn/cisco/ccna/wireless", level: "JUNIOR", lessons: 5 },
      { title: "Automation", description: "Controllers, fabrics, AI/ML, REST, JSON, Ansible, and Terraform.", href: "/learn/cisco/ccna/automation", level: "JUNIOR", lessons: 6 },
      { title: "Troubleshooting", description: "Evidence-first access, routing, service, and security triage.", href: "/learn/cisco/ccna/troubleshooting", level: "JUNIOR", lessons: 3 },
      { title: "Final Review", description: "Coverage audit, configuration gauntlet, and capstone.", href: "/learn/cisco/ccna/final-review", level: "JUNIOR", lessons: 3 },
    ],
    featured: ["cisco/ccna/routing/ospf-neighbors-and-router-id", "cisco/ccna/vlans-campus/dot1q-trunks", "cisco/ccna/security/configure-and-verify-acls"],
    console: ["show vlan brief", "show interfaces trunk", "show ip route", "show access-lists"],
  },
  {
    slug: ["cisco", "ccnp"], code: "ENC", title: "CCNP Enterprise Path", icon: Server,
    eyebrow: "CISCO / PROFESSIONAL ROUTE", level: "PROFESSIONAL",
    description: "Design and operate scalable enterprise routing, services, and control-plane policy.",
    outcomes: ["Design OSPF areas", "Control BGP paths", "Redistribute safely", "Build resilient services"],
    modules: [
      { title: "Advanced routing", description: "Multi-area OSPF, BGP, redistribution, and policy.", href: "/learn/cisco/ccnp/bgp-path-selection", level: "PROFESSIONAL", lessons: 6 },
      { title: "Enterprise services", description: "FHRP, QoS, multicast, and network assurance.", href: "/learn/cisco/ccnp/hsrp-resiliency", level: "PROFESSIONAL", lessons: 4 },
    ],
    featured: ["cisco/ccnp/bgp-path-selection", "cisco/ccnp/route-redistribution", "cisco/ccnp/hsrp-resiliency"],
    console: ["show ip ospf database", "show ip bgp", "show route-map", "show standby brief"],
  },
  {
    slug: ["python"], code: "PY", title: "Python for Network Automation", icon: Braces,
    eyebrow: "AUTOMATION / PROGRAMMING ROUTE", level: "JUNIOR → PROFESSIONAL",
    description: "Turn network tasks into readable scripts with structured data, APIs, validation, and safe device access.",
    outcomes: ["Parse structured data", "Call network APIs", "Automate device checks", "Validate before change"],
    modules: [
      { title: "Python foundations", description: "Data types, control flow, functions, and files.", href: "/learn/python/foundations/network-data", level: "JUNIOR", lessons: 3 },
      { title: "Network automation", description: "APIs, Netmiko, parsing, and validation.", href: "/learn/python/automation/netmiko-basics", level: "PROFESSIONAL", lessons: 5 },
    ],
    featured: ["python/foundations/network-data", "python/automation/netmiko-basics", "python/automation/rest-api-requests"],
    console: ["python -m venv .venv", "pip install netmiko", "python inventory.py", "pytest -q"],
  },
  {
    slug: ["ansible"], code: "YML", title: "Ansible for Networks", icon: Workflow,
    eyebrow: "AUTOMATION / CONFIGURATION ROUTE", level: "PROFESSIONAL",
    description: "Model inventory, collect state, make controlled changes, and prove outcomes across a device fleet.",
    outcomes: ["Build clean inventory", "Back up configurations", "Deploy idempotent change", "Validate fleet state"],
    modules: [
      { title: "Control plane", description: "Inventory, variables, modules, and playbook structure.", href: "/learn/ansible/foundations/inventory", level: "PROFESSIONAL", lessons: 4 },
      { title: "Operational workflows", description: "Backups, change, compliance, and rollback.", href: "/learn/ansible/workflows/config-backup", level: "PROFESSIONAL", lessons: 4 },
    ],
    featured: ["ansible/foundations/inventory", "ansible/workflows/config-backup", "ansible/workflows/compliance-check"],
    console: ["ansible-inventory --graph", "ansible-playbook backup.yml", "ansible-playbook --check change.yml", "git diff"],
  },
];

export function getHub(slug: string[]) {
  return hubs.find((hub) => hub.slug.join("/") === slug.join("/"));
}
