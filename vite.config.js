import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        zh: resolve(__dirname, "src/zh.js"),
        en: resolve(__dirname, "src/en.js"),
      },
    },
  },
});
