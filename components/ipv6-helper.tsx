"use client";

import { useMemo, useState } from "react";
import { Binary, Play } from "lucide-react";

import { CopyControl, ResetControl, ToolError, ToolPanelLabel } from "@/components/tool-controls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeIPv6, planIPv6Prefixes } from "@/lib/network-tools";

export function IPv6Helper() {
  const [address, setAddress] = useState("2001:db8:1234:5678::10/64");
  const [submittedAddress, setSubmittedAddress] = useState(address);
  const [showBinary, setShowBinary] = useState(false);
  const [parent, setParent] = useState("2001:db8:1234::/48");
  const [target, setTarget] = useState("/64");
  const [count, setCount] = useState("8");
  const [submittedPlan, setSubmittedPlan] = useState({ parent, target, count });

  const analysis = useMemo(() => {
    try { return { result: analyzeIPv6(submittedAddress), error: "" }; }
    catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to analyze this IPv6 address." }; }
  }, [submittedAddress]);
  const planning = useMemo(() => {
    try { return { result: planIPv6Prefixes(submittedPlan.parent, submittedPlan.target, Number(submittedPlan.count)), error: "" }; }
    catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to plan these IPv6 prefixes." }; }
  }, [submittedPlan]);

  const resetAnalysis = () => { setAddress("2001:db8:1234:5678::10/64"); setSubmittedAddress("2001:db8:1234:5678::10/64"); setShowBinary(false); };
  const resetPlanning = () => { const next = { parent: "2001:db8:1234::/48", target: "/64", count: "8" }; setParent(next.parent); setTarget(next.target); setCount(next.count); setSubmittedPlan(next); };
  const analysisText = analysis.result ? [
    `Original: ${analysis.result.originalAddress}`,
    `Compressed: ${analysis.result.compressedAddress}`,
    `Expanded: ${analysis.result.expandedAddress}`,
    `Prefix: /${analysis.result.prefix}`,
    `Network: ${analysis.result.networkPrefix}`,
    `Interface bits: ${analysis.result.interfaceIdentifier}`,
    `Type: ${analysis.result.addressType}`,
  ].join("\n") : "";
  const planText = planning.result ? [
    `Parent: ${planning.result.parentPrefix}`,
    `Target: /${planning.result.targetPrefix}`,
    `Subnet bits: ${planning.result.subnetBits}`,
    `Resulting subnets: ${planning.result.subnetCount.toString()}`,
    "",
    ...planning.result.examples,
  ].join("\n") : "";

  return <Tabs defaultValue="analysis" className="engineering-tabs">
    <TabsList variant="line" aria-label="IPv6 helper mode"><TabsTrigger value="analysis">Address analysis</TabsTrigger><TabsTrigger value="planning">Prefix planning</TabsTrigger></TabsList>
    <TabsContent value="analysis"><div className="tool-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setSubmittedAddress(address); }} noValidate>
        <ToolPanelLabel label="INPUT / IPV6 ADDRESS" />
        <label><span>IPv6 address and prefix</span><input value={address} onChange={(event) => setAddress(event.target.value)} spellCheck={false} placeholder="2001:db8::10/64" aria-describedby="ipv6-address-note" /></label>
        <p id="ipv6-address-note">Exact 128-bit parsing is performed with integer-safe arithmetic. IPv6 has no broadcast address.</p>
        <button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Analyze address</button>
      </form>
      <section className="tool-output" aria-live="polite">
        <ToolPanelLabel label="OUTPUT / ADDRESS STATE" state={analysis.error ? "INVALID" : "ANALYZED"} invalid={Boolean(analysis.error)} />
        {analysis.error ? <ToolError message={analysis.error} /> : analysis.result && <>
          <dl>{[
            ["Original address", analysis.result.originalAddress], ["Compressed address", analysis.result.compressedAddress], ["Fully expanded", analysis.result.expandedAddress], ["Prefix length", `/${analysis.result.prefix}`], ["Network prefix", analysis.result.networkPrefix], ["Interface bits", analysis.result.interfaceIdentifier], ["Address type", analysis.result.addressType],
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd><code>{value}</code><CopyControl value={value} label={label} /></dd></div>)}</dl>
          <div className="tool-actions"><button className="binary-toggle" type="button" onClick={() => setShowBinary((current) => !current)}><Binary aria-hidden="true" />{showBinary ? "HIDE BINARY" : "SHOW BINARY"}</button><CopyControl value={analysisText} label="IPv6 analysis" /><ResetControl onReset={resetAnalysis} /></div>
        </>}
      </section>
    </div>
    {showBinary && analysis.result ? <section className="ipv6-binary-panel" aria-label="IPv6 hexadecimal and binary breakdown"><div className="instrument-heading"><span>128-BIT VIEW</span><h2>Eight hextets, sixteen bits each.</h2></div><div className="ipv6-hextets">{analysis.result.hextets.map((item, index) => <article data-role={item.role} key={`${item.hex}-${index}`}><span>H{index + 1} · {item.role}</span><strong>{item.hex}</strong><code>{item.binary.slice(0, 8)} {item.binary.slice(8)}</code></article>)}</div></section> : null}</TabsContent>
    <TabsContent value="planning"><div className="tool-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setSubmittedPlan({ parent, target, count }); }} noValidate>
        <ToolPanelLabel label="INPUT / PREFIX PLAN" />
        <label><span>Parent prefix</span><input value={parent} onChange={(event) => setParent(event.target.value)} spellCheck={false} placeholder="2001:db8:1234::/48" /></label>
        <div className="tool-field-pair"><label><span>Target prefix</span><input value={target} onChange={(event) => setTarget(event.target.value)} inputMode="numeric" placeholder="/64" /></label><label><span>Example count</span><input value={count} onChange={(event) => setCount(event.target.value)} inputMode="numeric" placeholder="8" /></label></div>
        <p>NetPath reports the exact subnet count, then renders only the requested number of examples.</p>
        <button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Plan prefixes</button>
      </form>
      <section className="tool-output" aria-live="polite">
        <ToolPanelLabel label="OUTPUT / PREFIX ALLOCATION" state={planning.error ? "INVALID" : "CALCULATED"} invalid={Boolean(planning.error)} />
        {planning.error ? <ToolError message={planning.error} /> : planning.result && <>
          <dl><div><dt>Parent prefix</dt><dd><code>{planning.result.parentPrefix}</code></dd></div><div><dt>Target prefix</dt><dd><code>/{planning.result.targetPrefix}</code></dd></div><div><dt>Subnet bits</dt><dd><code>{planning.result.subnetBits}</code></dd></div><div><dt>Resulting subnets</dt><dd><code>{planning.result.subnetCount.toLocaleString("en-US")}</code></dd></div></dl>
          <div className="prefix-example-list"><span>FIRST {planning.result.examples.length} PREFIXES</span>{planning.result.examples.map((example) => <div key={example}><code>{example}</code><CopyControl value={example} label={example} /></div>)}</div>
          <div className="tool-actions"><CopyControl value={planText} label="IPv6 prefix plan" /><ResetControl onReset={resetPlanning} /></div>
        </>}
      </section>
    </div></TabsContent>
  </Tabs>;
}
