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
      { title: "CCNA", description: "Switching, routing, services, security, and assurance.", href: "/learn/cisco/ccna", level: "JUNIOR", lessons: 12 },
      { title: "CCNP Enterprise", description: "Advanced routing, design, services, and troubleshooting.", href: "/learn/cisco/ccnp", level: "PROFESSIONAL", lessons: 10 },
    ],
    featured: ["cisco/ccna/ospf-fundamentals", "cisco/ccna/vlan-trunks", "cisco/ccnp/bgp-path-selection"],
    console: ["show ip interface brief", "show interfaces trunk", "show ip ospf neighbor", "show ip bgp summary"],
  },
  {
    slug: ["cisco", "ccna"], code: "CCNA", title: "CCNA Operations Path", icon: Network,
    eyebrow: "CISCO / ASSOCIATE ROUTE", level: "JUNIOR",
    description: "A practical curriculum for operating small and medium routed and switched networks.",
    outcomes: ["Build VLANs and trunks", "Configure OSPF", "Apply ACL and NAT", "Verify network services"],
    modules: [
      { title: "Network access", description: "VLANs, trunks, EtherChannel, and spanning tree.", href: "/learn/cisco/ccna/vlan-trunks", level: "JUNIOR", lessons: 4 },
      { title: "IP connectivity", description: "Static routing, OSPF, gateways, and path selection.", href: "/learn/cisco/ccna/ospf-fundamentals", level: "JUNIOR", lessons: 5 },
      { title: "Services + security", description: "DHCP, NAT, ACLs, NTP, and secure management.", href: "/learn/cisco/ccna/standard-acls", level: "JUNIOR", lessons: 3 },
    ],
    featured: ["cisco/ccna/ospf-fundamentals", "cisco/ccna/vlan-trunks", "cisco/ccna/standard-acls"],
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
