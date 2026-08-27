"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";

import { CopyControl, ResetControl } from "@/components/tool-controls";
import { calculateWildcard } from "@/lib/network-tools";

export function WildcardCalculator() {
  const [input, setInput] = useState("255.255.255.0");
  const [submitted, setSubmitted] = useState(input);
  const state = useMemo(() => { try { return { result: calculateWildcard(submitted), error: "" }; } catch (error) { return { result: null, error: error instanceof Error ? error.message : "Unable to calculate this wildcard." }; } }, [submitted]);
  const reset = () => { setInput("255.255.255.0"); setSubmitted("255.255.255.0"); };
  const copyResult = state.result ? `Subnet mask: ${state.result.subnetMask}\nWildcard: ${state.result.wildcardMask}\nPrefix: /${state.result.prefix}\nACL: permit ip 192.168.10.0 ${state.result.wildcardMask} any\nOSPF: network 192.168.10.0 ${state.result.wildcardMask} area 0` : "";
  return <div className="tool-workbench"><form onSubmit={(event) => { event.preventDefault(); setSubmitted(input); }} noValidate><div className="tool-panel-label"><span>INPUT / MASK</span><i className="status-dot" />READY</div><label><span>Subnet mask or prefix</span><input value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} placeholder="255.255.255.0 or /24" /></label><p>A wildcard bit is the inverse of its subnet-mask bit: <code>0</code> must match, while <code>1</code> may vary.</p><button className="np-button np-button-primary" type="submit"><Play aria-hidden="true" />Calculate wildcard</button></form><section className="tool-output" aria-live="polite"><div className="tool-panel-label"><span>OUTPUT / CISCO MATCH</span><i className={state.error ? "status-dot red" : "status-dot"} />{state.error ? "INVALID" : "CALCULATED"}</div>{state.error ? <div className="tool-error"><strong>INPUT REJECTED</strong><p>{state.error}</p></div> : state.result && <><div className="wildcard-primary-output"><span>WILDCARD MASK</span><strong>{state.result.wildcardMask}</strong><CopyControl value={state.result.wildcardMask} label="wildcard mask" /></div><dl><div><dt>Subnet Mask</dt><dd><code>{state.result.subnetMask}</code></dd></div><div><dt>Prefix</dt><dd><code>/{state.result.prefix}</code></dd></div><div><dt>ACL example</dt><dd><code>permit ip 192.168.10.0 {state.result.wildcardMask} any</code></dd></div><div><dt>OSPF example</dt><dd><code>network 192.168.10.0 {state.result.wildcardMask} area 0</code></dd></div></dl><div className="tool-actions"><CopyControl value={copyResult} label="wildcard result" /><ResetControl onReset={reset} /></div></>}</section></div>;
}
