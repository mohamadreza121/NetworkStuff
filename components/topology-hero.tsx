export function TopologyHero() {
  return (
    <figure className="topology-figure" aria-labelledby="topology-title topology-caption">
      <div className="topology-toolbar">
        <div>
          <span className="status-dot" />
          <strong id="topology-title">LAB-NET / HQ</strong>
        </div>
        <span>8 NODES · 7 LINKS · 12ms</span>
      </div>

      <svg className="topology-map" viewBox="0 0 720 500" role="img" aria-label="Operational enterprise network topology">
        <defs>
          <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="topology-links" aria-hidden="true">
          <path d="M360 65 L360 118" />
          <path d="M360 168 L228 220" />
          <path d="M360 168 L492 220" />
          <path d="M228 270 L360 322" />
          <path d="M492 270 L360 322" />
          <path d="M360 372 L186 424" />
          <path d="M360 372 L360 424" />
          <path d="M360 372 L534 424" />
        </g>

        <g className="topology-packets" aria-hidden="true">
          <circle r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M360 65 L360 118" /></circle>
          <circle r="3"><animateMotion dur="3.4s" repeatCount="indefinite" path="M360 168 L228 220" /></circle>
          <circle r="3"><animateMotion dur="3.1s" repeatCount="indefinite" path="M492 270 L360 322" /></circle>
          <circle r="3"><animateMotion dur="3.7s" repeatCount="indefinite" path="M360 372 L534 424" /></circle>
        </g>

        <g className="topology-node cloud-node">
          <rect x="302" y="28" width="116" height="38" rx="5" />
          <circle cx="318" cy="47" r="4" />
          <text x="330" y="51">INTERNET</text>
        </g>

        <g className="topology-node router-node">
          <rect x="286" y="118" width="148" height="50" rx="6" />
          <circle cx="304" cy="143" r="5" />
          <text className="node-label" x="318" y="140">EDGE-RTR01</text>
          <text className="node-meta" x="318" y="155">IOS-XE · UP</text>
        </g>

        <g className="topology-node firewall-node">
          <rect x="154" y="220" width="148" height="50" rx="6" />
          <circle cx="172" cy="245" r="5" />
          <text className="node-label" x="186" y="242">FW-PA01</text>
          <text className="node-meta" x="186" y="257">ACTIVE · 4ms</text>
        </g>

        <g className="topology-node firewall-node standby-node">
          <rect x="418" y="220" width="148" height="50" rx="6" />
          <circle cx="436" cy="245" r="5" />
          <text className="node-label" x="450" y="242">FW-PA02</text>
          <text className="node-meta" x="450" y="257">STANDBY · SYNC</text>
        </g>

        <g className="topology-node core-node">
          <rect x="286" y="322" width="148" height="50" rx="6" />
          <circle cx="304" cy="347" r="5" />
          <text className="node-label" x="318" y="344">CORE01</text>
          <text className="node-meta" x="318" y="359">L3 · 10G · UP</text>
        </g>

        {[
          { x: 124, label: "SW01", meta: "VLAN 10/20" },
          { x: 298, label: "SW02", meta: "VLAN 30/40" },
          { x: 472, label: "SRV01", meta: "DNS · DHCP" },
        ].map((node) => (
          <g className="topology-node access-node" key={node.label}>
            <rect x={node.x} y="424" width="124" height="46" rx="6" />
            <circle cx={node.x + 17} cy="447" r="4" />
            <text className="node-label" x={node.x + 30} y="444">{node.label}</text>
            <text className="node-meta" x={node.x + 30} y="458">{node.meta}</text>
          </g>
        ))}
      </svg>

      <figcaption id="topology-caption">
        <span>PACKET FLOW</span>
        <strong>Internet → Edge → HA firewalls → Core → Access</strong>
      </figcaption>
    </figure>
  );
}

