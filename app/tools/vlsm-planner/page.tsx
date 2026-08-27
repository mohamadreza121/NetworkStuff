import type { Metadata } from "next";
import Link from "next/link";

import { ResourceHero } from "@/components/resource-hero";
import { VlsmPlanner } from "@/components/vlsm-planner";

export const metadata: Metadata = { title: "VLSM Planner for Network Engineers", description: "Allocate validated non-overlapping IPv4 subnets from named host requirements, including explicit /31 point-to-point support.", alternates: { canonical: "/tools/vlsm-planner" } };
export default function VlsmPlannerPage() { return <main><ResourceHero eyebrow="TOOLS / IP ADDRESSING" title="VLSM Planner" description="Turn one parent network and a set of real host requirements into a validated, non-overlapping address plan." metrics={[{ value: "LARGEST", label: "FIRST ALLOCATION" }, { value: "/31", label: "EXPLICIT P2P" }, { value: "CSV", label: "COPYABLE TABLE" }]} /><section className="tool-page-section"><div className="page-shell"><VlsmPlanner /><div className="tool-explanation"><span>HOW THIS WORKS</span><h2>Allocate by block size, not by the order someone typed a spreadsheet.</h2><p>NetPath calculates the smallest safe prefix for each requirement, sorts blocks from largest to smallest, aligns each network boundary, and refuses any plan that overlaps or escapes the parent prefix.</p><div className="tool-crosslinks"><Link href="/tools/subnet-calculator">Open subnet calculator</Link><Link href="/projects/gns3">Build a GNS3 project</Link></div></div></div></section></main>; }
