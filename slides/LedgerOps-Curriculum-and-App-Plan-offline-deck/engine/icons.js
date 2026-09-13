/* ============================================================
   ICON SPRITE
   Pattern adapted from the Card Atlas design system: one inline
   <symbol> sprite, referenced by <use>. No network, no icon
   font, inherits currentColor, scales without blurring.

   Deliberately small. The deck this replaced failed partly by
   putting a pastel icon tile on every row; icons here are
   wayfinding, not decoration - they appear only where a label
   alone is ambiguous.

   24x24, stroke style, no fill. Add symbols as needed.
   ============================================================ */

const ICON_SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></symbol>
<symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9.5 18.5h5M10.5 21h3M8 11a4 4 0 1 1 8 0c0 2-1.4 3-2 4.5h-4C9.4 14 8 13 8 11z"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/></symbol>
<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3.2"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-11"/></symbol>
<symbol id="i-scale" viewBox="0 0 24 24"><path d="M12 3.5v17M8 20.5h8M5 7.5h14"/><path d="M5 7.5 2.5 14a2.6 2.6 0 0 0 5 0zM19 7.5 16.5 14a2.6 2.6 0 0 0 5 0z"/></symbol>
<symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5 5 6.2v5.3c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6.2z"/><path d="m9 12 2 2 4-4.5"/></symbol>
<symbol id="i-flag" viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></symbol>
<symbol id="i-warn" viewBox="0 0 24 24"><path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/></symbol>
</svg>`;

function mountIcons() {
  document.body.insertAdjacentHTML("afterbegin", ICON_SPRITE);
}

/* <svg class="ic"><use href="#i-name"/></svg> */
function icon(name, cls) {
  return `<svg class="ic ${cls || ""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}
