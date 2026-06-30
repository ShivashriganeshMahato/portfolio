// P3 — Horizontal header: photo left, name+bio right, neuron fills the whole header bg
import NeuronCanvas from "../components/NeuronCanvas";
import ThemeToggle from "../components/ThemeToggle";
import Links from "../components/Links";
import PubList from "../components/PubList";
import { profile, news, education, experience } from "../data/content";

function Sec({ title, children }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2 style={{
        fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function P3FullHero() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Header — neuron background, horizontal layout */}
      <header style={{ position: "relative", padding: "36px 0 32px", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <NeuronCanvas opacity={0.65} />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, var(--bg) 0%, transparent 50%, var(--bg) 100%)",
        }} />
        <div style={{ position: "absolute", top: "16px", right: "20px" }}>
          <ThemeToggle />
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "760px", margin: "0 auto", padding: "0 32px",
          display: "flex", gap: "28px", alignItems: "flex-start",
        }}>
          {/* Photo */}
          <div style={{
            width: 100, height: 100, borderRadius: "50%", flexShrink: 0,
            background: "var(--bg2)", border: "3px solid var(--bg)",
            boxShadow: "0 0 0 1px var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: 700, color: "var(--muted)",
          }}>
            SM
          </div>
          {/* Name + info */}
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "3px" }}>
              {profile.name}
            </h1>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "8px" }}>
              {profile.title} · {profile.institution} · Advisor: {profile.advisor}
            </p>
            <Links />
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "36px 32px 60px" }}>
        <Sec title="About">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text2)" }}>{profile.bio}</p>
        </Sec>

        <Sec title="News">
          {news.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "1px", minWidth: "60px" }}>
                {n.date}
              </span>
              <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.55 }}>{n.text}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>{e.degree}</p>
                <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "12px", whiteSpace: "nowrap" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>{e.institution} · {e.detail}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>{e.title}</p>
                <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "12px", whiteSpace: "nowrap" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>{e.org}</p>
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>{e.detail}</p>
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
