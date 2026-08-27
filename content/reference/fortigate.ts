import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const fortigateReference = makeReferenceSet({
  platform: "FortiGate FortiOS",
  defaultMode: "FortiOS CLI",
  source: { label: "FortiOS CLI reference", href: "https://docs.fortinet.com/document/fortigate/8.0.0/cli-reference/84566/fortios-cli-reference" },
  rows: parseReferenceRows(`
get system status|System|Display FortiOS version, serial number, operating mode, uptime, and system time.|FortiOS CLI|JUNIOR||get system status
get system performance status|System|Display CPU, memory, session, throughput, and uptime statistics.|FortiOS CLI|JUNIOR||get system performance status
diagnose sys top|System|Display live process CPU and memory utilization for performance triage.|FortiOS CLI|PROFESSIONAL||diagnose sys top 1 20
diagnose sys process pidof NAME|System|Find the process identifiers associated with a FortiOS daemon.|FortiOS CLI|PROFESSIONAL||diagnose sys process pidof ipsengine
execute reboot|System|Restart the appliance and interrupt traffic while it returns to service.|FortiOS CLI|PROFESSIONAL|D|execute reboot
show system interface|Interfaces|Display configured system-interface objects and their settings.|FortiOS CLI|JUNIOR||show system interface
get system interface physical|Interfaces|Display physical interface link state, speed, duplex, and addressing.|FortiOS CLI|JUNIOR||get system interface physical
diagnose hardware deviceinfo nic INTERFACE|Interfaces|Display driver, link, counter, and hardware details for one network interface.|FortiOS CLI|PROFESSIONAL||diagnose hardware deviceinfo nic port1
diagnose netlink interface list INTERFACE|Interfaces|Display kernel-facing state and counters for one interface.|FortiOS CLI|ADVANCED||diagnose netlink interface list port1
get router info routing-table all|Routing|Display the active IPv4 routing table across all route sources.|FortiOS CLI|JUNIOR||get router info routing-table all
get router info routing-table details PREFIX|Routing|Display detailed route resolution for a selected destination prefix.|FortiOS CLI|PROFESSIONAL||get router info routing-table details 10.20.0.0/16
get router info routing-table database|Routing|Display the IPv4 routing database including inactive candidate routes.|FortiOS CLI|PROFESSIONAL||get router info routing-table database
get router info6 routing-table|IPv6|Display the active IPv6 routing table and route sources.|FortiOS CLI|PROFESSIONAL||get router info6 routing-table
get router info ospf neighbor|OSPF|Display OSPF neighbor adjacency state and peer identifiers.|FortiOS CLI|PROFESSIONAL||get router info ospf neighbor
get router info ospf interface|OSPF|Display OSPF-enabled interfaces, timers, cost, and designated-router state.|FortiOS CLI|PROFESSIONAL||get router info ospf interface
get router info bgp summary|BGP|Display BGP peer state, autonomous systems, uptime, and received-prefix counts.|FortiOS CLI|PROFESSIONAL||get router info bgp summary
get router info bgp network PREFIX|BGP|Inspect BGP paths and attributes for a selected network.|FortiOS CLI|ADVANCED||get router info bgp network 203.0.113.0/24
diagnose ip arp list|ARP|Display the IPv4 ARP table with interfaces, MAC addresses, and state.|FortiOS CLI|JUNIOR||diagnose ip arp list
diagnose ipv6 neighbor-cache list|IPv6|Display the IPv6 neighbor cache and reachability state.|FortiOS CLI|PROFESSIONAL||diagnose ipv6 neighbor-cache list
show firewall policy|Policies|Display configured IPv4 firewall policies in policy order.|FortiOS CLI|JUNIOR||show firewall policy
show firewall policy6|Policies|Display configured IPv6 firewall policies in policy order.|FortiOS CLI|PROFESSIONAL||show firewall policy6
diagnose firewall iprope lookup|Policies|Test which policy lookup path matches a defined IPv4 traffic tuple.|FortiOS CLI|ADVANCED||diagnose firewall iprope lookup 10.0.0.10 12345 198.51.100.20 443 6 port1
diagnose sys session stat|Sessions|Display session-table utilization, setup rates, clashes, and offload statistics.|FortiOS CLI|JUNIOR||diagnose sys session stat
diagnose sys session list|Sessions|Display active sessions with policy, NAT, state, and offload details.|FortiOS CLI|PROFESSIONAL||diagnose sys session list
diagnose sys session filter src ADDRESS|Sessions|Restrict subsequent session-table operations to one source address.|FortiOS CLI|PROFESSIONAL||diagnose sys session filter src 10.0.0.10
diagnose sys session filter clear|Sessions|Remove all active session-table filters before another query.|FortiOS CLI|PROFESSIONAL||diagnose sys session filter clear
diagnose sys session clear|Sessions|Clear sessions matching the active filter or all sessions when no filter exists.|FortiOS CLI|ADVANCED|D|diagnose sys session clear
get vpn ipsec tunnel summary|VPN|Display a concise summary of configured IPsec tunnels and their state.|FortiOS CLI|PROFESSIONAL||get vpn ipsec tunnel summary
diagnose vpn tunnel list|VPN|Display IPsec tunnel selectors, counters, algorithms, and security associations.|FortiOS CLI|PROFESSIONAL||diagnose vpn tunnel list
diagnose vpn ike gateway list|VPN|Display IKE gateway negotiation, peer, proposal, and security-association state.|FortiOS CLI|ADVANCED||diagnose vpn ike gateway list
diagnose vpn tunnel flush NAME|VPN|Clear security associations for a selected IPsec tunnel to force renegotiation.|FortiOS CLI|ADVANCED|D|diagnose vpn tunnel flush BRANCH-VPN
diagnose sys sdwan health-check|SD-WAN|Display SD-WAN performance-SLA loss, latency, jitter, and link state.|FortiOS CLI|PROFESSIONAL||diagnose sys sdwan health-check
diagnose sys sdwan service|SD-WAN|Display SD-WAN service-rule selection and preferred-member state.|FortiOS CLI|PROFESSIONAL||diagnose sys sdwan service
get system ha status|High Availability|Display cluster members, roles, priorities, uptime, and synchronization state.|FortiOS CLI|PROFESSIONAL||get system ha status
diagnose sys ha checksum cluster|High Availability|Compare configuration checksums across members of an HA cluster.|FortiOS CLI|ADVANCED||diagnose sys ha checksum cluster
execute ha manage INDEX|High Availability|Open an administrative CLI session to a selected HA member.|FortiOS CLI|ADVANCED||execute ha manage 1
execute ping ADDRESS|Troubleshooting|Send ICMP echo probes from the FortiGate to a destination.|FortiOS CLI|JUNIOR||execute ping 8.8.8.8
execute ping-options source ADDRESS|Troubleshooting|Select a source address for subsequent FortiGate ping probes.|FortiOS CLI|PROFESSIONAL||execute ping-options source 192.0.2.1
execute traceroute ADDRESS|Troubleshooting|Trace the routed path from the FortiGate toward a destination.|FortiOS CLI|JUNIOR||execute traceroute 8.8.8.8
diagnose sniffer packet|Packet Capture|Capture packets on a selected interface with a bounded filter and detail level.|FortiOS CLI|PROFESSIONAL||diagnose sniffer packet any 'host 192.0.2.10' 4 20 l
diagnose debug flow filter addr ADDRESS|Debug Flow|Restrict debug-flow output to traffic involving one address.|FortiOS CLI|ADVANCED||diagnose debug flow filter addr 192.0.2.10
diagnose debug flow show function-name enable|Debug Flow|Include FortiOS function names in debug-flow trace output.|FortiOS CLI|ADVANCED||diagnose debug flow show function-name enable
diagnose debug flow trace start COUNT|Debug Flow|Start a bounded debug-flow packet trace after applying filters.|FortiOS CLI|ADVANCED||diagnose debug flow trace start 20
diagnose debug enable|Debug Flow|Enable diagnostic debug output after setting a bounded filter and trace.|FortiOS CLI|ADVANCED|D|diagnose debug enable
diagnose debug disable|Debug Flow|Stop diagnostic debug output immediately after collecting evidence.|FortiOS CLI|ADVANCED||diagnose debug disable
diagnose debug reset|Debug Flow|Clear debug filters and settings to return diagnostics to a clean state.|FortiOS CLI|ADVANCED||diagnose debug reset
execute log filter category NUMBER|Logging|Filter subsequent local log display by a FortiOS log category.|FortiOS CLI|PROFESSIONAL||execute log filter category 0
execute log display|Logging|Display local log records using the currently configured log filters.|FortiOS CLI|PROFESSIONAL||execute log display
show full-configuration|Configuration|Display configuration including values that are normally omitted as defaults.|FortiOS CLI|PROFESSIONAL||show full-configuration
config global|Configuration|Enter the global configuration context on a multi-VDOM appliance.|FortiOS CLI|ADVANCED||config global
config vdom|Configuration|Enter the VDOM configuration table to select a virtual domain.|FortiOS CLI|ADVANCED||config vdom
config system interface|Configuration|Enter the system-interface configuration table.|FortiOS CLI|JUNIOR||config system interface
edit NAME|Configuration|Select or create a named table entry in the current configuration context.|FortiOS CLI|JUNIOR||edit port1
set ATTRIBUTE VALUE|Configuration|Assign a value to an attribute in the current edit context.|FortiOS CLI|JUNIOR||set description WAN-UPLINK
unset ATTRIBUTE|Configuration|Return an attribute in the current edit context to its default value.|FortiOS CLI|PROFESSIONAL|D|unset description
next|Configuration|Save the current table entry and advance back to the containing table.|FortiOS CLI|JUNIOR||next
end|Configuration|Save pending context changes and return to the top-level CLI prompt.|FortiOS CLI|JUNIOR||end
`),
});
