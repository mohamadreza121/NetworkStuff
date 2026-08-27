import { defineProjects, type Project } from "@/content/schema";

const common = {
  architecture: [
    "Separate access, distribution, edge, and services responsibilities so failure domains remain visible.",
    "Document every routed boundary, VLAN, trust zone, and validation checkpoint before configuration begins.",
  ],
  objectives: [
    "Translate a written design brief into a working logical topology.",
    "Prove forwarding, control-plane state, and failure behavior with repeatable evidence.",
  ],
  skills: ["Address planning", "Configuration discipline", "Validation", "Troubleshooting", "Documentation"],
  prerequisites: ["IPv4 subnetting", "Cisco IOS fundamentals", "Structured verification workflow"],
  addressing: [
    { segment: "TRANSIT", prefix: "10.255.0.0/24", purpose: "Point-to-point routed links" },
    { segment: "USERS", prefix: "10.10.0.0/16", purpose: "Client access networks" },
    { segment: "SERVICES", prefix: "10.20.0.0/16", purpose: "Infrastructure and application services" },
  ],
  sections: {
    switching: ["Use explicit VLAN and trunk intent; verify allowed VLANs and spanning-tree state."],
    routing: ["Build reachability in layers, then prove the selected path and return path."],
    security: ["Apply policy at documented trust boundaries and validate counters, not assumptions."],
    services: ["Validate DHCP, DNS, and time dependencies independently before end-to-end testing."],
    automation: ["Keep device inventory and repeatable validation commands ready for future automation."],
    validation: ["Capture interface, neighbor, route, translation, and application-level evidence."],
    troubleshooting: ["Introduce one controlled failure and record symptom, evidence, root cause, and fix."],
  },
  downloads: {
    practice: "/downloads/labs/starter-manifest.txt",
    solution: "/downloads/labs/solution-manifest.txt",
  },
  relatedLessons: [
    { label: "OSPF Fundamentals", href: "/learn/cisco/ccna/ospf-fundamentals", meta: "CISCO · CCNA" },
    { label: "The Linux ip command", href: "/learn/linux/networking/ip-command", meta: "LINUX · FOUNDATION" },
  ],
  relatedLabs: [
    { label: "OSPF Multi-Area Enterprise", href: "/labs/ospf-multi-area", meta: "GNS3 · PROFESSIONAL" },
  ],
};

const projectBlueprints = [
  {
    title: "Enterprise Dual-Site Network", slug: "enterprise-dual-site", platform: "GNS3", category: "Enterprise", level: "PROFESSIONAL", estimatedMinutes: 240, status: "READY", sites: 2, devices: 18, featured: true,
    technologies: ["VLAN", "STP", "OSPF", "BGP", "NAT", "IPsec", "Linux"],
    summary: "Design an HQ and branch network with segmented campus switching, routed WAN, resilient edge policy, Linux services, and a documented validation plan.",
    topology: { nodes: ["INTERNET", "EDGE-RTR01", "FW-01 / FW-02", "CORE-01", "BRANCH-RTR01", "SRV-LNX01"], links: ["BGP", "HA", "10G", "IPSEC", "OSPF"], caption: "A dual-site enterprise path with an HA security edge and encrypted branch transport." },
  },
  {
    title: "Multi-Area OSPF Enterprise", slug: "multi-area-ospf-enterprise", platform: "GNS3", category: "Routing", level: "PROFESSIONAL", estimatedMinutes: 180, status: "DRAFT", sites: 3, devices: 10, featured: true,
    technologies: ["OSPF", "ABR", "Summarization", "IPv4", "Linux"],
    summary: "Build a three-area OSPF design, summarize branch space, and validate convergence after a controlled transit failure.",
    topology: { nodes: ["AREA 10", "ABR-01", "AREA 0", "ABR-02", "AREA 20"], links: ["OSPF", "BACKBONE", "OSPF", "SUMMARY"], caption: "Two non-backbone areas connect through a redundant area 0 core." },
  },
  {
    title: "BGP Edge Network", slug: "bgp-edge-network", platform: "GNS3", category: "Routing", level: "PROFESSIONAL", estimatedMinutes: 150, status: "DRAFT", sites: 2, devices: 7, featured: false,
    technologies: ["eBGP", "iBGP", "Local Preference", "AS Path", "Prefix Lists"],
    summary: "Connect an enterprise edge to two providers and document deterministic outbound and inbound path policy.",
    topology: { nodes: ["ISP-A", "EDGE-01", "CORE", "EDGE-02", "ISP-B"], links: ["eBGP", "iBGP", "iBGP", "eBGP"], caption: "A dual-provider enterprise edge with explicit policy boundaries." },
  },
  {
    title: "Branch Office IPsec VPN", slug: "branch-office-ipsec-vpn", platform: "GNS3", category: "Security", level: "PROFESSIONAL", estimatedMinutes: 140, status: "DRAFT", sites: 2, devices: 6, featured: false,
    technologies: ["IPsec", "IKE", "NAT Exemption", "OSPF", "ACL"],
    summary: "Establish a site-to-site tunnel, protect interesting traffic, and isolate negotiation from forwarding failures.",
    topology: { nodes: ["HQ-LAN", "HQ-FW", "INTERNET", "BR-FW", "BR-LAN"], links: ["TRUST", "IPSEC", "IPSEC", "TRUST"], caption: "Encrypted site-to-site transport across an untrusted network." },
  },
  {
    title: "Firewall DMZ Architecture", slug: "firewall-dmz-architecture", platform: "GNS3", category: "Security", level: "PROFESSIONAL", estimatedMinutes: 210, status: "DRAFT", sites: 1, devices: 11, featured: false,
    technologies: ["Firewall", "DMZ", "NAT", "Security Policy", "Logging"],
    summary: "Create explicit trust, DMZ, and untrust zones with published services, least-privilege policy, and evidence-led validation.",
    topology: { nodes: ["INTERNET", "FW-EDGE", "DMZ", "CORE", "USERS"], links: ["UNTRUST", "POLICY", "POLICY", "TRUST"], caption: "A three-zone firewall architecture with isolated published services." },
  },
  {
    title: "Dual-Stack IPv4/IPv6 Network", slug: "dual-stack-ipv4-ipv6", platform: "GNS3", category: "IPv6", level: "PROFESSIONAL", estimatedMinutes: 170, status: "DRAFT", sites: 2, devices: 9, featured: false,
    technologies: ["IPv4", "IPv6", "OSPFv3", "SLAAC", "DNS"],
    summary: "Operate IPv4 and IPv6 together, compare neighbor discovery with ARP, and validate independent routing planes.",
    topology: { nodes: ["CLIENT-V6", "ACCESS", "CORE", "EDGE", "DNS64"], links: ["SLAAC", "TRUNK", "OSPFv3", "DUAL STACK"], caption: "A dual-stack campus path with separate protocol verification." },
  },
  {
    title: "Campus VLAN Network", slug: "campus-vlan-network", platform: "Packet Tracer", category: "Switching", level: "FOUNDATION", estimatedMinutes: 75, status: "READY", sites: 1, devices: 8, featured: true,
    technologies: ["VLAN", "Trunking", "STP", "Inter-VLAN Routing"],
    summary: "Segment a small campus, build constrained trunks, and prove local and routed reachability.",
    topology: { nodes: ["PC-A", "SW-ACCESS", "SW-DIST", "RTR-01", "SRV-A"], links: ["VLAN 10", "TRUNK", "802.1Q", "VLAN 20"], caption: "A compact campus topology for foundational switching practice." },
  },
  {
    title: "Router-on-a-Stick", slug: "router-on-a-stick", platform: "Packet Tracer", category: "CCNA", level: "JUNIOR", estimatedMinutes: 60, status: "READY", sites: 1, devices: 6, featured: false,
    technologies: ["802.1Q", "Subinterfaces", "VLAN", "ARP"],
    summary: "Terminate multiple VLAN gateways on one routed interface and verify tagging, ARP, and connected routes.",
    topology: { nodes: ["VLAN 10", "SW-01", "RTR-01", "VLAN 20"], links: ["ACCESS", "TRUNK", "ACCESS"], caption: "One physical router interface carries multiple tagged Layer 3 gateways." },
  },
  {
    title: "Multi-Router OSPF", slug: "multi-router-ospf", platform: "Packet Tracer", category: "Routing", level: "JUNIOR", estimatedMinutes: 90, status: "DRAFT", sites: 3, devices: 7, featured: false,
    technologies: ["OSPF", "Router ID", "Passive Interfaces", "Default Route"],
    summary: "Form neighbors across three routers, originate a default route, and diagnose a mismatched network statement.",
    topology: { nodes: ["BRANCH-A", "R1", "R2", "R3", "BRANCH-B"], links: ["LAN", "OSPF", "OSPF", "LAN"], caption: "A single-area routed core connects two branch LANs." },
  },
  {
    title: "IPv6 Enterprise", slug: "ipv6-enterprise", platform: "Packet Tracer", category: "IPv6", level: "JUNIOR", estimatedMinutes: 100, status: "DRAFT", sites: 2, devices: 8, featured: false,
    technologies: ["IPv6", "SLAAC", "Static Routing", "Neighbor Discovery"],
    summary: "Create a structured IPv6 plan, enable router advertisements, and validate neighbor discovery and end-to-end forwarding.",
    topology: { nodes: ["CLIENT-A", "R1", "WAN", "R2", "CLIENT-B"], links: ["SLAAC", "IPv6", "/64", "SLAAC"], caption: "Two IPv6 LANs communicate across a routed point-to-point segment." },
  },
  {
    title: "ACL Security Lab", slug: "acl-security-lab", platform: "Packet Tracer", category: "Security", level: "JUNIOR", estimatedMinutes: 80, status: "DRAFT", sites: 1, devices: 7, featured: false,
    technologies: ["Standard ACL", "Extended ACL", "Wildcard Mask", "Logging"],
    summary: "Translate policy intent into ordered ACL entries and prove permitted and denied flows with counters.",
    topology: { nodes: ["USERS", "R1", "SERVERS", "ADMIN"], links: ["ACL IN", "ACL OUT", "MGMT"], caption: "Policy is enforced close to the documented traffic source." },
  },
  {
    title: "DHCP + NAT Branch Network", slug: "dhcp-nat-branch", platform: "Packet Tracer", category: "Enterprise", level: "JUNIOR", estimatedMinutes: 95, status: "DRAFT", sites: 1, devices: 7, featured: false,
    technologies: ["DHCP", "NAT", "PAT", "Default Route", "DNS"],
    summary: "Deliver client addressing and Internet access, then isolate DHCP, routing, translation, and DNS evidence.",
    topology: { nodes: ["CLIENTS", "SW-01", "BR-RTR", "ISP", "DNS"], links: ["DHCP", "VLAN", "PAT", "WAN"], caption: "A branch router provides addressing, default routing, and overload translation." },
  },
];

export const projects = defineProjects(projectBlueprints.map((project) => ({ ...common, ...project })));

export function getProject(platform: string, slug: string): Project | undefined {
  const normalized = platform.toLowerCase().replace(/-/g, " ");
  return projects.find((project) => project.slug === slug && project.platform.toLowerCase() === normalized);
}

export const projectHref = (project: Project) => `/projects/${project.platform.toLowerCase().replace(/ /g, "-")}/${project.slug}`;
