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
    format: "iife",
    minify: false,
    rollupOptions: {
      output: {
        format: "iife",
        name: "FlashDocs",
        extend: true,
        entryFileNames: "[name].js",
        // 包装成立即执行函数
        banner: "(function (global) {",
        footer: "})(window);",
      },
    },
  },
});
