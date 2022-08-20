/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 *
 * Modified by Yuxi Evan You
 */

import fs from "fs";
import os from "os";
import path from "path";
import childProcess from "child_process";
import type { specifiedEditor, onErrorCallback } from "../types";

import { guessEditor } from "./guess";
import { getArgumentsForPosition } from "./get-args";

function wrapErrorCallback(
  cb: (fileName: string, errorMessage: string) => void
) {
  return (fileName: string, errorMessage: string) => {
    if (errorMessage) {
      if (errorMessage[errorMessage.length - 1] !== ".") {
        errorMessage += ".";
      }
    }
    if (cb) cb(fileName, errorMessage);
  };
}

function isTerminalEditor(editor: string) {
  switch (editor) {
    case "vim":
    case "emacs":
    case "nano":
      return true;
  }
  return false;
}

const positionRE = /:(\d+)(:(\d+))?$/;
function parseFile(file: string) {
  const fileName = file.replace(positionRE, "");
  const match = file.match(positionRE);
  const lineNumber = match && match[1];
  const columnNumber = match && match[3];
  return {
    fileName,
    lineNumber,
    columnNumber,
  };
}

let _childProcess: childProcess.ChildProcess | null = null;

export function launchEditor(
  file: string,
  specifiedEditor: specifiedEditor,
  onErrorCallback: onErrorCallback
) {
  const parsed = parseFile(file);
  let { fileName } = parsed;
  const { lineNumber, columnNumber } = parsed;

  if (!fs.existsSync(fileName)) {
    return;
  }

  if (typeof specifiedEditor === "function") {
    onErrorCallback = specifiedEditor;
    specifiedEditor = undefined;
  }

  onErrorCallback = wrapErrorCallback(onErrorCallback);

  const [editor, ...args] = guessEditor(specifiedEditor);
  
  if (!editor) {
    onErrorCallback(fileName, null);
    return;
  }

  if (
    process.platform === "linux" &&
    fileName.startsWith("/mnt/") &&
    /Microsoft/i.test(os.release())
  ) {
    fileName = path.relative("", fileName);
  }

  if (lineNumber) {
    const extraArgs = getArgumentsForPosition(
      editor,
      fileName,
      lineNumber,
      columnNumber as string
    );
    args.push.apply(args, extraArgs);
  } else {
    args.push(fileName);
  }

  if (_childProcess && isTerminalEditor(editor as string)) {
    // There's an existing editor process already and it's attached
    // to the terminal, so go kill it. Otherwise two separate editor
    // instances attach to the stdin/stdout which gets confusing.
    _childProcess.kill("SIGKILL");
  }

  if (process.platform === "win32") {
    // On Windows, launch the editor in a shell because spawn can only
    // launch .exe files.
    _childProcess = childProcess.spawn(
      "cmd.exe",
      ["/C", editor as string].concat(args as any[]),
      {
        stdio: "inherit",
      }
    );
  } else {
    _childProcess = childProcess.spawn(editor as string, args as any[], {
      stdio: "inherit",
    });
  }
  _childProcess?.on("exit", function (errorCode) {
    _childProcess = null;

    if (errorCode) {
      onErrorCallback(fileName, "(code " + errorCode + ")");
    }
  });

  _childProcess?.on("error", function (error) {
    onErrorCallback(fileName, error.message);
  });
}
