import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Braces, GitBranch, Workflow } from "lucide-react";
import { TerminalBlock } from "@/components/terminal-block";

export const metadata: Metadata = { title: "Network Automation", description: "A practical route from Git and Python to APIs, Ansible, validation, and controlled network change.", alternates: { canonical: "/automation" } };
const routes = [
  { code: "PY", icon: Braces, title: "Python", body: "Model inventory, parse state, call APIs, and write validation tests.", href: "/learn/python" },
  { code: "YML", icon: Workflow, title: "Ansible", body: "Collect state and deliver idempotent, reviewable change across a fleet.", href: "/learn/ansible" },
  { code: "GIT", icon: GitBranch, title: "Change workflow", body: "Version intent, review diffs, test assumptions, and preserve rollback evidence.", href: "/learn/automation/git/network-change-workflow" },
];
export default function AutomationPage() { return <main><section className="automation-hero"><div className="page-shell automation-hero-grid"><div><span>AUTOMATION CONTROL PLANE</span><h1>One source of truth.<br />Many devices.</h1><p>Build the engineering habits behind safe automation: structured inputs, deterministic execution, validation, review, and recovery.</p></div><TerminalBlock title="netops@control" prompt="$" variant="automation" code={"git diff -- configs/\npytest -q\nansible-playbook --check change.yml\npython validate_state.py"} /></div></section><section className="automation-routes"><div className="page-shell"><div className="hub-section-heading"><span>01 / LEARNING ROUTES</span><h2>Automate the workflow, not the guess.</h2><p>3 connected systems</p></div><div className="automation-route-grid">{routes.map((route) => { const Icon = route.icon; return <Link href={route.href} key={route.code}><span>{route.code}</span><Icon aria-hidden="true" /><h2>{route.title}</h2><p>{route.body}</p><strong>Open route <ArrowRight aria-hidden="true" /></strong></Link>; })}</div></div></section></main>; }
