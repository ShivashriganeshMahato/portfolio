import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const prototypes = [
  { id: 1, path: "/p1", name: "Compact Classic", desc: "Neuron strip at top, photo + name below it, single narrow column. Most like a standard academic page." },
  { id: 2, path: "/p2", name: "Sticky Sidebar", desc: "Neuron canvas fills a sticky left sidebar with profile info. Content scrolls on the right." },
  { id: 3, path: "/p3", name: "Horizontal Header", desc: "Neuron canvas spans the full header background. Photo on left, name + bio on right. Content below." },
  { id: 4, path: "/p4", name: "Split Panel", desc: "Left half has neuron canvas + profile pinned. Right half scrolls content. Like a two-pane reading view." },
  { id: 5, path: "/p5", name: "Minimal / Full BG", desc: "Neuron canvas as a very faint full-page background. Two-column label layout. Ultra-minimal." },
];

export default function PrototypePicker() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px" }}>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "4px" }}>
              Portfolio Prototypes
            </h1>
            <p style={{ fontSize: "13px", color: "var(--muted)" }}>
              5 layouts, all compact. Pick one to open. Use the ● toggle inside for light/dark.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {prototypes.map((p) => (
            <Link key={p.id} to={p.path} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                style={{
                  padding: "18px 20px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  background: "var(--card)",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  transition: "border-color 0.15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, minWidth: "24px", paddingTop: "1px" }}>
                  P{p.id}
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: "3px" }}>{p.name}</p>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>{p.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
