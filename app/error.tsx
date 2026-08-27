"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="system-page">
      <div className="system-code">500 / SESSION_INTERRUPTED</div>
      <AlertTriangle aria-hidden="true" />
      <h1>Session interrupted.</h1>
      <p>Something failed while loading this route. The current state can be requested again safely.</p>
      <button className="np-button np-button-primary" type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Retry route</button>
    </main>
  );
}
