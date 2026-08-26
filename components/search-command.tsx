"use client";

import { useEffect, useState } from "react";
import { BookOpen, CornerDownLeft, Map, Search, TerminalSquare } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { searchItems } from "@/lib/site-data";

const categoryIcon = {
  Navigate: Map,
  Lessons: BookOpen,
  Reference: TerminalSquare,
};

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpenRequest = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("netpath:search", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("netpath:search", onOpenRequest);
    };
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery("");
    window.location.assign(href);
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = normalizedQuery
    ? searchItems.filter((item) =>
        `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalizedQuery),
      )
    : searchItems;

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Search NetPath"
      >
        <Search aria-hidden="true" />
        <span>Search paths, lessons, commands…</span>
        <kbd>⌘ K</kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search NetPath"
        description="Search learning paths, lessons, and command references."
        className="netpath-command"
      >
        <CommandInput
          placeholder="Search OSPF, Linux, automation…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No route found. Try a protocol or technology.</CommandEmpty>
          {(["Navigate", "Lessons", "Reference"] as const).map((category) => {
            const Icon = categoryIcon[category];
            return (
              <CommandGroup key={category} heading={category}>
                {filteredItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <CommandItem
                      key={`${category}-${item.href}`}
                      value={`${item.title} ${item.description} ${item.keywords}`}
                      onSelect={() => navigate(item.href)}
                      className="netpath-command-item"
                    >
                      <span className="command-item-icon"><Icon aria-hidden="true" /></span>
                      <span className="command-item-copy">
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>
                      <CommandShortcut><CornerDownLeft aria-hidden="true" /></CommandShortcut>
                    </CommandItem>
                  ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export function MobileSearchTrigger() {
  return (
    <button
      type="button"
      className="search-trigger search-trigger-mobile"
      onClick={() => window.dispatchEvent(new Event("netpath:search"))}
      aria-label="Search NetPath"
    >
      <Search aria-hidden="true" />
    </button>
  );
}
