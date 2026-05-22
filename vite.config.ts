import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Vercel-targeted TanStack Start build.
// No Cloudflare plugins — server bundle is plain Node/ESM and is wired to a
// single Vercel serverless function in /api/[...all].ts.
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  ssr: {
    noExternal: [
      "@tanstack/start-server-core",
      "@tanstack/start-client-core",
      "@tanstack/react-start",
      "@tanstack/react-start-client",
      "@tanstack/react-start-server",
      "@tanstack/react-router",
      "@tanstack/router-core",
      "@tanstack/history",
    ],
  },
  server: {
    host: true,
    port: 5173,
  },
});
