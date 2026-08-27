import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TroubleshootingDetail } from "@/components/troubleshooting-detail";
import { getTroubleshootingScenario, troubleshootingScenarios } from "@/content/troubleshooting";

export function generateStaticParams() { return troubleshootingScenarios.map((scenario) => ({ slug: scenario.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const scenario = getTroubleshootingScenario(slug); return scenario ? { title: scenario.title, description: scenario.symptoms[0], alternates: { canonical: `/troubleshooting/${scenario.slug}` } } : { title: "Incident not found" }; }
export default async function TroubleshootingScenarioPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const scenario = getTroubleshootingScenario(slug); if (!scenario) notFound(); return <TroubleshootingDetail scenario={scenario} />; }
