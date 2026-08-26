import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Firewall Learning Systems", description: "Learn policy, NAT, VPN, routing, logging, and high availability through traffic-flow reasoning.", alternates: { canonical: "/firewalls" } };
const vendors = [
  { slug: "palo-alto", code: "PAN", title: "Palo Alto Networks", copy: "Zones, App-ID policy, NAT, traffic logs, VPN, and HA." },
  { slug: "fortigate", code: "FGT", title: "FortiGate", copy: "Policy, routing, SD-WAN, VPN, flow debug, and HA." },
];
export default function FirewallsPage() { return <main><section className="firewall-hero"><div className="page-shell"><span><Shield aria-hidden="true" />SECURITY ENFORCEMENT PLANE</span><h1>Policy follows the flow.</h1><p>Understand source, destination, zone, route, translation, application, session, and return path before memorizing a vendor interface.</p></div></section><section className="firewall-grid-section"><div className="page-shell firewall-grid">{vendors.map((vendor) => <Link href={`/firewalls/${vendor.slug}`} key={vendor.slug}><div><span>{vendor.code}</span><ShieldCheck aria-hidden="true" /></div><h2>{vendor.title}</h2><p>{vendor.copy}</p><strong>Open vendor route <ArrowRight aria-hidden="true" /></strong></Link>)}</div></section></main>; }
