import type { ElMap } from "./get-file-path";

export function createMarkComNameChild(
  comName: string,
  highlight: string
): HTMLElement {
  const span: any = document.createElement("span");
  span.style = `position: absolute;
  left: 0;
  top: -15px;
  zIndex: 111;
  fontSize: 12px;
  cursor:pointer;
  color: ${highlight}`;
  span.innerText = comName;
  return span;
}

export function displayMark(elMap: ElMap) {
  for (let el of elMap.keys()) {
    const { markComChild, highlight } = elMap.get(el) || {};
    el.style.border = `1px solid ${highlight}`;
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
