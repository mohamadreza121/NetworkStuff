import Link from "next/link";
import { ArrowLeft, Route, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="system-page">
      <div className="system-code">404 / ROUTE_NOT_FOUND</div>
      <SearchX aria-hidden="true" />
      <h1>Route not found.</h1>
      <p>No route to destination. The requested path is not present in the NetPath routing table.</p>
      <code>show ip route</code>
      <div><Link className="np-button np-button-primary" href="/"><ArrowLeft aria-hidden="true" /> Home</Link><Link className="np-button np-button-secondary" href="/roadmap"><Route aria-hidden="true" /> Roadmap</Link></div>
    </main>
  );
}
