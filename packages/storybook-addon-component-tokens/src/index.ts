export { CssPropsBlock } from "./components/CssPropsBlock";
export { groupBySelector } from "./components/utils";
export type { CssPropsParameter } from "./constants";

// @ts-expect-error
if (module && module.hot && module.hot.decline) {
  // @ts-expect-error
  module.hot.decline();
}
