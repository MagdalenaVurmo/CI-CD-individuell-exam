import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    coverage: {
      provider: "v8",
      all: true,
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/**/*.test.{js,jsx}",
        "src/**/*.scss",
        "src/main.jsx", 
        "src/App.jsx", 
        "src/router.jsx", 
        "src/__tests__/**", 
      ],
      thresholds: {
        perFile: false,
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});