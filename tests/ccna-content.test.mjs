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

test("covers every official CCNA 200-301 v1.1 leaf objective", async () => {
  const catalog = await vite.ssrLoadModule("/content/cisco/ccna/index.ts");
  const objectives = await vite.ssrLoadModule("/content/cisco/ccna/objectives.ts");

  assert.equal(catalog.ccnaContentStats.modules, 12);
  assert.equal(catalog.ccnaContentStats.lessons, 65);
  assert.equal(catalog.ccnaContentStats.exercises, 65);
  assert.equal(catalog.ccnaContentStats.objectivesTotal, 97);
  assert.equal(catalog.ccnaContentStats.objectivesCovered, 97);
  assert.deepEqual(catalog.ccnaMissingObjectives, []);
  assert.equal(objectives.ccnaDomains.reduce((sum, domain) => sum + domain.weight, 0), 100);
  assert.ok(catalog.ccnaCoverageMatrix.every((entry) => entry.lessons.length > 0));
  assert.equal(new Set(catalog.ccnaCoverageMatrix.map((entry) => entry.objective.id)).size, 97);
});

test("keeps the CCNA catalog ordered, focused, original, and practice-backed", async () => {
  const { ccnaLessons, ccnaModules, getCcnaModuleLessons } = await vite.ssrLoadModule("/content/cisco/ccna/index.ts");

  assert.deepEqual(ccnaModules.map((moduleEntry) => moduleEntry.order), Array.from({ length: 12 }, (_, index) => index + 1));
  assert.equal(new Set(ccnaLessons.map((lesson) => lesson.id)).size, ccnaLessons.length);
  assert.equal(new Set(ccnaLessons.map((lesson) => `${lesson.moduleId}/${lesson.slug}`)).size, ccnaLessons.length);
  assert.equal(new Set(ccnaLessons.map((lesson) => lesson.mentalModel)).size, ccnaLessons.length);
  assert.ok(ccnaLessons.every((lesson) => lesson.examVersion === "200-301 v1.1"));
  assert.ok(ccnaLessons.every((lesson) => lesson.estimatedMinutes >= 10 && lesson.estimatedMinutes <= 30));
  assert.ok(ccnaLessons.every((lesson) => lesson.practice.tasks.length >= 2 && lesson.practice.successCriteria.length >= 2));
  assert.ok(ccnaLessons.every((lesson) => lesson.mechanics.length >= 3 && lesson.terminology.length >= 3));
  assert.ok(ccnaLessons.every((lesson) => lesson.command.code.length > 12 && lesson.verification.code.length > 8));
  assert.ok(ccnaLessons.every((lesson) => lesson.references.some((reference) => reference.kind === "official") && lesson.references.some((reference) => reference.kind === "book")));
  for (const moduleEntry of ccnaModules) {
    const lessons = getCcnaModuleLessons(moduleEntry.id);
    assert.ok(lessons.length >= 3, `${moduleEntry.id} has too few lessons`);
    assert.deepEqual(lessons.map((lesson) => lesson.order), Array.from({ length: lessons.length }, (_, index) => index + 1));
  }
});

test("resolves CCNA module, lesson, practice, reference, and legacy links", async () => {
  const catalog = await vite.ssrLoadModule("/content/cisco/ccna/index.ts");
  const { labs } = await vite.ssrLoadModule("/content/labs.ts");
  const { projects, projectHref } = await vite.ssrLoadModule("/content/projects.ts");

  const valid = new Set([
    "/learn/cisco/ccna", "/reference/cisco", "/labs", "/tools", "/learn", "/projects",
    "/tools/subnet-calculator", "/tools/vlsm-planner", "/tools/ipv6-helper", "/tools/wildcard-calculator",
    "/tools/ospf-cost-calculator", "/tools/acl-builder",
    ...catalog.ccnaModules.map((moduleEntry) => catalog.ccnaModulePath(moduleEntry.id)),
    ...catalog.ccnaLessons.map(catalog.ccnaLessonPath),
    ...labs.map((lab) => `/labs/${lab.slug}`),
    ...projects.map(projectHref),
  ]);

  for (const target of Object.values(catalog.ccnaLegacyRoutes)) assert.ok(valid.has(target), `bad legacy target: ${target}`);
  for (const lesson of catalog.ccnaLessons) {
    const links = [lesson.practice.href, ...lesson.references.map((item) => item.href), ...lesson.related.map((item) => item.href)].filter(Boolean);
    for (const href of links) {
      if (href.startsWith("http")) continue;
      const pathname = href.split(/[?#]/)[0];
      if (pathname.startsWith("/downloads/")) {
        await access(path.join(root, "public", pathname));
      } else {
        assert.ok(valid.has(pathname), `unresolved CCNA link: ${href} in ${lesson.id}`);
      }
    }
  }
});

test("indexes every CCNA lesson, module, command, and exact objective ID", async () => {
  const catalog = await vite.ssrLoadModule("/content/cisco/ccna/index.ts");
  const { searchIndex } = await vite.ssrLoadModule("/lib/search-index.ts");

  for (const moduleEntry of catalog.ccnaModules) {
    assert.ok(searchIndex.some((record) => record.href === catalog.ccnaModulePath(moduleEntry.id)), `missing module search record: ${moduleEntry.id}`);
  }
  for (const lesson of catalog.ccnaLessons) {
    const href = catalog.ccnaLessonPath(lesson);
    const record = searchIndex.find((item) => item.href === href && item.category === "Lesson");
    assert.ok(record, `missing lesson search record: ${lesson.id}`);
    for (const objective of lesson.examObjectives) assert.match(record.keywords, new RegExp(`(^|\\s)${objective.replaceAll(".", "\\.")}($|\\s)`));
    assert.ok(lesson.command.code.split("\n").some((line) => record.keywords.includes(line.trim())));
  }
});
