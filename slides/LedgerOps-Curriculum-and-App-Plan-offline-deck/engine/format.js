/* ============================================================
   FORMATTING
   Indian digit grouping (lakh / crore), used everywhere so a
   figure is never hand-typed with separators.
   ============================================================ */

/* 2513062 -> "25,13,062"  (last three, then pairs) */
function fmt(n, decimals) {
  if (n === null || n === undefined) return "—";
  /* A deck legitimately carries non-numeric figures: "?" where no rating
     exists, "—" where a column does not apply. Formatting one produced the
     literal string NaN on the slide, which is worse than the value it was
     hiding. Anything that is not a number comes back untouched. */
  if (typeof n !== "number" || !Number.isFinite(n)) return String(n);
  const neg = n < 0;
  n = Math.abs(n);

  let frac = "";
  if (decimals) {
    frac = "." + n.toFixed(decimals).split(".")[1];
    n = Math.floor(n);
  } else {
    n = Math.round(n);
  }

  const s = String(n);
  let out;
  if (s.length <= 3) {
    out = s;
  } else {
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    const parts = [];
    while (rest.length > 2) {
      parts.unshift(rest.slice(-2));
      rest = rest.slice(0, -2);
    }
    if (rest.length) parts.unshift(rest);
    out = parts.join(",") + "," + last3;
  }
  return (neg ? "-" : "") + out + frac;
}

/* 0.4874 -> "48.7%" */
function pct(x, decimals) {
  const d = decimals === undefined ? 1 : decimals;
  return (x * 100).toFixed(d).replace(/\.0$/, "") + "%";
}

/* Large acre counts read better in crore/lakh on hero slides */
function fmtShort(n) {
  if (n >= 10000000) return (n / 10000000).toFixed(2).replace(/\.?0+$/, "") + " करोड़";
  if (n >= 100000)   return (n / 100000).toFixed(2).replace(/\.?0+$/, "") + " लाख";
  return fmt(n);
}

/* Escape nothing — content is authored, not user input — but
   keep a single choke point in case that ever changes. */
function html(s) { return s === undefined || s === null ? "" : String(s); }
