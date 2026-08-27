"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Lightbulb, Search } from "lucide-react";

import type { InterviewQuestion } from "@/content/schema";

function InterviewCard({ item, index }: { item: InterviewQuestion; index: number }) {
  const [hint, setHint] = useState(false);
  const [answer, setAnswer] = useState(false);
  return <article className="interview-card"><div className="interview-card-meta"><span>Q-{String(index + 1).padStart(3, "0")}</span><span>{item.level}</span><span>{item.technology.toUpperCase()}</span></div><h2>{item.question}</h2><p>{item.role} · {item.category}</p><div className="interview-actions"><button type="button" aria-expanded={hint} onClick={() => setHint((value) => !value)}><Lightbulb aria-hidden="true" />{hint ? "Hide hint" : "Show hint"}</button><button type="button" aria-expanded={answer} onClick={() => setAnswer((value) => !value)}><ChevronDown aria-hidden="true" />{answer ? "Hide answer" : "Show answer"}</button></div>{hint && <div className="interview-hint"><span>HINT</span><p>{item.hint}</p></div>}{answer && <div className="interview-answer" aria-live="polite"><span>ANSWER</span><p>{item.answer}</p><strong>REASONING</strong><p>{item.reasoning}</p>{(item.relatedLesson || item.relatedLab) && <div>{item.relatedLesson && <Link href={item.relatedLesson.href}>Related lesson <ArrowRight aria-hidden="true" /></Link>}{item.relatedLab && <Link href={item.relatedLab.href}>Related lab <ArrowRight aria-hidden="true" /></Link>}</div>}</div>}</article>;
}

export function InterviewCenter({ questions }: { questions: InterviewQuestion[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...Array.from(new Set(questions.map((item) => item.category)))];
  const visible = useMemo(() => { const needle = query.toLowerCase().trim(); return questions.filter((item) => (category === "All" || item.category === category) && (!needle || `${item.question} ${item.technology} ${item.role}`.toLowerCase().includes(needle))); }, [category, query, questions]);
  return <section className="interview-index-section"><div className="page-shell"><div className="resource-section-heading"><div><span>QUESTION BANK</span><h2>Explain the path, not just the term.</h2></div><p>Use each prompt to demonstrate layered reasoning, operational evidence, and clear communication.</p></div><label className="resource-search"><Search aria-hidden="true" /><span className="sr-only">Search interview questions</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search OSPF, Linux, troubleshooting…" /><kbd>{visible.length} QUESTIONS</kbd></label><div className="resource-filter-row">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="interview-list">{visible.map((item, index) => <InterviewCard item={item} index={index} key={item.id} />)}</div></div></section>;
}
