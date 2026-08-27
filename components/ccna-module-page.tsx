import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FlaskConical } from "lucide-react";

import { CcnaCurriculumNavigation } from "@/components/ccna-navigation";
import { ccnaLessonPath, ccnaModulePath, getCcnaModuleLessons } from "@/content/cisco/ccna";
import { ccnaModules } from "@/content/cisco/ccna/modules";
import type { CcnaModule } from "@/content/cisco/ccna/types";

export function CcnaModulePage({ moduleEntry }: { moduleEntry: CcnaModule }) {
  const currentPath = ccnaModulePath(moduleEntry.id);
  const lessons = getCcnaModuleLessons(moduleEntry.id);
  const objectiveIds = [...new Set(lessons.flatMap((lesson) => lesson.examObjectives))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const previousModule = ccnaModules[moduleEntry.order - 2];
  const nextModule = ccnaModules[moduleEntry.order];
  return (
    <main className="ccna-module-page">
      <div className="ccna-module-layout">
        <aside className="ccna-module-sidebar"><CcnaCurriculumNavigation currentPath={currentPath} /></aside>
        <div className="ccna-module-main">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/learn">Learn</Link><ChevronRight aria-hidden="true" />
            <Link href="/learn/cisco/ccna">CCNA</Link><ChevronRight aria-hidden="true" /><span>{moduleEntry.title}</span>
          </nav>
          <header className="ccna-module-header">
            <span>MODULE {String(moduleEntry.order).padStart(2, "0")} / CCNA 200-301 v1.1</span>
            <h1>{moduleEntry.title}</h1>
            <p>{moduleEntry.description}</p>
            <div><span>{lessons.length} lessons</span><span>{objectiveIds.length} objective IDs</span><span>{lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)} minutes</span></div>
          </header>
          <section className="ccna-module-outcome">
            <CheckCircle2 aria-hidden="true" /><div><span>MODULE OUTCOME</span><p>{moduleEntry.outcome}</p></div>
          </section>
          <section className="ccna-module-objectives" aria-labelledby="module-objectives-title">
            <div><span>EXAM COVERAGE</span><h2 id="module-objectives-title">Objectives in this module</h2></div>
            <div>{objectiveIds.map((id) => <span key={id}>{id}</span>)}</div>
          </section>
          <section className="ccna-lesson-rows" aria-labelledby="module-lessons-title">
            <div className="ccna-module-list-heading"><span>LESSON</span><h2 id="module-lessons-title">Work through the sequence.</h2><p>Each row opens one 10–30 minute lesson with its own exercise.</p></div>
            {lessons.map((lesson) => (
              <Link href={ccnaLessonPath(lesson)} key={lesson.id}>
                <span className="ccna-lesson-index">{String(lesson.order).padStart(2, "0")}</span>
                <span className="ccna-lesson-row-copy"><small>{lesson.examObjectives.join(" · ")}</small><strong>{lesson.title}</strong><em>{lesson.summary}</em></span>
                <span className="ccna-lesson-row-meta"><small><Clock3 aria-hidden="true" />{lesson.estimatedMinutes} min</small><b data-level={lesson.practice.level}><FlaskConical aria-hidden="true" />{lesson.practice.level}</b></span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </section>
          <section className="ccna-module-sources">
            <BookOpenCheck aria-hidden="true" />
            <div><span>TECHNICAL SOURCE MAP</span><h2>Original lessons, source-aligned depth.</h2><p>{moduleEntry.sourceChapters.join(" · ")}</p><small>The official Cisco v1.1 topics control exam scope. Book prose, figures, questions, and labs are not reproduced.</small></div>
          </section>
          <nav className="ccna-module-pagination" aria-label="Adjacent CCNA modules">
            {previousModule ? <Link href={ccnaModulePath(previousModule.id)}><ArrowLeft aria-hidden="true" /><span><small>PREVIOUS MODULE</small><strong>{previousModule.title}</strong></span></Link> : <Link href="/learn/cisco/ccna"><ArrowLeft aria-hidden="true" /><span><small>PATH HUB</small><strong>CCNA learning path</strong></span></Link>}
            {nextModule && <Link href={ccnaModulePath(nextModule.id)}><span><small>NEXT MODULE</small><strong>{nextModule.title}</strong></span><ArrowRight aria-hidden="true" /></Link>}
          </nav>
        </div>
      </div>
    </main>
  );
}
