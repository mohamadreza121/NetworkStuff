"use client";

import { useEffect, useState } from "react";
import { BookOpen, Boxes, CornerDownLeft, FlaskConical, Map, Search, ShieldAlert, TerminalSquare, Waypoints } from "lucide-react";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import { searchCategories, searchIndex, type SearchCategory } from "@/lib/search-index";

const categoryIcon: Record<SearchCategory, typeof Map> = {
  Navigate: Map, Technology: Waypoints, Lesson: BookOpen, Lab: FlaskConical,
  Command: TerminalSquare, Reference: Boxes, Troubleshooting: ShieldAlert,
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); } };
    const onOpenRequest = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown); window.addEventListener("netpath:search", onOpenRequest);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("netpath:search", onOpenRequest); };
  }, []);
  const navigate = (href: string) => { setOpen(false); setQuery(""); window.location.assign(href); };
  const needle = query.trim().toLowerCase();
  const items = needle ? searchIndex.filter((item) => `${item.title} ${item.description} ${item.keywords} ${item.category}`.toLowerCase().includes(needle)).slice(0, 60) : searchIndex.slice(0, 16);
  return <><button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-label="Search NetPath"><Search aria-hidden="true" /><span>Search lessons, labs, commands…</span><kbd>⌘ K</kbd></button><CommandDialog open={open} onOpenChange={setOpen} title="Search NetPath" description="Search technology hubs, lessons, labs, commands, and troubleshooting guidance." className="netpath-command"><CommandInput placeholder="Search OSPF, route, tcpdump, automation…" value={query} onValueChange={setQuery} /><CommandList><CommandEmpty>No result found. Try a protocol, symptom, or command.</CommandEmpty>{searchCategories.map((category) => { const Icon = categoryIcon[category]; const records = items.filter((item) => item.category === category); return records.length ? <CommandGroup key={category} heading={category}>{records.map((item) => <CommandItem key={`${category}-${item.href}`} value={`${item.title} ${item.description} ${item.keywords}`} onSelect={() => navigate(item.href)} className="netpath-command-item"><span className="command-item-icon"><Icon aria-hidden="true" /></span><span className="command-item-copy"><strong>{item.title}</strong><small>{item.description}</small>{item.meta && <em>{item.meta}</em>}</span><CommandShortcut><CornerDownLeft aria-hidden="true" /></CommandShortcut></CommandItem>)}</CommandGroup> : null; })}</CommandList></CommandDialog></>;
}

export function MobileSearchTrigger() { return <button type="button" className="search-trigger search-trigger-mobile" onClick={() => window.dispatchEvent(new Event("netpath:search"))} aria-label="Search NetPath"><Search aria-hidden="true" /></button>; }
