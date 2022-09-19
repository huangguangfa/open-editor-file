import { openEditorFile } from "./index";
import { options } from "./config";
import { openEditorFilePlugin } from "./core/get-file-path";

import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";
import type { ViteDevServer, Plugin } from "vite";

function openEditorFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
): Plugin {
  return {
    name: "openCodeFileService-plugin",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        options.serverPath,
        openEditorFile(specifiedEditor, srcRoot, onErrorCallback)
      );
    },
  };
}

export { openEditorFilePlugin, openEditorFileServicePlugin };
