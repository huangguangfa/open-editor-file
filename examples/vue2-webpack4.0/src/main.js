import Vue from "vue";
import App from "./App.vue";

import { openEditorFilePlugin } from "open-editor-file";

process.env.NODE_ENV === "development" &&
  Vue.use(openEditorFilePlugin({ keyName: "a" }));

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
