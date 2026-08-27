export function ResourceHero({
  eyebrow,
  title,
  description,
  metrics = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: { value: string; label: string }[];
}) {
  return (
    <section className="phase3-hero">
      <div className="page-shell phase3-hero-layout">
        <div>
          <span className="phase3-eyebrow"><i className="status-dot" />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {metrics.length > 0 && (
          <dl className="phase3-metrics">
            {metrics.map((metric) => <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}
          </dl>
        )}
      </div>
    </section>
  );
}
