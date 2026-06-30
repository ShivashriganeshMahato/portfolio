// P5 — Minimal / Full BG: neuron canvas as full-page paper texture, two-column label layout
import { useRef, useState, useEffect } from "react";
import NeuronCanvas from "../components/NeuronCanvas";
import ThemeToggle from "../components/ThemeToggle";
import Links from "../components/Links";
import PubList from "../components/PubList";
import { profile, news, education, experience } from "../data/content";

// Subtle section icons — thin stroke SVGs at 14×14
const Icon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    width="13" height="13"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    {path}
  </svg>
);

const ICONS = {
  about: (
    <Icon path={<><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>} />
  ),
  news: (
    <Icon path={<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></>} />
  ),
  education: (
    <Icon path={<><path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></>} />
  ),
  experience: (
    <Icon path={<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>} />
  ),
  publications: (
    <Icon path={<><path d="M4 4h10l6 6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="14 4 14 10 20 10"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></>} />
  ),
};

function Divider() {
  return <div style={{ borderTop: "1px solid var(--border)", margin: "26px 0" }} />;
}

function Row({ icon, label, children }) {
  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        color: "var(--accent)", marginBottom: "12px",
      }}>
        <span style={{ opacity: 0.75 }}>{icon}</span>
        <span style={{
          fontSize: "13px", fontWeight: 600,
          letterSpacing: "0.11em", textTransform: "uppercase", lineHeight: 1,
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function ScrollBox({ maxHeight, children }) {
  const ref = useRef(null);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);

  const check = () => {
    const el = ref.current;
    if (!el) return;
    setCanUp(el.scrollTop > 8);
    setCanDown(el.scrollTop < el.scrollHeight - el.clientHeight - 8);
  };

  useEffect(() => {
    check();
    const ro = new ResizeObserver(check);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const nudge = (dir) => ref.current?.scrollBy({ top: dir * 72, behavior: "smooth" });

  const arrowStyle = (pos) => ({
    position: "absolute", [pos]: "0", right: "0",
    background: "none", border: "none", cursor: "pointer",
    color: "var(--accent)", opacity: 0.7, padding: "2px 0",
    fontSize: "9px", lineHeight: 1, zIndex: 2,
    transition: "opacity 0.15s",
  });

  return (
    <div style={{ position: "relative" }}>
      {/* bottom fade when more content below */}
      {canDown && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "28px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none", zIndex: 1,
        }} />
      )}
      <div ref={ref} onScroll={check} style={{
        maxHeight, overflowY: "auto", paddingRight: "8px",
        scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent",
      }}>
        {children}
      </div>
      {canDown && (
        <button style={arrowStyle("bottom")} onClick={() => nudge(1)}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.55}>
          ▼
        </button>
      )}
      {canUp && (
        <button style={arrowStyle("top")} onClick={() => nudge(-1)}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
          ▲
        </button>
      )}
    </div>
  );
}

export default function P5Bento() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)", position: "relative" }}>
      {/* Full-page neuron background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <NeuronCanvas lightOpacity={0.52} darkOpacity={0.72} />
        {/* Fade network toward center so content column stays readable */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 46% 100% at 50% 50%, var(--bg) 40%, transparent 78%)",
        }} />
      </div>

      {/* Page content */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "22px 32px 80px" }}>
        {/* Theme toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <ThemeToggle />
        </div>

        {/* ── Header ── */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "26px" }}>
          {/* Headshot placeholder */}
          <div style={{
            width: 78, height: 78, borderRadius: "50%", flexShrink: 0,
            background: "var(--bg2)",
            border: "2px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: 700, color: "var(--muted)",
            letterSpacing: "-0.02em",
          }}>
            SM
          </div>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "2px" }}>
              {profile.name}
            </h1>
            <p style={{ fontSize: "16px", color: "var(--muted)", marginBottom: "8px", lineHeight: 1.45 }}>
              {profile.title}<br />
              {profile.institution} · Advisor: {profile.advisor}
            </p>
            <Links />
          </div>
        </div>

        <Divider />

        {/* ── About ── */}
        <Row icon={ICONS.about} label="About">
          <p style={{ fontSize: "17px", lineHeight: 1.78, color: "var(--text2)" }}>
            {profile.bio}
          </p>
        </Row>

        <Divider />

        {/* ── News ── */}
        <Row icon={ICONS.news} label="News">
          <ScrollBox maxHeight="185px">
            {news.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "8px" }}>
                <span style={{
                  fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap",
                  paddingTop: "2px", minWidth: "60px",
                }}>
                  {n.date}
                </span>
                <p style={{ fontSize: "16px", color: "var(--text2)", lineHeight: 1.58 }}>{n.text}</p>
              </div>
            ))}
          </ScrollBox>
        </Row>

        <Divider />

        {/* ── Publications ── */}
        <Row icon={ICONS.publications} label="Publications">
          <PubList initialShow={2} />
        </Row>

        <Divider />

        {/* ── Education ── */}
        <Row icon={ICONS.education} label="Education">
          <div>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                  <p style={{ fontSize: "17px", fontWeight: 500 }}>{e.degree}</p>
                  <span style={{ fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "15px", color: "var(--muted)" }}>{e.institution} · {e.detail}</p>
              </div>
            ))}
          </div>
        </Row>

        <Divider />

        {/* ── Experience ── */}
        <Row icon={ICONS.experience} label="Experience">
          <div>
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                  <p style={{ fontSize: "17px", fontWeight: 500 }}>{e.title}</p>
                  <span style={{ fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "15px", color: "var(--muted)" }}>{e.org}</p>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5, marginTop: "1px" }}>{e.detail}</p>
              </div>
            ))}
          </div>
        </Row>

        {/* Footer */}
        <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "14px", color: "var(--muted)" }}>
            {profile.name} · {profile.location} · {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
}
