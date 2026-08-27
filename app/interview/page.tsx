import type { Metadata } from "next";

import { InterviewCenter } from "@/components/interview-center";
import { ResourceHero } from "@/components/resource-hero";
import { interviewQuestions } from "@/content/interviews";

export const metadata: Metadata = { title: "Network Engineering Interview Center", description: "Practical network engineering interview questions with hints, answers, and evidence-based reasoning.", alternates: { canonical: "/interview" } };
export default function InterviewPage() { return <main><ResourceHero eyebrow="CAREER SYSTEM / INTERVIEW CENTER" title="Show how you reason." description="Practice concise explanations for packet flow, routing, switching, Linux, firewalls, automation, and real troubleshooting scenarios." metrics={[{ value: String(interviewQuestions.length).padStart(2, "0"), label: "QUESTIONS" }, { value: "12", label: "ROLE CATEGORIES" }, { value: "HINT", label: "BEFORE ANSWER" }]} /><InterviewCenter questions={interviewQuestions} /></main>; }
