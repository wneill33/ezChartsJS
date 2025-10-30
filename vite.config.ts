import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "examples",
  build: {
    outDir: "../dist-examples",
  },
  resolve: {
    alias: {
      ezcharts: resolve(__dirname, "./src/index.ts"),
    },
  },
});
