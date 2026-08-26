import { z } from "zod";

export const skillLevelSchema = z.enum(["FOUNDATION", "JUNIOR", "PROFESSIONAL", "ADVANCED"]);
export const terminalVariantSchema = z.enum(["cisco", "linux", "automation", "firewall"]);

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  meta: z.string().optional(),
});

export const lessonSchema = z.object({
  slug: z.array(z.string()).min(2),
  title: z.string(),
  description: z.string(),
  eyebrow: z.string(),
  level: skillLevelSchema,
  technology: z.string(),
  certification: z.string().optional(),
  estimatedTime: z.string(),
  status: z.enum(["DRAFT", "READY", "UPDATED"]),
  prerequisites: z.array(z.string()),
  objectives: z.array(z.string()),
  overview: z.array(z.string()),
  terminology: z.array(z.object({ term: z.string(), definition: z.string() })),
  diagram: z.object({
    label: z.string(),
    caption: z.string(),
    nodes: z.array(z.string()).min(2),
  }).optional(),
  command: z.object({
    title: z.string(),
    prompt: z.string(),
    code: z.string(),
    variant: terminalVariantSchema,
    explanation: z.array(z.object({ label: z.string(), text: z.string() })),
  }),
  verification: z.object({
    intro: z.string(),
    prompt: z.string(),
    code: z.string(),
    checks: z.array(z.string()),
  }),
  troubleshooting: z.array(z.object({
    symptom: z.string(),
    check: z.string(),
    reason: z.string(),
  })),
  callouts: z.array(z.object({
    tone: z.enum(["note", "warning", "success"]),
    title: z.string(),
    body: z.string(),
  })).optional(),
  realWorld: z.string(),
  interviewQuestions: z.array(z.object({ question: z.string(), answer: z.string() })),
  lab: z.object({
    title: z.string(),
    description: z.string(),
    tasks: z.array(z.string()),
    href: z.string().optional(),
  }).optional(),
  downloads: z.array(z.object({
    title: z.string(),
    description: z.string(),
    href: z.string(),
    format: z.string(),
  })).optional(),
  video: z.object({ title: z.string(), duration: z.string() }).optional(),
  previous: linkSchema.optional(),
  next: linkSchema.optional(),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type SkillLevel = z.infer<typeof skillLevelSchema>;
export type TerminalVariant = z.infer<typeof terminalVariantSchema>;

export function defineLessons(input: unknown): Lesson[] {
  return z.array(lessonSchema).parse(input);
}
