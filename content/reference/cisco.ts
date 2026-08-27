import { makeReferenceSet, parseReferenceRows } from "@/content/reference/shared";

export const ciscoReference = makeReferenceSet({
  platform: "Cisco IOS / IOS-XE",
  defaultMode: "Privileged EXEC",
  source: { label: "Cisco IOS XE command reference", href: "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/command_reference/b_1713_9300_cr/1713_9300_cr_CLT_chapter.html" },
  rows: parseReferenceRows(`
enable|Device Basics|Enter privileged EXEC mode from user EXEC mode.|User EXEC|FOUNDATION||enable
disable|Device Basics|Return from privileged EXEC mode to user EXEC mode.|Privileged EXEC|FOUNDATION||disable
configure terminal|Device Basics|Enter global configuration mode from privileged EXEC mode.|Privileged EXEC|FOUNDATION||configure terminal
end|Device Basics|Return directly to privileged EXEC mode from a configuration submode.|Global Configuration|FOUNDATION||end
exit|Device Basics|Move back one command level or close the current EXEC session.|Global Configuration|FOUNDATION||exit
hostname NAME|Device Basics|Assign a meaningful host name to the device.|Global Configuration|FOUNDATION||hostname BR1-R1
show version|Device Basics|Display software release, uptime, hardware, image, and configuration-register information.|Privileged EXEC|FOUNDATION||show version
show inventory|Platform / Hardware|Display installed chassis, modules, serial numbers, and product identifiers.|Privileged EXEC|JUNIOR||show inventory
show platform|Platform / Hardware|Display platform-specific forwarding, module, and hardware state.|Privileged EXEC|PROFESSIONAL||show platform
show clock|Device Basics|Display the device software clock and timezone state.|Privileged EXEC|FOUNDATION||show clock detail
show users|Device Basics|List users connected through console and virtual terminal lines.|Privileged EXEC|FOUNDATION||show users
show history|Device Basics|Display recently entered commands for the current EXEC session.|Privileged EXEC|FOUNDATION||show history
terminal history size NUMBER|Device Basics|Set the command-history depth for the current terminal session.|Privileged EXEC|JUNIOR||terminal history size 100
terminal length NUMBER|Device Basics|Set pagination length for the current terminal session.|Privileged EXEC|FOUNDATION||terminal length 0
terminal width NUMBER|Device Basics|Set the terminal display width for wrapped output.|Privileged EXEC|JUNIOR||terminal width 200
show logging|Syslog|Display buffered syslog records and logging configuration state.|Privileged EXEC|JUNIOR||show logging
show processes|Platform / Hardware|Display active IOS processes and runtime information.|Privileged EXEC|JUNIOR||show processes
show processes cpu|Platform / Hardware|Display CPU utilization by process and recent time intervals.|Privileged EXEC|JUNIOR||show processes cpu sorted
show processes memory|Platform / Hardware|Display memory allocation and process consumption.|Privileged EXEC|PROFESSIONAL||show processes memory sorted
show memory statistics|Platform / Hardware|Display system memory pools and utilization statistics.|Privileged EXEC|PROFESSIONAL||show memory statistics
show environment|Platform / Hardware|Display temperature, power, fan, and environmental sensor state.|Privileged EXEC|PROFESSIONAL||show environment all
show tech-support|Troubleshooting|Collect a broad diagnostic bundle for escalation and offline analysis.|Privileged EXEC|PROFESSIONAL||show tech-support
show running-config|Configuration Management|Display the active configuration held in running memory.|Privileged EXEC|FOUNDATION||show running-config
show startup-config|Configuration Management|Display the saved configuration used during the next boot.|Privileged EXEC|FOUNDATION||show startup-config
show archive config differences|Configuration Management|Compare archived and active configuration versions.|Privileged EXEC|PROFESSIONAL||show archive config differences nvram:startup-config system:running-config
copy running-config startup-config|Configuration Management|Save the active configuration to startup configuration storage.|Privileged EXEC|FOUNDATION||copy running-config startup-config
copy startup-config running-config|Configuration Management|Merge the saved startup configuration into the active configuration.|Privileged EXEC|JUNIOR|D|copy startup-config running-config
write memory|Configuration Management|Save running configuration using the legacy shorthand command.|Privileged EXEC|FOUNDATION|L|write memory
erase startup-config|Configuration Management|Delete the saved startup configuration from NVRAM.|Privileged EXEC|JUNIOR|D|erase startup-config
reload|Configuration Management|Restart the device and interrupt forwarding during the reboot.|Privileged EXEC|JUNIOR|D|reload
archive|Configuration Management|Enter configuration archive settings for versioning and rollback support.|Global Configuration|PROFESSIONAL||archive
configure replace URL|Configuration Management|Replace running configuration from a complete configuration source with rollback support.|Privileged EXEC|ADVANCED|D|configure replace flash:known-good.cfg force
show configuration lock|Configuration Management|Display whether configuration mode is locked by another session.|Privileged EXEC|PROFESSIONAL||show configuration lock
show ip interface brief|Interfaces|Summarize IPv4 addressing and line or protocol state for routed interfaces.|Privileged EXEC|FOUNDATION||show ip interface brief
show ipv6 interface brief|IPv6|Summarize IPv6 addressing and operational state for interfaces.|Privileged EXEC|JUNIOR||show ipv6 interface brief
show interfaces|Interfaces|Display detailed interface status, counters, errors, load, and encapsulation.|Privileged EXEC|FOUNDATION||show interfaces
show interfaces status|Interfaces|Summarize switch-port status, VLAN, duplex, speed, and media type.|Privileged EXEC|FOUNDATION||show interfaces status
show interfaces counters|Interfaces|Display aggregate traffic counters for switch interfaces.|Privileged EXEC|JUNIOR||show interfaces counters
show interfaces counters errors|Interfaces|Display input and output error counters by switch port.|Privileged EXEC|JUNIOR||show interfaces counters errors
show interfaces description|Interfaces|Summarize configured descriptions and operational state.|Privileged EXEC|FOUNDATION||show interfaces description
show interfaces transceiver|Platform / Hardware|Display optical transceiver identity and diagnostic measurements where supported.|Privileged EXEC|PROFESSIONAL||show interfaces transceiver detail
show controllers ethernet-controller|Platform / Hardware|Inspect lower-level Ethernet controller counters and hardware behavior.|Privileged EXEC|ADVANCED||show controllers ethernet-controller gigabitEthernet 1/0/1 phy
interface TYPE NUMBER|Interfaces|Enter configuration mode for one physical or logical interface.|Global Configuration|FOUNDATION||interface GigabitEthernet0/1
interface range RANGE|Interfaces|Apply a consistent configuration to multiple interfaces in one context.|Global Configuration|JUNIOR|D|interface range GigabitEthernet1/0/1-4
description TEXT|Interfaces|Document the connected system, circuit, or operational purpose of an interface.|Interface Configuration|FOUNDATION||description UPLINK_TO_CORE1
ip address ADDRESS MASK|IPv4|Assign a primary IPv4 address and mask to a routed interface.|Interface Configuration|FOUNDATION|D|ip address 192.0.2.1 255.255.255.252
ip address dhcp|IPv4|Acquire an interface IPv4 address and related options through DHCP.|Interface Configuration|JUNIOR|D|ip address dhcp
ipv6 address PREFIX|IPv6|Assign a static IPv6 address and prefix length to an interface.|Interface Configuration|JUNIOR|D|ipv6 address 2001:db8:10::1/64
ipv6 enable|IPv6|Enable IPv6 processing and automatic link-local address generation on an interface.|Interface Configuration|JUNIOR|D|ipv6 enable
shutdown|Interfaces|Administratively disable an interface and interrupt traffic through it.|Interface Configuration|FOUNDATION|D|shutdown
no shutdown|Interfaces|Administratively enable an interface after configuration and safety checks.|Interface Configuration|FOUNDATION|D|no shutdown
speed VALUE|Interfaces|Override interface speed negotiation where the platform supports it.|Interface Configuration|JUNIOR|D|speed 1000
duplex VALUE|Interfaces|Override Ethernet duplex negotiation where the platform supports it.|Interface Configuration|JUNIOR|D|duplex full
mtu BYTES|Interfaces|Set the maximum transmission unit accepted by an interface.|Interface Configuration|PROFESSIONAL|D|mtu 9000
bandwidth KBPS|Interfaces|Set the logical interface bandwidth used by routing metrics and reporting.|Interface Configuration|JUNIOR|D|bandwidth 1000000
load-interval SECONDS|Interfaces|Set the interval used to calculate interface load statistics.|Interface Configuration|PROFESSIONAL||load-interval 30
no ip redirects|Interfaces|Disable IPv4 ICMP redirect generation on an interface.|Interface Configuration|PROFESSIONAL|D|no ip redirects
no ip proxy-arp|Interfaces|Disable proxy ARP responses on an interface.|Interface Configuration|PROFESSIONAL|D|no ip proxy-arp
show vlan brief|VLAN|List VLAN identifiers, names, status, and assigned access ports.|Privileged EXEC|FOUNDATION||show vlan brief
show vlan id VLAN|VLAN|Display detailed membership and state for one VLAN.|Privileged EXEC|JUNIOR||show vlan id 20
vlan VLAN|VLAN|Create a VLAN or enter VLAN configuration mode.|Global Configuration|FOUNDATION|D|vlan 20
name NAME|VLAN|Assign a descriptive name to the current VLAN.|VLAN Configuration|FOUNDATION||name USERS
switchport|Layer 2|Convert a capable interface from routed operation to Layer 2 switch-port mode.|Interface Configuration|JUNIOR|D|switchport
no switchport|Layer 2|Convert a capable switch port to a routed Layer 3 interface.|Interface Configuration|JUNIOR|D|no switchport
switchport mode access|VLAN|Force an interface to operate as a static access port.|Interface Configuration|FOUNDATION|D|switchport mode access
switchport access vlan VLAN|VLAN|Assign the access VLAN used for untagged data traffic.|Interface Configuration|FOUNDATION|D|switchport access vlan 20
switchport voice vlan VLAN|VLAN|Advertise and assign a separate voice VLAN on an access port.|Interface Configuration|JUNIOR|D|switchport voice vlan 30
switchport mode trunk|Trunking|Force an interface to operate as a static 802.1Q trunk.|Interface Configuration|FOUNDATION|D|switchport mode trunk
switchport trunk native vlan VLAN|Trunking|Set the VLAN carried untagged on an 802.1Q trunk.|Interface Configuration|JUNIOR|D|switchport trunk native vlan 999
switchport trunk allowed vlan LIST|Trunking|Restrict which VLANs may cross an 802.1Q trunk.|Interface Configuration|JUNIOR|D|switchport trunk allowed vlan 10,20,30
switchport nonegotiate|Trunking|Disable DTP frame transmission on a manually configured trunk.|Interface Configuration|JUNIOR|D|switchport nonegotiate
show interfaces trunk|Trunking|Display trunk status, native VLAN, allowed VLANs, and forwarding VLANs.|Privileged EXEC|FOUNDATION||show interfaces trunk
show interfaces switchport|Layer 2|Display administrative and operational switch-port parameters.|Privileged EXEC|JUNIOR||show interfaces GigabitEthernet1/0/1 switchport
show dtp interface|Trunking|Display Dynamic Trunking Protocol state for a switch port.|Privileged EXEC|PROFESSIONAL||show dtp interface GigabitEthernet1/0/1
show mac address-table|Layer 2|Display learned, static, and secure MAC forwarding entries.|Privileged EXEC|FOUNDATION||show mac address-table dynamic
clear mac address-table dynamic|Layer 2|Remove dynamically learned MAC entries and force relearning.|Privileged EXEC|JUNIOR|D|clear mac address-table dynamic
switchport port-security|Port Security|Enable switch-port security on a supported static access or trunk port.|Interface Configuration|JUNIOR|D|switchport port-security
switchport port-security maximum NUMBER|Port Security|Set the maximum number of secure MAC addresses allowed on a port.|Interface Configuration|JUNIOR|D|switchport port-security maximum 2
switchport port-security mac-address sticky|Port Security|Dynamically learn secure MAC addresses into running configuration.|Interface Configuration|JUNIOR|D|switchport port-security mac-address sticky
switchport port-security violation MODE|Port Security|Choose protect, restrict, or shutdown behavior for port-security violations.|Interface Configuration|JUNIOR|D|switchport port-security violation restrict
show port-security interface|Port Security|Display secure MAC counts, violation mode, and port-security state.|Privileged EXEC|JUNIOR||show port-security interface GigabitEthernet1/0/10
show spanning-tree|STP|Display spanning-tree root, port roles, costs, and states.|Privileged EXEC|FOUNDATION||show spanning-tree
show spanning-tree vlan VLAN|STP|Inspect the spanning-tree instance for one VLAN.|Privileged EXEC|FOUNDATION||show spanning-tree vlan 20
show spanning-tree root|STP|Summarize current root bridge and local root-port state per instance.|Privileged EXEC|JUNIOR||show spanning-tree root
show spanning-tree inconsistentports|STP|List ports held inconsistent by protection mechanisms.|Privileged EXEC|JUNIOR||show spanning-tree inconsistentports
spanning-tree mode rapid-pvst|STP|Select Rapid PVST+ as the switch spanning-tree mode.|Global Configuration|JUNIOR|D|spanning-tree mode rapid-pvst
spanning-tree vlan VLAN root primary|STP|Tune bridge priority to make the switch the likely root for selected VLANs.|Global Configuration|JUNIOR|D|spanning-tree vlan 10,20 root primary
spanning-tree vlan VLAN priority VALUE|STP|Set an explicit bridge priority for selected VLAN instances.|Global Configuration|JUNIOR|D|spanning-tree vlan 20 priority 24576
spanning-tree portfast|STP|Allow an edge port to transition rapidly to forwarding state.|Interface Configuration|JUNIOR|D|spanning-tree portfast
spanning-tree bpduguard enable|STP|Error-disable an edge port that receives a spanning-tree BPDU.|Interface Configuration|JUNIOR|D|spanning-tree bpduguard enable
spanning-tree guard root|STP|Prevent a port from becoming a root port when superior BPDUs arrive.|Interface Configuration|PROFESSIONAL|D|spanning-tree guard root
spanning-tree guard loop|STP|Protect against unidirectional failures that stop expected BPDUs.|Interface Configuration|PROFESSIONAL|D|spanning-tree guard loop
show etherchannel summary|EtherChannel|Summarize channel groups, member flags, protocol, and bundle state.|Privileged EXEC|JUNIOR||show etherchannel summary
show etherchannel port-channel|EtherChannel|Display port-channel operational and member-port details.|Privileged EXEC|PROFESSIONAL||show etherchannel port-channel
channel-group NUMBER mode MODE|EtherChannel|Place an interface into a static, LACP, or PAgP channel group.|Interface Configuration|JUNIOR|D|channel-group 10 mode active
channel-protocol lacp|EtherChannel|Select LACP as the negotiation protocol for a channel group.|Interface Configuration|PROFESSIONAL|D|channel-protocol lacp
lacp rate fast|EtherChannel|Request fast LACPDU transmission on a member interface.|Interface Configuration|PROFESSIONAL|D|lacp rate fast
port-channel load-balance METHOD|EtherChannel|Select the fields used to hash flows across port-channel members.|Global Configuration|PROFESSIONAL|D|port-channel load-balance src-dst-ip
show cdp neighbors|CDP|List directly connected Cisco Discovery Protocol neighbors.|Privileged EXEC|FOUNDATION||show cdp neighbors detail
show lldp neighbors|LLDP|List directly connected Link Layer Discovery Protocol neighbors.|Privileged EXEC|FOUNDATION||show lldp neighbors detail
cdp run|CDP|Enable Cisco Discovery Protocol globally.|Global Configuration|JUNIOR|D|cdp run
lldp run|LLDP|Enable Link Layer Discovery Protocol globally.|Global Configuration|JUNIOR|D|lldp run
ip routing|IPv4|Enable IPv4 unicast routing on a multilayer switch.|Global Configuration|JUNIOR|D|ip routing
ipv6 unicast-routing|IPv6|Enable IPv6 packet forwarding and router-advertisement behavior.|Global Configuration|JUNIOR|D|ipv6 unicast-routing
show ip route|Routing|Display the IPv4 routing information base and route sources.|Privileged EXEC|FOUNDATION||show ip route
show ipv6 route|IPv6|Display the IPv6 routing information base and route sources.|Privileged EXEC|JUNIOR||show ipv6 route
show ip route ADDRESS|Routing|Resolve the longest-prefix route selected for a specific IPv4 address.|Privileged EXEC|JUNIOR||show ip route 10.20.30.40
show ip protocols|Routing|Display active routing protocols, networks, timers, filters, and redistribution state.|Privileged EXEC|JUNIOR||show ip protocols
show cef|Routing|Display Cisco Express Forwarding entries and adjacency information.|Privileged EXEC|PROFESSIONAL||show cef
show ip cef PREFIX|Routing|Inspect the CEF forwarding entry and next hop for an IPv4 prefix.|Privileged EXEC|PROFESSIONAL||show ip cef 10.20.0.0/16 detail
show adjacency|Routing|Display CEF adjacency rewrite information and incomplete adjacencies.|Privileged EXEC|PROFESSIONAL||show adjacency detail
ip route PREFIX MASK NEXT_HOP|Static Routing|Install an IPv4 static route through a next hop or exit interface.|Global Configuration|FOUNDATION|D|ip route 10.20.0.0 255.255.0.0 192.0.2.2
ipv6 route PREFIX NEXT_HOP|IPv6|Install an IPv6 static route through a next hop or exit interface.|Global Configuration|JUNIOR|D|ipv6 route 2001:db8:20::/48 2001:db8:12::2
ip route 0.0.0.0 0.0.0.0 NEXT_HOP|Static Routing|Install an IPv4 default route toward an upstream next hop.|Global Configuration|FOUNDATION|D|ip route 0.0.0.0 0.0.0.0 192.0.2.1
track NUMBER ip sla NUMBER reachability|Static Routing|Tie a tracked object to IP SLA reachability for conditional routing behavior.|Global Configuration|PROFESSIONAL|D|track 10 ip sla 10 reachability
router ospf PROCESS_ID|OSPF|Create or enter an IPv4 OSPF routing process.|Global Configuration|JUNIOR|D|router ospf 10
router-id ADDRESS|OSPF|Set the explicit 32-bit router identifier used by the routing process.|Router Configuration|JUNIOR|D|router-id 1.1.1.1
network ADDRESS WILDCARD area AREA|OSPF|Enable OSPF on matching interfaces and assign them to an area.|Router Configuration|JUNIOR|D|network 10.0.12.0 0.0.0.3 area 0
passive-interface INTERFACE|OSPF|Advertise a connected network without forming neighbors on the interface.|Router Configuration|JUNIOR|D|passive-interface GigabitEthernet0/0
passive-interface default|OSPF|Make every interface passive until explicitly enabled for adjacency formation.|Router Configuration|PROFESSIONAL|D|passive-interface default
no passive-interface INTERFACE|OSPF|Permit OSPF neighbor formation on one interface under passive-by-default design.|Router Configuration|PROFESSIONAL|D|no passive-interface GigabitEthernet0/1
default-information originate|OSPF|Originate a default route into OSPF when a default exists locally.|Router Configuration|PROFESSIONAL|D|default-information originate
default-information originate always|OSPF|Originate an OSPF default route even when none exists in the local RIB.|Router Configuration|PROFESSIONAL|D|default-information originate always
area AREA stub|OSPF|Configure an OSPF area as a stub area on participating routers.|Router Configuration|PROFESSIONAL|D|area 10 stub
area AREA stub no-summary|OSPF|Configure a totally stubby area on the ABR.|Router Configuration|PROFESSIONAL|D|area 10 stub no-summary
area AREA nssa|OSPF|Configure a not-so-stubby area that can contain an ASBR.|Router Configuration|PROFESSIONAL|D|area 20 nssa
area AREA range PREFIX MASK|OSPF|Summarize inter-area routes on an area border router.|Router Configuration|PROFESSIONAL|D|area 10 range 10.10.0.0 255.255.0.0
auto-cost reference-bandwidth MBPS|OSPF|Set the Mbps reference used to derive automatic interface costs.|Router Configuration|PROFESSIONAL|D|auto-cost reference-bandwidth 100000
ip ospf PROCESS_ID area AREA|OSPF|Enable OSPF directly on an interface and assign its area.|Interface Configuration|JUNIOR|D|ip ospf 10 area 0
ip ospf cost COST|OSPF|Override the automatically calculated OSPF interface cost.|Interface Configuration|PROFESSIONAL|D|ip ospf cost 20
ip ospf network TYPE|OSPF|Set the OSPF network type used for adjacency and DR behavior.|Interface Configuration|PROFESSIONAL|D|ip ospf network point-to-point
ip ospf priority VALUE|OSPF|Influence designated-router election on a multiaccess network.|Interface Configuration|PROFESSIONAL|D|ip ospf priority 100
ip ospf hello-interval SECONDS|OSPF|Set the OSPF hello interval on an interface.|Interface Configuration|ADVANCED|D|ip ospf hello-interval 10
ip ospf dead-interval SECONDS|OSPF|Set the OSPF neighbor dead interval on an interface.|Interface Configuration|ADVANCED|D|ip ospf dead-interval 40
show ip ospf|OSPF|Display process identifiers, router ID, area counts, SPF statistics, and timers.|Privileged EXEC|JUNIOR||show ip ospf
show ip ospf neighbor|OSPF|Display OSPF neighbor state, priority, dead timer, and adjacency address.|Privileged EXEC|JUNIOR||show ip ospf neighbor
show ip ospf interface|OSPF|Display interface-level OSPF parameters, timers, state, and neighbor counts.|Privileged EXEC|JUNIOR||show ip ospf interface GigabitEthernet0/1
show ip ospf interface brief|OSPF|Summarize OSPF-enabled interfaces, process, area, cost, state, and neighbor count.|Privileged EXEC|JUNIOR||show ip ospf interface brief
show ip ospf database|OSPF|Inspect the link-state database by area and LSA type.|Privileged EXEC|PROFESSIONAL||show ip ospf database
show ip ospf border-routers|OSPF|Display routes to area border and autonomous-system boundary routers.|Privileged EXEC|PROFESSIONAL||show ip ospf border-routers
show ip route ospf|OSPF|Display OSPF routes installed in the IPv4 routing table.|Privileged EXEC|JUNIOR||show ip route ospf
clear ip ospf process|OSPF|Reset the OSPF process and all adjacencies after explicit confirmation.|Privileged EXEC|PROFESSIONAL|D|clear ip ospf process
debug ip ospf adj|OSPF|Trace OSPF adjacency events for bounded troubleshooting.|Privileged EXEC|ADVANCED|D|debug ip ospf adj
router eigrp AS_NUMBER|EIGRP|Create or enter a classic autonomous-system EIGRP process.|Global Configuration|PROFESSIONAL|D|router eigrp 100
router eigrp NAME|EIGRP|Create or enter a named EIGRP process.|Global Configuration|PROFESSIONAL|D|router eigrp CAMPUS
address-family ipv4 autonomous-system AS_NUMBER|EIGRP|Enter IPv4 address-family configuration under named EIGRP.|Router Configuration|PROFESSIONAL|D|address-family ipv4 autonomous-system 100
af-interface INTERFACE|EIGRP|Enter interface-specific named EIGRP address-family configuration.|Address Family Configuration|ADVANCED|D|af-interface GigabitEthernet0/1
topology base|EIGRP|Enter the base topology configuration under named EIGRP.|Address Family Configuration|ADVANCED|D|topology base
network ADDRESS WILDCARD|EIGRP|Enable classic EIGRP on interfaces matching an IPv4 network expression.|Router Configuration|PROFESSIONAL|D|network 10.0.0.0 0.255.255.255
eigrp router-id ADDRESS|EIGRP|Set the explicit EIGRP router identifier.|Router Configuration|PROFESSIONAL|D|eigrp router-id 1.1.1.1
variance MULTIPLIER|EIGRP|Permit unequal-cost load sharing across feasible routes within a metric multiplier.|Router Configuration|ADVANCED|D|variance 2
maximum-paths NUMBER|EIGRP|Set the number of equal- or unequal-cost paths EIGRP may install.|Router Configuration|PROFESSIONAL|D|maximum-paths 4
metric weights TOS K1 K2 K3 K4 K5|EIGRP|Change classic EIGRP K-values with domain-wide consistency planning.|Router Configuration|ADVANCED|D|metric weights 0 1 0 1 0 0
default-metric BW DELAY RELIABILITY LOAD MTU|EIGRP|Define seed metric components for routes redistributed into EIGRP.|Router Configuration|ADVANCED|D|default-metric 100000 100 255 1 1500
redistribute PROTOCOL metric METRIC|EIGRP|Inject routes from another source into EIGRP with explicit metric components.|Router Configuration|ADVANCED|D|redistribute static metric 100000 100 255 1 1500
distance eigrp INTERNAL EXTERNAL|EIGRP|Change administrative distances for internal and external EIGRP routes.|Router Configuration|ADVANCED|D|distance eigrp 90 170
ip summary-address eigrp AS PREFIX MASK|EIGRP|Create an EIGRP summary route at an interface boundary.|Interface Configuration|PROFESSIONAL|D|ip summary-address eigrp 100 10.10.0.0 255.255.0.0
show ip eigrp neighbors|EIGRP|Display EIGRP neighbors, hold timers, queues, sequence numbers, and uptime.|Privileged EXEC|PROFESSIONAL||show ip eigrp neighbors
show ip eigrp topology|EIGRP|Display successor and feasible-successor routes in the EIGRP topology table.|Privileged EXEC|PROFESSIONAL||show ip eigrp topology
show ip eigrp topology all-links|EIGRP|Display all learned EIGRP paths, including routes that fail feasibility.|Privileged EXEC|ADVANCED||show ip eigrp topology all-links
show ip eigrp interfaces|EIGRP|Display EIGRP-enabled interfaces, peers, queues, and pacing timers.|Privileged EXEC|PROFESSIONAL||show ip eigrp interfaces detail
show ip eigrp traffic|EIGRP|Display EIGRP packet counters and routing-event statistics.|Privileged EXEC|PROFESSIONAL||show ip eigrp traffic
show ip route eigrp|EIGRP|Display EIGRP routes installed in the IPv4 routing table.|Privileged EXEC|PROFESSIONAL||show ip route eigrp
show eigrp address-family ipv4 topology|EIGRP|Inspect named EIGRP IPv4 topology state.|Privileged EXEC|ADVANCED||show eigrp address-family ipv4 topology
clear ip eigrp neighbors|EIGRP|Reset one or all EIGRP neighbor relationships.|Privileged EXEC|ADVANCED|D|clear ip eigrp neighbors
router bgp ASN|BGP|Create or enter a BGP routing process for the local autonomous system.|Global Configuration|PROFESSIONAL|D|router bgp 65001
bgp router-id ADDRESS|BGP|Set the explicit BGP router identifier.|Router Configuration|PROFESSIONAL|D|bgp router-id 1.1.1.1
neighbor ADDRESS remote-as ASN|BGP|Define a BGP peer and its autonomous system.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 remote-as 65002
neighbor ADDRESS description TEXT|BGP|Document the role or circuit associated with a BGP neighbor.|Router Configuration|PROFESSIONAL||neighbor 203.0.113.2 description TRANSIT_ISP
neighbor ADDRESS update-source INTERFACE|BGP|Select a stable local source interface for BGP sessions.|Router Configuration|PROFESSIONAL|D|neighbor 10.255.0.2 update-source Loopback0
neighbor ADDRESS ebgp-multihop HOPS|BGP|Allow an eBGP session to a peer beyond the directly connected hop.|Router Configuration|ADVANCED|D|neighbor 10.255.0.2 ebgp-multihop 2
neighbor ADDRESS password SECRET|BGP|Configure TCP MD5 authentication for a BGP neighbor using a placeholder secret.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 password <BGP_SECRET>
network PREFIX mask MASK|BGP|Originate an exactly matching local route into BGP.|Router Configuration|PROFESSIONAL|D|network 198.51.100.0 mask 255.255.255.0
aggregate-address PREFIX MASK summary-only|BGP|Create a BGP aggregate while suppressing more-specific advertisements.|Router Configuration|ADVANCED|D|aggregate-address 198.51.100.0 255.255.252.0 summary-only
neighbor ADDRESS next-hop-self|BGP|Rewrite the BGP next hop to the local router for advertisements to a neighbor.|Router Configuration|PROFESSIONAL|D|neighbor 10.255.0.2 next-hop-self
neighbor ADDRESS route-reflector-client|BGP|Mark an iBGP neighbor as a route-reflector client.|Router Configuration|ADVANCED|D|neighbor 10.255.0.2 route-reflector-client
neighbor ADDRESS send-community|BGP|Send standard community attributes to a BGP neighbor.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 send-community both
maximum-paths NUMBER|BGP|Allow multiple equal-cost eBGP paths to enter the routing table.|Router Configuration|ADVANCED|D|maximum-paths 4
neighbor ADDRESS default-originate|BGP|Advertise a default route to a selected BGP neighbor.|Router Configuration|ADVANCED|D|neighbor 192.0.2.2 default-originate
neighbor ADDRESS soft-reconfiguration inbound|BGP|Retain received routes for older inbound policy re-evaluation workflows.|Router Configuration|ADVANCED|L,D|neighbor 203.0.113.2 soft-reconfiguration inbound
neighbor ADDRESS route-map NAME in|BGP|Apply an inbound route map to updates from a BGP neighbor.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 route-map ISP-IN in
neighbor ADDRESS prefix-list NAME out|BGP|Apply an outbound prefix list to a BGP neighbor.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 prefix-list PUBLIC-ONLY out
neighbor ADDRESS shutdown|BGP|Administratively disable a BGP neighbor without removing configuration.|Router Configuration|PROFESSIONAL|D|neighbor 203.0.113.2 shutdown
show ip bgp|BGP|Display the IPv4 BGP table, path attributes, and best-path markers.|Privileged EXEC|PROFESSIONAL||show ip bgp
show ip bgp summary|BGP|Summarize neighbor state, prefixes received, messages, and uptime.|Privileged EXEC|PROFESSIONAL||show ip bgp summary
show ip bgp neighbors|BGP|Display detailed BGP session capabilities, timers, policy, and counters.|Privileged EXEC|ADVANCED||show ip bgp neighbors 203.0.113.2
show ip bgp PREFIX|BGP|Display all BGP paths and best-path reasoning for one prefix.|Privileged EXEC|PROFESSIONAL||show ip bgp 198.51.100.0/24
show ip bgp rib-failure|BGP|List BGP best paths that were not installed in the routing table.|Privileged EXEC|ADVANCED||show ip bgp rib-failure
show ip route bgp|BGP|Display BGP routes installed in the IPv4 routing table.|Privileged EXEC|PROFESSIONAL||show ip route bgp
show bgp ipv6 unicast summary|BGP|Summarize IPv6-unicast BGP neighbor state and received prefixes.|Privileged EXEC|ADVANCED||show bgp ipv6 unicast summary
clear ip bgp ADDRESS soft in|BGP|Request a non-disruptive inbound BGP policy refresh where supported.|Privileged EXEC|ADVANCED|D|clear ip bgp 203.0.113.2 soft in
clear ip bgp *|BGP|Reset every IPv4 BGP session and interrupt route exchange.|Privileged EXEC|ADVANCED|D|clear ip bgp *
ip prefix-list NAME permit PREFIX|Prefix Lists|Create an ordered prefix-list entry with optional length constraints.|Global Configuration|PROFESSIONAL|D|ip prefix-list PUBLIC permit 198.51.100.0/24
show ip prefix-list|Prefix Lists|Display prefix-list entries, sequence numbers, and match counters.|Privileged EXEC|PROFESSIONAL||show ip prefix-list PUBLIC
route-map NAME permit SEQUENCE|Route Maps|Create or enter an ordered route-map clause.|Global Configuration|PROFESSIONAL|D|route-map ISP-IN permit 10
match ip address prefix-list NAME|Route Maps|Match routes selected by an IPv4 prefix list inside a route map.|Route Map Configuration|PROFESSIONAL|D|match ip address prefix-list CUSTOMER
set local-preference VALUE|BGP|Set BGP local preference for routes matched by a route map.|Route Map Configuration|ADVANCED|D|set local-preference 200
set metric VALUE|BGP|Set BGP MED or another protocol-specific metric in policy.|Route Map Configuration|ADVANCED|D|set metric 50
set weight VALUE|BGP|Set Cisco-local BGP weight for matched routes.|Route Map Configuration|ADVANCED|D|set weight 500
set as-path prepend ASN|BGP|Prepend autonomous-system numbers to influence inbound path selection.|Route Map Configuration|ADVANCED|D|set as-path prepend 65001 65001 65001
set community VALUE additive|BGP|Add a BGP community without discarding existing communities.|Route Map Configuration|ADVANCED|D|set community 65001:100 additive
show route-map|Route Maps|Display route-map clauses, match or set actions, and counters.|Privileged EXEC|PROFESSIONAL||show route-map ISP-IN
access-list NUMBER permit SOURCE WILDCARD|ACL|Create a numbered standard IPv4 access-control entry.|Global Configuration|JUNIOR|D|access-list 10 permit 192.168.10.0 0.0.0.255
access-list NUMBER permit PROTOCOL SOURCE DESTINATION|ACL|Create a numbered extended IPv4 access-control entry.|Global Configuration|JUNIOR|D|access-list 110 permit tcp any host 10.10.20.10 eq 443
ip access-list standard NAME|ACL|Create or enter a named standard IPv4 ACL.|Global Configuration|JUNIOR|D|ip access-list standard MANAGEMENT
ip access-list extended NAME|ACL|Create or enter a named extended IPv4 ACL.|Global Configuration|JUNIOR|D|ip access-list extended WEB-IN
permit SOURCE WILDCARD|ACL|Add a permit entry in standard ACL configuration mode.|ACL Configuration|JUNIOR|D|permit 192.168.10.0 0.0.0.255
permit PROTOCOL SOURCE DESTINATION|ACL|Add a protocol-aware permit entry in extended ACL configuration mode.|ACL Configuration|JUNIOR|D|permit tcp any host 10.10.20.10 eq 443
deny ip any any log|ACL|Add an explicit logged deny for unmatched IPv4 traffic.|ACL Configuration|JUNIOR|D|deny ip any any log
remark TEXT|ACL|Document the intent of an ACL sequence without matching packets.|ACL Configuration|JUNIOR||remark Allow management sources
ip access-group ACL in|ACL|Apply an IPv4 ACL inbound on a Layer 3 interface.|Interface Configuration|JUNIOR|D|ip access-group WEB-IN in
ip access-group ACL out|ACL|Apply an IPv4 ACL outbound on a Layer 3 interface.|Interface Configuration|JUNIOR|D|ip access-group WEB-IN out
show access-lists|ACL|Display configured access lists and packet match counters.|Privileged EXEC|JUNIOR||show access-lists
show ip access-lists|ACL|Display IPv4 ACL entries, sequence numbers, and counters.|Privileged EXEC|JUNIOR||show ip access-lists WEB-IN
clear access-list counters|ACL|Reset ACL match counters without removing ACL configuration.|Privileged EXEC|PROFESSIONAL|D|clear access-list counters WEB-IN
ip nat inside|NAT|Mark an interface as the inside NAT domain.|Interface Configuration|JUNIOR|D|ip nat inside
ip nat outside|NAT|Mark an interface as the outside NAT domain.|Interface Configuration|JUNIOR|D|ip nat outside
ip nat inside source static LOCAL GLOBAL|NAT|Create a one-to-one static inside-local to inside-global translation.|Global Configuration|JUNIOR|D|ip nat inside source static 10.10.20.10 198.51.100.10
ip nat pool NAME START END netmask MASK|NAT|Define a pool of inside-global addresses for dynamic NAT.|Global Configuration|PROFESSIONAL|D|ip nat pool PUBLIC 198.51.100.10 198.51.100.20 netmask 255.255.255.0
ip nat inside source list ACL interface IFACE overload|NAT|Configure PAT using an outside interface address for matched inside sources.|Global Configuration|JUNIOR|D|ip nat inside source list 10 interface GigabitEthernet0/1 overload
show ip nat translations|NAT|Display active and static NAT translation entries.|Privileged EXEC|JUNIOR||show ip nat translations
show ip nat statistics|NAT|Display NAT interfaces, pools, counters, and configuration statistics.|Privileged EXEC|JUNIOR||show ip nat statistics
clear ip nat translation *|NAT|Remove all dynamic NAT translations and disrupt active translated flows.|Privileged EXEC|PROFESSIONAL|D|clear ip nat translation *
ip dhcp excluded-address START END|DHCP|Reserve addresses that IOS DHCP pools must not lease.|Global Configuration|JUNIOR|D|ip dhcp excluded-address 10.10.20.1 10.10.20.20
ip dhcp pool NAME|DHCP|Create or enter an IOS DHCP address pool.|Global Configuration|JUNIOR|D|ip dhcp pool USERS
network PREFIX MASK|DHCP|Define the subnet from which a DHCP pool allocates addresses.|DHCP Pool Configuration|JUNIOR|D|network 10.10.20.0 255.255.255.0
default-router ADDRESS|DHCP|Provide one or more default gateways through DHCP option 3.|DHCP Pool Configuration|JUNIOR|D|default-router 10.10.20.1
dns-server ADDRESS|DHCP|Provide DNS server addresses to DHCP clients.|DHCP Pool Configuration|JUNIOR|D|dns-server 10.10.53.53
show ip dhcp binding|DHCP|Display active DHCP leases and client identifiers.|Privileged EXEC|JUNIOR||show ip dhcp binding
show ip dhcp conflict|DHCP|Display addresses excluded after conflict detection.|Privileged EXEC|PROFESSIONAL||show ip dhcp conflict
standby GROUP ip ADDRESS|HSRP|Configure the virtual IPv4 address for an HSRP group.|Interface Configuration|JUNIOR|D|standby 20 ip 10.20.0.1
standby GROUP priority VALUE|HSRP|Set the HSRP election priority for an interface.|Interface Configuration|JUNIOR|D|standby 20 priority 110
standby GROUP preempt|HSRP|Allow a higher-priority router to retake the HSRP active role.|Interface Configuration|JUNIOR|D|standby 20 preempt
standby GROUP track OBJECT DECREMENT|HSRP|Lower HSRP priority when a tracked object fails.|Interface Configuration|PROFESSIONAL|D|standby 20 track 10 decrement 20
show standby brief|HSRP|Summarize HSRP groups, state, active peer, standby peer, and virtual IP.|Privileged EXEC|JUNIOR||show standby brief
vrrp GROUP ip ADDRESS|VRRP|Configure an IPv4 virtual address for a VRRP group.|Interface Configuration|PROFESSIONAL|D|vrrp 20 ip 10.20.0.1
show vrrp brief|VRRP|Summarize VRRP group state, priority, master, and virtual address.|Privileged EXEC|PROFESSIONAL||show vrrp brief
ntp server ADDRESS|NTP|Configure an NTP server used to discipline the device clock.|Global Configuration|JUNIOR|D|ntp server 192.0.2.50
show ntp associations|NTP|Display NTP peers, reachability, stratum, offset, and selected source.|Privileged EXEC|JUNIOR||show ntp associations
show ntp status|NTP|Display synchronization state, reference, stratum, and clock quality.|Privileged EXEC|JUNIOR||show ntp status
logging host ADDRESS|Syslog|Send syslog messages to a remote collector.|Global Configuration|JUNIOR|D|logging host 192.0.2.60
logging trap LEVEL|Syslog|Set the minimum severity sent to remote syslog collectors.|Global Configuration|JUNIOR|D|logging trap warnings
snmp-server community STRING ro|SNMP|Configure a read-only SNMPv2c community using a placeholder value.|Global Configuration|JUNIOR|D|snmp-server community <COMMUNITY> ro
snmp-server host ADDRESS version 2c STRING|SNMP|Configure an SNMPv2c notification receiver with placeholder credentials.|Global Configuration|PROFESSIONAL|D|snmp-server host 192.0.2.70 version 2c <COMMUNITY>
show snmp|SNMP|Display SNMP engine statistics and packet counters.|Privileged EXEC|PROFESSIONAL||show snmp
username NAME privilege LEVEL secret SECRET|SSH|Create a local privileged account with a hashed placeholder secret.|Global Configuration|JUNIOR|D|username netops privilege 15 secret <SECRET>
enable secret SECRET|SSH|Configure the privileged EXEC secret using a placeholder value.|Global Configuration|FOUNDATION|D|enable secret <SECRET>
ip domain-name NAME|SSH|Set the domain name used when generating SSH RSA keys.|Global Configuration|JUNIOR|D|ip domain-name lab.example
crypto key generate rsa modulus BITS|SSH|Generate an RSA key pair used by the IOS SSH server.|Global Configuration|JUNIOR|D|crypto key generate rsa modulus 2048
ip ssh version 2|SSH|Require SSH protocol version 2 for inbound management sessions.|Global Configuration|JUNIOR|D|ip ssh version 2
line console 0|SSH|Enter console-line configuration mode.|Global Configuration|FOUNDATION||line console 0
line vty 0 4|SSH|Enter virtual terminal line configuration for remote access.|Global Configuration|FOUNDATION||line vty 0 4
login local|SSH|Authenticate line access against the local username database.|Line Configuration|JUNIOR|D|login local
transport input ssh|SSH|Restrict inbound VTY transport to SSH.|Line Configuration|JUNIOR|D|transport input ssh
exec-timeout MINUTES SECONDS|SSH|Disconnect idle EXEC sessions after a defined interval.|Line Configuration|JUNIOR|D|exec-timeout 10 0
service password-encryption|AAA|Obfuscate plain-text passwords stored in configuration.|Global Configuration|FOUNDATION|D|service password-encryption
aaa new-model|AAA|Enable the IOS Authentication Authorization and Accounting framework.|Global Configuration|PROFESSIONAL|D|aaa new-model
banner motd DELIMITER TEXT|Device Basics|Configure a message-of-the-day banner for legal and operational notice.|Global Configuration|FOUNDATION||banner motd #Authorized access only#
interface Tunnel NUMBER|GRE|Create or enter configuration mode for a logical tunnel interface.|Global Configuration|PROFESSIONAL|D|interface Tunnel0
tunnel source INTERFACE|GRE|Set the source interface or address for a tunnel.|Interface Configuration|PROFESSIONAL|D|tunnel source Loopback0
tunnel destination ADDRESS|GRE|Set the remote endpoint address for a point-to-point tunnel.|Interface Configuration|PROFESSIONAL|D|tunnel destination 198.51.100.2
tunnel mode gre ip|GRE|Select IPv4 GRE encapsulation for a tunnel interface.|Interface Configuration|PROFESSIONAL|D|tunnel mode gre ip
show interfaces tunnel|GRE|Display tunnel line state, encapsulation, source, destination, and counters.|Privileged EXEC|PROFESSIONAL||show interfaces Tunnel0
class-map match-any NAME|QoS|Create a QoS class that matches any configured criterion.|Global Configuration|PROFESSIONAL|D|class-map match-any VOICE
match dscp VALUE|QoS|Match packets carrying selected DSCP markings in a class map.|Class Map Configuration|PROFESSIONAL|D|match dscp ef
policy-map NAME|QoS|Create or enter a QoS service policy.|Global Configuration|PROFESSIONAL|D|policy-map WAN-EDGE
priority percent VALUE|QoS|Configure a low-latency priority queue with a bandwidth percentage.|Policy Map Class Configuration|ADVANCED|D|priority percent 20
service-policy output NAME|QoS|Apply a QoS policy to traffic leaving an interface.|Interface Configuration|PROFESSIONAL|D|service-policy output WAN-EDGE
show policy-map interface|QoS|Display QoS classifications, drops, queueing, and shaping statistics on interfaces.|Privileged EXEC|PROFESSIONAL||show policy-map interface GigabitEthernet0/1
monitor session NUMBER source interface INTERFACE|SPAN|Select a source interface for a local SPAN monitoring session.|Global Configuration|PROFESSIONAL|D|monitor session 1 source interface GigabitEthernet1/0/10 both
monitor session NUMBER destination interface INTERFACE|SPAN|Select the destination capture interface for a SPAN session.|Global Configuration|PROFESSIONAL|D|monitor session 1 destination interface GigabitEthernet1/0/24
show monitor session|SPAN|Display configured SPAN sources, destinations, and status.|Privileged EXEC|PROFESSIONAL||show monitor session 1
ping ADDRESS|Verification|Send ICMP echo probes with optional source, size, repeat, and timeout controls.|Privileged EXEC|FOUNDATION||ping 192.0.2.2
traceroute ADDRESS|Verification|Discover the Layer 3 hop sequence toward an IPv4 destination.|Privileged EXEC|JUNIOR||traceroute 198.51.100.10 numeric
show arp|Verification|Display IPv4 ARP cache entries and associated interfaces.|Privileged EXEC|FOUNDATION||show arp
show ipv6 neighbors|IPv6|Display IPv6 Neighbor Discovery cache entries and state.|Privileged EXEC|JUNIOR||show ipv6 neighbors
show ip traffic|Troubleshooting|Display global IPv4 protocol counters, errors, and forwarding statistics.|Privileged EXEC|PROFESSIONAL||show ip traffic
show interfaces accounting|Troubleshooting|Display protocol-level packet and byte accounting per interface.|Privileged EXEC|PROFESSIONAL||show interfaces accounting
show platform software status control-processor brief|Platform / Hardware|Inspect IOS-XE control-plane CPU, memory, and load status.|Privileged EXEC|ADVANCED||show platform software status control-processor brief
undebug all|Troubleshooting|Disable every active debug to protect device performance.|Privileged EXEC|JUNIOR|D|undebug all
`),
});
