import { Play } from "lucide-react";

export function VideoPlaceholder({ title, duration }: { title: string; duration: string }) {
  return (
    <div className="video-placeholder" aria-label={`${title}. ${duration}`}>
      <div className="video-grid" aria-hidden="true" />
      <span><Play aria-hidden="true" /></span>
      <div><strong>{title}</strong><small>{duration} · Replace with an approved hosted video</small></div>
    </div>
  );
}
