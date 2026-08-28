import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import path from "node:path";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, watch: { ignored: ["**/dist/**", "**/.next/**"] } },
});

after(async () => vite.close());

test("covers every Linux network-operations capability", async () => {
  const catalog = await vite.ssrLoadModule("/content/linux/network-engineering/index.ts");

  assert.equal(catalog.linuxContentStats.modules, 12);
  assert.equal(catalog.linuxContentStats.lessons, 71);
  assert.equal(catalog.linuxContentStats.exercises, 71);
  assert.equal(catalog.linuxContentStats.capabilitiesTotal, 71);
  assert.equal(catalog.linuxContentStats.capabilitiesCovered, 71);
  assert.equal(catalog.linuxContentStats.capabilitiesMissing, 0);
  assert.deepEqual(catalog.linuxMissingCapabilities, []);
  assert.ok(catalog.linuxCoverageMatrix.every((entry) => entry.lessons.length > 0));
  assert.equal(new Set(catalog.linuxCoverageMatrix.map((entry) => entry.capability.id)).size, 71);
});

test("keeps the Linux catalog ordered, focused, safe, and practice-backed", async () => {
  const { linuxLessons, linuxModules, getLinuxModuleLessons } = await vite.ssrLoadModule("/content/linux/network-engineering/index.ts");

  assert.deepEqual(linuxModules.map((moduleEntry) => moduleEntry.order), Array.from({ length: 12 }, (_, index) => index + 1));
  assert.equal(new Set(linuxLessons.map((lesson) => lesson.id)).size, linuxLessons.length);
  assert.equal(new Set(linuxLessons.map((lesson) => `${lesson.moduleId}/${lesson.slug}`)).size, linuxLessons.length);
  assert.equal(new Set(linuxLessons.map((lesson) => lesson.mentalModel)).size, linuxLessons.length);
  assert.ok(linuxLessons.every((lesson) => lesson.curriculumVersion === "Network Operations 2026"));
  assert.ok(linuxLessons.every((lesson) => lesson.estimatedMinutes >= 10 && lesson.estimatedMinutes <= 40));
  assert.ok(linuxLessons.every((lesson) => lesson.outcomes.length >= 2 && lesson.prerequisites.length >= 1));
  assert.ok(linuxLessons.every((lesson) => lesson.practice.tasks.length >= 2 && lesson.practice.successCriteria.length >= 2));
  assert.ok(linuxLessons.every((lesson) => lesson.mechanics.length >= 3 && lesson.terminology.length >= 3));
  assert.ok(linuxLessons.every((lesson) => lesson.command.code.length > 12 && lesson.verification.code.length > 8));
  assert.ok(linuxLessons.every((lesson) => lesson.verification.expected.length >= 2 && lesson.verification.checks.length >= 2));
  assert.ok(linuxLessons.every((lesson) => lesson.safetyNotes.length >= 1 && lesson.mistakes.length >= 2));
  assert.ok(linuxLessons.every((lesson) => lesson.troubleshooting.length >= 2 && lesson.checkUnderstanding.length >= 2));
  assert.ok(linuxLessons.every((lesson) => lesson.references.length >= 2 && lesson.references.every((reference) => reference.href.startsWith("https://"))));
  assert.ok(linuxLessons.every((lesson) => lesson.references.some((reference) => reference.kind === "official" || reference.kind === "manual")));
  for (const moduleEntry of linuxModules) {
    const lessons = getLinuxModuleLessons(moduleEntry.id);
    assert.ok(lessons.length >= 5, `${moduleEntry.id} has too few lessons`);
    assert.deepEqual(lessons.map((lesson) => lesson.order), Array.from({ length: lessons.length }, (_, index) => index + 1));
    assert.ok(lessons.every((lesson) => lesson.capabilityIds.every((id) => id.startsWith(`LIN-${moduleEntry.order}.`))));
  }
});

test("resolves Linux module, lesson, practice, reference, and legacy links", async () => {
  const catalog = await vite.ssrLoadModule("/content/linux/network-engineering/index.ts");
  const { labs } = await vite.ssrLoadModule("/content/labs.ts");
  const { projects, projectHref } = await vite.ssrLoadModule("/content/projects.ts");

  const valid = new Set([
    "/learn/linux", "/reference/linux", "/labs", "/tools", "/learn", "/projects", "/automation",
    ...catalog.linuxModules.map((moduleEntry) => catalog.linuxModulePath(moduleEntry.id)),
    ...catalog.linuxLessons.map(catalog.linuxLessonPath),
    ...labs.map((lab) => `/labs/${lab.slug}`),
    ...projects.map(projectHref),
  ]);

  for (const target of Object.values(catalog.linuxLegacyRoutes)) assert.ok(valid.has(target), `bad legacy target: ${target}`);
  for (const lesson of catalog.linuxLessons) {
    const links = [lesson.practice.href, ...lesson.references.map((item) => item.href), ...lesson.related.map((item) => item.href)].filter(Boolean);
    for (const href of links) {
      if (href.startsWith("http")) continue;
      const pathname = href.split(/[?#]/)[0];
      if (pathname.startsWith("/downloads/")) {
        await access(path.join(root, "public", pathname.replace(/^\//, "")));
      } else {
        assert.ok(valid.has(pathname), `unresolved Linux link: ${href} in ${lesson.id}`);
      }
    }
  }
});

test("indexes every Linux lesson, module, command, and exact capability ID", async () => {
  const catalog = await vite.ssrLoadModule("/content/linux/network-engineering/index.ts");
  const { searchIndex } = await vite.ssrLoadModule("/lib/search-index.ts");

  for (const moduleEntry of catalog.linuxModules) {
    assert.ok(searchIndex.some((record) => record.href === catalog.linuxModulePath(moduleEntry.id)), `missing module search record: ${moduleEntry.id}`);
  }
  for (const lesson of catalog.linuxLessons) {
    const href = catalog.linuxLessonPath(lesson);
    const records = searchIndex.filter((item) => item.href === href && item.category === "Lesson");
    assert.equal(records.length, 1, `expected one lesson search record: ${lesson.id}`);
    const record = records[0];
    for (const capability of lesson.capabilityIds) assert.match(record.keywords, new RegExp(`(^|\\s)${capability.replaceAll(".", "\\.")}($|\\s)`));
    assert.ok(lesson.command.code.split("\n").some((line) => line.trim() && record.keywords.includes(line.trim())));
  }
});
