import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Monitor } from "lucide-react";

export const metadata: Metadata = { title: "GNS3 Lab Platform", description: "Install GNS3, work with legal appliance images, connect topologies, and capture traffic.", alternates: { canonical: "/gns3" } };
const systems = ["windows", "linux", "macos"];
export default function GNS3Page() { return <main><section className="gns3-hero"><div className="page-shell"><span><Boxes aria-hidden="true" />LAB PLATFORM / GNS3</span><h1>Practice production shapes.<br />Without production risk.</h1><p>Set up a reliable lab environment, use images you are licensed to run, and preserve every topology as a documented engineering exercise.</p></div></section><section className="gns3-install"><div className="page-shell"><div className="hub-section-heading"><span>01 / INSTALL</span><h2>Choose your host system.</h2><p>Step-by-step guides</p></div><div>{systems.map((system) => <Link href={`/gns3/install/${system}`} key={system}><Monitor aria-hidden="true" /><span><small>INSTALL GUIDE</small><strong>{system === "macos" ? "macOS" : system[0].toUpperCase() + system.slice(1)}</strong></span><ArrowRight aria-hidden="true" /></Link>)}</div></div></section></main>; }
