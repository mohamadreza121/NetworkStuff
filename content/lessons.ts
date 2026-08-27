import { defineLessons, lessonSchema, type Lesson, type TerminalVariant } from "@/content/schema";
import { ccnaLessonsAsGeneric } from "@/content/cisco/ccna";

type Seed = {
  slug: string;
  title: string;
  technology: string;
  level?: Lesson["level"];
  certification?: string;
  variant?: TerminalVariant;
  command?: string;
  verify?: string;
  summary?: string;
};

const seeds: Seed[] = [
  { slug: "linux/foundations/shell-navigation", title: "Shell Navigation", technology: "Linux", command: "pwd\nls -lah\ncd /etc\nfind . -maxdepth 2 -type f | head", verify: "pwd\nstat /etc/hosts" },
  { slug: "linux/foundations/file-permissions", title: "Linux File Permissions", technology: "Linux", command: "ls -l inventory.yml\nchmod 640 inventory.yml\nchown netops:netops inventory.yml", verify: "stat -c '%U %G %a %n' inventory.yml" },
  { slug: "linux/foundations/process-inspection", title: "Process Inspection", technology: "Linux", command: "ps aux --sort=-%cpu | head\npgrep -a sshd\ntop -b -n 1 | head", verify: "systemctl status ssh --no-pager\nss -ltnp | grep :22" },
  { slug: "linux/networking/ip-command", title: "The Linux ip Command", technology: "Linux", command: "ip -br link\nip -br address\nip neighbor show\nip route show\nip route get 8.8.8.8", verify: "ip -br address show dev ens33\nip route get 1.1.1.1", summary: "Inspect interfaces, addressing, neighbors, and kernel route decisions with the primary Linux networking command." },
  { slug: "linux/networking/routing-table", title: "Reading the Linux Routing Table", technology: "Linux", command: "ip route show table main\nip -6 route show\nip rule show\nip route get 203.0.113.10", verify: "ip route show default\ntracepath 1.1.1.1" },
  { slug: "linux/networking/dns-troubleshooting", title: "DNS Troubleshooting", technology: "Linux", command: "resolvectl status\ndig +short netpath.dev\ndig @1.1.1.1 netpath.dev\ngetent hosts netpath.dev", verify: "resolvectl query netpath.dev\ndig +trace netpath.dev" },
  { slug: "linux/networking/tcpdump-basics", title: "tcpdump Basics", technology: "Linux", command: "sudo tcpdump -ni any icmp\nsudo tcpdump -ni ens33 port 53\nsudo tcpdump -ni ens33 -w triage.pcap", verify: "tcpdump -nnr triage.pcap | head" },
  { slug: "linux/operations/systemd-services", title: "Operating systemd Services", technology: "Linux", command: "systemctl status ssh\nsystemctl restart ssh\nsystemctl enable --now chrony\njournalctl -u ssh -n 50", verify: "systemctl is-active ssh\nsystemctl is-enabled ssh" },
  { slug: "linux/operations/nftables-basics", title: "nftables Basics", technology: "Linux", command: "sudo nft list ruleset\nsudo nft add rule inet filter input tcp dport 22 accept\nsudo nft list chain inet filter input", verify: "sudo nft --check -f /etc/nftables.conf" },

  { slug: "cisco/ccnp/multi-area-ospf", title: "Multi-Area OSPF Design", technology: "Cisco IOS", certification: "CCNP", level: "PROFESSIONAL", variant: "cisco", command: "router ospf 10\n area 10 stub\n area 10 range 10.10.0.0 255.255.0.0\n network 10.0.0.0 0.255.255.255 area 0", verify: "show ip ospf border-routers\nshow ip ospf database summary\nshow ip route ospf" },
  { slug: "cisco/ccnp/bgp-path-selection", title: "BGP Path Selection", technology: "Cisco IOS", certification: "CCNP", level: "PROFESSIONAL", variant: "cisco", command: "router bgp 65001\n neighbor 203.0.113.2 remote-as 65002\n neighbor 203.0.113.2 route-map ISP-IN in\nroute-map ISP-IN permit 10\n set local-preference 200", verify: "show ip bgp summary\nshow ip bgp 198.51.100.0\nshow route-map ISP-IN" },
  { slug: "cisco/ccnp/route-redistribution", title: "Safe Route Redistribution", technology: "Cisco IOS", certification: "CCNP", level: "PROFESSIONAL", variant: "cisco", command: "route-map OSPF-TO-BGP permit 10\n match tag 110\nrouter bgp 65001\n redistribute ospf 10 route-map OSPF-TO-BGP", verify: "show ip protocols\nshow ip bgp\nshow route-map OSPF-TO-BGP" },
  { slug: "cisco/ccnp/hsrp-resiliency", title: "HSRP Resiliency", technology: "Cisco IOS", certification: "CCNP", level: "PROFESSIONAL", variant: "cisco", command: "interface vlan 20\n standby 20 ip 10.20.0.1\n standby 20 priority 110\n standby 20 preempt\n standby 20 track gi0/1 20", verify: "show standby brief\nshow track" },
  { slug: "cisco/ccnp/qos-marking", title: "QoS Classification and Marking", technology: "Cisco IOS", certification: "CCNP", level: "PROFESSIONAL", variant: "cisco", command: "class-map match-any VOICE\n match dscp ef\npolicy-map WAN-EDGE\n class VOICE\n  priority percent 20", verify: "show policy-map interface gi0/1\nshow class-map VOICE" },

  { slug: "python/foundations/network-data", title: "Modeling Network Data in Python", technology: "Python", variant: "automation", command: "devices = [{\"name\": \"r1\", \"role\": \"edge\"}]\nfor device in devices:\n    print(device[\"name\"], device[\"role\"])", verify: "python -m compileall inventory.py\npython inventory.py" },
  { slug: "python/foundations/files-and-json", title: "Files, JSON, and YAML", technology: "Python", variant: "automation", command: "from pathlib import Path\nimport json\n\ndata = json.loads(Path(\"state.json\").read_text())\nprint(data[\"interfaces\"])", verify: "python -m json.tool state.json\npython parse_state.py" },
  { slug: "python/automation/netmiko-basics", title: "Netmiko Connection Basics", technology: "Python", level: "PROFESSIONAL", variant: "automation", command: "from netmiko import ConnectHandler\n\nwith ConnectHandler(**device) as conn:\n    output = conn.send_command(\"show ip int brief\")\n    print(output)", verify: "python -m compileall collect.py\npython collect.py" },
  { slug: "python/automation/rest-api-requests", title: "Network REST APIs", technology: "Python", level: "PROFESSIONAL", variant: "automation", command: "import requests\n\nresponse = requests.get(url, headers=headers, timeout=10)\nresponse.raise_for_status()\nprint(response.json())", verify: "python -m pytest -q\ncurl -I https://api.example.net/health" },
  { slug: "python/automation/validation-tests", title: "Pre-Change Validation Tests", technology: "Python", level: "PROFESSIONAL", variant: "automation", command: "def test_all_bgp_peers_up(state):\n    assert all(peer[\"state\"] == \"Established\" for peer in state)", verify: "pytest -q\nruff check ." },

  { slug: "ansible/foundations/inventory", title: "Ansible Network Inventory", technology: "Ansible", level: "PROFESSIONAL", variant: "automation", command: "all:\n  children:\n    ios:\n      hosts:\n        edge-r1:\n          ansible_host: 192.0.2.11", verify: "ansible-inventory -i inventory.yml --graph\nansible all -m ping" },
  { slug: "ansible/foundations/network-modules", title: "Network Resource Modules", technology: "Ansible", level: "PROFESSIONAL", variant: "automation", command: "- name: Configure NTP\n  cisco.ios.ios_ntp_global:\n    config:\n      servers:\n        - server: 192.0.2.50", verify: "ansible-playbook --syntax-check ntp.yml\nansible-playbook --check ntp.yml" },
  { slug: "ansible/workflows/config-backup", title: "Configuration Backup Workflow", technology: "Ansible", level: "PROFESSIONAL", variant: "automation", command: "- name: Collect running configuration\n  cisco.ios.ios_command:\n    commands: show running-config\n  register: running\n- copy:\n    content: \"{{ running.stdout[0] }}\"\n    dest: \"backups/{{ inventory_hostname }}.cfg\"", verify: "ansible-playbook backup.yml\ngit diff -- backups/" },
  { slug: "ansible/workflows/compliance-check", title: "Configuration Compliance", technology: "Ansible", level: "PROFESSIONAL", variant: "automation", command: "- assert:\n    that:\n      - \"'service password-encryption' in running.stdout[0]\"\n    fail_msg: \"Baseline control missing\"", verify: "ansible-playbook compliance.yml --check" },

  { slug: "automation/git/network-change-workflow", title: "Git for Network Changes", technology: "Automation", level: "PROFESSIONAL", variant: "automation", command: "git switch -c change/edge-ospf\ngit diff -- configs/\ngit add configs/\ngit commit -m 'change: advertise branch prefix'", verify: "git status --short\ngit log --oneline -3" },
  { slug: "automation/apis/restconf", title: "RESTCONF Operations", technology: "Automation", level: "PROFESSIONAL", variant: "automation", command: "curl -sS -u netops:$TOKEN \\\n  -H 'Accept: application/yang-data+json' \\\n  https://router/restconf/data/ietf-interfaces:interfaces", verify: "curl -sS -o /dev/null -w '%{http_code}\\n' https://router/restconf/data" },
  { slug: "automation/pipelines/change-validation", title: "Change Validation Pipelines", technology: "Automation", level: "ADVANCED", variant: "automation", command: "make lint\npytest -q\nansible-playbook --check change.yml\npython validate_state.py", verify: "git diff --exit-code generated/\npytest -q tests/integration" },

  { slug: "palo-alto/foundations/zones-and-policy", title: "Palo Alto Zones and Policy", technology: "Palo Alto", level: "PROFESSIONAL", variant: "firewall", command: "set zone trust network layer3 ethernet1/2\nset rulebase security rules allow-dns from trust to untrust application dns action allow", verify: "show session all filter application dns\nshow counter global filter severity drop" },
  { slug: "palo-alto/nat/source-nat", title: "Palo Alto Source NAT", technology: "Palo Alto", level: "PROFESSIONAL", variant: "firewall", command: "set rulebase nat rules internet-snat from trust to untrust source any destination any service any source-translation dynamic-ip-and-port interface-address interface ethernet1/1", verify: "test nat-policy-match from trust to untrust source 10.10.20.10 destination 1.1.1.1 protocol 6 destination-port 443" },
  { slug: "palo-alto/operations/traffic-logs", title: "Palo Alto Traffic Logs", technology: "Palo Alto", level: "PROFESSIONAL", variant: "firewall", command: "show log traffic direction equal backward\nshow session all filter source 10.10.20.10", verify: "show counter global filter delta yes packet-filter yes" },

  { slug: "fortigate/foundations/policies", title: "FortiGate Firewall Policies", technology: "FortiGate", level: "PROFESSIONAL", variant: "firewall", command: "config firewall policy\n edit 10\n  set srcintf lan\n  set dstintf wan1\n  set action accept\n  set service HTTPS\n next\nend", verify: "show firewall policy 10\ndiagnose firewall iprope lookup 10.10.20.10 12345 1.1.1.1 443 6" },
  { slug: "fortigate/routing/sd-wan", title: "FortiGate SD-WAN Health Checks", technology: "FortiGate", level: "PROFESSIONAL", variant: "firewall", command: "config system sdwan\n config health-check\n  edit internet-sla\n   set server 1.1.1.1\n  next\n end\nend", verify: "diagnose sys sdwan health-check\ndiagnose sys sdwan service" },
  { slug: "fortigate/operations/flow-debug", title: "FortiGate Flow Debugging", technology: "FortiGate", level: "PROFESSIONAL", variant: "firewall", command: "diagnose debug reset\ndiagnose debug flow filter addr 10.10.20.10\ndiagnose debug flow trace start 20\ndiagnose debug enable", verify: "diagnose debug disable\ndiagnose debug flow trace stop" },

  { slug: "gns3/foundations/project-layout", title: "GNS3 Project Layout", technology: "GNS3", command: "mkdir -p netpath-lab/{configs,notes,captures}\nfind netpath-lab -maxdepth 2 -type d", verify: "find netpath-lab -maxdepth 2 -print" },
  { slug: "gns3/operations/appliance-images", title: "Legal Appliance Image Workflow", technology: "GNS3", command: "sha256sum appliance-image.bin\nls -lh appliance-image.bin", verify: "sha256sum -c checksums.txt" },
  { slug: "gns3/networking/cloud-nodes", title: "GNS3 Cloud Nodes", technology: "GNS3", command: "ip -br link\nip route show\nsudo tcpdump -ni gns3tap0", verify: "ping -c 3 192.0.2.1\nip neighbor show dev gns3tap0" },
  { slug: "gns3/operations/packet-capture", title: "Packet Capture in GNS3", technology: "GNS3", command: "tshark -r ospf-lab.pcapng -Y ospf -T fields -e ip.src -e ospf.msg", verify: "capinfos ospf-lab.pcapng" },
];

const profileFor = (seed: Seed) => {
  const variant = seed.variant ?? (seed.technology === "Linux" || seed.technology === "GNS3" ? "linux" : "automation");
  const prompt = variant === "cisco" ? "Router#" : variant === "firewall" ? ">" : "$";
  return { variant, prompt } as const;
};

function makeLesson(seed: Seed): Lesson {
  const slug = seed.slug.split("/");
  const { variant, prompt } = profileFor(seed);
  const subject = seed.title.toLowerCase();
  return lessonSchema.parse({
    slug,
    title: seed.title,
    description: seed.summary ?? `Learn the operational model, configuration workflow, verification sequence, and common failure modes for ${subject}.`,
    eyebrow: `${seed.technology} / ${slug.slice(1, -1).join(" / ") || "operations"}`,
    level: seed.level ?? (seed.technology === "Linux" || seed.technology === "GNS3" ? "FOUNDATION" : "JUNIOR"),
    technology: seed.technology,
    certification: seed.certification,
    estimatedTime: seed.level === "ADVANCED" ? "55 min" : seed.level === "PROFESSIONAL" ? "45 min" : "30 min",
    status: "READY",
    prerequisites: ["IP addressing", "Command-line navigation", "A safe lab environment"],
    objectives: [
      `Explain the operating model behind ${subject}.`,
      "Apply a repeatable configuration or inspection sequence.",
      "Verify state with direct evidence instead of assumptions.",
      "Separate common symptoms into useful failure domains.",
    ],
    overview: [
      `${seed.title} becomes easier to operate when configuration, live state, and expected traffic flow are treated as separate sources of evidence. Start with the intended outcome, then inspect each dependency in order.`,
      "The examples below are deliberately small enough to reproduce in a lab. Adapt interface names, addresses, policy, and credentials to your own environment before using them elsewhere.",
    ],
    terminology: [
      { term: "Desired state", definition: "The configuration and behavior the system is expected to have." },
      { term: "Observed state", definition: "What inspection commands and traffic tests prove right now." },
      { term: "Failure domain", definition: "The smallest layer or component that can explain the symptom." },
      { term: "Validation", definition: "A repeatable check that compares expected and observed state." },
    ],
    diagram: {
      label: `${seed.title} traffic path`,
      caption: "Use the topology as a verification order: source state, transit decision, then destination response.",
      nodes: ["SOURCE", seed.technology.toUpperCase(), "DESTINATION"],
    },
    command: {
      title: `${seed.technology} · working example`, prompt, variant,
      code: seed.command ?? `# Add the ${seed.title} example here`,
      explanation: [
        { label: "Scope", text: "Start with the smallest interface, device, or record that can prove the behavior." },
        { label: "Intent", text: "Keep names and values meaningful so another engineer can review the change." },
        { label: "Safety", text: "Inspect current state and preserve a rollback point before changing it." },
        { label: "Proof", text: "Finish with a command or traffic test that directly measures the outcome." },
      ],
    },
    verification: {
      intro: "Verify the narrowest dependency first, then move outward toward the end-to-end traffic path.",
      prompt,
      code: seed.verify ?? `# Add ${seed.title} verification commands here`,
      checks: [
        "The expected interface or service is operational.",
        "The active state matches the intended configuration.",
        "Counters or logs change when a controlled test is sent.",
        "The result remains correct after the session is refreshed.",
      ],
    },
    troubleshooting: [
      { symptom: "No expected state", check: "Confirm scope, platform, and active configuration", reason: "The feature may not be enabled where the test is running." },
      { symptom: "State exists but traffic fails", check: "Inspect counters, route or policy order, and return path", reason: "A downstream decision can override an otherwise valid configuration." },
      { symptom: "Intermittent result", check: "Compare timestamps, neighbors, resources, and link events", reason: "Transient control-plane or physical changes often hide behind a stable snapshot." },
    ],
    callouts: [{ tone: "note", title: "Lab-safe first", body: "Reproduce and verify this workflow in an isolated lab before adapting it to production." }],
    realWorld: `${seed.title} is most valuable as a repeatable operating sequence: establish intent, inspect current state, make the smallest safe change, and capture proof that another engineer can review.`,
    interviewQuestions: [
      { question: `How would you troubleshoot ${subject} without guessing?`, answer: "State the expected path, test one dependency at a time, and use configuration, live state, counters, logs, and packet evidence to narrow the failure domain." },
      { question: "What makes the change safe to repeat?", answer: "Known prerequisites, scoped inputs, a pre-change snapshot, explicit validation, and a tested rollback condition." },
    ],
    lab: {
      title: `${seed.title} verification lab`,
      description: "Build the smallest working example, inject one fault, then document the evidence that identifies it.",
      tasks: ["Capture baseline state", "Implement or inspect the feature", "Inject a controlled fault", "Verify and document recovery"],
      href: seed.slug.includes("ospf") ? "/labs/ospf-multi-area" : "/labs/linux-network-troubleshooting",
    },
    downloads: [{ title: "Lab worksheet", description: "A plain-text worksheet for recording intent, tests, evidence, and rollback.", href: "/downloads/worksheets/netpath-lab-worksheet.txt", format: "TXT" }],
    video: { title: `${seed.title} walkthrough`, duration: "Video placeholder" },
  });
}

const baseLessons = [...seeds.map(makeLesson), ...ccnaLessonsAsGeneric];

export const lessons = defineLessons(baseLessons.map((lesson, index) => ({
  ...lesson,
  previous: index > 0 ? {
    label: baseLessons[index - 1].title,
    href: `/learn/${baseLessons[index - 1].slug.join("/")}`,
    meta: baseLessons[index - 1].technology,
  } : undefined,
  next: index < baseLessons.length - 1 ? {
    label: baseLessons[index + 1].title,
    href: `/learn/${baseLessons[index + 1].slug.join("/")}`,
    meta: baseLessons[index + 1].technology,
  } : undefined,
})));

export function getLesson(slug: string[]) {
  return lessons.find((lesson) => lesson.slug.join("/") === slug.join("/"));
}
