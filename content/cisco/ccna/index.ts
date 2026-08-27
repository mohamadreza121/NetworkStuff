import { lessonSchema, type Lesson, type TerminalVariant } from "@/content/schema";
import { automationLessons } from "@/content/cisco/ccna/lessons-automation";
import { foundationsAndIosLessons } from "@/content/cisco/ccna/lessons-foundations-ios";
import { routingLessons } from "@/content/cisco/ccna/lessons-routing";
import { securityLessons } from "@/content/cisco/ccna/lessons-security";
import { servicesLessons } from "@/content/cisco/ccna/lessons-services";
import { switchingCampusAddressingLessons } from "@/content/cisco/ccna/lessons-switching-addressing";
import { troubleshootingAndReviewLessons } from "@/content/cisco/ccna/lessons-troubleshooting-review";
import { wirelessLessons } from "@/content/cisco/ccna/lessons-wireless";
import { ccnaModuleById, ccnaModules } from "@/content/cisco/ccna/modules";
import { ccnaObjectives } from "@/content/cisco/ccna/objectives";
import { type CcnaLesson } from "@/content/cisco/ccna/types";

export { ccnaModules };

const moduleOrder = new Map(ccnaModules.map((moduleEntry) => [moduleEntry.id, moduleEntry.order]));

export const ccnaLessons: CcnaLesson[] = [
  ...foundationsAndIosLessons,
  ...switchingCampusAddressingLessons,
  ...routingLessons,
  ...servicesLessons,
  ...securityLessons,
  ...wirelessLessons,
  ...automationLessons,
  ...troubleshootingAndReviewLessons,
].sort((a, b) => (moduleOrder.get(a.moduleId) ?? 0) - (moduleOrder.get(b.moduleId) ?? 0) || a.order - b.order);

export function ccnaModulePath(moduleId: string) {
  const moduleEntry = ccnaModuleById.get(moduleId);
  if (!moduleEntry) throw new Error(`Unknown CCNA module ${moduleId}`);
  return `/learn/cisco/ccna/${moduleEntry.slug}`;
}

export function ccnaLessonPath(lesson: CcnaLesson) {
  return `${ccnaModulePath(lesson.moduleId)}/${lesson.slug}`;
}

export function getCcnaModuleByRoute(slug: string[]) {
  if (slug.length !== 3 || slug[0] !== "cisco" || slug[1] !== "ccna") return undefined;
  return ccnaModules.find((moduleEntry) => moduleEntry.slug === slug[2]);
}

export function getCcnaLessonByRoute(slug: string[]) {
  if (slug.length !== 4 || slug[0] !== "cisco" || slug[1] !== "ccna") return undefined;
  const moduleEntry = ccnaModules.find((item) => item.slug === slug[2]);
  if (!moduleEntry) return undefined;
  return ccnaLessons.find((lesson) => lesson.moduleId === moduleEntry.id && lesson.slug === slug[3]);
}

export function getCcnaModuleLessons(moduleId: string) {
  return ccnaLessons.filter((lesson) => lesson.moduleId === moduleId);
}

export const ccnaLegacyRoutes: Record<string, string> = {
  "cisco/ccna/ethernet-framing": "/learn/cisco/ccna/ethernet-switching/ethernet-frames",
  "cisco/ccna/vlan-trunks": "/learn/cisco/ccna/vlans-campus/dot1q-trunks",
  "cisco/ccna/spanning-tree": "/learn/cisco/ccna/vlans-campus/rapid-pvst",
  "cisco/ccna/static-routing": "/learn/cisco/ccna/routing/ipv4-static-routes",
  "cisco/ccna/ospf-fundamentals": "/learn/cisco/ccna/routing/ospf-neighbors-and-router-id",
  "cisco/ccna/standard-acls": "/learn/cisco/ccna/security/acl-logic-and-wildcards",
};

function asGenericLesson(lesson: CcnaLesson, index: number): Lesson {
  const moduleEntry = ccnaModuleById.get(lesson.moduleId);
  if (!moduleEntry) throw new Error(`Unknown module for ${lesson.id}`);
  const previous = ccnaLessons[index - 1];
  const next = ccnaLessons[index + 1];
  const variant: TerminalVariant = lesson.command.prompt === "$" ? "automation" : "cisco";
  return lessonSchema.parse({
    slug: ["cisco", "ccna", moduleEntry.slug, lesson.slug],
    title: lesson.title,
    description: lesson.summary,
    eyebrow: `CCNA / ${moduleEntry.shortTitle}`,
    level: lesson.level,
    technology: "Cisco IOS",
    certification: `CCNA ${lesson.examVersion}`,
    estimatedTime: `${lesson.estimatedMinutes} min`,
    status: "READY",
    prerequisites: lesson.prerequisites,
    objectives: [
      ...lesson.outcomes,
      ...lesson.examObjectives.map((id) => `[${id}] ${ccnaObjectives.find((objective) => objective.id === id)?.title ?? "CCNA objective"}`),
    ],
    overview: [lesson.whyItMatters, lesson.mentalModel],
    terminology: lesson.terminology,
    diagram: lesson.diagram,
    command: { ...lesson.command, variant },
    verification: {
      intro: lesson.verification.intro,
      prompt: lesson.command.prompt,
      code: lesson.verification.code,
      checks: [...lesson.verification.expected, ...lesson.verification.checks],
    },
    troubleshooting: lesson.troubleshooting.map((item) => ({ symptom: item.symptom, check: item.check, reason: item.fix })),
    callouts: [{ tone: "note", title: `Exam focus · ${lesson.examObjectives.join(", ")}`, body: lesson.examFocus }],
    realWorld: lesson.realWorld,
    interviewQuestions: lesson.checkUnderstanding,
    lab: {
      title: lesson.practice.title,
      description: `${lesson.practice.level} · ${lesson.practice.durationMinutes} min. ${lesson.practice.scenario}`,
      tasks: lesson.practice.tasks,
      href: lesson.practice.href,
    },
    previous: previous ? { label: previous.title, href: ccnaLessonPath(previous), meta: ccnaModuleById.get(previous.moduleId)?.shortTitle } : undefined,
    next: next ? { label: next.title, href: ccnaLessonPath(next), meta: ccnaModuleById.get(next.moduleId)?.shortTitle } : undefined,
  });
}

export const ccnaLessonsAsGeneric = ccnaLessons.map(asGenericLesson);

export const ccnaCoverageMatrix = ccnaObjectives.map((objective) => {
  const lessons = ccnaLessons.filter((lesson) => lesson.examObjectives.includes(objective.id));
  return {
    objective,
    lessons: lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      href: ccnaLessonPath(lesson),
      practice: lesson.practice.level,
      practiceMinutes: lesson.practice.durationMinutes,
      references: lesson.references.map((reference) => reference.label),
    })),
  };
});

export const ccnaMissingObjectives = ccnaCoverageMatrix.filter((entry) => entry.lessons.length === 0).map((entry) => entry.objective.id);

const practiceCounts = Object.fromEntries(
  ["Quick Try", "Mini Lab", "Full Lab"].map((level) => [level, ccnaLessons.filter((lesson) => lesson.practice.level === level).length]),
) as Record<"Quick Try" | "Mini Lab" | "Full Lab", number>;

export const ccnaContentStats = {
  modules: ccnaModules.length,
  lessons: ccnaLessons.length,
  exercises: ccnaLessons.length,
  labs: practiceCounts["Mini Lab"] + practiceCounts["Full Lab"],
  fullLabs: practiceCounts["Full Lab"],
  quickTries: practiceCounts["Quick Try"],
  diagrams: ccnaLessons.filter((lesson) => lesson.diagram.nodes.length >= 2).length,
  configurations: ccnaLessons.filter((lesson) => lesson.command.code.trim().length > 0).length,
  verifications: ccnaLessons.filter((lesson) => lesson.verification.code.trim().length > 0).length,
  objectivesCovered: ccnaCoverageMatrix.length - ccnaMissingObjectives.length,
  objectivesTotal: ccnaObjectives.length,
  objectivesMissing: ccnaMissingObjectives.length,
  practiceCounts,
};
