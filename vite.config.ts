import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import critical from "rollup-plugin-critical";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    critical({
      criticalUrl: '/',          // URL da página que será analisada
      criticalBase: './dist/',   // pasta de saída do build
      criticalPages: [
        { uri: '', template: 'index.html' }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
