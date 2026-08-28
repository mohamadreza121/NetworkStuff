import { z } from "zod";

export const LINUX_CURRICULUM_VERSION = "Network Operations 2026" as const;

export const linuxPracticeLevelSchema = z.enum(["Quick Try", "Mini Lab", "Full Lab"]);

export const linuxReferenceSchema = z.object({
  label: z.string(),
  href: z.string(),
  kind: z.enum(["official", "manual", "reference", "tool", "lab"]),
});

export const linuxLessonSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  slug: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  summary: z.string(),
  curriculumVersion: z.literal(LINUX_CURRICULUM_VERSION),
  capabilityIds: z.array(z.string()).min(1),
  estimatedMinutes: z.number().int().min(10).max(40),
  level: z.enum(["FOUNDATION", "JUNIOR", "PROFESSIONAL"]),
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
  safetyNotes: z.array(z.string()).min(1),
  mistakes: z.array(z.string()).min(2),
  troubleshooting: z.array(z.object({
    symptom: z.string(),
    check: z.string(),
    fix: z.string(),
  })).min(2),
  fieldUse: z.string(),
  practice: z.object({
    level: linuxPracticeLevelSchema,
    durationMinutes: z.number().int().min(5).max(90),
    title: z.string(),
    scenario: z.string(),
    tasks: z.array(z.string()).min(2),
    successCriteria: z.array(z.string()).min(2),
    injectedFault: z.string().optional(),
    href: z.string().optional(),
  }),
  checkUnderstanding: z.array(z.object({ question: z.string(), answer: z.string() })).min(2),
  references: z.array(linuxReferenceSchema).min(2),
  related: z.array(z.object({
    label: z.string(),
    href: z.string(),
    kind: z.enum(["lesson", "module", "tool", "lab", "reference"]),
  })),
});

export const linuxCapabilitySchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
});

export const linuxModuleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  outcome: z.string(),
  capabilityGroup: z.string(),
  sourceLinks: z.array(linuxReferenceSchema).min(1),
});

export type LinuxPracticeLevel = z.infer<typeof linuxPracticeLevelSchema>;
export type LinuxLesson = z.infer<typeof linuxLessonSchema>;
export type LinuxModule = z.infer<typeof linuxModuleSchema>;
export type LinuxCapability = z.infer<typeof linuxCapabilitySchema>;

export const defineLinuxLessons = (input: unknown): LinuxLesson[] => z.array(linuxLessonSchema).parse(input);
export const defineLinuxModules = (input: unknown): LinuxModule[] => z.array(linuxModuleSchema).parse(input);
export const defineLinuxCapabilities = (input: unknown): LinuxCapability[] => z.array(linuxCapabilitySchema).parse(input);
