import { options as defaultOptions } from "../config";
import { throwError } from "../utils";
import { displayMark, hideMark, createMarkComNameChild } from "../core/dom";

interface Options {
  keyName: string | Array<string>;
  highlight: string;
  isHighlight: boolean;
}

export type ElMap = Map<HTMLElement, ElMapValue>;
export interface ElMapValue {
  comName: string;
  origStyle: object;
  markComChild: HTMLElement;
  highlight: string;
  filePath: string;
}

const elMap: ElMap = new Map();

export function openEditorFilePlugin(options?: Options) {
  const { keyName, highlight, isHighlight } = options || {};
  const state = {
    keyName: "",
    keyList: defaultOptions.keyName,
    highlight: highlight ?? defaultOptions.highlight,
    isHighlight: isHighlight ?? true,
    isKeyName: false,
  };

  if (Array.isArray(keyName)) state.keyList = keyName as Array<string>;
  if (typeof keyName === "string") state.keyList.push(keyName);

  document.onkeyup = function () {
    if (state.isKeyName) {
      state.keyName = "";
      state.isHighlight && hideMark(elMap);
      state.isKeyName = false;
    }
  };
  document.onkeydown = function (event) {
    event = event || window.event;
    state.keyName = event.key;
    if (state.keyList.includes(state.keyName)) {
      state.isHighlight && displayMark(elMap);
      state.isKeyName = true;
      return;
    }
    state.isKeyName = false;
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
          const pathIndex = __file.lastIndexOf("/");
          let comName = __file.substr(pathIndex + 1);
          const rootVue = "index.vue";
          const comNameList = __file.split("/");
          // 解决都是index.vue的问题
          if (comName === rootVue) {
            comName = comNameList[comNameList.length - 2] + "/" + comName;
          }
          const comInfo = {
            comName,
            origStyle: this.$el.attributes[1]?.value || "",
            markComChild: createMarkComNameChild(comName, __file),
            highlight: state.highlight,
            filePath: __file,
          };
          elMap.set(this.$el as HTMLElement, comInfo);
          this.$el.addEventListener("click", (e: Event) => {
            if (state.isKeyName) {
              const param = `?file=${__file}`;
              const url = `${defaultOptions.serverPath}${param}`;
              console.log("%c 打开文件成功!", "color: green;");
              state.keyName = "";
              state.isKeyName = false;
              hideMark(elMap);
              fetch(url);
              e.stopPropagation();
            }
          });
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
