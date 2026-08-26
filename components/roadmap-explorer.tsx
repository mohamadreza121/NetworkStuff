"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Command, FlaskConical } from "lucide-react";

import { careerStages } from "@/lib/site-data";

export function RoadmapExplorer() {
  const [activeId, setActiveId] = useState(careerStages[0].id);
  const active = careerStages.find((stage) => stage.id === activeId) ?? careerStages[0];

  return (
    <div className="roadmap-explorer">
      <div className="roadmap-rail" role="tablist" aria-label="Career stages">
        {careerStages.map((stage) => (
          <button
            type="button"
            role="tab"
            aria-selected={active.id === stage.id}
            aria-controls="roadmap-stage-panel"
            className={active.id === stage.id ? "is-active" : ""}
            data-tone={stage.tone}
            key={stage.id}
            onClick={() => {
              setActiveId(stage.id);
              window.history.replaceState(null, "", `#${stage.id}`);
            }}
          >
            <span className="stage-marker"><i />{stage.number}</span>
            <span className="stage-label"><small>{stage.level}</small>{stage.shortTitle}</span>
          </button>
        ))}
      </div>

      <section id="roadmap-stage-panel" className="roadmap-stage-panel" data-tone={active.tone} role="tabpanel">
        <div className="stage-panel-header">
          <div>
            <span className="protocol-label">STAGE {active.number} / 06</span>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
          </div>
          <span className="level-badge">{active.level}</span>
        </div>

        <div className="stage-panel-grid">
          <div className="stage-skills">
            <h3>Skill inventory</h3>
            <div>{active.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
          <div className="stage-prerequisites">
            <h3>Prerequisites</h3>
            <ol>{active.prerequisites.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </div>

        <div className="stage-panel-footer">
          <div className="stage-metrics">
            <span><Clock3 aria-hidden="true" /><b>{active.estimated}</b> estimated</span>
            <span><FlaskConical aria-hidden="true" /><b>{active.labs}</b> labs planned</span>
            <span><Command aria-hidden="true" /><b>{active.commands}</b> commands</span>
          </div>
          <Link href="/learn">Open learning systems <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
