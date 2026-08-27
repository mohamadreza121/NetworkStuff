import { z } from "zod";

export const CCNA_EXAM_VERSION = "200-301 v1.1" as const;

export const ccnaPracticeLevelSchema = z.enum(["Quick Try", "Mini Lab", "Full Lab"]);

export const ccnaReferenceSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  kind: z.enum(["official", "book", "reference", "tool", "lab"]),
});

export const ccnaLessonSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  slug: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  summary: z.string(),
  examVersion: z.literal(CCNA_EXAM_VERSION),
  examObjectives: z.array(z.string()).min(1),
  estimatedMinutes: z.number().int().min(10).max(30),
  level: z.enum(["FOUNDATION", "JUNIOR"]),
  prerequisites: z.array(z.string()).min(1),
  outcomes: z.array(z.string()).min(2),
  whyItMatters: z.string(),
  mentalModel: z.string(),
  mechanics: z.array(z.object({ title: z.string(), detail: z.string() })).min(3),
  terminology: z.array(z.object({ term: z.string(), definition: z.string() })).min(3),
  diagram: z.object({
    label: z.string(),
    caption: z.string(),
    nodes: z.array(z.string()).min(2).max(5),
  }),
  command: z.object({
    title: z.string(),
    prompt: z.string(),
    code: z.string(),
    explanation: z.array(z.object({ label: z.string(), text: z.string() })).min(2),
  }),
  verification: z.object({
    intro: z.string(),
    code: z.string(),
    expected: z.array(z.string()).min(2),
    checks: z.array(z.string()).min(2),
  }),
  mistakes: z.array(z.string()).min(2),
  troubleshooting: z.array(z.object({
    symptom: z.string(),
    check: z.string(),
    fix: z.string(),
  })).min(2),
  examFocus: z.string(),
  realWorld: z.string(),
  practice: z.object({
    level: ccnaPracticeLevelSchema,
    durationMinutes: z.number().int().min(5).max(90),
    title: z.string(),
    scenario: z.string(),
    tasks: z.array(z.string()).min(2),
    successCriteria: z.array(z.string()).min(2),
    injectedFault: z.string().optional(),
    href: z.string().optional(),
  }),
  checkUnderstanding: z.array(z.object({ question: z.string(), answer: z.string() })).min(2),
  references: z.array(ccnaReferenceSchema).min(2),
  related: z.array(z.object({ label: z.string(), href: z.string(), kind: z.enum(["lesson", "module", "tool", "lab", "reference"]) })),
});

export const ccnaModuleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  outcome: z.string(),
  domains: z.array(z.string()).min(1),
  sourceChapters: z.array(z.string()).min(1),
});

export const ccnaObjectiveSchema = z.object({
  id: z.string(),
  domain: z.string(),
  domainNumber: z.number().int().min(1).max(6),
  weight: z.number().int().positive(),
  verb: z.enum(["describe", "explain", "compare", "configure", "verify", "interpret", "recognize"]),
  title: z.string(),
});

export type CcnaPracticeLevel = z.infer<typeof ccnaPracticeLevelSchema>;
export type CcnaLesson = z.infer<typeof ccnaLessonSchema>;
export type CcnaModule = z.infer<typeof ccnaModuleSchema>;
export type CcnaObjective = z.infer<typeof ccnaObjectiveSchema>;

export const defineCcnaLessons = (input: unknown): CcnaLesson[] => z.array(ccnaLessonSchema).parse(input);
export const defineCcnaModules = (input: unknown): CcnaModule[] => z.array(ccnaModuleSchema).parse(input);
export const defineCcnaObjectives = (input: unknown): CcnaObjective[] => z.array(ccnaObjectiveSchema).parse(input);
