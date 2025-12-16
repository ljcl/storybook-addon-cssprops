import { definePreviewAddon } from "storybook/internal/csf";
import addonAnnotations from "./preview";
export { PARAM_KEY, ADDON_ID } from "./constants";
export { CssPropsBlock } from "./components/CssPropsBlock";

export default () => definePreviewAddon(addonAnnotations);
