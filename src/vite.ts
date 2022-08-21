import { openEditorFile } from "./index";
import { options } from "./config";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";
import type { ViteDevServer, Plugin } from "vite";

export function openFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
): Plugin {
  return {
    name: "openCodeFileService-plugin",
    configureServer(server: ViteDevServer) {
      const openEditorFiles = openEditorFile(
        specifiedEditor,
        srcRoot,
        onErrorCallback
      );
      server.middlewares.use(function (req, res, next) {
        if (req.url?.includes(options.serverPath)) {
          openEditorFiles(req, res, next);
        } else {
          next();
        }
      });
    },
  };
}
