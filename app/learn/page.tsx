import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  CheckCircle2,
  Cloud,
  FlaskConical,
  GitBranch,
  Network,
  Server,
  Shield,
  Terminal,
  Workflow,
} from "lucide-react";

import { technologies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Learning Systems",
  description: "Browse practical learning paths for Cisco, Linux, automation, firewalls, GNS3, and cloud networking.",
  alternates: { canonical: "/learn" },
};

const iconByCode = {
  IOS: Network,
  SH: Terminal,
  ENC: Server,
  PY: Braces,
  YML: Workflow,
  LAB: FlaskConical,
  PAN: Shield,
  FGT: Shield,
  GIT: GitBranch,
};

const systems = [
  { label: "Routing & Switching", icon: Network, state: "CORE", detail: "Cisco CCNA → CCNP" },
  { label: "Host Operations", icon: Terminal, state: "CORE", detail: "Linux for network engineers" },
  { label: "Lab Environments", icon: Boxes, state: "CORE", detail: "GNS3 + Packet Tracer" },
  { label: "Automation", icon: Workflow, state: "NEXT", detail: "Python + Ansible + APIs" },
  { label: "Security", icon: Shield, state: "SPECIALIZE", detail: "Palo Alto + FortiGate" },
  { label: "Cloud Networking", icon: Cloud, state: "ADVANCED", detail: "Hybrid routing + IaC" },
];

export default function LearnPage() {
  return (
    <main>
      <section className="inner-hero learn-hero">
        <div className="page-shell">
          <div className="inner-hero-copy">
            <div className="hero-status"><span className="status-dot" />LEARNING SYSTEMS · INDEXED</div>
            <h1>Learn the system.<br /><span>Operate the network.</span></h1>
            <p>Choose a technology, follow the career route, or open a real lesson template. Every path is built around configuration, verification, troubleshooting, and practice.</p>
          </div>
          <div className="learn-console">
            <div className="learn-console-top"><span>NETPATH / SYSTEM INDEX</span><b>13 AVAILABLE</b></div>
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <div key={system.label}><Icon aria-hidden="true" /><span><b>{system.label}</b><small>{system.detail}</small></span><em>{system.state}</em></div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="learn-index-section">
        <div className="page-shell">
          <div className="learn-index-header">
            <div><span>01 / TECHNOLOGY INDEX</span><h2>Choose your working layer.</h2></div>
            <p>Not sure where to start? <Link href="/roadmap">Use the career roadmap <ArrowRight aria-hidden="true" /></Link></p>
          </div>
          <div className="learn-technology-grid">
            {technologies.map((technology, index) => {
              const Icon = iconByCode[technology.code as keyof typeof iconByCode] ?? BookOpen;
              return (
                <Link href={technology.href} data-tone={technology.tone} key={technology.name}>
                  <div className="learn-tech-top"><span>SYS-{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
                  <h3>{technology.name}</h3>
                  <p>{technology.description}</p>
                  <div className="learn-tech-bottom"><span>{technology.level}</span><span>{technology.modules} MODULES</span><ArrowRight aria-hidden="true" /></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="template-section">
        <div className="page-shell template-layout">
          <div className="template-copy">
            <span>02 / LESSON ARCHITECTURE</span>
            <h2>Every lesson follows the same operational rhythm.</h2>
            <p>The content changes. The engineering workflow stays familiar, so learners know where to find configuration, proof, failure modes, and practice.</p>
            <ol>
              <li><span>01</span><div><b>Understand</b><small>Overview · terminology · diagram</small></div></li>
              <li><span>02</span><div><b>Configure</b><small>Commands · explanation · context</small></div></li>
              <li><span>03</span><div><b>Verify</b><small>Expected state · output · checks</small></div></li>
              <li><span>04</span><div><b>Troubleshoot</b><small>Symptoms · failure domains · fixes</small></div></li>
              <li><span>05</span><div><b>Practice</b><small>Lab · downloads · solution</small></div></li>
            </ol>
          </div>
          <div className="sample-lessons">
            <div className="sample-lessons-header"><span><i className="status-dot" />LIVE TEMPLATES</span><b>2 SAMPLES</b></div>
            <Link href="/learn/cisco/ccna/routing/ospf-neighbors-and-router-id" data-tone="blue">
              <span className="sample-icon"><Network aria-hidden="true" /></span>
              <span><small>CISCO / CCNA</small><strong>OSPF Fundamentals</strong><em>45 min · Junior</em></span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/learn/linux/networking/ip-command" data-tone="green">
              <span className="sample-icon"><Terminal aria-hidden="true" /></span>
              <span><small>LINUX / NETWORKING</small><strong>The Linux ip Command</strong><em>25 min · Foundation</em></span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <p><CheckCircle2 aria-hidden="true" /> Both pages use the responsive documentation shell, copyable terminals, and structured lesson data.</p>
          </div>
        </div>
      </section>

      <section className="lab-system-section" id="lab-preview">
        <div className="page-shell lab-system-layout">
          <div>
            <span>03 / LAB SYSTEM</span>
            <h2>Practice first.<br />Solution when needed.</h2>
            <p>Practice mode protects the answer. Solution mode adds completed configurations, expected output, and failure analysis only when you choose to reveal it.</p>
          </div>
          <div className="lab-mode-comparison">
            <article>
              <span>PRACTICE MODE</span>
              <h3>Build without seeing the answer.</h3>
              <ul><li>Topology</li><li>Addressing table</li><li>Requirements</li><li>Tasks & hints</li><li>Starter files</li></ul>
            </article>
            <div className="mode-link" aria-hidden="true"><i /><FlaskConical /><i /></div>
            <article>
              <span>SOLUTION MODE</span>
              <h3>Compare, verify, and understand.</h3>
              <ul><li>Full configurations</li><li>Command explanations</li><li>Expected output</li><li>Failure analysis</li><li>Solution files</li></ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
