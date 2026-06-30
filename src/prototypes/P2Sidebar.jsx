// P2 — Sticky left column with profile info, right column scrolls
import NeuronCanvas from "../components/NeuronCanvas";
import ThemeToggle from "../components/ThemeToggle";
import Links from "../components/Links";
import PubList from "../components/PubList";
import { profile, news, education, experience } from "../data/content";

function Sec({ title, children }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "12px" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function P2Sidebar() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      {/* Left sidebar — sticky, 260px, neuron canvas fills it */}
      <aside style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "260px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--border)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <NeuronCanvas opacity={0.7} />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 58%)",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          marginTop: "auto",
          padding: "24px 22px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          {/* Photo */}
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "var(--bg2)", border: "2px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: 700, color: "var(--muted)",
          }}>
            SM
          </div>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2px" }}>{profile.name}</p>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.4, marginBottom: "10px" }}>
              {profile.title}<br />{profile.institution}
            </p>
            <Links color="var(--muted)" />
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Right content */}
      <main style={{ flex: 1, padding: "48px 56px 60px", maxWidth: "640px" }}>
        <Sec title="About">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text2)" }}>{profile.bio}</p>
        </Sec>

        <Sec title="News">
          {news.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "1px", minWidth: "56px" }}>{n.date}</span>
              <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.55 }}>{n.text}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ fontSize: "14px", fontWeight: 500 }}>{e.degree}</p>
                <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", marginLeft: "10px" }}>{e.period}</span>
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
                <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", marginLeft: "10px" }}>{e.period}</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>{e.org} · {e.detail}</p>
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
