# Engineering tools

NetPath Phase 4 provides seven working browser-side instruments. Inputs and outputs
stay in the browser; calculators do not require a server round trip. Shared controls
provide consistent copy, reset, validation, error, and status behavior.

## Tool inventory

| Route | Engine | Principal output |
| --- | --- | --- |
| `/tools/subnet-calculator` | `calculateSubnet()` | IPv4 boundary, mask, wildcard, host range, capacity, and binary state |
| `/tools/vlsm-planner` | `planVlsm()` | Largest-first, aligned, non-overlapping IPv4 allocation table and remainder |
| `/tools/ipv6-helper` | `analyzeIPv6()`, `planIPv6Prefixes()` | Exact expansion, compression, classification, binary hextets, and child prefixes |
| `/tools/wildcard-calculator` | `calculateWildcard()` | Contiguous mask, prefix, wildcard, and Cisco examples |
| `/tools/ospf-cost-calculator` | `calculateOspfCost()` | Integer interface costs and reference-bandwidth configuration |
| `/tools/eigrp-calculator` | `calculateEigrpMetric()`, `analyzeEigrpSuccessors()` | Classic composite metric, successors, and feasibility classification |
| `/tools/acl-builder` | `generateCiscoAcl()` | Ordered standard or extended IOS ACL plus optional interface application |

All pure calculation and generation logic lives in `lib/network-tools.ts`. React
components should collect input and present results, not duplicate formulas.

## VLSM behavior

Requirements are sorted largest-first. Each block is aligned to its calculated prefix,
kept inside the parent CIDR, and checked against every earlier allocation. Standard
LAN requirements reserve network and broadcast addresses. An explicitly selected
point-to-point requirement may use `/31` with two endpoint addresses. Duplicate labels,
zero or invalid requirements, exact-fit overflow, and insufficient parent space fail
with actionable messages.

## IPv6 behavior

IPv6 calculations use `BigInt` so all 128 bits remain exact. The parser accepts
hexadecimal hextets and one `::` compression marker; it expands to eight hextets and
compresses using the longest zero run in RFC 5952 style. Classification recognizes
unspecified, loopback, documentation, link-local, unique-local, multicast, and global
unicast space. IPv6 has no broadcast address.

The current parser intentionally does not accept zone identifiers or dotted-decimal
IPv4 tails. Prefix planning enforces parent boundaries and reports exact child-prefix
counts. Primary standards: [RFC 4291](https://www.rfc-editor.org/info/rfc4291/),
[RFC 5952](https://www.rfc-editor.org/info/rfc5952/), and
[RFC 3849](https://www.rfc-editor.org/rfc/rfc3849).

## OSPF behavior

The calculator uses:

```text
cost = floor(reference bandwidth in Mbps / interface bandwidth in Mbps)
```

The displayed result is constrained to the IOS cost range of 1–65535. Use one
reference bandwidth consistently across the OSPF domain. Cisco's historical default
is 100 Mbps; the page includes modern presets and a custom value. Source:
[Cisco OSPF configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr3-fwd/ospf/ospf-configuration-guide/ospf.html).

## Classic EIGRP behavior

The tool implements the classic metric and does not claim support for EIGRP wide
metrics. With default K values (`K1=1`, `K3=1`, all others zero), it combines scaled
minimum bandwidth and cumulative delay, then multiplies by 256. Delay input is
converted to tens of microseconds. Reliability and load participate only when their
K values enable those terms; MTU and hop count are displayed but do not contribute to
the classic composite metric.

The lowest feasible distance is the successor distance; equal distances are
equal-cost successors. A non-successor is feasible only when its reported distance is
strictly less than the current successor feasible distance. Sources:
[Cisco EIGRP metrics](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/16406-eigrp-toc.html) and
[Cisco feasibility condition](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/118974-technote-eigrp-00.html).

## Cisco ACL behavior

The builder validates standard versus extended capability, named versus numbered
ranges, address and wildcard syntax, protocol-specific ports, TCP-only `established`,
remarks, logging, sequence ordering, and optional interface direction. It always
surfaces the implicit deny and packet-ordering model. Generated configuration is a
starting point: verify platform release, direction, placement, return traffic, and a
rollback path before deployment. Source:
[Cisco access-list configuration guidance](https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html).

## Validation

`tests/network-tools.test.mjs` covers normal, boundary, and rejected inputs for all
engines. `tests/ui-components.test.mjs` verifies each calculator exposes copy, reset,
labels, routes, and responsive safeguards. Run:

```bash
npx tsc --noEmit
npm run lint
npm run build
node --test tests/*.test.mjs
```
