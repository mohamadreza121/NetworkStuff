import { ccnaModuleById } from "@/content/cisco/ccna/modules";
import { ccnaObjectiveById } from "@/content/cisco/ccna/objectives";
import { CCNA_EXAM_VERSION, ccnaLessonSchema, type CcnaLesson, type CcnaPracticeLevel } from "@/content/cisco/ccna/types";

type Pair = [string, string];
type Fault = [string, string, string];
type Question = [string, string];
type Link = [string, string, "lesson" | "module" | "tool" | "lab" | "reference"];
type Reference = [string, string | undefined, "official" | "book" | "reference" | "tool" | "lab"];

export type CcnaLessonSeed = {
  moduleId: string;
  order: number;
  slug: string;
  title: string;
  summary: string;
  objectives: string[];
  minutes?: number;
  level?: "FOUNDATION" | "JUNIOR";
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
  mistakes: [string, string, ...string[]];
  faults: [Fault, Fault, ...Fault[]];
  examFocus: string;
  realWorld: string;
  practice: {
    level: CcnaPracticeLevel;
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

const OFFICIAL_TOPICS = "https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf";

export function makeCcnaLesson(seed: CcnaLessonSeed): CcnaLesson {
  const moduleEntry = ccnaModuleById.get(seed.moduleId);
  if (!moduleEntry) throw new Error(`Unknown CCNA module: ${seed.moduleId}`);
  for (const objectiveId of seed.objectives) {
    if (!ccnaObjectiveById.has(objectiveId)) throw new Error(`Unknown CCNA objective ${objectiveId} in ${seed.slug}`);
  }

  const prompt = seed.command.trimStart().startsWith("$") ? "$" : seed.command.includes("Switch") ? "Switch#" : "Router#";
  const code = seed.command.replace(/^\$ /gm, "");

  return ccnaLessonSchema.parse({
    id: `${seed.moduleId}:${seed.slug}`,
    moduleId: seed.moduleId,
    slug: seed.slug,
    order: seed.order,
    title: seed.title,
    summary: seed.summary,
    examVersion: CCNA_EXAM_VERSION,
    examObjectives: seed.objectives,
    estimatedMinutes: seed.minutes ?? 20,
    level: seed.level ?? "JUNIOR",
    prerequisites: seed.prerequisites ?? [moduleEntry.order === 1 ? "No prior Cisco experience" : "Network Foundations"],
    outcomes: seed.outcomes,
    whyItMatters: seed.why ?? seed.summary,
    mentalModel: seed.model,
    mechanics: seed.mechanics.map(([title, detail]) => ({ title, detail })),
    terminology: seed.terms.map(([term, definition]) => ({ term, definition })),
    diagram: { label: `${seed.title} operating path`, caption: seed.diagramCaption, nodes: seed.nodes },
    command: {
      title: seed.commandTitle,
      prompt,
      code,
      explanation: seed.commandNotes.map(([label, text]) => ({ label, text })),
    },
    verification: {
      intro: "Read the output as evidence: confirm the expected state, then test the traffic or control-plane behavior it should produce.",
      code: seed.verify,
      expected: seed.expected,
      checks: seed.checks ?? ["The configured state is present in the active device view.", "A direct test produces the expected counter, neighbor, route, or client result."],
    },
    mistakes: seed.mistakes,
    troubleshooting: seed.faults.map(([symptom, check, fix]) => ({ symptom, check, fix })),
    examFocus: seed.examFocus,
    realWorld: seed.realWorld,
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
      { label: `Cisco CCNA ${CCNA_EXAM_VERSION} exam topics`, href: OFFICIAL_TOPICS, kind: "official" },
      ...moduleEntry.sourceChapters.map((label) => ({ label, kind: "book" as const })),
      ...(seed.references ?? []).map(([label, href, kind]) => ({ label, href, kind })),
    ],
    related: (seed.related ?? []).map(([label, href, kind]) => ({ label, href, kind })),
  });
}
