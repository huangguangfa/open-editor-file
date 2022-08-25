import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { openEditorFilePlugin } from "open-editor-file/webpack";

import "./assets/main.css";

const app = createApp(App);
app.use(router);

import.meta.env.DEV &&
  app.use(
    openEditorFilePlugin({
      keyName: "a",
      isHighlight: true,
      highlight: "white",
    })
  );

app.mount("#app");
