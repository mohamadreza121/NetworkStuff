"use client";

import { useMemo, useState } from "react";
import { Plus, Play, Trash2 } from "lucide-react";

import { CopyControl, ResetControl, ToolError, ToolPanelLabel } from "@/components/tool-controls";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeEigrpSuccessors, calculateClassicEigrpMetric, type EigrpCandidate, type EigrpKValues } from "@/lib/network-tools";

type CandidateRow = { id: string; neighbor: string; reportedDistance: string; totalMetric: string };
const candidateDefaults: CandidateRow[] = [
  { id: "r2", neighbor: "R2", reportedDistance: "28160", totalMetric: "30720" },
  { id: "r3", neighbor: "R3", reportedDistance: "25600", totalMetric: "33280" },
  { id: "r4", neighbor: "R4", reportedDistance: "35840", totalMetric: "38400" },
];
const kDefaults: EigrpKValues = { k1: 1, k2: 0, k3: 1, k4: 0, k5: 0 };

export function EigrpCalculator() {
  const [bandwidth, setBandwidth] = useState("100000");
  const [delay, setDelay] = useState("1000");
  const [reliability, setReliability] = useState("255");
  const [load, setLoad] = useState("1");
  const [mtu, setMtu] = useState("1500");
  const [hopCount, setHopCount] = useState("1");
  const [advanced, setAdvanced] = useState(false);
  const [kValues, setKValues] = useState<EigrpKValues>(kDefaults);
  const [metricSubmission, setMetricSubmission] = useState({ bandwidth, delay, reliability, load, mtu, hopCount, kValues });
  const [destination, setDestination] = useState("10.50.0.0/16");
  const [candidates, setCandidates] = useState<CandidateRow[]>(candidateDefaults);
  const [candidateSubmission, setCandidateSubmission] = useState({ destination, candidates });

  const metricState = useMemo(() => {
    try {
      return { result: calculateClassicEigrpMetric({ minimumBandwidthKbps: Number(metricSubmission.bandwidth), cumulativeDelayMicroseconds: Number(metricSubmission.delay), reliability: Number(metricSubmission.reliability), load: Number(metricSubmission.load), mtu: Number(metricSubmission.mtu), hopCount: Number(metricSubmission.hopCount), kValues: metricSubmission.kValues }), error: "" };
    } catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to calculate the EIGRP metric." }; }
  }, [metricSubmission]);
  const successorState = useMemo(() => {
    try {
      const parsed: EigrpCandidate[] = candidateSubmission.candidates.map((candidate) => ({ id: candidate.id, neighbor: candidate.neighbor, reportedDistance: BigInt(candidate.reportedDistance), totalMetric: BigInt(candidate.totalMetric) }));
      return { result: analyzeEigrpSuccessors(candidateSubmission.destination, parsed), error: "" };
    } catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to analyze these route candidates." }; }
  }, [candidateSubmission]);

  const resetMetric = () => { setBandwidth("100000"); setDelay("1000"); setReliability("255"); setLoad("1"); setMtu("1500"); setHopCount("1"); setKValues(kDefaults); setAdvanced(false); setMetricSubmission({ bandwidth: "100000", delay: "1000", reliability: "255", load: "1", mtu: "1500", hopCount: "1", kValues: kDefaults }); };
  const resetCandidates = () => { setDestination("10.50.0.0/16"); setCandidates(candidateDefaults); setCandidateSubmission({ destination: "10.50.0.0/16", candidates: candidateDefaults }); };
  const updateCandidate = (id: string, patch: Partial<CandidateRow>) => setCandidates((current) => current.map((candidate) => candidate.id === id ? { ...candidate, ...patch } : candidate));
  const addCandidate = () => setCandidates((current) => [...current, { id: `candidate-${Date.now()}`, neighbor: `R${current.length + 2}`, reportedDistance: "0", totalMetric: "0" }]);
  const removeCandidate = (id: string) => setCandidates((current) => current.length > 2 ? current.filter((candidate) => candidate.id !== id) : current);
  const metricText = metricState.result ? [
    `Minimum bandwidth: ${metricState.result.minimumBandwidthKbps} Kbps`,
    `Bandwidth component: ${metricState.result.bandwidthComponent}`,
    `Raw delay: ${metricState.result.rawDelayMicroseconds} microseconds`,
    `Delay component: ${metricState.result.delayComponent}`,
    `K values: ${Object.entries(metricState.result.kValues).map(([key, value]) => `${key.toUpperCase()}=${value}`).join(" ")}`,
    `Classic composite metric: ${metricState.result.metric}`,
  ].join("\n") : "";
  const successorText = successorState.result ? [
    `Destination: ${successorState.result.destination}`,
    `Successor FD: ${successorState.result.successorFd}`,
    ...successorState.result.candidates.map((candidate) => `${candidate.neighbor}: RD ${candidate.reportedDistance}, metric ${candidate.totalMetric}, ${candidate.result}`),
  ].join("\n") : "";

  return <Tabs defaultValue="metric" className="engineering-tabs eigrp-tabs">
    <TabsList variant="line" aria-label="EIGRP calculator mode"><TabsTrigger value="metric">Metric calculator</TabsTrigger><TabsTrigger value="successor">Successor analyzer</TabsTrigger></TabsList>
    <TabsContent value="metric"><div className="tool-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setMetricSubmission({ bandwidth, delay, reliability, load, mtu, hopCount, kValues: { ...kValues } }); }} noValidate>
        <ToolPanelLabel label="INPUT / CLASSIC VECTOR METRIC" />
        <div className="tool-field-pair"><label><span>Minimum bandwidth · Kbps</span><input value={bandwidth} onChange={(event) => setBandwidth(event.target.value)} inputMode="numeric" /></label><label><span>Cumulative delay · µs</span><input value={delay} onChange={(event) => setDelay(event.target.value)} inputMode="numeric" /></label></div>
        <div className="tool-field-pair"><label><span>Reliability · 0–255</span><input value={reliability} onChange={(event) => setReliability(event.target.value)} inputMode="numeric" /></label><label><span>Load · 0–255</span><input value={load} onChange={(event) => setLoad(event.target.value)} inputMode="numeric" /></label></div>
        <div className="tool-field-pair"><label><span>MTU · displayed only</span><input value={mtu} onChange={(event) => setMtu(event.target.value)} inputMode="numeric" /></label><label><span>Hop count · displayed only</span><input value={hopCount} onChange={(event) => setHopCount(event.target.value)} inputMode="numeric" /></label></div>
        <label className="checkbox-field advanced-toggle"><Checkbox checked={advanced} onCheckedChange={(checked) => setAdvanced(checked === true)} /><span>Advanced K-value mode</span></label>
        {advanced ? <fieldset className="k-value-grid"><legend>Classic K values</legend>{(["k1", "k2", "k3", "k4", "k5"] as const).map((key) => <label key={key}><span>{key.toUpperCase()}</span><input value={kValues[key]} onChange={(event) => setKValues((current) => ({ ...current, [key]: Number(event.target.value) }))} inputMode="numeric" /></label>)}</fieldset> : <p>Default K-values: <code>K1=1 K2=0 K3=1 K4=0 K5=0</code>. Only bandwidth and delay affect the default classic metric.</p>}
        <button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Calculate metric</button>
      </form>
      <section className="tool-output" aria-live="polite"><ToolPanelLabel label="OUTPUT / METRIC BREAKDOWN" state={metricState.error ? "INVALID" : "CALCULATED"} invalid={Boolean(metricState.error)} />{metricState.error ? <ToolError message={metricState.error} /> : metricState.result && <>
        <div className="metric-primary-output"><span>CLASSIC COMPOSITE METRIC</span><strong>{metricState.result.metric.toLocaleString("en-US")}</strong></div>
        <dl><div><dt>Minimum bandwidth</dt><dd><code>{metricState.result.minimumBandwidthKbps.toLocaleString("en-US")} Kbps</code></dd></div><div><dt>Bandwidth component</dt><dd><code>10,000,000 ÷ BW = {metricState.result.bandwidthComponent.toString()}</code></dd></div><div><dt>Raw delay</dt><dd><code>{metricState.result.rawDelayMicroseconds.toLocaleString("en-US")} µs</code></dd></div><div><dt>Delay component</dt><dd><code>delay ÷ 10 = {metricState.result.delayComponent.toString()}</code></dd></div><div><dt>K values</dt><dd><code>{Object.entries(metricState.result.kValues).map(([key, value]) => `${key.toUpperCase()}=${value}`).join(" ")}</code></dd></div><div><dt>MTU / hop count</dt><dd><code>{metricState.result.mtu} bytes / {metricState.result.hopCount}</code></dd></div></dl>
        <div className="formula-line"><code>{metricState.result.kValues.k5 === 0 ? "256 × [K1·BW + (K2·BW)/(256−load) + K3·delay]" : "256 × base × K5/(reliability+K4)"}</code></div><div className="tool-actions"><CopyControl value={metricText} label="EIGRP metric breakdown" /><ResetControl onReset={resetMetric} /></div>
      </>}</section>
    </div></TabsContent>
    <TabsContent value="successor"><div className="engineering-tool-stack"><div className="tool-workbench eigrp-successor-workbench">
      <form onSubmit={(event) => { event.preventDefault(); setCandidateSubmission({ destination, candidates: candidates.map((candidate) => ({ ...candidate })) }); }} noValidate>
        <ToolPanelLabel label="INPUT / ROUTE CANDIDATES" />
        <label><span>Destination prefix</span><input value={destination} onChange={(event) => setDestination(event.target.value)} spellCheck={false} /></label>
        <fieldset className="dynamic-fieldset"><legend>Neighbors and distances</legend>{candidates.map((candidate, index) => <div className="candidate-input-row" key={candidate.id}><label><span>Neighbor</span><input value={candidate.neighbor} onChange={(event) => updateCandidate(candidate.id, { neighbor: event.target.value })} /></label><label><span>Reported distance · RD/AD</span><input value={candidate.reportedDistance} onChange={(event) => updateCandidate(candidate.id, { reportedDistance: event.target.value })} inputMode="numeric" /></label><label><span>Total metric candidate</span><input value={candidate.totalMetric} onChange={(event) => updateCandidate(candidate.id, { totalMetric: event.target.value })} inputMode="numeric" /></label><button className="icon-action" type="button" onClick={() => removeCandidate(candidate.id)} disabled={candidates.length === 2} aria-label={`Remove candidate ${index + 1}`}><Trash2 aria-hidden="true" /></button></div>)}</fieldset>
        <div className="tool-form-actions"><button className="np-button np-button-secondary" type="button" onClick={addCandidate}><Plus aria-hidden="true" />Add candidate</button><button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Analyze routes</button></div>
      </form>
      <section className="tool-output" aria-live="polite"><ToolPanelLabel label="OUTPUT / DUAL FEASIBILITY" state={successorState.error ? "INVALID" : "ANALYZED"} invalid={Boolean(successorState.error)} />{successorState.error ? <ToolError message={successorState.error} /> : successorState.result && <><div className="metric-primary-output"><span>CURRENT SUCCESSOR FEASIBLE DISTANCE</span><strong>{successorState.result.successorFd.toLocaleString("en-US")}</strong><small>{successorState.result.destination}</small></div><div className="candidate-results">{successorState.result.candidates.map((candidate) => <article data-result={candidate.result.toLowerCase().replaceAll(" ", "-")} key={candidate.id}><div><strong>{candidate.neighbor}</strong><span>{candidate.result}</span></div><dl><div><dt>Reported distance</dt><dd>{candidate.reportedDistance.toLocaleString("en-US")}</dd></div><div><dt>Candidate metric</dt><dd>{candidate.totalMetric.toLocaleString("en-US")}</dd></div></dl><code>{candidate.reportedDistance.toLocaleString("en-US")} &lt; {successorState.result.successorFd.toLocaleString("en-US")}</code><p>{candidate.totalMetric === successorState.result.successorFd ? "Lowest total metric: selected as a successor." : candidate.conditionPassed ? "Feasibility condition passed: loop-free backup candidate." : "Feasibility condition failed: not a feasible successor."}</p></article>)}</div><div className="tool-actions"><CopyControl value={successorText} label="EIGRP successor analysis" /><ResetControl onReset={resetCandidates} /></div></>}</section>
    </div></div></TabsContent>
  </Tabs>;
}
