import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabDetail } from "@/components/lab-detail";
import { getLab, labs } from "@/content/labs";

export function generateStaticParams() { return labs.map((lab) => ({ slug: lab.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const lab = getLab(slug); return lab ? { title: lab.title, description: lab.description, alternates: { canonical: `/labs/${lab.slug}` } } : { title: "Lab not found" }; }
export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const lab = getLab(slug); if (!lab) notFound(); return <LabDetail lab={lab} />; }
