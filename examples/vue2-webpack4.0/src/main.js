import Vue from "vue";
import App from "./App.vue";

import { openEditorFilePlugin } from "open-editor-file/webpack";

Vue.use(openEditorFilePlugin({ keyName: "a" }));

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
