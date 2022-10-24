import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    hot: true,
    // devSourcemap: true,
  },

  build: {
    sourcemap: true,
    // outDir: "dists",
    // fileName: "index",
  },
});
