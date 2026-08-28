import { linuxCapabilityById, linuxModuleById } from "@/content/linux/network-engineering/modules";
import { LINUX_CURRICULUM_VERSION, linuxLessonSchema, type LinuxLesson, type LinuxPracticeLevel } from "@/content/linux/network-engineering/types";

type Pair = [string, string];
type Fault = [string, string, string];
type Question = [string, string];
type Link = [string, string, "lesson" | "module" | "tool" | "lab" | "reference"];
type Reference = [string, string, "official" | "manual" | "reference" | "tool" | "lab"];

export type LinuxLessonSeed = {
  moduleId: string;
  order: number;
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
  minutes?: number;
  level?: "FOUNDATION" | "JUNIOR" | "PROFESSIONAL";
  prerequisites?: string[];
  outcomes: [string, string, ...string[]];
  why?: string;
  model: string;
  mechanics: [Pair, Pair, Pair, ...Pair[]];
  terms: [Pair, Pair, Pair, ...Pair[]];
  nodes: [string, string, ...string[]];
  diagramCaption: string;
  commandTitle: string;
  command: string;
  commandNotes: [Pair, Pair, ...Pair[]];
  verify: string;
  expected: [string, string, ...string[]];
  checks?: string[];
  safety: [string, ...string[]];
  mistakes: [string, string, ...string[]];
  faults: [Fault, Fault, ...Fault[]];
  fieldUse: string;
  practice: {
    level: LinuxPracticeLevel;
    minutes: number;
    title: string;
    scenario: string;
    tasks: [string, string, ...string[]];
    success: [string, string, ...string[]];
    fault?: string;
    href?: string;
  };
  questions: [Question, Question, ...Question[]];
  references?: Reference[];
  related?: Link[];
};

export function makeLinuxLesson(seed: LinuxLessonSeed): LinuxLesson {
  const moduleEntry = linuxModuleById.get(seed.moduleId);
  if (!moduleEntry) throw new Error(`Unknown Linux module: ${seed.moduleId}`);
  for (const capabilityId of seed.capabilities) {
    if (!linuxCapabilityById.has(capabilityId)) throw new Error(`Unknown Linux capability ${capabilityId} in ${seed.slug}`);
  }

  return linuxLessonSchema.parse({
    id: `${seed.moduleId}:${seed.slug}`,
    moduleId: seed.moduleId,
    slug: seed.slug,
    order: seed.order,
    title: seed.title,
    summary: seed.summary,
    curriculumVersion: LINUX_CURRICULUM_VERSION,
    capabilityIds: seed.capabilities,
    estimatedMinutes: seed.minutes ?? 25,
    level: seed.level ?? (moduleEntry.order < 3 ? "FOUNDATION" : moduleEntry.order < 8 ? "JUNIOR" : "PROFESSIONAL"),
    prerequisites: seed.prerequisites ?? [moduleEntry.order === 1 ? "No prior Linux experience" : "Linux Foundations"],
    outcomes: seed.outcomes,
    whyItMatters: seed.why ?? seed.summary,
    mentalModel: seed.model,
    mechanics: seed.mechanics.map(([title, detail]) => ({ title, detail })),
    terminology: seed.terms.map(([term, definition]) => ({ term, definition })),
    diagram: { label: `${seed.title} operating path`, caption: seed.diagramCaption, nodes: seed.nodes },
    command: { title: seed.commandTitle, prompt: "$", code: seed.command.replace(/^\$ /gm, ""), explanation: seed.commandNotes.map(([label, text]) => ({ label, text })) },
    verification: {
      intro: "Treat output as evidence: confirm the exact namespace, interface, route, socket, service, or packet before changing state.",
      code: seed.verify,
      expected: seed.expected,
      checks: seed.checks ?? ["The active state matches the intended scope and values.", "A controlled test changes the expected counter, log, socket, route, or packet evidence."],
    },
    safetyNotes: seed.safety,
    mistakes: seed.mistakes,
    troubleshooting: seed.faults.map(([symptom, check, fix]) => ({ symptom, check, fix })),
    fieldUse: seed.fieldUse,
    practice: {
      level: seed.practice.level,
      durationMinutes: seed.practice.minutes,
      title: seed.practice.title,
      scenario: seed.practice.scenario,
      tasks: seed.practice.tasks,
      successCriteria: seed.practice.success,
      injectedFault: seed.practice.fault,
      href: seed.practice.href,
    },
    checkUnderstanding: seed.questions.map(([question, answer]) => ({ question, answer })),
    references: [
      { label: "Ubuntu Server documentation", href: "https://documentation.ubuntu.com/server/", kind: "official" as const },
      ...moduleEntry.sourceLinks,
      ...(seed.references ?? []).map(([label, href, kind]) => ({ label, href, kind })),
    ].filter((reference, index, all) => all.findIndex((item) => item.href === reference.href) === index),
    related: (seed.related ?? []).map(([label, href, kind]) => ({ label, href, kind })),
  });
}
