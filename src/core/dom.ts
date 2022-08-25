import { randomColor } from "../utils";
import type { ElMap } from "./get-file-path";

export function createMarkComNameChild(
  comName: string,
  highlight: string
): HTMLElement {
  const span: any = document.createElement("span");
  span.style = `position: absolute;
  left: 0;
  top: 0px;
  zIndex: 111;
  fontSize: 12px;
  cursor:pointer;
  background:${randomColor()};
  width:100%;
  height:100%;
  color: ${highlight}`;
  span.innerText = comName;
  return span;
}

export function displayMark(elMap: ElMap) {
  for (let el of elMap.keys()) {
    const { markComChild } = elMap.get(el) || {};
    el.style.position = "relative";
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
