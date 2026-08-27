import type { Metadata } from "next";

import { JobReadyChecklist } from "@/components/job-ready-checklist";
import { ResourceHero } from "@/components/resource-hero";

export const metadata: Metadata = { title: "Junior Network Engineer Job-Ready Checklist", description: "A realistic, device-local readiness checklist for junior network engineering skills, labs, tools, portfolio, and interviews.", alternates: { canonical: "/job-ready" } };

const roles = [
  { role: "NOC Technician", focus: "Monitoring · triage · escalation", depth: "FOUNDATION → JUNIOR" },
  { role: "Junior Network Engineer", focus: "Cisco · Linux · troubleshooting", depth: "JUNIOR" },
  { role: "Network Administrator", focus: "Operations · services · documentation", depth: "JUNIOR → PROFESSIONAL" },
  { role: "Network Engineer", focus: "Routing · design · resilience", depth: "PROFESSIONAL" },
  { role: "Network Automation Engineer", focus: "Python · APIs · Ansible · Git", depth: "PROFESSIONAL" },
  { role: "Firewall Engineer", focus: "Policy · NAT · VPN · logging", depth: "PROFESSIONAL" },
];

export default function JobReadyPage() { return <main><ResourceHero eyebrow="CAREER SYSTEM / JOB READY" title="Know what ready looks like." description="A practical map of the networking, Linux, Cisco, troubleshooting, tools, automation, documentation, lab, portfolio, and interview skills expected at entry level." metrics={[{ value: "LOCAL", label: "PRIVATE PROGRESS" }, { value: "08", label: "SKILL GROUPS" }, { value: "NO", label: "ACCOUNT REQUIRED" }]} /><JobReadyChecklist /><section className="role-comparison-section"><div className="page-shell"><div className="resource-section-heading"><div><span>ROLE SIGNALS</span><h2>Similar foundation. Different emphasis.</h2></div><p>Use these comparisons to focus your portfolio and interview preparation. NetPath is not a job board.</p></div><div className="role-comparison-grid">{roles.map((item, index) => <article key={item.role}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.role}</h2><p>{item.focus}</p><b>{item.depth}</b></article>)}</div></div></section></main>; }
