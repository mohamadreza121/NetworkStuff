import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const paloAltoReference = makeReferenceSet({
  platform: "Palo Alto PAN-OS",
  defaultMode: "Operational",
  source: { label: "PAN-OS CLI quick start", href: "https://docs.paloaltonetworks.com/ngfw/pan-os-cli-quick-start/cli-cheat-sheet-networking" },
  rows: parseReferenceRows(`
show system info|System|Display PAN-OS version, model, serial number, uptime, and management identity.|Operational|JUNIOR||show system info
show system resources|System|Display management-plane CPU, memory, process, and load information.|Operational|PROFESSIONAL||show system resources
show system software status|System|Display the operational state of PAN-OS software processes.|Operational|PROFESSIONAL||show system software status
show jobs all|System|List commit, update, install, and other asynchronous job status.|Operational|JUNIOR||show jobs all
show jobs id JOB_ID|System|Display detailed status and messages for one asynchronous job.|Operational|JUNIOR||show jobs id 42
request restart system|System|Restart the firewall and interrupt forwarding during the reboot cycle.|Operational|PROFESSIONAL|D|request restart system
show interface all|Interfaces|Display logical and physical interface state, addressing, zones, and counters.|Operational|JUNIOR||show interface all
show interface INTERFACE|Interfaces|Display detailed state and counters for one interface.|Operational|JUNIOR||show interface ethernet1/1
show counter interface all|Interfaces|Display dataplane packet and byte counters for all interfaces.|Operational|PROFESSIONAL||show counter interface all
show counter global filter delta yes|Troubleshooting|Display changes in global dataplane counters since the previous query.|Operational|PROFESSIONAL||show counter global filter delta yes
show routing route|Routing|Display the PAN-OS routing information base across virtual routers.|Operational|JUNIOR||show routing route
show routing route destination PREFIX|Routing|Filter routing-table output for a destination prefix.|Operational|PROFESSIONAL||show routing route destination 10.10.20.0/24
show routing fib|Routing|Display the forwarding information base programmed in the dataplane.|Operational|PROFESSIONAL||show routing fib
show routing fib virtual-router NAME|Routing|Display forwarding entries for one virtual router.|Operational|PROFESSIONAL||show routing fib virtual-router default
test routing fib-lookup virtual-router NAME ip ADDRESS|Routing|Test the forwarding-table lookup for one destination in a virtual router.|Operational|PROFESSIONAL||test routing fib-lookup virtual-router default ip 8.8.8.8
show arp all|ARP|Display ARP entries, status, interface, MAC address, and time-to-live.|Operational|JUNIOR||show arp all
show arp entry ADDRESS|ARP|Display the ARP entry associated with one IPv4 address.|Operational|JUNIOR||show arp entry 192.0.2.1
clear arp all|ARP|Flush learned ARP state and force neighbor resolution to occur again.|Operational|PROFESSIONAL|D|clear arp all
show running security-policy|Policies|Display the compiled security policy evaluated by the dataplane.|Operational|PROFESSIONAL||show running security-policy
test security-policy-match|Policies|Test which security rule matches a defined traffic tuple.|Operational|PROFESSIONAL||test security-policy-match from trust to untrust source 10.10.20.10 destination 1.1.1.1 destination-port 443 protocol 6
show running nat-policy|NAT|Display the compiled NAT policy and rule ordering.|Operational|PROFESSIONAL||show running nat-policy
test nat-policy-match|NAT|Test which NAT rule matches a defined traffic tuple.|Operational|PROFESSIONAL||test nat-policy-match from trust to untrust source 10.10.20.10 destination 1.1.1.1 protocol 6 destination-port 443
show running ippool|NAT|Display dynamic IP pool allocation and utilization state.|Operational|PROFESSIONAL||show running ippool
show session info|Sessions|Display aggregate session-table capacity, utilization, rates, and aging statistics.|Operational|JUNIOR||show session info
show session all|Sessions|Display active dataplane sessions with traffic, policy, NAT, and application state.|Operational|PROFESSIONAL||show session all
show session all filter source ADDRESS|Sessions|Filter active sessions by source IPv4 address.|Operational|PROFESSIONAL||show session all filter source 10.10.20.10
show session id SESSION_ID|Sessions|Display detailed application, policy, NAT, and packet state for one session.|Operational|PROFESSIONAL||show session id 12345
clear session all filter source ADDRESS|Sessions|Clear active sessions matching a bounded source filter.|Operational|PROFESSIONAL|D|clear session all filter source 10.10.20.10
show vpn flow|VPN|Display VPN tunnel flows, counters, and associated tunnel identifiers.|Operational|PROFESSIONAL||show vpn flow
show vpn gateway|VPN|Display configured IKE gateways and operational gateway information.|Operational|PROFESSIONAL||show vpn gateway
show vpn ike-sa|VPN|Display active IKE security associations and negotiation state.|Operational|PROFESSIONAL||show vpn ike-sa
show vpn ipsec-sa|VPN|Display active IPsec security associations, SPIs, algorithms, and lifetimes.|Operational|PROFESSIONAL||show vpn ipsec-sa
show vpn tunnel|VPN|Display auto-key IPsec tunnel configuration and state.|Operational|PROFESSIONAL||show vpn tunnel
test vpn ike-sa gateway NAME|VPN|Initiate or test IKE negotiation for a selected gateway.|Operational|ADVANCED|D|test vpn ike-sa gateway BRANCH-IKE
clear vpn ike-sa gateway NAME|VPN|Clear IKE security associations for a selected gateway.|Operational|ADVANCED|D|clear vpn ike-sa gateway BRANCH-IKE
clear vpn ipsec-sa tunnel NAME|VPN|Clear IPsec security associations for a selected tunnel.|Operational|ADVANCED|D|clear vpn ipsec-sa tunnel BRANCH-TUNNEL
show high-availability state|High Availability|Display local HA role, peer state, and election information.|Operational|PROFESSIONAL||show high-availability state
show high-availability all|High Availability|Display detailed HA configuration, link, peer, and synchronization state.|Operational|PROFESSIONAL||show high-availability all
show high-availability cluster all|High Availability|Display cluster-wide HA content where clustering is supported.|Operational|ADVANCED||show high-availability cluster all
request high-availability state suspend|High Availability|Suspend the local peer from HA participation for controlled maintenance.|Operational|ADVANCED|D|request high-availability state suspend
request high-availability state functional|High Availability|Return a suspended peer to functional HA participation.|Operational|ADVANCED|D|request high-availability state functional
request high-availability sync-to-remote running-config|High Availability|Synchronize running configuration to the remote HA peer.|Operational|ADVANCED|D|request high-availability sync-to-remote running-config
show log traffic direction equal backward|Logging|Display recent traffic log records with newest entries first.|Operational|PROFESSIONAL||show log traffic direction equal backward
show log system direction equal backward|Logging|Display recent system log records with newest entries first.|Operational|PROFESSIONAL||show log system direction equal backward
show log threat direction equal backward|Logging|Display recent threat log records with newest entries first.|Operational|PROFESSIONAL||show log threat direction equal backward
ping host ADDRESS|Troubleshooting|Send ICMP echo probes from the firewall management plane.|Operational|JUNIOR||ping host 8.8.8.8
traceroute host ADDRESS|Troubleshooting|Trace the management-plane path toward a destination.|Operational|JUNIOR||traceroute host 8.8.8.8
show counter global filter severity drop|Troubleshooting|Filter global dataplane counters to packet-drop conditions.|Operational|PROFESSIONAL||show counter global filter severity drop
set cli config-output-format set|Configuration|Render configuration output as replayable set commands for review.|Operational|PROFESSIONAL||set cli config-output-format set
configure|Configuration|Enter PAN-OS configuration mode and begin editing candidate configuration.|Operational|JUNIOR||configure
show|Configuration|Display candidate configuration at the current hierarchy location.|Configuration|JUNIOR||show
show config running|Configuration|Display the current running configuration from operational mode.|Operational|PROFESSIONAL||show config running
show config candidate|Configuration|Display the uncommitted candidate configuration.|Operational|PROFESSIONAL||show config candidate
commit validate|Configuration|Validate candidate configuration without activating it.|Configuration|PROFESSIONAL||commit validate
commit|Configuration|Validate and activate candidate configuration on the firewall.|Configuration|PROFESSIONAL|D|commit
revert config|Configuration|Discard uncommitted candidate changes and return to running configuration.|Configuration|PROFESSIONAL|D|revert config
save config to NAME|Configuration|Save candidate configuration to a named file on the firewall.|Operational|PROFESSIONAL||save config to pre-change.xml
load config version NUMBER|Configuration|Load a previous committed configuration version into the candidate configuration.|Operational|ADVANCED|D|load config version 12
`),
});
