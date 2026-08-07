import { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { ThemeProvider } from "./theme/ThemeContext";
import { useTheme } from "./theme/useTheme";
import { getAntdTheme } from "./styles/antdTheme.js";
import "./styles/global.css";

// ── React Query Client ────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// ── Ant Design Bridge ─────────────────────────────────────────────────────────
// Reads CSS variable values after the active theme has been applied to <html>,
// then passes them to ConfigProvider as static token values.
function AntdBridge({ children }) {
  const { themeId } = useTheme();

  // Recompute Ant Design tokens whenever the theme changes.
  // requestAnimationFrame ensures CSS vars have been applied before reading.
  const antdTheme = useMemo(() => {
    return getAntdTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeId]);

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

// ── Root ──────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AntdBridge>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdBridge>
    </ThemeProvider>
  </QueryClientProvider>,
);
