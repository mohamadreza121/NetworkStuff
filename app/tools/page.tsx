import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Binary, Calculator, GitBranch, Network, Route, ShieldCheck, Terminal } from "lucide-react";

import { ResourceHero } from "@/components/resource-hero";

export const metadata: Metadata = { title: "Network Engineer Toolkit", description: "Seven working client-side instruments for IPv4, IPv6, VLSM, OSPF, EIGRP, wildcard masks, and Cisco IOS ACL design.", alternates: { canonical: "/tools" } };

const groups = [
  { name: "IP ADDRESSING", code: "ADDR", tools: [
    { title: "IPv4 Subnet Calculator", description: "Derive boundaries, masks, host ranges, capacity, and binary state.", href: "/tools/subnet-calculator", icon: Calculator },
    { title: "VLSM Planner", description: "Allocate named requirements largest-first without overlap or address-space drift.", href: "/tools/vlsm-planner", icon: Network },
    { title: "IPv6 Helper", description: "Analyze exact 128-bit addresses and plan child prefixes with BigInt arithmetic.", href: "/tools/ipv6-helper", icon: Route },
  ] },
  { name: "ROUTING", code: "RTE", tools: [
    { title: "OSPF Cost Calculator", description: "Compare interface costs under one documented reference bandwidth.", href: "/tools/ospf-cost-calculator", icon: Terminal },
    { title: "EIGRP Metric & Feasibility", description: "Calculate classic metrics and classify successors with the feasibility condition.", href: "/tools/eigrp-calculator", icon: GitBranch },
  ] },
  { name: "SECURITY", code: "SEC", tools: [
    { title: "Wildcard Mask Calculator", description: "Invert contiguous masks and produce Cisco matching examples.", href: "/tools/wildcard-calculator", icon: Binary },
    { title: "Cisco ACL Builder", description: "Build ordered standard or extended IOS ACLs with syntax validation.", href: "/tools/acl-builder", icon: ShieldCheck },
  ] },
];

export default function ToolsPage() { return <main><ResourceHero eyebrow="ENGINEER'S TOOLKIT / INSTRUMENT INDEX" title="Calculate. Copy. Verify." description="A client-side network engineering workstation for addressing, routing metrics, and Cisco policy construction." metrics={[{ value: "07", label: "WORKING TOOLS" }, { value: "03", label: "ENGINEERING DOMAINS" }, { value: "0", label: "SERVER ROUNDTRIPS" }]} /><section className="tools-index-section"><div className="page-shell"><div className="resource-section-heading"><div><span>INSTRUMENT BAY</span><h2>Technical instruments, not toy calculators.</h2></div><p>Every tool validates locally, exposes its assumptions, and produces output designed for a lab worksheet, implementation note, or CLI session.</p></div><div className="tool-group-stack">{groups.map((group) => <section className="tool-index-group" key={group.name}><div><span>{group.code}</span><h2>{group.name}</h2><small>{String(group.tools.length).padStart(2, "0")} instruments online</small></div><div>{group.tools.map((tool, index) => { const Icon = tool.icon; return <Link href={tool.href} key={tool.href}><span>{group.code}-{String(index + 1).padStart(2, "0")}<i className="status-dot" />OPERATIONAL</span><Icon aria-hidden="true" /><div><h3>{tool.title}</h3><p>{tool.description}</p></div><ArrowRight aria-hidden="true" /></Link>; })}</div></section>)}</div><div className="tool-reference-rail"><span>REFERENCE / SUPPORTING SYSTEMS</span><Link href="/reference">Command Reference <ArrowRight aria-hidden="true" /></Link><Link href="/glossary">Network Glossary <ArrowRight aria-hidden="true" /></Link></div></div></section></main>; }
