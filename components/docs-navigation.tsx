"use client";

import Link from "next/link";
import { BookOpen, Braces, ChevronDown, List, Menu, Network, Shield, Terminal, Workflow } from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { lessons } from "@/content/lessons";

export type TocItem = { id: string; label: string };

const groups = [
  { label: "Linux", icon: Terminal, match: (path: string) => path.startsWith("linux/"), hub: "/learn/linux" },
  { label: "Cisco", icon: Network, match: (path: string) => path.startsWith("cisco/"), hub: "/learn/cisco" },
  { label: "Python", icon: Braces, match: (path: string) => path.startsWith("python/"), hub: "/learn/python" },
  { label: "Ansible + Automation", icon: Workflow, match: (path: string) => path.startsWith("ansible/") || path.startsWith("automation/"), hub: "/learn/ansible" },
  { label: "Firewalls + Labs", icon: Shield, match: (path: string) => path.startsWith("palo-alto/") || path.startsWith("fortigate/") || path.startsWith("gns3/"), hub: "/firewalls" },
];

export function CurriculumNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav className="curriculum-nav" aria-label="Learning curriculum">
      <div className="curriculum-title"><span>CURRICULUM</span><b>Learning systems</b></div>
      {groups.map((group) => {
        const Icon = group.icon;
        const links = lessons.filter((lesson) => group.match(lesson.slug.join("/")));
        const open = links.some((lesson) => currentPath === `/learn/${lesson.slug.join("/")}`);
        return (
          <details className="curriculum-group phase2-curriculum" key={group.label} open={open}>
            <summary><Icon aria-hidden="true" /><span>{group.label}<small>{links.length} lessons</small></span><ChevronDown aria-hidden="true" /></summary>
            <Link href={group.hub} className={currentPath === group.hub ? "is-active curriculum-hub-link" : "curriculum-hub-link"}><BookOpen aria-hidden="true" />Open system hub</Link>
            {links.map((lesson) => {
              const href = `/learn/${lesson.slug.join("/")}`;
              return <Link href={href} key={href} aria-current={currentPath === href ? "page" : undefined} className={currentPath === href ? "is-active" : ""}><span />{lesson.title}</Link>;
            })}
          </details>
        );
      })}
    </nav>
  );
}

export function OnThisPage({ toc }: { toc: TocItem[] }) {
  return <nav className="toc-nav" aria-label="On this page"><h2>ON THIS PAGE</h2>{toc.map((item, index) => <a href={`#${item.id}`} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</a>)}<div className="toc-progress"><span /><small>CONTENT MODEL · V2</small></div></nav>;
}

export function MobileDocsNavigation({ currentPath, toc }: { currentPath: string; toc: TocItem[] }) {
  return <div className="mobile-docs-bar"><Sheet><SheetTrigger asChild><button type="button"><Menu aria-hidden="true" />Curriculum</button></SheetTrigger><SheetContent side="left" className="docs-sheet"><SheetHeader><SheetTitle>Learning systems</SheetTitle><SheetDescription>Choose a hub or lesson.</SheetDescription></SheetHeader><SheetClose asChild><div><CurriculumNavigation currentPath={currentPath} /></div></SheetClose></SheetContent></Sheet><Sheet><SheetTrigger asChild><button type="button">On this page <List aria-hidden="true" /></button></SheetTrigger><SheetContent side="right" className="docs-sheet"><SheetHeader><SheetTitle>Lesson sections</SheetTitle><SheetDescription>Jump to a section in this lesson.</SheetDescription></SheetHeader><SheetClose asChild><div><OnThisPage toc={toc} /></div></SheetClose></SheetContent></Sheet></div>;
}
