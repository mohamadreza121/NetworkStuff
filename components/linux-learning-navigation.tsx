"use client";

import Link from "next/link";
import { BookOpen, ChevronDown, List, Menu, Network } from "lucide-react";

import { OnThisPage, type TocItem } from "@/components/docs-navigation";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getLinuxModuleLessons, linuxLessonPath, linuxLessons, linuxModulePath } from "@/content/linux/network-engineering";
import { linuxModules } from "@/content/linux/network-engineering/modules";

export function LinuxCurriculumNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav className="ccna-curriculum linux-curriculum" aria-label="Linux network operations curriculum">
      <div className="ccna-curriculum-heading">
        <span>LINUX NETWORK OPERATIONS</span>
        <strong>Complete engineering path</strong>
        <Link href="/learn/linux"><BookOpen aria-hidden="true" />Open path hub</Link>
      </div>
      {linuxModules.map((moduleEntry) => {
        const moduleHref = linuxModulePath(moduleEntry.id);
        const moduleLessons = getLinuxModuleLessons(moduleEntry.id);
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
              const href = linuxLessonPath(lesson);
              return (
                <Link key={lesson.id} href={href} className={currentPath === href ? "is-active" : ""} aria-current={currentPath === href ? "page" : undefined}>
                  <span>{String(lesson.order).padStart(2, "0")}</span>{lesson.title}
                </Link>
              );
            })}
          </details>
        );
      })}
      <div className="ccna-curriculum-count">{linuxLessons.length} original lessons · 71 capabilities</div>
    </nav>
  );
}

export function LinuxMobileNavigation({ currentPath, toc }: { currentPath: string; toc: TocItem[] }) {
  return (
    <div className="mobile-docs-bar ccna-mobile-bar linux-mobile-bar">
      <Sheet>
        <SheetTrigger asChild><button type="button"><Menu aria-hidden="true" />Linux path</button></SheetTrigger>
        <SheetContent side="left" className="docs-sheet ccna-sheet">
          <SheetHeader><SheetTitle>Linux network operations</SheetTitle><SheetDescription>Choose a module or focused lesson.</SheetDescription></SheetHeader>
          <SheetClose asChild><div><LinuxCurriculumNavigation currentPath={currentPath} /></div></SheetClose>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild><button type="button">On this page <List aria-hidden="true" /></button></SheetTrigger>
        <SheetContent side="right" className="docs-sheet">
          <SheetHeader><SheetTitle>Lesson sections</SheetTitle><SheetDescription>Move through the operations workflow.</SheetDescription></SheetHeader>
          <SheetClose asChild><div><OnThisPage toc={toc} /></div></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
