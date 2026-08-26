import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: {
    middlewareMode: true,
    watch: { ignored: ["**/.sites-runtime/**", "**/dist/**", "**/.next/**"] },
  },
});

after(async () => {
  await vite.close();
});

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return readCssTree(entryPath);
      }
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("emits the catalog's animation and scrolling utilities", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /--tw-enter-opacity/);
  assert.match(css, /scrollbar-width:\s*thin/);
  assert.match(css, /scrollbar-width:\s*none/);
  assert.match(css, /scrollbar-gutter:\s*stable/);
  assert.match(css, /scroll-fade-reveal-b/);
  assert.match(css, /mask-image:/);
  assert.match(css, /tw-shimmer/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("forwards progress semantics to the primitive", async () => {
  const { Progress } = await vite.ssrLoadModule("/components/ui/progress.tsx");
  const html = renderToStaticMarkup(React.createElement(Progress, { value: 37 }));

  assert.match(html, /aria-valuenow="37"/);
  assert.match(html, /aria-valuetext="37%"/);
  assert.match(html, /data-state="loading"/);
});

test("emits chart themes for the starter's media dark mode", async () => {
  const { ChartStyle } = await vite.ssrLoadModule("/components/ui/chart.tsx");
  const html = renderToStaticMarkup(
    React.createElement(ChartStyle, {
      id: "contract",
      config: {
        latency: { theme: { light: "#ffffff", dark: "#000000" } },
      },
    }),
  );

  assert.match(html, /\[data-chart=contract\]/);
  assert.match(html, /@media \(prefers-color-scheme: dark\)/);
  assert.doesNotMatch(html, /\.dark/);
});

test("renders sidebar skeletons deterministically", async () => {
  const { SidebarMenuSkeleton } = await vite.ssrLoadModule(
    "/components/ui/sidebar.tsx",
  );
  const first = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));
  const second = renderToStaticMarkup(React.createElement(SidebarMenuSkeleton));

  assert.equal(first, second);
  assert.match(first, /--skeleton-width:70%/);
});

test("validates the Phase 2 content catalogs", async () => {
  const { lessons } = await vite.ssrLoadModule("/content/lessons.ts");
  const { hubs } = await vite.ssrLoadModule("/content/hubs.ts");
  const { labs } = await vite.ssrLoadModule("/content/labs.ts");
  const { linuxCommands } = await vite.ssrLoadModule("/content/commands.ts");

  assert.equal(lessons.length, 42);
  assert.equal(hubs.length, 6);
  assert.equal(labs.length, 6);
  assert.equal(linuxCommands.length, 24);
  assert.equal(new Set(lessons.map((lesson) => lesson.slug.join("/"))).size, lessons.length);
  assert.ok(lessons.every((lesson) => lesson.status === "READY"));
});

test("keeps lab practice content independent from protected solutions", async () => {
  const { labs } = await vite.ssrLoadModule("/content/labs.ts");
  for (const lab of labs) {
    assert.ok(lab.tasks.length >= 3);
    assert.ok(lab.solution.configuration.length > 40);
    assert.ok(!lab.starter.includes(lab.solution.configuration));
    assert.ok(lab.downloads.length >= 2);
  }
});

test("defines responsive safeguards for the requested QA widths", async () => {
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  for (const width of [1180, 1024, 768, 430, 390]) {
    assert.match(css, new RegExp(`@media \\(max-width: ${width}px\\)`));
  }
  assert.match(css, /body \{ overflow-x: hidden;/);
  assert.match(css, /\.address-table \{ overflow-x: auto;/);
  assert.match(css, /\.command-filters, \.lab-filter-row \{ flex-wrap: nowrap; overflow-x: auto;/);
});
