import { useRef, useState, useEffect } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import NeuronCanvas from "./components/NeuronCanvas";
import ThemeToggle from "./components/ThemeToggle";
import Links from "./components/Links";
import PubList from "./components/PubList";
import { profile, news, education, experience } from "./data/content";

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

function Portfolio() {
  const bgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${-window.scrollY * 0.14}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)", position: "relative" }}>
      {/* Canvas extends 500px below viewport to cover parallax drift */}
      <div ref={bgRef} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: "-500px", zIndex: 0 }}>
        <NeuronCanvas lightOpacity={0.52} darkOpacity={0.72} />
      </div>
      {/* Fade overlay stays locked to viewport, independent of parallax */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse min(720px, 100vw) 100% at 50% 50%, var(--bg) 50%, transparent 86%)",
      }} />

      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto", padding: "22px 32px 80px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <ThemeToggle />
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "26px" }}>
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

        <Row icon={ICONS.about} label="About">
          <p className="bio" style={{ fontSize: "17px", lineHeight: 1.78, color: "var(--text2)" }}
            dangerouslySetInnerHTML={{ __html: profile.bio }} />
        </Row>

        <Divider />

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
                <p className="news-text" style={{ fontSize: "16px", color: "var(--text2)", lineHeight: 1.58 }}
                  dangerouslySetInnerHTML={{ __html: n.text }} />
              </div>
            ))}
          </ScrollBox>
        </Row>

        <Divider />

        <Row icon={ICONS.publications} label="Publications">
          <PubList initialShow={2} />
        </Row>

        <Divider />

        <Row icon={ICONS.education} label="Education">
          <div>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                  <p style={{ fontSize: "17px", fontWeight: 500 }}>{e.degree}</p>
                  <span style={{ fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "15px", color: "var(--muted)" }}>
                  {e.institution}{e.advisor ? ` · Advisor: ${e.advisor}` : ""}
                </p>
                {e.detail && <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "1px" }}>{e.detail}</p>}
                {e.note  && <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "1px" }}>{e.note}</p>}
              </div>
            ))}
          </div>
        </Row>

        <Divider />

        <Row icon={ICONS.experience} label="Experience">
          <ScrollBox maxHeight="220px">
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px" }}>
                  <p style={{ fontSize: "17px", fontWeight: 500 }}>{e.title}</p>
                  <span style={{ fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap" }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "15px", color: "var(--muted)" }}>
                  {e.org}{e.location ? ` · ${e.location}` : ""}
                </p>
                {e.detail && <p className="exp-detail" style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }} dangerouslySetInnerHTML={{ __html: e.detail }} />}
              </div>
            ))}
          </ScrollBox>
        </Row>

        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
          <a
            href={profile.links.cv}
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 22px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontSize: "15px", fontWeight: 500,
              color: "var(--muted)",
              background: "var(--bg2)",
              textDecoration: "none",
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            © {profile.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
