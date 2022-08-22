import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { openEditorFileServicePlugin } from "open-editor-file/vite";

export default defineConfig({
  plugins: [vue(), openEditorFileServicePlugin()],
  // define: {
  //   __VUE_OPTIONS_API__: false, // 关闭vue2兼容
  // },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
