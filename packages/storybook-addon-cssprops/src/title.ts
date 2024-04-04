import { useParameter } from "@storybook/manager-api";
import { PARAM_KEY } from "./constants";
import { CssPropertyItemGroup } from "./components/CssPropsTable/types";

const CONFIG_KEYS = ["presetColors", "disable"];

export function useTitle(): string {
  const cssprops = useParameter<CssPropertyItemGroup>(PARAM_KEY, {});
  const controlsCount = Object.entries(cssprops).filter(
    (item) => !CONFIG_KEYS.includes(item[0])
  ).length;
  const suffix = controlsCount === 0 ? "" : ` (${controlsCount})`;
  return `CSS Custom Properties${suffix}`;
}
