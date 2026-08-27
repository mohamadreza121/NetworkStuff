export type Lab = {
  slug: string;
  index: string;
  title: string;
  description: string;
  level: "FOUNDATION" | "JUNIOR" | "PROFESSIONAL";
  platform: "Packet Tracer" | "GNS3" | "Linux" | "Ansible";
  duration: string;
  devices: string;
  skills: string[];
  topology: { nodes: string[]; links: string[]; caption: string };
  addressing: { device: string; interface: string; address: string; gateway: string }[];
  requirements: string[];
  tasks: { title: string; detail: string; hint: string }[];
  starter: string;
  solution: {
    explanation: string;
    configuration: string;
    verification: string;
    failures: { symptom: string; cause: string; fix: string }[];
  };
  downloads: { label: string; href: string; note: string }[];
};

const commonFailures = [
  { symptom: "The expected neighbor or service never appears", cause: "A prerequisite interface, address, or process is not active.", fix: "Return to the baseline checks and prove each local dependency before testing end to end." },
  { symptom: "Control state is healthy but traffic still fails", cause: "The forwarding, policy, or return path differs from the control-plane view.", fix: "Trace both directions and compare the chosen route, policy counters, and translated addresses." },
];

export const labs: Lab[] = [
  {
    slug: "basic-vlan", index: "LAB-001", title: "Build a Two-VLAN Access Network", description: "Create two broadcast domains, assign access ports, and prove same-VLAN reachability without routing.",
    level: "FOUNDATION", platform: "Packet Tracer", duration: "35 min", devices: "2 switches · 4 hosts", skills: ["VLAN", "Access ports", "MAC table", "Verification"],
    topology: { nodes: ["PC-A", "SW1", "SW2", "PC-B"], links: ["VLAN 10", "802.1Q", "VLAN 20"], caption: "Two access switches carry VLAN 10 and VLAN 20 across one trunk." },
    addressing: [
      { device: "PC-A", interface: "NIC", address: "10.10.10.11/24", gateway: "—" },
      { device: "PC-B", interface: "NIC", address: "10.10.20.11/24", gateway: "—" },
      { device: "SW1", interface: "VLAN 99", address: "10.10.99.11/24", gateway: "10.10.99.1" },
      { device: "SW2", interface: "VLAN 99", address: "10.10.99.12/24", gateway: "10.10.99.1" },
    ],
    requirements: ["Create VLANs 10, 20, and 99 on both switches.", "Assign host ports as static access ports.", "Carry all three VLANs across the inter-switch trunk.", "Prove which hosts can and cannot communicate."],
    tasks: [
      { title: "Create the VLAN database", detail: "Name VLAN 10 USERS, VLAN 20 SERVERS, and VLAN 99 MGMT.", hint: "Start with show vlan brief on both switches." },
      { title: "Assign access ports", detail: "Place each host-facing port in the specified VLAN and enable PortFast.", hint: "Verify operational mode with show interfaces switchport." },
      { title: "Build the trunk", detail: "Use an explicit trunk and restrict the allowed list.", hint: "show interfaces trunk should list 10,20,99." },
    ],
    starter: "enable\nconfigure terminal\n! Build VLANs and interface assignments here",
    solution: { explanation: "The trunk extends each Layer 2 domain while access ports keep hosts in one VLAN. No Layer 3 device exists, so inter-VLAN traffic must fail by design.", configuration: "vlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 99\n name MGMT\ninterface gi0/1\n switchport mode trunk\n switchport trunk allowed vlan 10,20,99", verification: "show vlan brief\nshow interfaces trunk\nshow mac address-table dynamic", failures: commonFailures },
    downloads: [{ label: "Starter manifest", href: "/downloads/labs/starter-manifest.txt", note: "Legal placeholder for your own Packet Tracer file." }, { label: "Solution manifest", href: "/downloads/labs/solution-manifest.txt", note: "Configuration and verification checklist." }],
  },
  {
    slug: "inter-vlan-routing", index: "LAB-004", title: "Inter-VLAN Routing with Router-on-a-Stick", description: "Add 802.1Q subinterfaces, gateways, and an end-to-end verification sequence.",
    level: "JUNIOR", platform: "Packet Tracer", duration: "50 min", devices: "1 router · 1 switch · 4 hosts", skills: ["802.1Q", "Subinterfaces", "Gateway", "ARP"],
    topology: { nodes: ["USERS", "SW1", "R1", "SERVERS"], links: ["VLAN 10", "TRUNK", "VLAN 20"], caption: "R1 terminates one subinterface per VLAN over a single trunk." },
    addressing: [{ device: "R1", interface: "G0/0.10", address: "10.10.10.1/24", gateway: "—" }, { device: "R1", interface: "G0/0.20", address: "10.10.20.1/24", gateway: "—" }, { device: "PC-A", interface: "NIC", address: "10.10.10.11/24", gateway: "10.10.10.1" }, { device: "SRV-A", interface: "NIC", address: "10.10.20.20/24", gateway: "10.10.20.1" }],
    requirements: ["Create a trunk between SW1 and R1.", "Use dot1Q subinterfaces for VLANs 10 and 20.", "Configure correct host default gateways.", "Prove the routed path and ARP state."],
    tasks: [{ title: "Configure the trunk", detail: "Carry VLANs 10 and 20 toward the router.", hint: "The physical router interface has no IP address." }, { title: "Create subinterfaces", detail: "Match each tag to the correct gateway prefix.", hint: "encapsulation dot1Q must precede the IP address." }, { title: "Verify the path", detail: "Check local gateway pings before inter-VLAN traffic.", hint: "Inspect ARP and the connected routing table." }],
    starter: "interface g0/0\n no shutdown\n! Add tagged Layer 3 subinterfaces",
    solution: { explanation: "Each router subinterface becomes the Layer 3 gateway for one VLAN. The switch trunk carries tagged frames to the matching logical interface.", configuration: "interface g0/0.10\n encapsulation dot1Q 10\n ip address 10.10.10.1 255.255.255.0\ninterface g0/0.20\n encapsulation dot1Q 20\n ip address 10.10.20.1 255.255.255.0", verification: "show ip interface brief\nshow ip route connected\nshow arp", failures: commonFailures },
    downloads: [{ label: "Starter manifest", href: "/downloads/labs/starter-manifest.txt", note: "Build notes and addressing template." }, { label: "Solution manifest", href: "/downloads/labs/solution-manifest.txt", note: "Completed configuration checklist." }],
  },
  {
    slug: "ospf-multi-area", index: "LAB-014", title: "OSPF Multi-Area Enterprise", description: "Build area 0 and area 10, advertise loopbacks, summarize at the ABR, and repair two injected failures.",
    level: "PROFESSIONAL", platform: "GNS3", duration: "90 min", devices: "4 routers · 2 hosts", skills: ["OSPF", "ABR", "Summarization", "Troubleshooting"],
    topology: { nodes: ["BRANCH", "R3", "R2 · ABR", "R1 · CORE"], links: ["AREA 10", "AREA 10", "AREA 0"], caption: "R2 joins area 10 to the backbone and summarizes branch prefixes toward the core." },
    addressing: [{ device: "R1", interface: "G0/0", address: "10.0.12.1/30", gateway: "—" }, { device: "R2", interface: "G0/0", address: "10.0.12.2/30", gateway: "—" }, { device: "R2", interface: "G0/1", address: "10.0.23.1/30", gateway: "—" }, { device: "R3", interface: "G0/0", address: "10.0.23.2/30", gateway: "—" }, { device: "R3", interface: "Lo10", address: "10.10.10.1/24", gateway: "—" }],
    requirements: ["Form area 0 between R1 and R2.", "Form area 10 between R2 and R3.", "Advertise branch loopbacks without sending Hellos to hosts.", "Summarize 10.10.0.0/16 at the ABR.", "Repair a timer mismatch and an unintended passive interface."],
    tasks: [{ title: "Establish the backbone", detail: "Use explicit router IDs and validate FULL state.", hint: "Compare show ip ospf interface on both ends." }, { title: "Attach area 10", detail: "Make R2 the ABR and keep user-facing interfaces passive.", hint: "Use passive-interface default and selective exceptions." }, { title: "Summarize branch space", detail: "Advertise one /16 summary toward area 0.", hint: "Area ranges are configured on the ABR." }, { title: "Repair injected faults", detail: "Use evidence to find the timer and passive-interface issues.", hint: "Do not begin by replacing configuration." }],
    starter: "router ospf 10\n router-id 1.1.1.1\n passive-interface default\n! Activate transit links and place them in the correct area",
    solution: { explanation: "R2 maintains separate link-state views for the backbone and area 10. Summarization reduces the prefixes exposed to R1 while preserving reachability to branch space.", configuration: "router ospf 10\n router-id 2.2.2.2\n passive-interface default\n no passive-interface gi0/0\n no passive-interface gi0/1\n area 10 range 10.10.0.0 255.255.0.0\n network 10.0.12.0 0.0.0.3 area 0\n network 10.0.23.0 0.0.0.3 area 10", verification: "show ip ospf neighbor\nshow ip ospf border-routers\nshow ip ospf database summary\nshow ip route ospf", failures: [{ symptom: "R2 and R3 never leave DOWN", cause: "G0/1 remains passive on R2.", fix: "Remove the passive setting only from the transit interface." }, { symptom: "Neighbor resets every few seconds", cause: "Hello and dead timers differ on the link.", fix: "Compare show ip ospf interface and restore matching timers." }] },
    downloads: [{ label: "Starter manifest", href: "/downloads/labs/starter-manifest.txt", note: "Topology and fault-injection checklist." }, { label: "Solution manifest", href: "/downloads/labs/solution-manifest.txt", note: "Full ABR configuration and expected output." }],
  },
  {
    slug: "intro-bgp", index: "LAB-018", title: "Introductory eBGP Exchange", description: "Establish an external BGP session, advertise one prefix per AS, and inspect best-path evidence.",
    level: "PROFESSIONAL", platform: "GNS3", duration: "70 min", devices: "3 routers", skills: ["eBGP", "Network statements", "AS path", "Next hop"],
    topology: { nodes: ["AS 65001", "TRANSIT", "AS 65002"], links: ["203.0.113.0/30", "198.51.100.0/30"], caption: "Two edge autonomous systems exchange customer loopbacks through a transit router." },
    addressing: [{ device: "EDGE-A", interface: "G0/0", address: "203.0.113.1/30", gateway: "—" }, { device: "TRANSIT", interface: "G0/0", address: "203.0.113.2/30", gateway: "—" }, { device: "TRANSIT", interface: "G0/1", address: "198.51.100.1/30", gateway: "—" }, { device: "EDGE-B", interface: "G0/0", address: "198.51.100.2/30", gateway: "—" }],
    requirements: ["Use a unique AS on each edge.", "Establish both eBGP sessions.", "Advertise one exact loopback prefix per edge.", "Explain the AS path and next-hop attributes."],
    tasks: [{ title: "Build neighbor sessions", detail: "Configure remote AS values and prove Established state.", hint: "IP reachability must exist before BGP." }, { title: "Originate prefixes", detail: "Use exact route-table matches for network statements.", hint: "A BGP network statement does not create a route." }, { title: "Inspect best paths", detail: "Compare received attributes on both edges.", hint: "Use show ip bgp with a specific prefix." }],
    starter: "router bgp 65001\n bgp log-neighbor-changes\n! Add neighbor and exact network statements",
    solution: { explanation: "eBGP exchanges reachability plus policy attributes. Each advertised network must already exist in the local routing table with the same mask.", configuration: "router bgp 65001\n neighbor 203.0.113.2 remote-as 65000\n network 10.1.1.1 mask 255.255.255.255", verification: "show ip bgp summary\nshow ip bgp\nshow ip route bgp", failures: commonFailures },
    downloads: [{ label: "Starter manifest", href: "/downloads/labs/starter-manifest.txt", note: "Addressing and AS plan." }, { label: "Solution manifest", href: "/downloads/labs/solution-manifest.txt", note: "Expected routes and attributes." }],
  },
  {
    slug: "linux-network-troubleshooting", index: "LAB-021", title: "Linux Network Troubleshooting", description: "Diagnose a host with an incorrect prefix, missing default route, DNS failure, and a blocked application port.",
    level: "FOUNDATION", platform: "Linux", duration: "45 min", devices: "2 hosts · 1 gateway", skills: ["ip", "DNS", "Sockets", "tcpdump"],
    topology: { nodes: ["CLIENT", "GATEWAY", "SERVICE"], links: ["192.0.2.0/24", "198.51.100.0/24"], caption: "Work from client link state outward to the remote service." },
    addressing: [{ device: "client01", interface: "ens33", address: "192.0.2.10/24", gateway: "192.0.2.1" }, { device: "gateway", interface: "lan0", address: "192.0.2.1/24", gateway: "—" }, { device: "service01", interface: "ens33", address: "198.51.100.20/24", gateway: "198.51.100.1" }],
    requirements: ["Restore correct client addressing.", "Add the intended default route.", "Repair resolver configuration.", "Prove TCP/443 reachability with socket and packet evidence."],
    tasks: [{ title: "Capture baseline", detail: "Record link, address, route, neighbor, resolver, and socket state.", hint: "Use brief output before changing anything." }, { title: "Repair Layer 3", detail: "Correct the prefix and default route.", hint: "ip route get reveals the exact chosen source and next hop." }, { title: "Repair DNS and application access", detail: "Separate name resolution from TCP reachability.", hint: "Test the service by IP before testing its name." }],
    starter: "ip -br link\nip -br address\nip route\nip neighbor\nresolvectl status\nss -tulpn",
    solution: { explanation: "The workflow treats link, address, neighbor, route, DNS, and application state as separate failure domains and proves each one before moving outward.", configuration: "sudo ip address replace 192.0.2.10/24 dev ens33\nsudo ip route replace default via 192.0.2.1 dev ens33\nsudo resolvectl dns ens33 192.0.2.53", verification: "ip route get 198.51.100.20\nresolvectl query service01.example.net\nnc -vz service01.example.net 443\nsudo tcpdump -ni ens33 host 198.51.100.20", failures: commonFailures },
    downloads: [{ label: "Lab worksheet", href: "/downloads/worksheets/netpath-lab-worksheet.txt", note: "Evidence-led troubleshooting worksheet." }, { label: "Solution manifest", href: "/downloads/labs/solution-manifest.txt", note: "Expected command sequence." }],
  },
  {
    slug: "ansible-configuration-backup", index: "LAB-026", title: "Ansible Configuration Backup", description: "Collect Cisco running configurations, store predictable files, and review changes with Git.",
    level: "PROFESSIONAL", platform: "Ansible", duration: "60 min", devices: "3 routers · 1 control node", skills: ["Inventory", "ios_command", "Jinja", "Git"],
    topology: { nodes: ["CONTROL", "R1", "R2", "R3"], links: ["SSH", "SSH", "SSH"], caption: "One control node collects state from three lab routers over SSH." },
    addressing: [{ device: "control", interface: "ens33", address: "192.0.2.10/24", gateway: "192.0.2.1" }, { device: "R1", interface: "G0/0", address: "192.0.2.11/24", gateway: "192.0.2.1" }, { device: "R2", interface: "G0/0", address: "192.0.2.12/24", gateway: "192.0.2.1" }, { device: "R3", interface: "G0/0", address: "192.0.2.13/24", gateway: "192.0.2.1" }],
    requirements: ["Model routers as one inventory group.", "Use a network collection module for command execution.", "Write one configuration file per inventory hostname.", "Use Git diff to reveal device changes."],
    tasks: [{ title: "Build inventory", detail: "Store connection variables at the group level.", hint: "Confirm the graph before opening sessions." }, { title: "Collect configuration", detail: "Register command output and write one deterministic file per host.", hint: "Use inventory_hostname in the path." }, { title: "Review drift", detail: "Run the playbook twice and inspect the repository diff.", hint: "Stable output should produce no meaningless changes." }],
    starter: "ansible-inventory -i inventory.yml --graph\nansible-playbook -i inventory.yml backup.yml",
    solution: { explanation: "Inventory separates host identity from workflow logic. Deterministic filenames and version control turn backups into a useful change record.", configuration: "- hosts: ios\n  gather_facts: false\n  tasks:\n    - cisco.ios.ios_command:\n        commands: show running-config\n      register: running\n    - copy:\n        content: \"{{ running.stdout[0] }}\"\n        dest: \"backups/{{ inventory_hostname }}.cfg\"", verification: "ansible-inventory --graph\nansible-playbook backup.yml\ngit diff -- backups/", failures: commonFailures },
    downloads: [{ label: "Backup playbook", href: "/downloads/ansible/cisco-backup-playbook.yml", note: "Editable YAML starter." }, { label: "Lab worksheet", href: "/downloads/worksheets/netpath-lab-worksheet.txt", note: "Validation and review checklist." }],
  },
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
