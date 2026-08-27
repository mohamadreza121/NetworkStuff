export type SubnetResult = {
  inputAddress: string;
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  prefix: number;
  firstUsable: string;
  lastUsable: string;
  usableHosts: number;
  totalAddresses: number;
  binaryMask: string;
};

export function parseIPv4(value: string): number {
  const parts = value.trim().split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) {
    throw new Error("Enter a valid IPv4 address with four decimal octets.");
  }
  const octets = parts.map(Number);
  if (octets.some((octet) => octet < 0 || octet > 255)) {
    throw new Error("Each IPv4 octet must be between 0 and 255.");
  }
  return octets.reduce((value, octet) => ((value << 8) | octet) >>> 0, 0);
}

export function formatIPv4(value: number): string {
  const normalized = value >>> 0;
  return [24, 16, 8, 0].map((shift) => (normalized >>> shift) & 255).join(".");
}

export function parsePrefix(value: string): number {
  const normalized = value.trim().replace(/^\//, "");
  if (!/^\d{1,2}$/.test(normalized)) throw new Error("Prefix must be a number from /0 to /32.");
  const prefix = Number(normalized);
  if (prefix < 0 || prefix > 32) throw new Error("Prefix must be between /0 and /32.");
  return prefix;
}

export function prefixToMask(prefix: number): number {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error("Prefix must be between /0 and /32.");
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
}

export function calculateSubnet(addressInput: string, prefixInput?: string): SubnetResult {
  const raw = addressInput.trim();
  if (!raw) throw new Error("Enter an IPv4 address and prefix.");
  const slashParts = raw.split("/");
  if (slashParts.length > 2) throw new Error("Use one CIDR prefix, for example 192.168.10.25/27.");
  const address = slashParts[0];
  const prefixText = slashParts[1] ?? prefixInput;
  if (prefixText === undefined || prefixText.trim() === "") throw new Error("Add a CIDR prefix such as /24.");

  const ip = parseIPv4(address);
  const prefix = parsePrefix(prefixText);
  const mask = prefixToMask(prefix);
  const wildcard = (~mask) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix >= 31 ? totalAddresses : Math.max(totalAddresses - 2, 0);
  const firstUsable = prefix >= 31 ? network : (network + 1) >>> 0;
  const lastUsable = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;

  return {
    inputAddress: formatIPv4(ip),
    networkAddress: formatIPv4(network),
    broadcastAddress: formatIPv4(broadcast),
    subnetMask: formatIPv4(mask),
    wildcardMask: formatIPv4(wildcard),
    prefix,
    firstUsable: formatIPv4(firstUsable),
    lastUsable: formatIPv4(lastUsable),
    usableHosts,
    totalAddresses,
    binaryMask: [24, 16, 8, 0].map((shift) => ((mask >>> shift) & 255).toString(2).padStart(8, "0")).join("."),
  };
}

export function calculateWildcard(input: string): { subnetMask: string; wildcardMask: string; prefix: number } {
  const raw = input.trim();
  if (!raw) throw new Error("Enter a subnet mask or CIDR prefix.");

  if (/^\/?\d{1,2}$/.test(raw)) {
    const prefix = parsePrefix(raw);
    const mask = prefixToMask(prefix);
    return { subnetMask: formatIPv4(mask), wildcardMask: formatIPv4((~mask) >>> 0), prefix };
  }

  const mask = parseIPv4(raw);
  const inverted = (~mask) >>> 0;
  if (((inverted + 1) & inverted) !== 0) {
    throw new Error("Subnet mask bits must be contiguous, for example 255.255.255.0.");
  }
  const prefix = mask === 0 ? 0 : 32 - Math.log2(inverted + 1);
  if (!Number.isInteger(prefix)) throw new Error("Subnet mask bits must be contiguous.");
  return { subnetMask: formatIPv4(mask), wildcardMask: formatIPv4(inverted), prefix };
}

export type VlsmRequirement = {
  name: string;
  hosts: number;
  pointToPoint?: boolean;
};

export type VlsmAllocation = {
  name: string;
  hostsRequired: number;
  network: string;
  prefix: number;
  subnetMask: string;
  firstHost: string;
  lastHost: string;
  broadcast: string;
  capacity: number;
  totalAddresses: number;
  pointToPoint: boolean;
};

export type VlsmPlan = {
  parentNetwork: string;
  totalAddresses: number;
  allocatedAddresses: number;
  remainingAddresses: number;
  utilization: number;
  remainingRange: string;
  allocations: VlsmAllocation[];
};

function smallestPrefixForHosts(hosts: number, pointToPoint: boolean): number {
  if (!Number.isSafeInteger(hosts) || hosts <= 0) {
    throw new Error("Host requirements must be positive whole numbers.");
  }
  if (pointToPoint) {
    if (hosts > 2) throw new Error("A /31 point-to-point allocation can contain at most two endpoints.");
    return 31;
  }
  const requiredAddresses = hosts + 2;
  const hostBits = Math.ceil(Math.log2(requiredAddresses));
  const prefix = 32 - hostBits;
  if (prefix < 0) throw new Error("Host requirement exceeds the IPv4 address space.");
  return Math.min(prefix, 30);
}

export function planVlsm(parentInput: string, requirements: VlsmRequirement[]): VlsmPlan {
  const raw = parentInput.trim();
  const parts = raw.split("/");
  if (parts.length !== 2) throw new Error("Enter the parent as a network in CIDR notation, for example 10.10.0.0/16.");
  const parent = calculateSubnet(parts[0], parts[1]);
  if (parent.inputAddress !== parent.networkAddress) {
    throw new Error(`Parent must be the network boundary ${parent.networkAddress}/${parent.prefix}.`);
  }
  if (!requirements.length) throw new Error("Add at least one subnet requirement.");

  const normalized = requirements.map((requirement, index) => {
    const name = requirement.name.trim() || `Subnet ${index + 1}`;
    const prefix = smallestPrefixForHosts(requirement.hosts, Boolean(requirement.pointToPoint));
    return {
      ...requirement,
      name,
      prefix,
      totalAddresses: 2 ** (32 - prefix),
      originalIndex: index,
    };
  });
  const labels = normalized.map((item) => item.name.toLowerCase());
  if (new Set(labels).size !== labels.length) {
    throw new Error("Subnet labels must be unique so exported plans remain unambiguous.");
  }

  normalized.sort((a, b) => b.totalAddresses - a.totalAddresses || a.originalIndex - b.originalIndex);
  const parentStart = parseIPv4(parent.networkAddress);
  const parentEnd = parseIPv4(parent.broadcastAddress);
  let cursor = parentStart;
  const allocations: VlsmAllocation[] = [];

  for (const requirement of normalized) {
    const block = requirement.totalAddresses;
    const alignedStart = Math.ceil(cursor / block) * block;
    const end = alignedStart + block - 1;
    if (alignedStart > 0xffffffff || end > parentEnd) {
      throw new Error(`Insufficient space: ${requirement.name} needs a /${requirement.prefix} block (${block.toLocaleString("en-US")} addresses).`);
    }
    const subnet = calculateSubnet(formatIPv4(alignedStart), `/${requirement.prefix}`);
    allocations.push({
      name: requirement.name,
      hostsRequired: requirement.hosts,
      network: subnet.networkAddress,
      prefix: requirement.prefix,
      subnetMask: subnet.subnetMask,
      firstHost: subnet.firstUsable,
      lastHost: subnet.lastUsable,
      broadcast: subnet.broadcastAddress,
      capacity: requirement.pointToPoint ? 2 : subnet.usableHosts,
      totalAddresses: block,
      pointToPoint: Boolean(requirement.pointToPoint),
    });
    cursor = end + 1;
  }

  const allocatedAddresses = allocations.reduce((sum, item) => sum + item.totalAddresses, 0);
  const remainingAddresses = parent.totalAddresses - allocatedAddresses;
  return {
    parentNetwork: `${parent.networkAddress}/${parent.prefix}`,
    totalAddresses: parent.totalAddresses,
    allocatedAddresses,
    remainingAddresses,
    utilization: (allocatedAddresses / parent.totalAddresses) * 100,
    remainingRange: remainingAddresses > 0 ? `${formatIPv4(cursor)} – ${formatIPv4(parentEnd)}` : "Fully allocated",
    allocations,
  };
}

const IPV6_MAX = (1n << 128n) - 1n;

export function parseIPv6(value: string): bigint {
  const raw = value.trim().toLowerCase();
  if (!raw) throw new Error("Enter an IPv6 address.");
  if (raw.includes(".")) throw new Error("Embedded IPv4 notation is not supported in this helper.");
  if (!/^[0-9a-f:]+$/.test(raw) || raw.split("::").length > 2) {
    throw new Error("Enter a valid hexadecimal IPv6 address.");
  }

  const hasCompression = raw.includes("::");
  const [leftText, rightText = ""] = raw.split("::");
  const left = leftText ? leftText.split(":") : [];
  const right = rightText ? rightText.split(":") : [];
  const validHextet = (part: string) => /^[0-9a-f]{1,4}$/.test(part);
  if (![...left, ...right].every(validHextet)) throw new Error("Each IPv6 hextet must contain one to four hexadecimal digits.");
  if ((!hasCompression && left.length !== 8) || (hasCompression && left.length + right.length >= 8)) {
    throw new Error("An IPv6 address must expand to exactly eight hextets.");
  }
  const groups = hasCompression
    ? [...left, ...Array(8 - left.length - right.length).fill("0"), ...right]
    : left;
  return groups.reduce((result, part) => (result << 16n) | BigInt(`0x${part}`), 0n);
}

export function expandIPv6(value: bigint): string {
  if (value < 0n || value > IPV6_MAX) throw new Error("IPv6 value must fit in 128 bits.");
  return Array.from({ length: 8 }, (_, index) => {
    const shift = BigInt((7 - index) * 16);
    return Number((value >> shift) & 0xffffn).toString(16).padStart(4, "0");
  }).join(":");
}

export function compressIPv6(value: bigint): string {
  const groups = expandIPv6(value).split(":").map((part) => part.replace(/^0+/, "") || "0");
  let bestStart = -1;
  let bestLength = 0;
  for (let index = 0; index < groups.length; ) {
    if (groups[index] !== "0") { index += 1; continue; }
    let end = index;
    while (end < groups.length && groups[end] === "0") end += 1;
    const length = end - index;
    if (length > bestLength && length >= 2) {
      bestStart = index;
      bestLength = length;
    }
    index = end;
  }
  if (bestStart < 0) return groups.join(":");
  const left = groups.slice(0, bestStart).join(":");
  const right = groups.slice(bestStart + bestLength).join(":");
  return `${left}::${right}`;
}

function parseIPv6Prefix(value: string): number {
  if (!/^\d{1,3}$/.test(value.trim())) throw new Error("IPv6 prefix must be a whole number from /0 to /128.");
  const prefix = Number(value);
  if (prefix < 0 || prefix > 128) throw new Error("IPv6 prefix must be between /0 and /128.");
  return prefix;
}

function ipv6Mask(prefix: number): bigint {
  if (prefix === 0) return 0n;
  return (IPV6_MAX << BigInt(128 - prefix)) & IPV6_MAX;
}

export function classifyIPv6(value: bigint): string {
  if (value === 0n) return "Unspecified";
  if (value === 1n) return "Loopback";
  if ((value >> 96n) === 0x20010db8n) return "Documentation";
  if ((value >> 118n) === 0b1111111010n) return "Link-Local";
  if ((value >> 121n) === 0b1111110n) return "Unique Local";
  if ((value >> 120n) === 0xffn) return "Multicast";
  if ((value >> 125n) === 0b001n) return "Global Unicast";
  return "Special / Other";
}

export type IPv6Analysis = {
  originalAddress: string;
  compressedAddress: string;
  expandedAddress: string;
  prefix: number;
  networkPrefix: string;
  interfaceIdentifier: string;
  addressType: string;
  hextets: Array<{ hex: string; binary: string; role: "network" | "interface" | "mixed" }>;
};

export function analyzeIPv6(input: string): IPv6Analysis {
  const raw = input.trim();
  const parts = raw.split("/");
  if (parts.length > 2) throw new Error("Use one IPv6 prefix, for example 2001:db8::10/64.");
  const value = parseIPv6(parts[0]);
  const prefix = parts[1] === undefined ? 128 : parseIPv6Prefix(parts[1]);
  const mask = ipv6Mask(prefix);
  const network = value & mask;
  const host = value & (IPV6_MAX ^ mask);
  const expanded = expandIPv6(value);
  return {
    originalAddress: raw,
    compressedAddress: compressIPv6(value),
    expandedAddress: expanded,
    prefix,
    networkPrefix: `${compressIPv6(network)}/${prefix}`,
    interfaceIdentifier: `0x${host.toString(16)}`,
    addressType: classifyIPv6(value),
    hextets: expanded.split(":").map((hex, index) => {
      const start = index * 16;
      const end = start + 16;
      const role = end <= prefix ? "network" : start >= prefix ? "interface" : "mixed";
      return { hex, binary: Number.parseInt(hex, 16).toString(2).padStart(16, "0"), role };
    }),
  };
}

export type IPv6PrefixPlan = {
  parentPrefix: string;
  targetPrefix: number;
  subnetBits: number;
  subnetCount: bigint;
  examples: string[];
};

export function planIPv6Prefixes(parentInput: string, targetInput: string | number, exampleCount = 8): IPv6PrefixPlan {
  const parts = parentInput.trim().split("/");
  if (parts.length !== 2) throw new Error("Enter an IPv6 parent prefix such as 2001:db8:1234::/48.");
  const value = parseIPv6(parts[0]);
  const parentPrefix = parseIPv6Prefix(parts[1]);
  const targetPrefix = parseIPv6Prefix(String(targetInput).replace(/^\//, ""));
  if (targetPrefix < parentPrefix) throw new Error("Target prefix must be equal to or longer than the parent prefix.");
  const parentNetwork = value & ipv6Mask(parentPrefix);
  if (value !== parentNetwork) throw new Error(`Parent must be the prefix boundary ${compressIPv6(parentNetwork)}/${parentPrefix}.`);
  if (!Number.isSafeInteger(exampleCount) || exampleCount < 1 || exampleCount > 32) throw new Error("Generate between 1 and 32 example prefixes.");
  const subnetBits = targetPrefix - parentPrefix;
  const subnetCount = 1n << BigInt(subnetBits);
  const block = 1n << BigInt(128 - targetPrefix);
  const count = Number(subnetCount < BigInt(exampleCount) ? subnetCount : BigInt(exampleCount));
  const examples = Array.from({ length: count }, (_, index) => `${compressIPv6(parentNetwork + BigInt(index) * block)}/${targetPrefix}`);
  return { parentPrefix: `${compressIPv6(parentNetwork)}/${parentPrefix}`, targetPrefix, subnetBits, subnetCount, examples };
}

export type BandwidthUnit = "Kbps" | "Mbps" | "Gbps";

export function bandwidthToMbps(value: number, unit: BandwidthUnit): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error("Bandwidth must be greater than zero.");
  if (unit === "Kbps") return value / 1000;
  if (unit === "Gbps") return value * 1000;
  return value;
}

export function calculateOspfCost(referenceMbps: number, bandwidth: number, unit: BandwidthUnit = "Mbps") {
  if (!Number.isFinite(referenceMbps) || referenceMbps <= 0) throw new Error("Reference bandwidth must be greater than zero Mbps.");
  const interfaceMbps = bandwidthToMbps(bandwidth, unit);
  const rawCost = referenceMbps / interfaceMbps;
  const calculated = Math.max(1, Math.floor(rawCost));
  const cost = Math.min(65535, calculated);
  return { referenceMbps, interfaceMbps, rawCost, cost, capped: calculated > 65535 };
}

export type AclAddress = { type: "any" | "host" | "network"; ip?: string; wildcard?: string };
export type AclEntry = {
  id: string;
  action: "permit" | "deny";
  protocol: "ip" | "tcp" | "udp" | "icmp" | "gre" | "ospf";
  source: AclAddress;
  destination: AclAddress;
  sourcePort?: string;
  destinationPort?: string;
  established?: boolean;
  log?: boolean;
  remark?: string;
  sequence?: number;
};
export type AclDefinition = {
  type: "standard" | "extended";
  format: "named" | "numbered";
  identifier: string;
  entries: AclEntry[];
  interfaceName?: string;
  direction?: "in" | "out";
};

function validateWildcardAddress(value: string): void {
  parseIPv4(value);
}

function renderAclAddress(address: AclAddress): string {
  if (address.type === "any") return "any";
  if (!address.ip) throw new Error("Host and network matches require an IPv4 address.");
  parseIPv4(address.ip);
  if (address.type === "host") return `host ${address.ip}`;
  if (!address.wildcard) throw new Error("Network matches require a wildcard mask.");
  validateWildcardAddress(address.wildcard);
  return `${address.ip} ${address.wildcard}`;
}

function validateAclIdentifier(definition: AclDefinition): void {
  const id = definition.identifier.trim();
  if (definition.format === "named") {
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(id)) throw new Error("Named ACLs must begin with a letter and use only letters, numbers, underscores, or hyphens.");
    return;
  }
  if (!/^\d{1,4}$/.test(id)) throw new Error("Enter a valid numbered ACL identifier.");
  const value = Number(id);
  const valid = definition.type === "standard"
    ? (value >= 1 && value <= 99) || (value >= 1300 && value <= 1999)
    : (value >= 100 && value <= 199) || (value >= 2000 && value <= 2699);
  if (!valid) throw new Error(definition.type === "standard" ? "Standard ACL numbers are 1–99 or 1300–1999." : "Extended ACL numbers are 100–199 or 2000–2699.");
}

function validatePort(port: string | undefined): string {
  if (!port) return "";
  const normalized = port.trim().toLowerCase();
  const named = new Set(["ssh", "domain", "www", "https", "snmp", "ntp", "bgp", "ms-wbt-server"]);
  if (/^\d+$/.test(normalized)) {
    const value = Number(normalized);
    if (value < 1 || value > 65535) throw new Error("TCP and UDP ports must be between 1 and 65535.");
    return normalized;
  }
  if (!named.has(normalized)) throw new Error("Use a port from 1–65535 or a supported IOS service name.");
  return normalized;
}

export function generateCiscoAcl(definition: AclDefinition): { acl: string; application: string; implicitDeny: string } {
  validateAclIdentifier(definition);
  if (!definition.entries.length) throw new Error("Add at least one access control entry.");
  const named = definition.format === "named";
  const lines: string[] = named ? [`ip access-list ${definition.type} ${definition.identifier.trim()}`] : [];

  for (const entry of definition.entries) {
    const prefix = named ? ` ${entry.sequence ? `${entry.sequence} ` : " "}` : `access-list ${definition.identifier.trim()} `;
    if (entry.remark?.trim()) lines.push(`${prefix}remark ${entry.remark.trim()}`);
    const source = renderAclAddress(entry.source);
    if (definition.type === "standard") {
      lines.push(`${prefix}${entry.action} ${source}${entry.log ? " log" : ""}`);
      continue;
    }
    const protocol = entry.protocol;
    const destination = renderAclAddress(entry.destination);
    const supportsPorts = protocol === "tcp" || protocol === "udp";
    if (!supportsPorts && (entry.sourcePort || entry.destinationPort)) throw new Error(`${protocol.toUpperCase()} ACEs cannot include TCP/UDP port operators.`);
    if (entry.established && protocol !== "tcp") throw new Error("The established keyword is valid only for TCP ACEs.");
    const sourcePort = supportsPorts ? validatePort(entry.sourcePort) : "";
    const destinationPort = supportsPorts ? validatePort(entry.destinationPort) : "";
    lines.push(`${prefix}${entry.action} ${protocol} ${source}${sourcePort ? ` eq ${sourcePort}` : ""} ${destination}${destinationPort ? ` eq ${destinationPort}` : ""}${entry.established ? " established" : ""}${entry.log ? " log" : ""}`);
  }
  const interfaceName = definition.interfaceName?.trim();
  const application = interfaceName
    ? `interface ${interfaceName}\n ip access-group ${definition.identifier.trim()} ${definition.direction ?? "in"}`
    : "";
  return { acl: lines.join("\n"), application, implicitDeny: "Every IPv4 ACL ends with an implicit deny ip any any when no earlier ACE matches." };
}

export type EigrpKValues = { k1: number; k2: number; k3: number; k4: number; k5: number };
export type EigrpMetricInput = {
  minimumBandwidthKbps: number;
  cumulativeDelayMicroseconds: number;
  reliability?: number;
  load?: number;
  mtu?: number;
  hopCount?: number;
  kValues?: EigrpKValues;
};

export function calculateClassicEigrpMetric(input: EigrpMetricInput) {
  const values = [input.minimumBandwidthKbps, input.cumulativeDelayMicroseconds, input.reliability ?? 255, input.load ?? 1, input.mtu ?? 1500, input.hopCount ?? 1];
  if (values.some((value) => !Number.isSafeInteger(value))) throw new Error("EIGRP inputs must be safe whole numbers.");
  if (input.minimumBandwidthKbps <= 0) throw new Error("Minimum bandwidth must be greater than zero Kbps.");
  if (input.cumulativeDelayMicroseconds < 0) throw new Error("Cumulative delay cannot be negative.");
  const reliability = input.reliability ?? 255;
  const load = input.load ?? 1;
  if (reliability < 0 || reliability > 255) throw new Error("Reliability must be between 0 and 255.");
  if (load < 0 || load > 255) throw new Error("Load must be between 0 and 255.");
  const k = input.kValues ?? { k1: 1, k2: 0, k3: 1, k4: 0, k5: 0 };
  if (Object.values(k).some((value) => !Number.isInteger(value) || value < 0 || value > 255)) throw new Error("K-values must be whole numbers from 0 to 255.");

  const bandwidthComponent = 10_000_000n / BigInt(input.minimumBandwidthKbps);
  const delayComponent = BigInt(input.cumulativeDelayMicroseconds) / 10n;
  const loadDenominator = 256n - BigInt(load);
  const base = BigInt(k.k1) * bandwidthComponent
    + (BigInt(k.k2) * bandwidthComponent) / loadDenominator
    + BigInt(k.k3) * delayComponent;
  const metric = k.k5 === 0
    ? base * 256n
    : (base * BigInt(k.k5) * 256n) / (BigInt(reliability) + BigInt(k.k4));
  return {
    minimumBandwidthKbps: input.minimumBandwidthKbps,
    rawDelayMicroseconds: input.cumulativeDelayMicroseconds,
    bandwidthComponent,
    delayComponent,
    kValues: k,
    reliability,
    load,
    mtu: input.mtu ?? 1500,
    hopCount: input.hopCount ?? 1,
    metric,
  };
}

export type EigrpCandidate = { id: string; neighbor: string; reportedDistance: bigint; totalMetric: bigint };

export function analyzeEigrpSuccessors(destination: string, candidates: EigrpCandidate[]) {
  if (!destination.trim()) throw new Error("Enter a destination prefix.");
  if (candidates.length < 2) throw new Error("Add at least two route candidates.");
  for (const candidate of candidates) {
    if (!candidate.neighbor.trim()) throw new Error("Every candidate needs a neighbor name.");
    if (candidate.reportedDistance < 0n || candidate.totalMetric <= 0n) throw new Error("Route metrics must be positive values.");
    if (candidate.totalMetric < candidate.reportedDistance) throw new Error(`${candidate.neighbor} has a total metric lower than its reported distance.`);
  }
  const successorFd = candidates.reduce((best, item) => item.totalMetric < best ? item.totalMetric : best, candidates[0].totalMetric);
  return {
    destination: destination.trim(),
    successorFd,
    candidates: candidates.map((candidate) => ({
      ...candidate,
      conditionPassed: candidate.reportedDistance < successorFd,
      result: candidate.totalMetric === successorFd ? "SUCCESSOR" as const : candidate.reportedDistance < successorFd ? "FEASIBLE SUCCESSOR" as const : "NOT FEASIBLE" as const,
    })),
  };
}
