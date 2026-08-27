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
            <h2>Learn</h2>
            <Link href="/learn/linux">Linux</Link>
            <Link href="/learn/cisco/ccna">Cisco</Link>
            <Link href="/learn/python">Python</Link>
            <Link href="/learn/ansible">Ansible</Link>
          </div>
          <div>
            <h2>Practice</h2>
            <Link href="/labs">Labs</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/troubleshooting">Troubleshooting</Link>
            <Link href="/interview">Interview</Link>
          </div>
          <div>
            <h2>Reference</h2>
            <Link href="/reference">Command center</Link>
            <Link href="/reference/cisco">Cisco commands</Link>
            <Link href="/reference/linux">Linux commands</Link>
            <Link href="/glossary">Glossary</Link>
            <Link href="/tools">Tools</Link>
          </div>
          <div>
            <h2>Project</h2>
            <Link href="/about">About</Link>
            <Link href="/roadmap">Roadmap</Link>
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
