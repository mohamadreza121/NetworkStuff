import type { Metadata } from "next";
import Link from "next/link";

import { AclBuilder } from "@/components/acl-builder";
import { ResourceHero } from "@/components/resource-hero";

export const metadata: Metadata = { title: "Cisco ACL Builder", description: "Build ordered Cisco IOS and IOS-XE standard or extended IPv4 ACLs with named and numbered syntax validation.", alternates: { canonical: "/tools/acl-builder" } };
export default function AclBuilderPage() { return <main><ResourceHero eyebrow="TOOLS / CISCO SECURITY" title="Cisco ACL Builder" description="Translate traffic intent into ordered, reviewable IOS IPv4 ACL syntax without pretending NetPath knows the correct interface placement." metrics={[{ value: "STD", label: "SOURCE MATCHING" }, { value: "EXT", label: "FIVE-TUPLE LOGIC" }, { value: "ORDER", label: "FIRST MATCH WINS" }]} /><section className="tool-page-section"><div className="page-shell"><AclBuilder /><div className="tool-explanation"><span>HOW THIS WORKS</span><h2>Build the rule order, then verify the traffic path.</h2><p>The builder validates named and numbered ranges, address forms, protocol-specific ports, TCP established behavior, remarks, logging, and sequence ordering. Every ACL still ends with an implicit deny.</p><div className="tool-crosslinks"><Link href="/tools/wildcard-calculator">Open wildcard calculator</Link><Link href="/reference/cisco?q=access-list">Open Cisco ACL commands</Link><Link href="/learn/cisco/ccna/security/acl-logic-and-wildcards">Learn ACL logic</Link></div></div></div></section></main>; }
