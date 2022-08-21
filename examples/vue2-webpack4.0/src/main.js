import Vue from "vue";
import App from "./App.vue";

import { injectGetEditorFile } from "open-editor-file";

Vue.use(injectGetEditorFile);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
