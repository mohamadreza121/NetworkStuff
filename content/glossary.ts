import { defineGlossaryTerms } from "@/content/schema";

const entries = [
  ["ARP", "Address Resolution Protocol", "Maps an IPv4 next-hop address to a Layer 2 hardware address on a local network.", "Without a resolved next-hop MAC, an Ethernet host cannot forward the frame locally.", ["MAC", "VLAN", "FIB"]],
  ["BGP", "Border Gateway Protocol", "A path-vector routing protocol used to exchange reachability and policy between autonomous systems.", "BGP controls Internet and large enterprise edge routing through explicit policy.", ["RIB", "FIB", "OSPF"]],
  ["CIDR", "Classless Inter-Domain Routing", "Prefix-length notation that describes how many leading bits identify a network.", "CIDR enables flexible subnet sizes, route aggregation, and longest-prefix matching.", ["MTU", "RIB", "VLSM"]],
  ["DHCP", "Dynamic Host Configuration Protocol", "Provides hosts with addresses and network options such as gateway, DNS, and lease time.", "A host can have link connectivity yet remain unusable when DHCP supplies incorrect dependencies.", ["DNS", "ARP", "VLAN"]],
  ["DNS", "Domain Name System", "A distributed naming system that maps names to records such as IP addresses.", "Many apparent application outages are resolver, delegation, or record failures rather than routing failures.", ["DHCP", "TTL", "UDP"]],
  ["EIGRP", "Enhanced Interior Gateway Routing Protocol", "An advanced distance-vector routing protocol that uses DUAL to select loop-free paths.", "It remains relevant in some Cisco-centric enterprise networks and migration scenarios.", ["OSPF", "RIB", "FIB"]],
  ["FIB", "Forwarding Information Base", "An optimized forwarding table used by the data plane to select a next hop for packets.", "It shows what the device can actually forward, not every route the control plane knows.", ["RIB", "BGP", "CEF"]],
  ["HSRP", "Hot Standby Router Protocol", "A Cisco first-hop redundancy protocol that presents a shared virtual gateway.", "It keeps endpoint gateway service available when one routing device fails.", ["VRRP", "ARP", "VLAN"]],
  ["MAC", "Media Access Control address", "A Layer 2 identifier used for frame delivery within a broadcast domain.", "Switches learn MAC locations to forward frames without flooding every port.", ["ARP", "VLAN", "STP"]],
  ["MTU", "Maximum Transmission Unit", "The largest Layer 3 packet an interface can carry without fragmentation or another handling mechanism.", "MTU mismatches can break tunnels, applications, and routing adjacencies in subtle ways.", ["TCP", "OSPF", "PMTUD"]],
  ["NAT", "Network Address Translation", "Rewrites address information as traffic crosses a translation boundary.", "NAT preserves address space and publishes services but introduces state and return-path dependencies.", ["ACL", "PAT", "Firewall"]],
  ["OSPF", "Open Shortest Path First", "A link-state interior routing protocol that builds a topology database and computes shortest paths.", "OSPF is widely used for dynamic routing inside enterprise networks.", ["RIB", "BGP", "LSA"]],
  ["RIB", "Routing Information Base", "The control-plane collection of learned routes and selected best routes.", "It explains which source won before the route is programmed into forwarding hardware.", ["FIB", "BGP", "OSPF"]],
  ["SNMP", "Simple Network Management Protocol", "A protocol for reading operational objects and receiving event notifications from managed systems.", "SNMP remains common for monitoring interface, device, and environmental state.", ["MIB", "Telemetry", "NMS"]],
  ["STP", "Spanning Tree Protocol", "Prevents Layer 2 loops by calculating a loop-free forwarding topology.", "A switching loop can overwhelm an entire broadcast domain within seconds.", ["VLAN", "MAC", "RSTP"]],
  ["TTL", "Time To Live", "An IP header field decremented by each router to prevent indefinite forwarding loops.", "TTL enables loop protection and underpins tools such as traceroute.", ["ICMP", "Routing", "DNS"]],
  ["VLAN", "Virtual Local Area Network", "A logical Layer 2 broadcast domain identified on Ethernet trunks by an 802.1Q tag.", "VLANs segment traffic and define boundaries that require routing to cross.", ["STP", "MAC", "Trunk"]],
  ["VRF", "Virtual Routing and Forwarding", "A separate routing table that allows overlapping or isolated Layer 3 domains on one device.", "VRFs provide segmentation for tenants, management, services, and complex enterprise designs.", ["RIB", "FIB", "VLAN"]],
] as const;

export const glossaryTerms = defineGlossaryTerms(entries.map(([term, expanded, definition, whyItMatters, relatedTerms]) => ({
  term,
  expanded,
  definition,
  whyItMatters,
  relatedTerms: [...relatedTerms],
  relatedLesson: term === "OSPF" ? { label: "OSPF Fundamentals", href: "/learn/cisco/ccna/ospf-fundamentals", meta: "CISCO · CCNA" } : undefined,
})));
