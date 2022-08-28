/**
 * 错误提示
 * @param  text 提示内容
 * @param  error 实际代码报错信息
 */
export function throwError(text: string, error?: unknown) {
  if (!text) return;
  console.log(`%c${text}`, "color:red", error ?? "");
}
/**
 * 随机生成颜色
 */
export function randomColor() {
  const r = Math.floor(Math.random() * 256); //随机生成256以内r值
  const g = Math.floor(Math.random() * 256); //随机生成256以内g值
  const b = Math.floor(Math.random() * 256); //随机生成256以内b值
  // const alpha = Math.random(); //随机生成1以内a值
  return `rgb(${r},${g},${b},${0.7})`;
}
