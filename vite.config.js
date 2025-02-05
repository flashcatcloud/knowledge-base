import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";

function transformCodePlugin(mode) {
  return {
    name: "transform-code-plugin",
    transform(code, id) {
      if (id.includes("src/en.js") || id.includes("src/zh.js")) {
        const name = id.includes("en.js") ? "FlashDocsEn" : "FlashDocsZh";
        if (mode === "iife") {
          return `${code.replace(
            "export default docs;",
            ""
          )} global.${name} = docs;`;
        }
      }
    },
  };
}
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
    return mergeConfig(iifeConfig, {
      plugins: [transformCodePlugin(mode)],
    });
  }
  return esmConfig;
});
