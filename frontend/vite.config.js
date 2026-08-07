import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor code into separate chunks for better browser caching.
    // Vite 8 uses rolldown which requires manualChunks as a function.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@xyflow") || id.includes("dagre")) {
              return "vendor-flow";
            }
            if (id.includes("antd") || id.includes("@ant-design")) {
              return "vendor-antd";
            }
            if (id.includes("@tanstack") || id.includes("axios")) {
              return "vendor-query";
            }
            if (
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("react/")
            ) {
              return "vendor-react";
            }
          }
        },
      },
    },
  },
});
