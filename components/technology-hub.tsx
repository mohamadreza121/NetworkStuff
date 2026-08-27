import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";

import { TerminalBlock } from "@/components/terminal-block";
import type { TechnologyHub as Hub } from "@/content/hubs";
import { lessons } from "@/content/lessons";

export function TechnologyHub({ hub }: { hub: Hub }) {
  const featured = hub.featured.map((slug) => lessons.find((lesson) => lesson.slug.join("/") === slug)).filter(Boolean);
  const Icon = hub.icon;
  return (
    <main>
      <section className="hub-hero">
        <div className="page-shell hub-hero-grid">
          <div>
            <span className="hub-code"><Icon aria-hidden="true" />{hub.eyebrow}</span>
            <h1>{hub.title}</h1>
            <p>{hub.description}</p>
            <div className="hub-outcomes">{hub.outcomes.map((outcome) => <span key={outcome}><CheckCircle2 aria-hidden="true" />{outcome}</span>)}</div>
          </div>
          <div className="hub-console-wrap"><span>{hub.code} / FIELD CONSOLE</span><TerminalBlock title={`${hub.code.toLowerCase()}@netpath`} prompt="$" code={hub.console.join("\n")} variant="automation" /></div>
        </div>
      </section>

      <section className="hub-section">
        <div className="page-shell">
          <div className="hub-section-heading"><span>01 / CURRICULUM</span><h2>Build capability in layers.</h2><p>{hub.level}</p></div>
          <div className="hub-module-grid">
            {hub.modules.map((module, index) => (
              <Link href={module.href} key={module.title}>
                <span>MODULE {String(index + 1).padStart(2, "0")}</span><Layers3 aria-hidden="true" />
                <h3>{module.title}</h3><p>{module.description}</p>
                <div><small>{module.level} · {module.lessons} LESSONS</small><ArrowRight aria-hidden="true" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hub-section hub-featured-section">
        <div className="page-shell">
          <div className="hub-section-heading"><span>02 / START HERE</span><h2>Representative lessons.</h2><p>Ready to read now</p></div>
          <div className="hub-featured-list">
            {featured.map((lesson, index) => lesson && (
              <Link href={`/learn/${lesson.slug.join("/")}`} key={lesson.slug.join("/")}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span><small>{lesson.eyebrow}</small><strong>{lesson.title}</strong><em>{lesson.description}</em></span>
                <span>{lesson.estimatedTime}<ArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
