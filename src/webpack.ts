import openCodefile from "./index";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";

export function openFileServicePlugin(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
) {
  return function (app: any) {
    console.log(app)
    app.use('/__open-in-editors', openCodefile(specifiedEditor, srcRoot, onErrorCallback))
  }
}
