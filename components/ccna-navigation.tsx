"use client";

import Link from "next/link";
import { BookOpen, ChevronDown, List, Menu, Network } from "lucide-react";

import { OnThisPage, type TocItem } from "@/components/docs-navigation";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ccnaLessonPath, ccnaLessons, ccnaModulePath, getCcnaModuleLessons } from "@/content/cisco/ccna";
import { ccnaModules } from "@/content/cisco/ccna/modules";

export function CcnaCurriculumNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav className="ccna-curriculum" aria-label="CCNA 200-301 v1.1 curriculum">
      <div className="ccna-curriculum-heading">
        <span>CCNA 200-301 v1.1</span>
        <strong>Complete learning path</strong>
        <Link href="/learn/cisco/ccna"><BookOpen aria-hidden="true" />Open path hub</Link>
      </div>
      {ccnaModules.map((moduleEntry) => {
        const moduleHref = ccnaModulePath(moduleEntry.id);
        const moduleLessons = getCcnaModuleLessons(moduleEntry.id);
        const open = currentPath === moduleHref || currentPath.startsWith(`${moduleHref}/`);
        return (
          <details key={moduleEntry.id} open={open} className="ccna-curriculum-module">
            <summary>
              <span>{String(moduleEntry.order).padStart(2, "0")}</span>
              <span><strong>{moduleEntry.shortTitle}</strong><small>{moduleLessons.length} lessons</small></span>
              <ChevronDown aria-hidden="true" />
            </summary>
            <Link href={moduleHref} className={currentPath === moduleHref ? "is-active module-overview-link" : "module-overview-link"}>
              <Network aria-hidden="true" />Module overview
            </Link>
            {moduleLessons.map((lesson) => {
              const href = ccnaLessonPath(lesson);
              return (
                <Link key={lesson.id} href={href} className={currentPath === href ? "is-active" : ""} aria-current={currentPath === href ? "page" : undefined}>
                  <span>{String(lesson.order).padStart(2, "0")}</span>{lesson.title}
                </Link>
              );
            })}
          </details>
        );
      })}
      <div className="ccna-curriculum-count">{ccnaLessons.length} original lessons · 97 objectives</div>
    </nav>
  );
}

export function CcnaMobileNavigation({ currentPath, toc }: { currentPath: string; toc: TocItem[] }) {
  return (
    <div className="mobile-docs-bar ccna-mobile-bar">
      <Sheet>
        <SheetTrigger asChild><button type="button"><Menu aria-hidden="true" />CCNA path</button></SheetTrigger>
        <SheetContent side="left" className="docs-sheet ccna-sheet">
          <SheetHeader><SheetTitle>CCNA learning path</SheetTitle><SheetDescription>Choose a module or focused lesson.</SheetDescription></SheetHeader>
          <SheetClose asChild><div><CcnaCurriculumNavigation currentPath={currentPath} /></div></SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild><button type="button">On this page <List aria-hidden="true" /></button></SheetTrigger>
        <SheetContent side="right" className="docs-sheet">
          <SheetHeader><SheetTitle>Lesson sections</SheetTitle><SheetDescription>Move through the engineering workflow.</SheetDescription></SheetHeader>
          <SheetClose asChild><div><OnThisPage toc={toc} /></div></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
