import { openEditorFile } from "./index";
import { openEditorFilePlugin } from "./core/get-file-path";
import { options } from "./config";

import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";

function openEditorFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
) {
  return function (app: any) {
    app.use(
      `/${options.serverPath}`,
      openEditorFile(specifiedEditor, srcRoot, onErrorCallback)
    );
  };
}

export { openEditorFilePlugin, openEditorFileServicePlugin };
