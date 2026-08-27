"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

const readinessGroups = [
  { title: "Networking", items: ["IPv4", "Subnetting", "IPv6 basics", "ARP", "DNS", "DHCP", "VLAN", "Trunking", "STP", "Static Routing", "OSPF", "ACL", "NAT"] },
  { title: "Linux", items: ["SSH", "ip", "ip route", "ss", "systemctl", "journalctl", "dig", "tcpdump"] },
  { title: "Cisco", items: ["Cisco IOS navigation", "Interface configuration", "Show commands", "Configuration backup", "Layer 2 verification"] },
  { title: "Troubleshooting", items: ["Scope an incident", "Build hypotheses", "Collect evidence", "Verify both directions", "Document root cause"] },
  { title: "Tools", items: ["Wireshark", "Git", "GNS3", "Packet Tracer", "VS Code"] },
  { title: "Automation", items: ["Basic Python", "JSON", "YAML", "REST concepts", "Basic Ansible"] },
  { title: "Portfolio", items: ["CCNA lab", "GNS3 enterprise lab", "Troubleshooting case", "Linux networking project", "GitHub repository", "Network documentation"] },
  { title: "Interview Readiness", items: ["Explain packet flow", "Describe a failure method", "Discuss one project", "Give a root-cause example", "Ask operational questions"] },
];

const storageKey = "netpath-job-ready-v1";

export function JobReadyChecklist() {
  const [complete, setComplete] = useState<string[]>([]);
  useEffect(() => {
    let savedItems: string[] = [];
    try { const saved = window.localStorage.getItem(storageKey); if (saved) savedItems = JSON.parse(saved) as string[]; } catch { /* device-local state is optional */ }
    const timer = window.setTimeout(() => setComplete(savedItems), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const allItems = useMemo(() => readinessGroups.flatMap((group) => group.items.map((item) => `${group.title}:${item}`)), []);
  const progress = Math.round((complete.length / allItems.length) * 100);
  const toggle = (key: string) => setComplete((current) => { const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key]; try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* keep in-memory behavior */ } return next; });
  const reset = () => { setComplete([]); try { window.localStorage.removeItem(storageKey); } catch { /* keep in-memory behavior */ } };

  return <section className="readiness-checklist-section"><div className="page-shell"><div className="readiness-progress"><div><span>DEVICE-LOCAL CHECKLIST</span><h2>{progress}% readiness map complete</h2><p>This is a planning aid, not a certification. Progress stays only in this browser.</p></div><div className="readiness-gauge" aria-label={`${progress}% complete`}><strong>{progress}</strong><span>%</span><i style={{ "--progress": `${progress}%` } as React.CSSProperties} /></div><button type="button" onClick={reset} disabled={complete.length === 0}><RotateCcw aria-hidden="true" />Reset progress</button></div><div className="readiness-grid">{readinessGroups.map((group, groupIndex) => <section key={group.title}><span>{String(groupIndex + 1).padStart(2, "0")} / {group.title.toUpperCase()}</span><h3>{group.title}</h3><div>{group.items.map((item) => { const key = `${group.title}:${item}`; const checked = complete.includes(key); return <label key={key} className={checked ? "is-complete" : ""}><input type="checkbox" checked={checked} onChange={() => toggle(key)} /><i><Check aria-hidden="true" /></i><span>{item}</span></label>; })}</div></section>)}</div></div></section>;
}
