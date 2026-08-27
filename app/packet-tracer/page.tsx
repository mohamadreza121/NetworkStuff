import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "Packet Tracer Projects", description: "A practical path for Cisco Packet Tracer labs and portfolio-ready network projects.", alternates: { canonical: "/packet-tracer" } };
export default function PacketTracerPage() { return <main><section className="packet-hero"><div className="page-shell"><span><Boxes aria-hidden="true" />CISCO / PACKET TRACER</span><h1>Build the network.<br />Explain the evidence.</h1><p>Use Packet Tracer for fast switching, routing, services, and troubleshooting practice—then document the result like an engineer.</p><div>{["Addressing plan", "Requirements", "Verification output", "Fault analysis"].map((item) => <span key={item}><CheckCircle2 aria-hidden="true" />{item}</span>)}</div><Link className="np-button np-button-primary" href="/labs">Open Packet Tracer labs <ArrowRight aria-hidden="true" /></Link></div></section></main>; }
