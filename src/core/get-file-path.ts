import { options } from "../config";
export function injectGetEditorFile(Vue: any) {
  const state = {
    keyName: "",
  };
  document.onkeyup = function () {
    console.log("放开了");
    state.keyName = "";
  };
  document.onkeydown = function (event) {
    event = event || window.event;
    state.keyName = event.key;
  };
  Vue.mixin({
    mounted() {
      const { __file } = this.$options;
      if (__file && this.$el && this.$el.nodeType === 1) {
        this.$el.onclick = function () {
          if (options.keyName.includes(state.keyName)) {
            const param = `?file=${__file}`;
            const url = `${options.serverPath}${param}`;
            console.log(url);
            fetch(url);
          }
        };
      }
    },
  });
}
