import { linuxCommands } from "@/content/commands";
import { hubs } from "@/content/hubs";
import { labs } from "@/content/labs";
import { lessons } from "@/content/lessons";

export type SearchCategory = "Navigate" | "Technology" | "Lesson" | "Lab" | "Command" | "Reference" | "Troubleshooting";
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
];

const hubRecords: SearchRecord[] = hubs.map((hub) => ({ title: hub.title, description: hub.description, category: "Technology", href: `/learn/${hub.slug.join("/")}`, keywords: `${hub.code} ${hub.outcomes.join(" ")}`, meta: hub.level }));
const lessonRecords: SearchRecord[] = lessons.map((lesson) => ({ title: lesson.title, description: lesson.description, category: "Lesson", href: `/learn/${lesson.slug.join("/")}`, keywords: `${lesson.technology} ${lesson.certification ?? ""} ${lesson.objectives.join(" ")} ${lesson.command.code}`, meta: `${lesson.technology} · ${lesson.estimatedTime}` }));
const labRecords: SearchRecord[] = labs.map((lab) => ({ title: lab.title, description: lab.description, category: "Lab", href: `/labs/${lab.slug}`, keywords: `${lab.platform} ${lab.level} ${lab.skills.join(" ")} ${lab.requirements.join(" ")}`, meta: `${lab.platform} · ${lab.duration}` }));
const commandRecords: SearchRecord[] = linuxCommands.map((item) => ({ title: item.command, description: item.purpose, category: "Command", href: `/reference/linux?q=${encodeURIComponent(item.command)}`, keywords: `${item.category} ${item.example} ${item.next.join(" ")}`, meta: item.category }));
const troubleshootingRecords: SearchRecord[] = lessons.slice(0, 16).map((lesson) => ({ title: `${lesson.title}: troubleshooting`, description: lesson.troubleshooting[0].reason, category: "Troubleshooting", href: `/learn/${lesson.slug.join("/")}#troubleshooting`, keywords: `${lesson.title} ${lesson.troubleshooting.map((item) => `${item.symptom} ${item.check}`).join(" ")}`, meta: lesson.technology }));

export const searchIndex: SearchRecord[] = [...navigation, ...hubRecords, ...lessonRecords, ...labRecords, ...commandRecords, ...troubleshootingRecords];
export const searchCategories: SearchCategory[] = ["Navigate", "Technology", "Lesson", "Lab", "Command", "Reference", "Troubleshooting"];
