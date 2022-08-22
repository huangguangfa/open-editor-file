import url from "url";
import path from "path";
import { launchEditor } from "./core/launch-editor";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";
import { openEditorFilePlugin } from "./core/get-file-path";

function openEditorFile(
  specifiedEditor: specifiedEditor,
  srcRoot: srcRoot,
  onErrorCallback: onErrorCallback
) {
  if (typeof specifiedEditor === "function") {
    onErrorCallback = specifiedEditor;
    specifiedEditor = undefined;
  }

  if (typeof srcRoot === "function") {
    onErrorCallback = srcRoot;
    srcRoot = undefined;
  }

  srcRoot = srcRoot || process.cwd();

  return function launchEditorMiddleware(req: any, res: any, next: any) {
    const { file } = url.parse(req.url, true).query || {};
    if (!file) {
      res.end(
        `launch-editor-middleware: required query param "file" is missing.`
      );
      next();
    } else {
      launchEditor(
        path.resolve(srcRoot as string, file as string),
        specifiedEditor,
        onErrorCallback
      );
      res.end();
    }
  };
}

export { openEditorFilePlugin, openEditorFile };
