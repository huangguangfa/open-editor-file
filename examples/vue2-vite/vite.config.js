import { defineConfig } from "vite";
import path from "path";

import { createVuePlugin } from "vite-plugin-vue2";
import { createHtmlPlugin } from "vite-plugin-html";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
import { openEditorFileServicePlugin } from "open-editor-file/vite";

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
export default defineConfig({
  root: "./",
  publicDir: "public",
  base: "./",
  mode: "development",
  optimizeDeps: {
    include: [],
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      "@img": resolve("src/assets/images"),
      "@components": resolve("src/components"),
      "@view": resolve("src/view"),
      "@service": resolve("src/service"),
      "@lib": resolve("src/lib"),
      "@envPath": resolve("src/environments/environment.test.js"),
      "~": path.join(__dirname, "node_modules"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], //解决vite一定要.vue组件问题
  },
  plugins: [
    openEditorFileServicePlugin(),
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        injectH: false,
        compositionAPI: true,
      },
    }),
    createHtmlPlugin({
      minify: true,
      entry: "src/main.js",
      template: "public/index.html", //指定index.html路径
      inject: {
        data: {
          title: "index",
          injectScript: '<script src="./inject.js"></script>',
        },
        tags: [
          {
            injectTo: "body-prepend",
            tag: "div",
            attrs: {
              id: "tag",
            },
          },
        ],
      },
    }),
    ViteRequireContext(),
  ],
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3001,
    proxy: {},
    host: true,
  },
});
