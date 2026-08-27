import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
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

test("validates the Phase 3 content catalogs and unique generated routes", async () => {
  const { projects, projectHref } = await vite.ssrLoadModule("/content/projects.ts");
  const { troubleshootingScenarios } = await vite.ssrLoadModule("/content/troubleshooting.ts");
  const { interviewQuestions } = await vite.ssrLoadModule("/content/interviews.ts");
  const { glossaryTerms } = await vite.ssrLoadModule("/content/glossary.ts");

  assert.equal(projects.length, 12);
  assert.equal(troubleshootingScenarios.length, 9);
  assert.equal(interviewQuestions.length, 12);
  assert.equal(glossaryTerms.length, 18);
  assert.equal(new Set(projects.map(projectHref)).size, projects.length);
  assert.equal(new Set(troubleshootingScenarios.map((item) => item.slug)).size, troubleshootingScenarios.length);
  assert.ok(projects.every((project) => project.downloads.practice && project.downloads.solution));
  assert.ok(troubleshootingScenarios.every((scenario) => scenario.evidence.length && scenario.verification.length));
});

test("expands global search across every Phase 3 resource type", async () => {
  const { searchCategories, searchIndex } = await vite.ssrLoadModule("/lib/search-index.ts");
  for (const category of ["Project", "Tool", "Troubleshooting", "Interview", "Glossary", "Technology", "Reference"]) {
    assert.ok(searchCategories.includes(category));
    assert.ok(searchIndex.some((record) => record.category === category));
  }
  const ospf = searchIndex.filter((record) => `${record.title} ${record.keywords}`.toLowerCase().includes("ospf"));
  assert.ok(ospf.some((record) => record.category === "Lesson"));
  assert.ok(ospf.some((record) => record.category === "Lab"));
  assert.ok(ospf.some((record) => record.category === "Project"));
  assert.ok(ospf.some((record) => record.category === "Troubleshooting"));
});

test("calculates exact IPv4 subnet boundaries and point-to-point capacity", async () => {
  const { calculateSubnet } = await vite.ssrLoadModule("/lib/network-tools.ts");
  const result = calculateSubnet("192.168.10.25", "/27");
  assert.deepEqual(
    { network: result.networkAddress, broadcast: result.broadcastAddress, mask: result.subnetMask, wildcard: result.wildcardMask, first: result.firstUsable, last: result.lastUsable, usable: result.usableHosts },
    { network: "192.168.10.0", broadcast: "192.168.10.31", mask: "255.255.255.224", wildcard: "0.0.0.31", first: "192.168.10.1", last: "192.168.10.30", usable: 30 },
  );
  assert.equal(calculateSubnet("10.0.0.0/31").usableHosts, 2);
  assert.equal(calculateSubnet("10.0.0.8/32").usableHosts, 1);
  assert.throws(() => calculateSubnet("300.1.1.1/24"), /between 0 and 255/);
});

test("converts CIDR and contiguous masks into Cisco wildcards", async () => {
  const { calculateWildcard } = await vite.ssrLoadModule("/lib/network-tools.ts");
  assert.deepEqual(calculateWildcard("255.255.255.0"), { subnetMask: "255.255.255.0", wildcardMask: "0.0.0.255", prefix: 24 });
  assert.deepEqual(calculateWildcard("/30"), { subnetMask: "255.255.255.252", wildcardMask: "0.0.0.3", prefix: 30 });
  assert.throws(() => calculateWildcard("255.0.255.0"), /contiguous/);
});

test("ships Phase 3 route, solution-gate, local-progress, and overflow safeguards", async () => {
  const routeFiles = [
    "app/projects/page.tsx", "app/projects/gns3/page.tsx", "app/troubleshooting/page.tsx",
    "app/interview/page.tsx", "app/job-ready/page.tsx", "app/tools/page.tsx",
    "app/tools/subnet-calculator/page.tsx", "app/tools/wildcard-calculator/page.tsx",
    "app/glossary/page.tsx", "app/about/page.tsx",
  ];
  for (const file of routeFiles) assert.ok((await readFile(path.join(root, file), "utf8")).length > 100);
  const incident = await readFile(path.join(root, "components/troubleshooting-detail.tsx"), "utf8");
  const readiness = await readFile(path.join(root, "components/job-ready-checklist.tsx"), "utf8");
  const css = await readFile(path.join(root, "app/globals.css"), "utf8");
  assert.match(incident, /Reveal diagnosis and fix/);
  assert.match(readiness, /localStorage/);
  assert.match(readiness, /Reset progress/i);
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("keeps Phase 3 related-content and download links resolvable", async () => {
  const { lessons } = await vite.ssrLoadModule("/content/lessons.ts");
  const { hubs } = await vite.ssrLoadModule("/content/hubs.ts");
  const { labs } = await vite.ssrLoadModule("/content/labs.ts");
  const { projects, projectHref } = await vite.ssrLoadModule("/content/projects.ts");
  const { troubleshootingScenarios } = await vite.ssrLoadModule("/content/troubleshooting.ts");
  const { interviewQuestions } = await vite.ssrLoadModule("/content/interviews.ts");
  const valid = new Set([
    "/", "/roadmap", "/learn", "/labs", "/projects", "/troubleshooting", "/interview", "/job-ready", "/tools", "/glossary", "/reference/linux", "/gns3", "/automation", "/firewalls", "/about",
    ...lessons.map((item) => `/learn/${item.slug.join("/")}`),
    ...hubs.map((item) => `/learn/${item.slug.join("/")}`),
    ...labs.map((item) => `/labs/${item.slug}`),
    ...projects.map(projectHref),
    ...troubleshootingScenarios.map((item) => `/troubleshooting/${item.slug}`),
  ]);
  const links = [
    ...projects.flatMap((item) => [...item.relatedLessons, ...item.relatedLabs]),
    ...troubleshootingScenarios.flatMap((item) => item.relatedLessons),
    ...interviewQuestions.flatMap((item) => [item.relatedLesson, item.relatedLab].filter(Boolean)),
  ];
  for (const link of links) assert.ok(valid.has(link.href), `unresolved related link: ${link.href}`);
  const downloads = new Set(projects.flatMap((item) => [item.downloads.practice, item.downloads.solution]));
  for (const href of downloads) await access(path.join(root, "public", href.replace(/^\//, "")));
});
