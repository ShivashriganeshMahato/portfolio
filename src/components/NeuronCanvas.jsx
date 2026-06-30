/**
 * Organic neuron network — LIF simulation with illustrated morphology.
 *
 * Each neuron has a soma (filled circle) and 4-8 dendritic branches drawn as
 * tapering quadratic bezier curves, producing the "scientific illustration /
 * paper-style flat" look. Inter-neuron connections are pre-computed curved axon
 * paths. Activity is visualized as a soft radial glow on the soma and a small
 * pulse dot traveling along the axon bezier.
 */

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";

// ── LIF parameters ────────────────────────────────────────────────────────────
const V_REST   = -70;  // mV
const V_THRESH = -55;  // mV — threshold
const V_RESET  = -76;  // mV — after spike
const TAU_M    = 45;   // ms — slow leak → calm resting state
const T_REF    = 12;   // ms — long refractory → no bursting
const DT       = 1.0;  // ms per sim step
const STEPS    = 2;    // sim steps per animation frame
const PSP      = 1.9;  // mV — postsynaptic potential amplitude
const EXT_RATE = 0.011;// Poisson external drive per step
const P_CON    = 0.020;// connection probability — kept low for open feel

// ── Morphology generation ─────────────────────────────────────────────────────

// Recursive dendritic branch (quadratic bezier)
function makeBranch(px, py, angle, len, width, depth) {
  const jitter = (Math.random() - 0.5) * 0.65;
  const cpx = px + Math.cos(angle + jitter * 0.6) * len * 0.50;
  const cpy = py + Math.sin(angle + jitter * 0.6) * len * 0.50;
  const ex  = px + Math.cos(angle) * len;
  const ey  = py + Math.sin(angle) * len;
  const node = { px, py, cpx, cpy, ex, ey, w: width, ch: [] };
  if (depth > 0 && Math.random() < 0.55) {
    const bl  = len * (0.50 + Math.random() * 0.22);
    const sp  = 0.26 + Math.random() * 0.22;
    node.ch.push(makeBranch(ex, ey, angle - sp, bl,         width * 0.62, depth - 1));
    if (Math.random() < 0.58)
      node.ch.push(makeBranch(ex, ey, angle + sp, bl * 0.85, width * 0.56, depth - 1));
  }
  return node;
}

// Draw a branch tree recursively
function drawBranch(ctx, b, color) {
  ctx.beginPath();
  ctx.moveTo(b.px, b.py);
  ctx.quadraticCurveTo(b.cpx, b.cpy, b.ex, b.ey);
  ctx.lineWidth  = b.w;
  ctx.strokeStyle = color;
  ctx.stroke();
  b.ch.forEach(c => drawBranch(ctx, c, color));
}

// Point on a quadratic bezier at t ∈ [0,1]
function qbez(ax, ay, bx, by, cx, cy, t) {
  const u = 1 - t;
  return {
    x: u * u * ax + 2 * u * t * bx + t * t * cx,
    y: u * u * ay + 2 * u * t * by + t * t * cy,
  };
}

function buildNet(W, H, dpr) {
  const neurons = [];

  // Adaptive count: ~1 neuron per 15k CSS px², min 50 on small screens
  const cssArea = (W / dpr) * (H / dpr);
  const N = Math.max(50, Math.min(140, Math.round(cssArea / 15000)));

  // Neurons extend 220px beyond the viewport so the network bleeds off-screen
  const ov = 220 * dpr;

  for (let i = 0; i < N; i++) {
    const x     = -ov + Math.random() * (W + 2 * ov);
    const y     = -ov + Math.random() * (H + 2 * ov);
    const somaR = (4.2 + Math.random() * 4.0) * dpr;

    // Dendrites: 4–7 main branches, each branching 1–2 times
    const numD = 4 + Math.floor(Math.random() * 4);
    const dendrites = [];
    for (let d = 0; d < numD; d++) {
      const a   = (d / numD) * Math.PI * 2 + (Math.random() - 0.5) * 0.85;
      const len = (18 + Math.random() * 26) * dpr;
      dendrites.push(makeBranch(x, y, a, len, 1.5 * dpr, 2));
    }

    neurons.push({
      x, y, somaR, dendrites,
      V: V_REST + Math.random() * 10,
      ref: Math.random() * T_REF * 0.4,
      glow: 0,
      out: [],
    });
  }

  // Sparse directed connections; pre-compute bezier control pts for axon paths
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i !== j && Math.random() < P_CON) {
        const ni = neurons[i], nj = neurons[j];
        const mx  = (ni.x + nj.x) * 0.5;
        const my  = (ni.y + nj.y) * 0.5;
        const perp = Math.atan2(nj.y - ni.y, nj.x - ni.x) + Math.PI / 2;
        const bow  = (Math.random() - 0.5) * 38 * dpr;
        neurons[i].out.push({
          j,
          w:     Math.random() < 0.78 ? 1 : -0.6,
          delay: Math.round(5 + Math.random() * 13),
          cpx:   mx + Math.cos(perp) * bow,
          cpy:   my + Math.sin(perp) * bow,
        });
      }
    }
  }

  return neurons;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NeuronCanvas({ style, className, lightOpacity = 0.55, darkOpacity = 0.72 }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const { theme } = useTheme();
  const themeRef  = useRef(theme);

  useEffect(() => { themeRef.current = theme; }, [theme]);

  const init = useCallback((canvas) => {
    const dpr = window.devicePixelRatio;
    stateRef.current = {
      neurons: buildNet(canvas.width, canvas.height, dpr),
      queue:   [],
      step:    0,
      waves:   [],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      init(canvas);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio;
      mouseRef.current = { x: (e.clientX - r.left) * d, y: (e.clientY - r.top) * d };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio;
      const mx = (e.clientX - r.left) * d, my = (e.clientY - r.top) * d;
      stateRef.current?.neurons.forEach(n => {
        const dist = Math.hypot(n.x - mx, n.y - my);
        if (dist < 200 * d) n.V += 20 * (1 - dist / (200 * d));
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick);

    let last = 0;
    function loop(ts) {
      rafRef.current = requestAnimationFrame(loop);
      if (!stateRef.current) return;
      if (ts - last > 120) { last = ts; return; }
      last = ts;

      const { neurons, waves } = stateRef.current;
      const dark   = themeRef.current === "dark";
      const dpr    = window.devicePixelRatio;
      const mouse  = mouseRef.current;
      const ctx    = canvas.getContext("2d");
      const W      = canvas.width;
      const H      = canvas.height;

      // ── Simulation ──────────────────────────────────────────────────────────
      for (let s = 0; s < STEPS; s++) {
        stateRef.current.step++;
        const step = stateRef.current.step;

        const next = [];
        for (const ev of stateRef.current.queue) {
          if (ev.at <= step) {
            const t = neurons[ev.j];
            if (t.ref <= 0) t.V += ev.w * PSP;
          } else next.push(ev);
        }
        stateRef.current.queue = next;

        neurons.forEach(n => {
          if (n.ref > 0) { n.ref -= DT; n.V = V_RESET; return; }
          const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (md < 80 * dpr) n.V += 0.22 * (1 - md / (80 * dpr));
          if (Math.random() < EXT_RATE) n.V += PSP * 0.75;
          n.V += (DT / TAU_M) * (V_REST - n.V);
          if (n.V < V_REST - 7) n.V = V_REST - 7;
          if (n.V >= V_THRESH) {
            n.V = V_RESET; n.ref = T_REF; n.glow = 1.0;
            n.out.forEach(c => {
              stateRef.current.queue.push({ j: c.j, w: c.w, at: step + c.delay });
              waves.push({ ni: n, nj: neurons[c.j], c, t: 0 });
            });
          }
          if (n.glow > 0) n.glow = Math.max(0, n.glow - 0.010);
        });

        for (let w = waves.length - 1; w >= 0; w--) {
          waves[w].t += 0.020;
          if (waves[w].t >= 1) waves.splice(w, 1);
        }
      }

      // ── Render ──────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap  = "round";
      ctx.lineJoin = "round";

      // Palette — "paper ink" in light, soft purple in dark
      // All as [r,g,b] tuples for interpolation
      const inkRest   = dark ? [105, 82, 172] : [88,  70, 52];   // resting dendrite/soma
      const inkActive = dark ? [167,139,250]   : [95,  50, 195];  // excited
      const inkGlow   = dark ? [180,155,255]   : [120, 70, 220];  // firing glow
      const axonCol   = dark ? [110, 88, 195]  : [55,  42, 30];   // connection lines

      // 1. Axon connections — curved lines
      ctx.lineWidth = 0.65 * dpr;
      neurons.forEach(n => {
        n.out.forEach(c => {
          const nj = neurons[c.j];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.quadraticCurveTo(c.cpx, c.cpy, nj.x, nj.y);
          ctx.strokeStyle = `rgba(${axonCol.join(",")},${dark ? 0.22 : 0.18})`;
          ctx.stroke();
        });
      });

      // 2. Wave pulses traveling along axon beziers
      waves.forEach(w => {
        const p    = qbez(w.ni.x, w.ni.y, w.c.cpx, w.c.cpy, w.nj.x, w.nj.y, w.t);
        const fade = Math.sin(w.t * Math.PI) * (dark ? 0.85 : 0.70);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.8 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${inkGlow.join(",")},${fade})`;
        ctx.fill();
      });

      // 3. Neurons — dendrites then soma
      neurons.forEach(n => {
        const norm = Math.max(0, Math.min(1, (n.V - V_REST) / (V_THRESH - V_REST)));
        const exc  = norm > 0.45 || n.glow > 0.05;

        // Dendrites
        const dAlpha = dark
          ? 0.18 + norm * 0.40
          : 0.24 + norm * 0.38;
        const dColor = exc
          ? `rgba(${inkActive.join(",")},${dAlpha})`
          : `rgba(${inkRest.join(",")},${dAlpha})`;
        n.dendrites.forEach(d => drawBranch(ctx, d, dColor));

        // Soma glow halo (fires)
        if (n.glow > 0.02) {
          const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.somaR * 5);
          gr.addColorStop(0,   `rgba(${inkGlow.join(",")},${n.glow * (dark ? 0.45 : 0.35)})`);
          gr.addColorStop(0.5, `rgba(${inkGlow.join(",")},${n.glow * (dark ? 0.12 : 0.08)})`);
          gr.addColorStop(1,   `rgba(${inkGlow.join(",")},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.somaR * 5, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }

        // Soma body
        const sAlpha = dark
          ? 0.30 + norm * 0.50 + n.glow * 0.22
          : 0.36 + norm * 0.45 + n.glow * 0.18;
        const sColor = exc
          ? `rgba(${inkActive.join(",")},${sAlpha})`
          : `rgba(${inkRest.join(",")},${sAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.somaR, 0, Math.PI * 2);
        ctx.fillStyle = sColor;
        ctx.fill();

        // Subtle inner specular highlight (paper-illustration feel)
        ctx.beginPath();
        ctx.arc(n.x - n.somaR * 0.22, n.y - n.somaR * 0.22, n.somaR * 0.40, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(dark ? 0.10 : 0.22) * (0.4 + norm * 0.5)})`;
        ctx.fill();
      });
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, [init]);

  // theme is reactive here (component re-renders when ThemeProvider changes)
  const opacity = theme === "dark" ? darkOpacity : lightOpacity;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity,
        cursor: "crosshair",
        transition: "opacity 0.3s",
        ...style,
      }}
    />
  );
}
