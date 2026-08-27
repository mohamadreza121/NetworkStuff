import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Binary, Calculator, Network, Route, ShieldCheck, Terminal } from "lucide-react";

import { ResourceHero } from "@/components/resource-hero";

export const metadata: Metadata = { title: "Network Engineer Tools", description: "Working subnet and wildcard mask calculators plus planned routing, IPv6, VLSM, and security instruments.", alternates: { canonical: "/tools" } };
const tools = [
  { title: "IPv4 Subnet Calculator", category: "IP ADDRESSING", status: "OPERATIONAL", description: "Derive network, broadcast, masks, host range, capacity, and binary mask.", href: "/tools/subnet-calculator", icon: Calculator },
  { title: "Wildcard Mask Calculator", category: "CISCO", status: "OPERATIONAL", description: "Invert a subnet mask or prefix and generate ACL and OSPF usage examples.", href: "/tools/wildcard-calculator", icon: Binary },
  { title: "VLSM Planner", category: "IP ADDRESSING", status: "PLANNED", description: "Allocate variable-length subnets from largest requirement to smallest.", href: "", icon: Network },
  { title: "IPv6 Helper", category: "IP ADDRESSING", status: "PLANNED", description: "Inspect IPv6 prefixes, address types, and compressed notation.", href: "", icon: Route },
  { title: "OSPF Cost Calculator", category: "ROUTING", status: "PLANNED", description: "Compare interface costs against a documented reference bandwidth.", href: "", icon: Terminal },
  { title: "ACL Builder", category: "SECURITY", status: "PLANNED", description: "Translate traffic intent into auditable Cisco IOS ACL structure.", href: "", icon: ShieldCheck },
];
export default function ToolsPage() { return <main><ResourceHero eyebrow="ENGINEER'S TOOLKIT / INSTRUMENT INDEX" title="Calculate. Copy. Verify." description="Small, focused instruments for addressing, routing, Cisco policy, and day-to-day network reference work." metrics={[{ value: "02", label: "OPERATIONAL TOOLS" }, { value: "04", label: "PLANNED" }, { value: "0ms", label: "SERVER ROUNDTRIPS" }]} /><section className="tools-index-section"><div className="page-shell"><div className="resource-section-heading"><div><span>TOOL INDEX</span><h2>Technical instruments, not toy calculators.</h2></div><p>Inputs are validated locally. Outputs are structured for fast review and copy into documentation or a lab workflow.</p></div><div className="tools-grid">{tools.map((tool, index) => { const Icon = tool.icon; const content = <><div><span>TL-{String(index + 1).padStart(2, "0")} · {tool.category}</span><i data-status={tool.status.toLowerCase()} />{tool.status}</div><Icon aria-hidden="true" /><h2>{tool.title}</h2><p>{tool.description}</p><b>{tool.status === "OPERATIONAL" ? <>Open instrument <ArrowRight aria-hidden="true" /></> : "ARCHITECTURE RESERVED"}</b></>; return tool.href ? <Link href={tool.href} key={tool.title}>{content}</Link> : <article key={tool.title}>{content}</article>; })}</div></div></section></main>; }
