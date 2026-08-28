import { defineTroubleshootingScenarios, type TroubleshootingScenario } from "@/content/schema";

type ScenarioSeed = Pick<TroubleshootingScenario, "title" | "slug" | "difficulty" | "technology" | "category" | "symptoms" | "commands" | "evidence" | "diagnosis" | "fix" | "rootCause"> & {
  nodes: string[];
  links: string[];
};

const seeds: ScenarioSeed[] = [
  {
    title: "Host Cannot Reach Default Gateway", slug: "host-cannot-reach-gateway", difficulty: "FOUNDATION", technology: "IPv4", category: "Connectivity",
    symptoms: ["A user workstation cannot ping its configured default gateway.", "Other users on the same floor remain online."],
    nodes: ["CLIENT-17", "SW-ACC01", "GW-SVI10"], links: ["ACCESS VLAN 20", "TRUNK / VLAN 10"],
    commands: { title: "Client and access switch evidence", prompt: "$", variant: "linux", code: "ip -br address\nip route\nip neigh\nping -c 3 10.10.10.1" },
    evidence: ["CLIENT-17 holds 10.10.10.47/24 but its switch port is operational in VLAN 20.", "ARP for 10.10.10.1 remains INCOMPLETE."],
    diagnosis: "The endpoint address belongs to VLAN 10 while the access port places frames in VLAN 20.",
    fix: "Move the access port to VLAN 10, verify the operational VLAN, and clear stale neighbor state before retesting.",
    rootCause: "An access-port template was applied with the wrong VLAN identifier.",
  },
  {
    title: "User Can Ping IP but Not Domain", slug: "ping-ip-not-domain", difficulty: "FOUNDATION", technology: "DNS", category: "DNS",
    symptoms: ["The user can ping 8.8.8.8 but google.com does not resolve.", "HTTPS requests fail with a name-resolution error."],
    nodes: ["CLIENT", "GW", "DNS-01", "INTERNET"], links: ["ICMP UP", "UDP/53 FAIL", "UPSTREAM UP"],
    commands: { title: "Resolver evidence", prompt: "$", variant: "linux", code: "ip route\nresolvectl status\ndig google.com\ndig @1.1.1.1 google.com" },
    evidence: ["The default route and public IP reachability are healthy.", "The configured resolver points to a retired server address."],
    diagnosis: "Layer 3 forwarding works; the client resolver configuration is stale.",
    fix: "Correct the DHCP-provided DNS server, renew the lease, and confirm both direct and system-resolver queries.",
    rootCause: "A DHCP option retained the address of a decommissioned DNS service.",
  },
  {
    title: "VLAN Hosts Cannot Communicate", slug: "vlan-hosts-cannot-communicate", difficulty: "JUNIOR", technology: "VLAN / STP", category: "Layer 2",
    symptoms: ["Two hosts in VLAN 30 communicate locally but not across the switch uplink.", "Other VLANs traverse the same trunk."],
    nodes: ["PC-A", "SW-01", "TRUNK", "SW-02", "PC-B"], links: ["VLAN 30", "ALLOWED 10,20", "VLAN 30", "ACCESS"],
    commands: { title: "Cisco IOS switching evidence", prompt: "SW#", variant: "cisco", code: "show vlan brief\nshow interfaces trunk\nshow spanning-tree vlan 30\nshow mac address-table vlan 30" },
    evidence: ["VLAN 30 exists on both switches.", "The trunk allowed list contains only VLANs 10 and 20."],
    diagnosis: "VLAN 30 is pruned by explicit configuration on the inter-switch trunk.",
    fix: "Add VLAN 30 to the allowed list on both ends and verify forwarding state and MAC learning.",
    rootCause: "A new VLAN was created without updating the controlled trunk allowlist.",
  },
  {
    title: "OSPF Neighbor Stuck in EXSTART", slug: "ospf-exstart", difficulty: "PROFESSIONAL", technology: "OSPF", category: "Routing",
    symptoms: ["The adjacency reaches EXSTART but never FULL.", "Routes behind the neighbor are absent."],
    nodes: ["R1", "MTU 1500", "R2", "MTU 1400"], links: ["OSPF AREA 0", "DBD EXCHANGE", "OSPF AREA 0"],
    commands: { title: "OSPF adjacency evidence", prompt: "R1#", variant: "cisco", code: "show ip ospf neighbor\nshow ip ospf interface gi0/1\nshow interfaces gi0/1 | include MTU\ndebug ip ospf adj" },
    evidence: ["Hello parameters match and two-way communication exists.", "R1 reports MTU 1500 while R2 reports MTU 1400."],
    diagnosis: "Database Description exchange fails because the peers advertise different interface MTUs.",
    fix: "Correct the underlying MTU design on both ends, reset the adjacency, and verify FULL state and learned routes.",
    rootCause: "A tunnel migration changed one interface MTU without updating its peer.",
  },
  {
    title: "BGP Session Will Not Establish", slug: "bgp-session-down", difficulty: "PROFESSIONAL", technology: "BGP", category: "Routing",
    symptoms: ["An eBGP neighbor remains Active.", "The connected transit network responds to ping."],
    nodes: ["AS 65001", "EDGE-A", "EDGE-B", "AS 65002"], links: ["LOCAL", "TCP/179", "LOCAL"],
    commands: { title: "BGP control-plane evidence", prompt: "EDGE-A#", variant: "cisco", code: "show ip bgp summary\nshow run | section router bgp\nshow ip route 203.0.113.2\nshow control-plane host open-ports" },
    evidence: ["The peer address is directly reachable.", "EDGE-A expects remote-as 65020 while EDGE-B is configured as 65002."],
    diagnosis: "The TCP session reaches the peer, but the BGP OPEN is rejected because the expected AS is wrong.",
    fix: "Correct the remote-as value and confirm Established state, prefixes received, and best-path installation.",
    rootCause: "A transposed AS number in the edge configuration passed basic IP validation.",
  },
  {
    title: "NAT Translation Is Missing", slug: "nat-translation-missing", difficulty: "JUNIOR", technology: "NAT", category: "NAT",
    symptoms: ["Branch clients reach their gateway but not the Internet.", "No dynamic translations appear during test traffic."],
    nodes: ["CLIENT", "NAT INSIDE", "EDGE", "NAT OUTSIDE", "INTERNET"], links: ["RFC1918", "POLICY", "PUBLIC", "WAN"],
    commands: { title: "NAT path evidence", prompt: "R1#", variant: "cisco", code: "show ip nat translations\nshow ip nat statistics\nshow access-lists\nshow ip route 0.0.0.0" },
    evidence: ["The default route is present.", "The NAT ACL matches 10.20.0.0/24, while clients use 10.10.0.0/24."],
    diagnosis: "Traffic never qualifies for translation because the source ACL describes the wrong subnet.",
    fix: "Correct the NAT match condition, clear translations, generate new traffic, and verify translation counters.",
    rootCause: "The branch subnet changed after the NAT rule was copied from a template.",
  },
  {
    title: "IPsec Tunnel Is Down", slug: "ipsec-tunnel-down", difficulty: "PROFESSIONAL", technology: "IPsec", category: "VPN",
    symptoms: ["The tunnel has no active security associations.", "Public peer addresses remain reachable."],
    nodes: ["HQ-LAN", "HQ-FW", "WAN", "BR-FW", "BR-LAN"], links: ["INTERESTING", "IKE FAIL", "IKE FAIL", "INTERESTING"],
    commands: { title: "VPN negotiation evidence", prompt: "FW#", variant: "firewall", code: "show vpn ike-sa\nshow vpn ipsec-sa\nshow log system direction equal backward\nping source 198.51.100.10 host 203.0.113.10" },
    evidence: ["Peer reachability and UDP/500 policy are healthy.", "The logs report no proposal chosen during IKE negotiation."],
    diagnosis: "The peers have no shared encryption/integrity proposal.",
    fix: "Align the approved IKE proposal on both peers, initiate interesting traffic, and verify bidirectional counters.",
    rootCause: "One peer was hardened without coordinating the matching Phase 1 proposal.",
  },
  {
    title: "Linux Server Has No Connectivity", slug: "linux-server-no-connectivity", difficulty: "JUNIOR", technology: "Linux", category: "Linux",
    symptoms: ["A server cannot reach local or remote addresses after maintenance.", "The virtual NIC appears in the hypervisor."],
    nodes: ["SRV-LNX01", "vNIC", "SW-01", "GW"], links: ["DOWN", "VLAN 40", "ROUTED"],
    commands: { title: "Linux interface evidence", prompt: "$", variant: "linux", code: "ip -br link\nip -br address\nip route\njournalctl -u systemd-networkd -n 30" },
    evidence: ["ens192 is administratively DOWN.", "The expected address and default route are absent."],
    diagnosis: "The network interface was not activated after its persistent configuration filename changed.",
    fix: "Restore the correct interface match, reload networking, and verify link, address, route, DNS, and application reachability.",
    rootCause: "A cloned VM received a new interface name but retained the old network configuration match.",
  },
  {
    title: "Ansible Cannot Reach a Network Device", slug: "ansible-device-unreachable", difficulty: "PROFESSIONAL", technology: "Ansible", category: "Automation",
    symptoms: ["Manual SSH succeeds but the Ansible network module reports unreachable.", "Only one inventory group is affected."],
    nodes: ["CONTROL", "INVENTORY", "MGMT-VRF", "RTR-22"], links: ["YAML", "SSH", "REACHABLE"],
    commands: { title: "Automation control-node evidence", prompt: "$", variant: "automation", code: "ansible-inventory --host rtr22\nansible rtr22 -m ansible.netcommon.network_cli -vvv\nssh netops@10.99.22.1" },
    evidence: ["Manual SSH targets 10.99.22.1.", "Rendered inventory shows ansible_host: 10.99.2.1."],
    diagnosis: "The automation path uses a mistyped management address even though credentials and SSH transport are healthy.",
    fix: "Correct the source-of-truth record, rerun inventory validation, then execute a read-only facts task.",
    rootCause: "Inventory data was edited without schema or reachability validation.",
  },
];

export const troubleshootingScenarios = defineTroubleshootingScenarios(seeds.map((seed) => ({
  title: seed.title,
  slug: seed.slug,
  difficulty: seed.difficulty,
  technology: seed.technology,
  category: seed.category,
  symptoms: seed.symptoms,
  knownInformation: ["The incident scope is limited to the path shown.", "No production change is permitted until evidence identifies a failure domain."],
  topology: { nodes: seed.nodes, links: seed.links, caption: `Evidence path for ${seed.title.toLowerCase()}.` },
  possibleCauses: ["Physical or link state", "Addressing or segmentation", "Control-plane or policy state", "Name or application service dependency"],
  investigation: ["Establish the last known-good boundary, then test one layer at a time.", "Compare intended state with operational state and preserve the failing evidence."],
  commands: seed.commands,
  evidence: seed.evidence,
  diagnosis: seed.diagnosis,
  fix: seed.fix,
  verification: ["Repeat the original failing test.", "Confirm the repaired control or forwarding state.", "Check a related path to rule out collateral impact."],
  rootCause: seed.rootCause,
  remember: "Move from the closest known-good layer toward the failure. A command is useful only when it can confirm or eliminate a hypothesis.",
  relatedLessons: [{ label: "Packet Path, Netlink, and Network Managers", href: "/learn/linux/interfaces-addressing/packet-path-netlink-and-managers", meta: "LINUX · JUNIOR" }],
})));

export function getTroubleshootingScenario(slug: string) {
  return troubleshootingScenarios.find((scenario) => scenario.slug === slug);
}
