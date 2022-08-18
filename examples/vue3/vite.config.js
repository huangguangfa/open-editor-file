import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import openCodefile from "../../src/index.ts";

function customServicePlugin() {
  return {
    name: "custom-service-plugin",
    configureServer(server) {
      server.middlewares.use(openCodefile());
    },
  };
}

export default defineConfig({
  plugins: [vue(), customServicePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
