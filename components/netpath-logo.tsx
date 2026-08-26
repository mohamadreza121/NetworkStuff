import Link from "next/link";

export function NetPathLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand-mark" href="/" aria-label="NetPath home">
      <span className="brand-glyph" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {!compact && (
        <span className="brand-word">
          Net<span>Path</span>
        </span>
      )}
    </Link>
  );
}

