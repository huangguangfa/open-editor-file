import { options as defaultOptions } from "../config";
import { throwError } from "../utils";
interface Options {
  keyName: string | Array<string>;
}

export function injectGetEditorFile(options?: Options) {
  const { keyName } = options || {};
  const state = {
    keyName: "",
    keyList: defaultOptions.keyName,
  };

  if (Array.isArray(keyName)) state.keyList = keyName as Array<string>;
  if (typeof keyName === "string") state.keyList.push(keyName);

  document.onkeyup = function () {
    state.keyName = "";
  };
  document.onkeydown = function (event) {
    event = event || window.event;
    state.keyName = event.key;
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
    });
  };
}
