/* ============================================================
   CHARTS  —  inline SVG, no library, no network
   Built to the data-viz spec: thin marks, rounded data-ends,
   recessive axes, selective direct labels, hover tooltip.
   ============================================================ */

const SVGNS = "http://www.w3.org/2000/svg";

function el(name, attrs, text) {
  const n = document.createElementNS(SVGNS, name);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  if (text !== undefined) n.textContent = text;
  return n;
}

/* ------------------------------------------------------------
   Horizontal bar — magnitude across named categories.
   Single series, so no legend: the slide title names it.
   ------------------------------------------------------------ */
function barChart(data, opts) {
  opts = opts || {};
  const W = 990;
  /* The plot is 548 tall for a full list, but two bars spread over 548px
     read as a chart with something missing from it. Height follows the row
     count up to that ceiling, and because the SVG is fitted to its box the
     marks come out thicker rather than the slide emptier. */
  const H = Math.min(548, Math.max(data.length, 2) * 110);
  const LAB = 210;          /* category label column */
  const VAL = 104;          /* direct-label column   */
  const DEL = opts.delta ? 128 : 0;   /* optional delta column */
  const x0 = LAB, x1 = W - VAL - DEL;
  const plotW = x1 - x0;

  /* Descending by default: a magnitude chart the reader has to
     re-sort by eye is doing half its job. opts.sort === false
     keeps the authored order (a ranked or time-like list). */
  if (opts.sort !== false) data = data.slice().sort((a, b) => b.value - a.value);

  const rowH = H / data.length;
  const barH = Math.min(26, rowH * 0.52);
  const max = Math.max(...data.map(d => d.value));

  /* Nice round ticks */
  const step = niceStep(max, 4);
  const axisMax = Math.ceil(max / step) * step;

  const svg = el("svg", {
    viewBox: `0 0 ${W} ${H + (opts.unit ? 62 : 34)}`,
    role: "img",
    "aria-label": opts.aria || "बार चार्ट"
  });

  /* --- recessive gridlines + axis ticks --- */
  for (let v = 0; v <= axisMax; v += step) {
    const x = x0 + (v / axisMax) * plotW;
    svg.appendChild(el("line", {
      x1: x, x2: x, y1: 0, y2: H,
      stroke: v === 0 ? "var(--baseline)" : "var(--grid)",
      "stroke-width": v === 0 ? 1.5 : 1
    }));
    svg.appendChild(el("text", {
      x: x, y: H + 24, "text-anchor": "middle",
      class: "ax", fill: "var(--text-3)"
    }, axisTick(v, opts)));
  }

  /* Unit caption — the axis numbers are bare, so the unit has to
     be stated once rather than repeated on every tick. */
  if (opts.unit) axisCaption(svg, x0, H + 58, opts.unit);

  /* --- bars --- */
  data.forEach((d, i) => {
    const cy = i * rowH + rowH / 2;
    const w = (d.value / axisMax) * plotW;
    const colour = d.hl ? "var(--s1)" : "var(--s2)";

    const g = el("g", { class: "barg", tabindex: "0" });
    g.setAttribute("data-label", d.label);
    g.setAttribute("data-value", fmt(d.value));

    /* category label */
    g.appendChild(el("text", {
      x: LAB - 18, y: cy, "text-anchor": "end",
      "dominant-baseline": "central",
      class: "cat", fill: d.hl ? "var(--text-1)" : "var(--text-2)",
      "font-weight": d.hl ? 700 : 400
    }, d.label));

    /* track (very quiet) */
    g.appendChild(el("rect", {
      x: x0, y: cy - barH / 2, width: plotW, height: barH,
      fill: "var(--track)", opacity: 0.42, rx: 3
    }));

    /* the mark — rounded data-end, square at the baseline */
    g.appendChild(el("rect", {
      x: x0, y: cy - barH / 2, width: Math.max(w, 3), height: barH,
      fill: colour, rx: 4, class: "bar"
    }));
    g.appendChild(el("rect", {
      x: x0, y: cy - barH / 2, width: Math.min(6, Math.max(w, 3)), height: barH,
      fill: colour
    }));

    /* direct label */
    g.appendChild(el("text", {
      x: x1 + 14, y: cy, "dominant-baseline": "central",
      class: "val", fill: d.hl ? "var(--s1)" : "var(--text-1)",
      "font-weight": d.hl ? 700 : 600
    }, d.display || fmtMark(d.value)));

    /* optional delta column — the comparison the slide is
       actually making, next to the figure it is made against */
    if (opts.delta && d.delta !== undefined && d.delta !== null) {
      g.appendChild(el("text", {
        x: W - 14, y: cy, "text-anchor": "end",
        "dominant-baseline": "central",
        class: "val", "font-size": 17,
        fill: d.hl ? "var(--s1)" : "var(--text-3)",
        "font-weight": 600
      }, d.delta));
    }

    svg.appendChild(g);
  });

  return svg;
}

/* Axis ticks in lakh, so 500000 reads "5 लाख" not "500,000".
   The word is a deck property, not an engine one: an English
   deck sets DECK.meta.lakh = "lakh" and gets "5 lakh". */
function fmtAxis(v) {
  if (v === 0) return "0";
  if (v >= 100000) {
    const l = v / 100000;
    const word = (typeof DECK !== "undefined" && DECK.meta && DECK.meta.lakh) || "लाख";
    return (Number.isInteger(l) ? l : l.toFixed(1)) + " " + word;
  }
  return fmtMark(v);
}

/* A mark label must not round its own value away: 4.2 printed
   as "4" is a wrong number on the slide, not a tidier one. */
function fmtMark(v) {
  return Number.isInteger(v) ? fmt(v) : fmt(v, 1);
}

/* Axis ticks are bare numbers whenever a unit caption is present: the caption
   states the unit once, so repeating it on every tick is the noise the
   caption exists to remove. Without a caption the tick carries the scale
   itself, in lakh. */
function axisTick(v, o) {
  if (o.tick) return o.tick(v);
  return o.unit ? fmtMark(v) : fmtAxis(v);
}

function niceStep(max, target) {
  const raw = max / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const mult = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return mult * mag;
}

/* ------------------------------------------------------------
   SHARED PLOT FURNITURE
   Every renderer below draws the same axis, the same captions
   and the same focusable mark group, so a chart type is only
   ever the shape of its marks.
   ------------------------------------------------------------ */

/* Series order. --s1 is reserved for the one mark the slide
   title is about; everything else falls through to --s2. */
const SERIES = ["var(--s1)", "var(--s2)", "var(--s3)", "var(--text-3)"];

/* Devanagari must never be tracked or uppercased. Tested here
   rather than passed in, so no caller can get it wrong. */
function axisCaption(svg, x, y, text) {
  const deva = /[ऀ-ॿ]/.test(text);
  const n = el("text", {
    x: x, y: y, class: "axcap", fill: "var(--text-3)",
    "letter-spacing": deva ? "0" : "0.1em"
  }, deva ? text : text.toUpperCase());
  svg.appendChild(n);
  return n;
}

/* One focusable group per mark, so the delegated tooltip in
   initTooltip() picks it up without any per-chart wiring. */
function markGroup(label, value) {
  const g = el("g", { class: "barg", tabindex: "0" });
  g.setAttribute("data-label", label);
  g.setAttribute("data-value", value);
  return g;
}

/* Value axis with four nice-stepped ticks, gridlines at --grid
   and the zero line at --baseline. Returns the scale so marks
   can be positioned against the same numbers as the labels. */
function valueAxis(svg, o) {
  const step = niceStep(o.max, 4);
  const axisMax = Math.ceil(o.max / step) * step;
  const y = v => o.base - (v / axisMax) * (o.base - o.top);

  for (let v = step; v <= axisMax + 1e-9; v += step) {
    svg.appendChild(el("line", {
      x1: o.x0, x2: o.x1, y1: y(v), y2: y(v),
      stroke: "var(--grid)", "stroke-width": 1
    }));
  }
  for (let v = 0; v <= axisMax + 1e-9; v += step) {
    svg.appendChild(el("text", {
      x: o.x0 - 16, y: y(v) + 5, "text-anchor": "end",
      class: "ax", fill: "var(--text-3)"
    }, axisTick(v, o)));
  }
  svg.appendChild(el("line", {
    x1: o.x0, x2: o.x1, y1: o.base, y2: o.base,
    stroke: "var(--baseline)", "stroke-width": 1.5
  }));
  return { axisMax, y };
}

/* ------------------------------------------------------------
   Column — magnitude over an ORDERED category axis.
   Months, quarters, years. Never unordered names: those are a
   horizontal bar, where the labels have room to be read.
   ------------------------------------------------------------ */
function columnChart(data, opts) {
  opts = opts || {};
  const x0 = 90, x1 = 960, base = 340, top = 40;
  const plotW = x1 - x0;
  const band = plotW / data.length;
  const barW = Math.min(62, band * 0.56);

  const svg = el("svg", {
    viewBox: "0 0 1000 430", role: "img",
    "aria-label": opts.aria || "कॉलम चार्ट"
  });

  const max = Math.max(...data.map(d => d.value));
  const ax = valueAxis(svg, { x0, x1, base, top, max, tick: opts.tick, unit: opts.unit });

  /* One highlight: the peak, unless the caller names another. */
  const hlIndex = data.findIndex(d => d.hl);
  const peak = hlIndex >= 0 ? hlIndex : data.indexOf(data.reduce((a, b) => b.value > a.value ? b : a));

  data.forEach((d, i) => {
    const cx = x0 + i * band + band / 2;
    const yTop = ax.y(d.value);
    const isHl = i === peak;

    const g = markGroup(d.label, d.display || fmtMark(d.value));
    g.appendChild(el("rect", {
      x: cx - barW / 2, y: yTop, width: barW, height: Math.max(base - yTop, 2),
      rx: 4, fill: isHl ? "var(--s1)" : "var(--s2)", class: "bar"
    }));

    /* The value sits ABOVE the mark. Inside it, a short bar has
       nowhere to put the number and the type inverts twice. */
    g.appendChild(el("text", {
      x: cx, y: yTop - 14, "text-anchor": "middle",
      class: "val", "font-size": 16,
      fill: isHl ? "var(--s1)" : "var(--text-1)",
      "font-weight": isHl ? 700 : 600
    }, d.display || fmtMark(d.value)));

    g.appendChild(el("text", {
      x: cx, y: base + 28, "text-anchor": "middle",
      class: "cat", "font-size": 15,
      fill: isHl ? "var(--text-1)" : "var(--text-2)",
      "font-weight": isHl ? 600 : 400
    }, d.label));

    svg.appendChild(g);
  });

  if (opts.unit) axisCaption(svg, x0, 404, opts.unit);
  return svg;
}

/* ------------------------------------------------------------
   Grouped bar — TWO series, one scale.
   8px inside a group and a full empty band between groups, so
   the eye pairs the columns before it scans across them.
   Three series stop being a comparison and start being a mess,
   so the third is refused rather than drawn.
   ------------------------------------------------------------ */
function groupedBar(series, opts) {
  opts = opts || {};
  if (series.length > 2) {
    console.error("groupedBar takes at most two series; got " + series.length);
    series = series.slice(0, 2);
  }
  const x0 = 90, x1 = 960, base = 300, top = 30;
  const plotW = x1 - x0;
  const cats = series[0].data.length;
  const band = plotW / cats;
  const barW = 46, inner = 8;
  const groupW = series.length * barW + (series.length - 1) * inner;

  const svg = el("svg", {
    viewBox: "0 0 1000 380", role: "img",
    "aria-label": opts.aria || "समूहित बार चार्ट"
  });

  const max = Math.max(...series.flatMap(sr => sr.data.map(d => d.value)));
  const ax = valueAxis(svg, { x0, x1, base, top, max, tick: opts.tick, unit: opts.unit });

  for (let i = 0; i < cats; i++) {
    const gx = x0 + i * band + (band - groupW) / 2;
    series.forEach((sr, si) => {
      const d = sr.data[i];
      const yTop = ax.y(d.value);
      const g = markGroup(`${sr.name} — ${d.label}`, d.display || fmtMark(d.value));
      g.appendChild(el("rect", {
        x: gx + si * (barW + inner), y: yTop,
        width: barW, height: Math.max(base - yTop, 2),
        rx: 4, fill: SERIES[si], class: "bar"
      }));
      svg.appendChild(g);
    });

    svg.appendChild(el("text", {
      x: x0 + i * band + band / 2, y: base + 28, "text-anchor": "middle",
      class: "cat", "font-size": 15, fill: "var(--text-2)"
    }, series[0].data[i].label));
  }

  if (opts.unit) axisCaption(svg, x0, 362, opts.unit);
  return svg;
}

/* ------------------------------------------------------------
   Stacked bar — composition, row by row, every row normalised
   to the same width so shares compare straight down the column.
   This is the general case; propBar is the one-row wrapper.
   ------------------------------------------------------------ */
function stackedBar(rows, opts) {
  opts = opts || {};
  const LAB = 232, x0 = 250, x1 = 940;
  const plotW = x1 - x0;
  const rowH = 40, pitch = 80, y0 = 26;
  const H = y0 + (rows.length - 1) * pitch + rowH + 24;

  const svg = el("svg", {
    viewBox: `0 0 1000 ${H}`, role: "img",
    "aria-label": opts.aria || "स्टैक्ड बार चार्ट"
  });

  rows.forEach((row, ri) => {
    const y = y0 + ri * pitch;
    const cy = y + rowH / 2;
    const total = row.total || row.segs.reduce((a, sg) => a + sg.v, 0);
    const hl = row.hl || ri === 0;

    svg.appendChild(el("text", {
      x: LAB, y: cy, "text-anchor": "end", "dominant-baseline": "central",
      class: "cat", "font-size": 17,
      fill: hl ? "var(--text-1)" : "var(--text-2)",
      "font-weight": hl ? 700 : 400
    }, row.label));

    let x = x0;
    row.segs.forEach((sg, si) => {
      const share = sg.v / total;
      const last = si === row.segs.length - 1;
      const w = Math.max((last ? x1 - x : share * plotW - 2), 2);
      const g = markGroup(`${row.label} — ${sg.lab}`, `${fmt(sg.v)} (${pct(share)})`);

      /* Only the outer ends are rounded: an inner rounded edge
         would read as a gap that is not in the data. */
      g.appendChild(el("rect", {
        x: x, y: y, width: w, height: rowH,
        rx: (si === 0 || last) ? 4 : 0,
        fill: sg.c || SERIES[si], class: "bar"
      }));

      /* A number in a sliver is a number lost. Under 12% it
         moves to the caption line instead of being shrunk. */
      if (share > 0.12) {
        g.appendChild(el("text", {
          x: x + 18, y: cy, "dominant-baseline": "central",
          class: "val", "font-size": 16, "font-weight": 700,
          fill: "var(--paper-raised)"
        }, pct(share)));
      }
      svg.appendChild(g);
      x += share * plotW;
    });
  });

  return svg;
}

/* Single-row wrapper, kept for the inversion layout: caption
   line above, one normalised bar, slivers named underneath. */
function propBar(spec) {
  const wrap = document.createElement("div");
  wrap.className = "prop";

  const head = document.createElement("div");
  head.className = "prop__cap";
  head.innerHTML = `<span>${spec.k}</span><span>${fmt(spec.total)}</span>`;
  wrap.appendChild(head);

  wrap.appendChild(stackedBar(
    [{ label: spec.k, segs: spec.segs, total: spec.total, hl: true }],
    { aria: spec.k }
  ));

  const small = spec.segs.filter(sg => sg.v / spec.total <= 0.12);
  if (small.length) {
    const note = document.createElement("div");
    note.className = "prop__cap";
    note.innerHTML = small
      .map(sg => `<span>${sg.lab} — ${fmt(sg.v)} (${pct(sg.v / spec.total)})</span>`)
      .join("");
    wrap.appendChild(note);
  }
  return wrap;
}

/* ------------------------------------------------------------
   Donut — the hole earns its place by holding the total, so
   the reader never has to add the segments up. Four parts max;
   the legend is a table, never a leader line.
   ------------------------------------------------------------ */
function donutChart(spec) {
  const R = 140, SW = 44, C = 2 * Math.PI * R;   /* 879.65 */
  const CX = 210, CY = 210;
  const segs = spec.segs.slice().sort((a, b) => b.v - a.v).slice(0, 4);
  const total = spec.total || segs.reduce((a, sg) => a + sg.v, 0);

  const wrap = document.createElement("div");
  wrap.className = "donut";

  const svg = el("svg", {
    viewBox: "0 0 420 420", class: "donut__svg", role: "img",
    "aria-label": spec.aria || spec.subject || "डोनट चार्ट"
  });
  svg.appendChild(el("circle", {
    cx: CX, cy: CY, r: R, fill: "none",
    stroke: "var(--track)", "stroke-width": SW
  }));

  /* Rotated so the largest segment starts at twelve o'clock —
     the only position a reader treats as the beginning. */
  const ring = el("g", {
    transform: `rotate(-90 ${CX} ${CY})`, fill: "none",
    "stroke-width": SW, "stroke-linecap": "butt"
  });
  let offset = 0;
  segs.forEach((sg, i) => {
    const len = (sg.v / total) * C;
    const g = markGroup(sg.lab, `${fmt(sg.v)} (${pct(sg.v / total)})`);
    /* 6 units short of true length opens a hairline gap so two
       adjacent segments never bleed into one another. */
    g.appendChild(el("circle", {
      cx: CX, cy: CY, r: R, fill: "none",
      stroke: sg.c || SERIES[i], "stroke-width": SW, class: "bar",
      "stroke-dasharray": `${Math.max(len - 6, 0)} ${C - Math.max(len - 6, 0)}`,
      "stroke-dashoffset": -offset
    }));
    ring.appendChild(g);
    offset += len;
  });
  svg.appendChild(ring);

  svg.appendChild(el("text", {
    x: CX, y: 196, "text-anchor": "middle", class: "donut__fig"
  }, spec.figure || fmt(total)));
  if (spec.unit) svg.appendChild(el("text", {
    x: CX, y: 230, "text-anchor": "middle", class: "donut__unit"
  }, spec.unit));
  if (spec.subject) {
    const subj = axisCaption(svg, CX, 256, spec.subject);
    subj.setAttribute("text-anchor", "middle");
    subj.setAttribute("class", "donut__subj");
  }

  wrap.appendChild(svg);

  const tbl = document.createElement("div");
  tbl.className = "donut__legend";
  segs.forEach((sg, i) => {
    const r = document.createElement("div");
    r.className = "donut__row" + (i === 0 ? " is-lead" : "");
    r.innerHTML =
      `<span class="donut__sw" style="background:${sg.c || SERIES[i]}"></span>` +
      `<span class="donut__lab">${sg.lab}</span>` +
      `<span class="donut__val">${sg.display || fmt(sg.v)} · ${pct(sg.v / total)}</span>`;
    tbl.appendChild(r);
  });
  wrap.appendChild(tbl);
  return wrap;
}

/* Pie — three parts, hard cap. Above three the slices stop
   being distinguishable by angle, so the renderer refuses and
   returns a stacked bar instead of drawing something unreadable. */
function pieChart(spec) {
  if (spec.segs.length > 3) {
    return stackedBar([{ label: spec.k || "", segs: spec.segs, total: spec.total, hl: true }],
                      { aria: spec.aria });
  }
  const R = 100, CX = 110, CY = 110;
  const wrap = document.createElement("div");
  wrap.className = "piewrap";
  const total = spec.total || spec.segs.reduce((a, sg) => a + sg.v, 0);

  const svg = el("svg", {
    viewBox: "0 0 220 220", class: "pie", role: "img",
    "aria-label": spec.aria || "पाई चार्ट"
  });

  let a0 = -Math.PI / 2;
  spec.segs.forEach((sg, i) => {
    const sweep = (sg.v / total) * 2 * Math.PI;
    const a1 = a0 + sweep;
    const p = (a) => `${(CX + R * Math.cos(a)).toFixed(1)} ${(CY + R * Math.sin(a)).toFixed(1)}`;
    const g = markGroup(sg.lab, `${fmt(sg.v)} (${pct(sg.v / total)})`);
    g.appendChild(el("path", {
      d: `M ${CX} ${CY} L ${p(a0)} A ${R} ${R} 0 ${sweep > Math.PI ? 1 : 0} 1 ${p(a1)} Z`,
      fill: sg.c || SERIES[i], class: "bar"
    }));
    svg.appendChild(g);
    a0 = a1;
  });

  wrap.appendChild(svg);
  const list = document.createElement("div");
  list.className = "pie__legend";
  if (spec.k) list.innerHTML = `<div class="pie__cap">${spec.k}</div>`;
  spec.segs.forEach((sg, i) => {
    const row = document.createElement("div");
    row.className = "pie__row";
    row.innerHTML =
      `<span class="pie__sw" style="background:${sg.c || SERIES[i]}"></span>` +
      `<span class="pie__lab">${sg.lab}</span>` +
      `<b>${sg.display || pct(sg.v / total)}</b>`;
    list.appendChild(row);
  });
  if (spec.note) list.insertAdjacentHTML("beforeend", `<div class="pie__note">${spec.note}</div>`);
  wrap.appendChild(list);
  return wrap;
}

/* ------------------------------------------------------------
   Line / area — trend over time. No marker on every point: a
   dotted line is a dozen marks competing with the shape they
   are meant to describe. Only the last point is marked, and
   its direct label replaces the legend outright.
   ------------------------------------------------------------ */
function lineChart(series, opts) {
  opts = opts || {};
  if (series.length > 2) {
    console.error("lineChart takes at most two series; got " + series.length);
    series = series.slice(0, 2);
  }
  const x0 = 100, x1 = 880, base = 320, top = 60;
  const cats = series[0].points.length;
  const X = i => x0 + (i / (cats - 1)) * (x1 - x0);

  const svg = el("svg", {
    viewBox: "0 0 1000 400", role: "img",
    "aria-label": opts.aria || "लाइन चार्ट"
  });

  const max = Math.max(...series.flatMap(sr => sr.points.map(p => p.value)));
  const ax = valueAxis(svg, { x0, x1, base, top, max, tick: opts.tick, unit: opts.unit });

  /* Area fill only under the first series, and only ever as a
     gradient to zero — a solid fill under two lines hides one. */
  if (opts.area) {
    /* Under the upper line, not under whichever series happens to be first:
       a tint that stops halfway up the other line reads as a mistake. */
    const sum = sr => sr.points.reduce((a, p) => a + p.value, 0);
    const ai = opts.areaIndex !== undefined ? opts.areaIndex
             : (series.length > 1 && sum(series[1]) > sum(series[0]) ? 1 : 0);
    const colour = SERIES[ai];
    const defs = el("defs");
    const grad = el("linearGradient", { id: "sxArea", x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(el("stop", { offset: "0%", "stop-color": colour, "stop-opacity": 0.16 }));
    grad.appendChild(el("stop", { offset: "100%", "stop-color": colour, "stop-opacity": 0 }));
    defs.appendChild(grad);
    svg.appendChild(defs);
    const pts = series[ai].points.map((p, i) => `${X(i)} ${ax.y(p.value)}`).join(" L ");
    svg.appendChild(el("path", {
      d: `M ${pts} L ${x1} ${base} L ${x0} ${base} Z`, fill: "url(#sxArea)"
    }));
  }

  /* The end label replaces the legend, so it has to stay legible
     when two series finish close together. Each label is a name
     over a value — 44px of type — so anything tighter than that
     is pushed apart symmetrically before it is drawn. The dot
     stays on the true value; only the text moves. */
  const ends = series.map(sr => ax.y(sr.points[cats - 1].value));
  const labelY = ends.slice();
  if (ends.length === 2 && Math.abs(ends[0] - ends[1]) < 44) {
    const mid = (ends[0] + ends[1]) / 2;
    const hi = ends[0] <= ends[1] ? 0 : 1;
    labelY[hi] = mid - 22;
    labelY[1 - hi] = mid + 22;
  }

  series.forEach((sr, si) => {
    const colour = SERIES[si];
    svg.appendChild(el("polyline", {
      points: sr.points.map((p, i) => `${X(i)},${ax.y(p.value)}`).join(" "),
      fill: "none", stroke: colour, "stroke-width": 2.5,
      "stroke-linejoin": "round", "stroke-linecap": "round"
    }));

    svg.appendChild(el("circle", {
      cx: x1, cy: ends[si], r: 6,
      fill: "var(--paper)", stroke: colour, "stroke-width": 2.5
    }));
    svg.appendChild(el("text", {
      x: x1 + 18, y: labelY[si] - 5, class: "endlab",
      fill: colour, "font-weight": si === 0 ? 700 : 600
    }, sr.name));
    svg.appendChild(el("text", {
      x: x1 + 18, y: labelY[si] + 15, class: "endval", fill: "var(--text-2)"
    }, sr.points[cats - 1].display || fmtMark(sr.points[cats - 1].value)));
  });

  series[0].points.forEach((p, i) => {
    svg.appendChild(el("text", {
      x: X(i), y: base + 28, "text-anchor": "middle",
      class: "cat", "font-size": 15, fill: "var(--text-2)"
    }, p.label));
  });

  if (opts.unit) axisCaption(svg, x0, 382, opts.unit);
  return svg;
}

/* ------------------------------------------------------------
   KPI tiles — four numbers, no axis. The layout the print path
   needs most, because it survives being read at arm's length.
   Never five in a row; never more than one inverted tile.
   ------------------------------------------------------------ */
function kpiTiles(items) {
  const wrap = document.createElement("div");
  wrap.className = "kpis kpis--" + Math.min(items.length, 4);
  if (items.length > 4) console.error("kpiTiles takes at most four tiles per row");
  if (items.filter(i => i.dark).length > 1) console.error("kpiTiles allows one inverted tile per row");

  items.slice(0, 4).forEach(x => {
    const t = document.createElement("div");
    t.className = "kpi" + (x.dark ? " kpi--dark" : "");
    /* Devanagari is never tracked or uppercased, so the label
       class is chosen by script rather than by the author. */
    const labCls = /[ऀ-ॿ]/.test(x.lab) ? "kpi__lab kpi__lab--deva" : "kpi__lab";
    let inner = `<div class="${labCls}">${x.lab}</div>`;

    if (x.text) {
      inner += `<div class="kpi__text">${x.text}</div>`;
    } else {
      inner += `<div class="kpi__fig">${x.fig}` +
        (x.unit ? `<span class="kpi__unit">${x.unit}</span>` : "") + `</div>`;
    }
    if (x.b) inner += `<div class="kpi__b">${x.b}</div>`;
    if (x.delta) {
      inner += `<div class="kpi__deltarow">` +
        `<span class="kpi__delta kpi__delta--${x.tone || "neutral"}">${x.delta}</span>` +
        (x.deltaNote ? `<span class="kpi__deltanote">${x.deltaNote}</span>` : "") + `</div>`;
    }
    if (x.foot) inner += `<div class="kpi__foot">${x.foot}</div>`;
    t.innerHTML = inner;

    /* Optional 10px progress track — a share of a stated whole,
       where a sparkline would imply a trend that is not there. */
    if (x.progress !== undefined) {
      const p = document.createElement("div");
      p.className = "kpi__track";
      p.innerHTML = `<i style="width:${Math.min(x.progress, 1) * 100}%"></i>`;
      t.appendChild(p);
    } else if (x.spark) {
      const sv = el("svg", { viewBox: "0 0 200 40", class: "kpi__spark", role: "img", "aria-label": x.lab });
      const mx = Math.max(...x.spark), mn = Math.min(...x.spark);
      const rng = (mx - mn) || 1;
      const pts = x.spark.map((v, i) =>
        `${(i / (x.spark.length - 1)) * 200},${36 - ((v - mn) / rng) * 32}`);
      sv.appendChild(el("polyline", {
        points: pts.join(" "), fill: "none",
        stroke: x.tone === "good" ? "var(--s3)" : x.tone === "bad" ? "var(--s1)" : "var(--s2)",
        "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round"
      }));
      const last = pts[pts.length - 1].split(",");
      sv.appendChild(el("circle", {
        cx: last[0], cy: last[1], r: 4,
        fill: x.tone === "good" ? "var(--s3)" : x.tone === "bad" ? "var(--s1)" : "var(--s2)"
      }));
      t.appendChild(sv);
    }
    wrap.appendChild(t);
  });
  return wrap;
}

/* ------------------------------------------------------------
   Legend — always present for >= 2 series.
   ------------------------------------------------------------ */
function legend(items) {
  const l = document.createElement("div");
  l.className = "legend";
  items.forEach(i => {
    const it = document.createElement("div");
    it.className = "legend__i";
    it.innerHTML = `<span class="legend__sw" style="background:${i.c}"></span><span>${i.lab}</span>`;
    l.appendChild(it);
  });
  return l;
}

/* ------------------------------------------------------------
   Hover tooltip, delegated once for the whole deck.
   ------------------------------------------------------------ */
function initTooltip() {
  const tip = document.createElement("div");
  tip.className = "tip";
  tip.setAttribute("role", "status");
  document.body.appendChild(tip);

  function show(e) {
    const g = e.target.closest(".barg");
    if (!g) return;
    tip.innerHTML =
      `<b>${g.dataset.label}</b><span>${g.dataset.value}</span>`;
    tip.classList.add("is-on");
    move(e);
  }
  function move(e) {
    const r = tip.getBoundingClientRect();
    const x = (e.clientX || 0) + 16;
    const y = (e.clientY || 0) - r.height - 12;
    tip.style.left = Math.min(x, window.innerWidth - r.width - 12) + "px";
    tip.style.top = Math.max(y, 8) + "px";
  }
  function hide() { tip.classList.remove("is-on"); }

  document.addEventListener("mouseover", show);
  document.addEventListener("mousemove", e => {
    if (tip.classList.contains("is-on")) move(e);
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(".barg")) hide();
  });
  document.addEventListener("focusin", e => {
    const g = e.target.closest(".barg");
    if (!g) return;
    const b = g.getBoundingClientRect();
    tip.innerHTML = `<b>${g.dataset.label}</b><span>${g.dataset.value}</span>`;
    tip.classList.add("is-on");
    tip.style.left = b.left + "px";
    tip.style.top = (b.top - 46) + "px";
  });
  document.addEventListener("focusout", hide);
}
