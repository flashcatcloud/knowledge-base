import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";
// 创建 ESM 配置
const esmConfig = {
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        zh: resolve(__dirname, "src/zh.js"),
        en: resolve(__dirname, "src/en.js"),
      },
    },
    format: "es",
    rollupOptions: {
      output: {
        entryFileNames: "esm/[name].js",
        footer: "export default zhDocs;",
      },
    },
  },
};

// 创建 IIFE 配置
const iifeConfig = {
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        zh: resolve(__dirname, "src/zh.js"),
        en: resolve(__dirname, "src/en.js"),
      },
    },
    format: "iife",
    rollupOptions: {
      output: {
        entryFileNames: "iife/[name].js",
        // 包装成立即执行函数
        banner: "(function (global) {",
        footer: `})(window);`,
      },
    },
  },
};

// 根据命令行参数选择配置
export default defineConfig(({ command, mode }) => {
  if (mode === "iife") {
    return iifeConfig;
  }
  return esmConfig;
});
