import { randomColor } from "../utils";
import type { ElMap } from "./get-file-path";

function setMarkComStyle(highlight = "#000") {
  return `
  position: fixed;
  zIndex: 9999;
  font-size: 12px;
  cursor:pointer;
  background:${randomColor()};
  color: ${highlight}`;
}

export function createMarkComNameChild(
  comName: string,
  filePath: string
): HTMLElement {
  const span: HTMLElement = document.createElement("span");
  span.innerText = comName;
  span.title = filePath;
  return span;
}

export function displayMark(elMap: ElMap) {
  for (let el of elMap.keys()) {
    const { markComChild, highlight } = elMap.get(el) || {};
    markComChild && ((markComChild.style as any) = setMarkComStyle(highlight));
    el.appendChild(markComChild as HTMLElement);
  }
}

export function hideMark(elMap: ElMap) {
  for (let el of elMap.keys()) {
    const { origStyle, markComChild } = elMap.get(el) || {};
    (el.style as any) = origStyle || {};
    el.removeChild(markComChild as HTMLElement);
  }
}
