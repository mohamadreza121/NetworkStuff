import { linuxCommands } from "@/content/commands";
import { glossaryTerms } from "@/content/glossary";
import { hubs } from "@/content/hubs";
import { interviewQuestions } from "@/content/interviews";
import { labs } from "@/content/labs";
import { lessons } from "@/content/lessons";
import { projectHref, projects } from "@/content/projects";
import { troubleshootingScenarios } from "@/content/troubleshooting";

export type SearchCategory = "Navigate" | "Technology" | "Lesson" | "Lab" | "Project" | "Command" | "Tool" | "Troubleshooting" | "Interview" | "Glossary" | "Reference";
export type SearchRecord = { title: string; description: string; category: SearchCategory; href: string; keywords: string; meta?: string };

const navigation: SearchRecord[] = [
  { title: "Career roadmap", description: "Move from networking foundations to advanced engineering.", category: "Navigate", href: "/roadmap", keywords: "career path foundation junior professional senior" },
  { title: "Learning systems", description: "Browse every technology hub and representative lesson.", category: "Navigate", href: "/learn", keywords: "learn curriculum technology" },
  { title: "Lab library", description: "Practice Cisco, Linux, GNS3, and Ansible workflows.", category: "Lab", href: "/labs", keywords: "practice packet tracer gns3 linux ansible" },
  { title: "Linux command reference", description: "Search operational commands, expected signals, and next steps.", category: "Reference", href: "/reference/linux", keywords: "linux command ip route dns tcpdump ss" },
  { title: "OSPF configuration reference", description: "Jump directly to the reusable OSPF configuration and explanation.", category: "Reference", href: "/learn/cisco/ccna/ospf-fundamentals#configuration", keywords: "ospf router network area passive interface configuration" },
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
const lessonRecords: SearchRecord[] = lessons.map((lesson) => ({ title: lesson.title, description: lesson.description, category: "Lesson", href: `/learn/${lesson.slug.join("/")}`, keywords: `${lesson.technology} ${lesson.certification ?? ""} ${lesson.objectives.join(" ")} ${lesson.command.code}`, meta: `${lesson.technology} · ${lesson.estimatedTime}` }));
const labRecords: SearchRecord[] = labs.map((lab) => ({ title: lab.title, description: lab.description, category: "Lab", href: `/labs/${lab.slug}`, keywords: `${lab.platform} ${lab.level} ${lab.skills.join(" ")} ${lab.requirements.join(" ")}`, meta: `${lab.platform} · ${lab.duration}` }));
const commandRecords: SearchRecord[] = linuxCommands.map((item) => ({ title: item.command, description: item.purpose, category: "Command", href: `/reference/linux?q=${encodeURIComponent(item.command)}`, keywords: `${item.category} ${item.example} ${item.next.join(" ")}`, meta: item.category }));
const projectRecords: SearchRecord[] = projects.map((project) => ({ title: project.title, description: project.summary, category: "Project", href: projectHref(project), keywords: `${project.platform} ${project.category} ${project.level} ${project.technologies.join(" ")}`, meta: `${project.platform.toUpperCase()} · ${project.level}` }));
const troubleshootingRecords: SearchRecord[] = troubleshootingScenarios.map((scenario) => ({ title: scenario.title, description: scenario.symptoms[0], category: "Troubleshooting", href: `/troubleshooting/${scenario.slug}`, keywords: `${scenario.category} ${scenario.technology} ${scenario.possibleCauses.join(" ")} ${scenario.evidence.join(" ")}`, meta: `${scenario.technology.toUpperCase()} · ${scenario.difficulty}` }));
const interviewRecords: SearchRecord[] = interviewQuestions.map((item) => ({ title: item.question, description: item.reasoning, category: "Interview", href: `/interview?q=${encodeURIComponent(item.technology)}`, keywords: `${item.role} ${item.category} ${item.technology} ${item.hint}`, meta: `${item.technology.toUpperCase()} · ${item.level}` }));
const glossaryRecords: SearchRecord[] = glossaryTerms.map((entry) => ({ title: entry.term, description: entry.definition, category: "Glossary", href: `/glossary?q=${encodeURIComponent(entry.term)}`, keywords: `${entry.expanded} ${entry.whyItMatters} ${entry.relatedTerms.join(" ")}`, meta: entry.expanded }));
const toolRecords: SearchRecord[] = [
  { title: "IPv4 Subnet Calculator", description: "Calculate network, broadcast, mask, wildcard, host range, and capacity.", category: "Tool", href: "/tools/subnet-calculator", keywords: "ipv4 cidr prefix subnet binary usable hosts", meta: "IP ADDRESSING · OPERATIONAL" },
  { title: "Wildcard Mask Calculator", description: "Convert a subnet mask or CIDR prefix into a Cisco wildcard.", category: "Tool", href: "/tools/wildcard-calculator", keywords: "cisco acl ospf inverse mask wildcard", meta: "CISCO · OPERATIONAL" },
];

export const searchIndex: SearchRecord[] = [...navigation, ...hubRecords, ...lessonRecords, ...labRecords, ...projectRecords, ...commandRecords, ...toolRecords, ...troubleshootingRecords, ...interviewRecords, ...glossaryRecords];
export const searchCategories: SearchCategory[] = ["Navigate", "Technology", "Lesson", "Lab", "Project", "Troubleshooting", "Command", "Tool", "Interview", "Glossary", "Reference"];
