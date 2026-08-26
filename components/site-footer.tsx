import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";

import { NetPathLogo } from "@/components/netpath-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="footer-brand">
          <NetPathLogo />
          <p>The practical path to network engineering.</p>
          <span><i className="status-dot" /> Documentation systems online</span>
        </div>

        <div className="footer-links">
          <div>
            <h2>Navigate</h2>
            <Link href="/roadmap">Career roadmap</Link>
            <Link href="/learn">Learning hub</Link>
            <Link href="/labs">Lab library</Link>
          </div>
          <div>
            <h2>Reference</h2>
            <Link href="/reference/linux">Linux commands</Link>
            <Link href="/automation">Automation</Link>
            <Link href="/firewalls">Firewalls</Link>
          </div>
          <div>
            <h2>Source</h2>
            <a href="https://github.com/mohamadreza121/NetworkStuff" target="_blank" rel="noreferrer">
              <GitBranch aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NetPath</span>
        <span>Built for engineers who verify.</span>
      </div>
    </footer>
  );
}
