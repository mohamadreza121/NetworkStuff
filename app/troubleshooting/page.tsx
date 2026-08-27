import type { Metadata } from "next";

import { ResourceHero } from "@/components/resource-hero";
import { TroubleshootingCenter } from "@/components/troubleshooting-center";
import { troubleshootingScenarios } from "@/content/troubleshooting";

export const metadata: Metadata = { title: "Network Troubleshooting Center", description: "Learn how network engineers isolate failures through symptoms, hypotheses, commands, evidence, diagnosis, and verification.", alternates: { canonical: "/troubleshooting" }, openGraph: { title: "Network Troubleshooting Center | NetPath", description: "Practice the engineering thought process behind network incident response." } };
export default function TroubleshootingPage() { return <main><ResourceHero eyebrow="INCIDENT RESPONSE / EVIDENCE FIRST" title="Think like the network is down." description="Work from signal to root cause. Each scenario protects the solution so you can investigate before comparing the diagnosis." metrics={[{ value: String(troubleshootingScenarios.length).padStart(2, "0"), label: "INCIDENTS" }, { value: "10", label: "DIAGNOSTIC LAYERS" }, { value: "01", label: "ROOT CAUSE" }]} /><TroubleshootingCenter scenarios={troubleshootingScenarios} /></main>; }
