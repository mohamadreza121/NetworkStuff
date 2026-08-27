"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Play } from "lucide-react";

import { calculateSubnet } from "@/lib/network-tools";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  return <button type="button" onClick={copy} aria-label={`Copy ${label}`}><span>{copied ? "COPIED" : "COPY"}</span>{copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}</button>;
}

export function SubnetCalculator() {
  const [address, setAddress] = useState("192.168.10.25");
  const [prefix, setPrefix] = useState("/27");
  const [submitted, setSubmitted] = useState({ address, prefix });
  const state = useMemo(() => { try { return { result: calculateSubnet(submitted.address, submitted.prefix), error: "" }; } catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to calculate this subnet." }; } }, [submitted]);
  const calculate = (event: React.FormEvent) => { event.preventDefault(); setSubmitted({ address, prefix }); };
  const rows = state.result ? [
    ["Network Address", state.result.networkAddress], ["Broadcast Address", state.result.broadcastAddress], ["Subnet Mask", state.result.subnetMask], ["Wildcard Mask", state.result.wildcardMask], ["Prefix", `/${state.result.prefix}`], ["First Usable", state.result.firstUsable], ["Last Usable", state.result.lastUsable], ["Usable Hosts", state.result.usableHosts.toLocaleString("en-US")], ["Total Addresses", state.result.totalAddresses.toLocaleString("en-US")], ["Binary Mask", state.result.binaryMask],
  ] : [];
  return <div className="tool-workbench"><form onSubmit={calculate} noValidate><div className="tool-panel-label"><span>INPUT / IPV4</span><i className="status-dot" />READY</div><label><span>IPv4 address</span><input value={address} onChange={(event) => setAddress(event.target.value)} spellCheck={false} inputMode="decimal" placeholder="192.168.10.25" /></label><label><span>CIDR prefix</span><input value={prefix} onChange={(event) => setPrefix(event.target.value)} spellCheck={false} inputMode="numeric" placeholder="/27" /></label><p>You may also enter CIDR directly in the address field, for example <code>10.20.30.40/24</code>.</p><button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Calculate subnet</button></form><section className="tool-output" aria-live="polite"><div className="tool-panel-label"><span>OUTPUT / DERIVED STATE</span><i className={state.error ? "status-dot red" : "status-dot"} />{state.error ? "INVALID" : "CALCULATED"}</div>{state.error ? <div className="tool-error"><strong>INPUT REJECTED</strong><p>{state.error}</p></div> : <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd><code>{value}</code><CopyButton value={value} label={label} /></dd></div>)}</dl>}</section></div>;
}
