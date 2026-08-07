import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { antdTheme } from "./styles/antdTheme.js";
import "./styles/global.css";

// ── React Query Client ────────────────────────────────────────────────────────
// Production-tuned defaults:
//   staleTime  — data is fresh for 5 min; avoids redundant refetches
//   retry      — retry failed requests up to 2 times before showing an error
//   refetchOnWindowFocus — disabled to avoid surprising refetches when the
//                          user alt-tabs back to the tab
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </QueryClientProvider>,
);
