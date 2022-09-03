import path from "path";
import { ParseEntry } from "shell-quote";

export function getArgumentsForPosition(
  editor: ParseEntry | string,
  fileName: string,
  lineNumber: string,
  columnNumber = "1"
) {
  const editorBasename = path
    .basename(editor as string)
    .replace(/\.(exe|cmd|bat)$/i, "");
  switch (editorBasename) {
    case "atom":
    case "Atom":
    case "Atom Beta":
    case "subl":
    case "sublime":
    case "sublime_text":
    case "wstorm":
    case "charm":
      return [`${fileName}:${lineNumber}:${columnNumber}`];
    case "notepad++":
      return ["-n" + lineNumber, fileName];
    case "vim":
    case "mvim":
      return [`+call cursor(${lineNumber}, ${columnNumber})`, fileName];
    case "joe":
      return ["+" + `${lineNumber}`, fileName];
    case "emacs":
    case "emacsclient":
      return [`+${lineNumber}:${columnNumber}`, fileName];
    case "rmate":
    case "mate":
    case "mine":
      return ["--line", lineNumber, fileName];
    case "code":
    case "code-insiders":
    case "Code":
      return ["-r", "-g", `${fileName}:${lineNumber}:${columnNumber}`];
    case "appcode":
    case "clion":
    case "clion64":
    case "idea":
    case "idea64":
    case "phpstorm":
    case "phpstorm64":
    case "pycharm":
    case "pycharm64":
    case "rubymine":
    case "rubymine64":
    case "webstorm":
    case "webstorm64":
      return ["--line", lineNumber, fileName];
  }

  // For all others, drop the lineNumber until we have
  // a mapping above, since providing the lineNumber incorrectly
  // can result in errors or confusing behavior.
  return [fileName];
}
