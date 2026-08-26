"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="system-page">
      <div className="system-code">500 / SYSTEM_FAULT</div>
      <AlertTriangle aria-hidden="true" />
      <h1>The route failed validation.</h1>
      <p>A recoverable interface error interrupted this view.</p>
      <button className="np-button np-button-primary" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Retry route</button>
    </main>
  );
}
