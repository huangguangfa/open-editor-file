import { openEditorFile, injectGetEditorFile } from "./index";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";

function openFileServicePlugin(
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

export { injectGetEditorFile, openFileServicePlugin };
