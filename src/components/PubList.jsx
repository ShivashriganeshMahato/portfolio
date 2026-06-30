import { useState } from "react";
import { publications } from "../data/content";

// Shared publication list with expand/collapse
export default function PubList({ initialShow = 2 }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? publications : publications.slice(0, initialShow);

  return (
    <div>
      {shown.map((p, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <p>
            <a href={p.url} className="pub-title">{p.title}</a>
          </p>
          <p className="pub-authors" style={{ marginTop: "3px" }}>{p.authors}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px", flexWrap: "wrap" }}>
            <p className="pub-venue">{p.venue}, {p.year}</p>
            {p.note && (
              <span style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--accent)",
                background: "var(--accent-soft)",
                padding: "1px 6px",
                borderRadius: "3px",
                whiteSpace: "nowrap",
              }}>
                {p.note}
              </span>
            )}
          </div>
        </div>
      ))}
      {publications.length > initialShow && (
        <button
          onClick={() => setExpanded((x) => !x)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            color: "var(--accent)",
            padding: "0",
            marginTop: "4px",
          }}
        >
          {expanded ? "↑ Show fewer" : `↓ Show all ${publications.length} publications`}
        </button>
      )}
    </div>
  );
}
