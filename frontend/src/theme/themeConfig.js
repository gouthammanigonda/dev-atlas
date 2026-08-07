// ── Theme Registry ────────────────────────────────────────────────────────────
// This is the single source of truth for all registered themes.
// Adding a new theme requires:
//   1. Adding a new [data-theme="id"] block in src/styles/themes.css
//   2. Adding one entry to this array
// No other files need modification.

export const themes = [
  { id: "dark",    name: "Dark",    icon: "🌙" },
  { id: "light",   name: "Light",   icon: "☀️" },
  { id: "dracula", name: "Dracula", icon: "🟣" },
  { id: "forest",  name: "Forest",  icon: "🌲" },
  { id: "ocean",   name: "Ocean",   icon: "🌊" },
  { id: "sunset",  name: "Sunset",  icon: "🌅" },
];

export const DEFAULT_THEME = "dark";
