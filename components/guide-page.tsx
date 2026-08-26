import Link from "next/link";
import { ArrowRight, CheckCircle2, MonitorCog } from "lucide-react";

import { TerminalBlock } from "@/components/terminal-block";
import { VideoPlaceholder } from "@/components/video-placeholder";

export type GuideStep = { title: string; detail: string; command?: string };

export function GuidePage({ eyebrow, title, description, steps, nextHref, nextLabel }: { eyebrow: string; title: string; description: string; steps: GuideStep[]; nextHref?: string; nextLabel?: string }) {
  return <main><section className="guide-hero"><div className="page-shell"><span><MonitorCog aria-hidden="true" />{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section><section className="guide-content"><div className="page-shell guide-layout"><article><div className="guide-intro"><span>INSTALLATION PLAYBOOK</span><h2>One verified checkpoint at a time.</h2><p>Names and screens vary by release. Preserve the operating sequence and confirm each checkpoint before moving forward.</p></div><ol className="guide-step-list">{steps.map((step, index) => <li id={`step-${index + 1}`} key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{step.title}</h2><p>{step.detail}</p>{step.command && <TerminalBlock title={`Step ${index + 1} · terminal`} prompt="$" code={step.command} variant="linux" />}<div className="guide-screenshot"><MonitorCog aria-hidden="true" /><span>SCREENSHOT PLACEHOLDER</span><small>Replace with an approved capture for this operating system and release.</small></div></div></li>)}</ol>{nextHref && <Link className="guide-next" href={nextHref}><span><small>NEXT GUIDE</small><strong>{nextLabel}</strong></span><ArrowRight aria-hidden="true" /></Link>}</article><aside><div><span>CHECKPOINTS</span>{steps.map((step, index) => <a href={`#step-${index + 1}`} key={step.title}><CheckCircle2 aria-hidden="true" />{step.title}</a>)}</div><VideoPlaceholder title={`${title} walkthrough`} duration="Video placeholder" /></aside></div></section></main>;
}
