import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { injectGetEditorFile } from "open-editor-file";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(injectGetEditorFile);

app.mount("#app");
