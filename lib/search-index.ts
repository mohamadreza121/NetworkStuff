import { glossaryTerms } from "@/content/glossary";
import { ccnaLessonPath, ccnaLessons, ccnaModulePath, getCcnaModuleLessons } from "@/content/cisco/ccna";
import { ccnaModules } from "@/content/cisco/ccna/modules";
import { ccnaObjectiveById } from "@/content/cisco/ccna/objectives";
import { hubs } from "@/content/hubs";
import { interviewQuestions } from "@/content/interviews";
import { labs } from "@/content/labs";
import { lessons } from "@/content/lessons";
import { projectHref, projects } from "@/content/projects";
import { referencePlatforms } from "@/content/reference";
import { troubleshootingScenarios } from "@/content/troubleshooting";

export type SearchCategory = "Navigate" | "Technology" | "Lesson" | "Lab" | "Project" | "Command" | "Tool" | "Troubleshooting" | "Interview" | "Glossary" | "Reference";
export type SearchRecord = { title: string; description: string; category: SearchCategory; href: string; keywords: string; meta?: string };

const navigation: SearchRecord[] = [
  { title: "Career roadmap", description: "Move from networking foundations to advanced engineering.", category: "Navigate", href: "/roadmap", keywords: "career path foundation junior professional senior" },
  { title: "Learning systems", description: "Browse every technology hub and representative lesson.", category: "Navigate", href: "/learn", keywords: "learn curriculum technology" },
  { title: "Lab library", description: "Practice Cisco, Linux, GNS3, and Ansible workflows.", category: "Lab", href: "/labs", keywords: "practice packet tracer gns3 linux ansible" },
  { title: "Command reference center", description: "Search Linux, Cisco IOS, PAN-OS, FortiOS, Git, and Ansible commands.", category: "Reference", href: "/reference", keywords: "linux cisco ios ios-xe palo alto pan-os fortigate fortios git ansible command reference" },
  { title: "OSPF configuration lesson", description: "Jump directly to the single-area OSPF configuration, verification, and repair workflow.", category: "Reference", href: "/learn/cisco/ccna/routing/ospf-neighbors-and-router-id#configure", keywords: "3.4.a 3.4.d ospf router network area passive interface configuration verification" },
  { title: "Network automation", description: "Python, Ansible, APIs, Git, and validation.", category: "Navigate", href: "/automation", keywords: "python ansible api git pipeline netmiko" },
  { title: "Firewall systems", description: "Palo Alto and FortiGate learning routes.", category: "Navigate", href: "/firewalls", keywords: "firewall palo alto fortigate nat policy" },
  { title: "GNS3 setup", description: "Install and validate a legal network lab platform.", category: "Navigate", href: "/gns3", keywords: "gns3 install lab vm" },
  { title: "Project showcase", description: "Portfolio-ready GNS3 and Packet Tracer engineering case studies.", category: "Navigate", href: "/projects", keywords: "project portfolio showcase enterprise packet tracer gns3" },
  { title: "Troubleshooting center", description: "Investigate incidents from symptom to verified root cause.", category: "Troubleshooting", href: "/troubleshooting", keywords: "incident diagnose failure evidence root cause" },
  { title: "Interview center", description: "Practice role-based network engineering questions and reasoning.", category: "Interview", href: "/interview", keywords: "career interview ccna ccnp junior question" },
  { title: "Job-ready checklist", description: "Map junior network engineering skills using device-local progress.", category: "Navigate", href: "/job-ready", keywords: "job career checklist portfolio readiness" },
  { title: "Network glossary", description: "Fast definitions and operational context for core terms.", category: "Glossary", href: "/glossary", keywords: "definition arp bgp cidr dns ospf vlan vrf" },
];

const hubRecords: SearchRecord[] = hubs.map((hub) => ({ title: hub.title, description: hub.description, category: "Technology", href: `/learn/${hub.slug.join("/")}`, keywords: `${hub.code} ${hub.outcomes.join(" ")}`, meta: hub.level }));
const ccnaModuleRecords: SearchRecord[] = ccnaModules.map((moduleEntry) => ({ title: `CCNA · ${moduleEntry.title}`, description: moduleEntry.description, category: "Technology", href: ccnaModulePath(moduleEntry.id), keywords: `${moduleEntry.domains.join(" ")} ${moduleEntry.sourceChapters.join(" ")} ${getCcnaModuleLessons(moduleEntry.id).flatMap((lesson) => lesson.examObjectives).join(" ")}`, meta: `CCNA 200-301 v1.1 · ${getCcnaModuleLessons(moduleEntry.id).length} LESSONS` }));
const lessonRecords: SearchRecord[] = lessons.map((lesson) => ({ title: lesson.title, description: lesson.description, category: "Lesson", href: `/learn/${lesson.slug.join("/")}`, keywords: `${lesson.technology} ${lesson.certification ?? ""} ${lesson.objectives.join(" ")} ${lesson.command.code}`, meta: `${lesson.technology} · ${lesson.estimatedTime}` }));
const ccnaObjectiveRecords: SearchRecord[] = ccnaLessons.map((lesson) => ({ title: lesson.title, description: lesson.summary, category: "Lesson", href: ccnaLessonPath(lesson), keywords: `${lesson.examVersion} ${lesson.examObjectives.join(" ")} ${lesson.examObjectives.map((id) => ccnaObjectiveById.get(id)?.title ?? "").join(" ")} ${lesson.terminology.map((item) => item.term).join(" ")} ${lesson.practice.title} ${lesson.command.code} ${lesson.verification.code}`, meta: `CCNA ${lesson.examVersion} · ${lesson.practice.level}` }));
const labRecords: SearchRecord[] = labs.map((lab) => ({ title: lab.title, description: lab.description, category: "Lab", href: `/labs/${lab.slug}`, keywords: `${lab.platform} ${lab.level} ${lab.skills.join(" ")} ${lab.requirements.join(" ")}`, meta: `${lab.platform} · ${lab.duration}` }));
const referencePlatformRecords: SearchRecord[] = referencePlatforms.map((definition) => ({ title: definition.title, description: definition.description, category: "Reference", href: `/reference/${definition.slug}`, keywords: `${definition.platform} ${definition.commands.map((item) => item.category).join(" ")}`, meta: `${definition.commands.length} ENTRIES` }));
const commandRecords: SearchRecord[] = referencePlatforms.flatMap((definition) => definition.commands.map((item) => ({ title: item.command, description: item.purpose, category: "Command" as const, href: `/reference/${definition.slug}?q=${encodeURIComponent(item.command)}`, keywords: `${item.platform} ${item.category} ${item.mode} ${item.level} ${item.examples.join(" ")} ${item.aliases.join(" ")} ${item.tags.join(" ")}`, meta: `${definition.shortTitle.toUpperCase()} · ${item.category.toUpperCase()}` })));
const projectRecords: SearchRecord[] = projects.map((project) => ({ title: project.title, description: project.summary, category: "Project", href: projectHref(project), keywords: `${project.platform} ${project.category} ${project.level} ${project.technologies.join(" ")}`, meta: `${project.platform.toUpperCase()} · ${project.level}` }));
const troubleshootingRecords: SearchRecord[] = troubleshootingScenarios.map((scenario) => ({ title: scenario.title, description: scenario.symptoms[0], category: "Troubleshooting", href: `/troubleshooting/${scenario.slug}`, keywords: `${scenario.category} ${scenario.technology} ${scenario.possibleCauses.join(" ")} ${scenario.evidence.join(" ")}`, meta: `${scenario.technology.toUpperCase()} · ${scenario.difficulty}` }));
const interviewRecords: SearchRecord[] = interviewQuestions.map((item) => ({ title: item.question, description: item.reasoning, category: "Interview", href: `/interview?q=${encodeURIComponent(item.technology)}`, keywords: `${item.role} ${item.category} ${item.technology} ${item.hint}`, meta: `${item.technology.toUpperCase()} · ${item.level}` }));
const glossaryRecords: SearchRecord[] = glossaryTerms.map((entry) => ({ title: entry.term, description: entry.definition, category: "Glossary", href: `/glossary?q=${encodeURIComponent(entry.term)}`, keywords: `${entry.expanded} ${entry.whyItMatters} ${entry.relatedTerms.join(" ")}`, meta: entry.expanded }));
const toolRecords: SearchRecord[] = [
  { title: "IPv4 Subnet Calculator", description: "Calculate network, broadcast, mask, wildcard, host range, and capacity.", category: "Tool", href: "/tools/subnet-calculator", keywords: "ipv4 cidr prefix subnet binary usable hosts", meta: "IP ADDRESSING · OPERATIONAL" },
  { title: "VLSM Planner", description: "Allocate named IPv4 requirements largest-first without overlap.", category: "Tool", href: "/tools/vlsm-planner", keywords: "vlsm variable length subnet host requirement address plan p2p 31", meta: "IP ADDRESSING · OPERATIONAL" },
  { title: "IPv6 Helper", description: "Expand, compress, classify, and subdivide exact 128-bit IPv6 addresses.", category: "Tool", href: "/tools/ipv6-helper", keywords: "ipv6 expand compress rfc 5952 prefix 64 128 documentation ula link local multicast", meta: "IP ADDRESSING · OPERATIONAL" },
  { title: "Wildcard Mask Calculator", description: "Convert a subnet mask or CIDR prefix into a Cisco wildcard.", category: "Tool", href: "/tools/wildcard-calculator", keywords: "cisco acl ospf inverse mask wildcard", meta: "CISCO · OPERATIONAL" },
  { title: "OSPF Cost Calculator", description: "Compare interface costs under a documented reference bandwidth.", category: "Tool", href: "/tools/ospf-cost-calculator", keywords: "ospf cost reference bandwidth interface auto-cost routing metric", meta: "ROUTING · OPERATIONAL" },
  { title: "EIGRP Metric & Feasibility", description: "Calculate classic EIGRP metrics and classify feasible successors.", category: "Tool", href: "/tools/eigrp-calculator", keywords: "eigrp metric k1 k2 k3 k4 k5 bandwidth delay feasible successor reported distance", meta: "ROUTING · OPERATIONAL" },
  { title: "Cisco ACL Builder", description: "Generate ordered standard or extended IOS access lists with validation.", category: "Tool", href: "/tools/acl-builder", keywords: "cisco ios acl access list wildcard permit deny tcp udp icmp port established log", meta: "SECURITY · OPERATIONAL" },
];

export const searchIndex: SearchRecord[] = [...navigation, ...hubRecords, ...ccnaModuleRecords, ...lessonRecords.filter((record) => !record.href.startsWith("/learn/cisco/ccna/")), ...ccnaObjectiveRecords, ...labRecords, ...projectRecords, ...referencePlatformRecords, ...commandRecords, ...toolRecords, ...troubleshootingRecords, ...interviewRecords, ...glossaryRecords];
export const searchCategories: SearchCategory[] = ["Navigate", "Technology", "Lesson", "Lab", "Project", "Troubleshooting", "Command", "Tool", "Interview", "Glossary", "Reference"];
