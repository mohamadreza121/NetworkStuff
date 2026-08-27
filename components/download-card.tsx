import { Download, FileText } from "lucide-react";

export function DownloadCard({ title, description, href, format }: { title: string; description: string; href: string; format: string }) {
  return (
    <a className="download-card" href={href} download>
      <span><FileText aria-hidden="true" /></span>
      <span><strong>{title}</strong><small>{description}</small></span>
      <em>{format}</em>
      <Download aria-hidden="true" />
    </a>
  );
}
