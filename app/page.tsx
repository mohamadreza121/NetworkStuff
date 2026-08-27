import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  CheckCircle2,
  CircleGauge,
  Download,
  FlaskConical,
  GitBranch,
  Network,
  Play,
  Route,
  Shield,
  ShieldAlert,
  Terminal,
  Wrench,
  Workflow,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { TerminalBlock } from "@/components/terminal-block";
import { TopologyHero } from "@/components/topology-hero";
import { careerStages, technologies } from "@/lib/site-data";

const learningRoutes = [
  {
    code: "ROUTE_01",
    icon: Network,
    title: "Start with the network",
    description: "Addressing, packets, switching, routing, and the models that make every later system easier.",
    meta: "Foundation → Junior",
    href: "/roadmap#foundations",
    tone: "cyan",
  },
  {
    code: "ROUTE_02",
    icon: Terminal,
    title: "Operate from Linux",
    description: "Learn the host-side commands used for reachability, DNS, services, logs, and packet capture.",
    meta: "16-module system",
    href: "/learn/linux/networking/ip-command",
    tone: "green",
  },
  {
    code: "ROUTE_03",
    icon: Braces,
    title: "Scale through code",
    description: "Move from manual CLI sessions to Python, APIs, Ansible, validation, and versioned change.",
    meta: "Professional path",
    href: "/roadmap#automation",
    tone: "purple",
  },
];

const labPreviews = [
  {
    index: "LAB-014",
    slug: "ospf-multi-area",
    title: "OSPF multi-area enterprise",
    level: "PROFESSIONAL",
    platform: "GNS3",
    time: "90 MIN",
    nodes: "8 DEVICES",
    skills: ["OSPF", "Summarization", "Default route", "Troubleshooting"],
  },
  {
    index: "LAB-006",
    slug: "basic-vlan",
    title: "Campus VLAN fault isolation",
    level: "JUNIOR",
    platform: "PACKET TRACER",
    time: "45 MIN",
    nodes: "6 DEVICES",
    skills: ["VLAN", "Trunk", "STP", "Inter-VLAN"],
  },
  {
    index: "LAB-021",
    slug: "linux-network-troubleshooting",
    title: "Linux reachability triage",
    level: "FOUNDATION",
    platform: "UBUNTU",
    time: "35 MIN",
    nodes: "3 HOSTS",
    skills: ["ip", "ss", "DNS", "tcpdump"],
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <div className="hero-status"><span className="status-dot" />LEARNING PATH · OPERATIONAL</div>
            <h1>Become a<br /><span>Network Engineer.</span></h1>
            <p>
              Learn through real configurations, troubleshooting, automation, and hands-on labs—from your first Cisco command to production networks.
            </p>
            <div className="hero-actions">
              <Link className="np-button np-button-primary" href="/roadmap">
                Start the roadmap <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="np-button np-button-secondary" href="/labs">
                Explore labs <FlaskConical aria-hidden="true" />
              </Link>
            </div>
            <div className="technology-line" aria-label="Technologies covered">
              <span>CISCO</span><i />
              <span>LINUX</span><i />
              <span>PYTHON</span><i />
              <span>ANSIBLE</span><i />
              <span>PALO ALTO</span><i />
              <span>GNS3</span>
            </div>
          </div>
          <TopologyHero />
        </div>
      </section>

      <div className="network-status-strip" aria-label="NetPath platform status">
        <div className="page-shell">
          <span><i className="status-dot" /> SYSTEM STATUS <b>ALL ROUTES AVAILABLE</b></span>
          <span>PATHS <b>06</b></span>
          <span>PROJECTS <b>12</b></span>
          <span>INCIDENTS <b>09</b></span>
          <span>TOOLS <b>02 LIVE</b></span>
          <span className="status-clock">LAST CHECK <b>NOW</b></span>
        </div>
      </div>

      <section className="section-block roadmap-preview-section">
        <div className="page-shell">
          <SectionHeading
            index="01"
            eyebrow="CAREER ROUTING TABLE"
            title="Know where you are. See what comes next."
            description="NetPath organizes technologies by the work they prepare you to do—not by vendor menus or disconnected course catalogs."
          />

          <div className="roadmap-preview">
            <div className="roadmap-backbone" aria-hidden="true" />
            {careerStages.map((stage, index) => (
              <Link href={`/roadmap#${stage.id}`} className="roadmap-preview-node" data-tone={stage.tone} key={stage.id}>
                <div className="roadmap-preview-marker"><span>{stage.number}</span><i /></div>
                <div className="roadmap-preview-copy">
                  <small>{stage.level}</small>
                  <strong>{stage.title}</strong>
                  <p>{stage.outcome}</p>
                  <em>{stage.skills.length} skills · {stage.labs} labs planned</em>
                </div>
                <ArrowRight aria-hidden="true" />
                {index < careerStages.length - 1 && <span className="packet-indicator" aria-hidden="true" />}
              </Link>
            ))}
          </div>

          <div className="section-action-row">
            <p><Route aria-hidden="true" /> Every stage includes prerequisites, outcomes, labs, and career relevance.</p>
            <Link href="/roadmap">Inspect the complete roadmap <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section-block technology-section">
        <div className="page-shell">
          <SectionHeading
            index="02"
            eyebrow="TECHNOLOGY EXPLORER"
            title="One system. Every layer of the job."
            description="Follow the career path or enter through a technology you already use. Every module connects back to operational outcomes."
          />

          <div className="technology-matrix">
            {technologies.map((technology) => (
              <Link href={technology.href} className="technology-row" data-tone={technology.tone} key={technology.name}>
                <span className="technology-code">{technology.code}</span>
                <span className="technology-name"><strong>{technology.name}</strong><small>{technology.description}</small></span>
                <span className="technology-level">{technology.level}</span>
                <span className="technology-modules">{String(technology.modules).padStart(2, "0")} <small>MODULES</small></span>
                <span className="technology-status"><i />{technology.status}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block start-section">
        <div className="page-shell">
          <SectionHeading
            index="03"
            eyebrow="CHOOSE AN ENTRY ROUTE"
            title="Start where the job becomes practical."
            description="Each route moves from mental model to command line, verification, troubleshooting, and a lab you can discuss in an interview."
          />
          <div className="learning-route-grid">
            {learningRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <Link href={route.href} className="learning-route" data-tone={route.tone} key={route.code}>
                  <div className="learning-route-top"><span>{route.code}</span><Icon aria-hidden="true" /></div>
                  <h3>{route.title}</h3>
                  <p>{route.description}</p>
                  <div><small>{route.meta}</small><ArrowRight aria-hidden="true" /></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-block labs-section" id="labs">
        <div className="page-shell">
          <SectionHeading
            index="04"
            eyebrow="POPULAR LABS"
            title="Read less. Verify more."
            description="Practice mode protects the answer. Solution mode explains the finished configuration, verification output, and failure paths."
          />
          <div className="lab-preview-grid">
            {labPreviews.map((lab, index) => (
              <article className="lab-preview" key={lab.index}>
                <div className="lab-preview-top"><span>{lab.index}</span><i className={index === 0 ? "status-dot" : "status-dot amber"} /></div>
                <div className="lab-topology-mini" aria-hidden="true">
                  <span /><i /><span /><i /><span />
                </div>
                <h3>{lab.title}</h3>
                <div className="lab-meta"><span>{lab.level}</span><span>{lab.platform}</span><span>{lab.time}</span><span>{lab.nodes}</span></div>
                <div className="lab-skills">{lab.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <div className="lab-actions">
                  <Link href={`/labs/${lab.slug}`}>
                    <Play aria-hidden="true" /> Start lab
                  </Link>
                  <a href="/downloads/worksheets/netpath-lab-worksheet.txt" download><Download aria-hidden="true" /> Worksheet</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block reference-section">
        <div className="page-shell reference-layout">
          <div className="reference-copy">
            <div className="section-kicker"><span>05</span>COMMAND REFERENCE</div>
            <h2>Commands in context,<br />not in a vacuum.</h2>
            <p>
              Every reference explains purpose, expected output, how a network engineer uses it, and the next command to run when the output is wrong.
            </p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" />Purpose and syntax</li>
              <li><CheckCircle2 aria-hidden="true" />Operational use</li>
              <li><CheckCircle2 aria-hidden="true" />Verification sequence</li>
              <li><CheckCircle2 aria-hidden="true" />Related commands</li>
            </ul>
            <Link href="/reference/linux">Open Linux command reference <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="reference-terminal-stack">
            <div className="terminal-context-row">
              <span><Terminal aria-hidden="true" /> LINUX / NETWORKING</span>
              <span>LEVEL · JUNIOR</span>
            </div>
            <TerminalBlock
              title="ubuntu@server01"
              prompt="$"
              variant="linux"
              code={`ip -br address\nip route get 8.8.8.8\nss -tulpn\nresolvectl status`}
            />
            <div className="terminal-result">
              <span>PURPOSE</span>
              <p>Establish local interface, route, socket, and resolver state before testing upstream.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block project-section">
        <div className="page-shell">
          <SectionHeading
            index="06"
            eyebrow="PROJECT SHOWCASE"
            title="Build the evidence employers ask for."
            description="NetPath projects connect architecture, configurations, testing, and documentation into a portfolio-ready engineering case study."
          />
          <div className="project-showcase">
            <div className="project-visual">
              <div className="project-visual-header"><span>PROJECT / ENTERPRISE-DUAL-SITE</span><span><i className="status-dot" /> VERIFIED</span></div>
              <div className="project-map" aria-label="Enterprise dual-site project topology preview">
                <div className="site-cluster hq"><small>HQ</small><span>EDGE</span><span>FIREWALL</span><span>CORE</span></div>
                <div className="wan-link"><i /><b>IPSEC / OSPF</b><i /></div>
                <div className="site-cluster branch"><small>BRANCH</small><span>RTR</span><span>SWITCH</span><span>USERS</span></div>
              </div>
            </div>
            <div className="project-copy">
              <span className="protocol-label">FEATURED ARCHITECTURE</span>
              <h3>Enterprise HQ + Branch Network</h3>
              <p>A dual-stack, multi-site design with routed WAN, segmented campus switching, firewalls, Linux services, and automation checkpoints.</p>
              <div className="project-stats">
                <span><b>18</b> devices</span><span><b>04</b> VLANs</span><span><b>02</b> sites</span><span><b>09</b> technologies</span>
              </div>
              <div className="project-tags"><span>OSPF</span><span>BGP</span><span>IPsec</span><span>IPv6</span><span>NAT</span><span>DNS</span></div>
              <Link className="project-inline-action" href="/projects/gns3/enterprise-dual-site"><CircleGauge aria-hidden="true" /> View engineering case study <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-operations-section">
        <div className="page-shell home-operations-grid">
          <article className="home-incident-preview">
            <div><span>07 / INCIDENT RESPONSE</span><ShieldAlert aria-hidden="true" /></div>
            <h2>NETWORK DOWN?</h2>
            <p>Learn to move from symptom to evidence, diagnosis, fix, verification, and root cause.</p>
            <div className="home-diagnostic-line" aria-label="Diagnostic sequence"><span>LINK</span><i /><span>VLAN</span><i /><span>IP</span><i /><span>ROUTE</span><i /><span>NAT</span><i /><span>DNS</span></div>
            <Link href="/troubleshooting">Open troubleshooting center <ArrowRight aria-hidden="true" /></Link>
          </article>
          <article className="home-tool-preview">
            <div><span>08 / ENGINEER&apos;S TOOLKIT</span><Wrench aria-hidden="true" /></div>
            <h2>Fast answers. Exact boundaries.</h2>
            <Link href="/tools/subnet-calculator"><b>01</b><span>Subnet Calculator<small>Network · broadcast · hosts</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/tools/wildcard-calculator"><b>02</b><span>Wildcard Calculator<small>ACL · OSPF · CIDR</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/reference/linux"><b>03</b><span>Linux Commands<small>Search · copy · verify</small></span><ArrowRight aria-hidden="true" /></Link>
          </article>
        </div>
      </section>

      <section className="section-block disciplines-section">
        <div className="page-shell discipline-grid">
          <article data-tone="purple">
            <div className="discipline-icon"><Workflow aria-hidden="true" /></div>
            <span>AUTOMATION CONTROL PLANE</span>
            <h2>One source of truth.<br />Many devices.</h2>
            <p>Python, Git, APIs, Ansible, Netmiko, NAPALM, NETCONF, RESTCONF, and YANG—always tied back to a network task.</p>
            <div className="automation-flow"><b>CODE</b><i /><b>INVENTORY</b><i /><b>50 DEVICES</b></div>
            <Link href="/automation">Follow automation path <ArrowRight aria-hidden="true" /></Link>
          </article>
          <article data-tone="red">
            <div className="discipline-icon"><Shield aria-hidden="true" /></div>
            <span>SECURITY ENFORCEMENT PLANE</span>
            <h2>Trust is a design<br />decision.</h2>
            <p>Palo Alto, FortiGate, NAT, security policy, IPsec, SSL VPN, logging, and high availability through real traffic flows.</p>
            <div className="security-flow"><b>UNTRUST</b><i /><b>POLICY</b><i /><b>TRUST</b></div>
            <Link href="/firewalls">Follow security path <ArrowRight aria-hidden="true" /></Link>
          </article>
        </div>
      </section>

      <section className="github-section">
        <div className="page-shell github-panel">
          <div className="github-terminal" aria-hidden="true">
            <div><span className="terminal-lights"><i /><i /><i /></span><b>netpath / source</b></div>
            <code><span>$</span> git clone github.com/mohamadreza121/NetworkStuff</code>
            <code><span>$</span> cd NetworkStuff</code>
            <code><span>$</span> npm run dev <em>✓ ready</em></code>
          </div>
          <div className="github-copy">
            <span><GitBranch aria-hidden="true" /> OPEN KNOWLEDGE SYSTEM</span>
            <h2>Learn it. Lab it. Document it.</h2>
            <p>NetPath is being built as a practical, inspectable resource for the network engineering community.</p>
            <a className="np-button np-button-primary" href="https://github.com/mohamadreza121/NetworkStuff" target="_blank" rel="noreferrer">
              View source on GitHub <GitBranch aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
