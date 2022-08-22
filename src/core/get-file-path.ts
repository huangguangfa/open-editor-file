import { options as defaultOptions } from "../config";

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
    Vue.mixin({
      mounted() {
        const { __file } = this.$options;
        if (__file && this._uid > 1 && this.$el && this.$el.nodeType === 1) {
          this.$el.onclick = function () {
            if (state.keyList.includes(state.keyName)) {
              const param = `?file=${__file}`;
              const url = `${defaultOptions.serverPath}${param}`;
              console.log(url);
              fetch(url);
            }
          };
        }
      },
    });
  };
}
