import { lessonSchema, type Lesson } from "@/content/schema";
import { foundationsAndOperationsLessons } from "@/content/linux/network-engineering/lessons-foundations-operations";
import { interfacesAndRoutingLessons } from "@/content/linux/network-engineering/lessons-interfaces-routing";
import { transportAndServicesLessons } from "@/content/linux/network-engineering/lessons-transport-services";
import { troubleshootingAndFirewallLessons } from "@/content/linux/network-engineering/lessons-troubleshooting-firewall";
import { tunnelsAndRoutingServicesLessons } from "@/content/linux/network-engineering/lessons-tunnels-routing-services";
import { virtualAutomationLessons } from "@/content/linux/network-engineering/lessons-virtual-automation";
import { reliabilityLessons } from "@/content/linux/network-engineering/lessons-reliability";
import { linuxCapabilities, linuxModuleById, linuxModules } from "@/content/linux/network-engineering/modules";
import type { LinuxLesson } from "@/content/linux/network-engineering/types";

export { linuxCapabilities, linuxModules };

const moduleOrder = new Map(linuxModules.map((moduleEntry) => [moduleEntry.id, moduleEntry.order]));

export const linuxLessons: LinuxLesson[] = [
  ...foundationsAndOperationsLessons,
  ...interfacesAndRoutingLessons,
  ...transportAndServicesLessons,
  ...troubleshootingAndFirewallLessons,
  ...tunnelsAndRoutingServicesLessons,
  ...virtualAutomationLessons,
  ...reliabilityLessons,
].sort((a, b) => (moduleOrder.get(a.moduleId) ?? 0) - (moduleOrder.get(b.moduleId) ?? 0) || a.order - b.order);

export function linuxModulePath(moduleId: string) {
  const moduleEntry = linuxModuleById.get(moduleId);
  if (!moduleEntry) throw new Error(`Unknown Linux module ${moduleId}`);
  return `/learn/linux/${moduleEntry.slug}`;
}

export function linuxLessonPath(lesson: LinuxLesson) {
  return `${linuxModulePath(lesson.moduleId)}/${lesson.slug}`;
}

export function getLinuxModuleByRoute(slug: string[]) {
  if (slug.length !== 2 || slug[0] !== "linux") return undefined;
  return linuxModules.find((moduleEntry) => moduleEntry.slug === slug[1]);
}

export function getLinuxLessonByRoute(slug: string[]) {
  if (slug.length !== 3 || slug[0] !== "linux") return undefined;
  const moduleEntry = linuxModules.find((item) => item.slug === slug[1]);
  if (!moduleEntry) return undefined;
  return linuxLessons.find((lesson) => lesson.moduleId === moduleEntry.id && lesson.slug === slug[2]);
}

export function getLinuxModuleLessons(moduleId: string) {
  return linuxLessons.filter((lesson) => lesson.moduleId === moduleId);
}

export const linuxLegacyRoutes: Record<string, string> = {
  "linux/foundations/shell-navigation": "/learn/linux/foundations/shell-navigation-and-files",
  "linux/foundations/file-permissions": "/learn/linux/foundations/users-permissions-and-sudo",
  "linux/foundations/process-inspection": "/learn/linux/foundations/packages-processes-and-resources",
  "linux/networking/ip-command": "/learn/linux/interfaces-addressing/packet-path-netlink-and-managers",
  "linux/networking/routing-table": "/learn/linux/routing-segmentation/kernel-routing-and-route-lookup",
  "linux/networking/dns-troubleshooting": "/learn/linux/network-services/dns-with-dig-and-resolvectl",
  "linux/networking/tcpdump-basics": "/learn/linux/troubleshooting-capture/tcpdump-capture-design",
  "linux/operations/systemd-services": "/learn/linux/system-operations/systemd-services-and-dependencies",
  "linux/operations/nftables-basics": "/learn/linux/firewall-nat-qos/nftables-tables-chains-rules-and-sets",
};

function asGenericLesson(lesson: LinuxLesson, index: number): Lesson {
  const moduleEntry = linuxModuleById.get(lesson.moduleId);
  if (!moduleEntry) throw new Error(`Unknown module for ${lesson.id}`);
  const previous = linuxLessons[index - 1];
  const next = linuxLessons[index + 1];
  return lessonSchema.parse({
    slug: ["linux", moduleEntry.slug, lesson.slug],
    title: lesson.title,
    description: lesson.summary,
    eyebrow: `LINUX NETWORK OPERATIONS / ${moduleEntry.shortTitle}`,
    level: lesson.level,
    technology: "Linux",
    certification: lesson.curriculumVersion,
    estimatedTime: `${lesson.estimatedMinutes} min`,
    status: "READY",
    prerequisites: lesson.prerequisites,
    objectives: [
      ...lesson.outcomes,
      ...lesson.capabilityIds.map((id) => `[${id}] ${linuxCapabilities.find((capability) => capability.id === id)?.title ?? "Linux capability"}`),
    ],
    overview: [lesson.whyItMatters, lesson.mentalModel],
    terminology: lesson.terminology,
    diagram: lesson.diagram,
    command: { ...lesson.command, variant: "linux" },
    verification: {
      intro: lesson.verification.intro,
      prompt: lesson.command.prompt,
      code: lesson.verification.code,
      checks: [...lesson.verification.expected, ...lesson.verification.checks],
    },
    troubleshooting: lesson.troubleshooting.map((item) => ({ symptom: item.symptom, check: item.check, reason: item.fix })),
    callouts: [
      { tone: "warning", title: "Safety boundary", body: lesson.safetyNotes.join(" ") },
      { tone: "success", title: "Field use", body: lesson.fieldUse },
    ],
    realWorld: lesson.fieldUse,
    interviewQuestions: lesson.checkUnderstanding,
    lab: {
      title: lesson.practice.title,
      description: `${lesson.practice.level} · ${lesson.practice.durationMinutes} min. ${lesson.practice.scenario}`,
      tasks: lesson.practice.tasks,
      href: lesson.practice.href,
    },
    previous: previous ? { label: previous.title, href: linuxLessonPath(previous), meta: linuxModuleById.get(previous.moduleId)?.shortTitle } : undefined,
    next: next ? { label: next.title, href: linuxLessonPath(next), meta: linuxModuleById.get(next.moduleId)?.shortTitle } : undefined,
  });
}

export const linuxLessonsAsGeneric = linuxLessons.map(asGenericLesson);

export const linuxCoverageMatrix = linuxCapabilities.map((capability) => {
  const lessons = linuxLessons.filter((lesson) => lesson.capabilityIds.includes(capability.id));
  return {
    capability,
    lessons: lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      href: linuxLessonPath(lesson),
      practice: lesson.practice.level,
      practiceMinutes: lesson.practice.durationMinutes,
      references: lesson.references.map((reference) => reference.label),
    })),
  };
});

export const linuxMissingCapabilities = linuxCoverageMatrix.filter((entry) => entry.lessons.length === 0).map((entry) => entry.capability.id);

const practiceCounts = Object.fromEntries(
  ["Quick Try", "Mini Lab", "Full Lab"].map((level) => [level, linuxLessons.filter((lesson) => lesson.practice.level === level).length]),
) as Record<"Quick Try" | "Mini Lab" | "Full Lab", number>;

export const linuxContentStats = {
  modules: linuxModules.length,
  lessons: linuxLessons.length,
  exercises: linuxLessons.length,
  labs: practiceCounts["Mini Lab"] + practiceCounts["Full Lab"],
  fullLabs: practiceCounts["Full Lab"],
  quickTries: practiceCounts["Quick Try"],
  diagrams: linuxLessons.filter((lesson) => lesson.diagram.nodes.length >= 2).length,
  configurations: linuxLessons.filter((lesson) => lesson.command.code.trim().length > 0).length,
  verifications: linuxLessons.filter((lesson) => lesson.verification.code.trim().length > 0).length,
  capabilitiesCovered: linuxCoverageMatrix.length - linuxMissingCapabilities.length,
  capabilitiesTotal: linuxCapabilities.length,
  capabilitiesMissing: linuxMissingCapabilities.length,
  practiceCounts,
};
