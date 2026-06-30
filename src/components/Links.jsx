import { profile } from "../data/content";

// Simple text-style contact links — academic register
export default function Links({ color = "var(--muted)", accentHover = true }) {
  const items = [
    { label: "Email", href: profile.links.email },
    { label: "Google Scholar", href: profile.links.scholar },
    { label: "GitHub", href: profile.links.github },
    { label: "Twitter/X", href: profile.links.twitter },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "CV", href: profile.links.cv },
  ];

  return (
    <span style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
      {items.map((item, i) => (
        <span key={item.label}>
          <a
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{ color, fontSize: "16px", transition: "color 0.15s" }}
            onMouseEnter={(e) => { if (accentHover) e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { if (accentHover) e.currentTarget.style.color = color; }}
          >
            {item.label}
          </a>
          {i < items.length - 1 && (
            <span style={{ color: "var(--border)", margin: "0 8px", userSelect: "none" }}>/</span>
          )}
        </span>
      ))}
    </span>
  );
}
