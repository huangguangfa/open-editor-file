import { randomColor } from "../utils";
import type { ElMap } from "./get-file-path";

function setMarkComStyle(highlight = "#000") {
  return `
  position: fixed;
  zIndex: 9999;
  font-size: 12px;
  cursor:pointer;
  background:${randomColor()};
  display:block;
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
    if (!(markComChild?.parentNode === el)) {
      el.appendChild(markComChild as HTMLElement);
    }
  }
}

export function hideMark(elMap: ElMap) {
  for (let el of elMap.keys()) {
    const { markComChild } = elMap.get(el) || {};
    if (markComChild?.style?.display) {
      markComChild!.style!.display = "none";
    }
  }
}
