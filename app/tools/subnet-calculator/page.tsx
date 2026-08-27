import type { Metadata } from "next";

import { ResourceHero } from "@/components/resource-hero";
import { SubnetCalculator } from "@/components/subnet-calculator";

export const metadata: Metadata = { title: "IPv4 Subnet Calculator", description: "Calculate IPv4 network, broadcast, masks, usable host range, address capacity, and binary mask with validation.", alternates: { canonical: "/tools/subnet-calculator" } };
export default function SubnetCalculatorPage() { return <main><ResourceHero eyebrow="TOOLS / IP ADDRESSING" title="IPv4 Subnet Calculator" description="Turn an address and prefix into the exact network boundaries, masks, host range, capacity, and binary representation." metrics={[{ value: "/0–/32", label: "PREFIX RANGE" }, { value: "10", label: "DERIVED VALUES" }]} /><section className="tool-page-section"><div className="page-shell"><SubnetCalculator /><div className="tool-explanation"><span>ENGINEERING NOTE</span><h2>Use the boundary, not the typed host.</h2><p>The prefix determines the network boundary. A host such as <code>192.168.10.25/27</code> belongs to the network beginning at <code>192.168.10.0</code>, with blocks of 32 addresses.</p></div></div></section></main>; }
