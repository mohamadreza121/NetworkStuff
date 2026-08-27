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

function parseIPv4(value: string): number {
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

function formatIPv4(value: number): string {
  const normalized = value >>> 0;
  return [24, 16, 8, 0].map((shift) => (normalized >>> shift) & 255).join(".");
}

function parsePrefix(value: string): number {
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
