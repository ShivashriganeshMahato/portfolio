// P4 — Two-column layout: left for header+neuron canvas, right for all content
import NeuronCanvas from "../components/NeuronCanvas";
import ThemeToggle from "../components/ThemeToggle";
import Links from "../components/Links";
import PubList from "../components/PubList";
import { profile, news, education, experience } from "../data/content";

function Sec({ title, children }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px",
      }}>
        <h2 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>
      {children}
    </section>
  );
}

export default function P4Timeline() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      {/* Left panel — fixed profile info + neuron canvas */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        width: "300px", flexShrink: 0,
        display: "flex", flexDirection: "column",
        borderRight: "1px solid var(--border)",
      }}>
        {/* Neuron canvas top half */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <NeuronCanvas opacity={0.8} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, var(--bg) 100%)",
          }} />
        </div>

        {/* Profile info bottom half */}
        <div style={{ padding: "0 24px 32px" }}>
          {/* Floating photo over the gradient */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%", marginBottom: "14px",
            background: "var(--bg2)", border: "2px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: 700, color: "var(--muted)",
          }}>
            SM
          </div>
          <h1 style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "3px" }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5, marginBottom: "12px" }}>
            {profile.title}<br />
            {profile.institution}<br />
            Advisor: {profile.advisor}
          </p>
          <Links color="var(--muted)" />
          <div style={{ marginTop: "20px" }}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Right content */}
      <main style={{ flex: 1, padding: "48px 52px 60px", maxWidth: "600px" }}>
        <Sec title="About">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text2)" }}>{profile.bio}</p>
        </Sec>

        <Sec title="News">
          {news.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "1px", minWidth: "56px" }}>{n.date}</span>
              <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.55 }}>{n.text}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <p style={{ fontSize: "13px", fontWeight: 500 }}>{e.degree} — {e.institution}</p>
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>{e.period} · {e.detail}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <p style={{ fontSize: "13px", fontWeight: 500 }}>{e.title} — {e.org}</p>
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>{e.period} · {e.detail}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Publications">
          <PubList initialShow={2} />
        </Sec>
      </main>
    </div>
  );
}
