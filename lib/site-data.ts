export type SkillLevel = "FOUNDATION" | "JUNIOR" | "PROFESSIONAL" | "ADVANCED";

export type CareerStage = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  level: SkillLevel;
  description: string;
  outcome: string;
  estimated: string;
  prerequisites: string[];
  skills: string[];
  labs: number;
  commands: number;
  tone: "cyan" | "blue" | "purple" | "red" | "amber" | "green";
};

export const careerStages: CareerStage[] = [
  {
    id: "foundations",
    number: "01",
    title: "Network Foundations",
    shortTitle: "Foundations",
    level: "FOUNDATION",
    description:
      "Build the mental model behind packets, addressing, operating systems, and repeatable technical work.",
    outcome: "Explain how traffic moves and inspect a host from the terminal.",
    estimated: "8–12 weeks",
    prerequisites: ["Curiosity", "A computer", "No prior networking required"],
    skills: [
      "Networking Fundamentals",
      "IPv4 & IPv6",
      "Subnetting",
      "OSI / TCP-IP",
      "Ethernet & ARP",
      "DNS & DHCP",
      "Linux Fundamentals",
      "Git",
      "Basic Python",
    ],
    labs: 12,
    commands: 38,
    tone: "cyan",
  },
  {
    id: "junior",
    number: "02",
    title: "Junior Network Engineer",
    shortTitle: "Junior",
    level: "JUNIOR",
    description:
      "Configure and troubleshoot small routed and switched networks using the tools found on a real support desk.",
    outcome: "Operate a small production network and diagnose common user-impacting faults.",
    estimated: "12–18 weeks",
    prerequisites: ["Network Foundations", "IPv4 subnetting", "Basic Linux CLI"],
    skills: [
      "Cisco CCNA",
      "VLANs & Trunks",
      "STP",
      "Static Routing",
      "OSPF",
      "ACL & NAT",
      "Wireshark",
      "Packet Tracer",
      "GNS3",
      "Troubleshooting",
    ],
    labs: 24,
    commands: 96,
    tone: "blue",
  },
  {
    id: "professional",
    number: "03",
    title: "Network Engineer",
    shortTitle: "Professional",
    level: "PROFESSIONAL",
    description:
      "Design resilient enterprise networks and reason through routing policy, failure domains, and scale.",
    outcome: "Design, deploy, and troubleshoot multi-site enterprise infrastructure.",
    estimated: "18–26 weeks",
    prerequisites: ["CCNA-level routing", "Switching fundamentals", "Structured troubleshooting"],
    skills: [
      "Cisco CCNP",
      "Advanced OSPF",
      "BGP",
      "Route Redistribution",
      "Advanced Switching",
      "VPN",
      "QoS",
      "High Availability",
      "Enterprise Design",
    ],
    labs: 32,
    commands: 148,
    tone: "green",
  },
  {
    id: "automation",
    number: "04",
    title: "Network Automation Engineer",
    shortTitle: "Automation",
    level: "PROFESSIONAL",
    description:
      "Move from one device at a time to versioned, tested, and repeatable infrastructure workflows.",
    outcome: "Automate configuration, backup, validation, and compliance across a fleet.",
    estimated: "12–20 weeks",
    prerequisites: ["Professional networking", "Git fundamentals", "Basic Python"],
    skills: [
      "Python",
      "Git",
      "APIs",
      "Ansible",
      "Netmiko",
      "NAPALM",
      "RESTCONF",
      "NETCONF",
      "YANG",
      "CI/CD",
    ],
    labs: 20,
    commands: 74,
    tone: "purple",
  },
  {
    id: "security",
    number: "05",
    title: "Network Security & Firewalls",
    shortTitle: "Security",
    level: "PROFESSIONAL",
    description:
      "Control trust boundaries, inspect flows, and build resilient policy around enterprise traffic.",
    outcome: "Deploy and troubleshoot firewall policy, NAT, VPNs, and high availability.",
    estimated: "14–22 weeks",
    prerequisites: ["Routing proficiency", "TCP/IP fluency", "Packet analysis"],
    skills: [
      "Security Policy",
      "Palo Alto",
      "FortiGate",
      "Cisco Firewall Concepts",
      "NAT",
      "IPsec",
      "SSL VPN",
      "High Availability",
      "Logging",
    ],
    labs: 22,
    commands: 88,
    tone: "red",
  },
  {
    id: "advanced",
    number: "06",
    title: "Advanced & Senior Engineer",
    shortTitle: "Advanced",
    level: "ADVANCED",
    description:
      "Connect architecture, operations, automation, and business risk across complex network systems.",
    outcome: "Own architecture decisions and lead production infrastructure through change.",
    estimated: "Ongoing",
    prerequisites: ["Production experience", "Deep routing knowledge", "Automation practice"],
    skills: [
      "BGP Design",
      "MPLS",
      "SD-WAN",
      "Cloud Networking",
      "Infrastructure as Code",
      "Docker",
      "Network Observability",
      "Architecture",
      "Technical Leadership",
    ],
    labs: 18,
    commands: 64,
    tone: "amber",
  },
];

export type Technology = {
  name: string;
  code: string;
  description: string;
  level: SkillLevel;
  modules: number;
  status: "CORE" | "NEXT" | "SPECIALIZE";
  tone: CareerStage["tone"];
  href: string;
};

export const technologies: Technology[] = [
  {
    name: "Cisco CCNA",
    code: "IOS",
    description: "Routing, switching, services, security, and assurance.",
    level: "JUNIOR",
    modules: 20,
    status: "CORE",
    tone: "blue",
    href: "/learn/cisco/ccna",
  },
  {
    name: "Linux",
    code: "SH",
    description: "The operating system skills network engineers actually use.",
    level: "FOUNDATION",
    modules: 16,
    status: "CORE",
    tone: "green",
    href: "/learn/linux",
  },
  {
    name: "Cisco CCNP",
    code: "ENC",
    description: "Enterprise routing, design, services, and troubleshooting.",
    level: "PROFESSIONAL",
    modules: 18,
    status: "NEXT",
    tone: "cyan",
    href: "/learn/cisco/ccnp",
  },
  {
    name: "Python",
    code: "PY",
    description: "Scripts for backups, validation, APIs, and configuration.",
    level: "JUNIOR",
    modules: 16,
    status: "NEXT",
    tone: "amber",
    href: "/learn/python",
  },
  {
    name: "Ansible",
    code: "YML",
    description: "Repeatable change across Cisco, Palo Alto, and Fortinet.",
    level: "PROFESSIONAL",
    modules: 14,
    status: "SPECIALIZE",
    tone: "red",
    href: "/learn/ansible",
  },
  {
    name: "GNS3",
    code: "LAB",
    description: "Production-shaped practice without production risk.",
    level: "JUNIOR",
    modules: 12,
    status: "CORE",
    tone: "cyan",
    href: "/gns3",
  },
  {
    name: "Palo Alto",
    code: "PAN",
    description: "Zones, policy, NAT, VPN, App-ID, logging, and HA.",
    level: "PROFESSIONAL",
    modules: 15,
    status: "SPECIALIZE",
    tone: "amber",
    href: "/firewalls/palo-alto",
  },
  {
    name: "FortiGate",
    code: "FGT",
    description: "Policies, routing, SD-WAN, VPN, profiles, and HA.",
    level: "PROFESSIONAL",
    modules: 15,
    status: "SPECIALIZE",
    tone: "red",
    href: "/firewalls/fortigate",
  },
  {
    name: "Git",
    code: "GIT",
    description: "Version, review, and safely recover network changes.",
    level: "FOUNDATION",
    modules: 8,
    status: "CORE",
    tone: "purple",
    href: "/roadmap#foundations",
  },
];

export type SearchItem = {
  title: string;
  description: string;
  category: "Navigate" | "Lessons" | "Reference";
  href: string;
  keywords: string;
};

export const searchItems: SearchItem[] = [
  {
    title: "Career roadmap",
    description: "The complete path from first ping to senior engineer.",
    category: "Navigate",
    href: "/roadmap",
    keywords: "path career junior senior foundations automation security",
  },
  {
    title: "Learning systems index",
    description: "Browse technologies and structured curricula.",
    category: "Navigate",
    href: "/learn",
    keywords: "learn cisco linux python ansible gns3",
  },
  {
    title: "OSPF fundamentals",
    description: "How OSPF forms adjacencies, selects paths, and converges.",
    category: "Lessons",
    href: "/learn/cisco/ccna/ospf-fundamentals",
    keywords: "ospf configuration cisco ccna route routing neighbor",
  },
  {
    title: "OSPF configuration",
    description: "A reusable Cisco IOS configuration example.",
    category: "Reference",
    href: "/learn/cisco/ccna/ospf-fundamentals#configuration",
    keywords: "ospf command router ospf network area config",
  },
  {
    title: "OSPF verification",
    description: "Neighbor, database, and route verification workflow.",
    category: "Reference",
    href: "/learn/cisco/ccna/ospf-fundamentals#verification",
    keywords: "ospf troubleshoot show ip neighbor database route",
  },
  {
    title: "Linux ip command",
    description: "Inspect interfaces, addresses, links, and routes.",
    category: "Lessons",
    href: "/learn/linux/networking/ip-command",
    keywords: "linux ip addr route link network command reference",
  },
  {
    title: "Network automation path",
    description: "Python, Git, APIs, Ansible, NETCONF, and YANG.",
    category: "Navigate",
    href: "/roadmap#automation",
    keywords: "automation python ansible netmiko napalm api netconf yang",
  },
  {
    title: "Firewall engineering path",
    description: "Palo Alto, FortiGate, policy, NAT, VPN, and HA.",
    category: "Navigate",
    href: "/roadmap#security",
    keywords: "security firewall palo alto fortigate nat vpn policy",
  },
];

export const primaryNavigation = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "Learn", href: "/learn" },
  { label: "Labs", href: "/labs" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/tools" },
  { label: "Reference", href: "/reference" },
];
