import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, watch: { ignored: ["**/.sites-runtime/**", "**/dist/**", "**/.next/**"] } } });
const tools = await vite.ssrLoadModule("/lib/network-tools.ts");
after(async () => vite.close());

test("allocates VLSM plans largest-first without overlap", () => {
  const plan = tools.planVlsm("192.168.10.0/24", [
    { name: "Management", hosts: 30 },
    { name: "Users", hosts: 100 },
    { name: "Voice", hosts: 50 },
    { name: "WAN", hosts: 2 },
  ]);
  assert.deepEqual(plan.allocations.map((item) => `${item.name}:${item.network}/${item.prefix}`), [
    "Users:192.168.10.0/25", "Voice:192.168.10.128/26", "Management:192.168.10.192/27", "WAN:192.168.10.224/30",
  ]);
  for (let index = 1; index < plan.allocations.length; index += 1) {
    const previous = plan.allocations[index - 1];
    const current = plan.allocations[index];
    assert.ok(tools.parseIPv4(current.network) > tools.parseIPv4(previous.broadcast));
  }
  assert.equal(plan.remainingAddresses, 28);
});

test("supports enterprise VLSM, exact fit, /30 WAN, and explicit /31", () => {
  const enterprise = tools.planVlsm("10.10.0.0/16", [
    { name: "Users", hosts: 500 }, { name: "Voice", hosts: 200 }, { name: "Servers", hosts: 100 }, { name: "WAN-1", hosts: 2 },
  ]);
  assert.equal(enterprise.allocations[0].prefix, 23);
  assert.equal(enterprise.allocations.at(-1).prefix, 30);
  const exact = tools.planVlsm("198.51.100.0/30", [{ name: "Transit", hosts: 2 }]);
  assert.equal(exact.remainingAddresses, 0);
  const pointToPoint = tools.planVlsm("198.51.100.0/31", [{ name: "P2P", hosts: 2, pointToPoint: true }]);
  assert.equal(pointToPoint.allocations[0].prefix, 31);
  assert.equal(pointToPoint.allocations[0].capacity, 2);
});

test("rejects invalid or impossible VLSM requirements", () => {
  assert.throws(() => tools.planVlsm("192.0.2.1/24", [{ name: "LAN", hosts: 10 }]), /network boundary/);
  assert.throws(() => tools.planVlsm("192.0.2.0/30", [{ name: "LAN", hosts: 100 }]), /Insufficient space/);
  assert.throws(() => tools.planVlsm("192.0.2.0/24", [{ name: "LAN", hosts: 10 }, { name: "lan", hosts: 2 }]), /unique/);
  assert.throws(() => tools.planVlsm("192.0.2.0/24", [{ name: "Zero", hosts: 0 }]), /positive whole/);
  assert.throws(() => tools.planVlsm("0.0.0.0/0", [{ name: "Impossible", hosts: 4_294_967_295 }]), /exceeds/);
});

test("parses, expands, compresses, and classifies IPv6 exactly", () => {
  const analysis = tools.analyzeIPv6("2001:0db8:1234:5678:0000:0000:0000:0010/64");
  assert.equal(analysis.compressedAddress, "2001:db8:1234:5678::10");
  assert.equal(analysis.expandedAddress, "2001:0db8:1234:5678:0000:0000:0000:0010");
  assert.equal(analysis.networkPrefix, "2001:db8:1234:5678::/64");
  assert.equal(analysis.addressType, "Documentation");
  assert.equal(tools.analyzeIPv6("::/128").addressType, "Unspecified");
  assert.equal(tools.analyzeIPv6("::1/128").addressType, "Loopback");
  assert.equal(tools.analyzeIPv6("fe80::1/64").addressType, "Link-Local");
  assert.equal(tools.analyzeIPv6("fd00::1/64").addressType, "Unique Local");
  assert.equal(tools.analyzeIPv6("ff02::1/128").addressType, "Multicast");
  assert.equal(tools.analyzeIPv6("2001:4860::1/64").addressType, "Global Unicast");
  assert.throws(() => tools.analyzeIPv6("2001:::1/64"), /valid hexadecimal|eight hextets|hextet/);
});

test("plans IPv6 prefixes with exact BigInt counts", () => {
  const plan = tools.planIPv6Prefixes("2001:db8:1234::/48", "/64", 3);
  assert.equal(plan.subnetBits, 16);
  assert.equal(plan.subnetCount, 65536n);
  assert.deepEqual(plan.examples, ["2001:db8:1234::/64", "2001:db8:1234:1::/64", "2001:db8:1234:2::/64"]);
  assert.equal(tools.planIPv6Prefixes("2001:db8::1/128", "/128", 1).subnetCount, 1n);
  assert.throws(() => tools.planIPv6Prefixes("2001:db8::/64", "/48", 4), /equal to or longer/);
});

test("calculates Cisco-style OSPF integer costs across interface speeds", () => {
  assert.equal(tools.calculateOspfCost(100, 10, "Mbps").cost, 10);
  assert.equal(tools.calculateOspfCost(100, 100, "Mbps").cost, 1);
  assert.equal(tools.calculateOspfCost(100, 1, "Gbps").cost, 1);
  assert.equal(tools.calculateOspfCost(100000, 10, "Gbps").cost, 10);
  assert.equal(tools.calculateOspfCost(400000, 400, "Gbps").cost, 1);
  assert.equal(tools.calculateOspfCost(100, 33.3, "Mbps").cost, 3);
  assert.throws(() => tools.calculateOspfCost(100, 0, "Mbps"), /greater than zero/);
  assert.throws(() => tools.calculateOspfCost(100, -1, "Gbps"), /greater than zero/);
});

test("generates valid standard numbered and named ACL syntax", () => {
  const numbered = tools.generateCiscoAcl({ type: "standard", format: "numbered", identifier: "10", entries: [{ id: "1", action: "permit", protocol: "ip", source: { type: "network", ip: "192.168.10.0", wildcard: "0.0.0.255" }, destination: { type: "any" }, log: false }] });
  assert.equal(numbered.acl, "access-list 10 permit 192.168.10.0 0.0.0.255");
  const named = tools.generateCiscoAcl({ type: "standard", format: "named", identifier: "MANAGEMENT", entries: [{ id: "1", action: "permit", protocol: "ip", source: { type: "host", ip: "192.0.2.10" }, destination: { type: "any" }, sequence: 10 }] });
  assert.match(named.acl, /^ip access-list standard MANAGEMENT\n 10 permit host 192\.0\.2\.10$/);
});

test("generates ordered extended ACL syntax and rejects impossible combinations", () => {
  const result = tools.generateCiscoAcl({ type: "extended", format: "named", identifier: "WEB-IN", interfaceName: "GigabitEthernet0/1", direction: "in", entries: [
    { id: "1", action: "permit", protocol: "tcp", source: { type: "any" }, destination: { type: "host", ip: "10.10.20.10" }, destinationPort: "443", remark: "Allow HTTPS", sequence: 10 },
    { id: "2", action: "permit", protocol: "udp", source: { type: "any" }, destination: { type: "host", ip: "10.10.53.53" }, destinationPort: "53", sequence: 20 },
    { id: "3", action: "permit", protocol: "icmp", source: { type: "host", ip: "192.0.2.10" }, destination: { type: "any" }, sequence: 30 },
    { id: "4", action: "deny", protocol: "ip", source: { type: "any" }, destination: { type: "any" }, log: true, sequence: 40 },
  ] });
  assert.match(result.acl, /10 remark Allow HTTPS/);
  assert.match(result.acl, /10 permit tcp any host 10\.10\.20\.10 eq 443/);
  assert.match(result.acl, /20 permit udp any host 10\.10\.53\.53 eq 53/);
  assert.match(result.acl, /30 permit icmp host 192\.0\.2\.10 any/);
  assert.match(result.acl, /40 deny ip any any log/);
  assert.equal(result.application, "interface GigabitEthernet0/1\n ip access-group WEB-IN in");
  assert.match(result.implicitDeny, /implicit deny/);
  assert.throws(() => tools.generateCiscoAcl({ type: "extended", format: "numbered", identifier: "10", entries: [{ id: "1", action: "permit", protocol: "ip", source: { type: "any" }, destination: { type: "any" } }] }), /Extended ACL numbers/);
  assert.throws(() => tools.generateCiscoAcl({ type: "extended", format: "named", identifier: "BAD NAME", entries: [{ id: "1", action: "permit", protocol: "icmp", source: { type: "any" }, destination: { type: "any" }, destinationPort: "53" }] }), /Named ACLs/);
});

test("calculates the classic EIGRP metric with exact integer scaling", () => {
  const result = tools.calculateClassicEigrpMetric({ minimumBandwidthKbps: 100000, cumulativeDelayMicroseconds: 1000 });
  assert.equal(result.bandwidthComponent, 100n);
  assert.equal(result.delayComponent, 100n);
  assert.equal(result.metric, 51200n);
  const advanced = tools.calculateClassicEigrpMetric({ minimumBandwidthKbps: 10000, cumulativeDelayMicroseconds: 2000, load: 128, reliability: 255, kValues: { k1: 1, k2: 1, k3: 1, k4: 0, k5: 0 } });
  assert.equal(advanced.metric, 308992n);
  assert.throws(() => tools.calculateClassicEigrpMetric({ minimumBandwidthKbps: 0, cumulativeDelayMicroseconds: 10 }), /greater than zero/);
});

test("selects equal-cost EIGRP successors and applies the strict feasibility condition", () => {
  const analysis = tools.analyzeEigrpSuccessors("10.50.0.0/16", [
    { id: "r2", neighbor: "R2", reportedDistance: 28160n, totalMetric: 30720n },
    { id: "r3", neighbor: "R3", reportedDistance: 25600n, totalMetric: 33280n },
    { id: "r4", neighbor: "R4", reportedDistance: 35840n, totalMetric: 38400n },
    { id: "r5", neighbor: "R5", reportedDistance: 28000n, totalMetric: 30720n },
  ]);
  assert.equal(analysis.successorFd, 30720n);
  assert.equal(analysis.candidates.filter((item) => item.result === "SUCCESSOR").length, 2);
  assert.equal(analysis.candidates.find((item) => item.neighbor === "R3").result, "FEASIBLE SUCCESSOR");
  assert.equal(analysis.candidates.find((item) => item.neighbor === "R4").result, "NOT FEASIBLE");
  const strict = tools.analyzeEigrpSuccessors("10.60.0.0/16", [{ id: "a", neighbor: "A", reportedDistance: 90n, totalMetric: 100n }, { id: "b", neighbor: "B", reportedDistance: 100n, totalMetric: 120n }]);
  assert.equal(strict.candidates[1].conditionPassed, false);
});

test("keeps subnet and wildcard calculator regressions green", () => {
  assert.equal(tools.calculateSubnet("10.0.0.0/31").usableHosts, 2);
  assert.equal(tools.calculateSubnet("10.0.0.8/32").usableHosts, 1);
  assert.equal(tools.calculateWildcard("/28").wildcardMask, "0.0.0.15");
  assert.throws(() => tools.calculateWildcard("255.0.255.0"), /contiguous/);
});
