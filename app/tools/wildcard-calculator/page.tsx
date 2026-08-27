import type { Metadata } from "next";

import { ResourceHero } from "@/components/resource-hero";
import { WildcardCalculator } from "@/components/wildcard-calculator";

export const metadata: Metadata = { title: "Wildcard Mask Calculator", description: "Convert a contiguous IPv4 subnet mask or CIDR prefix into a Cisco wildcard mask with ACL and OSPF examples.", alternates: { canonical: "/tools/wildcard-calculator" } };
export default function WildcardCalculatorPage() { return <main><ResourceHero eyebrow="TOOLS / CISCO" title="Wildcard Mask Calculator" description="Invert a contiguous subnet mask or CIDR prefix and see how the result is used in Cisco IOS ACL and OSPF matching." metrics={[{ value: "MASK", label: "OR CIDR INPUT" }, { value: "ACL", label: "USAGE EXAMPLE" }]} /><section className="tool-page-section"><div className="page-shell"><WildcardCalculator /><div className="tool-explanation"><span>HOW WILDCARDS MATCH</span><h2>Zero must match. One may vary.</h2><p>Cisco wildcard masks are inverse masks. With <code>0.0.0.255</code>, the first 24 address bits must match and the final 8 bits may vary.</p></div></div></section></main>; }
