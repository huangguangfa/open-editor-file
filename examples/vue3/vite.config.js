import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { openFileServicePlugin } from "open-vscode-file/vite";

// function customServicePlugin() {
//   return {
//     name: "custom-service-plugin",
//     configureServer(server) {
//       server.middlewares.use(openCodefile());
//     },
//   };
// }

export default defineConfig({
  plugins: [vue(), openFileServicePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
