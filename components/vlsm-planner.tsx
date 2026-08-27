"use client";

import { useMemo, useState } from "react";
import { Plus, Play, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { CopyControl, ResetControl, ToolError, ToolPanelLabel } from "@/components/tool-controls";
import { planVlsm } from "@/lib/network-tools";

type RequirementRow = { id: string; name: string; hosts: string; pointToPoint: boolean };

const defaults: RequirementRow[] = [
  { id: "users", name: "Users", hosts: "500", pointToPoint: false },
  { id: "voice", name: "Voice", hosts: "200", pointToPoint: false },
  { id: "servers", name: "Servers", hosts: "100", pointToPoint: false },
  { id: "management", name: "Management", hosts: "50", pointToPoint: false },
  { id: "wan-1", name: "WAN-1", hosts: "2", pointToPoint: false },
];

export function VlsmPlanner() {
  const [parent, setParent] = useState("10.10.0.0/16");
  const [rows, setRows] = useState<RequirementRow[]>(defaults);
  const [submitted, setSubmitted] = useState({ parent, rows });

  const state = useMemo(() => {
    try {
      return {
        result: planVlsm(submitted.parent, submitted.rows.map((row) => ({
          name: row.name,
          hosts: Number(row.hosts),
          pointToPoint: row.pointToPoint,
        }))),
        error: "",
      };
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : "Unable to allocate this address plan." };
    }
  }, [submitted]);

  const update = (id: string, field: keyof RequirementRow, value: string | boolean) => {
    setRows((current) => current.map((row) => row.id === id ? { ...row, [field]: value } : row));
  };
  const add = () => setRows((current) => [...current, { id: `subnet-${Date.now()}`, name: `Subnet ${current.length + 1}`, hosts: "10", pointToPoint: false }]);
  const remove = (id: string) => setRows((current) => current.length > 1 ? current.filter((row) => row.id !== id) : current);
  const reset = () => { setParent("10.10.0.0/16"); setRows(defaults); setSubmitted({ parent: "10.10.0.0/16", rows: defaults }); };
  const copyTable = state.result ? [
    "Name,Hosts Required,Network,Prefix,Mask,First Host,Last Host,Broadcast,Capacity",
    ...state.result.allocations.map((item) => [item.name, item.hostsRequired, item.network, `/${item.prefix}`, item.subnetMask, item.firstHost, item.lastHost, item.broadcast, item.capacity].join(",")),
  ].join("\n") : "";
  const copyPlan = state.result ? [
    state.result.parentNetwork,
    ...state.result.allocations.map((item) => `${item.name.padEnd(18)} ${item.network}/${item.prefix}`),
    `Remaining          ${state.result.remainingRange}`,
  ].join("\n") : "";

  return <div className="engineering-tool-stack">
    <div className="tool-workbench vlsm-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted({ parent, rows: rows.map((row) => ({ ...row })) }); }} noValidate>
        <ToolPanelLabel label="INPUT / ADDRESS REQUIREMENTS" />
        <label><span>Parent network</span><input value={parent} onChange={(event) => setParent(event.target.value)} spellCheck={false} placeholder="10.10.0.0/16" aria-describedby="vlsm-parent-note" /></label>
        <p id="vlsm-parent-note">Enter the actual network boundary. Requirements are allocated largest-first without overlap.</p>
        <fieldset className="dynamic-fieldset">
          <legend>Required subnets</legend>
          <div className="vlsm-input-head" aria-hidden="true"><span>Name</span><span>Hosts</span><span>P2P /31</span><span>Remove</span></div>
          {rows.map((row, index) => <div className="vlsm-input-row" key={row.id}>
            <label><span className="sr-only">Subnet {index + 1} name</span><input value={row.name} onChange={(event) => update(row.id, "name", event.target.value)} placeholder="Subnet name" /></label>
            <label><span className="sr-only">Hosts required for {row.name}</span><input value={row.hosts} onChange={(event) => update(row.id, "hosts", event.target.value)} inputMode="numeric" placeholder="50" /></label>
            <label className="checkbox-field"><Checkbox checked={row.pointToPoint} onCheckedChange={(checked) => update(row.id, "pointToPoint", checked === true)} aria-label={`Use /31 point-to-point behavior for ${row.name}`} /><span>Use /31</span></label>
            <button className="icon-action" type="button" onClick={() => remove(row.id)} disabled={rows.length === 1} aria-label={`Remove ${row.name}`}><Trash2 aria-hidden="true" /></button>
          </div>)}
        </fieldset>
        <div className="tool-form-actions"><button className="np-button np-button-secondary" type="button" onClick={add}><Plus aria-hidden="true" />Add subnet</button><button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Allocate plan</button></div>
      </form>
      <section className="tool-output" aria-live="polite">
        <ToolPanelLabel label="OUTPUT / VLSM ALLOCATION" state={state.error ? "INVALID" : "ALLOCATED"} invalid={Boolean(state.error)} />
        {state.error ? <ToolError message={state.error} /> : state.result && <>
          <div className="tool-stat-grid">
            <div><span>Parent</span><strong>{state.result.parentNetwork}</strong></div>
            <div><span>Total addresses</span><strong>{state.result.totalAddresses.toLocaleString("en-US")}</strong></div>
            <div><span>Allocated</span><strong>{state.result.allocatedAddresses.toLocaleString("en-US")}</strong></div>
            <div><span>Remaining</span><strong>{state.result.remainingAddresses.toLocaleString("en-US")}</strong></div>
            <div><span>Utilization</span><strong>{state.result.utilization.toFixed(2)}%</strong></div>
          </div>
          <div className="tool-actions"><CopyControl value={copyTable} label="VLSM table" /><CopyControl value={copyPlan} label="address plan" /><ResetControl onReset={reset} /></div>
        </>}
      </section>
    </div>
    {state.result && !state.error ? <>
      <section className="engineering-table-panel" aria-labelledby="vlsm-table-title">
        <div className="instrument-heading"><span>ALLOCATION TABLE</span><h2 id="vlsm-table-title">Largest requirement first. No overlap.</h2></div>
        <div className="engineering-table-scroll"><table><thead><tr><th>Name</th><th>Hosts</th><th>Network</th><th>Prefix</th><th>Mask</th><th>First host</th><th>Last host</th><th>Broadcast</th><th>Capacity</th></tr></thead><tbody>{state.result.allocations.map((item) => <tr key={item.name}><th scope="row">{item.name}{item.pointToPoint ? <small>P2P</small> : null}</th><td>{item.hostsRequired}</td><td>{item.network}</td><td>/{item.prefix}</td><td>{item.subnetMask}</td><td>{item.firstHost}</td><td>{item.lastHost}</td><td>{item.broadcast}</td><td>{item.capacity}</td></tr>)}</tbody></table></div>
      </section>
      <section className="allocation-map" aria-labelledby="allocation-map-title"><div className="instrument-heading"><span>ADDRESS MAP</span><h2 id="allocation-map-title">{state.result.parentNetwork}</h2></div><ol>{state.result.allocations.map((item) => <li key={item.name}><span>{item.name}</span><i /><code>{item.network}/{item.prefix}</code></li>)}<li className="remaining"><span>Unallocated</span><i /><code>{state.result.remainingRange}</code></li></ol></section>
    </> : null}
  </div>;
}
