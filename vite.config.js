import { resolve } from "path";
import { defineConfig, mergeConfig } from "vite";

function transformCodePlugin(mode) {
  return {
    name: "transform-code-plugin",
    transform(code, id) {
      if (id.includes("src/en.ts") || id.includes("src/zh.ts")) {
        const name = id.includes("en.ts") ? "FlashDocsEn" : "FlashDocsZh";
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
        zh: resolve(__dirname, "src/zh.ts"),
        en: resolve(__dirname, "src/en.ts"),
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
        zh: resolve(__dirname, "src/zh.ts"),
        en: resolve(__dirname, "src/en.ts"),
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
