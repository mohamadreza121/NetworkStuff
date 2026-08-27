"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";

export function TerminalBlock({
  title,
  prompt,
  code,
  variant = "cisco",
}: {
  title: string;
  prompt: string;
  code: string;
  variant?: "cisco" | "linux" | "automation" | "firewall";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="terminal-block" data-terminal={variant}>
      <div className="terminal-titlebar">
        <span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span>
        <strong>{title}</strong>
        <button type="button" onClick={copy} aria-label={`Copy ${title} commands`}>
          {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${title} command example`}>
        <code>
          {code.split("\n").map((line, index) => (
            <span className="terminal-line" key={`${line}-${index}`}>
              <b aria-hidden="true">{prompt}</b>
              <span>{line}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
