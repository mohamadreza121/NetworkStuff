"use client";

import { useState } from "react";
import { Check, Clipboard, RotateCcw } from "lucide-react";

export function CopyControl({ value, label = "result", className = "" }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };
  return <button className={`copy-control ${className}`.trim()} type="button" onClick={copy} aria-label={`Copy ${label}`}>
    {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
    {copied ? "COPIED" : "COPY"}
  </button>;
}

export function ResetControl({ onReset }: { onReset: () => void }) {
  return <button className="reset-control" type="button" onClick={onReset}><RotateCcw aria-hidden="true" />RESET</button>;
}

export function ToolPanelLabel({ label, state = "READY", invalid = false }: { label: string; state?: string; invalid?: boolean }) {
  return <div className="tool-panel-label"><span>{label}</span><i className={invalid ? "status-dot red" : "status-dot"} />{state}</div>;
}

export function ToolError({ message }: { message: string }) {
  return <div className="tool-error" role="alert"><strong>INPUT REJECTED</strong><p>{message}</p></div>;
}

export function ToolActions({ copyValue, copyLabel = "result", onReset, children }: { copyValue?: string; copyLabel?: string; onReset: () => void; children?: React.ReactNode }) {
  return <div className="tool-actions">{children}{copyValue ? <CopyControl value={copyValue} label={copyLabel} /> : null}<ResetControl onReset={onReset} /></div>;
}
