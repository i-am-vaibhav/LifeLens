
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "endangeredSpecies",
      filename: "remoteEntry.js",
      exposes: {
        "./EndangeredSpecies": "./src/components/EndangeredSpecies.tsx",
      },
      shared: ["react", "react-dom", "jotai"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});