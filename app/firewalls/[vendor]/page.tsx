import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { lessons } from "@/content/lessons";

const vendors = {
  "palo-alto": { title: "Palo Alto Networks", prefix: "palo-alto/", code: "PAN-OS", outcomes: ["Reason through zones and sessions", "Build security and NAT policy", "Read traffic logs", "Validate the return path"] },
  fortigate: { title: "FortiGate", prefix: "fortigate/", code: "FORTIOS", outcomes: ["Build scoped firewall policy", "Operate routing and SD-WAN", "Trace a packet with flow debug", "Validate sessions and counters"] },
};
export function generateStaticParams() { return Object.keys(vendors).map((vendor) => ({ vendor })); }
export async function generateMetadata({ params }: { params: Promise<{ vendor: string }> }): Promise<Metadata> { const { vendor } = await params; const data = vendors[vendor as keyof typeof vendors]; return data ? { title: `${data.title} Learning Path`, description: `Practical ${data.title} firewall operations and troubleshooting.`, alternates: { canonical: `/firewalls/${vendor}` } } : { title: "Vendor not found" }; }
export default async function VendorPage({ params }: { params: Promise<{ vendor: string }> }) { const { vendor } = await params; const data = vendors[vendor as keyof typeof vendors]; if (!data) notFound(); const items = lessons.filter((lesson) => lesson.slug.join("/").startsWith(data.prefix)); return <main><section className="vendor-hero"><div className="page-shell"><span><Shield aria-hidden="true" />{data.code} / FIREWALL OPERATIONS</span><h1>{data.title}</h1><p>Follow the traffic flow from route lookup to policy match, translation, session state, inspection, and return path.</p><div>{data.outcomes.map((item) => <span key={item}><CheckCircle2 aria-hidden="true" />{item}</span>)}</div></div></section><section className="vendor-lessons"><div className="page-shell"><div className="hub-section-heading"><span>01 / CURRICULUM</span><h2>Build the operating sequence.</h2><p>{items.length} lessons</p></div>{items.map((lesson, index) => <Link href={`/learn/${lesson.slug.join("/")}`} key={lesson.title}><span>{String(index + 1).padStart(2, "0")}</span><span><small>{lesson.eyebrow}</small><strong>{lesson.title}</strong><em>{lesson.description}</em></span><ArrowRight aria-hidden="true" /></Link>)}</div></section></main>; }
