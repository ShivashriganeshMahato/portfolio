import { profile } from "../data/content";

const S = { width: 20, height: 20, style: { display: "block" } };

const EmailIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const ScholarIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const GitHubIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const CVIcon = () => (
  <svg {...S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2"/>
    <circle cx="9" cy="10" r="2.5"/>
    <path d="M5 19c0-2.2 1.8-4 4-4s4 1.8 4 4"/>
    <line x1="15" y1="9" x2="19" y2="9"/>
    <line x1="15" y1="13" x2="19" y2="13"/>
    <line x1="15" y1="17" x2="19" y2="17"/>
  </svg>
);

const items = [
  { label: "Email",          icon: <EmailIcon />,    href: profile.links.email },
  { label: "Google Scholar", icon: <ScholarIcon />,  href: profile.links.scholar },
  { label: "GitHub",         icon: <GitHubIcon />,   href: profile.links.github },
  { label: "Twitter / X",   icon: <TwitterIcon />,  href: profile.links.twitter },
  { label: "LinkedIn",       icon: <LinkedInIcon />, href: profile.links.linkedin },
  { label: "CV",             icon: <CVIcon />,       href: profile.links.cv },
];

export default function Links({ color = "var(--muted)" }) {
  return (
    <span style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          title={item.label}
          target={item.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          style={{ color, transition: "color 0.15s", lineHeight: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = color; }}
        >
          {item.icon}
        </a>
      ))}
    </span>
  );
}
