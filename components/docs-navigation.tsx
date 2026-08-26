"use client";

import Link from "next/link";
import { BookOpen, List, Menu, Network, Terminal } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type TocItem = { id: string; label: string };

const curriculum = [
  {
    label: "Cisco",
    icon: Network,
    links: [
      { label: "CCNA path", href: "/roadmap#junior" },
      { label: "OSPF fundamentals", href: "/learn/cisco/ccna/ospf-fundamentals" },
      { label: "CCNP path", href: "/roadmap#professional" },
    ],
  },
  {
    label: "Linux",
    icon: Terminal,
    links: [
      { label: "Linux path", href: "/roadmap#foundations" },
      { label: "The ip command", href: "/learn/linux/networking/ip-command" },
    ],
  },
  {
    label: "Systems",
    icon: BookOpen,
    links: [
      { label: "Learning hub", href: "/learn" },
      { label: "Automation path", href: "/roadmap#automation" },
      { label: "Security path", href: "/roadmap#security" },
    ],
  },
];

export function CurriculumNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav className="curriculum-nav" aria-label="Learning curriculum">
      <div className="curriculum-title"><span>CURRICULUM</span><b>Learning systems</b></div>
      {curriculum.map((group) => {
        const Icon = group.icon;
        return (
          <div className="curriculum-group" key={group.label}>
            <h2><Icon aria-hidden="true" />{group.label}</h2>
            {group.links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                aria-current={currentPath === link.href ? "page" : undefined}
                className={currentPath === link.href ? "is-active" : ""}
              >
                <span />{link.label}
              </Link>
            ))}
          </div>
        );
      })}
    </nav>
  );
}

export function OnThisPage({ toc }: { toc: TocItem[] }) {
  return (
    <nav className="toc-nav" aria-label="On this page">
      <h2>ON THIS PAGE</h2>
      {toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}
      <div className="toc-progress"><span /><small>LESSON TEMPLATE · V1</small></div>
    </nav>
  );
}

export function MobileDocsNavigation({ currentPath, toc }: { currentPath: string; toc: TocItem[] }) {
  return (
    <div className="mobile-docs-bar">
      <Sheet>
        <SheetTrigger asChild>
          <button type="button"><Menu aria-hidden="true" /> Curriculum</button>
        </SheetTrigger>
        <SheetContent side="left" className="docs-sheet">
          <SheetHeader>
            <SheetTitle>Learning systems</SheetTitle>
            <SheetDescription>Choose a path or lesson.</SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <div><CurriculumNavigation currentPath={currentPath} /></div>
          </SheetClose>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <button type="button">On this page <List aria-hidden="true" /></button>
        </SheetTrigger>
        <SheetContent side="right" className="docs-sheet">
          <SheetHeader>
            <SheetTitle>Lesson sections</SheetTitle>
            <SheetDescription>Jump to a section in this lesson.</SheetDescription>
          </SheetHeader>
          <SheetClose asChild>
            <div><OnThisPage toc={toc} /></div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}

