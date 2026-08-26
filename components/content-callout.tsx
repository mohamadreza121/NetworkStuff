import { CheckCircle2, Info, TriangleAlert } from "lucide-react";

const icons = { note: Info, warning: TriangleAlert, success: CheckCircle2 };

export function ContentCallout({ tone, title, children }: { tone: keyof typeof icons; title: string; children: React.ReactNode }) {
  const Icon = icons[tone];
  return (
    <aside className="content-callout" data-tone={tone}>
      <Icon aria-hidden="true" />
      <div><strong>{title}</strong><p>{children}</p></div>
    </aside>
  );
}
