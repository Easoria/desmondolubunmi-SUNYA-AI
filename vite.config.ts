import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// On Vercel, Nitro emits Vercel Build Output in .vercel/output (no manual
// api/ function or vercel.json needed). Elsewhere (Lovable preview/build
// checks) it emits a standard build into dist/.
const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro(
      isVercel
        ? { preset: "vercel" }
        : { output: { dir: path.resolve(__dirname, "dist") } },
    ),
    viteReact(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  server: {
    host: true,
    port: 5173,
  },
});
