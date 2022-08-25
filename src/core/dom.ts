import { randomColor } from "../utils";
import type { ElMap } from "./get-file-path";

function setMarkComStyle(highlight = "#000") {
  return `position: absolute;
  left: 0;
  top: 0px;
  zIndex: 111;
  font-size: 12px;
  cursor:pointer;
  background:${randomColor()};
  width:100%;
  height:100%;
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
