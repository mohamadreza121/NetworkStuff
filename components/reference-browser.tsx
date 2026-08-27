"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, ExternalLink, Search, TerminalSquare, Wrench } from "lucide-react";

import { CopyControl } from "@/components/tool-controls";
import type { ReferenceCommand } from "@/content/schema";

const PAGE_SIZE = 48;
const allLevels = ["FOUNDATION", "JUNIOR", "PROFESSIONAL", "ADVANCED"];

const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

export function ReferenceBrowser({
  commands,
  fixedPlatform,
  initialQuery = "",
}: {
  commands: ReferenceCommand[];
  fixedPlatform?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [level, setLevel] = useState("ALL");
  const [mode, setMode] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const platforms = useMemo(() => unique(commands.map((item) => item.platform)), [commands]);
  const categories = useMemo(() => unique(commands.map((item) => item.category)), [commands]);
  const modes = useMemo(() => unique(commands.map((item) => item.mode)), [commands]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return commands.filter((item) => {
      if (platform !== "ALL" && item.platform !== platform) return false;
      if (category !== "ALL" && item.category !== category) return false;
      if (level !== "ALL" && item.level !== level) return false;
      if (mode !== "ALL" && item.mode !== mode) return false;
      if (status !== "ALL" && item.status !== status) return false;
      if (!needle) return true;
      return [
        item.command,
        item.platform,
        item.category,
        item.mode,
        item.purpose,
        item.syntax,
        item.explanation,
        ...item.examples,
        ...item.aliases,
        ...item.tags,
        ...item.related,
      ].join(" ").toLowerCase().includes(needle);
    });
  }, [category, commands, level, mode, platform, query, status]);

  const reset = () => {
    setQuery("");
    setPlatform("ALL");
    setCategory("ALL");
    setLevel("ALL");
    setMode("ALL");
    setStatus("ALL");
    setVisibleCount(PAGE_SIZE);
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  };

  const searchFor = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
    const url = new URL(window.location.href);
    url.searchParams.set("q", value);
    window.history.replaceState({}, "", url);
  };

  const visible = results.slice(0, visibleCount);

  return (
    <div className="reference-browser">
      <div className="reference-browser-controls">
        <div className="reference-query">
          <Search aria-hidden="true" />
          <label className="sr-only" htmlFor="reference-query">Search command reference</label>
          <input
            id="reference-query"
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }}
            placeholder="Search command, purpose, mode, alias, or tag…"
            autoComplete="off"
          />
          <kbd aria-live="polite">{results.length} / {commands.length}</kbd>
        </div>
        <div className="reference-select-grid" aria-label="Reference filters">
          {!fixedPlatform ? <FilterSelect id="reference-platform" label="Platform" value={platform} onChange={(value) => { setPlatform(value); setVisibleCount(PAGE_SIZE); }} options={platforms} /> : null}
          <FilterSelect id="reference-category" label="Category" value={category} onChange={(value) => { setCategory(value); setVisibleCount(PAGE_SIZE); }} options={categories} />
          <FilterSelect id="reference-level" label="Level" value={level} onChange={(value) => { setLevel(value); setVisibleCount(PAGE_SIZE); }} options={allLevels.filter((item) => commands.some((command) => command.level === item))} />
          <FilterSelect id="reference-mode" label="Mode" value={mode} onChange={(value) => { setMode(value); setVisibleCount(PAGE_SIZE); }} options={modes} />
          <FilterSelect id="reference-status" label="Status" value={status} onChange={(value) => { setStatus(value); setVisibleCount(PAGE_SIZE); }} options={["CURRENT", "LEGACY"]} />
          <button type="button" className="reference-reset" onClick={reset}>RESET FILTERS</button>
        </div>
      </div>

      <div className="reference-result-rail">
        <span><i className="status-dot" />REFERENCE INDEX ONLINE</span>
        <strong aria-live="polite">{results.length} MATCH{results.length === 1 ? "" : "ES"}</strong>
        <small>{fixedPlatform ?? "ALL PLATFORMS"}</small>
      </div>

      {visible.length ? (
        <div className="reference-command-list">
          {visible.map((item, index) => (
            <details className="reference-command" key={`${item.platform}-${item.command}-${index}`}>
              <summary>
                <span className="reference-command-index">{String(index + 1).padStart(3, "0")}</span>
                <span className="reference-command-main">
                  <span className="reference-command-badges">
                    {!fixedPlatform ? <em>{item.platform}</em> : null}
                    <em>{item.category}</em>
                    <em>{item.mode}</em>
                    {item.legacy ? <em className="is-legacy">LEGACY</em> : null}
                    {item.destructive ? <em className="is-caution">CAUTION</em> : null}
                  </span>
                  <code>{item.command}</code>
                  <small>{item.purpose}</small>
                </span>
                <ChevronDown className="reference-command-chevron" aria-hidden="true" />
              </summary>
              <div className="reference-command-detail">
                <div className="reference-command-primary">
                  <section>
                    <span>SYNTAX</span>
                    <div className="reference-code-line"><pre><code>{item.syntax}</code></pre><CopyControl value={item.syntax} label={`${item.command} syntax`} /></div>
                  </section>
                  <section>
                    <span>EXAMPLE{item.examples.length === 1 ? "" : "S"}</span>
                    {item.examples.map((example) => <div className="reference-code-line" key={example}><pre><code>{example}</code></pre><CopyControl value={example} label={`${item.command} example`} /></div>)}
                  </section>
                  <section>
                    <span>OPERATIONAL CONTEXT</span>
                    <p>{item.explanation}</p>
                  </section>
                  {item.warnings.length ? <section className="reference-warning"><span><AlertTriangle aria-hidden="true" />CHANGE CAUTION</span>{item.warnings.map((warning) => <p key={warning}>{warning}</p>)}</section> : null}
                </div>
                <aside className="reference-command-aside">
                  <dl>
                    <div><dt>PLATFORM</dt><dd>{item.platform}</dd></div>
                    <div><dt>LEVEL</dt><dd>{item.level}</dd></div>
                    <div><dt>MODE</dt><dd>{item.mode}</dd></div>
                    <div><dt>STATUS</dt><dd>{item.status}</dd></div>
                  </dl>
                  <div className="reference-notes"><span>OPERATING NOTES</span>{item.operationalNotes.map((note) => <p key={note}>{note}</p>)}</div>
                  {item.commonOptions.length ? <div className="reference-related"><span>COMMON OPTIONS</span>{item.commonOptions.map((option) => <code key={option}>{option}</code>)}</div> : null}
                  {item.verification.length ? <div className="reference-related"><span>VERIFY WITH</span>{item.verification.map((command) => <button type="button" key={command} onClick={() => searchFor(command)}>{command}</button>)}</div> : null}
                  {item.related.length ? <div className="reference-related"><span>RELATED COMMANDS</span>{item.related.map((command) => <button type="button" key={command} onClick={() => searchFor(command)}>{command}</button>)}</div> : null}
                  {item.toolLinks.length ? <div className="reference-tool-links"><span><Wrench aria-hidden="true" />RELATED TOOLS</span>{item.toolLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div> : null}
                  <a className="reference-source" href={item.source.href} target="_blank" rel="noreferrer">{item.source.label}<ExternalLink aria-hidden="true" /></a>
                </aside>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="reference-empty">
          <TerminalSquare aria-hidden="true" />
          <h2>No reference entry matched.</h2>
          <p>Broaden the query or clear one of the active filters.</p>
          <button type="button" onClick={reset}>RESET REFERENCE</button>
        </div>
      )}

      {visible.length < results.length ? <button type="button" className="reference-load-more" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>SHOW {Math.min(PAGE_SIZE, results.length - visible.length)} MORE <span>{visible.length} / {results.length}</span></button> : null}
    </div>
  );
}

function FilterSelect({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="reference-filter" htmlFor={id}><span>{label}</span><select id={id} value={value} onChange={(event) => onChange(event.target.value)}><option value="ALL">All {label.toLowerCase()}s</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
}
