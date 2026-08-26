import type { SkillLevel } from "@/lib/site-data";

export type Lesson = {
  slug: string[];
  title: string;
  description: string;
  eyebrow: string;
  level: SkillLevel;
  technology: string;
  certification?: string;
  estimatedTime: string;
  status: "PLACEHOLDER" | "DRAFT" | "READY";
  prerequisites: string[];
  objectives: string[];
  overview: string[];
  terminology: { term: string; definition: string }[];
  diagram: {
    label: string;
    caption: string;
    nodes: string[];
  };
  command: {
    title: string;
    prompt: string;
    code: string;
    variant: "cisco" | "linux";
    explanation: { label: string; text: string }[];
  };
  verification: {
    intro: string;
    prompt: string;
    code: string;
    checks: string[];
  };
  troubleshooting: { symptom: string; check: string; reason: string }[];
  realWorld: string;
  interviewQuestions: { question: string; answer: string }[];
  lab: {
    title: string;
    description: string;
    tasks: string[];
    availability: string;
  };
  next?: { label: string; href: string; meta: string };
};

export const lessons: Lesson[] = [
  {
    slug: ["cisco", "ccna", "ospf-fundamentals"],
    title: "OSPF Fundamentals",
    description:
      "Understand how OSPF discovers neighbors, builds a link-state database, and installs the best routes on Cisco IOS.",
    eyebrow: "Cisco / CCNA / Dynamic routing",
    level: "JUNIOR",
    technology: "Cisco IOS",
    certification: "CCNA",
    estimatedTime: "45 min",
    status: "PLACEHOLDER",
    prerequisites: ["IPv4 addressing", "Subnetting", "Static routes", "Cisco IOS navigation"],
    objectives: [
      "Explain the role of Hello packets and neighbor adjacencies.",
      "Configure single-area OSPF on Cisco IOS.",
      "Verify neighbors, learned routes, and the OSPF database.",
      "Recognize the most common adjacency failures.",
    ],
    overview: [
      "Open Shortest Path First is a link-state interior gateway protocol. Instead of sharing an entire routing table with every update, OSPF routers describe their links and build a shared view of the topology.",
      "Each router runs the shortest path first algorithm against that database, then installs the best reachable prefixes in its routing table. This separation—neighbors, database, route calculation—is the key mental model for troubleshooting OSPF.",
    ],
    terminology: [
      { term: "Router ID", definition: "A 32-bit value that uniquely identifies an OSPF router." },
      { term: "Adjacency", definition: "The fully synchronized neighbor relationship between two OSPF routers." },
      { term: "LSA", definition: "A link-state advertisement describing topology information." },
      { term: "Area", definition: "A logical boundary used to scale the OSPF link-state database." },
    ],
    diagram: {
      label: "Single-area OSPF topology",
      caption: "Three routers exchange routes through area 0. Each point-to-point link uses its own /30 network.",
      nodes: ["R1 · 1.1.1.1", "R2 · 2.2.2.2", "R3 · 3.3.3.3"],
    },
    command: {
      title: "R1 · Cisco IOS",
      prompt: "Router(config)#",
      variant: "cisco",
      code: `router ospf 10
 router-id 1.1.1.1
 network 10.0.12.0 0.0.0.3 area 0
 network 10.1.1.0 0.0.0.255 area 0
 passive-interface gigabitEthernet0/0`,
      explanation: [
        { label: "Process 10", text: "Locally significant. It does not need to match neighboring routers." },
        { label: "Router ID", text: "Set explicitly so identity stays predictable after a reboot." },
        { label: "Network", text: "Matches interfaces and places them into area 0." },
        { label: "Passive", text: "Advertises the LAN without sending Hello packets toward clients." },
      ],
    },
    verification: {
      intro: "Verify the control plane in order: interface participation, neighbors, database, then installed routes.",
      prompt: "Router#",
      code: `show ip ospf interface brief
show ip ospf neighbor
show ip ospf database
show ip route ospf`,
      checks: [
        "The expected interface is in area 0 and is not unintentionally passive.",
        "The neighbor state reaches FULL.",
        "Router and network LSAs appear in the database.",
        "Remote prefixes appear with an O route code.",
      ],
    },
    troubleshooting: [
      { symptom: "Neighbor stuck in INIT", check: "Verify two-way reachability and ACLs", reason: "The local router receives Hellos but does not see itself listed." },
      { symptom: "No neighbor discovered", check: "Compare area, subnet, timers, and passive state", reason: "Hello parameters or interface activation do not match." },
      { symptom: "FULL but no route", check: "Inspect LSDB, prefix advertisement, and route preference", reason: "Adjacency can work even when the expected prefix is absent or loses selection." },
    ],
    realWorld:
      "OSPF is common inside enterprise campuses, data centers, service-provider access networks, and lab environments. The operational skill is not memorizing one configuration—it is locating the failure among interface activation, neighbor formation, database exchange, and route selection.",
    interviewQuestions: [
      {
        question: "Two routers can ping each other, but they do not become OSPF neighbors. What do you compare first?",
        answer: "Confirm OSPF is active on both interfaces, then compare area ID, subnet, Hello/dead timers, authentication, network type, MTU, and passive-interface state.",
      },
      {
        question: "Does the OSPF process ID need to match between neighbors?",
        answer: "No. The process ID is locally significant on Cisco IOS. Parameters carried between neighbors—such as area, timers, authentication, and compatible subnet settings—must match.",
      },
    ],
    lab: {
      title: "Single-area OSPF verification lab",
      description: "Bring up three routers, advertise loopbacks, then isolate two injected failures using verification output.",
      tasks: ["Build three adjacencies", "Advertise loopbacks", "Verify the LSDB", "Repair timer and passive-interface faults"],
      availability: "Starter and solution files arrive in Phase 2.",
    },
    next: {
      label: "Linux ip command",
      href: "/learn/linux/networking/ip-command",
      meta: "Linux · Networking · 25 min",
    },
  },
  {
    slug: ["linux", "networking", "ip-command"],
    title: "The Linux ip Command",
    description:
      "Inspect interfaces, addresses, routes, and neighbor state with the primary Linux networking command.",
    eyebrow: "Linux / Networking / Command reference",
    level: "FOUNDATION",
    technology: "Linux",
    estimatedTime: "25 min",
    status: "PLACEHOLDER",
    prerequisites: ["Terminal navigation", "IPv4 basics", "Linux command syntax"],
    objectives: [
      "Inspect interface operational state and assigned addresses.",
      "Read the kernel routing table and default route.",
      "Inspect ARP/neighbor entries.",
      "Use concise output during incident triage.",
    ],
    overview: [
      "The ip utility is the modern interface to Linux networking state. It replaces most day-to-day uses of ifconfig, route, and arp with one consistent command family.",
      "For network engineers, the important habit is to inspect state in layers: link, address, neighbor, and route. That order quickly separates a local interface problem from a Layer 3 or upstream issue.",
    ],
    terminology: [
      { term: "Link", definition: "The local interface and its operational attributes." },
      { term: "Address", definition: "An IPv4 or IPv6 prefix assigned to an interface." },
      { term: "Neighbor", definition: "A Layer 3-to-Layer 2 mapping, such as an ARP entry." },
      { term: "Route", definition: "A prefix and next-hop decision in the kernel forwarding table." },
    ],
    diagram: {
      label: "Linux network state",
      caption: "Read local state from the interface outward: link → address → neighbor → route → remote reachability.",
      nodes: ["LINK", "ADDRESS", "NEIGHBOR", "ROUTE"],
    },
    command: {
      title: "ubuntu@server01",
      prompt: "$",
      variant: "linux",
      code: `ip -br link
ip -br address
ip neighbor show
ip route show
ip route get 8.8.8.8`,
      explanation: [
        { label: "-br", text: "Uses brief output that is fast to scan during triage." },
        { label: "neighbor", text: "Shows ARP and IPv6 neighbor-discovery state." },
        { label: "route", text: "Displays the main kernel routing table." },
        { label: "route get", text: "Shows the exact egress decision Linux would make for one destination." },
      ],
    },
    verification: {
      intro: "A healthy host should show an UP link, the intended prefix, a reachable gateway neighbor, and a valid route decision.",
      prompt: "$",
      code: `ip -br link show dev ens33
ip -br address show dev ens33
ip neighbor show dev ens33
ip route get 1.1.1.1`,
      checks: [
        "The interface shows UP at both administrative and operational layers.",
        "The address and prefix length match the intended subnet.",
        "The gateway neighbor is REACHABLE, STALE, or DELAY—not FAILED.",
        "The route lookup chooses the expected gateway and interface.",
      ],
    },
    troubleshooting: [
      { symptom: "Interface is DOWN", check: "Run ip link and inspect hypervisor or switch state", reason: "No Layer 3 test can work before the local link is operational." },
      { symptom: "Gateway shows FAILED", check: "Check VLAN, subnet, cabling, and duplicate addressing", reason: "The host cannot resolve the gateway's Layer 2 address." },
      { symptom: "Wrong egress interface", check: "Run ip route get and inspect route metrics", reason: "A more specific route or lower metric is winning selection." },
    ],
    realWorld:
      "On Ubuntu appliances, automation runners, monitoring nodes, and network services, ip is usually the first command family used to establish what the host believes about its own connectivity.",
    interviewQuestions: [
      {
        question: "Why use ip route get instead of only ip route show?",
        answer: "ip route get asks the kernel to resolve one real destination, exposing the chosen next hop, interface, and source address after route selection.",
      },
      {
        question: "What does a FAILED neighbor entry usually indicate?",
        answer: "Neighbor resolution did not receive a reply. Investigate Layer 2 reachability, VLAN placement, local addressing, and whether the target is actually online.",
      },
    ],
    lab: {
      title: "Linux host reachability triage",
      description: "Diagnose a host with an incorrect prefix, missing default route, and failed gateway resolution.",
      tasks: ["Inspect link state", "Correct addressing", "Restore the default route", "Validate path selection"],
      availability: "Worksheet and VM instructions arrive in Phase 2.",
    },
    next: {
      label: "Explore the full roadmap",
      href: "/roadmap",
      meta: "Career path · 6 stages",
    },
  },
];

export function getLesson(slug: string[]) {
  return lessons.find((lesson) => lesson.slug.join("/") === slug.join("/"));
}

