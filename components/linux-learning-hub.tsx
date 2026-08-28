import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, FlaskConical, GitBranch, Network, Radar, ShieldCheck, TerminalSquare } from "lucide-react";

import { getLinuxModuleLessons, linuxContentStats, linuxLessonPath, linuxLessons, linuxModulePath } from "@/content/linux/network-engineering";
import { linuxModules } from "@/content/linux/network-engineering/modules";

const workflow = ["Understand", "Inspect", "Configure", "Verify", "Break + Fix", "Practice"];
const operatingDomains = [
  { label: "HOST + LINK", modules: "01–03", detail: "Kernel, shell, services, logs, interfaces, addressing, neighbors, and persistent configuration." },
  { label: "PATH + SERVICE", modules: "04–07", detail: "Routing, segmentation, sockets, transport, DNS, DHCP, time, troubleshooting, and capture." },
  { label: "POLICY + OVERLAY", modules: "08–10", detail: "Netfilter, nftables, NAT, QoS, SSH, VPNs, Linux routing, proxies, and telemetry daemons." },
  { label: "SCALE + RELIABILITY", modules: "11–12", detail: "Virtual networking, containers, automation, monitoring, hardening, incidents, and capstone operations." },
];

export function LinuxLearningHub() {
  const firstLesson = linuxLessons[0];
  return (
    <main className="ccna-hub linux-learning-hub">
      <section className="ccna-hub-hero">
        <div className="page-shell">
          <div className="ccna-hub-kicker"><TerminalSquare aria-hidden="true" />LINUX / NETWORK OPERATIONS 2026</div>
          <div className="ccna-hub-title-row">
            <div>
              <h1>Operate Linux like a network engineer.</h1>
              <p>Learn the host packet path from shell to wire through exact commands, original diagrams, safe configuration, decisive verification, controlled faults, and field-ready labs.</p>
              <div className="ccna-hub-actions">
                <Link href={linuxLessonPath(firstLesson)}>Start with the Linux network model <ArrowRight aria-hidden="true" /></Link>
                <Link href="#curriculum">View all modules</Link>
              </div>
            </div>
            <div className="ccna-hub-version">
              <span>OPERATIONS SCOPE</span>
              <strong>LINUX</strong>
              <b>2026</b>
              <p>Ubuntu Server is the working baseline, while kernel, iproute2, systemd, Netfilter, OpenSSH, FRR, container, and protocol concepts remain distribution-aware.</p>
            </div>
          </div>
          <dl className="ccna-hub-metrics">
            <div><dt>{linuxContentStats.modules}</dt><dd>ORDERED MODULES</dd></div>
            <div><dt>{linuxContentStats.lessons}</dt><dd>FOCUSED LESSONS</dd></div>
            <div><dt>{linuxContentStats.capabilitiesCovered}/{linuxContentStats.capabilitiesTotal}</dt><dd>CAPABILITIES MAPPED</dd></div>
            <div><dt>{linuxContentStats.labs}</dt><dd>MINI + FULL LABS</dd></div>
            <div><dt>{linuxContentStats.capabilitiesMissing}</dt><dd>MISSING CAPABILITIES</dd></div>
          </dl>
        </div>
      </section>

      <section className="ccna-workflow-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>01 / METHOD</span><h2>Follow evidence from process to packet.</h2><p>Every major lesson repeats the same safe operating loop.</p></div>
          <ol className="ccna-workflow">
            {workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
          </ol>
          <div className="ccna-practice-levels">
            <article><TerminalSquare aria-hidden="true" /><span>QUICK TRY</span><strong>{linuxContentStats.practiceCounts["Quick Try"]}</strong><p>Short command, interpretation, evidence, or comparison drills.</p></article>
            <article><FlaskConical aria-hidden="true" /><span>MINI LAB</span><strong>{linuxContentStats.practiceCounts["Mini Lab"]}</strong><p>One bounded system, acceptance target, and usually one injected fault.</p></article>
            <article><ShieldCheck aria-hidden="true" /><span>FULL LAB</span><strong>{linuxContentStats.practiceCounts["Full Lab"]}</strong><p>Build, secure, verify, break, recover, document, and clean up.</p></article>
          </div>
        </div>
      </section>

      <section id="curriculum" className="ccna-curriculum-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>02 / CURRICULUM</span><h2>Twelve modules, one packet path.</h2><p>Start at the shell or jump directly to the network role you operate.</p></div>
          <div className="ccna-module-rows">
            {linuxModules.map((moduleEntry) => {
              const moduleLessons = getLinuxModuleLessons(moduleEntry.id);
              const capabilityIds = new Set(moduleLessons.flatMap((lesson) => lesson.capabilityIds));
              return (
                <Link key={moduleEntry.id} href={linuxModulePath(moduleEntry.id)}>
                  <span className="ccna-module-number">{String(moduleEntry.order).padStart(2, "0")}</span>
                  <span className="ccna-module-copy"><small>{moduleEntry.capabilityGroup}</small><strong>{moduleEntry.title}</strong><em>{moduleEntry.description}</em></span>
                  <span className="ccna-module-meta"><b>{moduleLessons.length} lessons</b><small>{capabilityIds.size} mapped capabilities</small></span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ccna-domain-section">
        <div className="page-shell ccna-domain-layout">
          <div>
            <div className="ccna-section-heading compact"><span>03 / OPERATING MAP</span><h2>From host state to reliable service.</h2><p>The sequence follows how a network engineer investigates and operates a real Linux node.</p></div>
            <div className="linux-domain-cards">
              {operatingDomains.map((domain) => <article key={domain.label}><span>{domain.modules}</span><strong>{domain.label}</strong><p>{domain.detail}</p></article>)}
            </div>
          </div>
          <aside className="ccna-source-note">
            <BookOpenCheck aria-hidden="true" />
            <span>SOURCE HANDLING</span>
            <h3>Manual-led. Field-tested. Original throughout.</h3>
            <p>Primary documentation from the Linux kernel, man-pages, Ubuntu, systemd, nftables, OpenSSH, WireGuard, strongSwan, FRRouting, Docker, and protocol projects anchors the technical model. NetPath explanations, diagrams, checks, faults, questions, and labs are newly written.</p>
            <a href="https://documentation.ubuntu.com/server/explanation/networking/">Open Ubuntu Server networking docs <ArrowRight aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      <section className="ccna-resource-section">
        <div className="page-shell">
          <div className="ccna-section-heading"><span>04 / FIELD KIT</span><h2>Move from lesson to working evidence.</h2><p>Use the existing NetPath command, lab, project, and automation systems as the next action.</p></div>
          <div className="ccna-resource-links">
            <Link href="/reference/linux"><BookOpenCheck aria-hidden="true" /><span><strong>Linux command reference</strong><small>153 searchable networking and operations entries</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/labs"><FlaskConical aria-hidden="true" /><span><strong>Troubleshooting labs</strong><small>Symptoms, evidence, diagnosis, repair, and verification</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/projects/gns3"><Network aria-hidden="true" /><span><strong>GNS3 projects</strong><small>Linux namespaces, routers, services, and appliance topologies</small></span><ArrowRight aria-hidden="true" /></Link>
            <Link href="/automation"><GitBranch aria-hidden="true" /><span><strong>Automation workspace</strong><small>Shell, Python, Ansible, Git, validation, and rollback</small></span><ArrowRight aria-hidden="true" /></Link>
          </div>
          <p className="ccna-coverage-assertion"><CheckCircle2 aria-hidden="true" />Coverage audit: all {linuxContentStats.capabilitiesTotal} Linux network-operations capabilities map to a focused lesson, verification workflow, and exercise.</p>
          <p className="linux-platform-note"><Radar aria-hidden="true" />Commands assume a disposable lab or authorized host. Distribution-specific service names and managers are called out where ownership matters.</p>
        </div>
      </section>
    </main>
  );
}
