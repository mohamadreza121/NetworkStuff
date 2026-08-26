export type CommandReference = {
  command: string;
  category: string;
  purpose: string;
  example: string;
  expected: string;
  next: string[];
};

export const linuxCommands: CommandReference[] = [
  { command: "ip -br address", category: "Interfaces", purpose: "Show compact link and address state for every interface.", example: "ip -br address", expected: "ens33 UP 192.0.2.10/24", next: ["ip link", "ip route"] },
  { command: "ip link", category: "Interfaces", purpose: "Inspect administrative and operational link state.", example: "ip -details link show dev ens33", expected: "state UP, mtu 1500", next: ["ethtool", "ip address"] },
  { command: "ethtool", category: "Interfaces", purpose: "Inspect negotiated speed, duplex, and physical link detection.", example: "sudo ethtool ens33", expected: "Link detected: yes", next: ["ip link", "dmesg"] },
  { command: "ip route", category: "Routing", purpose: "Read the kernel forwarding table.", example: "ip route show table main", expected: "default via 192.0.2.1 dev ens33", next: ["ip route get", "ip rule"] },
  { command: "ip route get", category: "Routing", purpose: "Resolve the exact route, source, and egress for one destination.", example: "ip route get 1.1.1.1", expected: "1.1.1.1 via 192.0.2.1 dev ens33 src 192.0.2.10", next: ["tracepath", "ping"] },
  { command: "ip rule", category: "Routing", purpose: "Inspect policy-routing lookup order.", example: "ip rule show", expected: "lookup local, main, default", next: ["ip route show table all"] },
  { command: "ip neighbor", category: "Layer 2", purpose: "Inspect ARP and IPv6 neighbor resolution state.", example: "ip neighbor show dev ens33", expected: "192.0.2.1 lladdr … REACHABLE", next: ["arping", "tcpdump"] },
  { command: "arping", category: "Layer 2", purpose: "Test local-segment address resolution.", example: "sudo arping -I ens33 192.0.2.1", expected: "Unicast reply from 192.0.2.1", next: ["ip neighbor", "bridge fdb"] },
  { command: "ping", category: "Reachability", purpose: "Test ICMP reachability and latency.", example: "ping -c 4 1.1.1.1", expected: "0% packet loss", next: ["tracepath", "ip route get"] },
  { command: "tracepath", category: "Reachability", purpose: "Trace path hops and discover path MTU without elevated privileges.", example: "tracepath 1.1.1.1", expected: "Hop sequence and pmtu", next: ["mtr", "ip route get"] },
  { command: "mtr", category: "Reachability", purpose: "Measure loss and latency over time at each hop.", example: "mtr -rwzc 20 1.1.1.1", expected: "Per-hop loss and average latency", next: ["ping", "tcpdump"] },
  { command: "ss", category: "Sockets", purpose: "Inspect listening and connected TCP/UDP sockets.", example: "sudo ss -tulpn", expected: "Local address, state, and owning process", next: ["lsof", "systemctl"] },
  { command: "lsof", category: "Sockets", purpose: "Map network sockets and files to processes.", example: "sudo lsof -iTCP:443 -sTCP:LISTEN", expected: "Process and PID listening on 443", next: ["ss", "ps"] },
  { command: "nc", category: "Sockets", purpose: "Test whether a remote TCP or UDP port accepts traffic.", example: "nc -vz 192.0.2.50 443", expected: "Connection succeeded", next: ["curl", "tcpdump"] },
  { command: "resolvectl", category: "DNS", purpose: "Inspect resolver configuration and query through systemd-resolved.", example: "resolvectl status", expected: "Per-link DNS server and domain", next: ["dig", "getent"] },
  { command: "dig", category: "DNS", purpose: "Query DNS records with explicit servers and useful detail.", example: "dig @1.1.1.1 netpath.dev A", expected: "ANSWER SECTION with an A record", next: ["resolvectl", "tcpdump"] },
  { command: "getent hosts", category: "DNS", purpose: "Test name resolution through the host's configured NSS path.", example: "getent hosts netpath.dev", expected: "Address and canonical name", next: ["resolvectl", "dig"] },
  { command: "tcpdump", category: "Packet capture", purpose: "Capture and filter packets at an interface.", example: "sudo tcpdump -ni ens33 port 53", expected: "Timestamped DNS packets", next: ["tshark", "ip link"] },
  { command: "tshark", category: "Packet capture", purpose: "Read captures with Wireshark display filters and structured fields.", example: "tshark -r trace.pcapng -Y 'tcp.analysis.retransmission'", expected: "Matching retransmitted frames", next: ["capinfos", "tcpdump"] },
  { command: "curl", category: "Application", purpose: "Test HTTP/TLS behavior and inspect response metadata.", example: "curl -sSvo /dev/null https://example.net", expected: "TLS negotiation and HTTP status", next: ["openssl s_client", "dig"] },
  { command: "openssl s_client", category: "Application", purpose: "Inspect a TLS handshake and certificate chain.", example: "openssl s_client -connect example.net:443 -servername example.net", expected: "Certificate chain and verify code", next: ["curl", "date"] },
  { command: "systemctl", category: "Services", purpose: "Inspect and control system services.", example: "systemctl status ssh --no-pager", expected: "Loaded and active state", next: ["journalctl", "ss"] },
  { command: "journalctl", category: "Services", purpose: "Read timestamped service and kernel logs.", example: "journalctl -u ssh --since '15 min ago'", expected: "Recent unit log records", next: ["systemctl", "dmesg"] },
  { command: "nft", category: "Firewall", purpose: "Inspect the active nftables ruleset and counters.", example: "sudo nft -a list ruleset", expected: "Tables, chains, rules, handles, and counters", next: ["conntrack", "tcpdump"] },
];

export const commandCategories = ["All", ...Array.from(new Set(linuxCommands.map((item) => item.category)))];
