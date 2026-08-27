import type { Metadata } from "next";
import Link from "next/link";

import { IPv6Helper } from "@/components/ipv6-helper";
import { ResourceHero } from "@/components/resource-hero";

export const metadata: Metadata = { title: "IPv6 Address & Prefix Helper", description: "Analyze, expand, compress, classify, and plan IPv6 addresses and prefixes with exact 128-bit arithmetic.", alternates: { canonical: "/tools/ipv6-helper" } };
export default function IPv6HelperPage() { return <main><ResourceHero eyebrow="TOOLS / IPV6" title="IPv6 Address & Prefix Helper" description="Inspect an address precisely, expose the 128-bit structure only when needed, and generate bounded prefix-plan examples." metrics={[{ value: "128", label: "EXACT BITS" }, { value: "RFC", label: "TEXT RULES" }, { value: "NO", label: "BROADCAST" }]} /><section className="tool-page-section"><div className="page-shell"><IPv6Helper /><div className="tool-explanation"><span>HOW THIS WORKS</span><h2>IPv6 is a prefix system, not IPv4 with longer strings.</h2><p>The helper follows IPv6 address architecture and canonical compression behavior. Prefix counts use exact integers, and the tool never invents an IPv6 broadcast address.</p><div className="tool-crosslinks"><Link href="/reference/cisco?q=ipv6">Open Cisco IPv6 commands</Link><Link href="/learn/cisco/ccna">Review the CCNA path</Link></div></div></div></section></main>; }
