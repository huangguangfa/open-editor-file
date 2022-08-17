import url from "url";
import path from "path";
import { launch } from "./core/launch-editor";
import type { specifiedEditor, srcRoot, onErrorCallback } from "./types";
// const launch = require('./launch-editor')

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

  return function launchEditorMiddleware(req: any, res: any) {
    const { file } = url.parse(req.url, true).query || {};
    if (!file) {
      res.statusCode = 500;
      res.end(
        `launch-editor-middleware: required query param "file" is missing.`
      );
    } else {
      launch(
        path.resolve(srcRoot as string, file as string),
        specifiedEditor,
        onErrorCallback
      );
      res.end();
    }
  };
}
