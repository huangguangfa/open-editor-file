const { openFileServicePlugin } = require("open-vscode-file/webpack");
module.exports = {
  devServer: {
    before: openFileServicePlugin("webstorm"),
  },
};
