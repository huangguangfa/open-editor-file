import url from "url";
import path from "path";
import { launchEditor } from "./core/launch-editor";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";

export default function (
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
    console.log(file);
    if (!file) {
      // res.statusCode = 500;
      res.end(
        `launch-editor-middleware: required query param "file" is missing.`
      );
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
