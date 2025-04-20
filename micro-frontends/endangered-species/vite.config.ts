
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
        "./Dashboard": "./src/components/Dashboard.tsx",
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "jotai": {
          singleton: true,
          requiredVersion: "^2.12.3",
        },
        "@chakra-ui/react": {
          singleton: true,
          requiredVersion: "^3.16.0", // adjust as per your installed version
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: "^11.14.0",
        },
        "@emotion/styled": {
          singleton: true,
          requiredVersion: "^11.14.0",
        },
        "framer-motion": {
          singleton: true,
          requiredVersion: "^12.7.3",
        },
      }, 
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