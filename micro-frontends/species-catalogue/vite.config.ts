import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "speciesCatalogue",
      filename: "remoteEntry.js",
      exposes: {
        "./SpeciesCatalogue": "./src/components/SpeciesCatalogue.tsx", 
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-icons": {
          singleton: true,
          requiredVersion: "^5.5.0",
        },
        jotai: {
          singleton: true,
          requiredVersion: "^2.12.3",
        },
        "@chakra-ui/react": {
          singleton: true,
          requiredVersion: "^3.16.0",
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
    port: 3001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});