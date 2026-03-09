import { resolve } from "path";
import { readFileSync } from "fs";
import { defineConfig, mergeConfig } from "vite";

function formatMd(content) {
  let result = content;
  result = result.replace(/^---[\s\S]*?---\n*/, "");
  result = result.replace(
    /^\s*:{3,}\s*\w[^\n]*\n([\s\S]*?)^\s*:{3,}\s*$/gm,
    (_, inner) => {
      return inner
        .trimEnd()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    }
  );
  return result;
}

function formatMarkdownPlugin() {
  return {
    name: "format-markdown-raw",
    enforce: "pre",
    load(id) {
      if (/\.md\?raw$/.test(id)) {
        const filePath = id.replace(/\?raw$/, "");
        const content = readFileSync(filePath, "utf-8");
        return `export default ${JSON.stringify(formatMd(content))}`;
      }
    },
  };
}

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
  const plugins = [formatMarkdownPlugin()];
  if (mode === "iife") {
    plugins.push(transformCodePlugin(mode));
    return mergeConfig(iifeConfig, { plugins });
  }
  return mergeConfig(esmConfig, { plugins });
});
