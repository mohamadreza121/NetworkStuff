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

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  platform: z.enum(["GNS3", "Packet Tracer", "Automation"]),
  category: z.enum(["Foundations", "CCNA", "Switching", "Routing", "IPv6", "Security", "Troubleshooting", "Enterprise", "Automation"]),
  level: skillLevelSchema,
  estimatedMinutes: z.number().int().positive(),
  status: z.enum(["DRAFT", "READY"]),
  sites: z.number().int().positive(),
  devices: z.number().int().positive(),
  technologies: z.array(z.string()).min(2),
  summary: z.string(),
  featured: z.boolean().default(false),
  topology: z.object({
    nodes: z.array(z.string()).min(2),
    links: z.array(z.string()),
    caption: z.string(),
  }),
  architecture: z.array(z.string()).min(1),
  objectives: z.array(z.string()).min(2),
  skills: z.array(z.string()).min(2),
  prerequisites: z.array(z.string()).min(1),
  addressing: z.array(z.object({
    segment: z.string(),
    prefix: z.string(),
    purpose: z.string(),
  })),
  sections: z.object({
    switching: z.array(z.string()),
    routing: z.array(z.string()),
    security: z.array(z.string()),
    services: z.array(z.string()),
    automation: z.array(z.string()),
    validation: z.array(z.string()),
    troubleshooting: z.array(z.string()),
  }),
  downloads: z.object({
    practice: z.string(),
    solution: z.string(),
  }),
  relatedLessons: z.array(linkSchema),
  relatedLabs: z.array(linkSchema),
});

export const troubleshootingScenarioSchema = z.object({
  title: z.string(),
  slug: z.string(),
  difficulty: skillLevelSchema,
  technology: z.string(),
  category: z.enum(["Connectivity", "Layer 2", "Routing", "DNS", "DHCP", "NAT", "VPN", "Firewall", "Linux", "Wireless Concepts", "Automation", "Performance"]),
  symptoms: z.array(z.string()).min(1),
  knownInformation: z.array(z.string()).min(1),
  topology: z.object({ nodes: z.array(z.string()).min(2), links: z.array(z.string()), caption: z.string() }),
  possibleCauses: z.array(z.string()).min(2),
  investigation: z.array(z.string()).min(2),
  commands: z.object({ title: z.string(), prompt: z.string(), variant: terminalVariantSchema, code: z.string() }),
  evidence: z.array(z.string()).min(1),
  diagnosis: z.string(),
  fix: z.string(),
  verification: z.array(z.string()).min(1),
  rootCause: z.string(),
  remember: z.string(),
  relatedLessons: z.array(linkSchema),
});

export const interviewQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  level: skillLevelSchema,
  role: z.string(),
  category: z.enum(["Junior Network Engineer", "CCNA", "CCNP", "Linux", "Routing", "Switching", "BGP", "OSPF", "Firewalls", "Python", "Ansible", "Troubleshooting", "Behavioral / Practical"]),
  technology: z.string(),
  hint: z.string(),
  answer: z.string(),
  reasoning: z.string(),
  relatedLesson: linkSchema.optional(),
  relatedLab: linkSchema.optional(),
});

export const glossaryTermSchema = z.object({
  term: z.string(),
  expanded: z.string(),
  definition: z.string(),
  whyItMatters: z.string(),
  relatedTerms: z.array(z.string()),
  relatedLesson: linkSchema.optional(),
});

export const referencePlatformSchema = z.enum(["Linux", "Cisco IOS / IOS-XE", "Palo Alto PAN-OS", "FortiGate FortiOS", "Git", "Ansible"]);
export const referenceStatusSchema = z.enum(["CURRENT", "LEGACY"]);
export const referenceCommandSchema = z.object({
  command: z.string().min(1),
  platform: referencePlatformSchema,
  category: z.string().min(1),
  level: skillLevelSchema,
  mode: z.string().min(1),
  purpose: z.string().min(12),
  syntax: z.string().min(1),
  examples: z.array(z.string().min(1)).min(1),
  explanation: z.string().min(20),
  commonOptions: z.array(z.string()),
  verification: z.array(z.string()),
  related: z.array(z.string()),
  operationalNotes: z.array(z.string()).min(1),
  warnings: z.array(z.string()),
  aliases: z.array(z.string()),
  tags: z.array(z.string()).min(2),
  status: referenceStatusSchema,
  destructive: z.boolean(),
  legacy: z.boolean(),
  toolLinks: z.array(linkSchema),
  source: z.object({ label: z.string(), href: z.string().url() }),
});

export type Project = z.infer<typeof projectSchema>;
export type TroubleshootingScenario = z.infer<typeof troubleshootingScenarioSchema>;
export type InterviewQuestion = z.infer<typeof interviewQuestionSchema>;
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>;
export type ReferenceCommand = z.infer<typeof referenceCommandSchema>;
export type ReferencePlatform = z.infer<typeof referencePlatformSchema>;

export function defineLessons(input: unknown): Lesson[] {
  return z.array(lessonSchema).parse(input);
}

export const defineProjects = (input: unknown): Project[] => z.array(projectSchema).parse(input);
export const defineTroubleshootingScenarios = (input: unknown): TroubleshootingScenario[] => z.array(troubleshootingScenarioSchema).parse(input);
export const defineInterviewQuestions = (input: unknown): InterviewQuestion[] => z.array(interviewQuestionSchema).parse(input);
export const defineGlossaryTerms = (input: unknown): GlossaryTerm[] => z.array(glossaryTermSchema).parse(input);
export const defineReferenceCommands = (input: unknown): ReferenceCommand[] => z.array(referenceCommandSchema).parse(input);
