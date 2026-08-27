"use client";

import { useMemo, useState } from "react";
import { Plus, Play, Trash2 } from "lucide-react";

import { CopyControl, ResetControl, ToolError, ToolPanelLabel } from "@/components/tool-controls";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bandwidthToMbps, calculateOspfCost, type BandwidthUnit } from "@/lib/network-tools";

type InterfaceRow = { id: string; name: string; bandwidth: string; unit: BandwidthUnit };

const defaults: InterfaceRow[] = [
  { id: "gi", name: "Gi0/0", bandwidth: "1", unit: "Gbps" },
  { id: "te", name: "Te1/0/1", bandwidth: "10", unit: "Gbps" },
  { id: "eth", name: "Eth1/1", bandwidth: "100", unit: "Gbps" },
];

export function OspfCostCalculator() {
  const [referenceChoice, setReferenceChoice] = useState("100000");
  const [customReference, setCustomReference] = useState("100000");
  const [rows, setRows] = useState<InterfaceRow[]>(defaults);
  const [submitted, setSubmitted] = useState({ referenceChoice, customReference, rows });

  const state = useMemo(() => {
    try {
      const referenceMbps = Number(submitted.referenceChoice === "custom" ? submitted.customReference : submitted.referenceChoice);
      const results = submitted.rows.map((row) => ({
        ...row,
        ...calculateOspfCost(referenceMbps, Number(row.bandwidth), row.unit),
      }));
      return { referenceMbps, results, error: "" };
    } catch (error) {
      return { referenceMbps: 0, results: [], error: error instanceof Error ? error.message : "Unable to calculate OSPF cost." };
    }
  }, [submitted]);

  const update = (id: string, patch: Partial<InterfaceRow>) => setRows((current) => current.map((row) => row.id === id ? { ...row, ...patch } : row));
  const add = () => setRows((current) => [...current, { id: `if-${Date.now()}`, name: `Interface ${current.length + 1}`, bandwidth: "100", unit: "Mbps" }]);
  const remove = (id: string) => setRows((current) => current.length > 1 ? current.filter((row) => row.id !== id) : current);
  const reset = () => { setReferenceChoice("100000"); setCustomReference("100000"); setRows(defaults); setSubmitted({ referenceChoice: "100000", customReference: "100000", rows: defaults }); };
  const resultText = state.error ? "" : [
    `Reference bandwidth: ${state.referenceMbps} Mbps`,
    ...state.results.map((row) => `${row.name}: ${row.bandwidth} ${row.unit} -> cost ${row.cost}`),
    "",
    "router ospf 1",
    ` auto-cost reference-bandwidth ${state.referenceMbps}`,
  ].join("\n");

  return <div className="engineering-tool-stack">
    <div className="tool-workbench ospf-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted({ referenceChoice, customReference, rows: rows.map((row) => ({ ...row })) }); }} noValidate>
        <ToolPanelLabel label="INPUT / OSPF BANDWIDTH" />
        <label><span>Reference bandwidth</span><Select value={referenceChoice} onValueChange={setReferenceChoice}><SelectTrigger className="tool-select" aria-label="OSPF reference bandwidth"><SelectValue /></SelectTrigger><SelectContent>{[
          ["100", "100 Mbps (Cisco default)"], ["1000", "1 Gbps"], ["10000", "10 Gbps"], ["100000", "100 Gbps"], ["400000", "400 Gbps"], ["custom", "Custom"],
        ].map(([value, label]) => <SelectItem value={value} key={value}>{label}</SelectItem>)}</SelectContent></Select></label>
        {referenceChoice === "custom" ? <label><span>Custom reference · Mbps</span><input value={customReference} onChange={(event) => setCustomReference(event.target.value)} inputMode="decimal" /></label> : null}
        <fieldset className="dynamic-fieldset"><legend>Interfaces</legend>{rows.map((row, index) => <div className="ospf-input-row" key={row.id}>
          <label><span className="sr-only">Interface {index + 1} name</span><input value={row.name} onChange={(event) => update(row.id, { name: event.target.value })} placeholder="Gi0/0" /></label>
          <label><span className="sr-only">Bandwidth for {row.name}</span><input value={row.bandwidth} onChange={(event) => update(row.id, { bandwidth: event.target.value })} inputMode="decimal" placeholder="1000" /></label>
          <Select value={row.unit} onValueChange={(unit) => update(row.id, { unit: unit as BandwidthUnit })}><SelectTrigger className="tool-select compact" aria-label={`Bandwidth unit for ${row.name}`}><SelectValue /></SelectTrigger><SelectContent>{["Kbps", "Mbps", "Gbps"].map((unit) => <SelectItem value={unit} key={unit}>{unit}</SelectItem>)}</SelectContent></Select>
          <button className="icon-action" type="button" onClick={() => remove(row.id)} disabled={rows.length === 1} aria-label={`Remove ${row.name}`}><Trash2 aria-hidden="true" /></button>
        </div>)}</fieldset>
        <div className="tool-form-actions"><button className="np-button np-button-secondary" type="button" onClick={add}><Plus aria-hidden="true" />Add interface</button><button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Calculate costs</button></div>
      </form>
      <section className="tool-output" aria-live="polite">
        <ToolPanelLabel label="OUTPUT / INTERFACE COSTS" state={state.error ? "INVALID" : "CALCULATED"} invalid={Boolean(state.error)} />
        {state.error ? <ToolError message={state.error} /> : <>
          <div className="ospf-reference-readout"><span>REFERENCE BANDWIDTH</span><strong>{state.referenceMbps.toLocaleString("en-US")} Mbps</strong><small>Integer cost = floor(reference ÷ interface), minimum 1.</small></div>
          <div className="cost-result-list">{state.results.map((row) => <div key={row.id}><span>{row.name || "UNNAMED"}<small>{row.bandwidth} {row.unit} · {bandwidthToMbps(Number(row.bandwidth), row.unit).toLocaleString("en-US")} Mbps</small></span><strong>{row.cost}</strong>{row.capped ? <em>16-bit maximum</em> : row.rawCost < 1 ? <em>minimum cost</em> : null}</div>)}</div>
          <div className="tool-actions"><CopyControl value={resultText} label="OSPF cost results" /><ResetControl onReset={reset} /></div>
        </>}
      </section>
    </div>
    {!state.error ? <section className="cli-engineering-note"><div><span>CISCO IOS / IOS-XE</span><h2>Keep reference bandwidth consistent across the domain.</h2><p>The default 100 Mbps reference makes Fast Ethernet, Gigabit Ethernet, and faster links collapse toward cost 1. Choose a reference that distinguishes the fastest links you operate, then apply it consistently.</p></div><pre><code>{`router ospf 1\n auto-cost reference-bandwidth ${state.referenceMbps}\n!\ninterface GigabitEthernet0/1\n ip ospf cost 20`}</code></pre></section> : null}
  </div>;
}
