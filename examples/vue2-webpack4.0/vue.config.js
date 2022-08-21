const { openFileServicePlugin } = require("open-editor-file/webpack");
// import { injectGetEditorFile } from "open-editor-file/webpack";
// console.log("injectGetEditorFile", injectGetEditorFile);
module.exports = {
  devServer: {
    before: openFileServicePlugin(),
  },
};
