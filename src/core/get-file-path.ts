import { options as defaultOptions } from "../config";
import { throwError } from "../utils";
import { displayMark, hideMark, createMarkComNameChild } from "../core/dom";

interface Options {
  keyName: string | Array<string>;
}

export type ElMap = Map<HTMLElement, ElMapValue>;
export interface ElMapValue {
  comName: string;
  origStyle: object;
  markComChild: HTMLElement;
}

const elMap: ElMap = new Map();

export function openEditorFilePlugin(options?: Options) {
  const { keyName } = options || {};
  const state = {
    keyName: "",
    keyList: defaultOptions.keyName,
  };

  if (Array.isArray(keyName)) state.keyList = keyName as Array<string>;
  if (typeof keyName === "string") state.keyList.push(keyName);

  document.onkeyup = function () {
    state.keyName = "";
    hideMark(elMap);
  };
  document.onkeydown = function (event) {
    event = event || window.event;
    state.keyName = event.key;
    displayMark(elMap);
  };
  return function (Vue: any) {
    const vueVersion = Vue.version.slice(0, 1);
    const isVue3 = vueVersion === "3";
    const flag = isVue3 ? 0 : 1;
    // @ts-ignore
    if (isVue3 && __VUE_OPTIONS_API__ === false) {
      return throwError(
        "当前vue3项目关闭了适配vue2的语法、请在vite.config配置define.__VUE_OPTIONS_API__ = true进行开启!!!"
      );
    }
    Vue.mixin({
      mounted() {
        const { __file } = this.$options;
        const rootUid = this._uid || this.$?.uid;
        if (__file && rootUid > flag && this.$el && this.$el.nodeType === 1) {
          console.log(this.$el.style);
          const comName = __file.substr(__file.lastIndexOf("/") + 1);
          elMap.set(this.$el as HTMLElement, {
            comName,
            origStyle: this.$el.style || "",
            markComChild: createMarkComNameChild(comName),
          });
          this.$el.onclick = function () {
            if (state.keyList.includes(state.keyName)) {
              const param = `?file=${__file}`;
              const url = `${defaultOptions.serverPath}${param}`;
              console.log("%c 打开文件成功!", "color: green;");
              fetch(url);
            }
          };
        }
      },
      destroyed() {
        elMap.delete(this.$el);
      },
      // 兼容vue3
      unmounted() {
        elMap.delete(this.$el);
      },
    });
  };
}
