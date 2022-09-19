import Vue from "vue";
import App from "./App.vue";
import { openEditorFilePlugin } from "open-editor-file";

Vue.config.productionTip = false;
Vue.use(openEditorFilePlugin());

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
