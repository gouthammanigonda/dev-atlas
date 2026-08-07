import { useCallback, useEffect, useMemo, useState } from "react";

import { ThemeContext } from "./useTheme";
import { DEFAULT_THEME, themes } from "./themeConfig";

const STORAGE_KEY = "dev-atlas-theme";

// ── Resolve the initial theme ─────────────────────────────────────────────────
// Priority: localStorage → prefers-color-scheme → DEFAULT_THEME
function resolveInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && themes.find((t) => t.id === saved)) return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// ── Apply theme to DOM ─────────────────────────────────────────────────────────
function applyTheme(id) {
  document.documentElement.setAttribute("data-theme", id);
  localStorage.setItem(STORAGE_KEY, id);
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    const id = resolveInitialTheme();
    applyTheme(id);
    return id;
  });

  const setTheme = useCallback((id) => {
    applyTheme(id);
    setThemeId(id);
  }, []);

  // Keep data-theme in sync if themeId changes (e.g. SSR hydration edge case)
  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  const value = useMemo(
    () => ({ themeId, setTheme, themes }),
    [themeId, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
