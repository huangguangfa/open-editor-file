import path from "path";
import shellQuote from "shell-quote";
import childProcess from "child_process";

import {
  COMMON_EDITORS_OSX,
  COMMON_EDITORS_LINUX,
  COMMON_EDITORS_WIN,
} from "../config";

export function guessEditor(specifiedEditor: string | undefined) {
  if (specifiedEditor) {
    return shellQuote.parse(specifiedEditor);
  }
  // We can find out which editor is currently running by:
  // `ps x` on macOS and Linux
  // `Get-Process` on Windows
  try {
    if (process.platform === "darwin") {
      const output = childProcess.execSync("ps x").toString();
      const processNames = Object.keys(COMMON_EDITORS_OSX);
      for (let i = 0; i < processNames.length; i++) {
        const processName = processNames[i];
        if (output.indexOf(processName) !== -1) {
          return [
            COMMON_EDITORS_OSX[processName as keyof typeof COMMON_EDITORS_OSX],
          ];
        }
      }
    } else if (process.platform === "win32") {
      const output = childProcess
        .execSync('powershell -Command "Get-Process | Select-Object Path"', {
          stdio: ["pipe", "pipe", "ignore"],
        })
        .toString();
      const runningProcesses = output.split("\r\n");
      for (let i = 0; i < runningProcesses.length; i++) {
        // `Get-Process` sometimes returns empty lines
        if (!runningProcesses[i]) {
          continue;
        }

        const fullProcessPath = runningProcesses[i].trim();
        const shortProcessName = path.basename(fullProcessPath);

        if (COMMON_EDITORS_WIN.indexOf(shortProcessName) !== -1) {
          return [fullProcessPath];
        }
      }
    } else if (process.platform === "linux") {
      // --no-heading No header line
      // x List all processes owned by you
      // -o comm Need only names column
      const output = childProcess
        .execSync("ps x --no-heading -o comm --sort=comm")
        .toString();
      const processNames = Object.keys(COMMON_EDITORS_LINUX);
      for (let i = 0; i < processNames.length; i++) {
        const processName = processNames[i];
        if (output.indexOf(processName) !== -1) {
          return [
            COMMON_EDITORS_LINUX[
              processName as keyof typeof COMMON_EDITORS_LINUX
            ],
          ];
        }
      }
    }
  } catch (error) {
    // Ignore...
  }

  // Last resort, use old skool env vars
  if (process.env.VISUAL) {
    return [process.env.VISUAL];
  } else if (process.env.EDITOR) {
    return [process.env.EDITOR];
  }

  return [null];
}
