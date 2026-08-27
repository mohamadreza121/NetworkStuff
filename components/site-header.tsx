"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, Menu } from "lucide-react";

import { NetPathLogo } from "@/components/netpath-logo";
import { MobileSearchTrigger, SearchCommand } from "@/components/search-command";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { primaryNavigation } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NetPathLogo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "nav-link is-active" : "nav-link"}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <SearchCommand />
          <a
            className="github-link"
            href="https://github.com/mohamadreza121/NetworkStuff"
            target="_blank"
            rel="noreferrer"
            aria-label="Open NetPath on GitHub"
          >
            <GitBranch aria-hidden="true" />
          </a>
        </div>

        <div className="mobile-actions">
          <MobileSearchTrigger />
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="mobile-icon-button" aria-label="Open navigation">
                <Menu aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-nav-sheet">
              <SheetHeader>
                <SheetTitle><NetPathLogo /></SheetTitle>
                <SheetDescription>The practical path to network engineering.</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {primaryNavigation.map((item, index) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className={isActive(item.href) ? "is-active" : ""}>
                      <span>0{index + 1}</span>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-nav-footer">
                <span className="status-dot" />
                Initial production systems operational
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
