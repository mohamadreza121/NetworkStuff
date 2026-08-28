import { defineInterviewQuestions } from "@/content/schema";

export const interviewQuestions = defineInterviewQuestions([
  {
    id: "dns-first-check", question: "A user can ping 8.8.8.8 but cannot access google.com. What would you investigate first?", level: "JUNIOR", role: "Junior Network Engineer", category: "Troubleshooting", technology: "DNS",
    hint: "Separate IP reachability from name resolution.",
    answer: "Start with the client's resolver configuration and test a DNS query directly. IP forwarding already works, so confirm which resolver is configured, whether UDP/TCP 53 reaches it, and whether it returns a valid answer.",
    reasoning: "The successful public-IP ping eliminates many physical, VLAN, gateway, routing, and NAT failures. It does not prove DNS. A strong answer narrows the failure domain before changing anything.",
    relatedLesson: { label: "DNS Troubleshooting with dig and resolvectl", href: "/learn/linux/network-services/dns-with-dig-and-resolvectl", meta: "LINUX" }, relatedLab: { label: "Linux Reachability Triage", href: "/labs/linux-network-troubleshooting", meta: "LINUX" },
  },
  {
    id: "url-flow", question: "What happens when you type a URL into a browser?", level: "JUNIOR", role: "Junior Network Engineer", category: "Junior Network Engineer", technology: "TCP/IP",
    hint: "Walk the path from local parsing through DNS, transport, TLS, HTTP, and rendering.",
    answer: "The browser parses the URL, resolves the hostname, selects a route and next hop, resolves the gateway MAC when needed, establishes transport—usually TCP plus TLS or QUIC—sends an HTTP request, receives the response, and renders dependent resources.",
    reasoning: "Interviewers want a layered explanation and the ability to name where evidence could be collected at each boundary.",
    relatedLesson: { label: "Ethernet Frames", href: "/learn/cisco/ccna/ethernet-switching/ethernet-frames", meta: "CCNA v1.1" },
  },
  {
    id: "tcp-udp", question: "What is the practical difference between TCP and UDP?", level: "FOUNDATION", role: "NOC Technician", category: "CCNA", technology: "Transport",
    hint: "Discuss connection state, reliability, ordering, overhead, and application behavior.",
    answer: "TCP provides a connection-oriented byte stream with sequencing, acknowledgements, retransmission, and flow/congestion control. UDP sends independent datagrams with lower protocol overhead and leaves reliability or ordering to the application.",
    reasoning: "Avoid saying UDP is simply faster. The tradeoff is which layer owns delivery behavior and how the application responds to loss.",
  },
  {
    id: "arp", question: "How does ARP work, and where does it stop?", level: "JUNIOR", role: "Junior Network Engineer", category: "Switching", technology: "ARP",
    hint: "Focus on IPv4 next-hop resolution inside a broadcast domain.",
    answer: "A host broadcasts an ARP request for a local IPv4 next hop, the owner replies with its MAC address, and the mapping is cached. ARP does not cross a Layer 3 boundary; for remote destinations the host resolves the default gateway's MAC instead.",
    reasoning: "The route decision happens before ARP. The host resolves the selected next hop, not necessarily the final destination.",
  },
  {
    id: "inter-vlan", question: "Why can two hosts in different VLANs not communicate directly?", level: "JUNIOR", role: "Junior Network Engineer", category: "Switching", technology: "VLAN",
    hint: "Separate broadcast domains require a Layer 3 forwarding decision.",
    answer: "Different VLANs are separate Layer 2 broadcast domains and normally use different IP prefixes. Traffic must be sent to a router or multilayer switch interface that can route between them and enforce any policy.",
    reasoning: "A trunk carries multiple VLANs but does not itself route between them.",
    relatedLab: { label: "Inter-VLAN Routing", href: "/labs/inter-vlan-routing", meta: "PACKET TRACER" },
  },
  {
    id: "ospf-adjacency", question: "How would you troubleshoot an OSPF adjacency that never reaches FULL?", level: "PROFESSIONAL", role: "Network Engineer", category: "OSPF", technology: "OSPF",
    hint: "Use the observed neighbor state to choose the next comparison.",
    answer: "Prove link and IP reachability, then compare area, timers, authentication, network type, passive state, router IDs, and MTU. Use the stuck state—INIT, 2-WAY, EXSTART, or EXCHANGE—to prioritize the likely mismatch.",
    reasoning: "A professional workflow uses state-specific evidence and changes only the parameter proven wrong.",
    relatedLesson: { label: "OSPF Neighbors and Router IDs", href: "/learn/cisco/ccna/routing/ospf-neighbors-and-router-id", meta: "CCNA v1.1" }, relatedLab: { label: "OSPF Multi-Area", href: "/labs/ospf-multi-area", meta: "GNS3" },
  },
  {
    id: "bgp-selection", question: "At a high level, how does BGP select a best path?", level: "PROFESSIONAL", role: "Network Engineer", category: "BGP", technology: "BGP",
    hint: "Name important attributes, but explain that policy precedes simple shortest-path thinking.",
    answer: "BGP applies an ordered decision process that commonly considers weight, local preference, locally originated status, AS-path length, origin, MED, eBGP versus iBGP, IGP cost to next hop, and tie-breakers. Exact steps vary by implementation.",
    reasoning: "The key idea is policy-driven reachability. Validate the platform's actual decision output instead of memorizing a list without context.",
  },
  {
    id: "nat", question: "How does source NAT work, and what evidence proves it?", level: "JUNIOR", role: "Junior Network Engineer", category: "CCNA", technology: "NAT",
    hint: "Describe matching, translation, state, return traffic, and counters.",
    answer: "Eligible inside-source traffic is matched by policy and its source is rewritten to a translated address, often with a unique port. The device keeps state so return traffic can be reversed. Translation entries, counters, captures, and bidirectional tests prove operation.",
    reasoning: "A configured rule is intent; an active translation and successful return path are operational evidence.",
  },
  {
    id: "linux-route", question: "A Linux server has several routes. How do you prove which path a destination will use?", level: "JUNIOR", role: "Network Administrator", category: "Linux", technology: "Linux",
    hint: "Ask the kernel for the resolved route rather than reading the table by eye.",
    answer: "Use `ip route get <destination>` and inspect the selected next hop, interface, preferred source, and policy-routing context. Then validate neighbor state and packet flow on that interface.",
    reasoning: "The resolved lookup accounts for longest-prefix match and policy inputs more reliably than visual inspection alone.",
    relatedLesson: { label: "Packet Path, Netlink, and Network Managers", href: "/learn/linux/interfaces-addressing/packet-path-netlink-and-managers", meta: "LINUX" },
  },
  {
    id: "stateful-firewall", question: "What is the difference between stateful and stateless firewalling?", level: "JUNIOR", role: "Firewall Engineer", category: "Firewalls", technology: "Firewall",
    hint: "Explain how return traffic and session context are handled.",
    answer: "A stateless filter evaluates each packet against rules independently. A stateful firewall tracks sessions and can permit related return traffic based on established state while also applying protocol and application context.",
    reasoning: "State does not replace policy; it changes how the device evaluates packets across a flow.",
  },
  {
    id: "rib-fib", question: "What is the difference between a RIB and a FIB?", level: "PROFESSIONAL", role: "Network Engineer", category: "Routing", technology: "Routing",
    hint: "Separate control-plane candidates from forwarding-plane programming.",
    answer: "The Routing Information Base holds routes learned by routing processes and the selected control-plane best routes. The Forwarding Information Base is optimized for packet lookup and contains the forwarding entries programmed from those decisions.",
    reasoning: "A route can exist in a protocol database without reaching the FIB; troubleshooting must identify where installation stopped.",
  },
  {
    id: "ansible-idempotence", question: "Why does idempotence matter in network automation?", level: "PROFESSIONAL", role: "Network Automation Engineer", category: "Ansible", technology: "Ansible",
    hint: "Think about safely repeating desired-state operations.",
    answer: "An idempotent task converges a device on the desired state and produces no additional change when repeated against a compliant device. That makes retries, scheduled enforcement, and review safer and more predictable.",
    reasoning: "Idempotence reduces accidental churn, but validation and platform-specific module behavior still matter.",
  },
]);
