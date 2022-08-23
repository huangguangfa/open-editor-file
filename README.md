# open-editor-file

用于`vue(2,3)`项目, 通过`点击页面`快速打开当前组件文件功能、支持市面主流编辑器`vscode、 webstorm、sublimeText、idea、phpstorm、等等...`、支持开箱即用、常用参数定制化需求! 

### 使用插件步骤
- 🎃 在`vue.config.js` 或者 `vite.config.js` 加入`自定义服务插件`
- 🎃 在`main.js`里面混入全局键盘事件触发·打开组件文件插件



### 第一步 ```自定义服务插件```
#### webpack构建工具使用(`webpack(3.6 | 4.0)版本 => webpack.dev.conf.js`)
```js
const { openEditorFileServicePlugin } = require("open-editor-file/webpack");
const devWebpackConfig = merge(baseWebpackConfig, {
    ...,
    devServer: {
        ...,
        before: openEditorFileServicePlugin(), // 注入插件
        ...
    }
})
```
<!-- > `webpack(5.0)版本 => webpack.dev.conf.js` -->



#### vite构建工具使用(`vite.config.ts`)
```ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 引入插件
import { openEditorFileServicePlugin } from "open-editor-file/vite";

export default defineConfig({
  // 使用插件
  plugins: [vue(), openEditorFileServicePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});

```


### 第二步 ```添加自定义键盘事件打开组件文件```

```js

import { openEditorFilePlugin } from "open-editor-file";
app.use(openEditorFilePlugin(options);

// 默认快捷键
macos: command + 点击
windows: ctrl + 点击

// 自定义快捷键可通过{ keyName: string | Array<string> }
app.use(openEditorFilePlugin({ keyName:'a' });
// 多个
app.use(openEditorFilePlugin({ keyName:['a', 'b'] });
```