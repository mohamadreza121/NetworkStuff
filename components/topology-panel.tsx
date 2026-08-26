import { Network } from "lucide-react";

export function TopologyPanel({ label, caption, nodes, links }: { label: string; caption: string; nodes: string[]; links?: string[] }) {
  return (
    <figure className="lesson-topology phase2-topology">
      <div className="lesson-topology-toolbar"><span><i className="status-dot" />{label}</span><small>LOGICAL TOPOLOGY</small></div>
      <div className="lesson-topology-canvas">
        {nodes.map((node, index) => (
          <div className="lesson-node-wrap" key={`${node}-${index}`}>
            <div className="lesson-node" data-node={index + 1}><Network aria-hidden="true" /><span>{node}</span><small>READY</small></div>
            {index < nodes.length - 1 && <div className="lesson-link" aria-hidden="true"><i /><span>{links?.[index] ?? `LINK ${index + 1}`}</span></div>}
          </div>
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
