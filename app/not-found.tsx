import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="system-page">
      <div className="system-code">404 / ROUTE_MISSING</div>
      <SearchX aria-hidden="true" />
      <h1>No route to destination.</h1>
      <p>The requested learning path is not in the current routing table.</p>
      <Link className="np-button np-button-primary" href="/"><ArrowLeft aria-hidden="true" /> Return home</Link>
    </main>
  );
}

