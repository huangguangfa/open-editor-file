import openCodefile from "./index";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";
import type { ViteDevServer } from "vite";

export function openFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
) {
  return {
    name: "openCodefile-service-plugin",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        openCodefile(specifiedEditor, srcRoot, onErrorCallback)
      );
    },
  };
}
