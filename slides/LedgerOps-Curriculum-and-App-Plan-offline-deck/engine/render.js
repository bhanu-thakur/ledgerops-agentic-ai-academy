/* ============================================================
   RENDER ENGINE
   content model  ->  layout primitives  ->  DOM
   Adding a layout = one builder here + one block in layouts.css
   ============================================================ */

function h(tag, cls, inner) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (inner !== undefined) n.innerHTML = inner;
  return n;
}

/* ---- shared pieces ---------------------------------------- */

/* Devanagari text must not be tracked or uppercased; Latin
   kickers should be. Tag by script so neither is guessed. */
const DEVA = /[ऀ-ॿ]/;
function eyebrow(text) {
  return h("div", "eyebrow " + (DEVA.test(text) ? "eyebrow--deva" : "eyebrow--latin"), text);
}

function head(s) {
  const d = h("div", "head");
  if (s.eyebrow) d.appendChild(eyebrow(s.eyebrow));
  if (s.title)   d.appendChild(h("h2", "head__title", s.title));
  if (s.sub)     d.appendChild(h("p", "head__sub", s.sub));
  if (s.title)   d.appendChild(h("div", "head__rule"));
  return d;
}

function foot(s, i, total) {
  const f = h("div", "foot");
  f.appendChild(h("span", "foot__label", s.section || DECK.meta.label));
  /* Section name, progress, page number. The track costs no
     body height and answers "how much is left" at a glance. */
  const p = h("div", "foot__prog");
  p.innerHTML = `<i style="width:${(i / total * 100).toFixed(1)}%"></i>`;
  f.appendChild(p);
  f.appendChild(h("span", "foot__num", `${i} / ${total}`));
  return f;
}

/* A citation is either a bare string (as before) or
   { t, kind } where kind is measured | modelled | contested.
   The kind is not decoration: it tells the reader whether a
   number was counted, derived, or is disputed. */
/* icon() prepends the "i-" itself, so these are bare names. */
const CITE_ICON = { measured: "check", modelled: "layers", contested: "warn" };
function cite(x) {
  if (!x) return "";
  if (typeof x === "string") return `<span class="cite cite--deva">${x}</span>`;
  const kind = CITE_ICON[x.kind] ? x.kind : "modelled";
  return `<span class="cite cite--deva cite--${kind}">${icon(CITE_ICON[kind])}${x.t}</span>`;
}

/* ---- table cells ------------------------------------------
   A cell is a value, or { v, bar, share } where bar is 0..1.
   The micro-bar gives a column of numbers a shape without it
   becoming a second chart, and the share cell fixes the width
   of the percentage so no value clips behind the bar. */
function tableCell(val, isNum) {
  let cls = isNum ? "num" : "";
  let inner;
  if (val !== null && typeof val === "object" && !Array.isArray(val)) {
    const v = typeof val.v === "number" ? fmt(val.v) : (val.v === null ? "—" : val.v);
    if (val.bar !== undefined) {
      /* The track flexes to fill the column and the figure follows it, so
         the bar never squeezes the number it is describing. The cell is
         left-aligned for that reason, not right-aligned like a plain
         numeric column. */
      cls = "bar" + (val.share ? " share" : "");
      inner =
        `<div class="mcell">` +
        `<span class="mbar"><i style="width:${Math.min(Math.max(val.bar, 0), 1) * 100}%"></i></span>` +
        `<b>${v}</b></div>`;
    } else {
      inner = v;
    }
    if (val.cls) cls += " " + val.cls;
  } else {
    inner = typeof val === "number" ? fmt(val) : (val === null ? "—" : val);
  }
  return `<td class="${cls.trim()}">${inner}</td>`;
}

/* A column whose data cells carry a micro-bar is left-aligned, because the
   track starts at the column's left edge; every other column past the first
   is numeric and right-aligned. */
function colClass(s, idx) {
  if (idx === 0) return "";
  const hasBar = s.rows.some(r => {
    const cells = Array.isArray(r) ? r : (r.cells || r.sub || r.band);
    const c = cells && cells[idx];
    return c && typeof c === "object" && c.bar !== undefined;
  });
  return hasBar ? "bar" : "num";
}

/* Rows come in five kinds. A plain array is a data row, as
   before; the other four are objects, so nothing already
   authored changes meaning. */
function tableRow(row, opts) {
  const lead = opts.rank !== undefined ? `<td class="rank">${opts.rank}</td>` : "";

  if (row && row.group !== undefined) {
    /* Label, rule and group total live in one spanning cell: the rule has to
       stretch to whatever the label leaves, which a column boundary would
       not allow. */
    const deva = DEVA.test(row.group) ? " grp__l--deva" : "";
    const span = opts.cols + (lead ? 1 : 0);
    const tr = h("tr", "is-group");
    tr.innerHTML =
      `<td colspan="${span}"><div class="grp">` +
      `<span class="grp__l${deva}">${row.group}</span>` +
      `<span class="grp__r"></span>` +
      (row.total !== undefined ? `<span class="grp__t">${row.total}</span>` : "") +
      `</div></td>`;
    return tr;
  }

  if (row && row.band) {
    const cells = row.band;
    const span = opts.cols + (lead ? 1 : 0);
    const tr = h("tr", "is-band");
    tr.innerHTML =
      `<td colspan="${span}"><div class="band">` +
      `<span class="band__l">${cells[0]}</span>` +
      cells.slice(1).map((c, i) => {
        const obj = c !== null && typeof c === "object";
        const v = obj ? c.v : (c === null ? "—" : c);
        const mod = obj && c.cls ? ` band__v--${c.cls}`
                  : (i === cells.length - 2 ? " band__v--last" : "");
        return `<span class="band__v${mod}">${v}</span>`;
      }).join("") +
      `</div></td>`;
    return tr;
  }

  const kind = row && row.sub ? "is-sub"
             : (row && row.highlight) ? "is-hl" : null;
  const cells = Array.isArray(row) ? row
              : (row.sub || row.cells
                 || [row.name, row.claims, row.titles, row.acres]);

  const tr = h("tr", kind);
  tr.innerHTML = lead + cells.map((v, i) => tableCell(v, i > 0)).join("");
  return tr;
}

/* The framing grid — same purpose as a camera's: a guide for
   checking that elements share edges. Styling lives in
   theme/grid.css; this only builds the markup. Hidden until
   the G key is pressed, and never printed.

   Red  = the 12 columns and the rule-of-thirds lines.
   Grey = the projection safe area (the margin box). */
function gridOverlay() {
  const g = h("div", "gridoverlay");

  const cols = h("div", "go-cols");
  for (let i = 0; i < 12; i++) cols.appendChild(document.createElement("i"));
  g.appendChild(cols);

  const line = (cls, axis, pos) => {
    const el = h("div", `go-line ${axis} ${cls}`);
    el.style[axis === "h" ? "top" : "left"] = pos;
    g.appendChild(el);
  };

  /* Thirds — focal placement, not layout rails. */
  line("", "v", "var(--third-x1)"); line("", "v", "var(--third-x2)");
  line("", "h", "var(--third-y1)"); line("", "h", "var(--third-y2)");


  /* Safe area. */
  line("margin", "v", "var(--pad-x)");
  line("margin", "h", "var(--pad-y)");
  const r = h("div", "go-line v margin"); r.style.right = "var(--pad-x)"; g.appendChild(r);
  const b = h("div", "go-line h margin"); b.style.bottom = "var(--pad-y)"; g.appendChild(b);

  return g;
}

function initGrid() {
  document.addEventListener("keydown", e => {
    if (e.key === "g" || e.key === "G") document.body.classList.toggle("showgrid");
  });
}

/* ---- layout builders -------------------------------------- */

const LAYOUTS = {

  cover(s) {
    const r = h("div", "l-cover");
    const top = h("div", "cover__top");
    top.appendChild(eyebrow(s.eyebrow));
    top.appendChild(h("div", "cover__mark frost", s.mark.join("<br>")));
    r.appendChild(top);

    const mid = h("div");
    mid.appendChild(h("h1", "cover__title", `${s.title}<br>${s.titleSub}`));
    mid.appendChild(h("div", "cover__rule"));
    mid.appendChild(h("div", "cover__org", s.org));
    r.appendChild(mid);

    const cf = h("div", "cover__foot");
    cf.appendChild(h("span", null, s.footL));
    cf.appendChild(h("span", null, s.footR));
    r.appendChild(cf);
    return r;
  },

  section(s) {
    const r = h("div", "l-section");
    const hd = h("div", "section__head");
    hd.appendChild(h("div", "section__num frost", s.num));
    r.appendChild(hd);
    /* One tick per section, filled to this one. s.of = total. */
    if (s.of) {
      const st = h("div", "section__steps");
      for (let i = 1; i <= s.of; i++) {
        const t = document.createElement("i");
        if (i <= (s.at || 1)) t.className = "is-done";
        st.appendChild(t);
      }
      hd.appendChild(st);
    }
    r.appendChild(h("h2", "section__title", s.title));
    if (s.sub) r.appendChild(h("p", "section__sub", s.sub));
    r.appendChild(h("div", "section__rule"));
    return r;
  },

  statement(s) {
    const r = h("div", "l-statement");
    r.appendChild(head(s));
    const b = h("div", "body");
    if (s.icon) b.appendChild(h("div", "statement__mark", icon(s.icon)));
    b.appendChild(h("p", "statement__text", s.text));
    if (s.cites) {
      const c = h("div", "statement__cites");
      s.cites.forEach(x => c.insertAdjacentHTML("beforeend", cite(x)));
      b.appendChild(c);
    }
    r.appendChild(b);
    return r;
  },

  hero(s) {
    const r = h("div", "l-hero");
    r.appendChild(head(s));
    const b = h("div", "body");

    const split = h("div", "hero__split");
    const main = h("div");
    main.appendChild(h("div", "hero__figure", fmt(s.figure)));
    if (s.unit)  main.appendChild(h("div", "hero__unit", s.unit));
    if (s.label) main.appendChild(h("div", "hero__label", s.label));
    split.appendChild(main);

    if (s.aside) {
      const a = h("div", "hero__aside frost");
      s.aside.forEach(x => {
        const w = h("div");
        w.appendChild(h("div", "mini__fig", x.pct ? pct(x.fig) : fmt(x.fig)));
        w.appendChild(h("div", "mini__lab", x.lab));
        a.appendChild(w);
      });
      split.appendChild(a);
    }
    b.appendChild(split);
    if (s.note) b.appendChild(h("p", "hero__note", s.note));
    r.appendChild(b);
    return r;
  },

  stats(s) {
    const r = h("div", "l-stats");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", `stats stats--${s.cols || s.items.length}`);
    s.items.forEach(x => {
      const c = h("div", "stat" + (x.accent ? " stat--accent" : ""));
      c.appendChild(h("div", "stat__fig", typeof x.fig === "number" ? fmt(x.fig) : x.fig));
      if (x.unit) c.appendChild(h("div", "stat__unit", x.unit));
      c.appendChild(h("div", "stat__lab", x.lab));
      if (x.delta) {
        const dr = h("div", "stat__deltarow");
        dr.appendChild(h("span", `stat__delta stat__delta--${x.tone || "neutral"}`, x.delta));
        if (x.deltaNote) dr.appendChild(h("span", "stat__deltanote", x.deltaNote));
        c.appendChild(dr);
      }
      if (x.note) c.appendChild(h("div", "stat__note", cite(x.note)));
      g.appendChild(c);
    });
    b.appendChild(g);
    if (s.foot) b.appendChild(h("p", "hero__note", s.foot));
    r.appendChild(b);
    return r;
  },

  steps(s) {
    const r = h("div", "l-steps");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", `steps steps--${s.cols || s.items.length}`);
    s.items.forEach((x, i) => {
      /* The last step is "now" unless the content names another,
         so the sequence always has a head to read towards. */
      const now = x.now !== undefined ? x.now : (i === s.items.length - 1);
      const c = h("div", "step" + (now ? " step--now" : ""));
      c.appendChild(h("div", "step__n", x.n));
      c.appendChild(h("div", "step__t", x.t));
      if (x.list) {
        const ul = h("ul", "step__list");
        x.list.forEach(li => ul.appendChild(h("li", null, li)));
        c.appendChild(ul);
      }
      if (x.cite) c.appendChild(h("div", "step__cite", cite(x.cite)));
      g.appendChild(c);
    });
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  cards(s) {
    const r = h("div", "l-cards");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", `cards cards--${s.cols || s.items.length}`);
    s.items.forEach(x => {
      const c = h("div", "card");
      if (x.icon || x.stance) {
        const hd = h("div", "card__hd");
        const against = x.stance && !x.stance.for;
        if (x.icon) hd.appendChild(h("div",
          "chip chip--sm" + (against ? " chip--muted" : ""), icon(x.icon)));
        if (x.stance) hd.appendChild(h("div",
          `card__stance card__stance--${x.stance.for ? "for" : "against"}`,
          x.stance.t));
        c.appendChild(hd);
      }
      c.appendChild(h("div", "card__t", x.t));
      c.appendChild(h("div", "card__b", x.b));
      if (x.cite) c.appendChild(h("div", "card__cite", cite(x.cite)));
      g.appendChild(c);
    });
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  split(s) {
    const r = h("div", "l-split");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", "split");

    const left = h("div");
    if (s.stats) {
      const sg = h("div", "stats stats--stack");
      s.stats.forEach(x => {
        const c = h("div", "stat" + (x.accent ? " stat--accent" : ""));
        c.appendChild(h("div", "stat__fig", typeof x.fig === "number" ? fmt(x.fig) : x.fig));
        c.appendChild(h("div", "stat__lab", x.lab));
        if (x.note) c.appendChild(h("div", "stat__note", x.note));
        sg.appendChild(c);
      });
      left.appendChild(sg);
    }
    if (s.rows) {
      const rw = h("div", "rows" + (s.rows.length > 3 ? " rows--dense" : ""));
      s.rows.forEach(x => {
        const row = h("div", "row");
        row.appendChild(h("div", "row__n", x.n));
        row.appendChild(h("div", "row__b", x.b));
        rw.appendChild(row);
      });
      left.appendChild(rw);
      if (s.cite) {
        const cw = h("div");
        cw.style.marginTop = "var(--sp-4)";
        cw.innerHTML = cite(s.cite);
        left.appendChild(cw);
      }
    }
    g.appendChild(left);

    if (s.panel) {
      const col = h("div");
      const p = h("div", "panel panel--sunken");
      p.appendChild(h("div", "panel__t", (s.panel.icon ? icon(s.panel.icon) : "") + s.panel.t));
      p.appendChild(h("div", "panel__b", s.panel.b));
      col.appendChild(p);
      /* Two supporting figures, rather than two more sentences. */
      if (s.minis) {
        const m = h("div", "minis");
        s.minis.forEach(x => {
          const w = h("div", "mini");
          w.appendChild(h("div", "mini__f", x.f));
          w.appendChild(h("div", "mini__l", x.l));
          m.appendChild(w);
        });
        col.appendChild(m);
      }
      g.appendChild(col);
    }
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  /* One layout, seven mark shapes. The chart type is a property
     of the data, not of the slide, so choosing it must not mean
     choosing a different layout and re-authoring the head. */
  chart(s) {
    const c = s.chart;
    const r = h("div", "l-chart");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", "chartwrap" + (s.takeaway ? "" : " chartwrap--full"));

    const box = h("div", "chartbox");
    const o = { aria: s.title, unit: c.unit, tick: c.tick, sort: c.sort,
                delta: c.delta, area: c.area };

    /* The plot fills its box absolutely, so a legend cannot be a
       sibling of the SVG — it would be painted straight over.
       The legend is laid out above; the plot takes what is left. */
    const plot = h("div", "chartplot");
    let key = null;

    switch (c.type) {
      case "column":  plot.appendChild(columnChart(c.data, o)); break;
      case "grouped": plot.appendChild(groupedBar(c.series, o));
                      key = legend(c.series.map((sr, i) =>
                        ({ c: `var(--s${i + 1})`, lab: sr.name }))); break;
      case "stacked": plot.appendChild(stackedBar(c.rows, o));
                      if (c.keys) key = legend(c.keys); break;
      case "donut":   plot.appendChild(donutChart(c)); break;
      case "pie":     plot.appendChild(pieChart(c)); break;
      case "line":
      case "area":    plot.appendChild(lineChart(c.series,
                        Object.assign({}, o, { area: c.type === "area" || c.area }))); break;
      default:        plot.appendChild(barChart(c.data, o));
    }
    if (key) box.appendChild(key);
    box.appendChild(plot);
    g.appendChild(box);

    if (s.takeaway) g.appendChild(takeawayBox(s.takeaway));
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  /* Four big numbers and nothing else. The counterweight to a
     deck of tables: it states the result before the evidence. */
  kpi(s) {
    const r = h("div", "l-kpi");
    r.appendChild(head(s));
    const b = h("div", "body");
    b.appendChild(kpiTiles(s.items));
    if (s.note) b.appendChild(h("p", "tablenote", s.note));
    r.appendChild(b);
    return r;
  },

  /* Two proportion bars that read against each other — the
     "titles are individual, land is communal" inversion. */
  inversion(s) {
    const r = h("div", "l-inversion");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", "chartwrap");

    const box = h("div", "chartbox");
    box.style.gap = "var(--sp-5)";
    s.bars.forEach(spec => box.appendChild(propBar(spec)));
    box.appendChild(legend(s.bars[0].segs.map(x => ({ c: x.c, lab: x.lab }))));
    g.appendChild(box);

    if (s.takeaway) g.appendChild(takeawayBox(s.takeaway));
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  table(s) {
    /* Past 12 rows a compact table still outgrows the body box,
       so it drops to the dense tier as well (see layouts.css).
       Split tables halve their rows across two columns, so they
       are counted at half length. */
    const isSplit = s.split || false;
    const dataRows = s.rows.filter(r => !(r && r.group !== undefined)).length;
    const effectiveRows = isSplit ? Math.ceil(dataRows / 2) : dataRows;
    const isDense = effectiveRows > 12;
    const isCompact = Boolean(s.compact) || effectiveRows > 10;
    const isRoomy = !isCompact && !isDense && effectiveRows <= 10;
    const roomyBand = effectiveRows <= 3 ? "short"
      : (effectiveRows === 4 ? "medium"
      : (effectiveRows <= 6 ? "long"
      : (effectiveRows <= 8 ? "wide" : "tight")));

    const r = h(
      "div",
      "l-table" +
        (isRoomy ? " l-table--roomy" : "") +
        (isDense ? " l-table--dense" : "")
    );
    r.appendChild(head(s));
    const b = h("div", "body");
    const w = h("div", isSplit ? "tablewrap tablewrap--split" : "tablewrap");

    let tblClass = "dt";
    if (isRoomy) tblClass += ` dt--roomy dt--roomy-${roomyBand}`;
    if (isCompact) tblClass += " dt--compact";
    if (isDense) tblClass += " dt--dense";

    if (isSplit) {
      const half = Math.ceil(s.rows.length / 2);
      [[0, half], [half, s.rows.length]].forEach(([a, z], side) => {
        const t = h("table", tblClass);
        let thead = "<thead><tr>";
        if (s.ranked) thead += '<th class="rank"></th>';
        s.cols.forEach((c, idx) => {
          thead += `<th class="${colClass(s, idx)}">${c}</th>`;
        });
        thead += "</tr></thead>";
        t.innerHTML = thead;

        const tb = h("tbody");
        s.rows.slice(a, z).forEach((row, i) => {
          tb.appendChild(tableRow(row, {
            cols: s.cols.length,
            rank: s.ranked ? a + i + 1 : undefined
          }));
        });

        if (side === 1 && s.total) {
          const tr = h("tr", "is-total");
          const totCells = Array.isArray(s.total) ? s.total : (s.total.cells || ["Total", s.total.claims, s.total.titles, s.total.acres]);
          tr.innerHTML = (s.ranked ? '<td class="rank"></td>' : "")
            + totCells.map((v, i) => tableCell(v, i > 0)).join("");
          tb.appendChild(tr);
        }
        t.appendChild(tb);
        w.appendChild(t);
      });
    } else {
      const t = h("table", tblClass);
      let thead = "<thead><tr>";
      if (s.ranked) thead += '<th class="rank"></th>';
      s.cols.forEach((c, idx) => {
        thead += `<th class="${colClass(s, idx)}">${c}</th>`;
      });
      thead += "</tr></thead>";
      t.innerHTML = thead;

      const tb = h("tbody");
      let n = 0;
      s.rows.forEach(row => {
        /* Announcement rows are not data, so they must not
           consume a rank number. */
        const isGroup = row && row.group !== undefined;
        if (!isGroup) n++;
        tb.appendChild(tableRow(row, {
          cols: s.cols.length,
          rank: s.ranked ? (isGroup ? "" : n) : undefined
        }));
      });

      if (s.total) {
        const tr = h("tr", "is-total");
        const totCells = Array.isArray(s.total) ? s.total : (s.total.cells || ["Total", s.total.claims, s.total.titles, s.total.acres]);
        tr.innerHTML = (s.ranked ? '<td class="rank"></td>' : "")
          + totCells.map((v, i) => tableCell(v, i > 0)).join("");
        tb.appendChild(tr);
      }
      t.appendChild(tb);
      w.appendChild(t);
    }

    b.appendChild(w);
    if (s.note) b.appendChild(h("p", "tablenote", s.note));
    r.appendChild(b);
    return r;
  },

  "table-detail"(s) {
    const r = h("div", "l-table l-table-detail");
    r.appendChild(head(s));
    const b = h("div", "body");
    const w = h("div", "tablewrap tablewrap--detail");
    const t = h("table", "dt dt--detail");
    t.innerHTML = `
      <thead>
        <tr>
          <th rowspan="2" class="state">States / UT</th>
          <th colspan="3">Claims received</th>
          <th colspan="3">Titles distributed</th>
          <th colspan="3">Forest land (acres)</th>
        </tr>
        <tr>
          <th class="num">IFR</th><th class="num">CFR</th><th class="num total">Total</th>
          <th class="num">IFR</th><th class="num">CFR</th><th class="num total">Total</th>
          <th class="num">IFR</th><th class="num">CFR</th><th class="num total">Total</th>
        </tr>
      </thead>`;
    const tb = h("tbody");
    s.rows.forEach(row => {
      const tr = h("tr", row.total ? "is-total" : (row.highlight ? "is-hl" : null));
      const cells = [...row.claims, ...row.titles, ...row.acres];
      tr.innerHTML = `<td class="state">${row.state}</td>` + cells.map((value, i) =>
        `<td class="num${i % 3 === 2 ? " total" : ""}">${value}</td>`
      ).join("");
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    w.appendChild(t);
    b.appendChild(w);
    if (s.note) b.appendChild(h("p", "tablenote", s.note));
    r.appendChild(b);
    return r;
  },

  /* Attributes down, one column per option across. Use when the question is
     "which of these clears every bar", not "how big is each of these". */
  matrix(s) {
    const r = h("div", "l-matrix");
    r.appendChild(head(s));
    const b = h("div", "body");
    const w = h("div", "tablewrap");
    const t = h("table", "mx" + (s.rows.length > 8 ? " mx--dense" : ""));

    /* Widths go inline on the <th>: with table-layout fixed and no
       <colgroup> surviving, every column would otherwise collapse to 1/n
       and every label would wrap. */
    const optW = Math.floor(70 / s.options.length);
    let thead = `<thead><tr><th style="width:30%">${s.attrLabel || ""}</th>`;
    s.options.forEach((o, i) => {
      thead += `<th class="${i === s.pick ? "is-pick" : ""}" style="width:${optW}%">${o}</th>`;
    });
    t.innerHTML = thead + "</tr></thead>";

    const cell = (v, isPick) => {
      let inner;
      if (v === true)       inner = icon("check");
      else if (v === false || v === null || v === undefined || v === "—")
                            inner = '<span class="absent">—</span>';
      else                  inner = typeof v === "number" ? fmt(v) : v;
      return `<td class="${isPick ? "is-pick" : ""}">${inner}</td>`;
    };

    const tb = h("tbody");
    s.rows.forEach(row => {
      const cells = row.cells || row;
      const tr = h("tr", row.verdict ? "is-verdict" : null);
      tr.innerHTML = `<td>${cells[0]}</td>` +
        cells.slice(1).map((v, i) => cell(v, i === s.pick)).join("");
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    w.appendChild(t);
    b.appendChild(w);
    if (s.note) b.appendChild(h("p", "tablenote", s.note));
    r.appendChild(b);
    return r;
  },

  timeline(s) {
    const r = h("div", "l-timeline");
    r.appendChild(head(s));
    const b = h("div", "body");
    const t = h("div", "tl");
    s.items.forEach(x => {
      /* done (default) | next — committed, not yet happened |
         far — further out, and quieter for it. */
      const i = h("div", "tl__i" + (x.state ? ` tl__i--${x.state}` : ""));
      const dotwrap = h("div");
      dotwrap.style.position = "relative";
      dotwrap.appendChild(h("div", "tl__line"));
      dotwrap.appendChild(h("div", "tl__dot"));
      i.appendChild(dotwrap);
      i.appendChild(h("div", "tl__d", x.d));
      i.appendChild(h("div", "tl__t", x.t));
      i.appendChild(h("div", "tl__b", x.b));
      t.appendChild(i);
    });
    b.appendChild(t);
    r.appendChild(b);
    return r;
  },

  hier(s) {
    const r = h("div", "l-hier");
    r.appendChild(head(s));
    const b = h("div", "body");
    const g = h("div", "hier" + (s.items.length > 4 ? " hier--dense" : ""));
    s.items.forEach(x => {
      const i = h("div", "hier__i");
      i.appendChild(h("div", "hier__tag" + (x.muted ? " hier__tag--muted" : ""), x.tag));
      const c = h("div");
      c.appendChild(h("div", "hier__t", x.t + " " + cite(x.cite)));
      c.appendChild(h("div", "hier__b", x.b));
      i.appendChild(c);
      g.appendChild(i);
    });
    b.appendChild(g);
    r.appendChild(b);
    return r;
  },

  closing(s) {
    const r = h("div", "l-closing");
    r.appendChild(h("h2", "closing__t", s.title));
    r.appendChild(h("div", "closing__rule"));
    r.appendChild(h("div", "closing__b", s.b));
    const cf = h("div", "cover__foot");
    cf.style.marginTop = "var(--sp-8)";
    cf.appendChild(h("span", null, s.footL));
    cf.appendChild(h("span", null, s.footR));
    r.appendChild(cf);
    return r;
  }
};

function takeawayBox(t) {
  const p = h("div", "takeaway");
  p.appendChild(h("div", "takeaway__k", (t.icon ? icon(t.icon) : "") + t.k));
  if (t.fig !== undefined) {
    /* Two decimals for a fractional figure, as the rows branch below has
       always done. Rounding ₹2.67 a kilometre to "3" on the one slide whose
       whole point is the per-km rate is a wrong number, not a tidier one. */
    p.appendChild(h("div", "takeaway__fig",
      t.pct ? pct(t.fig)
            : fmt(t.fig, typeof t.fig === "number" && !Number.isInteger(t.fig) ? 2 : 0)));
  }
  if (t.rows) {
    t.rows.forEach(r => {
      const w = h("div");
      w.style.marginTop = "var(--sp-2)";
      w.appendChild(h("div", "takeaway__fig",
        fmt(r.fig, r.fig < 10 ? 2 : 0) + `<span style="font-size:22px;color:var(--text-3)"> ${r.unit}</span>`));
      w.appendChild(h("div", "takeaway__b", r.lab));
      p.appendChild(w);
    });
  }
  if (t.b) p.appendChild(h("div", "takeaway__b", t.b));
  return p;
}

/* ---- mount ------------------------------------------------ */

function build() {
  const root = document.querySelector(".slides");
  const total = DECK.slides.length;

  DECK.slides.forEach((s, idx) => {
    const sec = document.createElement("section");
    const tone = s.tone || "light";
    const footed = !["cover", "section", "closing"].includes(s.layout);

    const slide = h("div",
      `slide slide--${tone} l-${s.layout}` + (footed ? " slide--footed" : ""));

    const builder = LAYOUTS[s.layout];
    if (!builder) { console.error("Unknown layout:", s.layout); return; }

    const inner = builder(s);
    /* Builders return the layout root; merge its classes/children. */
    while (inner.firstChild) slide.appendChild(inner.firstChild);
    slide.className += " " + inner.className;

    if (footed) slide.appendChild(foot(s, idx + 1, total));
    slide.appendChild(gridOverlay());

    sec.appendChild(slide);
    root.appendChild(sec);
  });
}
