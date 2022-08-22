import { openEditorFile, openEditorFilePlugin } from "./index";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";

function openEditorFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
) {
  return function (app: any) {
    app.use(
      "/__open-in-editors",
      openEditorFile(specifiedEditor, srcRoot, onErrorCallback)
    );
  };
}

export { openEditorFilePlugin, openEditorFileServicePlugin };
