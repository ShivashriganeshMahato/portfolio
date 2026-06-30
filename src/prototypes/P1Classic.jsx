// P1 — Classic academic: single narrow column, neuron canvas only in header strip
import NeuronCanvas from "../components/NeuronCanvas";
import ThemeToggle from "../components/ThemeToggle";
import Links from "../components/Links";
import PubList from "../components/PubList";
import { profile, news, education, experience } from "../data/content";

const W = 680; // content column width

function Sec({ title, children }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "14px",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function P1Classic() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Thin neuron strip at top */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <NeuronCanvas style={{ position: "absolute", inset: 0 }} opacity={0.85} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 30%, var(--bg) 100%)",
        }} />
        <div style={{ position: "absolute", top: "16px", right: "20px" }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Header: photo + name/info */}
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginTop: "-20px", marginBottom: "32px" }}>
          {/* Photo placeholder */}
          <div style={{
            width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
            background: "var(--bg2)",
            border: "3px solid var(--bg)",
            boxShadow: "0 0 0 1px var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: 700, color: "var(--muted)",
          }}>
            SM
          </div>
          <div style={{ paddingTop: "6px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2px" }}>
              {profile.name}
            </h1>
            <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "6px" }}>
              {profile.title} · {profile.institution}
            </p>
            <Links />
          </div>
        </div>

        <Sec title="About">
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--text2)" }}>{profile.bio}</p>
        </Sec>

        <Sec title="News">
          {news.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "1px", minWidth: "60px" }}>
                {n.date}
              </span>
              <p style={{ fontSize: "13px", color: "var(--text2)", lineHeight: 1.55 }}>{n.text}</p>
            </div>
          ))}
        </Sec>

        <Sec title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "2px", minWidth: "60px" }}>
                {e.period.split("–")[0].trim()}
              </span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "1px" }}>{e.degree}</p>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>{e.institution} · {e.detail}</p>
              </div>
            </div>
          ))}
        </Sec>

        <Sec title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--muted)", whiteSpace: "nowrap", paddingTop: "2px", minWidth: "60px" }}>
                {e.period.split("–")[0].trim()}
              </span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "1px" }}>{e.title}</p>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>{e.org} · {e.detail}</p>
              </div>
            </div>
          ))}
        </Sec>

        <Sec title="Publications">
          <PubList initialShow={2} />
        </Sec>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", color: "var(--muted)" }}>{profile.name} · {profile.location}</p>
        </div>
      </div>
    </div>
  );
}
