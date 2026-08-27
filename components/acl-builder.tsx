"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, ShieldCheck, Trash2 } from "lucide-react";

import { CopyControl, ResetControl, ToolError, ToolPanelLabel } from "@/components/tool-controls";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateCiscoAcl, type AclAddress, type AclDefinition, type AclEntry } from "@/lib/network-tools";

const address = (type: AclAddress["type"], ip = "", wildcard = ""): AclAddress => ({ type, ip, wildcard });
const initialEntries: AclEntry[] = [
  { id: "https", action: "permit", protocol: "tcp", source: address("any"), destination: address("host", "10.10.20.10"), destinationPort: "443", remark: "Allow HTTPS to web server", sequence: 10 },
  { id: "deny", action: "deny", protocol: "ip", source: address("any"), destination: address("any"), log: true, sequence: 20 },
];

function FieldSelect({ value, onChange, label, options }: { value: string; onChange: (value: string) => void; label: string; options: Array<[string, string]> }) {
  return <Select value={value} onValueChange={onChange}><SelectTrigger className="tool-select" aria-label={label}><SelectValue /></SelectTrigger><SelectContent>{options.map(([option, text]) => <SelectItem value={option} key={option}>{text}</SelectItem>)}</SelectContent></Select>;
}

function AddressFields({ label, value, onChange }: { label: string; value: AclAddress; onChange: (value: AclAddress) => void }) {
  return <fieldset className="acl-address-field"><legend>{label}</legend><FieldSelect label={`${label} match type`} value={value.type} onChange={(type) => onChange({ ...value, type: type as AclAddress["type"] })} options={[["any", "Any"], ["host", "Host"], ["network", "Network / wildcard"]]} />{value.type !== "any" ? <input aria-label={`${label} IPv4 address`} value={value.ip ?? ""} onChange={(event) => onChange({ ...value, ip: event.target.value })} placeholder={value.type === "host" ? "10.10.20.10" : "10.10.20.0"} spellCheck={false} /> : null}{value.type === "network" ? <input aria-label={`${label} wildcard mask`} value={value.wildcard ?? ""} onChange={(event) => onChange({ ...value, wildcard: event.target.value })} placeholder="0.0.0.255" spellCheck={false} /> : null}</fieldset>;
}

export function AclBuilder() {
  const [type, setType] = useState<AclDefinition["type"]>("extended");
  const [format, setFormat] = useState<AclDefinition["format"]>("named");
  const [identifier, setIdentifier] = useState("WEB-IN");
  const [entries, setEntries] = useState<AclEntry[]>(initialEntries);
  const [interfaceName, setInterfaceName] = useState("GigabitEthernet0/1");
  const [direction, setDirection] = useState<"in" | "out">("in");
  const [revision, setRevision] = useState(0);

  const definition = useMemo<AclDefinition>(() => ({ type, format, identifier, entries, interfaceName, direction }), [type, format, identifier, entries, interfaceName, direction]);
  const state = useMemo(() => {
    void revision;
    try { return { result: generateCiscoAcl(definition), error: "" }; }
    catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to generate this ACL." }; }
  // revision intentionally gives keyboard users an explicit refresh point while edits still preview immediately.
  }, [definition, revision]);

  const updateEntry = (id: string, patch: Partial<AclEntry>) => setEntries((current) => current.map((entry) => entry.id === id ? { ...entry, ...patch } : entry));
  const addEntry = () => setEntries((current) => [...current, { id: `ace-${Date.now()}`, action: "permit", protocol: type === "standard" ? "ip" : "tcp", source: address("any"), destination: address("any"), sequence: format === "named" ? ((current.at(-1)?.sequence ?? current.length * 10) + 10) : undefined }]);
  const removeEntry = (id: string) => setEntries((current) => current.length > 1 ? current.filter((entry) => entry.id !== id) : current);
  const move = (index: number, delta: -1 | 1) => setEntries((current) => {
    const target = index + delta;
    if (target < 0 || target >= current.length) return current;
    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });
  const changeType = (next: string) => {
    const aclType = next as AclDefinition["type"];
    setType(aclType);
    if (format === "numbered") setIdentifier(aclType === "standard" ? "10" : "100");
  };
  const changeFormat = (next: string) => {
    const aclFormat = next as AclDefinition["format"];
    setFormat(aclFormat);
    setIdentifier(aclFormat === "named" ? (type === "standard" ? "MANAGEMENT" : "WEB-IN") : (type === "standard" ? "10" : "100"));
  };
  const reset = () => { setType("extended"); setFormat("named"); setIdentifier("WEB-IN"); setEntries(initialEntries); setInterfaceName("GigabitEthernet0/1"); setDirection("in"); setRevision((value) => value + 1); };
  const fullOutput = state.result ? `${state.result.acl}${state.result.application ? `\n!\n${state.result.application}` : ""}` : "";

  return <div className="engineering-tool-stack">
    <Tabs value={type} onValueChange={changeType} className="engineering-tabs"><TabsList variant="line" aria-label="ACL type"><TabsTrigger value="standard">Standard ACL</TabsTrigger><TabsTrigger value="extended">Extended ACL</TabsTrigger></TabsList></Tabs>
    <div className="acl-builder-layout">
      <section className="acl-control-panel">
        <ToolPanelLabel label="INPUT / ACL DEFINITION" />
        <div className="tool-field-pair"><label><span>Format</span><FieldSelect value={format} onChange={changeFormat} label="ACL format" options={[["named", "Named ACL"], ["numbered", "Numbered ACL"]]} /></label><label><span>{format === "named" ? "ACL name" : "ACL number"}</span><input value={identifier} onChange={(event) => setIdentifier(event.target.value)} spellCheck={false} /></label></div>
        <div className="acl-rule-stack">{entries.map((entry, index) => {
          const supportsPorts = type === "extended" && (entry.protocol === "tcp" || entry.protocol === "udp");
          return <article className="acl-rule-editor" key={entry.id}>
            <div className="acl-rule-heading"><span>ACE {String(index + 1).padStart(2, "0")}</span><div><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ACE ${index + 1} up`}><ArrowUp aria-hidden="true" /></button><button type="button" onClick={() => move(index, 1)} disabled={index === entries.length - 1} aria-label={`Move ACE ${index + 1} down`}><ArrowDown aria-hidden="true" /></button><button type="button" onClick={() => removeEntry(entry.id)} disabled={entries.length === 1} aria-label={`Remove ACE ${index + 1}`}><Trash2 aria-hidden="true" /></button></div></div>
            <div className="acl-rule-core"><FieldSelect value={entry.action} onChange={(action) => updateEntry(entry.id, { action: action as AclEntry["action"] })} label={`ACE ${index + 1} action`} options={[["permit", "Permit"], ["deny", "Deny"]]} />{type === "extended" ? <FieldSelect value={entry.protocol} onChange={(protocol) => updateEntry(entry.id, { protocol: protocol as AclEntry["protocol"], sourcePort: undefined, destinationPort: undefined, established: false })} label={`ACE ${index + 1} protocol`} options={["ip", "tcp", "udp", "icmp", "gre", "ospf"].map((item) => [item, item.toUpperCase()])} /> : null}{format === "named" ? <label><span>Sequence</span><input value={entry.sequence ?? ""} onChange={(event) => updateEntry(entry.id, { sequence: event.target.value ? Number(event.target.value) : undefined })} inputMode="numeric" /></label> : null}</div>
            <AddressFields label="Source" value={entry.source} onChange={(source) => updateEntry(entry.id, { source })} />
            {type === "extended" ? <AddressFields label="Destination" value={entry.destination} onChange={(destination) => updateEntry(entry.id, { destination })} /> : null}
            {supportsPorts ? <div className="tool-field-pair"><label><span>Source port · optional</span><input list="acl-common-ports" value={entry.sourcePort ?? ""} onChange={(event) => updateEntry(entry.id, { sourcePort: event.target.value })} placeholder="any" /></label><label><span>Destination port · optional</span><input list="acl-common-ports" value={entry.destinationPort ?? ""} onChange={(event) => updateEntry(entry.id, { destinationPort: event.target.value })} placeholder="443" /></label></div> : null}
            <label><span>Remark · optional</span><input value={entry.remark ?? ""} onChange={(event) => updateEntry(entry.id, { remark: event.target.value })} placeholder="Describe the traffic intent" /></label>
            <div className="acl-flags"><label><Checkbox checked={Boolean(entry.log)} onCheckedChange={(checked) => updateEntry(entry.id, { log: checked === true })} /><span>Log matches</span></label>{entry.protocol === "tcp" && type === "extended" ? <label><Checkbox checked={Boolean(entry.established)} onCheckedChange={(checked) => updateEntry(entry.id, { established: checked === true })} /><span>Established</span></label> : null}</div>
          </article>;
        })}</div>
        <datalist id="acl-common-ports"><option value="22">SSH</option><option value="53">DNS</option><option value="80">HTTP</option><option value="443">HTTPS</option><option value="161">SNMP</option><option value="123">NTP</option><option value="179">BGP</option><option value="3389">RDP</option></datalist>
        <button className="np-button np-button-secondary" type="button" onClick={addEntry}><Plus aria-hidden="true" />Add ACE</button>
      </section>
      <aside className="acl-output-panel" aria-live="polite">
        <ToolPanelLabel label="OUTPUT / IOS CONFIGURATION" state={state.error ? "INVALID" : "GENERATED"} invalid={Boolean(state.error)} />
        {state.error ? <ToolError message={state.error} /> : state.result && <><pre><code>{state.result.acl}</code></pre><CopyControl value={state.result.acl} label="ACL configuration" />
          <div className="acl-application"><span>INTERFACE APPLICATION · OPTIONAL</span><div className="tool-field-pair"><label><span>Interface</span><input value={interfaceName} onChange={(event) => setInterfaceName(event.target.value)} placeholder="GigabitEthernet0/1" /></label><label><span>Direction</span><FieldSelect value={direction} onChange={(value) => setDirection(value as "in" | "out")} label="ACL direction" options={[["in", "Inbound"], ["out", "Outbound"]]} /></label></div>{state.result.application ? <pre><code>{state.result.application}</code></pre> : null}</div>
          <div className="tool-actions"><button className="np-button np-button-primary" type="button" onClick={() => setRevision((value) => value + 1)}><ShieldCheck aria-hidden="true" />Validate ACL</button><CopyControl value={fullOutput} label="ACL and interface configuration" /><ResetControl onReset={reset} /></div>
        </>}
        <div className="acl-safety-notes"><span>PACKET EVALUATION</span><ol><li><b>ACE 10</b><i />First matching rule wins</li><li><b>NEXT ACE</b><i />Only evaluated on no match</li><li><b>IMPLICIT DENY</b><i />Drops unmatched traffic</li></ol><p>Standard ACLs match source only. Extended ACLs add protocol, destination, and ports. Interface placement and direction must follow the actual traffic path.</p></div>
      </aside>
    </div>
  </div>;
}
